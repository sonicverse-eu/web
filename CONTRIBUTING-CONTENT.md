# Content Authoring Guide

This guide explains how to create, edit, and preview MDX content in the Sonicverse repository. All content is stored as Markdown (`.md`) or MDX (`.mdx`) files under `src/content/`. No CMS login is required.

---

## Table of Contents

1. [Overview](#overview)
2. [Content Collections](#content-collections)
3. [Writing MDX Content](#writing-mdx-content)
4. [Frontmatter Reference](#frontmatter-reference)
5. [Custom MDX Components](#custom-mdx-components)
6. [Previewing Locally](#previewing-locally)
7. [Adding a New Blog Post](#adding-a-new-blog-post)
8. [Adding a New Library Entry](#adding-a-new-library-entry)
9. [Adding a Project](#adding-a-project)
10. [Site Settings and Navigation](#site-settings-and-navigation)
11. [Adding or Editing Products](#adding-or-editing-products)
12. [Best Practices](#best-practices)

---

## Overview

Sonicverse uses **file-based MDX content** instead of a headless CMS. Content lives directly in the repository so:

- Every change goes through a PR, giving full history and review.
- No external service credentials are needed to author or preview content.
- Markdown files are plain text — diffable, searchable, and portable.

The stack uses:

- **Markdown / MDX** (`.md` / `.mdx`) with YAML frontmatter, parsed via `gray-matter`.
- **Markdoc** custom tags for rich interactive blocks inside `.md` files.
- **Hardcoded TSX** for structural page sections (hero, CTA, etc.) in `src/app/`.
- **`src/lib/site-data/hardcoded.ts`** for site settings, navigation, footer, and product definitions.

---

## Content Collections

| Collection | Directory | Route |
|---|---|---|
| Blog posts | `src/content/blog/` | `/blog/[slug]` |
| Library entries | `src/content/library/` | `/library/[slug]` |
| Projects | `src/content/projects/` | Used on `/projects` |
| Features | `src/content/features/` | Used on home page |
| FAQ | `src/content/faq/` | Used on various pages |
| Pages | `src/content/pages/` | Misc page data |

Files are sorted alphabetically by filename. Use a date or numeric prefix to control order (e.g. `2026-04-01-my-post.md`).

---

## Writing MDX Content

`.mdx` files are Markdown files that can embed JSX. In this repo, the body of blog posts and library entries is rendered through the **Markdoc** pipeline (not full MDX JSX), so you use Markdoc tags rather than JSX components in those files.

However, you can create new `.mdx` page files directly in `src/app/` for one-off pages — Next.js will treat them as routes.

### Basic file structure

```mdx
---
title: My Post Title
description: A short description for SEO and listing cards.
pubDate: 2026-04-12
author: Your Name
tags: [open-source, audio]
draft: false
---

Your content goes here. Standard Markdown is fully supported.

## Section Heading

Paragraphs, **bold**, _italic_, `inline code`, and [links](https://example.com) all work as expected.

\`\`\`ts
// Fenced code blocks with syntax highlighting
export function hello() {
  return 'world';
}
\`\`\`
```

---

## Frontmatter Reference

### Blog posts (`src/content/blog/`)

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | ✅ | Post title (shown in headings and listings) |
| `description` | string | ✅ | Short summary for SEO and listing cards |
| `pubDate` | date (`YYYY-MM-DD`) | ✅ | Publication date |
| `author` | string | ✅ | Author's display name |
| `tags` | string[] | ✅ | Topic tags (used for filtering and related posts) |
| `image` | string | ❌ | Optional path to a hero image |
| `draft` | boolean | ❌ | Set to `true` to hide from production (default: `false`) |

### Library entries (`src/content/library/`)

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | ✅ | Entry title |
| `description` | string | ✅ | Short summary |
| `pubDate` | date | ❌ | Last updated date |
| `author` | string | ❌ | Optional author |
| `tags` | string[] | ✅ | Topic tags |
| `seoTitle` | string | ❌ | Override title for `<meta>` |
| `seoDescription` | string | ❌ | Override description for `<meta>` |
| `seoImage` | string | ❌ | Override OG image path |
| `draft` | boolean | ❌ | Hides from production when `true` |

### Projects (`src/content/projects/`)

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | ✅ | Project name |
| `summary` | string | ✅ | Short description |
| `repoUrl` | URL string | ✅ | Link to the GitHub repo |
| `status` | enum | ✅ | One of: `active`, `alpha`, `beta`, `stable`, `planned`, `paused`, `research`, `archived` |
| `order` | number | ✅ | Display order (lower = first) |

---

## Custom MDX Components

Inside blog post and library `.md` files, you can use **Markdoc tags** for rich blocks. These are rendered server-side — no client JavaScript required.

### `{% callout %}` — Highlighted note

```markdoc
{% callout title="Good to know" tone="info" %}
This is a callout panel. Use it for tips, warnings, or highlights.
{% /callout %}
```

**Attributes:**
- `title` (string) — Heading for the callout
- `eyebrow` (string, optional) — Small label above the title
- `tone` (string, optional) — Visual tone: `info`, `warning`, `danger`, `success`

---

### `{% steps %}` — Numbered steps

```markdoc
{% steps title="Getting started" eyebrow="Setup" %}
1. Clone the repository
2. Install dependencies with `pnpm install`
3. Run `pnpm dev` to start the dev server
{% /steps %}
```

---

### `{% checklist %}` — Checklist section

```markdoc
{% checklist title="Pre-flight checklist" %}
- Node 22+ installed
- `pnpm` available globally
- Environment variables configured
{% /checklist %}
```

---

### `{% quote %}` — Pull quote

```markdoc
{% quote text="Open-source is the best forcing function for good API design." cite="Rik Visser" /%}
```

---

### `{% stat %}` — Metric highlight

```markdoc
{% stat value="10 000+" label="Listeners" note="Across all deployments" /%}
```

---

### `{% ctaCard %}` — Inline CTA card

```markdoc
{% ctaCard
   title="Try the Audio Streaming Stack"
   summary="Self-hostable, broadcast-ready streaming for independent media."
   href="/projects/audio-streaming-stack"
   label="Open project" /%}
```

---

## Previewing Locally

1. **Install dependencies** (once):
   ```bash
   pnpm install
   ```

2. **Start the dev server**:
   ```bash
   pnpm dev
   ```
   The site is available at `http://localhost:3000`.

3. **Preview draft content**: Pass `?draft=1` is _not_ supported — instead, temporarily set `draft: false` in frontmatter while you review, then revert before merging.

4. **Build check** (catches type errors and broken routes):
   ```bash
   pnpm build
   ```

---

## Adding a New Blog Post

1. Create a new `.md` file in `src/content/blog/`:
   ```
   src/content/blog/2026-04-12-my-post-title.md
   ```
   The filename (without extension) becomes the URL slug, lowercased and with non-alphanumeric characters replaced by hyphens.

2. Add frontmatter:
   ```yaml
   ---
   title: My Post Title
   description: A short description of what this post covers.
   pubDate: 2026-04-12
   author: Your Name
   tags: [open-source, streaming]
   draft: true
   ---
   ```

3. Write your content below the frontmatter using standard Markdown and Markdoc tags.

4. Set `draft: false` when the post is ready to publish.

5. Open a pull request. The post goes live when merged to `main`.

---

## Adding a New Library Entry

Library entries are long-form reference documents (guides, how-tos, runbooks).

1. Create a `.md` file in `src/content/library/`:
   ```
   src/content/library/self-hosting-audio-streaming.md
   ```

2. Add frontmatter (see [Library entries](#library-entries-srccontentlibrary) above).

3. Write reference content. Library entries benefit from `{% steps %}` and `{% checklist %}` tags.

4. Submit a PR.

---

## Adding a Project

Lightweight project metadata lives in `src/content/projects/` for use in listings and overview pages. Detailed product pages use the hardcoded TSX definitions (see [Adding or Editing Products](#adding-or-editing-products)).

1. Create a `.md` file in `src/content/projects/`:
   ```
   src/content/projects/my-new-project.md
   ```

2. Add frontmatter:
   ```yaml
   ---
   title: My New Project
   summary: A short description of what the project does.
   repoUrl: https://github.com/sonicverse-eu/my-new-project
   status: alpha
   order: 2
   ---
   ```

3. Submit a PR.

---

## Site Settings and Navigation

Global site settings (brand name, navigation, footer links, etc.) are defined in:

```
src/lib/site-data/hardcoded.ts
```

Edit the `SETTINGS` export to change:

- **`headerBrandName`** / **`headerBrandTagline`** — Logo area text
- **`primaryNav`** — Top navigation links (label + href)
- **`headerCtaLabel`** / **`headerCtaHref`** — Header CTA button
- **`footerLinks`** / **`footerResources`** / **`footerContact`** — Footer columns
- **`footerLegalText`** — Copyright/legal line

Example — adding a nav link:
```ts
primaryNav: [
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Community', href: '/community' },
  { label: 'About', href: '/about' },
  { label: 'Docs', href: '/library' }, // ← new link
],
```

After editing, run `pnpm build` to confirm the change compiles cleanly.

---

## Adding or Editing Products

Product definitions (for the `/projects` page and the header menu) are in:

```
src/lib/site-data/hardcoded.ts
```

Add an entry to the `PRODUCTS` array:

```ts
{
  id: 'my-product',
  uid: 'my-product',
  url: '/projects/my-product',
  type: 'product',
  data: {
    name: 'My Product',
    metaTitle: 'My Product – Sonicverse',
    metaDescription: 'Short SEO description.',
    tagline: 'One-line pitch.',
    summary: 'A paragraph-length description.',
    category: 'Streaming',         // shown as a pill/badge
    audience: 'Independent radio', // "Best for" field
    outcome: 'Live audio delivery', // "Main value" field
    accent: 'violet',              // colour accent: violet, indigo, sky, emerald, amber, rose
    pricingHint: 'Self-hosted, free',
    heroStats: [
      { label: 'Listeners', value: '10 000+' },
      { label: 'Deployment', value: 'Self-hosted' },
    ],
    slices: [], // leave empty — page sections are hardcoded in src/app/projects/[slug]/page.tsx
  },
},
```

The product page at `/projects/my-product` is rendered by `src/app/projects/[slug]/page.tsx`. To customise a specific project's page sections, edit that route file directly.

---

## Best Practices

### Content quality

- Keep `description` fields under 160 characters for good SEO snippets.
- Use sentence case for headings (not Title Case).
- Prefer short paragraphs (3–5 lines max) for scannability.
- Always add at least one `tag` to blog posts and library entries — tags power related-content and topic navigation.

### Filenames

- Use lowercase, hyphen-separated filenames: `my-post-title.md`.
- Prefix blog posts with `YYYY-MM-DD-` so they sort chronologically in the filesystem.
- Avoid spaces and special characters in filenames.

### Drafts and review

- Always start new posts with `draft: true`.
- Remove the draft flag (or set `draft: false`) only when the post is ready to publish.
- Use `pnpm build` locally to catch any frontmatter validation errors before opening a PR.

### Images

- Store post images in `public/assets/` and reference them with a root-relative path: `/assets/my-image.jpg`.
- Optimise images before committing (target < 200 KB for blog hero images).

### Navigation and structural changes

- Changes to `src/lib/site-data/hardcoded.ts` affect the entire site (header, footer, product listings). Always run `pnpm build` after editing this file.
- Changes to page-level TSX files in `src/app/` also require a build check.

### Pull requests

- Keep content PRs focused: one article or one page change per PR where possible.
- Include a preview screenshot or describe the change in the PR description.
- Tag PRs that touch `src/lib/site-data/hardcoded.ts` or `src/app/` with the `structural` label.
