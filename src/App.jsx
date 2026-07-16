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

  // Hold the veil until the opening scene can render properly: display fonts,
  // the Ascent still, and its clip poster. Minimum hold lets the entrance
  // animation complete; failsafe lifts it regardless so the site can't stall.
  useEffect(() => {
    let done = false
    const finish = () => { if (!done) { done = true; setLoading(false) } }
    const img = src => new Promise(res => {
      const i = new Image(); i.onload = i.onerror = res; i.src = src
    })
    Promise.all([
      document.fonts.ready,
      img('/assets/scenes/scene_1_closed.png'),
      img('/assets/posters/leg_1_poster.jpg'),
      new Promise(r => setTimeout(r, 1800)),   // minimum hold
    ]).then(finish)
    const failsafe = setTimeout(finish, 4500)
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
        {loading && <Preloader />}
      </AnimatePresence>
    </>
  )
}
