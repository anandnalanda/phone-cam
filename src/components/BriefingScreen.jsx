import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import BriefingForm from './BriefingForm.jsx'

// Frosted-glass application overlay, opened by any #briefing CTA.
// Desktop: centered glass card. Phones: bottom sheet — slides up over the
// blurred footage, grab handle, swipe-down to dismiss.
export default function BriefingScreen({ onClose }) {
  const [sheet] = useState(() => window.matchMedia('(max-width: 640px)').matches)

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      className="briefing-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        className="bs-card"
        initial={sheet ? { y: '100%' } : { opacity: 0, y: 22, scale: 0.965 }}
        animate={sheet ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
        exit={sheet ? { y: '100%' } : { opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.5, delay: sheet ? 0 : 0.08, ease: [0.19, 1, 0.22, 1] }}
        drag={sheet ? 'y' : false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(e, info) => { if (info.offset.y > 110) onClose() }}
      >
        {sheet && <div className="bs-grabber" aria-hidden="true" />}
        <button type="button" className="briefing-screen__close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="bs-eyebrow">By application</div>
        <h3 className="bs-title">Request a Private Briefing</h3>
        <p className="bs-sub">For a limited founding group of estates. Strictly confidential.</p>
        <BriefingForm />
      </motion.div>
    </motion.div>
  )
}
