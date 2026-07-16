import { animate } from 'motion'

// One shared Motion tween drives window.scrollY for every discrete scroll
// input — wheel ticks, keyboard paging, and programmatic jumps (topbar nav /
// route rail) — so the scrub engine always reads one continuous camera path.
// Touch devices keep native momentum; scrollbar drags and reduced-motion
// users stay fully native.

let anim = null
let target = 0
let active = false

const maxY = () => document.documentElement.scrollHeight - window.innerHeight
const locked = () => document.documentElement.style.overflow === 'hidden'

function tween(to, duration) {
  target = Math.max(0, Math.min(maxY(), to))
  if (anim) anim.stop()
  const a = animate(window.scrollY, target, {
    duration,
    ease: [0.16, 1, 0.3, 1],
    onUpdate: v => window.scrollTo(0, v),
  })
  anim = a
  a.then(() => { if (anim === a) anim = null }, () => {})
}

// Glide to an absolute position — used by the engine's nav/rail jumps.
// Duration scales with distance so far jumps sweep rather than snap.
export function glideScrollTo(y) {
  if (!active) { window.scrollTo({ top: y, behavior: 'smooth' }); return }
  const dist = Math.abs(y - window.scrollY)
  const duration = Math.min(2.2, 0.7 + (dist / window.innerHeight) * 0.28)
  tween(y, duration)
}

export function mountSmoothScroll() {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!fine || reduce) return () => {}
  active = true
  target = window.scrollY

  const glideBy = dy => {
    if (!anim) target = window.scrollY   // re-anchor after idle / native jumps
    tween(target + dy, 1.4)
  }

  const onWheel = e => {
    if (e.ctrlKey || e.defaultPrevented || locked()) return
    e.preventDefault()
    const dy = e.deltaMode === 1 ? e.deltaY * 40
      : e.deltaMode === 2 ? e.deltaY * window.innerHeight
      : e.deltaY
    glideBy(dy)
  }

  // Keyboard paging jumps whole viewports natively — the harshest frame jumps
  // on the page. Route the standard scroll keys through the same glide.
  const onKey = e => {
    if (e.defaultPrevented || locked() || e.metaKey || e.ctrlKey || e.altKey) return
    const t = e.target
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
    const vh = window.innerHeight
    const jumps = {
      ArrowDown: 90, ArrowUp: -90,
      PageDown: vh * 0.85, PageUp: -vh * 0.85,
      ' ': e.shiftKey ? -vh * 0.85 : vh * 0.85,
    }
    if (e.key in jumps) { e.preventDefault(); glideBy(jumps[e.key]) }
    else if (e.key === 'Home') { e.preventDefault(); glideScrollTo(0) }
    else if (e.key === 'End') { e.preventDefault(); glideScrollTo(maxY()) }
  }

  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('keydown', onKey)
  return () => {
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('keydown', onKey)
    if (anim) anim.stop()
    active = false
  }
}
