import type { MetadataRoute } from 'next';
import { getBlogPosts, getLibraryEntries } from '@/lib/content';
import { getAllProducts } from '@/lib/site-data/api';
import { SITE_URL, staticSitemapRoutes } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  const urls = [
    ...staticSitemapRoutes,
    ...products.map((product) => `/projects/${product.uid}`),
    ...getBlogPosts().map((post) => `/blog/${post.id}`),
    ...getLibraryEntries().map((entry) => `/library/${entry.id}`),
  ];

  return urls.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
  }));
}
