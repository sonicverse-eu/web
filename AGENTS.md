# AGENTS.md

## Project Overview
- This repository is a Next.js site for Sonicverse.
- Prefer small, surgical changes that match the existing code style.
- Treat `README.md` as outdated starter content unless it has been refreshed.

## Stack
- Next.js 15 with the App Router.
- React 19 and TypeScript.
- Tailwind CSS 4 with DaisyUI plus site-specific styling in `src/styles/global.css`.
- Prismic CMS with Slice Machine (`customtypes/**`, `src/slices/**`, `slicemachine.config.json`) plus mock fallback content in `src/lib/site-data/**`.
- Shared layout and metadata live in `src/app/layout.tsx`.
- Motion effects are wired through `src/components/MotionProvider.tsx`.
- Node 22.12+ with `pnpm`.

## Key Structure
- `src/app/**`: active route entrypoints, metadata, sitemap, robots, and server actions.
- `src/app/layout.tsx`: shared document shell, SEO defaults, theme bootstrapping, and site chrome.
- `src/components/**`: shared UI components used by the Next.js app.
- `src/lib/**`: content loading, metadata helpers, page data, and shared utilities.
- `src/lib/site-data/**`: Prismic client mapping, mock content fallbacks, and page/settings/product loaders.
- `src/slices/**` and `customtypes/**`: Slice Machine components and Prismic schema definitions.
- `src/styles/global.css`: global design system and shared visual tokens.
- `public/`: static assets.

## Working Conventions
- Prefer App Router patterns and server-rendered React by default.
- Keep route files in `src/app/**` reasonably thin by moving reusable UI and helper logic into `src/components/**` and `src/lib/**`.
- Prefer DaisyUI primitives and themes for new interactive UI instead of introducing another component library.
- Reuse existing layout/components before creating new ones.
- Preserve the existing Prismic route model, singleton page handling, and mock-content fallbacks unless the task is specifically about changing content sourcing.
- When changing CMS-backed UI, check whether the shape is defined in `customtypes/**` or `src/lib/site-data/types.ts` before patching components in isolation.
- Preserve reduced-motion behavior, theme bootstrapping, and existing reveal/motion hooks unless the task is specifically about changing them.
- Favor minimal client-side JavaScript and only add client components when interactivity requires them.
- Follow the repository’s existing formatting style, including tabs/spaces as already used in each file.

## Validation
- Use `pnpm build` for the broadest project validation.
- Use `pnpm lint` when a change touches React, TypeScript, or shared app logic in a way linting is likely to catch.
- Use `pnpm slicemachine` only when the task explicitly involves Prismic schema or slice development.
- If only one route or component changes, still consider a full build before finalizing because App Router and metadata issues often surface there.

## Notes For Agents
- Check for `AGENTS.md` files in subdirectories before editing files deeper in the tree.
- Do not make unrelated refactors while handling a focused request.
- Document any new commands or workflow expectations here if they become recurring repo conventions.
