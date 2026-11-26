import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_MODE controls publishing safety:
//   "preview" (default): every page is hidden from search engines, drafts are allowed.
//   "live": pages can be indexed, and the build fails if any [DRAFT ...] placeholder remains.
// Netlify sets URL to the site's own address, so links and social previews work on the temporary address.
const live = process.env.SITE_MODE === 'live';
const site = live ? 'https://charlottebjuren.com' : process.env.URL || 'https://charlottebjuren.com';

export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/demo/') && !page.includes('/contact/thanks/'),
    }),
  ],
});
