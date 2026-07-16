import { useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { mountSmoothScroll } from './lib/smooth-scroll.js'
import ScrollWorld from './components/ScrollWorld.jsx'
import BriefingScreen from './components/BriefingScreen.jsx'
import Preloader from './components/Preloader.jsx'

export default function App() {
  // Every "Request a Private Briefing" CTA (including the engine-rendered ones)
  // is an anchor to #briefing — the hash drives the full-screen form.
  const [briefingOpen, setBriefingOpen] = useState(
    () => window.location.hash === '#briefing',
  )
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)   // real bytes of leg 1, 0..1

  // The loader does real work: it streams the first flight leg into the HTTP
  // cache (the engine's own fetch then hits cache), reporting byte progress,
  // so the flight is scrub-ready the moment the veil lifts. Guardrails:
  // the 1.8s choreography hold runs CONCURRENTLY (fast connections lose
  // nothing), an 8s ceiling lifts the veil regardless (poster fallback takes
  // over), and data-saver / reduced-motion users are never gated on video.
  useEffect(() => {
    let done = false
    const finish = () => { if (!done) { done = true; setLoading(false) } }
    const img = src => new Promise(res => {
      const i = new Image(); i.onload = i.onerror = res; i.src = src
    })

    const phone = Math.min(screen.width, screen.height) <= 600
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = !!(navigator.connection && navigator.connection.saveData)
    const skipVideo = reduce || saveData
    const legUrl = i => phone ? `/assets/vid/leg_${i}-m.mp4` : `/assets/vid/leg_${i}.mp4`

    const fetchLeg1 = () => fetch(legUrl(1)).then(async r => {
      if (!r.ok || !r.body) return
      const total = +r.headers.get('Content-Length') || 0
      const reader = r.body.getReader()
      let got = 0
      for (;;) {
        const { done: end, value } = await reader.read()
        if (end) break
        got += value.length
        if (total && !done) setProgress(Math.min(1, got / total))
      }
      setProgress(1)
    }).catch(() => {})

    const gates = [
      document.fonts.ready,
      img(phone ? '/assets/posters/leg_1_poster-m.jpg' : '/assets/posters/leg_1_poster.jpg'),
      new Promise(r => setTimeout(r, 1800)),   // choreography hold, concurrent
    ]
    if (skipVideo) setProgress(1)
    else gates.push(fetchLeg1().then(() => {
      // leg 1 is down — quietly warm the next legs' cache, never gated
      ;[2, 3].forEach(i => { fetch(legUrl(i)).catch(() => {}) })
    }))

    Promise.all(gates).then(finish)
    const failsafe = setTimeout(finish, skipVideo ? 4500 : 8000)
    return () => clearTimeout(failsafe)
  }, [])

  useEffect(() => {
    const sync = () => setBriefingOpen(window.location.hash === '#briefing')
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => mountSmoothScroll(), [])

  useEffect(() => {
    document.documentElement.style.overflow = (briefingOpen || loading) ? 'hidden' : ''
    return () => { document.documentElement.style.overflow = '' }
  }, [briefingOpen, loading])

  const closeBriefing = () => {
    history.replaceState(null, '', window.location.pathname + window.location.search)
    setBriefingOpen(false)
  }

  return (
    <>
      <ScrollWorld />
      <AnimatePresence>
        {briefingOpen && <BriefingScreen onClose={closeBriefing} />}
      </AnimatePresence>
      <AnimatePresence>
        {loading && <Preloader progress={progress} />}
      </AnimatePresence>
    </>
  )
}
