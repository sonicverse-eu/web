import { notFound } from 'next/navigation';
import PageSliceZone from '@/components/PageSliceZone';
import { getBlogPosts } from '@/lib/content';
import { buildMetadata } from '@/lib/site-data/metadata';
import { getAllProducts, getPageByUID } from '@/lib/site-data/api';

export async function generateMetadata() {
  const page = await getPageByUID('blog');
  return page ? buildMetadata(page) : {};
}

export default async function BlogPage() {
  const [page, products] = await Promise.all([getPageByUID('blog'), getAllProducts()]);
  const posts = getBlogPosts();

  if (!page) {
    notFound();
  }

  return (
    <div className="wide-page-shell blog-overview-page blog-page">
      <PageSliceZone slices={page.data.slices} products={products} blogPosts={posts} />
    </div>
  );
}
