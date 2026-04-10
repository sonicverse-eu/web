import { notFound } from 'next/navigation';
import { getPage } from './content';

export function requirePage(slug: string) {
  const page = getPage(slug);

  if (!page) {
    notFound();
  }

  return page;
}
