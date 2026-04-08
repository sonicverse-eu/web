# Codacy AI Reviewer Instructions

Use this repository context when reviewing pull requests for `sonicverse-eu/web`.

## Purpose

- Astro-powered marketing and content site for the Sonicverse open source initiative.
- Content-driven pages, custom layouts, and motion-based presentation layers.

## Architecture

- Astro 6 with the Node adapter in `standalone` mode.
- Markdoc and Markdown content collections loaded from `src/content/**`.
- File-based routing under `src/pages/**`.
- `src/actions/index.ts` contains the contact form Astro Action.
- Tailwind CSS v4 is available, but most styling lives in `src/styles/global.css`.
- `motion` powers reveal and transition effects from `src/layouts/Layout.astro`.

## Key Paths

- `public/`: static assets.
- `src/actions/`: server actions.
- `src/assets/`: local images and brand assets.
- `src/components/`: shared Astro components.
- `src/content/`: content collections and page copy.
- `src/layouts/`: shared shells, SEO, transitions.
- `src/pages/`: route entrypoints.
- `src/styles/`: global CSS utilities and tokens.

## Review Focus

- Treat content collections as the source of truth. Flag hardcoded copy in templates when content should live in `src/content/**`.
- When collection fields change, expect matching updates in both `src/content.config.ts` and `src/content-types.ts`.
- Any page using Astro Actions must export `prerender = false`.
- Prefer existing Astro components and server-rendered patterns over new client-side complexity.
- Prefer the custom CSS utilities in `src/styles/global.css` over one-off Tailwind-heavy styling.
- Preserve reduced-motion behavior and existing `data-reveal*` animation hooks.

## Validation

- Run `pnpm build` before approving substantial changes.
- There is no formal test suite or linter configured in this repository.

## Common Pitfalls

- Hardcoding page copy in `.astro` files instead of content entries.
- Updating collection content without syncing schemas and exported content types.
- Breaking the contact flow by removing `prerender = false` from action-backed pages.
- Regressing motion behavior or reduced-motion support in shared layout code.

## Out Of Scope

- Do not require test-file changes solely because a PR has no tests; this repo does not maintain a formal test suite.
