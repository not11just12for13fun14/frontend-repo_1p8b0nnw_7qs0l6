import { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'

// Lightweight particle field using DOM nodes so it works well with Tailwind
// Symbols themed around STEM with subtle parallax
const STEM_SYMBOLS = [
  'π', 'Σ', '∫', '→', '≈', '<>', '{}', '01', 'ƒ(x)', 'λ', 'Δ', 'μ'
]

export default function ParticleField({ count = 80 }) {
  const containerRef = useRef(null)
  const particles = useMemo(() => {
    return [...Array(count)].map((_, i) => {
      const symbol = STEM_SYMBOLS[i % STEM_SYMBOLS.length]
      const size = Math.random() * 0.8 + 0.6 // em
      const x = Math.random() * 100
      const y = Math.random() * 100
      const depth = Math.random() * 1 // 0..1 for parallax
      const hue = 200 + Math.random() * 80 // blue-cyan-purple
      const opacity = 0.15 + Math.random() * 0.35
      const rotate = Math.random() * 360
      const duration = 8 + Math.random() * 14
      return { id: i, symbol, size, x, y, depth, hue, opacity, rotate, duration }
    })
  }, [count])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handler = (e) => {
      const rect = el.getBoundingClientRect()
      const mx = (e.clientX - rect.left) / rect.width - 0.5
      const my = (e.clientY - rect.top) / rect.height - 0.5
      el.style.setProperty('--mx', mx.toString())
      el.style.setProperty('--my', my.toString())
    }
    el.addEventListener('mousemove', handler)
    return () => el.removeEventListener('mousemove', handler)
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        // Base perspective for subtle depth
        perspective: '800px',
      }}
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute select-none will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            color: `hsl(${p.hue} 100% 70%)`,
            fontSize: `${p.size}em`,
            opacity: p.opacity,
            filter: 'drop-shadow(0 0 6px rgba(125,251,255,0.35))',
            transformStyle: 'preserve-3d',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: p.opacity }}
          transition={{ duration: 1.2, delay: p.id * 0.01 }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            animate={{
              y: [0, -6, 0],
              rotate: [p.rotate, p.rotate + 8, p.rotate],
              x: [0, 4 * (p.depth - 0.5), 0],
              translateZ: 20 * (p.depth - 0.5),
            }}
            transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut' }}
          >
            {p.symbol}
          </motion.span>
        </motion.span>
      ))}

      {/* soft vignette to focus center */}
      <div className="pointer-events-none absolute inset-0"
           style={{
             background:
               'radial-gradient(70% 60% at 50% 40%, rgba(10,20,40,0.0), rgba(0,0,0,0.65))'
           }} />
    </div>
  )
}
