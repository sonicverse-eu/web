import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroTitle: z.string(),
    heroSubtitle: z.string(),
    ctaLabel: z.string().optional(),
    ctaHref: z.string().optional(),
    contactDepartments: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
          description: z.string().optional()
        })
      )
      .optional(),
    contactCategories: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
          description: z.string().optional()
        })
      )
      .optional(),
    contactPriorities: z
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
    status: z.enum(['active', 'beta', 'research']),
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