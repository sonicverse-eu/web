# Sonicverse Web

The Sonicverse web repository is an Astro-powered marketing and content site for the Sonicverse open source initiative. It combines content collections, custom layouts, animated presentation layers, and a contact workflow backed by Resend.

## Stack

- Astro 6 with ESM
- Markdoc and Markdown content collections via `astro:content`
- Tailwind CSS through the Vite plugin
- Astro transitions and `motion`-based reveal effects
- Optional React support for interactive islands
- Node standalone adapter for deployment
- Resend-powered contact email actions

## Requirements

- Node.js `>=22.12.0`
- `pnpm`

## Getting Started

```sh
pnpm install
pnpm dev
```

The local dev server runs at [localhost:4321](http://localhost:4321).

## Available Commands

| Command | Description |
| :-- | :-- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start the local Astro dev server |
| `pnpm check` | Run Astro content, type, and component checks |
| `pnpm build` | Build the site for production |
| `pnpm ci` | Run the local CI command sequence (`check` + `build`) |
| `pnpm preview` | Preview the production build locally |
| `pnpm astro -- --help` | Show Astro CLI help |

## Environment Variables

The contact action expects these server-side variables to be configured:

- `RESEND_API_KEY`
- `FROM_EMAIL`
- `TO_EMAIL`

These are defined in `astro.config.mjs` and consumed by `src/actions/index.ts`.

## Project Structure

```text
/
├── public/                 # Static assets such as icons and robots.txt
├── src/
│   ├── actions/            # Server actions, including contact email handling
│   ├── assets/             # Local images and brand assets
│   ├── components/         # Shared Astro components
│   ├── content/            # Markdoc/Markdown content collections
│   ├── layouts/            # Shared page shell and SEO setup
│   ├── pages/              # Route entrypoints
│   ├── styles/             # Global styles
│   ├── content-types.ts    # Generated content typings
│   └── content.config.ts   # Collection schemas
├── astro.config.mjs
└── package.json
```

## Content Model

Most public-facing content is driven from `src/content/**`.

- `src/content/pages` holds page-level copy for routes like home, about, community, projects, and contact.
- `src/content/features`, `src/content/projects`, and `src/content/faq` populate reusable homepage and landing page sections.
- `src/content/blog` powers the blog index and dynamic blog detail pages.
- When adding frontmatter fields or new collections, update `src/content.config.ts` to keep schemas in sync.

## Site Architecture Notes

- `src/layouts/Layout.astro` contains the shared document shell, metadata, JSON-LD, client router setup, and motion bootstrapping.
- `src/components/SiteHeader.astro` and `src/components/SiteFooter.astro` define the persistent site chrome.
- Pages are primarily server-rendered Astro routes with content rendered from collections.
- Reduced-motion behavior is already respected in the shared layout and should be preserved when changing animations.

## Validation

Run a production build before shipping changes:

```sh
pnpm build
```

This is especially important after editing content collections or schemas, because collection mismatches surface during the build.

## Lighthouse Testing

Lighthouse CI runs automatically on pull requests and pushes to `main` via [`.github/workflows/lighthouse.yml`](.github/workflows/lighthouse.yml).

- Audited pages: `/`, `/about`, `/projects`, `/community`, `/contact`, `/blog`
- Score thresholds: performance `>= 0.80`, accessibility `>= 0.95`, best practices `>= 0.90`, SEO `>= 0.90`
- Reports are written to `.lighthouseci`, uploaded as GitHub Actions artifacts (`lighthouse-reports`), and summarized in a pull request comment when the workflow runs on a PR.
Lighthouse CI runs automatically on pull requests and pushes to `main` via `.github/workflows/lighthouse.yml`.

- Audited pages: `/`, `/about`, `/projects`, `/community`, `/contact`, `/blog`
- Score thresholds: performance `>= 0.80`, accessibility `>= 0.95`, best practices `>= 0.90`, SEO `>= 0.90`
- Reports are written to `.lighthouseci` and uploaded as GitHub Actions artifacts (`lighthouse-reports`).

Run Lighthouse locally with the same config:

```sh
pnpm install
pnpm build
pnpm dlx @lhci/cli@0.15.x autorun --config=.lighthouserc.json
```
## Continuous Integration

GitHub Actions validates every push to `main` and every pull request with the workflow in `.github/workflows/ci.yml`.

The workflow currently runs:

- `pnpm install --frozen-lockfile`
- `pnpm check`
- `pnpm build`

Because the production build requires the Resend-related environment variables to exist, CI supplies non-secret placeholder values for schema validation during the build. Real email delivery is not exercised in CI.

Failed runs appear in the GitHub Actions tab and as required PR checks. Team members who want email or inbox alerts for failed workflows should enable GitHub `Actions` notifications in their personal notification settings for this repository.
