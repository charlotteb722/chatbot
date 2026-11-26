import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const live = process.env.SITE_MODE === 'live';
  const body = live
    ? `User-agent: *\nDisallow: /demo/\nDisallow: /contact/thanks/\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`
    : `# Preview mode: not for search engines\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
