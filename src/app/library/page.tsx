import { notFound } from 'next/navigation';
import PageSliceZone from '@/components/PageSliceZone';
import { getLibraryEntries } from '@/lib/content';
import { buildMetadata } from '@/lib/site-data/metadata';
import { getAllProducts, getPageByUID } from '@/lib/site-data/api';

export async function generateMetadata() {
  const page = await getPageByUID('library');
  return page ? buildMetadata(page) : {};
}

export default async function LibraryPage() {
  const [page, products] = await Promise.all([getPageByUID('library'), getAllProducts()]);
  const entries = getLibraryEntries();

  if (!page) {
    notFound();
  }

  return (
    <div className="wide-page-shell library-overview-page library-page">
      <PageSliceZone
        slices={page.data.slices}
        products={products}
        libraryEntries={entries}
      />
    </div>
  );
}
