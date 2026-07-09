# SkyKnox — landing page

*Fort Knox. Of the sky.* A single-page site for SkyKnox, autonomous drone security
for private estates. One dark, continuous night-time sequence from hero to footer:
matte black shifting into deep night-blue, brushed-platinum lines and icon strokes,
and thermal amber→white reserved exclusively for the **Respond** mode and the
response-chain section.

## Stack

Static and dependency-free: semantic HTML, modern CSS, vanilla JS. No build step,
no CMS. Type is Inter (variable, optical sizing) from Google Fonts with a system
fallback stack.

```
index.html            the page
assets/css/main.css   design system + sections
assets/js/main.js     motion triggers, pinned modes sequence, form
```

## Run locally

Any static server, e.g.:

```sh
python3 -m http.server 8080
# → http://localhost:8080
```

## Motion system

Three motions, used slowly and everywhere: **rise** (elements translate up on
entry, echoing a drone lifting), **sweep** (a light gradient passing across,
echoing a spotlight), **resolve** (thermal blur sharpening into focus). All are
scroll-triggered via `IntersectionObserver` and collapse to opacity-only
fallbacks under `prefers-reduced-motion`. The four-modes centrepiece is a pinned
scroll sequence on desktop; on mobile, under reduced motion, or without JS it
renders as four stacked cinematic cards.

## Before launch

1. **Form endpoint** — set `FORM_ENDPOINT` at the top of `assets/js/main.js` to a
   Formspree form (`https://formspree.io/f/XXXXXXXX`) or a serverless function.
   While empty, submissions are accepted locally (with a console note) so the
   page stays demonstrable. A `skyknox_briefing_request` event is pushed to
   `dataLayer` (plus `gtag` `generate_lead`, if present) on every successful
   submission.
2. **Hero film** — the hero currently ships a hand-built animated SVG scene
   (estate at dusk, drone lifting from its dock) so the page is self-contained.
   To upgrade: replace the SVG inside `.hero-scene` with a ~6–10 s compressed,
   muted, autoplaying `<video>` loop (poster fallback, `playsinline`), keeping
   the `.hero-sweep` / `.hero-veil` overlays as the grade. On mobile, prefer a
   still or a 3 s loop.
3. **Analytics** — add your tag manager / analytics snippet; the conversion
   event above is already fired.

## Deploy

Push to any static host — Vercel, Netlify, Cloudflare Pages. No configuration
required.
