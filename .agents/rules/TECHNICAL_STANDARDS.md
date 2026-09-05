# Technical & Deployment Architecture Standards

## ⚡ Framework & Performance Budget

- **Core Framework:** Astro 4 (Static Site Generation / SSG).
- **Styling:** Tailwind CSS with custom burgundy and gold theme tokens (`tailwind.config.mjs`).
- **Interactive Islands:** React 18 (`@astrojs/react`) hydrated with `client:load` or `client:visible`.
- **Core Web Vitals Budget:**
  - First Contentful Paint (FCP): < 0.6s
  - Cumulative Layout Shift (CLS): 0.00 (enforce fixed container minimum heights `min-h-[450px]` and skeleton states).
  - Largest Contentful Paint (LCP): < 1.2s.

## 🗺️ Sitemap & SEO Indexing

- **Master Sitemap Index:** `/sitemap-index.xml`
- **Segmented Sub-Sitemaps:**
  - `/sitemap-knowledge-hub.xml` (300 in-depth legal & real estate guides)
  - `/sitemap-tools.xml` (8 interactive settlement utilities)
  - `/sitemap-locations.xml` (County & City closing guides)
  - `/sitemap-general.xml` (Corporate & services)
- **Robots Directives:** `/robots.txt` disallowing query parameter noise (`/*?*`) to preserve crawl equity.

## 🚀 Build & Deployment Commands

```bash
# Verify 300-topic taxonomy generator
node scratch/build_taxonomy.js

# Build production static bundle
npx astro build

# Deploy to Netlify Production
npx netlify deploy --prod --dir=dist
```
