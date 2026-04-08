import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/pages' }),
  schema: z.object({
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
    contactFormKicker: z.string().optional(),
    contactFormTitle: z.string().optional(),
    contactFormSubtitle: z.string().optional(),
    supportTitle: z.string().optional(),
    supportDescription: z.string().optional(),
    supportLinks: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
          value: z.string()
        })
      )
      .optional(),
    footerDescription: z.string().optional(),
    footerNavHeading: z.string().optional(),
    footerNavLinks: z
      .array(
        z.object({
          label: z.string(),
          href: z.string()
        })
      )
      .optional(),
    footerConnectHeading: z.string().optional(),
    footerConnectLinks: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
          value: z.string().optional()
        })
      )
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
          description: z.string().optional()
        })
      )
      .optional()
  })
});

const features = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/features' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    eyebrow: z.string(),
    order: z.number()
  })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/projects' }),
  schema: z.object({
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
      'archived'
    ]),
    order: z.number()
  })
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number()
  })
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

export const collections = {
  pages,
  features,
  projects,
  faq,
  blog
};
