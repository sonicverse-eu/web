import type { CmsSlice } from '@/lib/site-data/types';

export type SliceRendererProps<S extends CmsSlice = CmsSlice, C = unknown> = {
  slice: S;
  context?: C;
};

