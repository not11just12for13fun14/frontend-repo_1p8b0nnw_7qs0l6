import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Mouse-following light rays for the hero section
// Renders two conic gradients and a trailing radial glow that follow the cursor
export default function LightRays() {
  const containerRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.4 })
  const ry = useSpring(y, { stiffness: 120, damping: 20, mass: 0.4 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      x.set(mx)
      y.set(my)
      if (!active) setActive(true)
    }
    const onLeave = () => setActive(false)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [active, x, y])

  return (
    <div ref={containerRef} className="pointer-events-auto absolute inset-0" aria-hidden>
      {/* Rays */}
      <motion.div
        className="absolute inset-0 mix-blend-screen"
        style={{
          background: rx && ry ? rx.onChange || ry.onChange : undefined
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: rx && ry ? undefined : undefined
        }}
      />
      {/* We can't bind conic gradient directly to motion values via style object props,
          so we render positioned elements whose transform follows the cursor */}
      <motion.div
        className="absolute w-[1200px] h-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          left: rx,
          top: ry,
          opacity: active ? 0.45 : 0.0,
          filter: 'blur(16px)'
        }}
      >
        <div className="absolute inset-0 rounded-full"
             style={{
               background: 'conic-gradient(from 0deg at 50% 50%, rgba(42,179,255,0.0) 0%, rgba(42,179,255,0.55) 12%, rgba(125,251,255,0.0) 24%, rgba(150,107,255,0.5) 36%, rgba(125,251,255,0.0) 48%, rgba(42,179,255,0.55) 60%, rgba(125,251,255,0.0) 72%, rgba(150,107,255,0.5) 84%, rgba(42,179,255,0.0) 100%)'
             }}
        />
      </motion.div>
      <motion.div
        className="absolute w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          left: rx,
          top: ry,
          opacity: active ? 0.35 : 0.0,
          filter: 'blur(24px)'
        }}
      >
        <div className="absolute inset-0 rounded-full"
             style={{
               background: 'conic-gradient(from 90deg at 50% 50%, rgba(150,107,255,0.0) 0%, rgba(150,107,255,0.5) 18%, rgba(166,255,77,0.0) 36%, rgba(125,251,255,0.5) 54%, rgba(166,255,77,0.0) 72%, rgba(42,179,255,0.5) 90%, rgba(150,107,255,0.0) 100%)'
             }}
        />
      </motion.div>
      {/* Core glow following cursor */}
      <motion.div
        className="absolute w-[260px] h-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          left: rx,
          top: ry,
          opacity: active ? 0.6 : 0.0,
          background: 'radial-gradient(circle at 50% 50%, rgba(125,251,255,0.35), rgba(42,179,255,0.0) 60%)',
          filter: 'blur(12px)'
        }}
      />
    </div>
  )
}
