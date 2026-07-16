import { useState } from 'react'
import { motion } from 'motion/react'

// Front-end only for now — wire a backend/service + conversion analytics (spec §8).
export default function BriefingForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <motion.p
        className="briefing-received"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Received. We will be in touch privately.
      </motion.p>
    )
  }

  return (
    <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }}>
      <div>
        <label htmlFor="f-name">Full name</label>
        <input id="f-name" name="name" autoComplete="name" required />
      </div>
      <div className="bs-row">
        <div>
          <label htmlFor="f-email">Email</label>
          <input id="f-email" name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <label htmlFor="f-phone">Phone</label>
          <input id="f-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div>
        <label htmlFor="f-loc">Estate location (region / country)</label>
        <input id="f-loc" name="location" />
      </div>
      <div>
        <label htmlFor="f-note">Note <span className="bs-optional">optional</span></label>
        <textarea id="f-note" name="note" rows={2} />
      </div>
      <button type="submit">Request a Private Briefing</button>
    </form>
  )
}
