import type { ComponentType } from 'react';
import type { CmsSlice, SliceContext } from '@/lib/site-data/types';
import Hero from './Hero';
import ProductSuite from './ProductSuite';
import FeatureGrid from './FeatureGrid';
import ProofBand from './ProofBand';
import TestimonialRail from './TestimonialRail';
import PricingGrid from './PricingGrid';
import CallToAction from './CallToAction';
import ContentColumns from './ContentColumns';
import ContactPanel from './ContactPanel';
import type { SliceRendererProps } from './types';

type SliceRenderer = ComponentType<SliceRendererProps<CmsSlice, SliceContext>>;

export const components: Record<CmsSlice['slice_type'], SliceRenderer> = {
  hero: Hero,
  product_suite: ProductSuite,
  feature_grid: FeatureGrid,
  proof_band: ProofBand,
  testimonial_rail: TestimonialRail,
  pricing_grid: PricingGrid,
  call_to_action: CallToAction,
  content_columns: ContentColumns,
  contact_panel: ContactPanel,
};
