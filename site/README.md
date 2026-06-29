# 126VERSE — Website mới (tự host)

Bản dựng lại 126verse.com theo **style editorial accent tím `#5E0ED7`** (Inter, chữ in hoa tracking rộng, nền sáng, video hero).
Nội dung + hình ảnh được **giữ nguyên văn** từ site cũ (Studio.Design publish snapshot). Chỉ thay layout và cấu trúc sơ đồ trang.

## Công nghệ
- [Astro 5](https://astro.build) — site tĩnh (SSG) + 1 API route serverless cho form
- Adapter [`@astrojs/vercel`](https://docs.astro.build/en/guides/integrations-guide/vercel/) — toàn bộ trang vẫn tĩnh, riêng `/api/submit` chạy như serverless function
- [Resend](https://resend.com) — gửi email form về hộp thư
- Tailwind CSS 4 (plugin Vite)
- Không framework JS nặng — animation bằng CSS + IntersectionObserver

## Chạy thử / Build
```bash
npm install        # lần đầu
npm run dev        # dev server: http://localhost:4321 (API route hoạt động)
npm run build      # build ra .vercel/output (Build Output API) + dist/
```
⚠️ `npm run preview` (astro preview) **không còn dùng được** sau khi thêm adapter Vercel. Để xem thử local, dùng `npm run dev`.

## Cấu hình email cho form (bắt buộc để form gửi được)
Các biến môi trường (xem `.env.example`):
1. Tạo tài khoản [resend.com](https://resend.com) bằng email **126verse@gmail.com**.
2. Vào **API Keys → Create** → copy key (dạng `re_...`).
3. **Local:** tạo file `site/.env` với `RESEND_API_KEY=re_...` (file này đã được `.gitignore`).
   **Vercel:** Project → Settings → Environment Variables, thêm `RESEND_API_KEY` (và tuỳ chọn `MAIL_TO`, `MAIL_FROM`), rồi **Redeploy**.
4. Mặc định form gửi về `126verse@gmail.com` qua người gửi test `onboarding@resend.dev`. Khi chưa xác thực domain, Resend **chỉ cho gửi tới chính email đã đăng ký tài khoản** — đúng là 126verse@gmail.com nên chạy ngay. Muốn gửi từ `no-reply@126verse.com` (đẹp hơn, vào inbox tốt hơn) thì xác thực domain 126verse.com trong Resend rồi đặt `MAIL_FROM`.

Logic gửi nằm ở `src/pages/api/submit.ts`; mọi form gắn `data-mailer` và submit AJAX qua handler chung trong `src/layouts/Base.astro`.

## Cấu trúc trang (sơ đồ mới)
| Mới | Cũ |
|---|---|
| `/` · `/vi/` | Home Eng/VN |
| `/services` · `/vi/services` | Whatwedo |
| `/solutions` | pricing |
| `/work` · `/vi/work` | (mới — gom case studies, trước đây nằm ở homepage) |
| `/work/<case>` ×7 · `/vi/work/<case>` | 7 case study Eng/VN |
| `/work/web-design` + 7 trang con | webdesignshowcase + projects/02* |
| `/about` · `/vi/about` | AboutUs (kèm tuyển dụng #carreer) |
| `/careers/<vị trí>` ×5 | 5 trang JD |
| `/contact` · `/vi/contact` | Worktogether |
| `/contact/urgent` · `/vi/contact/urgent` | Taskorder |
| `/audit` | AuditBrand-Form |
| `/privacy`, `/accessibility` (+ /vi) | Policies |
| `/coming-soon`, `/404` | comingsoon, 404 |

Redirect 301 đầy đủ từ URL cũ: xem `public/_redirects` (định dạng Cloudflare Pages / Netlify; nếu host bằng nginx/Apache cần chuyển đổi tương ứng).

## Nơi sửa nội dung
- Case studies: `src/data/cases.ts`, `cases2.ts`, `cases3.ts`
- Web projects: `src/data/webprojects.ts`
- Tuyển dụng: `src/data/jobs.ts`
- Solutions/Pricing: `src/data/solutions.ts`
- Privacy: `src/data/privacy-en.ts`, `privacy-vi.ts`
- Các trang còn lại: trực tiếp trong `src/pages/`
- Header/Footer/Menu: `src/components/Nav.astro`, `Footer.astro`
- Design tokens (màu accent, font): `src/styles/global.css`

## Assets
- Ảnh thân trang: `public/img/a/` (164 file, tải về từ storage gốc của Studio — site giờ tự chứa 100%, không phụ thuộc Studio)
- Video nền: `public/media/` (hero-bg.mp4, webdesign-bg.mp4, pricing-hero.mp4, pricing-marquee.mp4)
- ⚠️ Một số GIF gốc nặng (tổng ~350MB). Nên tối ưu dần: chuyển GIF → mp4/webm hoặc nén lại để tăng tốc tải trang.

## Việc còn lại trước khi go-live
1. ✅ **Backend form — ĐÃ XONG.** Tất cả form (Contact ×2, Urgent task ×2, Audit, 4 modal gói, Apply job) gửi về `126verse@gmail.com` qua Resend. Chỉ cần đặt `RESEND_API_KEY` (xem mục "Cấu hình email cho form" ở trên) là chạy.
   - Lưu ý: 2 nhóm trường vốn lấy options từ CMS của Studio (checkbox "How did you hear about 126Verse?", "Company size", mục Voluntary Demographics) không khôi phục được danh sách lựa chọn cũ → tạm render dạng ô nhập tự do. Bổ sung options khi bạn cung cấp danh sách.
2. **Analytics** — gắn lại GA4 `G-CLM4XH0Q26` + GTM `GTM-PQWLR58W` (thêm vào `src/layouts/Base.astro`).
3. **JSON-LD / SEO schema** — port lại schema Organization/Service + hreflang đầy đủ nếu cần.
4. **Hosting** — Vercel (framework Astro tự nhận diện, build `npm run build`). Nhớ đặt biến môi trường `RESEND_API_KEY` và để **Node 22.x** trong Project Settings (function chưa hỗ trợ Node 24). `_redirects` dạng Cloudflare/Netlify — nếu vẫn dùng Vercel thì chuyển các redirect cũ sang `vercel.json` nếu cần.
5. Mục "How We Work with You" trên trang Web Design cũ chạy bằng CMS collection của Studio (không lấy được nội dung) — hiện lược bỏ; thêm lại khi bạn cung cấp nội dung.
