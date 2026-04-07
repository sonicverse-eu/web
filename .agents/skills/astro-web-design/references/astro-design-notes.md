# Astro Design Notes

## Current Site Direction

The site already leans toward:

- editorial open-source positioning
- soft glass surfaces
- violet atmospheric glow
- reveal-on-scroll motion
- rounded containers and polished navigation

Use that as the baseline unless the request is explicitly a redesign.

## What To Push Harder

- stronger first-view hierarchy
- fewer repeated section treatments
- cleaner distinction between hero, support, and depth sections
- tighter copy
- more deliberate use of empty space

## What To Avoid

- generic SaaS card mosaics
- multiple competing accent colors
- default white-background layouts with token gradients
- decorative motion that does not change understanding
- oversized body copy blocks without a clear visual counterweight

## Implementation Notes

- Global tokens and transition behavior already exist in `src/styles/global.css` and `src/layouts/Layout.astro`.
- Prefer evolving those shared patterns instead of writing page-local visual systems unless the page truly needs to diverge.
- When a visual change spans multiple pages, update shared components or tokens instead of restyling each page independently.
