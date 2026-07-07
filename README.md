# JSPROGYM

Premium black-&-gold gym website (Next.js 16 + TypeScript, App Router).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

> The site opens on a **maintenance gate** — enter the access password to view it.

## Pages

| Route          | What it is                                                        |
|----------------|-------------------------------------------------------------------|
| `/`            | Homepage — hero, experience cards, mission/vision, programs, Champions teaser, Google reviews, Instagram, blog, free-tour form, footer |
| `/champion`    | JSPROGYM Champions — champion of the month, hall of fame, leaderboard |
| `/maintenance` | Password gate shown to visitors until they unlock                 |
| `/api/unlock`  | Verifies the password and sets the unlock cookie                  |

## Maintenance mode (password gate)

The whole site is gated behind a password via `proxy.ts` (Next.js 16 proxy/middleware).

- Default password: **`JSPROGYM1234@`**
- Change it in `lib/site-lock.ts` or via the `SITE_PASSWORD` env var.
- To go fully public later, delete `proxy.ts`.

## Google reviews & Instagram

- Reviews (`lib/reviews.ts`) show sample data until you set `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` — then they pull live from the Google Places API.
- Instagram tiles link to `@jsprogym`; swap the handle in `app/page.tsx`.

## Fonts

Anton (display) + Barlow (body), loaded via `next/font/google` in `app/fonts.ts`.

## Content

Every section is driven by simple arrays at the top of `app/page.tsx` and
`app/champion/page.tsx` — edit those to change the copy.
