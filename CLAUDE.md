# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # Start dev server on localhost:3000
npm run build        # Production build (type-checks + compiles)
npm run lint         # ESLint check
npm run test:e2e     # Run Playwright tests (requires dev server running)
npm run test:e2e:ui  # Playwright interactive UI mode
```

E2E tests need the dev server running first (`npm run dev` in a separate terminal before `npm run test:e2e`).

## Stack

- **Next.js 16.2.6** with **React 19** — App Router, all pages use `"use client"`
- **Tailwind CSS v4** — configured via CSS `@theme inline` in `globals.css`, not `tailwind.config.js`
- **Framer Motion** — animation primitives wrapped in `src/components/ui/animations.tsx`
- **Lucide React** — icons
- **Playwright** — E2E tests only (no unit tests)

## Architecture

### Page structure

All routes live under `src/app/` as App Router page files. The root layout (`src/app/layout.tsx`) wraps every page with `<Navbar>` and `<Footer>`. All pages are client components (`"use client"`).

Routes: `/`, `/a-propos`, `/bureau`, `/actions`, `/galerie`, `/partenariats`, `/contact`, `/adhesion`, `/congres`

### Design tokens

Defined in `src/app/globals.css` via `@theme inline` — use these Tailwind classes instead of raw hex values where possible:

| Class | Value |
|---|---|
| `primary-black` | `#000000` |
| `primary-gold` | `#B8860B` |
| `elegant-white` | `#F5F5F5` |
| `dark-gray` | `#1E1E1E` |
| `luxury-gray` | `#2B2B2B` |
| `cig-orange` | `#E07B39` |

Custom utility classes also defined there: `.text-gradient-gold`, `.bg-gradient-gold`, `.glow-gold`, `.glow-gold-hover`, `.glow-orange`.

Typography: `font-serif` → Playfair Display (headings), `font-sans` → Poppins (body).

### Shared components

- `src/components/layout/Navbar.tsx` — fixed header, scroll-aware background, mobile drawer
- `src/components/layout/Footer.tsx` — site footer
- `src/components/ui/animations.tsx` — `FadeIn`, `SlideUp`, `StaggerContainer`, `StaggerItem` (Framer Motion wrappers with `whileInView` triggers)
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

### Images

Local images live in `public/`. External images are restricted to `images.unsplash.com` and `plus.unsplash.com` (see `next.config.ts`). Always use Next.js `<Image>` component.
