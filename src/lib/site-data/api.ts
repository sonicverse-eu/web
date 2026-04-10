import type { PageDocument, ProductDocument, SettingsDocument } from './types';

const PRISMIC_API_ENDPOINT = process.env.PRISMIC_API_ENDPOINT ?? 'https://sonicverse-eu.cdn.prismic.io/api/v2';

type PrismicSearchResponse = {
  results?: PrismicDocument[];
};

type PrismicApiResponse = {
  refs?: Array<{
    ref: string;
    isMasterRef?: boolean;
  }>;
};

type PrismicDocument = {
  id: string;
  uid: string | null;
  type: string;
  data?: Record<string, unknown>;
};

let masterRefPromise: Promise<string> | null = null;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function asRecord(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function toCamelCaseKey(key: string): string {
  return key.replace(/[_-]([a-z])/g, (_, char: string) => char.toUpperCase());
}

function isRichTextBlockArray(value: unknown): value is Array<{ text?: unknown; type?: unknown }> {
  return Array.isArray(value)
    && value.length > 0
    && value.every((item) => isRecord(item) && ('text' in item || 'type' in item));
}

function richTextToPlainText(value: Array<{ text?: unknown }>): string {
  return value
    .map((block) => (typeof block.text === 'string' ? block.text : ''))
    .filter(Boolean)
    .join(' ')
    .trim();
}

function normalizeCmsValue(value: unknown): unknown {
  if (isRichTextBlockArray(value)) {
    return richTextToPlainText(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeCmsValue(item));
  }

  if (isRecord(value)) {
    if (typeof value.url === 'string' && value.url.length > 0) {
      return value.url;
    }

    if (typeof value.link_type === 'string') {
      if (typeof value.url === 'string') {
        return value.url;
      }

      if (typeof value.uid === 'string') {
        return `/${value.uid}`;
      }

      return '';
    }

    const normalized: Record<string, unknown> = {};

    Object.entries(value).forEach(([key, nestedValue]) => {
      normalized[toCamelCaseKey(key)] = normalizeCmsValue(nestedValue);
    });

    return normalized;
  }

  return value;
}

function normalizeCmsRecord(value: unknown): Record<string, unknown> {
  return asRecord(normalizeCmsValue(value));
}

function toPageUrl(uid: string): string {
  return uid === 'home' ? '/' : `/${uid}`;
}

function toProductUrl(uid: string): string {
  return `/projects/${uid}`;
}

function mapSlices(value: unknown) {
  return asArray(normalizeCmsValue(value)).map((slice, index) => {
    const rawSlice = asRecord(slice);
    const primary = asRecord(rawSlice.primary);

    return {
      id: asString(rawSlice.id) || `${asString(rawSlice.sliceType) || asString(rawSlice.slice_type)}-${index + 1}`,
      slice_type: asString(rawSlice.sliceType || rawSlice.slice_type) as PageDocument['data']['slices'][number]['slice_type'],
      variation: asString(rawSlice.variation),
      version: asString(rawSlice.version) || undefined,
      primary,
      items: asArray(rawSlice.items).map((item) => asRecord(item)),
    };
  });
}

function mapSettings(document: PrismicDocument): SettingsDocument {
  const data = normalizeCmsRecord(document.data);
  const primaryNav = asArray(data.primaryNav).map((item) => {
    const navItem = asRecord(item);
    const children = asArray(navItem.children).map((child) => {
      const navChild = asRecord(child);
      return {
        label: asString(navChild.label),
        href: asString(navChild.href),
        description: asString(navChild.description) || undefined,
      };
    }).filter((child) => child.label && child.href);

    return {
      label: asString(navItem.label),
      href: asString(navItem.href),
      children: children.length ? children : undefined,
    };
  }).filter((item) => item.label && item.href);

  const footerLinks = asArray(data.footerLinks).map((item) => {
    const link = asRecord(item);
    return {
      label: asString(link.label),
      href: asString(link.href),
    };
  }).filter((link) => link.label && link.href);

  const footerResources = asArray(data.footerResources).map((item) => {
    const link = asRecord(item);
    return {
      label: asString(link.label),
      href: asString(link.href),
    };
  }).filter((link) => link.label && link.href);

  const footerContact = asArray(data.footerContact).map((item) => {
    const link = asRecord(item);
    return {
      label: asString(link.label),
      href: asString(link.href),
      value: asString(link.value),
    };
  }).filter((link) => link.label && link.href && link.value);

  return {
    id: document.id,
    uid: document.uid ?? 'settings',
    type: 'settings',
    data: {
      announcement: asString(data.announcement),
      primaryNav,
      headerLoginLabel: asString(data.headerLoginLabel) || undefined,
      headerLoginHref: asString(data.headerLoginHref) || undefined,
      headerCtaLabel: asString(data.headerCtaLabel) || undefined,
      headerCtaHref: asString(data.headerCtaHref) || undefined,
      productsMenuEyebrow: asString(data.productsMenuEyebrow) || undefined,
      productsMenuTitle: asString(data.productsMenuTitle) || undefined,
      productsMenuDescription: asString(data.productsMenuDescription) || undefined,
      footerTagline: asString(data.footerTagline),
      footerLinks,
      footerResources,
      footerContact,
    },
  };
}

function createEmptySettings(): SettingsDocument {
  return {
    id: 'settings-empty',
    uid: 'settings',
    type: 'settings',
    data: {
      announcement: '',
      primaryNav: [],
      headerLoginLabel: undefined,
      headerLoginHref: undefined,
      headerCtaLabel: undefined,
      headerCtaHref: undefined,
      productsMenuEyebrow: undefined,
      productsMenuTitle: undefined,
      productsMenuDescription: undefined,
      footerTagline: '',
      footerLinks: [],
      footerResources: [],
      footerContact: [],
    },
  };
}

function mapPage(document: PrismicDocument): PageDocument | null {
  const uid = document.uid;

  if (!uid) {
    return null;
  }

  const data = normalizeCmsRecord(document.data);

  return {
    id: document.id,
    uid,
    url: toPageUrl(uid),
    type: 'page',
    data: {
      title: asString(data.title),
      metaTitle: asString(data.metaTitle),
      metaDescription: asString(data.metaDescription),
      intro: asString(data.intro) || undefined,
      articleShell: asRecord(data.articleShell) as PageDocument['data']['articleShell'],
      slices: mapSlices(data.slices),
    },
  };
}

function mapProduct(document: PrismicDocument): ProductDocument | null {
  const uid = document.uid;

  if (!uid) {
    return null;
  }

  const data = normalizeCmsRecord(document.data);

  return {
    id: document.id,
    uid,
    url: toProductUrl(uid),
    type: 'product',
    data: {
      name: asString(data.name),
      metaTitle: asString(data.metaTitle),
      metaDescription: asString(data.metaDescription),
      tagline: asString(data.tagline),
      summary: asString(data.summary),
      category: asString(data.category),
      audience: asString(data.audience),
      outcome: asString(data.outcome),
      accent: asString(data.accent),
      pricingHint: asString(data.pricingHint),
      heroStats: asArray(data.heroStats).map((item) => {
        const stat = asRecord(item);
        return {
          label: asString(stat.label),
          value: asString(stat.value),
        };
      }).filter((stat) => stat.label && stat.value),
      slices: mapSlices(data.slices),
    },
  };
}

function quoted(value: string): string {
  return `"${value.replace(/"/g, '\\"')}"`;
}

function predicateAt(path: string, value: string): string {
  return `at(${path}, ${quoted(value)})`;
}

async function getMasterRef(): Promise<string> {
  if (!masterRefPromise) {
    masterRefPromise = (async () => {
      const response = await fetch(PRISMIC_API_ENDPOINT, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        throw new Error(`Failed to load Prismic API endpoint (${response.status})`);
      }

      const payload = (await response.json()) as PrismicApiResponse;
      const refs = payload.refs ?? [];
      const master = refs.find((ref) => ref.isMasterRef) ?? refs[0];

      if (!master?.ref) {
        throw new Error('No Prismic ref returned from API endpoint');
      }

      return master.ref;
    })();
  }

  return masterRefPromise;
}

async function searchDocuments(predicates: string[], pageSize = 100): Promise<PrismicDocument[]> {
  const ref = await getMasterRef();
  const url = new URL(`${PRISMIC_API_ENDPOINT}/documents/search`);

  url.searchParams.set('ref', ref);
  url.searchParams.set('pageSize', String(pageSize));
  if (predicates.length) {
    url.searchParams.set('q', `[[${predicates.join('][')}]]`);
  }

  const response = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Failed to load Prismic documents (${response.status}) for ${url.toString()} :: ${details.slice(0, 300)}`);
  }

  const payload = (await response.json()) as PrismicSearchResponse;
  return payload.results ?? [];
}

export async function getSettings(): Promise<SettingsDocument> {
  const settingsByType = await searchDocuments([predicateAt('document.type', 'settings')], 1);
  let settingsDoc: PrismicDocument | null = settingsByType[0] ?? null;

  if (!settingsDoc) {
    const pages = await searchDocuments([predicateAt('document.type', 'page')]);
    settingsDoc = pages.find((document) => document.uid === 'settings') ?? null;
  }

  if (!settingsDoc) {
    return createEmptySettings();
  }

  return mapSettings(settingsDoc);
}

export async function getPageByUID(uid: string): Promise<PageDocument | null> {
  const pages = await searchDocuments([predicateAt('document.type', 'page')]);
  const match = pages.find((document) => document.uid === uid);
  return match ? mapPage(match) : null;
}

export async function getProductByUID(uid: string): Promise<ProductDocument | null> {
  const products = await searchDocuments([predicateAt('document.type', 'product')]);
  const match = products.find((document) => document.uid === uid);
  return match ? mapProduct(match) : null;
}

export async function getAllProducts(): Promise<ProductDocument[]> {
  const results = await searchDocuments([predicateAt('document.type', 'product')]);

  return results
    .map((document) => mapProduct(document))
    .filter((product): product is ProductDocument => Boolean(product));
}
