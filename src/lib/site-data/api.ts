import * as prismic from '@prismicio/client';
import { mockPages, mockProducts, mockSettings } from './mock-content';
import type {
  CmsSlice,
  PageDocument,
  PrimaryNavItem,
  ProductDocument,
  SettingsDocument,
} from './types';

const repositoryName = 'sonicverse-eu';
const pageSingletonTypes = ['home', 'about', 'community', 'contact', 'projects', 'blog'] as const;

const routes: prismic.ClientConfig['routes'] = [
  { type: 'home', path: '/' },
  { type: 'about', path: '/about' },
  { type: 'community', path: '/community' },
  { type: 'contact', path: '/contact' },
  { type: 'projects', path: '/projects' },
  { type: 'blog', path: '/blog' },
  { type: 'page', path: '/:uid' },
  { type: 'product', path: '/projects/:uid' },
];

function createClient() {
  return prismic.createClient(repositoryName, { routes });
}

function textValue(value: unknown, fallback = ''): string {
  if (typeof value === 'string') {
    return value;
  }

  return fallback;
}

function arrayValue<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function linkValue(value: unknown, fallback = ''): string {
  const linkField = value as prismic.LinkField | prismic.PrismicDocument | null | undefined;
  const href = prismic.asLink(linkField) ?? fallback;
  return href || fallback;
}

function toSliceZone(value: unknown): CmsSlice[] {
  return arrayValue<CmsSlice>(value);
}

function normalizePageUrl(uid: string, url?: string | null) {
  if (url) {
    return url;
  }

  return uid === 'home' ? '/' : `/${uid}`;
}

function mapPageDocument(document: prismic.PrismicDocument, requestedUID: string): PageDocument {
  const data = document.data as Record<string, unknown>;
  const uid = document.uid ?? requestedUID;

  return {
    id: document.id,
    uid,
    url: normalizePageUrl(uid, document.url),
    type: 'page',
    data: {
      title: textValue(data.title, textValue(data.meta_title, uid || 'Page')),
      metaTitle: textValue(data.meta_title, textValue(data.metaTitle, '')),
      metaDescription: textValue(data.meta_description, textValue(data.metaDescription, '')),
      intro: textValue(data.intro, ''),
      articleShell: undefined,
      slices: toSliceZone(data.slices),
    },
  };
}

async function getPageFromSingleton(client: prismic.Client, uid: string): Promise<PageDocument | null> {
  if (!pageSingletonTypes.includes(uid as (typeof pageSingletonTypes)[number])) {
    return null;
  }

  try {
    const singleton = await client.getSingle(uid);
    return mapPageDocument(singleton, uid);
  } catch (error) {
    if (error instanceof prismic.NotFoundError) {
      return null;
    }

    throw error;
  }
}

function mapSettingsNav(value: unknown): PrimaryNavItem[] {
  return arrayValue<Record<string, unknown>>(value).reduce<PrimaryNavItem[]>((items, item) => {
      const label = textValue(item.label, '').trim();
      const href = linkValue(item.href, '').trim();

      if (!label || !href) {
        return items;
      }

      items.push({
        label,
        href,
        children: undefined,
      });

      return items;
    }, []);
}

function mapLinkGroup(value: unknown) {
  return arrayValue<Record<string, unknown>>(value)
    .map((item) => {
      const label = textValue(item.label, '').trim();
      const href = linkValue(item.href, '').trim();

      if (!label || !href) {
        return null;
      }

      return { label, href };
    })
    .filter((item): item is { label: string; href: string } => Boolean(item));
}

function mapContactGroup(value: unknown) {
  return arrayValue<Record<string, unknown>>(value)
    .map((item) => {
      const label = textValue(item.label, '').trim();
      const href = linkValue(item.href, '').trim();
      const contactValue = textValue(item.value, '').trim();

      if (!label || !href || !contactValue) {
        return null;
      }

      return { label, href, value: contactValue };
    })
    .filter((item): item is { label: string; href: string; value: string } => Boolean(item));
}

function mapSettingsDocument(document: prismic.PrismicDocument): SettingsDocument {
  const data = document.data as Record<string, unknown>;

  return {
    id: document.id,
    uid: document.uid ?? 'settings',
    type: 'settings',
    data: {
      announcement: textValue(data.announcement, ''),
      headerBrandName: textValue(data.header_brand_name, ''),
      headerBrandTagline: textValue(data.header_brand_tagline, ''),
      primaryNav: mapSettingsNav(data.primary_nav),
      headerLoginLabel: textValue(data.header_login_label, ''),
      headerLoginHref: linkValue(data.header_login_href, ''),
      headerCtaLabel: textValue(data.header_cta_label, ''),
      headerCtaHref: linkValue(data.header_cta_href, ''),
      productsMenuEyebrow: textValue(data.products_menu_eyebrow, ''),
      productsMenuTitle: textValue(data.products_menu_title, ''),
      productsMenuDescription: textValue(data.products_menu_description, ''),
      footerBrandName: textValue(data.footer_brand_name, ''),
      footerBrandTagline: textValue(data.footer_brand_tagline, ''),
      footerTagline: textValue(data.footer_tagline, ''),
      footerLegalText: textValue(data.footer_legal_text, ''),
      footerLinks: mapLinkGroup(data.footer_links),
      footerResources: mapLinkGroup(data.footer_resources),
      footerContact: mapContactGroup(data.footer_contact),
      footerBottomLinks: mapLinkGroup(data.footer_bottom_links),
    },
  };
}

function mapProductDocument(document: prismic.PrismicDocument): ProductDocument {
  const data = document.data as Record<string, unknown>;
  const uid = document.uid ?? '';

  return {
    id: document.id,
    uid,
    url: document.url ?? `/projects/${uid}`,
    type: 'product',
    data: {
      name: textValue(data.name, uid),
      metaTitle: textValue(data.meta_title, textValue(data.metaTitle, textValue(data.name, uid))),
      metaDescription: textValue(data.meta_description, textValue(data.metaDescription, '')),
      tagline: textValue(data.tagline, ''),
      summary: textValue(data.summary, ''),
      category: textValue(data.category, 'Products'),
      audience: textValue(data.audience, ''),
      outcome: textValue(data.outcome, ''),
      accent: textValue(data.accent, 'violet'),
      pricingHint: textValue(data.pricing_hint, textValue(data.pricingHint, '')),
      heroStats: arrayValue<Record<string, unknown>>(data.hero_stats)
        .map((item) => ({
          label: textValue(item.label, '').trim(),
          value: textValue(item.value, '').trim(),
        }))
        .filter((item) => item.label && item.value),
      slices: toSliceZone(data.slices),
    },
  };
}

export async function getSettings(): Promise<SettingsDocument> {
  try {
    const client = createClient();
    const settings = await client.getSingle('settings');
    return mapSettingsDocument(settings);
  } catch {
    return mockSettings;
  }
}

export async function getPageByUID(uid: string): Promise<PageDocument | null> {
  try {
    const client = createClient();

    const singletonPage = await getPageFromSingleton(client, uid);

    if (singletonPage) {
      return singletonPage;
    }

    const page = await client.getByUID('page', uid);
    return mapPageDocument(page, uid);
  } catch (error) {
    if (error instanceof prismic.NotFoundError) {
      return mockPages.find((page) => page.uid === uid) ?? null;
    }

    return mockPages.find((page) => page.uid === uid) ?? null;
  }
}

export async function getProductByUID(uid: string): Promise<ProductDocument | null> {
  const products = await getAllProducts();
  return products.find((product) => product.uid === uid) ?? null;
}

export async function getAllProducts(): Promise<ProductDocument[]> {
  try {
    const client = createClient();
    const products = await client.getAllByType('product');

    if (!products.length) {
      return mockProducts;
    }

    return products.map(mapProductDocument);
  } catch {
    return mockProducts;
  }
}
