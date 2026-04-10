import { mockPages, mockProducts, mockSettings } from './mock-content';
import type { PageDocument, ProductDocument, SettingsDocument } from './types';

const ACTIVE_PRODUCT_UID = 'audio-streaming-stack';

export async function getSettings(): Promise<SettingsDocument> {
  return mockSettings;
}

export async function getPageByUID(uid: string): Promise<PageDocument | null> {
  if (uid === 'pricing') {
    return null;
  }

  return mockPages.find((page) => page.uid === uid) ?? null;
}

export async function getProductByUID(uid: string): Promise<ProductDocument | null> {
  if (uid !== ACTIVE_PRODUCT_UID) {
    return null;
  }

  return mockProducts.find((product) => product.uid === ACTIVE_PRODUCT_UID) ?? null;
}

export async function getAllProducts(): Promise<ProductDocument[]> {
  return mockProducts.filter((product) => product.uid === ACTIVE_PRODUCT_UID);
}
