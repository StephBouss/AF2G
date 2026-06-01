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

# Run a single test file
npx playwright test tests/home.spec.ts
# Run tests matching a name pattern
npx playwright test --grep "Congrès"
```

E2E tests need the dev server running first (`npm run dev` in a separate terminal before `npm run test:e2e`).

## Stack

- **Next.js 16.2.6** with **React 19** — App Router
- **Tailwind CSS v4** — configured via CSS `@theme inline` in `globals.css`, not `tailwind.config.js`
- **Framer Motion** — animation primitives wrapped in `src/components/ui/animations.tsx`
- **Lucide React** — icons
- **Supabase** — database client via `src/lib/supabase.ts` (server-side only, uses `SUPABASE_SERVICE_ROLE_KEY`)
- **SingPay** — payment gateway used on the `/congres` page
- **Playwright** — E2E tests only (no unit tests)

## Environment variables

Required in `.env.local`:

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SINGPAY_API_URL=
SINGPAY_CLIENT_ID=
SINGPAY_CLIENT_SECRET=
SINGPAY_WALLET_ID=
SINGPAY_DISBURSEMENT_ID=
NEXT_PUBLIC_BASE_URL=http://localhost:3000   # full origin used for redirect URLs
```

## Architecture

### Page structure

All routes live under `src/app/` as App Router page files. The root layout (`src/app/layout.tsx`) is a **server component** that wraps every page with `<Navbar>` and `<Footer>`. All `page.tsx` files are client components (`"use client"`).

Routes: `/`, `/a-propos`, `/bureau`, `/actions`, `/galerie`, `/partenariats`, `/contact`, `/adhesion`, `/congres`
Sub-routes: `/congres/succes`, `/congres/echec` (SingPay redirect targets)

### API routes

- `POST /api/singpay` — creates a SingPay payment session, inserts a `partenariats` row in Supabase with `statut: "pending"`, and returns a redirect `link`.
- `POST /api/singpay/update` — called from success/failure pages to update `statut` to `"success"` or `"failed"` by `reference`.

### Supabase — `partenariats` table

| Column | Type | Notes |
|---|---|---|
| `reference` | text | e.g. `AF2G-XXX-XXX-XXX` |
| `denomination` | text | company/org name |
| `forme_juridique` | text\|null | legal form |
| `titre` | text\|null | contact title |
| `adresse` | text\|null | |
| `email` | text\|null | |
| `telephone` | text\|null | |
| `country_code` | text | default `+241` |
| `pack` | text | sponsorship tier |
| `montant` | text | formatted amount string |
| `statut` | text | `"pending"` → `"success"` or `"failed"` |

### Payment flow (`/congres`)

1. User selects a sponsorship pack and submits the partnership form.
2. Client POSTs to `/api/singpay`; server inserts a pending row and calls the SingPay API.
3. User is redirected to the SingPay-hosted payment page.
4. On completion, SingPay redirects to `/congres/succes?ref=…` or `/congres/echec?ref=…`.
5. Those pages call `POST /api/singpay/update` to finalise the Supabase record.

To test SingPay redirects locally, `next.config.ts` whitelists an ngrok origin via `allowedDevOrigins`. Update that value when the ngrok tunnel URL changes.

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
| `cig-dark` | `#0D0A07` |

Custom utility classes also defined there: `.text-gradient-gold`, `.bg-gradient-gold`, `.glow-gold`, `.glow-gold-hover`, `.glow-orange`, `.glow-orange-hover`, `.pulse-orange`.

Typography: `font-serif` → Playfair Display (headings), `font-sans` → Poppins (body).

**Exception:** `/congres` uses a dedicated dark-brown palette (`bg-[#110B02]`, `bg-[#1A1104]`, `bg-[#241806]`) to distinguish it visually from the rest of the site. This is intentional; do not replace those values with the standard tokens.

### Shared components

- `src/components/layout/Navbar.tsx` — fixed header, scroll-aware background, mobile drawer
- `src/components/layout/Footer.tsx` — site footer
- `src/components/ui/animations.tsx` — `FadeIn`, `SlideUp`, `StaggerContainer`, `StaggerItem` (Framer Motion wrappers with `whileInView` triggers)
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

### Images

Local images live in `public/`. External images are restricted to `images.unsplash.com` and `plus.unsplash.com` (see `next.config.ts`). Always use Next.js `<Image>` component.

### Incomplete features

`/adhesion` — the membership form submits to a browser `alert()` stub. It is not yet connected to Supabase or a payment provider.
