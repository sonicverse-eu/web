# Contributing to Sonicverse Web

Thank you for your interest in contributing to the Sonicverse web repository! We welcome contributions of all kinds — bug fixes, new features, documentation improvements, and more.

Please take a moment to read this guide before submitting your first contribution.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Submitting Changes](#submitting-changes)
- [Code Style](#code-style)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. Please be kind and constructive in all interactions.

## Getting Started

### Prerequisites

- **Node.js** `>=22.12.0`
- **pnpm** (the package manager used in this project)

### Setting Up Locally

1. **Fork** the repository on GitHub and clone your fork:

   ```sh
   git clone https://github.com/<your-username>/web.git
   cd web
   ```

2. **Install dependencies:**

   ```sh
   pnpm install
   ```

3. **Copy the environment variables example** and fill in your values:

   ```sh
   cp .env.example .env.local
   ```

   The following environment variables are required for the contact form functionality:
   - `RESEND_API_KEY` — your [Resend](https://resend.com) API key
   - `FROM_EMAIL` — the sender email address
   - `TO_EMAIL` — the recipient email address

4. **Start the development server:**

   ```sh
   pnpm dev
   ```

   The local dev server runs at [http://localhost:3000](http://localhost:3000).

## Development Workflow

### Available Commands

| Command              | Description                                      |
| :------------------- | :----------------------------------------------- |
| `pnpm dev`           | Start the local Next.js development server       |
| `pnpm build`         | Build the site for production                    |
| `pnpm start`         | Run the production build locally                 |
| `pnpm lint`          | Lint TypeScript, React, and app logic            |
| `pnpm preview`       | Build and start the production server            |
| `pnpm slicemachine`  | Start Slice Machine for Prismic CMS development  |

### Project Structure

```
src/
├── app/          # Next.js App Router routes, metadata, sitemap, robots, and server actions
├── components/   # Shared UI components
├── lib/          # Content loading, metadata helpers, page data, and utilities
├── slices/       # Prismic Slice Machine components
└── styles/       # Global CSS and design tokens
customtypes/      # Prismic custom type schema definitions
public/           # Static assets
```

### Key Conventions

- Use **App Router** patterns and prefer server-rendered React by default.
- Use **DaisyUI** primitives for new interactive UI elements.
- Keep route files in `src/app/` thin — move reusable logic to `src/components/` and `src/lib/`.
- Add client components (`"use client"`) only when interactivity genuinely requires it.
- Preserve existing Prismic route models, singleton page handling, and mock-content fallbacks unless your task specifically requires changing them.
- Never commit secrets or credentials — use environment variables as defined in `.env.example`.

## Submitting Changes

1. **Create a new branch** from `main` for your changes:

   ```sh
   git checkout -b feat/your-feature-name
   ```

   Use a descriptive branch name with a prefix such as `feat/`, `fix/`, `docs/`, or `chore/`.

2. **Make your changes**, following the code style and conventions described below.

3. **Validate your changes** before committing:

   ```sh
   pnpm lint
   pnpm build
   ```

4. **Commit your changes** with a clear and descriptive commit message:

   ```sh
   git commit -m "feat: add new hero section variant"
   ```

   We recommend following the [Conventional Commits](https://www.conventionalcommits.org/) specification.

5. **Push your branch** and open a Pull Request against the `main` branch of the upstream repository.

6. In your Pull Request description, please include:
   - A summary of what was changed and why.
   - Any relevant issue or ticket numbers (e.g., `Closes #123`).
   - Screenshots or recordings for UI changes where applicable.

### Pull Request Review

All pull requests require at least one review before merging. Please be responsive to feedback and willing to make requested changes. Reviewers may request improvements to code quality, test coverage, or documentation.

## Code Style

- The project uses **TypeScript** and **ESLint** — run `pnpm lint` to check for issues.
- Follow the existing formatting style (indentation, naming conventions, imports) as used in each file.
- Prefer small, surgical changes that match the existing code style.
- Avoid unrelated refactors when handling a focused request.
- Reduced-motion behaviour, theme bootstrapping, and existing reveal/motion hooks should be preserved unless the task specifically involves changing them.

## Reporting Bugs

If you find a bug, please open a GitHub Issue with:

- A clear and descriptive title.
- Steps to reproduce the problem.
- Expected and actual behaviour.
- Your environment details (OS, Node.js version, browser if relevant).
- Any relevant error messages, logs, or screenshots.

## Requesting Features

Feature requests are welcome! Please open a GitHub Issue and describe:

- The problem you are trying to solve.
- Your proposed solution or desired behaviour.
- Any alternatives you have considered.

For larger changes, it is a good idea to open an issue for discussion before investing significant time in implementation.

## Security Vulnerabilities

If you discover a security vulnerability, please follow our [Security Policy](SECURITY.md) and **do not** open a public GitHub issue. Report it privately to [hello@sonicverse.eu](mailto:hello@sonicverse.eu).

---

Thank you for contributing to Sonicverse! 🎶
