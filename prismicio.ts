import * as prismic from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';
import sm from './slicemachine.config.json';

export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT ||
  process.env.PRISMIC_REPOSITORY_NAME ||
  sm.repositoryName;

const routes: prismic.Route[] = [
  { type: 'page', uid: 'home', path: '/' },
  { type: 'page', uid: 'pricing', path: '/pricing' },
  { type: 'page', uid: 'about', path: '/about' },
  { type: 'page', uid: 'contact', path: '/contact' },
  { type: 'page', uid: 'demo', path: '/demo' },
  { type: 'page', uid: 'community', path: '/community' },
  { type: 'product', path: '/products/:uid' },
];

export function createClient(config: prismic.ClientConfig = {}) {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === 'production'
        ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
        : { next: { revalidate: 5 } },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
}

export { routes };
