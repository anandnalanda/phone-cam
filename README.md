# SkyKnox — Scroll-World Landing Page

**Live:** https://skyknox.higgsfield.app

A scroll-scrubbed cinematic landing page: one continuous drone flight over a private
estate, dusk to dawn. Scrolling drives the camera through five scenes (Ascent → The
System → Patrol → Respond → Dawn Return), followed by the response-chain dossier,
trust section, and the "Request a Private Briefing" application form.

## Structure

- `index.html` — the whole page: engine config, copy, dossier, form, SEO block
- `assets/js/scrub-engine.js` — portable scroll-scrub engine (from the scroll-world skill)
- `assets/vid/leg_[1-5].mp4` — the five flight legs (Kling 3.0 pro, chained frame-to-frame)
- `assets/posters/` — extracted first frames of each encoded leg (loading posters)
- `assets/scenes/` — approved scene stills (reduced-motion fallback art) + iteration history
- `assets/refs/` — DJI Dock 3 / Matrice reference images used to ground the renders
- `build/` — prompts, raw renders, seam-check artifacts, full-flight preview MP4

## Deployment (Higgsfield website hosting)

The site deploys via `higgsfield website` (site id `ee720d46-aa32-4858-8d46-7e12826b64f1`,
subdomain `skyknox`). The static page lives in the site repo's `app/public/site/`;
the root route renders it full-viewport. To update:

```
higgsfield website repo-access ee720d46-aa32-4858-8d46-7e12826b64f1   # git URL + token
# copy index.html + assets into app/public/site/, commit, push
higgsfield website deploy ee720d46-aa32-4858-8d46-7e12826b64f1
```

## Known follow-ups

- Briefing form is front-end only — wire a backend/service + conversion analytics (spec §8)
- Optional: mobile 720p encodes (`-m.mp4` tier) if phone traffic warrants it
- Optional: custom domain in place of the higgsfield.app subdomain
