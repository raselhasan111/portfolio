// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://raselhasan.vercel.app',
  base: '/',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      // /og is a hidden social-card template (see scripts/generate-og.mjs)
      filter: (page) => !page.endsWith('/og/'),
    }),
  ],
});
