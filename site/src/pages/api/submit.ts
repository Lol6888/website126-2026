import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Route này chạy lúc runtime (serverless function trên Vercel), không prerender.
export const prerender = false;

// ─── Cấu hình (đặt trong Environment Variables trên Vercel) ───────────────
//   RESEND_API_KEY  – bắt buộc, lấy từ https://resend.com/api-keys
//   MAIL_TO         – tuỳ chọn, mặc định 126verse@gmail.com
//   MAIL_FROM       – tuỳ chọn, mặc định dùng domain test của Resend
const TO = import.meta.env.MAIL_TO || '126verse@gmail.com';
const FROM = import.meta.env.MAIL_FROM || '126Verse Website <onboarding@resend.dev>';

// Giới hạn dung lượng đính kèm (Resend cho tối đa ~40MB/email; để mức an toàn).
const MAX_TOTAL_ATTACHMENT = 18 * 1024 * 1024; // 18 MB

// Các field nội bộ không đưa vào nội dung email.
const INTERNAL_FIELDS = new Set(['_form', '_lang', 'botcheck', 'confirm']);

// Nhãn đẹp cho một số field hay gặp; field khác sẽ tự "humanize".
const LABELS: Record<string, string> = {
  name: 'Họ tên', full_name: 'Họ tên', first_name: 'Tên', last_name: 'Họ',
  email: 'Email', work_email: 'Email công việc', phone: 'Điện thoại',
  company: 'Công ty', company_name: 'Công ty', company_size: 'Quy mô công ty',
  company_website: 'Website công ty', location: 'Địa điểm', linkedin: 'LinkedIn',
  dribbble: 'Dribbble', portfolio: 'Portfolio', message: 'Lời nhắn',
  service: 'Dịch vụ quan tâm', timeline: 'Thời gian dự kiến', budget: 'Ngân sách',
  stage: 'Giai đoạn', source: 'Biết đến từ đâu', hear_about: 'Biết đến từ đâu',
  product: 'Sản phẩm thiết kế', description: 'Mô tả yêu cầu', deadline: 'Hạn nhận kết quả',
  priorities: 'Ưu tiên hiện tại', priority_level: 'Mức độ ưu tiên', industry: 'Ngành / Lĩnh vực',
  report_delivery: 'Hình thức nhận báo cáo', based_europe: 'Ở châu Âu?',
  gender: 'Giới tính', transgender: 'Người chuyển giới', orientation: 'Xu hướng tính dục',
  resume: 'CV / Resume', cover_letter: 'Cover Letter', work_samples: 'Mẫu công việc', file: 'File đính kèm',
  needs: 'Nhu cầu',
};

function humanize(key: string): string {
  return LABELS[key] || key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ success: false, message: 'Dữ liệu form không hợp lệ.' }, 400);
  }

  // Honeypot: bot thường điền field ẩn này → giả vờ thành công, không gửi mail.
  if (form.get('botcheck')) {
    return json({ success: true, message: 'OK' });
  }

  const formName = String(form.get('_form') || 'Form').trim();
  const lang = String(form.get('_lang') || 'vi');

  // Tách field text và file.
  const rows: Array<[string, string]> = [];
  const attachments: Array<{ filename: string; content: Buffer }> = [];
  let replyTo: string | undefined;
  let totalBytes = 0;

  for (const [key, value] of form.entries()) {
    if (INTERNAL_FIELDS.has(key)) continue;

    if (value instanceof File) {
      if (value.size === 0) continue;
      totalBytes += value.size;
      if (totalBytes > MAX_TOTAL_ATTACHMENT) {
        return json(
          {
            success: false,
            message:
              lang === 'en'
                ? 'Attachments are too large (max 18MB total). Please reduce file size.'
                : 'File đính kèm quá lớn (tối đa 18MB). Vui lòng giảm dung lượng.',
          },
          413,
        );
      }
      const buf = Buffer.from(await value.arrayBuffer());
      attachments.push({ filename: value.name || `${key}.dat`, content: buf });
      rows.push([humanize(key), `📎 ${value.name} (${(value.size / 1024).toFixed(0)} KB)`]);
    } else {
      const text = String(value).trim();
      if (!text) continue;
      if (!replyTo && (key === 'email' || key === 'work_email') && /.+@.+\..+/.test(text)) {
        replyTo = text;
      }
      rows.push([humanize(key), text]);
    }
  }

  if (rows.length === 0) {
    return json({ success: false, message: 'Form trống.' }, 400);
  }

  const subject = `[126Verse] ${formName}`;

  const htmlRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 14px;background:#f6f4fb;border:1px solid #ece7f7;font-weight:600;white-space:nowrap;vertical-align:top">${esc(
          k,
        )}</td><td style="padding:10px 14px;border:1px solid #ece7f7;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join('');

  const html = `<div style="font-family:Inter,Arial,sans-serif;color:#15131a;max-width:680px;margin:0 auto">
    <div style="background:#15131a;color:#fff;padding:20px 24px;border-radius:10px 10px 0 0">
      <div style="font-size:12px;letter-spacing:.15em;text-transform:uppercase;opacity:.6">126Verse · Form mới</div>
      <div style="font-size:22px;font-weight:700;margin-top:6px">${esc(formName)}</div>
    </div>
    <table style="border-collapse:collapse;width:100%;font-size:14px">${htmlRows}</table>
    <p style="font-size:12px;color:#8a8599;margin:16px 0 0">Gửi tự động từ website 126verse.com${
      replyTo ? ` · Trả lời trực tiếp tới <a href="mailto:${esc(replyTo)}">${esc(replyTo)}</a>` : ''
    }</p>
  </div>`;

  const text =
    `126Verse — ${formName}\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join('\n') +
    `\n\n— Gửi tự động từ website 126verse.com`;

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Thiếu RESEND_API_KEY');
    return json(
      { success: false, message: 'Server chưa cấu hình email (RESEND_API_KEY).' },
      500,
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo,
      subject,
      html,
      text,
      attachments: attachments.length ? attachments : undefined,
    });

    if (error) {
      console.error('Resend error:', error);
      return json({ success: false, message: 'Không gửi được email. Vui lòng thử lại.' }, 502);
    }

    return json({ success: true, message: 'OK' });
  } catch (err) {
    console.error('Submit error:', err);
    return json({ success: false, message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' }, 500);
  }
};
