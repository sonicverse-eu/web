# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev       # start dev server (http://localhost:4321)
pnpm build     # production build
pnpm preview   # preview the production build
```

There is no test suite or linter configured. Node >=22.12.0 is required.

## Environment variables

The contact form requires three server-side secrets. Create a `.env` file at the repo root:

```
RESEND_API_KEY=...
FROM_EMAIL=...
TO_EMAIL=...
```

These are validated by Astro's type-safe env schema in `astro.config.mjs`.

## Architecture

**Framework:** Astro 6 with SSR via the Node adapter (`standalone` mode). Tailwind CSS v4 is loaded as a Vite plugin, not a PostCSS plugin. React is available for interactive islands.

**Content:** All page and section copy lives in Markdoc (`.mdoc`) files under `src/content/`. There are five collections — `pages`, `features`, `projects`, `faq`, `blog` — each with a Zod schema defined in `src/content.config.ts`. Collection schemas are re-exported as convenience types in `src/content-types.ts`. Pages pull content at build/request time with `getCollection()` and pass it to layouts.

**Routing:** Every route under `src/pages/` corresponds directly to a URL. The contact page sets `export const prerender = false` because it processes a server action; all other pages are prerendered by default.

**Contact form action:** `src/actions/index.ts` defines the `sendMail` Astro Action. It sends two emails via Resend — one to the team (`TO_EMAIL`) and a confirmation to the submitter — and returns a thread ID (`SV-YYYYMMDD-XXXXXXXX`). Form-level validation errors surface via `isInputError()` in `contact.astro`.

**Styling:** A single `src/styles/global.css` file holds all CSS. It imports Tailwind and defines a CSS custom property design system (color tokens, shadows, radii). Utility classes such as `.container`, `.button-primary`, `.feature-card`, `.eyebrow`, `.prose`, and `.section-gap` are defined here and used directly in `.astro` templates — Tailwind is used minimally.

**Animations:** The `motion` library drives scroll-triggered reveal animations. Elements with `data-reveal` start hidden; `Layout.astro` registers an `inView` observer that animates them in. A `--scroll-progress` CSS variable is updated on scroll for the parallax background. The SiteHeader tracks navigation direction (`data-nav-direction` on `<html>`) to trigger directional slide transitions between pages using Astro's View Transitions API.

**Header/Footer persistence:** `SiteHeader` and `SiteFooter` use `transition:persist` so they remain mounted across client-side navigations. The header's client-side script guards against double-binding event listeners with a `__sonicverseNavBound` flag on `window`.
