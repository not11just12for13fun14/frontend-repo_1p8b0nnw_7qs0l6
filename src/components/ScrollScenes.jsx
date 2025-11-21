import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// ScrollScenes: orchestrates scroll-driven transitions between major sections
// Adds screen-wide fog, stars intensity, and camera-like parallax
export default function ScrollScenes({ children }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  const fogOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.15])
  const hueRotate = useTransform(scrollYProgress, [0, 1], ['0deg', '20deg'])
  const scaleScene = useTransform(scrollYProgress, [0, 1], [1, 1.04])

  useEffect(() => {
    // lock to top each navigation to reset effects
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <motion.div ref={containerRef} style={{ filter: hueRotate, scale: scaleScene }} className="relative">
      <motion.div className="pointer-events-none fixed inset-0 z-[5]" style={{ opacity: fogOpacity }}>
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(10,30,60,0.8),rgba(0,0,0,0.6))]" />
      </motion.div>
      {children}
    </motion.div>
  )
}
