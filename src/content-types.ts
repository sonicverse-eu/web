import type { CollectionEntry } from 'astro:content';

export type PageContent = CollectionEntry<'pages'>;
export type FeatureContent = CollectionEntry<'features'>;
export type ProjectContent = CollectionEntry<'projects'>;
export type FaqContent = CollectionEntry<'faq'>;
export type BlogContent = CollectionEntry<'blog'>;
export type LibraryContent = CollectionEntry<'library'>;

export type PageContentData = PageContent['data'];
export type FeatureContentData = FeatureContent['data'];
export type ProjectContentData = ProjectContent['data'];
export type FaqContentData = FaqContent['data'];
export type BlogContentData = BlogContent['data'];
export type LibraryContentData = LibraryContent['data'];
