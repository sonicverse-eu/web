# Astro Repo Patterns

## Stack

- Astro 6 with Node adapter in standalone mode
- `@astrojs/markdoc` for `.mdoc` content
- `@astrojs/react` enabled, but not the default choice for content pages
- Tailwind v4 through `@tailwindcss/vite`
- `motion` used in the shared layout for reveal and scroll effects

## Content Model

- `pages`: static marketing/editorial page copy, including hero fields and some contact form option data
- `features`: ordered feature highlights
- `projects`: ordered project cards with `repoUrl`, `status`, and `summary`
- `faq`: ordered question/answer entries
- `blog`: dated articles with author, tags, optional image, and `draft`

Default approach:

1. Put reusable editorial content in `src/content/...`.
2. Keep `src/pages/*.astro` focused on querying collections and composing sections.
3. Extend schemas before adding new frontmatter fields.

## Layout Pattern

`src/layouts/Layout.astro` already handles:

- canonical URL creation
- Open Graph and Twitter tags
- JSON-LD structured data
- article-specific metadata
- global motion bootstrapping
- persistent header/footer
- page transitions

Prefer passing props into this layout instead of duplicating these concerns elsewhere.

## Styling Pattern

Global design tokens live in `src/styles/global.css`.

Current visual language:

- light background with violet-tinted atmosphere
- glassy surfaces and soft glows
- rounded containers
- animated reveal transitions
- sticky translucent top nav

When changing visuals, extend this system rather than replacing it casually.

## Change Heuristics

- New long-form or structured marketing copy: use content collections.
- New reusable section: create or extend a component in `src/components/`.
- Site-wide metadata or motion behavior: change `Layout.astro`.
- One-off page structure: update the relevant `src/pages/*.astro` file.
