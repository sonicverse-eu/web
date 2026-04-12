/**
 * Site-data API – no longer backed by Prismic.
 * All content is now sourced from hardcoded TSX/MDX files.
 * See src/lib/site-data/hardcoded.ts for settings and products.
 * See src/content/** for MDX page content.
 */
import type { SettingsDocument, ProductDocument } from './types';
import { SETTINGS, PRODUCTS } from './hardcoded';

export async function getSettings(): Promise<SettingsDocument | null> {
  return SETTINGS;
}

export async function getAllProducts(): Promise<ProductDocument[]> {
  return PRODUCTS;
}

export async function getProductByUID(uid: string): Promise<ProductDocument | null> {
  return PRODUCTS.find((p) => p.uid === uid) ?? null;
}
