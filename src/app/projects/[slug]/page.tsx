import { notFound } from 'next/navigation';
import PageSliceZone from '@/components/PageSliceZone';
import { getAllProducts, getProductByUID } from '@/lib/site-data/api';
import { buildMetadata } from '@/lib/site-data/metadata';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.uid }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const product = await getProductByUID(slug);

  return product ? buildMetadata(product) : {};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [product, products] = await Promise.all([getProductByUID(slug), getAllProducts()]);

  if (!product) {
    notFound();
  }

  return (
    <div className="wide-page-shell project-page">
      <PageSliceZone slices={product.data.slices} products={products} currentProduct={product} />
    </div>
  );
}
