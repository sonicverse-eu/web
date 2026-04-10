import { components } from '@/slices';
import type { BlogEntry, LibraryEntry } from '@/lib/content';
import type { CmsSlice, ProductDocument } from '@/lib/site-data/types';

interface PageSliceZoneProps {
  slices: CmsSlice[];
  products: ProductDocument[];
  currentProduct?: ProductDocument | null;
  blogPosts?: BlogEntry[];
  libraryEntries?: LibraryEntry[];
}

export default function PageSliceZone({
  slices,
  products,
  currentProduct,
  blogPosts,
  libraryEntries,
}: PageSliceZoneProps) {
  return (
    <>
      {slices.map((slice) => {
        const Component = components[slice.slice_type];

        if (!Component) {
          return null;
        }

        return (
          <Component
            key={slice.id}
            slice={slice}
            context={{ products, currentProduct, blogPosts, libraryEntries }}
          />
        );
      })}
    </>
  );
}
