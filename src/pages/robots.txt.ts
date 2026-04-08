import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://sonicverse.dev');
  const sitemapUrl = new URL('/sitemap.xml', base);

  const body = `# Sonicverse robots.txt
# Allow search engine crawlers to discover and index all pages

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

# Sitemap location
Sitemap: ${sitemapUrl}

# Crawl delay (optional - adjust based on server capacity)
Crawl-delay: 1
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
