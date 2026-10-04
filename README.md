# danielhanke.com

Personal brand site of **Daniel Hanke** — psychology, ACT and personal development: YouTube, newsletter, book, speaking. Operated by **Next Level Education GmbH**.

## Brand architecture

| Domain | Role |
|---|---|
| **danielhanke.com** | Daniel as a person, author and content creator. Main long-term touchpoint: the newsletter. |
| **act-beratung-berlin.de** | The counselling practice (offer, prices, booking, local SEO). |

danielhanke.com sells **no** counselling of its own. Every counselling CTA links out to the practice site (`siteConfig.practice.*`). The former `/coaching*` pages 301/308-redirect there; `/community` redirects to `/newsletter`. Local keywords ("psychologische Beratung Berlin") belong to the practice site — don't compete for them here.

There is exactly **one** newsletter (Kit form `9456300`). The practice site promotes the same list via `danielhanke.com/newsletter`.

## Stack

- Next.js 16 (App Router, Turbopack) — see `AGENTS.md` for breaking changes
- TypeScript, Tailwind CSS v4 with `@theme` design tokens (light editorial palette in `app/globals.css`)
- next-intl 4, German only (`de`, no URL prefix). Old `/en/*` and `/de/*` URLs redirect permanently.
- framer-motion (`ScrollReveal`, respects `prefers-reduced-motion`)
- Playfair Display + DM Sans via `next/font/google`
- Kit (ConvertKit) plain HTML form POST

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm run lint
npx tsc --noEmit     # after `npx next typegen`
```

## Layout

```
app/[locale]/
  page.tsx           # home hub: hero → themes → newsletter → videos → practice → book → about
  ueber-mich/        # about
  newsletter/        # newsletter landing page
  inhalte/           # latest YouTube videos (RSS feed), topic links, ACT articles on the practice site
  buch/              # books (currently: Selbstdisziplin 2.0)
  speaking/
  danke/ willkommen/ # Kit double-opt-in pages (noindex)
  impressum/ datenschutz/ agb/
  [...rest]/ + not-found.tsx   # localized 404
app/sitemap.ts, app/robots.ts
next.config.ts       # all redirects (old coaching URLs, /en, /de, www, aliases)
lib/siteConfig.ts    # URLs, Kit form id, YouTube channel, legal data
lib/youtube.ts       # channel RSS feed → latest long-form videos (no API key, 30 min revalidate)
lib/structuredData.ts# Person + WebSite JSON-LD
```

YouTube videos are **linked, not embedded** — thumbnails are served through `next/image` from our own domain, so no YouTube cookies or consent gate are needed.

## Deploy

Push to `main`; Vercel auto-deploys. Verify `/sitemap.xml` and `/robots.txt` afterwards.

### Domains

`www.danielhanke.com` must be attached to **this** Vercel project as a redirect to the apex domain. (As of October 2026 it served an old, separate deployment.)

## Tone

Calm, precise, personal, intellectually honest. No sales pressure, no "transform your life" language, no invented social proof or numbers.
