export type ButtonLink = {
  label: string;
  href: string;
  style?: 'primary' | 'secondary' | 'ghost';
};

export type ProductSummary = {
  uid: string;
  name: string;
  category: string;
  summary: string;
  audience: string;
  outcome: string;
  accent: string;
  ctaLabel: string;
  ctaHref: string;
  highlight: string;
  pricingHint: string;
};

export type CmsSlice = {
  id: string;
  slice_type:
    | 'hero'
    | 'product_suite'
    | 'feature_grid'
    | 'proof_band'
    | 'testimonial_rail'
    | 'pricing_grid'
    | 'call_to_action'
    | 'content_columns'
    | 'contact_panel';
  variation: string;
  version?: string;
  primary: Record<string, unknown>;
  items: Record<string, unknown>[];
};

export type PageDocument = {
  id: string;
  uid: string;
  url: string;
  type: 'page';
  data: {
    title: string;
    metaTitle: string;
    metaDescription: string;
    intro?: string;
    slices: CmsSlice[];
  };
};

export type ProductDocument = {
  id: string;
  uid: string;
  url: string;
  type: 'product';
  data: {
    name: string;
    metaTitle: string;
    metaDescription: string;
    tagline: string;
    summary: string;
    category: string;
    audience: string;
    outcome: string;
    accent: string;
    pricingHint: string;
    heroStats: { label: string; value: string }[];
    slices: CmsSlice[];
  };
};

export type SettingsDocument = {
  id: string;
  uid: string;
  type: 'settings';
  data: {
    announcement: string;
    primaryNav: { label: string; href: string }[];
    footerTagline: string;
    footerLinks: { label: string; href: string }[];
    footerResources: { label: string; href: string }[];
    footerContact: { label: string; href: string; value: string }[];
  };
};

export type CmsPage = PageDocument | ProductDocument;

export type SliceContext = {
  products: ProductDocument[];
};
