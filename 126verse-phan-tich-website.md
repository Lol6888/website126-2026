# PHÂN TÍCH TOÀN DIỆN WEBSITE 126VERSE.COM

> Tài liệu khảo sát chi tiết layout, thiết kế, nội dung và hệ thống trang của https://126verse.com/
> Mục đích: làm cơ sở để xây dựng lại một bản website mới.
> Ngày khảo sát: 10/06/2026. Dữ liệu được trích xuất trực tiếp từ dữ liệu xuất bản (publish snapshot) của trang, không phải đoán từ giao diện.

---

## 1. TỔNG QUAN

| Hạng mục | Thông tin |
|---|---|
| Tên thương hiệu | **126VERSE** (Onetwentysix VERSE Ltd.) — "We care about Brand" / "Chúng tôi làm Thương Hiệu" |
| Lĩnh vực | Agency thiết kế sáng tạo & branding: Brand design, UI/UX, Web design, E-learning, Graphic design, Marketing |
| Nền tảng xây dựng | **Studio.Design** (no-code, Nuxt/Vue SPA), project ID `xPORYob0Wr` |
| Ngôn ngữ | Song ngữ **Anh (mặc định, trang `/`) + Việt (`/HomeVN`)** — mỗi trang có 2 phiên bản `-Eng` / `-VN` |
| Tổng số trang | **46 trang + 7 modal** (53 view) |
| Analytics | Google Analytics `G-CLM4XH0Q26` + gtag bổ sung `G-HCWN6KX4YR`, GTM `GTM-PQWLR58W`, Impact.com site verification |
| SEO | JSON-LD schema (WebSite + Organization + Service), BreadcrumbList (Home → What we do → About Us), meta description |
| Khẩu hiệu/USP | "Your in-house creative & marketing team for the digital era", "Zero-Risk Partnership Guarantee" |
| Blog ngoài | https://126insights.com/ ("Expert deep-dive analyses from our team") |

### Thông tin liên hệ xuất hiện trên trang
- Email chính: `Sofia_phan@126verse.com` · email phụ: `126verse@gmail.com`, `careers@126verse.com`, `privacy@126verse.com`, `feedback@126verse.com`
- Điện thoại: `+84-789-179-603` (VN), `+44-79-1771-0126 / 7145` (UK)
- Địa chỉ: **127 Farringdon Rd, London EC1R 3DA, UK** & **57 street 60, TML, Hồ Chí Minh, VN**
- Mạng xã hội: LinkedIn `/company/126verse`, Facebook `/126verse`, Twitter `/126Verse`
- Số liệu giới thiệu: thành lập tại **Sydney - Australia**, 4 quốc gia, 182 nhân viên, +295 dự án, 86% làm việc từ xa

---

## 2. HỆ THỐNG THIẾT KẾ (DESIGN SYSTEM)

### 2.1 Bảng màu
| Màu | Mã | Vai trò |
|---|---|---|
| Vàng thương hiệu | `#ffbc38` | Logo "126VERSE" vàng, các đường kẻ/divider nhấn ở trang What we do |
| Đen | `#000000` | Nền chính (trang chủ, menu, showcase, hero careers, badge nổi) |
| Xám đậm card | `#212121` | Nền các project card trong web design showcase |
| Xám đậm nút | `#4d4d4d` | Nút tròn icon mail trên header (hover chuyển `#EEEEEE`) |
| Trắng | `#ffffff` | Nền các trang nội dung (What we do, About, case study) |
| Xám nhạt | `#EEEEEE` | Nền section phụ, footer CTA |
| Kem | `#fdf9f0`, `#fff4e9` | Section điểm nhấn trong case study CHEER / DAESANG |
| Vàng nhạt trong suốt | `rgba(255,237,157,0.47)` | Section "126Verse's approach" (DAESANG) |
| Hồng nhạt | `#fde3fd` | Nền trang 404 |
| Đen mờ | `rgba(0,0,0,0.16)` | Backdrop các modal |

### 2.2 Typography (font Google Fonts khai báo trong project)
- **Bricolage Grotesque** — font chủ đạo cho heading lớn
- Roboto, Open Sans, Lato — body text
- Marcellus, Oswald, Italiana, Raleway, Playfair Display, Spline Sans, Red Hat Display — dùng cục bộ (trang pricing/showcase có nhiều kiểu chữ display)
- Noto Sans JP — phần tử tiếng Nhật (một số khối đặt tên tiếng Nhật: ボタン, メイン...)

Kiểu chữ đặc trưng: **heading siêu lớn xếp từng chữ cái/từng từ một** (mỗi chữ là 1 text node riêng để chạy animation lần lượt) — ví dụ "W E B - D E S I G N", "1 2 6 V E R S E", "Build a Brand That's Seen, Trusted, and Remembered".

### 2.3 Breakpoints (Studio.Design)
- Desktop base width: **1280px**
- Tablet: ≤ **768px** · Mobile: ≤ **490px** · Mini: ≤ **360px**

### 2.4 Ngôn ngữ hình ảnh & hiệu ứng
- **GIF động vẽ tay/scribble** làm hoạ tiết chủ đạo (hero trang chủ, footer "How can we help?", About Us) — phong cách doodle đen trắng + vàng.
- **Lottie animations**: badge "FREE Audit your brand", trang coming soon, 404, mục "key things we've learned" (What we do).
- **Floating badges cố định (fixed)** ở góc màn hình mọi trang: (1) badge đen liên kết 126insights.com, (2) badge đen + lottie "FREE — AUDIT YOUR BRAND" → `/AuditBrand-Form`.
- **Header trong suốt, fixed**, đổi nội dung theo ngôn ngữ.
- **Marquee text** (chữ chạy ngang) bằng iframe + CSS keyframes ở trang pricing.
- **Sticky stacking cards** cho danh sách project ở Web design showcase.
- Hover effects: nút tròn mail đổi nền/màu icon; menu item gạch chân.
- Video nền mp4 (3840x2160) autoplay/loop ở trang pricing và showcase.

### 2.5 Header (thành phần dùng chung — symbol)
Cấu trúc (từ trái qua phải, thực tế hiển thị 2 cụm trái/phải):
1. **Logo `logoyellow.svg`** (126VERSE chữ vàng) → link về `/` (hoặc `/HomeVN`)
2. Nút chuyển ngôn ngữ **"VN | ENG"** (bản đang xem không có link, bản kia trỏ sang trang tương ứng)
3. Nút **"Menu"** → mở modal `MenuEng` / `MenuVN`
4. Nút tròn **icon mail** (`mail_outline`, nền `#4d4d4d`, bo tròn 50%, hover trắng) → `/Worktogether-*`
5. Nút **GIF tròn động** (`bttt.gif`/`bton.gif`) → trang `/Taskorder-*` hoặc `/comingsoon-*` (tuỳ trang)

Riêng các trang Careers & Audit Form: header nền đen gồm logo + nút "Apply Now" (anchor xuống form).

### 2.6 Footer (2 kiểu)
**Kiểu A — Footer lớn "How can we help?" (symbol, nền `#EEEEEE`)** dùng cho hầu hết trang nội dung:
- GIF scribble lớn + tiêu đề **"How can we help?" / "Tôi giúp bạn nhé!"**
- 3 CTA: "Work together →" (`/Worktogether-*`), "Join our team →" (`/AboutUs-*`), "Just say hello →" (`mailto:126verse@gmail.com`)
- Hàng link: Linkedin · Facebook · Twitter · Careers (`/AboutUs-*#carreer`) · Contact · Privacy · Accessibility
- Logo vàng lớn ở đáy

**Kiểu B — Footer tối giản** (trang form/coming soon): chỉ hàng link xã hội + logo vàng.

**Kiểu C — Footer showcase (projects/02\*)**: "Receive your custom cost breakdown within 24 hours" + nút "GET QUOTE" → `/Worktogether-Eng`, divider, chữ khổng lồ "1 2 6 V E R S E" xếp từng ký tự.

---

## 3. SƠ ĐỒ TRANG (SITEMAP)

### 3.1 Trang chính (song ngữ)
| Trang | URL Eng | URL VN | Title |
|---|---|---|---|
| Trang chủ | `/` | `/HomeVN` | 126Verse \| We care about Brand / Chúng tôi làm Thương Hiệu |
| Dịch vụ | `/Whatwedo-Eng` | `/Whatwedo-VN` | What we do / Dịch vụ |
| Về chúng tôi | `/AboutUs-Eng` | `/AboutUs-VN` | About us / Về chúng tôi |
| Giải pháp & Giá | `/pricing` | (chỉ EN) | Solutions & Pricing |
| Liên hệ | `/Worktogether-Eng` | `/Worktogether-VN` | Work together / Liên hệ công việc |
| Đặt task gấp 48h | `/Taskorder-Eng` | `/Taskorder-VN` | Work order / Nhiệm vụ khẩn cấp |
| Form audit thương hiệu | `/AuditBrand-Form` | (chỉ EN) | Audit Brand Form |
| Web design showcase | `/webdesignshowcase` | (chỉ EN) | — |
| Coming soon | `/comingsoon-1` | `/comingsoon` | Coming soon / Nhiệm vụ khẩn cấp |
| 404 | `/404` | — | — |

### 3.2 Case study (7 dự án, song ngữ)
| Dự án | URL Eng | URL VN | Loại |
|---|---|---|---|
| Yamaha Music | `/YamahaMusicEng` | `/YamahamusicVN` | Brand marketing |
| DAESANG | `/DAESANG-Eng` | `/DAESANG-VN` | Brand marketing |
| Mars Cats Voyage | `/MCV-Eng` | `/MCV-VN` | NFT design |
| Knowledge Japan | `/KnowlegdJP-Eng` | `/KnowlegdJP-VN` | Improve UI-UX |
| CHEER | `/CHEER-Eng` | `/CHEER-VN` | Application design |
| Human First Time | `/H1T-Eng` | `/H1T-VN` | Application design |
| FamiPay | `/FamiPay-Eng` | `/FamiPay-VN` | Application design |

Chuỗi "Next case study": Yamaha → DAESANG → MCV → Knowledge JP → CHEER → H1T → FamiPay → Yamaha (vòng tròn).

### 3.3 Web project mini case (chỉ EN, nằm trong showcase)
| URL | Dự án | Giá khởi điểm | Thời gian |
|---|---|---|---|
| `/projects/02` | NEWTOWN PRODUCTS | $1.000 | 14 ngày |
| `/projects/02-1` | DANCE EVENT MOBI | $1.000 | 8 ngày |
| `/projects/02-2` | Munch PIZZA | $1.600 | 8 ngày |
| `/projects/02-3` | FIRST EVENT | $1.000 | 10 ngày |
| `/projects/02-4` | Simple Market | $1.300 | 12 ngày |
| `/projects/02-5` | CRON | $2.500 | 16 ngày |
| `/projects/02-6` | Riverside | $1.100 | 10 ngày |

### 3.4 Tuyển dụng (chỉ EN)
- `/PrincipalDesignerJD` — Principal Designer
- `/Juniorbranddesigner` — Junior Brand Designer
- `/GraphicDesignIntern` — Graphic Design Intern
- `/MultimediaGraphicDesign` — Multimedia Designer (Branding & Marketing) - Mid Level
- `/SocialMediaCoordinatorIntern` — Social Media Coordinator Intern

### 3.5 Chính sách
- `/PrivacyPolicy-Eng` · `/PrivacyPolicy-VN`
- `/AccessibilityPolicy-Eng` · `/AccessibilityPolicy-VN`

### 3.6 Modal (7)
- `MenuEng` / `MenuVN` — menu toàn màn hình
- `foundationcontact` / `Growncontact` / `Transformcontact` / `enterprize` — form liên hệ 4 gói dịch vụ (mở từ trang pricing)
- `ClaimSlot1` — form "Secure Your Slot Today"

---

## 4. NỘI DUNG CHI TIẾT TỪNG TRANG

### 4.1 TRANG CHỦ `/` (EN) & `/HomeVN` (VN)
**Layout:** nền đen, tối giản, 1 màn hình hero + danh sách dự án dạng chữ lớn. Header fixed trong suốt. 2 badge nổi cố định (126insights + FREE Audit).

1. **Hero:** GIF động lớn (1152x648, scribble animation) làm visual chính.
2. **Giới thiệu 3 nhóm chuyên môn** (heading: *"We currently have three distinct expert teams operating independently."* / *"Chúng tôi có ba nhóm chuyên nghiệp hoạt động riêng biệt"*), mỗi mục kèm icon `group_work`:
   - *The UI-UX Design team specializes in crafting intuitive interfaces and smooth digital experiences.* (VN: Nhóm chuyên gia thiết kế UI-UX chuyên phát triển giao diện web và ứng dụng.)
   - *The Marketing & Solutions team specializes in conducting market research, developing cross-channel strategies, and optimizing CRM systems.* (VN: Nhóm chuyên gia nghiên cứu thị trường, xây dựng chiến lược marketing và tự động hóa CRM.)
   - *The 2D & 3D Design team specializes in creating impactful visuals and printed materials for campaigns and events.* (VN: Nhóm chuyên gia thiết kế 2D, 3D chuyên tạo ra các sản phẩm hình ảnh cho các chiến dịch quảng cáo.)
3. **Danh sách dự án — menu chữ khổng lồ (font size ≥40px), mỗi dòng 1 link:**
   - Web Design → `/webdesignshowcase`
   - Yamaha Music → `/YamahaMusicEng|VN`
   - CHEER → `/CHEER-*`
   - Mars Cats Voyage → `/MCV-*`
   - DAESANG → `/DAESANG-*`
   - Human First Time → `/H1T-*`
   - FamiPay → `/FamiPay-*`
   - Knowledge Japan → `/KnowlegdJP-*`
4. **Badge nổi 1 (đen, fixed):** logo 126INSIGHTS + "Expert deep-dive analyses from our team" → https://126insights.com/ (tab mới)
5. **Badge nổi 2 (đen, fixed):** Lottie + "**FREE** / AUDIT YOUR BRAND" → `/AuditBrand-Form` (tab mới)

SEO trang chủ: JSON-LD đầy đủ (Organization + Service: Brand Design and Rebranding, UI/UX...), custom CSS `overscroll-behavior-y: none`.

### 4.2 MODAL MENU (`MenuEng` / `MenuVN`)
Nền đen toàn màn hình, đóng bằng nút "Close".
- Mục lớn: **What We Do** (`/Whatwedo-Eng`) · **About Us** (`/AboutUs-Eng`) · **Solutions** (`/pricing`) · **Get in Touch** (`/Worktogether-Eng`) — VN: Dịch Vụ / Về chúng tôi / Giải pháp / Liên hệ
- Cột "Case Studies" (VN: "Dự án"): Web Design, Human First Time, FamiPay, Knowlegd Japan, Mars Cats Voyage, CHEER, Daesang, Yamaha Music
- Khối "**We're Hiring**" (VN: Tuyển dụng): "Senior Product Designer / Graphic Designer / UX Designer" + nút "Join Our Team" → `/AboutUs-*#carreer`
- 2 địa chỉ văn phòng (London + Hồ Chí Minh) kèm icon `location_on`
- GIF trang trí + badge 126insights
- Switch ngôn ngữ ENG/VN ngay trong menu

### 4.3 WHAT WE DO (`/Whatwedo-Eng` · `/Whatwedo-VN`) — nền trắng
1. **Hero text lớn:** *"Odds are you've used a product we've built"* (VN: "Odds có thể bạn đã từng nhìn thấy các sản phẩm của chúng tôi") + ảnh nền bg.png (1801x907).
2. Đoạn dẫn: *"For few years, we've helped everyone from small, early-stage startups to large companies build products and image marketing plans that are effective, beautiful, and easy to use."*
3. **"What we do" — 4 năng lực chính** (mỗi mục heading + đoạn mô tả, layout 2 cột):
   - **Define a clear vision for the future** — từ Fortune 500 R&D đến founder với bản phác thảo trên khăn giấy: shaping, ideating, prototyping.
   - **Ship new products from zero-to-one** — xây phần mềm từ đầu, MVP chất lượng cao.
   - **Inject fresh life into legacy experiences** — tái cấu trúc/redesign sản phẩm có hàng triệu DAU đang "mỏi".
   - **Accompany even the smallest commercial campaigns** — làm như team marketing nội bộ, sản phẩm in ấn + digital.
4. **Bảng 4 nhóm dịch vụ chi tiết:**
   - *Design & UX Research:* UX/UI Design · Design Systems · UX Research & Testing · Ideation & Prototyping
   - *Brand & Creative:* Brand Audit & Positioning · Art Direction & Visual Identity · Motion Graphics & Video Production · Content Creation & Thought Leadership (blogs, whitepapers, case studies)
   - *Marketing & Automation:* ABM Campaigns · Multi-channel paid media · Marketing Automation & CRM Integration · Customer Journey Optimization & Personalization · AI/ML-Driven Marketing Technology
   - *Development & Product Strategy:* Website & Landing Page Development · SCORM / Articulate 360 eLearning · Analytics & BI Dashboard · Product Roadmapping & Strategic Workshops · User Engagement & Retention Programs
5. **"After shipping hundreds of products..." — 5 nguyên tắc làm việc** (đánh số 01–05, divider vàng `#ffbc38` xen giữa, kèm 1 lottie):
   - 01 **Product focus** — chỉ làm một việc và làm thật tốt: trải nghiệm người dùng.
   - 02 **Co-founder mentality** — đối tác thật sự, giải bài toán sản phẩm cần chứ không chỉ bài toán được giao.
   - 03 **Software not vaporware** — dị ứng overhead/quan liêu, chỉ thuê người thực chiến.
   - 04 **Startup pace** — tốc độ startup, kinh nghiệm thương hiệu lớn.
   - 05 **Small, awesome teams** — đội nhỏ, chọn người theo chuyên môn + "chemistry".
6. **Testimonials "● Achievements stem from within"** (VN: "Thành quả đến từ nội tại"):
   - Linwei Deng — Daesang Wellife Global Business Dept. Manager: *"I am always amazed at the quality of work that 126Verse produces..."*
   - Yuki Sakai — H1T: *"It's been a pleasure collaborating with 126VERSE..."* + "And more"
7. Footer lớn "How can we help?".

### 4.4 ABOUT US (`/AboutUs-Eng` · `/AboutUs-VN`) — nền trắng
1. **Hero chữ khổng lồ xen GIF:** "Global *(gif)* talent, *(gif)* Global *(gif)* work" + link "View open roles" → `#carreer`.
2. **4 số liệu:** `4` Countries represented · `182` Global employees · `+295` Projects completed · `86%` Remote employees.
3. Tuyên ngôn: *"Founded in Sydney-Australia, we've always hired the best talent we could find from every corner of the world..."*
4. Đoạn "You probably didn't know it at the time, but odds are you've saw a product we helped build." + **dải logo khách hàng**: FamilyMart(logo_fm), Yamaha (tím), Daesang Wellife (logo_lif), H1T (logo.png), CHEER (logo.svg).
5. **"Diverse perspectives, world-class work"** (VN: "Đa dạng quan điểm - Tối đa hiệu quả") + lưới 6 ảnh (3 GIF scribble + 3 ảnh đời sống Pexels).
6. **"Work / life — balanced" — 8 phúc lợi** (accordion, icon `add_circle_outline`):
   - Remote & IRL · 4.5 day weeks · Unlimited time off · Zero timesheets · Learning & growth · Flex hours & locations · Equity program · Health & wellness coverage (mỗi mục có mô tả ngắn).
7. **"Your career — our open roles"** (anchor `#carreer`) — 5 dòng job (mỗi dòng: tên + Remote + Design/Marketing, mở tab mới):
   Principal Designer · Junior Brand Designer · Graphic Design Intern · Social Media Coordinator Intern · Multimedia Designer (Branding & Marketing) - Mid Level
8. "Don't see what you're looking for? Get in touch at Sofia_Phan@126verse.com" (VN: careers@126verse.com).
9. Footer lớn.

### 4.5 SOLUTIONS & PRICING (`/pricing`) — trang dài nhất, phong cách riêng (landing hiện đại, nền trắng + đen)
**Header riêng:** nền `#111111`, logo, anchor menu: Why Us (`#whyus`) · Pricing (`#pricing_1`) · Testimonials (`#testimonials01`) · FAQ (`#faq`) · Blog (126insights) + nút "Audit Your Brand".

1. **Hero:** thông báo "*This month!🎉 we're prioritizing new client onboarding for the North American market...*" + heading khổng lồ xếp từng từ: **"Build a Brand That's Seen, Trusted, and Remembered"** + sub: *"We combine brand strategy, design, and digital execution to help your business look, feel, and perform better online."* + nút "See Our Work" → `/#ourworkhomepage` + video nền 4K. Marquee: "Zero Risk Partnership ✦ Branding ✦ Digital Presence ✦ Creative Strategy".
2. **Why Choose 126Verse?** — *"Your in-house creative & marketing team for the digital era"* + đoạn mô tả sứ mệnh (B2B & personal brands, "without the overhead") + **6 giá trị** (icon + richtext):
   - Zero Risk Partnership (trễ milestone >7 ngày làm việc → hoàn 20%/làm bù/gia hạn hỗ trợ)
   - Strategic Brand Foundation · Digital Presence & Performance · Creative & Content Intelligence · Continuous Optimization · Trusted Partnership
3. **2 quote lớn:** Sophie Hood (Founder & Operator, Seoul Tonic) — *"Working with OnetwentySix Verse feels like having our own design & marketing department..."*; Adam Gwinnett (Executive Director, ROH Wheels & John Shearer Holdings) — *"Their refund policy? It's like a free trial, but for a whole project..."*
4. **Testimonials "What our Customer say"** — 6 review 5–6 sao (ảnh đại diện + chức danh):
   - Matthew Peterson (VP People & Culture, industrial equipment US) — lead quality +42%/3 tháng
   - Veronica Morison (Marketing Director, building materials APAC) — on-time delivery 98%
   - Adam Smith (CMO, factory automation EU) — rebuilt visual library
   - Lucas Smith (Brand Manager, steel manufacturing EMEA) — brand recall +22 điểm
   - Jessica Moon (Head of Marketing, precision components US) — traffic +36%
   - Nikita Wilson (Growth Lead, electronics US) — CPL −27%
5. Marquee chữ lớn: "We Deliver the Innovation and Expertise to Unlock Your Full Market Potential" + nút "Get Your Brand Audit" → `/AuditBrand-Form` + video nền.
6. **Pricing Lists** (`#pricing_1`) — heading "Choose a plan to elevate your brand presence" — **4 gói, tất cả "Custom pricing"**, mỗi gói có GOAL + 5 gạch đầu dòng (icon check) + nút mở modal:
   - **Starter Team** — cho người mới xây brand/không có design team. Goal: thiết lập nền tảng hình ảnh & uy tín số. Gồm: brand discovery & mini audit, starter identity system, landing page hoặc mini website 3 trang (SEO-ready), 6–9 social visuals, setup GA4/GTM/LinkedIn Insight Tag. Nút "Start Now" → modal `foundationcontact`.
   - **Creative Hub** — mở rộng nội dung & độ nhất quán. Gồm: full brand guideline, redesign website 5–8 trang kèm copywriting, bộ visual content (12 social + 1 video ngắn/quý), ad creative package (LinkedIn/Google), GA4 dashboard + tracking hằng tháng. Nút "Schedule Consultation" → modal `Growncontact`.
   - **Brand Engine** — cho brand đang tăng trưởng cần cấu trúc, automation. Gồm: brand refresh/repositioning, website 8–12 trang (đa ngôn ngữ tuỳ chọn), campaign asset system, marketing automation (CRM/HubSpot/Apollo), báo cáo tối ưu 2 tháng/lần. Nút "Talk to Our Team" → modal `Transformcontact`.
   - **Dedicated Team** — phòng creative dài hạn cho enterprise/B2B. Gồm: 6–12 chuyên gia, global brand management & localization, analytics/AI-ML nâng cao, executive comms & thought-leadership, review chiến lược hằng quý. Nút "Talk to Our Team" → modal `enterprize`.
   - CTA xen giữa: "Not sure which plan fits you best? Let's connect!" → `/Worktogether-Eng`.
7. **Bảng so sánh "Detailed Service Package Comparison"** — 3 nhóm có thể đóng/mở:
   - *Strategy & Positioning:* Brand Foundation / Messaging & Voice / Market Positioning / Guidelines & Documentation / Strategic Alignment / Exchange rate (Standard → Preferential → Best) — chi tiết theo 4 gói.
   - *Execution & Deliverables:* Digital Presence / Creative Production / Campaign Support / Integration & Tools / Team Collaboration (2–3 core creatives → dedicated department).
   - *Performance & Terms:* Post-Launch Support / Performance Visibility / Engagement Model / Communication & Workflow (Email → Teams 365/Notion → daily) / SLA response time (4h/4h/2h/2h) / Zero-Risk Guarantee ✓ cho cả 4 gói.
8. **Bảng so sánh "5 Full-Time Hires Or One 126Verse?"** — In-House Team (5 hires) vs 126Verse trên 8 tiêu chí: Roles & Expertise, Setup Time (3–6 tháng vs 1–2 tuần), Management Overhead, Scalability, Performance Accountability, Quality & Consistency, Cost Efficiency, Time to Impact (6–9 tháng vs 4–6 tuần), Risk & Continuity. Kèm kết luận richtext.
9. **FAQ (`#faq`) "Valuable informations without secrets"** — 8 câu hỏi accordion:
   1. What does the typical workflow with an agency look like? (4 giai đoạn: Discovery & Strategy → Creative Development → Launch & Tracking → Optimization & Review)
   2. How do you ensure quality and KPI commitment? (Zero-Risk: trễ >7 ngày → 10% refund hoặc free creative add-on)
   3. Do we need to provide content or will the agency handle it?
   4. Can the package be customized?
   5. What makes this service different from other agencies? (build creative systems, not campaigns)
   6. How is reporting handled? (dashboard real-time Notion/Data Studio/CRM, báo cáo 2 tuần–1 tháng)
   7. What happens if KPIs are not met? (audit nội bộ + Zero-Risk Guarantee)
   8. Can the contract be canceled early? (được, pro-rata, không phạt ẩn)
10. **Add-on marquee:** "Get started now and amplify your results with exclusive add-on solutions" — Social Presence Enhancement · Parts Catalog Digitization · Predictive Maintenance Marketing · Service Contract Optimization · Brand Performance Audit.
11. **CTA cuối:** "More than an agency. We're your growth partner..." + nút "Get Started" → `/Worktogether-Eng` + lottie.
12. Footer kiểu B (social links + logo).

### 4.6 WEB DESIGN SHOWCASE (`/webdesignshowcase`) — nền đen
1. **Hero:** "ONETWENTYSIX VERSE at" + chữ khổng lồ từng ký tự "W E B - D E S I G N" + *"At 126Verse, every website is built around three pillars: Clarity in structure, Consistency in brand tone, and Conversion through purposeful design."* + video nền 4K.
2. **"How We Work with You"** — các card lấy từ CMS collection (placeholder `{{title.value}}`, `{{text1.value}}`, `{{text2.value}}`).
3. CTA: "**Start Your Landing Page** — Tell us what you need — we'll handle the rest." → `/Worktogether-Eng`.
4. **"Selected Websites We've Crafted" (Last updated 11-2025)** — 7 project card sticky xếp chồng (nền `#212121`, nhãn "Project" + "Show more" + ảnh + tên + mô tả + năm 2025):
   NEWTOWN PRODUCTS · DANCE EVENT MOBI · Munch PIZZA · FIRST EVENT · Simple Market · CRON · Riverside (mô tả từng card xem mục 4.7).
5. Footer kiểu C (GET QUOTE + chữ 126VERSE khổng lồ).

### 4.7 TRANG CHI TIẾT WEB PROJECT (`/projects/02` → `02-6`) — template giống nhau, nền đen
Mỗi trang gồm: nhãn "Selected Websites We've Crafted / Last updated 11-2025" + nút Back → showcase + nhãn "Website" + **tên dự án** + đoạn mô tả mục tiêu + **iframe nhúng website demo** (preview.studio.site) + 4 khối nội dung:
- **Total Duration** (kèm quy trình 3 phase: Strategy & Concept → Development & Refinement (build trên Studio.design) → Launch & Handoff)
- **What we did:** Brand strategy · Art direction · Web design
- **Total Cost:** "Cost starts at $X. Project costs are custom-quoted based on complexity..."
- **Outcome:** kết quả đạt được.

| Trang | Dự án | Mô tả ngắn | Demo iframe | Duration | Cost |
|---|---|---|---|---|---|
| 02 | NEWTOWN PRODUCTS | Digital transformation cho studio thiết kế tối giản cao cấp | `preview.studio.site/templates/YnBW2ZZWvG` | 14 ngày (4+7+3) | $1.000 |
| 02-1 | DANCE EVENT MOBI | Hub âm nhạc/DJ "DANCE. CONNECT. INSPIRE." | `templates/G4Ra4mzWDM` | 8 ngày (2+5+1) | $1.000 |
| 02-2 | Munch PIZZA | Pizza NY-style, mobile-first, tối ưu đặt hàng | `templates/ZmoWv5ga6y` | 8 ngày (2+5+1) | $1.600 |
| 02-3 | FIRST EVENT | Hội nghị công nghệ, dark mode + neon | `templates/RbrqEgnW4l` | 10 ngày (2+5+1) | $1.000 |
| 02-4 | Simple Market | Chợ phiên cộng đồng, light mode tự nhiên | `templates/18dO8VvanG` | 12 ngày (4+6+2) | $1.300 |
| 02-5 | CRON | Nội thất, phong cách tạp chí e-commerce | `templates/bEXawRZqDr` | 16 ngày (4+10+2) | $2.500 |
| 02-6 | Riverside | Boutique hotel Tokyo, quiet luxury, BOOK NOW | `templates/MG3qbovaJm` | 10 ngày (3+6+1) | $1.100 |

### 4.8 CASE STUDY — TEMPLATE CHUNG
Mỗi case study (nền trắng, riêng MCV nền `#151515`):
1. **Tên dự án (chữ lớn)** + bảng meta: Project Type / Stage (vai trò: Leader hoặc Partner) / Deliverables
2. Hero ảnh/GIF lớn
3. "Introduction" (VN: "Bối cảnh") — đoạn dẫn lớn
4. Các section xen kẽ: "The vision" (Tầm nhìn), định hướng hình ảnh, gallery ảnh sản phẩm, quote khách hàng/founder
5. Kết quả/số liệu (đối với MCV, FamiPay)
6. "Next case study" + ảnh + link

**Yamaha Music** (Brand marketing · Leader · POSM, Social posts, Video ads):
- Intro: cầu nối hàng đầu cho người yêu âm nhạc; hợp tác nâng tầm brand identity + digital presence.
- Section "Make Waves" — brand promise mới của Yamaha (khối cảm xúc khách hàng).
- Vision: *"Create responsive images that seamlessly blend branding and commerce"* + **YouTube embed** (`Og-jigFAWq4`).
- Gallery SEQTRAK (banner động 160x600, 900x400), social posts (JAM DRUMMER...).
- "Companionship & Responsibility": Impact (hàng trăm thiết kế, hàng triệu khách hàng tiềm năng) + Persistence (sự kiện thường niên, khuyến mãi, workshop).
- Next: DAESANG.

**DAESANG** (Brand marketing · Leader · POSM, Social posts, Video ads):
- Daesang Wellife (từ 2002) — thực phẩm sức khỏe Hàn Quốc; làm việc với team nội bộ về product design, branding, strategy.
- Vision: từ dịch vụ thực phẩm chăm sóc sức khỏe → thương hiệu đồng hành lối sống khỏe.
- "Expand & Share" — đối tác chiến lược các sự kiện thể thao; "126Verse's approach" — phác thảo tay duyệt trước khi hoàn thiện (section nền vàng nhạt).
- Quote: Linwei Deng. "Long lasting results". Next: Mars Cats Voyage.

**Mars Cats Voyage** (Creative, hand-draw · Partner · NFTs design) — nền tối `#151515`:
- Tạo bộ sưu tập **Mars Alien Cats** — 1 trong 6 collection của MCV (OG Mars Cats, Spacesuits, Alien, Specials, Collabs, Honorary).
- "Welcome to Mars Cats Voyage" — NFT collection theo dõi mèo du hành sao Hỏa.
- Số liệu: **22,1K followers trên X · 3.462 NFT owners · 2.954 ETH tổng volume**; mint 0,05 ETH → floor đỉnh ~0,5 ETH.
- Next: Knowledge JP.

**Knowledge Japan** (Improve UI-UX · Leader · UI-UX design and planning):
- Web app sáng tác/đọc/mua bán sách; bản cũ bị chê giao diện khó dùng.
- Nhiệm vụ mở: gom mọi phần vào 1 thiết kế trung tâm, cá nhân hóa trải nghiệm, thu hút tác giả kinh nghiệm.
- Brand trắng-xanh; onboarding chọn nội dung bằng upvote/downvote emoji; tối ưu danh mục quản lý bài mua/tác phẩm.
- Kết quả: tăng trưởng mạnh người dùng + doanh thu. Next: CHEER.

**CHEER** (Application Design · Leader · UI-UX Design, UI Library, Framework):
- CHEER Securities (Nhật) — app giao dịch chứng khoán Mỹ & ETF real-time từ 500 yên; phục vụ từ nội trợ đến nhà đầu tư chuyên nghiệp.
- Khảo sát 4 focus group (consultant, analyst, entrepreneur, designer) → pain points: trực quan hoá, tối ưu tác vụ, tính nhất quán.
- Triết lý "evolution, not revolution"; signature colors + custom iconography.
- Quote: Felix Phan (Founder 126VERSE) + Nobuyuki Kobayashi (Chủ tịch CHEER Securities). Next: H1T.

**Human First Time (H1T)** (Application Design · Leader · UI-UX Design, UI Library, Framework):
- App đặt chỗ làm việc theo giờ (Nhật): 151 cửa hàng H¹T, 17 H¹TBOX, 132 cửa hàng liên kết (3/2024) + **Google Maps embed**.
- Thiết kế tối giản hoá quy trình đặt chỗ, hiển thị trạng thái bằng hình ảnh dễ hiểu.
- Quote: Yuki Sakai (Head of marketing, H1T). Next: FamiPay.

**FamiPay** (Application Design · Leader · UI-UX Design, UI Library, Framework):
- Đồng phát triển giao diện app thanh toán FamiPay cho **17.000+ cửa hàng FamilyMart** + hiệu thuốc, điện máy.
- Chức năng chính: thanh toán mobile đa điểm, lịch sử mua hàng, coupon + tích điểm.
- "Easy to understand from the outset" — không cần hướng dẫn; 5 triệu khách có sẵn.
- Số liệu: **5 triệu lượt tải · 4,3 điểm App Store/CH Play · 63 nghìn đánh giá**. Next: Yamaha.

### 4.9 WORK TOGETHER (`/Worktogether-Eng` · `-VN`) — trang liên hệ, nền trắng
- Heading lớn: **"Say hey."**
- Đoạn dẫn: *"Not sure where to start? Tell us about your product, your timeline, how you heard about us, and where you're located. We read every message... email: sofia_phan@126verse.com"* + link "Looking for a job?" → AboutUs#carreer.
- **Form "Contact"** (bản EN):
  - Name* (placeholder "Enter your name")
  - Email* ("Email Address")
  - Service you're looking for* (select): Landing Page / Website UX/UI / Website Development / Branding / Creative Production / Marketing Materials / E-commerce / Web App UI / CRO Optimization / Other
  - What's your expected timeline?* (select): As soon as possible / Within 2 weeks / 3–6 weeks / Flexible timeline / Not sure
  - What's your budget range?* (select): Under $1,000 / $1,000–$3,000 / $3,000–$5,000 / $5,000–$10,000 / $10,000+ / Not sure yet
  - Message* (textarea) + checkbox "I agree to the Privacy Policy."* + nút **Send**
- Bản VN khác chút: Tên*, Email*, "Bạn biết đến chúng tôi từ đâu?", "Công ty/dự án đang ở giai đoạn nào?"* (Early/Mid/Late stage startup, Enterprise), Lời nhắn*, đồng ý điều khoản, nút **Gửi**.
- Footer kiểu B.

### 4.10 TASK ORDER — NHIỆM VỤ KHẨN CẤP 48H (`/Taskorder-Eng` · `-VN`)
- Heading: **"Urgent Task"** / "Nhiệm vụ Khẩn cấp" — *"Time's ticking! Designing a key visual, poster, or banner... we've got just 48 hours."*
- Quy trình 3 bước: (1) Điền form yêu cầu → (2) 126Verse xác nhận → (3) Nhận kết quả. *(POSM, social post: sớm nhất 48 giờ làm việc)*
- Pitch: chi phí duy trì design team nội bộ quá lớn; phục vụ cả khách hàng nhỏ nhất; "Consolidation - Maximum efficiency!"; tham khảo Yamaha Music & Daesang.
- **Form "Task request"**: Name* · Email* · How did you hear of us? · What design product do you need?* (select: Banner / Leaflet / brochure / Standee / Video ads / Gif ads / Social post / Sản phẩm khác) · Design request description* (textarea, gợi ý: thông điệp, màu chủ đạo, phong cách) · **Attachment File*** (upload: mẫu tham khảo, logo, font) · When do you want to receive your first results?* · checkbox đồng ý + **Send**.
- Điều khoản thanh toán: báo giá qua email xác nhận; đặt cọc 30–50%; sửa đổi tính phí sau lần sửa đầu; thanh toán Bank transfer/Paypal.

### 4.11 AUDIT BRAND FORM (`/AuditBrand-Form`) — header & hero đen
- Hero: "in 7-Minute — **Brand Performance Audit Form**"
- Giới thiệu: audit do team design & marketing nội bộ thực hiện (không phải AI), **trị giá $3,000**, miễn phí khi link còn hoạt động.
- **Form "AUDIT BRAND FREE"** chia 4 nhóm:
  - *Brand & Marketing Priorities:* top priorities (checkbox nhiều lựa chọn — nguồn CMS) + Priority level* (Urgent 1–3 tháng / Mid-term 3–6 / Long-term >6)
  - *Company Profile:* Industry* (Manufacturing / OEM / Technology / Services / E-commerce / Personal Branding / Other) + Company Size* (checkbox)
  - *Report Delivery:* nhận báo cáo qua Email / Call / Both*
  - *Contact Information:* Full Name* · Work Email* · Company Name* · Company Website (optional)
- Nút: **"Get My Free Brand Audit Report"** + cam kết bảo mật dữ liệu.

### 4.12 TRANG TUYỂN DỤNG (5 trang, template chung)
Hero đen: nhãn "HO CHI MINH - REMOTE" + tên vị trí chữ lớn. Header đen có nút "Apply Now" (anchor). Nội dung: đoạn giới thiệu "We are open to remote candidates / 126Verse ships products loved by billions worldwide..." + các mục **What you'll do / Requirements / (Bonus & Allowances) / Nice to haves / Equal opportunity employer** + **Form ứng tuyển**:
- First Name* · Last Name* · Email* · Phone · Location (City)* · Resume/CV* (upload) · Cover Letter* (upload) · LinkedIn URL · Dribbble URL · Portfolio URL · Additional Work Samples (upload) · "Why 126Verse?" (textarea) · Are you based in Europe?* (Yes/No) · How did you hear about 126Verse? (checkbox CMS) · mục **Voluntary Demographics** (giới tính, transgender, xu hướng tính dục — tự nguyện, ẩn danh) · nút "Submit Application".

Khác biệt chính từng vị trí:
- **Principal Designer:** multidisciplinary (experience/visual/motion), set quality bar, mentor; nice-to-have: 3D.
- **Junior Brand Designer:** dẫn dắt brand design process end-to-end; yêu cầu 1,5+ năm kinh nghiệm, Figma/Illustrator/Photoshop, storytelling; nice-to-have: tiếng Anh, viết copy, motion/3D.
- **Graphic Design Intern:** đào tạo Articulate Rise, SCORM, eLearning, STUDIO; thiết kế 2D quảng cáo & in ấn; yêu cầu tốt nghiệp ngành design, full-time; có bonus & phụ cấp.
- **Multimedia Designer (Mid):** 2D/3D assets, video marketing, podcast; 1–3 năm kinh nghiệm, Adobe CC/Figma, Premiere/After Effects, audio cơ bản; lương cạnh tranh, thử việc 2 tháng 50% lương, BHXH đầy đủ.
- **Social Media Coordinator Intern:** quản lý social (LinkedIn, Twitter), đang học Marketing/Communications, hiểu analytics cơ bản.

### 4.13 PRIVACY POLICY (`/PrivacyPolicy-Eng` · `-VN`)
Văn bản dài chuẩn GDPR của "Onetwentysix VERSE Ltd.", các mục: Overview · Your Consent · Information We Collect (Personal Data qua contact form; Usage Data qua cookies/web beacons/Google Analytics) · Use of Personal Information (liệt kê căn cứ pháp lý GDPR từng mục) · Aggregated Data · Sharing (liệt kê nhà cung cấp: Copper, MixMax, MailChimp; Hull.io, Google Analytics, Clearbit, Google Sheets, Slack qua Zapier, Airtable; Greenhouse; Twitter/LinkedIn/Facebook/Instagram/Google Display) · Storage (ngoài Việt Nam, standard contractual clauses) · Age of Consent (16 EU / 13 nơi khác) · Opting Out · Rights to Your Information (8 quyền GDPR) · Links · Third-Party Ads & NAI · Security · Retention · Changes · Contact: **privacy@126verse.com**. (Bản VN dịch toàn bộ.)

### 4.14 ACCESSIBILITY POLICY (`/AccessibilityPolicy-Eng` · `-VN`)
"Hey, hi, hello! The internet should be a place for everyone..." — cam kết theo **WCAG**: User-Friendly Design, Alternative Text, Keyboard Navigation, Readable Font & Contrast, Compatibility with Assistive Technologies. Các mục: Third-Party Content · Legal Compliance (ADA, Section 508) · Thank You for Your Feedback → **feedback@126verse.com**.

### 4.15 TRANG PHỤ
- **Coming soon (`/comingsoon`, `/comingsoon-1`):** chỉ 1 lottie animation lớn + header.
- **404:** nền hồng `#fde3fd` + lottie animation + header.

### 4.16 MODAL FORM GÓI DỊCH VỤ (4 modal cùng cấu trúc)
Backdrop mờ; cột đen tiêu đề + card trắng chứa GIF + text *"Please share your details below and our team will reach out within 24 hours..."* + form: Your Full Name* / Your Company-Organization* / Your Email* / Tell Us About Your Needs (textarea) / checkbox Privacy Policy* / nút submit:
- `foundationcontact`: "**Get Started with the Starter Team**" → "Submit & Start Now"
- `Growncontact`: "**Scale Faster with the Creative Hub**" → "Submit & Scale Growth"
- `Transformcontact`: "**Redefine Success with the Brand Engine**" → "Submit & Transform"
- `enterprize`: "**Lead Globally with the Dedicated Team**" → "Submit & Lead Globally"
- `ClaimSlot1`: "**Secure Your Slot Today**" — thêm select "Choose Your Package" (Foundation/Growth/Transform/Enterprise) → nút "Claim"

---

## 5. DANH SÁCH FORM TRÊN TOÀN TRANG (15 form)

| Form | Trang | Trường chính |
|---|---|---|
| Contact (EN) | /Worktogether-Eng | name, email, service, timeline, budget, message, consent |
| Contact (VN) | /Worktogether-VN | tên, email, nguồn biết, giai đoạn công ty, lời nhắn, consent |
| Task request (EN/VN) | /Taskorder-* | name, email, nguồn, loại sản phẩm, mô tả, file đính kèm, deadline, consent |
| AUDIT BRAND FREE | /AuditBrand-Form | priorities, priority level, industry, company size, report delivery, contact info |
| Apply Job ×5 | 5 trang careers | thông tin cá nhân + CV/Cover letter/Portfolio + demographics |
| 4 modal gói + ClaimSlot | pricing | name, company, email, needs, (package) |

Form backend: hệ thống form của Studio.Design (gửi kèm reCAPTCHA token, dữ liệu đổ về Slack/Airtable theo privacy policy).

---

## 6. TÀI NGUYÊN CHÍNH (ASSETS)

- **Logo vàng (SVG):** `https://storage.googleapis.com/studio-design-asset-files/projects/xPORYob0Wr/s-300x62_e2e8a13d-e803-4f9a-92d9-51018f93bb28.svg` (và biến thể `s-300x122_9b75bf43...svg`)
- **Favicon:** `https://storage.googleapis.com/production-os-assets/assets/00b952f5-92a2-431c-a79c-a96e3b3f498a`
- **Hero GIF trang chủ:** `.../s-1152x648_8fb3ab4c-fd7e-4234-b94a-553cbbf225f1.gif`
- **GIF footer "How can we help":** `.../s-1152x648_2d6eb288-c194-46a2-ac98-d0882a907ca9.gif`
- **Nút GIF tròn header:** `.../s-150x150_bdcfbb5d-0f20-434b-82ad-9271cc178421.gif`
- **Badge 126insights:** `.../s-387x116_webp_f7c14073-bce0-496f-b001-714ff78e94f3.png`
- **Lottie:** FREE Audit `lottie.host/50088e70-d46e-4a35-95cc-66b37fafcecf/SBGXsNYWlB.lottie` · What-we-do `lottie.host/3b2e2b23-9d03-43a9-8bb8-6902220907b0/WMxpJi8HL5.json` · Coming soon `lottie.host/be36b53c-bb60-4479-b391-3f3d632db457/5c5EUPVj8M.lottie` · 404 `lottie.host/0b9cd96f-119a-41f7-9ee5-6889fd9c917e/zjt1g3yDrc.json` · Pricing CTA `lottie.host/711fee14-5929-45d0-b6f5-9520c4fcd5e0/Nzp5yblIVt.lottie`
- **Video nền:** pricing hero `.../s-3840x2160_82498466-f86d-4c51-9c0d-76d0ca68ec16.mp4` · showcase `.../s-3840x2160_e5732c37-d04e-43ab-a0c1-b14cea454e36.mp4` · pricing marquee `projects/1YWjGPnXOm/s-3840x2160_4cc57d37....mp4`
- **YouTube embed (Yamaha):** `youtube.com/embed/Og-jigFAWq4`
- Toàn bộ ảnh đều host trên `storage.googleapis.com/studio-design-asset-files/projects/xPORYob0Wr/...` (một số từ project `1pqDZEGpWj`, `1YWjGPnXOm` — trang pricing).

---

## 7. GHI CHÚ KHI LÀM LẠI BẢN MỚI

1. **Kiến trúc song ngữ thủ công:** bản gốc nhân đôi trang `-Eng`/`-VN` thay vì i18n thật → bản mới nên dùng routing i18n chuẩn (`/en`, `/vi`) để dễ bảo trì.
2. **Tính cách thương hiệu:** đen + trắng + vàng `#ffbc38`, doodle GIF vẽ tay, typography display cực lớn (Bricolage Grotesque), animation chữ xuất hiện từng ký tự, tông giọng thân thiện - tự tin ("Say hey.", "Tôi giúp bạn nhé!").
3. **2 phong cách trong 1 site:** core site (đen/trắng tối giản kiểu studio) và trang pricing/showcase (landing bán hàng hiện đại, testimonial + FAQ + bảng so sánh). Bản mới nên thống nhất.
4. **Các luồng chuyển đổi (conversion funnel) phải giữ:**
   - Floating badge → Audit Brand Form (lead magnet "trị giá $3,000")
   - Pricing 4 gói → modal form từng gói
   - Task Order 48h (dịch vụ design gấp, cọc 30–50%)
   - Contact form đầy đủ (service/timeline/budget)
5. **Nội dung "bằng chứng":** 7 case study lớn + 7 web project nhỏ kèm giá & timeline cụ thể + 8 testimonial + số liệu công ty (4 quốc gia/182 nhân viên/+295 dự án/86% remote) + Zero-Risk Guarantee.
6. **SEO có sẵn:** JSON-LD Organization/Service, breadcrumb, GA4 + GTM — cần port sang bản mới.
7. **Một số lỗi/điểm yếu của bản hiện tại** (nên sửa khi làm lại): nhiều trang thiếu title/description riêng (projects/02*, webdesignshowcase); chính tả "Knowlegd" (đúng: Knowledge), "precence", "carreer", "meansurable"; trang VN đôi chỗ link nhầm sang bản Eng (menu VN → `/AboutUs-Eng#carreer`); nội dung SPA render hoàn toàn bằng JS (SEO yếu) — bản mới nên SSR/SSG.

---

*Nguồn dữ liệu: publish snapshot Studio.Design (`storage.googleapis.com/studio-publish/projects/xPORYob0Wr/pOLBnkkLaQ/`) — đã trích xuất đầy đủ 53 page-view + 14 symbol-view JSON ngày 10/06/2026.*
