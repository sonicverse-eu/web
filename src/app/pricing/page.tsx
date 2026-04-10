import { notFound } from 'next/navigation';
import PageSliceZone from '@/components/PageSliceZone';
import { getAllProducts, getPageByUID } from '@/lib/site-data/api';
import { buildMetadata } from '@/lib/site-data/metadata';

export async function generateMetadata() {
  const page = await getPageByUID('pricing');
  return page ? buildMetadata(page) : {};
}

export default async function PricingPage() {
  const [page, products] = await Promise.all([getPageByUID('pricing'), getAllProducts()]);

  if (!page) {
    notFound();
  }

  return <PageSliceZone slices={page.data.slices} products={products} />;
}
