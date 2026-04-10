import { notFound } from 'next/navigation';
import PageSliceZone from '@/components/PageSliceZone';
import { getAllProducts, getPageByUID } from '@/lib/site-data/api';
import { buildMetadata } from '@/lib/site-data/metadata';

export async function generateMetadata() {
  const page = await getPageByUID('demo');
  return page ? buildMetadata(page) : {};
}

export default async function DemoPage() {
  const [page, products] = await Promise.all([getPageByUID('demo'), getAllProducts()]);

  if (!page) {
    notFound();
  }

  return (
    <div className="wide-page-shell">
      <PageSliceZone slices={page.data.slices} products={products} />
    </div>
  );
}
