# SkyKnox — Scroll-World Landing Page

**Live:** https://skyknox.higgsfield.app

A scroll-scrubbed cinematic landing page: one continuous drone flight over a private
estate, dusk to dawn. Scrolling drives the camera through five scenes (Ascent → The
System → Patrol → Respond → Dawn Return), followed by the response-chain dossier,
trust section, and the "Request a Private Briefing" application form.

## Dev

React + Vite. `npm install`, then `npm run dev` (serves on http://localhost:8000).
`npm run build` emits the static site to `dist/`.

## Structure

- `index.html` — Vite entry (meta/SEO head, `#root`)
- `src/App.jsx` — page assembly: ScrollWorld → Dossier → Footer
- `src/components/ScrollWorld.jsx` — mounts the scrub engine into a ref; holds the crawlable SEO copy
- `src/components/Dossier.jsx` / `BriefingForm.jsx` / `Footer.jsx` — post-flight sections (`motion/react` reveals)
- `src/config/sections.js` — the five-scene engine config (clips, posters, copy, accents)
- `src/lib/scrub-engine.js` — portable scroll-scrub engine, untouched vanilla JS (from the scroll-world skill)
- `public/assets/vid/leg_[1-5].mp4` — the five flight legs (Kling 3.0 pro, chained frame-to-frame)
- `public/assets/posters/` — extracted first frames of each encoded leg (loading posters)
- `public/assets/scenes/` — approved scene stills (reduced-motion fallback art) + iteration history
- `public/assets/refs/` — DJI Dock 3 / Matrice reference images used to ground the renders
- `build/` — prompts, raw renders, seam-check artifacts, full-flight preview MP4

## Deployment (Higgsfield website hosting)

The site deploys via `higgsfield website` (site id `ee720d46-aa32-4858-8d46-7e12826b64f1`,
subdomain `skyknox`). The static page lives in the site repo's `app/public/site/`;
the root route renders it full-viewport. To update:

```
higgsfield website repo-access ee720d46-aa32-4858-8d46-7e12826b64f1   # git URL + token
npm run build
# copy dist/* into app/public/site/, commit, push
higgsfield website deploy ee720d46-aa32-4858-8d46-7e12826b64f1
```
(Heads up: `public/assets/vid4k/` and `refs/` ship into `dist/` too — prune before
deploying if you want a lean upload; the page itself only uses `vid/`, `posters/`,
and the final `scenes/` stills.)

## Known follow-ups

- Briefing form is front-end only — wire a backend/service + conversion analytics (spec §8)
- Optional: mobile 720p encodes (`-m.mp4` tier) if phone traffic warrants it
- Optional: custom domain in place of the higgsfield.app subdomain
