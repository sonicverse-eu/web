---
name: astro-web-design
description: Design and refine Astro websites and landing pages with stronger hierarchy, composition, typography, motion, and atmosphere while preserving the implementation realities of Astro components, content collections, and the existing site system. Use when Codex is asked to redesign, restyle, art-direct, or visually improve Astro pages in this repository.
---

# Astro Web Design

Use this skill when the task is primarily about visual quality, page direction, or landing-page composition in this Astro codebase.

## Start Here

Define three things before editing:

- Visual thesis: one sentence describing mood, contrast, and material.
- Content hierarchy: what the user should notice first, second, and third.
- Motion thesis: two or three transitions or reveals that improve the page.

Then inspect the current page, `src/styles/global.css`, and shared layout/components before changing structure.

If you need repo-specific visual constraints, read `references/astro-design-notes.md`.

## Design Rules

- Start with composition, not card grids.
- Keep one dominant idea per section.
- Let the first viewport feel decisive.
- Preserve the existing Sonicverse identity unless the task explicitly asks for a redesign.
- Use motion to clarify hierarchy, not as decoration.

## Astro-Specific Guidance

- Prefer layout and section changes that fit naturally into `.astro` components.
- Keep static sections static. Do not introduce React or client JS only to animate simple content.
- Use the existing global motion system when possible instead of creating parallel animation systems.
- When a page is content-driven, improve the underlying content structure as well as the styling.

## Visual System Defaults For This Repo

- Reuse the current color-token system before creating new accents.
- Preserve the luminous, atmospheric background language unless there is a strong reason to replace it.
- Keep typography bold and clean; do not introduce decorative type that fights the brand.
- Favor framed sections, full-bleed atmosphere, and deliberate spacing over dashboard-like card stacks.

## Section Planning

Default landing-page order:

1. Hero with clear identity, promise, and CTA
2. One proof or capability section
3. One depth or story section
4. Final CTA

For product or documentation pages, skip marketing-hero excess and lead with the working content.

## Review Checklist

- Is the first screen unmistakably Sonicverse?
- Is there a single dominant anchor in each section?
- Would the page still work if decorative borders and shadows were reduced?
- Does motion reinforce reading order?
- Does mobile still feel intentional, not collapsed?

## References

- Astro design notes: `references/astro-design-notes.md`
