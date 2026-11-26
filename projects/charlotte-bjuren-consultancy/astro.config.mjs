import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://charlottebjuren.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // Demonstration sites and the thank-you page stay out of search results.
      filter: (page) => !page.includes('/demo/') && !page.includes('/contact/thanks/'),
    }),
  ],
});
