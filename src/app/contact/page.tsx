import { notFound } from 'next/navigation';
import PageSliceZone from '@/components/PageSliceZone';
import { getAllProducts, getPageByUID } from '@/lib/prismic/api';
import { buildMetadata } from '@/lib/prismic/metadata';

export async function generateMetadata() {
  const page = await getPageByUID('contact');
  return page ? buildMetadata(page) : {};
}

export default async function ContactPage() {
  const [page, products] = await Promise.all([getPageByUID('contact'), getAllProducts()]);

  if (!page) {
    notFound();
  }

  return <PageSliceZone slices={page.data.slices} products={products} />;
}
