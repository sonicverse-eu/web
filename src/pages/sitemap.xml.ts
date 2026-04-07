import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const staticRoutes = ['/', '/about', '/community', '/contact', '/projects', '/blog'];

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://sonicverse.dev');
  const blogPosts = await getCollection('blog', ({ data }) => !data.draft);

  const urls = [
    ...staticRoutes,
    ...blogPosts.map((post) => `/blog/${post.id}`)
  ].map((path) => {
    const url = new URL(path, base);
    return `  <url><loc>${url}</loc></url>`;
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
