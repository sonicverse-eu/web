# Copilot Instructions

Instructions for GitHub Copilot when working with this repository.

## Commands

**Development:**
```bash
pnpm dev       # Start dev server at http://localhost:4321
pnpm build     # Production build to ./dist/
pnpm preview   # Preview production build locally
```

**Note:** There is no test suite or linter configured. Node >=22.12.0 is required.

## Environment Variables

The contact form requires three server-side secrets in a `.env` file at the repository root:

```env
RESEND_API_KEY=...
FROM_EMAIL=...
TO_EMAIL=...
```

These are validated by Astro's type-safe env schema in `astro.config.mjs`.

## Architecture

**Framework:** Astro 6 with SSR via the Node adapter (`standalone` mode). Tailwind CSS v4 is loaded as a Vite plugin, not a PostCSS plugin. React is available for interactive islands.

**Content Management:** All page and section copy lives in Markdoc (`.mdoc`) files under `src/content/`. There are five content collections:

- `pages` — Page metadata including hero content and contact form options
- `features` — Feature cards with eyebrow, title, summary, and order
- `projects` — Project cards with status, repo URL, and order
- `faq` — FAQ items with question, answer, and order
- `blog` — Blog posts with standard metadata (title, description, pubDate, author, tags)

Each collection has a Zod schema in `src/content.config.ts`. Collection schemas are re-exported as convenience types in `src/content-types.ts`. Pages pull content at build/request time with `getCollection()` and pass it to layouts.

**Routing:** File-based routing under `src/pages/`. The contact page sets `export const prerender = false` because it processes a server action; all other pages are prerendered by default.

**Contact Form:** `src/actions/index.ts` defines the `sendMail` Astro Action. It sends two emails via Resend:
1. To the team (`TO_EMAIL`)
2. Confirmation to the submitter

Returns a thread ID in format `SV-YYYYMMDD-XXXXXXXX`. Form-level validation errors surface via `isInputError()` in `contact.astro`.

**Styling:** A single `src/styles/global.css` file holds all CSS. It imports Tailwind and defines a CSS custom property design system (color tokens, shadows, radii). Custom utility classes are defined in global.css:
- `.container` — Max-width content container
- `.button-primary` — Primary CTA button
- `.feature-card` — Feature card styling
- `.eyebrow` — Small category/label text
- `.prose` — Content formatting
- `.section-gap` — Consistent section spacing

Tailwind is used minimally; prefer these custom utilities in `.astro` templates.

**Animations:** The `motion` library drives scroll-triggered reveal animations. Elements with `data-reveal` start hidden; `Layout.astro` registers an `inView` observer that animates them in. A `--scroll-progress` CSS variable is updated on scroll for the parallax background. The `SiteHeader` tracks navigation direction (`data-nav-direction` on `<html>`) to trigger directional slide transitions between pages using Astro's View Transitions API.

**Header/Footer Persistence:** `SiteHeader` and `SiteFooter` use `transition:persist` so they remain mounted across client-side navigations. The header's client-side script guards against double-binding event listeners with a `__sonicverseNavBound` flag on `window`.

## Key Conventions

- **Content collections are the single source of truth** for all page copy. Don't hardcode copy in templates; pull it from collections.
- **Custom CSS utilities over Tailwind** — Use the utilities defined in `global.css` rather than adding one-off Tailwind classes.
- **Content schemas must be updated in sync** — When adding fields to content files, update both `src/content.config.ts` (Zod schema) and `src/content-types.ts` (TypeScript types).
- **Server actions require `prerender = false`** — Any page using Astro Actions must explicitly disable prerendering.
