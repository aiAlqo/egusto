import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = site?.toString().replace(/\/$/, '') ?? '';
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${base}/sitemap-0.xml</loc></sitemap></sitemapindex>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
