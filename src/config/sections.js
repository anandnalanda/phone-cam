// Scroll-world engine config — the five flight legs and their copy.
// Asset paths are absolute (/assets/...) and served from public/ by Vite.
export const scrollWorldConfig = {
  brand: { name: 'SKYKNOX', href: '#top' },
  cta: { label: 'Request a Briefing', href: '#briefing' },
  hint: 'scroll',
  nav: true,
  atmosphere: false,
  diveScroll: 1.35,
  crossfade: 0.28,   // wide seam dissolve — legs melt into each other
  glide: 0.075,      // heavy cinematic camera: scrub drifts after the scroll
  seekStep: 0.0016,       // one 60fps frame of the 10s legs — frame-accurate scrubbing
  seekStepMobile: 0.008,  // ~5 frames on phones — the 720p tier decodes fast enough
  sections: [
    {
      id: 'ascent', label: 'Ascent',
      still: '/assets/scenes/scene_1_closed.png',
      poster: '/assets/posters/leg_1_poster.jpg',
      clip: '/assets/vid/leg_1.mp4',
      clipMobile: '/assets/vid/leg_1-m.mp4',
      posterMobile: '/assets/posters/leg_1_poster-m.jpg',
      accent: '#C9CFD6',
      scroll: 1.8, linger: 0.35,
      jump: 0.15,   // nav/rail lands early, while the greeting copy is still up
      eyebrow: 'SkyKnox',
      title: 'Fort Knox. Of the sky.',
      body: 'Airborne security for private estates. Total control of your security — from your home, or the other side of the world.',
      tags: ['By application', 'A limited number of estates'],
      cta: { primary: { label: 'Request a Private Briefing', href: '#briefing' } },
    },
    {
      id: 'system', label: 'The System',
      still: '/assets/scenes/scene_2_final.png',
      poster: '/assets/posters/leg_2_poster.jpg',
      clip: '/assets/vid/leg_2.mp4',
      clipMobile: '/assets/vid/leg_2-m.mp4',
      posterMobile: '/assets/posters/leg_2_poster-m.jpg',
      accent: '#7FD4E4',
      scroll: 1.5, linger: 0.4,
      eyebrow: 'Your estate, under your command',
      title: 'Cameras only remember. This responds.',
      body: 'Two to three all-weather drones live in autonomous docks on your grounds — launched from your phone, anywhere on earth.',
      tags: ['All-weather', 'Thermal', 'AI geofencing', 'Spotlight', 'Voice'],
    },
    {
      id: 'patrol', label: 'Patrol',
      still: '/assets/scenes/scene_3_final.png',
      poster: '/assets/posters/leg_3_poster.jpg',
      clip: '/assets/vid/leg_3.mp4',
      clipMobile: '/assets/vid/leg_3-m.mp4',
      posterMobile: '/assets/posters/leg_3_poster-m.jpg',
      accent: '#C9CFD6',
      scroll: 1.5, linger: 0.4,
      eyebrow: 'Surveil · Personal Pilot · Patrol',
      title: 'While you sleep, nothing else does.',
      body: 'Eyes up in seconds. A trained pilot on command. Rotating coverage until sunrise — one drone flies while the next charges.',
      tags: ['Eyes-on in seconds', 'Pilot on demand', '12-hour coverage'],
    },
    {
      id: 'respond', label: 'Respond',
      still: '/assets/scenes/scene_4_final.png',
      poster: '/assets/posters/leg_4_poster.jpg',
      clip: '/assets/vid/leg_4.mp4',
      clipMobile: '/assets/vid/leg_4-m.mp4',
      posterMobile: '/assets/posters/leg_4_poster-m.jpg',
      accent: '#FFB259',
      scroll: 1.7, linger: 0.45,
      jump: 0.82,     // rail navigation lands after the convergence — intruder already locked
      copySpan: 0.8,  // copy stays readable deep into the scene, over the captured intruder

      eyebrow: 'Respond',
      title: 'Seen. Heard. Recorded.',
      body: 'The instant a threat is detected, your drones converge — light, voice, thermal lock. Most intrusions end right here. All of it courtroom-grade.',
      tags: ['Detect', 'Deter', 'Evidence', 'Escalate'],
    },
    {
      id: 'dawn', label: 'Dawn',
      still: '/assets/scenes/scene_5_final.png',
      poster: '/assets/posters/leg_5_poster.jpg',
      clip: '/assets/vid/leg_5.mp4',
      clipMobile: '/assets/vid/leg_5-m.mp4',
      posterMobile: '/assets/posters/leg_5_poster-m.jpg',
      accent: '#C9CFD6',
      scroll: 1.9, linger: 0.4,
      eyebrow: 'Certainty, delivered as a service',
      title: 'It never slept. You did.',
      body: 'Licensed operations. 24/7 human pilots. White-glove installation. SkyKnox holds the approvals, the pilots, and the insurance — you hold the control.',
      cta: { primary: { label: 'Request a Private Briefing', href: '#briefing' } },
    },
  ],
  connectors: [],
}
