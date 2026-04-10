export const SITE_URL = 'https://sonicverse.eu';

export const projectAudiences: Record<string, string> = {
  'audio-streaming-stack': 'Independent broadcasters & community radio',
};

export const contactCategoryDefaults = [
  {
    value: 'partnerships',
    label: 'Partnerships & Sponsorships',
    description: 'Brand, sponsorship, and ecosystem collaboration requests.',
  },
  {
    value: 'product-pilot',
    label: 'Product, Pilot & Demo',
    description: 'Product walkthroughs, pilot planning, and roadmap alignment.',
  },
  {
    value: 'technical-support',
    label: 'Technical Support & Bugs',
    description: 'Integration blockers, bug reports, and troubleshooting details.',
  },
  {
    value: 'community',
    label: 'Community & Contributions',
    description: 'Contributor onboarding, events, and open-source participation.',
  },
];

export const supportLinkDefaults = [
  { label: 'Email', href: 'mailto:oss@sonicverse.eu', value: 'oss@sonicverse.eu' },
  { label: 'GitHub', href: 'https://github.com/sonicverse-eu', value: 'sonicverse-eu' },
  { label: 'Community', href: '/community', value: 'Contribution hub' },
];

export const supportNotesDefaults = [
  'Typical response: 1-2 business days',
  'Support requests: include reproducible details',
  'Partnerships: include your timeline and scope',
];

export const staticSitemapRoutes = [
  '/',
  '/about',
  '/community',
  '/contact',
  '/demo',
  '/projects',
  '/blog',
  '/library',
];
