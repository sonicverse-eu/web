import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

// ── Content schemas for the Next.js content loader ───────────────────────────

const pagesSchema = z.object({
  title: z.string(),
  description: z.string(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoImage: z.string().optional(),
  eyebrow: z.string().optional(),
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  secondaryCtaLabel: z.string().optional(),
  secondaryCtaHref: z.string().optional(),
  featureSectionEyebrow: z.string().optional(),
  featureSectionTitle: z.string().optional(),
  projectSectionEyebrow: z.string().optional(),
  projectSectionTitle: z.string().optional(),
  projectLinkLabel: z.string().optional(),
  faqSectionEyebrow: z.string().optional(),
  faqSectionTitle: z.string().optional(),
  blogArticleCtaLabel: z.string().optional(),
  blogBackLabel: z.string().optional(),
  blogFeaturedLabel: z.string().optional(),
  blogArchiveTitle: z.string().optional(),
  blogArchiveDescription: z.string().optional(),
  blogTopicsLabel: z.string().optional(),
  blogNavigationLabel: z.string().optional(),
  blogRelatedTitle: z.string().optional(),
  blogBrowseAllLabel: z.string().optional(),
  contactFormKicker: z.string().optional(),
  contactFormTitle: z.string().optional(),
  contactFormSubtitle: z.string().optional(),
  supportTitle: z.string().optional(),
  supportDescription: z.string().optional(),
  supportLinks: z
    .array(z.object({ label: z.string(), href: z.string(), value: z.string() }))
    .optional(),
  footerDescription: z.string().optional(),
  footerNavHeading: z.string().optional(),
  footerNavLinks: z.array(z.object({ label: z.string(), href: z.string() })).optional(),
  footerConnectHeading: z.string().optional(),
  footerConnectLinks: z
    .array(z.object({ label: z.string(), href: z.string(), value: z.string().optional() }))
    .optional(),
  footerCopyright: z.string().optional(),
  footerBottomLinkLabel: z.string().optional(),
  footerBottomLinkHref: z.string().optional(),
  supportNotes: z.array(z.string()).optional(),
  contactCategories: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
        description: z.string().optional(),
      })
    )
    .optional(),
  metrics: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  partnersLabel: z.string().optional(),
  partners: z
    .array(z.object({ name: z.string(), src: z.string(), href: z.string().url().optional() }))
    .optional(),
  ctaBand: z
    .object({
      eyebrow: z.string().optional(),
      title: z.string(),
      subtitle: z.string().optional(),
      primary: z.object({ label: z.string(), href: z.string() }),
      secondary: z.object({ label: z.string(), href: z.string() }).optional(),
    })
    .optional(),
});

const featuresSchema = z.object({
  title: z.string(),
  summary: z.string(),
  eyebrow: z.string(),
  order: z.number(),
});

const projectsSchema = z.object({
  title: z.string(),
  summary: z.string(),
  repoUrl: z.string().url(),
  status: z.enum([
    'active',
    'alpha',
    'beta',
    'stable',
    'planned',
    'paused',
    'research',
    'archived',
  ]),
  order: z.number(),
});

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
  order: z.number(),
});

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  author: z.string(),
  tags: z.array(z.string()).default([]),
  image: z.string().optional(),
  draft: z.boolean().default(false),
});

const librarySchema = z.object({
  title: z.string(),
  description: z.string(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoImage: z.string().optional(),
  pubDate: z.coerce.date().optional(),
  author: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

// ── Types ─────────────────────────────────────────────────────────────────────

export type PageData = z.output<typeof pagesSchema>;
export type FeatureData = z.output<typeof featuresSchema>;
export type ProjectData = z.output<typeof projectsSchema>;
export type FaqData = z.output<typeof faqSchema>;
export type BlogData = z.output<typeof blogSchema>;
export type LibraryData = z.output<typeof librarySchema>;

export type CollectionEntry<T> = {
  id: string;
  body: string;
  data: T;
};

export type PageEntry = CollectionEntry<PageData>;
export type FeatureEntry = CollectionEntry<FeatureData>;
export type ProjectEntry = CollectionEntry<ProjectData>;
export type FaqEntry = CollectionEntry<FaqData>;
export type BlogEntry = CollectionEntry<BlogData>;
export type LibraryEntry = CollectionEntry<LibraryData>;

// ── Reader ────────────────────────────────────────────────────────────────────

const contentDir = path.join(process.cwd(), 'src/content');

function readCollection<S extends z.ZodTypeAny>(
  collection: string,
  schema: S
): CollectionEntry<z.output<S>>[] {
  const dir = path.join(contentDir, collection);
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .sort();

  return files.map((file) => {
    const baseName = file.replace(/\.mdx?$/, '');
    const id =
      baseName
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/(^-|-$)/g, '') || 'post';
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data, content } = matter(raw);

    return {
      id,
      body: content,
      data: schema.parse(data),
    };
  });
}

// ── Public API ────────────────────────────────────────────────────────────────

export function getPages(): PageEntry[] {
  return readCollection('pages', pagesSchema);
}

export function getPage(slug: string): PageEntry | undefined {
  return getPages().find((entry) => entry.id === slug);
}

export function getFeatures(): FeatureEntry[] {
  return readCollection('features', featuresSchema);
}

export function getProjects(): ProjectEntry[] {
  return readCollection('projects', projectsSchema);
}

export function getProject(slug: string): ProjectEntry | undefined {
  return getProjects().find((entry) => entry.id === slug);
}

export function getFaqs(): FaqEntry[] {
  return readCollection('faq', faqSchema);
}

export function getBlogPosts(includeDrafts = false): BlogEntry[] {
  const posts = readCollection('blog', blogSchema);
  return includeDrafts ? posts : posts.filter((p) => !p.data.draft);
}

export function getBlogPost(slug: string): BlogEntry | undefined {
  return getBlogPosts(true).find((entry) => entry.id === slug);
}

export function getLibraryEntries(includeDrafts = false): LibraryEntry[] {
  const entries = readCollection('library', librarySchema);
  return includeDrafts ? entries : entries.filter((e) => !e.data.draft);
}

export function getLibraryEntry(slug: string): LibraryEntry | undefined {
  return getLibraryEntries(true).find((entry) => entry.id === slug);
}
