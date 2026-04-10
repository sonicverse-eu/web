import type { Metadata } from 'next';
import type { PageDocument, ProductDocument } from './types';

export function buildMetadata(document: PageDocument | ProductDocument): Metadata {
  const title =
    'name' in document.data ? document.data.metaTitle || document.data.name : document.data.metaTitle || document.data.title;
  const description = document.data.metaDescription;

  return {
    title: {
      absolute: title,
    },
    description,
    openGraph: {
      title,
      description,
      url: document.url,
      siteName: 'Sonicverse',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
