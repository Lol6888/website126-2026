# 126VERSE — Website mới (tự host)

Bản dựng lại 126verse.com theo **style editorial accent tím `#5E0ED7`** (Inter, chữ in hoa tracking rộng, nền sáng, video hero).
Nội dung + hình ảnh được **giữ nguyên văn** từ site cũ (Studio.Design publish snapshot). Chỉ thay layout và cấu trúc sơ đồ trang.

## Công nghệ
- [Astro 5](https://astro.build) — xuất site tĩnh (SSG), SEO tốt, không cần server
- Tailwind CSS 4 (plugin Vite)
- Không framework JS nặng — animation bằng CSS + IntersectionObserver

## Chạy thử / Build
```bash
npm install        # lần đầu
npm run dev        # dev server: http://localhost:4321
npm run build      # xuất site tĩnh vào dist/
npm run preview    # xem thử bản build: http://localhost:4321
```

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
1. **Nối backend form** — tất cả form (Contact, Urgent task, Audit, 4 modal gói, Apply job) hiện là form tĩnh `action="#"`. Gợi ý: Formspark/Basin/Formspree hoặc API riêng (Resend + Cloudflare Turnstile), đổ lead về Slack/Airtable như flow cũ trong Privacy Policy.
   - Lưu ý: 2 nhóm trường vốn lấy options từ CMS của Studio (checkbox "How did you hear about 126Verse?", "Company size", mục Voluntary Demographics) không khôi phục được danh sách lựa chọn cũ → tạm render dạng ô nhập tự do. Bổ sung options khi bạn cung cấp danh sách.
2. **Analytics** — gắn lại GA4 `G-CLM4XH0Q26` + GTM `GTM-PQWLR58W` (thêm vào `src/layouts/Base.astro`).
3. **JSON-LD / SEO schema** — port lại schema Organization/Service + hreflang đầy đủ nếu cần.
4. **Hosting** — đề xuất Cloudflare Pages (build command `npm run build`, output `dist`), trỏ domain 126verse.com. `_redirects` sẽ tự hoạt động.
5. Mục "How We Work with You" trên trang Web Design cũ chạy bằng CMS collection của Studio (không lấy được nội dung) — hiện lược bỏ; thêm lại khi bạn cung cấp nội dung.
