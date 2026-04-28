# danielhanke.com

Marketing and acquisition site for **Daniel Hanke** (psychologischer Berater) — operated by **Next Level Education GmbH**.

Funnel: YouTube → website → newsletter (Kit) **or** first call (email) → 1:1 coaching via Zoom.

## Stack

- Next.js 16 (App Router, Turbopack default) — note the breaking changes from Next.js 15 documented in `AGENTS.md`
- TypeScript, Tailwind CSS v4 with `@theme` design tokens
- next-intl 4 (de + en, localized pathnames, `as-needed` prefix)
- framer-motion (ScrollReveal — respects `prefers-reduced-motion`)
- Self-hosted Playfair Display + DM Sans via `next/font/google` (no runtime fetch)
- Kit (ConvertKit) form POST fallback — wire `formId`s in `lib/siteConfig.ts`

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npx next typegen     # regenerate route types if PageProps complains
```

## Project layout

```
app/[locale]/        # all user-facing pages
  page.tsx           # home — 7 sections from components/sections/
  coaching/          # /coaching + #anfrage
  community/         # Coming Soon (Skool)
  buch/              # /buch ↔ /en/book
  ueber-mich/        # /ueber-mich ↔ /en/about
  newsletter/
  impressum/         # marker: TODO Anwaltliche Prüfung
  datenschutz/       # marker: TODO Anwaltliche Prüfung
  agb/               # marker: TODO Anwaltliche Prüfung
app/sitemap.ts       # 18 URLs with hreflang alternates
app/robots.ts
components/
  layout/            # Nav, Footer, LanguageSwitcher
  sections/          # 7 home sections
  ui/                # Button, Section, Quote, ScrollReveal, Prose, PhotoPlaceholder
  icons/SocialIcons  # YouTube/IG/TikTok/LinkedIn/Amazon — outline SVGs
  CookieBanner       # localStorage consent gate
  Analytics          # Vercel Analytics gate (only loads with consent === 'all')
  ConvertKitForm     # inline / card / mini variants
i18n/
  routing.ts         # locales, pathnames map
  request.ts         # message loader
  navigation.ts      # typed Link/useRouter/usePathname
  messages/{de,en}.json
lib/
  siteConfig.ts      # ALL placeholders Daniel must fill
  seo.ts             # buildPageMetadata helper
  coachingMailto.ts  # locale-aware mailto link
  cn.ts
proxy.ts             # Next.js 16 proxy (renamed from middleware)
```

## Before going live

These need real values (replace strings starting with `PLACEHOLDER_` in `lib/siteConfig.ts`):

| Placeholder | Where it surfaces |
|---|---|
| `social.youtube`, `instagram`, `tiktok`, `linkedin` | Footer, About vita |
| `social.amazon` | Buch page CTAs, home book teaser |
| `convertKit.newsletterFormId` | Home newsletter CTA, Newsletter page, Footer slot |
| `convertKit.communityWaitlistFormId` | Community page |
| `latestVideo.{title,url,thumbnail}` | Home Latest Video section — update each Friday |
| `legal.*` | Impressum + Datenschutz + AGB |

### Photos

`PhotoPlaceholder` is in use on Hero, Approach, BookTeaser, About, Buch. Each placeholder shows the **slot label** and **target source dimensions** — replace each `<PhotoPlaceholder ... />` with `<Image ... />` once real photos arrive.

Categories per brief:
1. Hero portrait — Berliner Kontext, 1600 × 2133 px
2. Approach — am Schreibtisch, 1200 × 1600 px
3. About portrait — neutraler Hintergrund, 1200 × 1600 px
4. Buchcover — 1000 × 1500 px (2:3)
5. Optional: Berlin atmosphere + Author/Buch lifestyle (not yet placed)

### Legal

The `Datenschutz` and `AGB` pages each carry an inline HTML comment:

```
{/* TODO: Anwaltliche Prüfung vor Live-Schaltung */}
```

Both pages render generated boilerplate — **must** be reviewed by a German lawyer or replaced with output from a generator like eRecht24 / Datenschutzbeauftragter before launch.

### Analytics

`components/Analytics.tsx` is a stub that gates loading on `localStorage.consent === 'all'`. To actually load Vercel Analytics, install `@vercel/analytics` and render `<Analytics />` from `@vercel/analytics/react` inside that component when `enabled` is true.

## Deploy (Vercel)

1. Push the repo to GitHub.
2. Import the project in Vercel — no build configuration needed (Next.js auto-detected).
3. Domain: `danielhanke.com` is already pointed to Vercel via Cloudflare DNS-only.
4. After deploy, verify `/sitemap.xml` and `/robots.txt`. Submit the sitemap in Google Search Console and Bing Webmaster.

## Tonality reminder (intern)

Direct, klar, psychologisch präzise, ruhig-souverän, konfrontativ aber respektvoll, gleichwertig.
**Kein** Bro-Slang, **kein** Guru-Gehabe, **keine** Angstverkäufe, **keine** Pickup-/Red-Pill-Sprache, **keine** Motivations-Floskeln. Wenn unklar, im Zweifel: reduzierter, ruhiger, weniger.
