import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Section-to-section warp transition wrapper
// Applies a dissolve-to-particles and reassemble effect at boundaries
export default function WarpTransition({ children, id }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.15'] })
  const grain = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const chroma = useTransform(scrollYProgress, [0, 0.5, 1], [0, 30, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.98, 1])

  return (
    <section ref={ref} id={id} className="relative">
      {/* film grain + chromatic blur overlay at mid-scroll to simulate warp */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[6]"
        style={{ opacity: grain }}
      >
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(60% 40% at 50% 50%, rgba(255,255,255,0.04), rgba(0,0,0,0))'
        }} />
        <motion.div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(0.6px)',
            filter: chroma.to(v => `saturate(110%) hue-rotate(${v}deg)`)
          }}
        />
      </motion.div>
      <motion.div style={{ scale }}>
        {children}
      </motion.div>
    </section>
  )
}
