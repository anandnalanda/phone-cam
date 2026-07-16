import { motion } from 'motion/react'

// Obsidian veil shown while the opening scene's critical assets load.
// App controls mounting; AnimatePresence runs the exit fade.
export default function Preloader() {
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
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.25, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
