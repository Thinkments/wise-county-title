import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import { customSitemapIntegration } from './src/lib/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.wisetitle.com',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    customSitemapIntegration(),
  ],
  vite: {
    ssr: {
      noExternal: ['lucide-react', 'leaflet'],
    },
  },
});
