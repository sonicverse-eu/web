import type { Metadata } from 'next';
import type { BlogEntry, LibraryEntry, PageEntry, ProjectEntry } from './content';
import { SITE_URL } from './site';

type ArticleLike = BlogEntry | LibraryEntry;

function absoluteUrl(path?: string) {
  if (!path) return undefined;
  return new URL(path, SITE_URL).toString();
}

export function buildPageMetadata(page: PageEntry): Metadata {
  const title = page.data.seoTitle ?? page.data.title;
  const description = page.data.seoDescription ?? page.data.description;
  const image = absoluteUrl(page.data.seoImage ?? '/og-image.svg');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/${page.id === 'home' ? '' : page.id}`),
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function buildProjectMetadata(project: ProjectEntry): Metadata {
  return {
    title: project.data.title,
    description: project.data.summary,
    openGraph: {
      title: project.data.title,
      description: project.data.summary,
      url: absoluteUrl(`/projects/${project.id}`),
      images: [{ url: absoluteUrl('/og-image.svg')! }],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.data.title,
      description: project.data.summary,
      images: [absoluteUrl('/og-image.svg')!],
    },
  };
}

export function buildArticleMetadata(
  entry: ArticleLike,
  slugBase: 'blog' | 'library'
): Metadata {
  const seoTitle = 'seoTitle' in entry.data ? entry.data.seoTitle : undefined;
  const seoDescription = 'seoDescription' in entry.data ? entry.data.seoDescription : undefined;
  const seoImage = 'seoImage' in entry.data ? entry.data.seoImage : undefined;
  const image = absoluteUrl(
    seoImage ?? ('image' in entry.data ? entry.data.image : undefined) ?? '/og-image.svg'
  );
  const title = seoTitle ?? entry.data.title;
  const description = seoDescription ?? entry.data.description;

  return {
    title,
    description,
    authors: entry.data.author ? [{ name: entry.data.author }] : undefined,
    openGraph: {
      type: 'article',
      title,
      description,
      url: absoluteUrl(`/${slugBase}/${entry.id}`),
      publishedTime: entry.data.pubDate?.toISOString(),
      authors: entry.data.author ? [entry.data.author] : undefined,
      tags: entry.data.tags,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
