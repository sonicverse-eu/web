import { createClient, repositoryName } from '../../../prismicio';
import { mockPages, mockProducts, mockSettings } from './mock-content';
import type { PageDocument, ProductDocument, SettingsDocument } from './types';

function hasRepositoryAccess() {
  return Boolean(repositoryName && process.env.PRISMIC_ACCESS_TOKEN);
}

export async function getSettings(): Promise<SettingsDocument> {
  if (!hasRepositoryAccess()) {
    return mockSettings;
  }

  const client = createClient({ accessToken: process.env.PRISMIC_ACCESS_TOKEN });
  const doc = await client.getSingle('settings');

  return doc as unknown as SettingsDocument;
}

export async function getPageByUID(uid: string): Promise<PageDocument | null> {
  if (!hasRepositoryAccess()) {
    return mockPages.find((page) => page.uid === uid) ?? null;
  }

  const client = createClient({ accessToken: process.env.PRISMIC_ACCESS_TOKEN });

  try {
    const doc = await client.getByUID('page', uid);
    return doc as unknown as PageDocument;
  } catch {
    return null;
  }
}

export async function getProductByUID(uid: string): Promise<ProductDocument | null> {
  if (!hasRepositoryAccess()) {
    return mockProducts.find((product) => product.uid === uid) ?? null;
  }

  const client = createClient({ accessToken: process.env.PRISMIC_ACCESS_TOKEN });

  try {
    const doc = await client.getByUID('product', uid);
    return doc as unknown as ProductDocument;
  } catch {
    return null;
  }
}

export async function getAllProducts(): Promise<ProductDocument[]> {
  if (!hasRepositoryAccess()) {
    return mockProducts;
  }

  const client = createClient({ accessToken: process.env.PRISMIC_ACCESS_TOKEN });
  const docs = await client.getAllByType('product');

  return docs as unknown as ProductDocument[];
}
