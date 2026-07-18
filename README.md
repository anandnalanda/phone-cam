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
- `public/assets/vid/leg_[1-5].mp4` — the five flight legs: the ORIGINAL v1 chain
  encodes (Kling 3.0 pro, 1440p/24fps, 12-17MB). `leg_[1-5]-m.mp4` are the 720p
  mobile tier derived from them. CAUTION: the 4K masters in the archive are the
  v3 re-render — a DIFFERENT flight; do not re-encode site legs from them.
- `public/assets/posters/` — extracted first frames of each encoded leg (loading posters)
- `public/assets/scenes/` — the approved scene stills (reduced-motion fallback art)
- `public/assets/brand/` — sentinel logo mark + favicon

Production archive (4K masters, original 24fps encodes, DJI reference images,
scene iteration history, prompts/raw renders/seam checks) lives OUTSIDE the repo
in `~/Desktop/SkyKnox-archive/` — and in git history before this commit.

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
