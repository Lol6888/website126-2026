import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://126verse.com',
  trailingSlash: 'ignore',
  // Toàn site vẫn là tĩnh (prerender). Riêng API route /api/submit
  // được đánh dấu `prerender = false` nên chạy như serverless function trên Vercel.
  adapter: vercel(),
  // Tắt CSRF check mặc định của Astro: sau proxy Vercel + redirect apex→www,
  // origin không khớp được nên nó chặn cả submit hợp lệ từ trình duyệt.
  // Endpoint chỉ gửi email cho chủ site (rủi ro thấp) và đã có honeypot chống bot.
  security: { checkOrigin: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
