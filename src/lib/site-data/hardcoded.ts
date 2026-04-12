/**
 * Hardcoded site-data: replaces Prismic CMS for settings, navigation,
 * footer, and products. Edit this file to update site-wide content.
 */
import type { SettingsDocument, ProductDocument } from './types';

export const SETTINGS: SettingsDocument = {
  id: 'settings',
  uid: 'settings',
  type: 'settings',
  data: {
    announcement: '',
    headerBrandName: 'Sonicverse',
    headerBrandTagline: 'OSS for independent media',
    primaryNav: [
      { label: 'Projects', href: '/projects' },
      { label: 'Blog', href: '/blog' },
      { label: 'Community', href: '/community' },
      { label: 'About', href: '/about' },
    ],
    headerLoginLabel: 'Docs',
    headerLoginHref: '/library',
    headerCtaLabel: 'Get in touch',
    headerCtaHref: '/contact',
    productsMenuEyebrow: 'Our Projects',
    productsMenuTitle: 'Open-source tools for independent media',
    productsMenuDescription:
      'A suite of open-source products for radiostations, podcasts, and media operators.',
    footerBrandName: 'Sonicverse',
    footerBrandTagline: 'OSS for independent media',
    footerTagline:
      'Sonicverse helps independent media with tools to build, grow, and monetize their audience.',
    footerLegalText: 'All rights reserved.',
    footerLinks: [
      { label: 'About', href: '/about' },
      { label: 'Community', href: '/community' },
      { label: 'Contact', href: '/contact' },
    ],
    footerResources: [
      { label: 'Blog', href: '/blog' },
      { label: 'Library', href: '/library' },
      { label: 'Projects', href: '/projects' },
    ],
    footerContact: [
      { label: 'Email', href: 'mailto:oss@sonicverse.eu', value: 'oss@sonicverse.eu' },
      { label: 'GitHub', href: 'https://github.com/sonicverse-eu', value: 'sonicverse-eu' },
    ],
    footerBottomLinks: [
      { label: 'Privacy', href: '/privacy' },
    ],
  },
};

export const PRODUCTS: ProductDocument[] = [
  {
    id: 'audio-streaming-stack',
    uid: 'audio-streaming-stack',
    url: '/projects/audio-streaming-stack',
    type: 'product',
    data: {
      name: 'Audio Streaming Stack',
      metaTitle: 'Audio Streaming Stack – Sonicverse',
      metaDescription:
        'Open-source streaming infrastructure for independent broadcasters and community radio.',
      tagline: 'Broadcast-ready streaming for independent media',
      summary:
        'A fully self-hostable streaming stack built for independent broadcasters and community radio stations.',
      category: 'Streaming',
      audience: 'Independent broadcasters & community radio',
      outcome: 'Reliable, low-cost live audio delivery',
      accent: 'violet',
      pricingHint: 'Self-hosted, free',
      heroStats: [
        { label: 'Listeners', value: '10 000+' },
        { label: 'Deployment', value: 'Self-hosted' },
      ],
      slices: [],
    },
  },
];
