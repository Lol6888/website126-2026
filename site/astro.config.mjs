import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://126verse.com',
  trailingSlash: 'ignore',
  // Toàn site vẫn là tĩnh (prerender). Riêng API route /api/submit
  // được đánh dấu `prerender = false` nên chạy như serverless function trên Vercel.
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
