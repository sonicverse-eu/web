---
name: astro-site
description: Implement, refactor, and review Astro code for this repository, including `.astro` pages and layouts, `astro:content` collections, Markdoc-backed content, routing, metadata, transitions, and site-wide styling. Use when Codex needs to add or change pages, collections, layouts, content-driven sections, or Astro configuration in this codebase.
---

# Astro Site

Use this skill for repo-specific Astro work. Prefer the existing content-model and layout conventions over introducing new patterns.

## Quick Start

Before editing:

1. Read `astro.config.mjs`, `src/content.config.ts`, the target page, and `src/layouts/Layout.astro`.
2. Decide whether the change belongs in content, a page template, or a shared component.
3. Preserve the current stack: Astro + Markdoc + React integration + Tailwind v4 via Vite.

If the change affects data shape or content loading, read `references/repo-patterns.md`.

## Repo Defaults

- Use content collections for page copy and structured content instead of hardcoding repeated marketing text into page files.
- Keep route files in `src/pages/` thin. Move repeated chrome and metadata concerns into layouts or components.
- Reuse `Layout.astro`, `SiteHeader.astro`, and `SiteFooter.astro` unless the task explicitly calls for a new shell.
- Preserve the current transition and motion approach unless the task is specifically about changing it.
- Favor small Astro components over large pages with many inline sections.

## Content And Routing

- `src/content.config.ts` is the source of truth for collection schemas.
- When adding fields to content entries, update the relevant Zod schema first.
- Keep collection names and frontmatter semantics consistent with existing entries under `src/content/`.
- Use Markdoc-backed content for rich editorial or structured page copy when the content belongs with the CMS-like collections.
- Keep `draft` handling and blog metadata behavior aligned with existing blog pages.

## Layout And Metadata

- Put canonical, Open Graph, Twitter, and JSON-LD changes in `src/layouts/Layout.astro` or in clearly-scoped layout props.
- Avoid duplicating metadata logic across page files.
- When adding a new page, pass `title`, `description`, and `currentPath` deliberately.
- Keep structured data coherent with the page type instead of injecting unrelated schema.

## Styling

- Treat `src/styles/global.css` as the site design system.
- Reuse existing custom properties, spacing rhythm, and glass/glow language before adding new tokens.
- Keep global style changes small and intentional. If a style is page-specific, prefer scoping it to the component or page.
- Do not introduce a conflicting font, color system, or animation style without a clear redesign request.

## Implementation Rules

- Preserve Astro-first rendering. Only introduce React where interactivity materially requires it.
- Do not add client-side complexity for static sections.
- Prefer readable server-side data preparation in frontmatter over pushing content transformation into the template body.
- Keep accessibility intact: semantic headings, landmarks, usable link text, and reduced-motion respect.

## Validation

- Run `pnpm build` after meaningful Astro or schema changes.
- If the build fails because of unrelated pre-existing issues, note that clearly.
- For content changes, sanity-check the affected route and any generated metadata.

## References

- Repo patterns: `references/repo-patterns.md`
