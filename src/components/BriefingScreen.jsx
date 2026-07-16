import { useEffect } from 'react'
import { motion } from 'motion/react'
import BriefingForm from './BriefingForm.jsx'

// Frosted-glass application modal, opened by any #briefing CTA.
export default function BriefingScreen({ onClose }) {
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
        initial={{ opacity: 0, y: 22, scale: 0.965 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.45, delay: 0.08, ease: [0.19, 1, 0.22, 1] }}
      >
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
