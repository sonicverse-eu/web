import type {
  BlogEntry,
  FaqEntry,
  FeatureEntry,
  LibraryEntry,
  PageEntry,
  ProjectEntry,
} from './lib/content';

export type PageContent = PageEntry;
export type FeatureContent = FeatureEntry;
export type ProjectContent = ProjectEntry;
export type FaqContent = FaqEntry;
export type BlogContent = BlogEntry;
export type LibraryContent = LibraryEntry;

export type PageContentData = PageContent['data'];
export type FeatureContentData = FeatureContent['data'];
export type ProjectContentData = ProjectContent['data'];
export type FaqContentData = FaqContent['data'];
export type BlogContentData = BlogContent['data'];
export type LibraryContentData = LibraryContent['data'];
