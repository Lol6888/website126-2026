import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://126verse.com',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
