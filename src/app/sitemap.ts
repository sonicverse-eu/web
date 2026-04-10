import type { MetadataRoute } from 'next';
import { getBlogPosts, getLibraryEntries } from '@/lib/content';
import { SITE_URL, staticSitemapRoutes } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = [
    ...staticSitemapRoutes,
    ...getBlogPosts().map((post) => `/blog/${post.id}`),
    ...getLibraryEntries().map((entry) => `/library/${entry.id}`),
  ];

  return urls.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
  }));
}
