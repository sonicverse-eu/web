import { notFound } from 'next/navigation';
import PageSliceZone from '@/components/PageSliceZone';
import { getAllProducts, getProductByUID } from '@/lib/site-data/api';
import { buildMetadata } from '@/lib/site-data/metadata';

type ProductPageProps = {
  params: Promise<{ uid: string }>;
};

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ uid: product.uid }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { uid } = await params;
  const product = await getProductByUID(uid);

  return product ? buildMetadata(product) : {};
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { uid } = await params;
  const [product, products] = await Promise.all([getProductByUID(uid), getAllProducts()]);

  if (!product) {
    notFound();
  }

  return <PageSliceZone slices={product.data.slices} products={products} />;
}
