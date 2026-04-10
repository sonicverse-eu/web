import type { SliceZoneComponents } from '@prismicio/react';
import Hero from './Hero';
import ProductSuite from './ProductSuite';
import FeatureGrid from './FeatureGrid';
import ProofBand from './ProofBand';
import TestimonialRail from './TestimonialRail';
import PricingGrid from './PricingGrid';
import CallToAction from './CallToAction';
import ContentColumns from './ContentColumns';
import ContactPanel from './ContactPanel';

export const components = {
  hero: Hero,
  product_suite: ProductSuite,
  feature_grid: FeatureGrid,
  proof_band: ProofBand,
  testimonial_rail: TestimonialRail,
  pricing_grid: PricingGrid,
  call_to_action: CallToAction,
  content_columns: ContentColumns,
  contact_panel: ContactPanel,
} as unknown as SliceZoneComponents;
