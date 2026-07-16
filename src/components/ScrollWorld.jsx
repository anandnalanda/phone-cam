import { useEffect, useRef } from 'react'
import '../lib/scrub-engine.js'
import { glideScrollTo } from '../lib/smooth-scroll.js'
import { scrollWorldConfig } from '../config/sections.js'

// The scrub engine is framework-agnostic and builds its own DOM inside the
// container; React renders only the crawlable SEO block, which the engine
// hides on mount. The dataset guard keeps HMR / double effect runs from
// mounting the engine twice.
export default function ScrollWorld() {
  const worldRef = useRef(null)

  useEffect(() => {
    const node = worldRef.current
    if (!node || node.dataset.swMounted) return
    node.dataset.swMounted = 'true'
    window.mountScrollWorld(node, { ...scrollWorldConfig, scrollTo: glideScrollTo })

    // Staged copy reveals: the engine fades each .sw-copy as one block, which
    // the eye skips while the film moves behind it. Watch the engine-driven
    // opacity and flip an is-live class (with hysteresis so it doesn't
    // flicker at the threshold) — CSS staggers the children in from there.
    const copies = Array.from(node.querySelectorAll('.sw-copy'))
    let liveRaf = 0
    const watchLive = () => {
      for (const c of copies) {
        const o = parseFloat(c.style.opacity || '0')
        if (o > 0.55) c.classList.add('is-live')
        else if (o < 0.3) c.classList.remove('is-live')
      }
      liveRaf = requestAnimationFrame(watchLive)
    }
    liveRaf = requestAnimationFrame(watchLive)

    return () => {
      cancelAnimationFrame(liveRaf)
    }
  }, [])

  return (
    <div id="world" ref={worldRef}>
      <section data-sw-seo>
        <h1>Fort Knox. Of the sky.</h1>
        <p>SkyKnox is airborne security for private estates — total control of your security, from your home or the other side of the world. By application. A limited number of estates.</p>
        <h2>The system — Your estate, under your command.</h2>
        <p>Two to three all-weather drones live in autonomous docks on your grounds, launched from your phone, anywhere on earth. All-weather airframes, thermal cameras, AI geofencing, loudspeakers, spotlights.</p>
        <h2>Four modes — While you sleep, nothing else does.</h2>
        <p>Surveil: eyes up in seconds. Personal Pilot: summon an expert pilot on command. Patrol: rotating, all-night coverage for up to twelve hours.</p>
        <h2>Respond — Seen. Heard. Recorded.</h2>
        <p>The instant a threat is detected, your drones converge — light, voice, and thermal lock. Most intrusions end right here. All of it captured, courtroom-grade.</p>
        <h2>Dawn — Certainty, delivered as a service.</h2>
        <p>Licensed operations, 24/7 human pilots, white-glove installation. SkyKnox holds the approvals, the pilots, and the insurance — you hold the control.</p>
        <p><a href="#briefing">Request a Private Briefing</a></p>
      </section>
    </div>
  )
}
