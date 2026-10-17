import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

const noSlash = (url) => {
  const u = new URL(url);
  if (u.pathname.length > 1) u.pathname = u.pathname.replace(/\/+$/, '');
  return u.href;
};

export default defineConfig({
  site: 'https://www.126verse.com',
  trailingSlash: 'ignore',
  // Toàn site vẫn là tĩnh (prerender). Riêng API route /api/submit
  // được đánh dấu `prerender = false` nên chạy như serverless function trên Vercel.
  adapter: vercel(),
  // Tắt CSRF check mặc định của Astro: sau proxy Vercel + redirect apex→www,
  // origin không khớp được nên nó chặn cả submit hợp lệ từ trình duyệt.
  // Endpoint chỉ gửi email cho chủ site (rủi ro thấp) và đã có honeypot chống bot.
  security: { checkOrigin: false },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/coming-soon'),
      // URL không có "/" cuối, khớp canonical trong Base.astro
      serialize: (item) => ({
        ...item,
        url: noSlash(item.url),
        links: item.links?.map((l) => ({ ...l, url: noSlash(l.url) })),
      }),
      i18n: { defaultLocale: 'en', locales: { en: 'en', vi: 'vi' } },
    }),
  ],
  // Redirect 301 từ URL cũ (Studio.Design) sang cấu trúc mới — giữ SEO/backlink.
  // Adapter Vercel biên dịch thành route redirect thật (file public/_redirects không có tác dụng trên Vercel).
  redirects: {
    '/HomeVN': { status: 301, destination: '/vi/' },
    '/Whatwedo-Eng': { status: 301, destination: '/services' },
    '/Whatwedo-VN': { status: 301, destination: '/vi/services' },
    '/pricing': { status: 301, destination: '/solutions' },
    '/AboutUs-Eng': { status: 301, destination: '/about' },
    '/AboutUs-VN': { status: 301, destination: '/vi/about' },
    '/Worktogether-Eng': { status: 301, destination: '/contact' },
    '/Worktogether-VN': { status: 301, destination: '/vi/contact' },
    '/Taskorder-Eng': { status: 301, destination: '/contact/urgent' },
    '/Taskorder-VN': { status: 301, destination: '/vi/contact/urgent' },
    '/AuditBrand-Form': { status: 301, destination: '/audit' },
    '/webdesignshowcase': { status: 301, destination: '/work/web-design' },
    '/projects/02': { status: 301, destination: '/work/web-design/newtown-products' },
    '/projects/02-1': { status: 301, destination: '/work/web-design/dance-event-mobi' },
    '/projects/02-2': { status: 301, destination: '/work/web-design/munch-pizza' },
    '/projects/02-3': { status: 301, destination: '/work/web-design/first-event' },
    '/projects/02-4': { status: 301, destination: '/work/web-design/simple-market' },
    '/projects/02-5': { status: 301, destination: '/work/web-design/cron' },
    '/projects/02-6': { status: 301, destination: '/work/web-design/riverside' },
    '/YamahaMusicEng': { status: 301, destination: '/work/yamaha-music' },
    '/YamahamusicVN': { status: 301, destination: '/vi/work/yamaha-music' },
    '/DAESANG-Eng': { status: 301, destination: '/work/daesang' },
    '/DAESANG-VN': { status: 301, destination: '/vi/work/daesang' },
    '/MCV-Eng': { status: 301, destination: '/work/mars-cats-voyage' },
    '/MCV-VN': { status: 301, destination: '/vi/work/mars-cats-voyage' },
    '/KnowlegdJP-Eng': { status: 301, destination: '/work/knowledge-japan' },
    '/KnowlegdJP-VN': { status: 301, destination: '/vi/work/knowledge-japan' },
    '/CHEER-Eng': { status: 301, destination: '/work/cheer' },
    '/CHEER-VN': { status: 301, destination: '/vi/work/cheer' },
    '/H1T-Eng': { status: 301, destination: '/work/human-first-time' },
    '/H1T-VN': { status: 301, destination: '/vi/work/human-first-time' },
    '/FamiPay-Eng': { status: 301, destination: '/work/famipay' },
    '/FamiPay-VN': { status: 301, destination: '/vi/work/famipay' },
    '/PrivacyPolicy-Eng': { status: 301, destination: '/privacy' },
    '/PrivacyPolicy-VN': { status: 301, destination: '/vi/privacy' },
    '/AccessibilityPolicy-Eng': { status: 301, destination: '/accessibility' },
    '/AccessibilityPolicy-VN': { status: 301, destination: '/vi/accessibility' },
    '/PrincipalDesignerJD': { status: 301, destination: '/careers/principal-designer' },
    '/Juniorbranddesigner': { status: 301, destination: '/careers/junior-brand-designer' },
    '/GraphicDesignIntern': { status: 301, destination: '/careers/graphic-design-intern' },
    '/MultimediaGraphicDesign': { status: 301, destination: '/careers/multimedia-designer' },
    '/SocialMediaCoordinatorIntern': { status: 301, destination: '/careers/social-media-coordinator-intern' },
    '/comingsoon': { status: 301, destination: '/coming-soon' },
    '/comingsoon-1': { status: 301, destination: '/coming-soon' },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
