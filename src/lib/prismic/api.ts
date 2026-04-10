import { mockPages, mockProducts, mockSettings } from './mock-content';
import type { PageDocument, ProductDocument, SettingsDocument } from './types';

export async function getSettings(): Promise<SettingsDocument> {
  return mockSettings;
}

export async function getPageByUID(uid: string): Promise<PageDocument | null> {
  return mockPages.find((page) => page.uid === uid) ?? null;
}

export async function getProductByUID(uid: string): Promise<ProductDocument | null> {
  return mockProducts.find((product) => product.uid === uid) ?? null;
}

export async function getAllProducts(): Promise<ProductDocument[]> {
  return mockProducts;
}
