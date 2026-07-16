import { motion } from 'motion/react'

// Obsidian veil shown while the opening flight leg streams in. The hairline
// reports real bytes (App drives `progress`); AnimatePresence runs the exit.
export default function Preloader({ progress = 0 }) {
  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
    >
      <div className="preloader__stack">
        <motion.img
          className="preloader__mark"
          src="/assets/brand/logo.svg"
          alt=""
          initial={{ opacity: 0, y: 16, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        />
        <motion.div
          className="preloader__word"
          initial={{ opacity: 0, letterSpacing: '.7em' }}
          animate={{ opacity: 1, letterSpacing: '.42em' }}
          transition={{ duration: 1.3, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
        >
          SKYKNOX
        </motion.div>
        <div className="preloader__line">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
        <motion.div
          className="preloader__status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Preparing the flight — {Math.round(progress * 100)}%
        </motion.div>
      </div>
    </motion.div>
  )
}
