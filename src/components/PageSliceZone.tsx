import { SliceZone } from '@prismicio/react';
import { components } from '@/slices';
import type { CmsSlice, ProductDocument } from '@/lib/prismic/types';

interface PageSliceZoneProps {
  slices: CmsSlice[];
  products: ProductDocument[];
}

export default function PageSliceZone({ slices, products }: PageSliceZoneProps) {
  return <SliceZone slices={slices} components={components} context={{ products }} />;
}
