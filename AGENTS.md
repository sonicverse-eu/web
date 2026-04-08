# AGENTS.md

## Project Overview
- This repository is an Astro site for Sonicverse.
- Prefer small, surgical changes that match the existing code style.
- Treat `README.md` as outdated starter content unless it has been refreshed.

## Stack
- Astro 6 with ESM (`"type": "module"`).
- Content collections via `astro:content` and Markdoc/Markdown content in `src/content/**`.
- React is available, but prefer Astro components unless interactivity requires React.
- Global styling lives in `src/styles/global.css`.
- Motion effects are wired in `src/layouts/Layout.astro` with `motion`.

## Key Structure
- `src/pages/*.astro`: route entrypoints.
- `src/layouts/Layout.astro`: shared document shell, SEO meta, transitions, motion bootstrapping.
- `src/components/*.astro`: shared UI pieces like header and footer.
- `src/content/**`: content-driven sections.
- `src/content.config.ts`: collection schemas; update this when adding new frontmatter fields or collections.
- `public/`: static assets.

## Working Conventions
- Keep content-driven pages aligned with their source entries in `src/content/pages`.
- When adding or changing collection fields, update both the content files and `src/content.config.ts`.
- Preserve reduced-motion behavior and existing `data-reveal*` animation hooks.
- Prefer server-rendered Astro patterns and minimal client-side JavaScript.
- Reuse existing layout/components before creating new ones.
- Follow the repository’s existing formatting style, including tabs/spaces as already used in each file.

## Validation
- Use `pnpm build` for the broadest project validation.
- If only content or a single page changes, still consider a full build before finalizing because collection schema issues surface there.

## Notes for Agents
- Check for `AGENTS.md` files in subdirectories before editing files deeper in the tree.
- Do not make unrelated refactors while handling a focused request.
- Document any new commands or workflow expectations here if they become recurring repo conventions.
