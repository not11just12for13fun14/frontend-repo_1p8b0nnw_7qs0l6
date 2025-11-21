import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function ScienceGlobe() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const tilt = useTransform(scrollYProgress, [0, 1], [-12, 12])
  const spread = useTransform(scrollYProgress, [0, 1], [0.85, 1.05])

  return (
    <section ref={ref} className="relative bg-black py-24 md:py-28 overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_20%_50%,rgba(42,179,255,0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_600px_at_80%_40%,rgba(150,107,255,0.12),transparent_70%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-10 grid md:grid-cols-2 items-center gap-10">
        <div>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            A Connected Universe of Knowledge
          </motion.h2>
          <motion.p
            className="mt-5 text-[#C9D4E0] text-base md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Concepts in mathematics, physics, computer science, and engineering form crystalline patterns — like a network of ideas.
            Hover to feel the glow intensify.
          </motion.p>

          <div className="mt-8 flex gap-3">
            <NeonLink>Join Classes</NeonLink>
            <NeonLink variant="outline">Meet the Faculty</NeonLink>
          </div>
        </div>

        {/* pseudo 3D globe using layered rings and gridlines */}
        <motion.div className="relative mx-auto w-[min(480px,85vw)] aspect-square" style={{ rotate: tilt }}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#06101F] to-black border border-white/10" />
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-6 rounded-full border border-[#7DFBFF]/20"
              style={{ transform: `rotateX(65deg) rotate(${i * 10}deg)` }}
              animate={{ opacity: [0.25, 0.6, 0.25], scale: spread }}
              transition={{ repeat: Infinity, duration: 6 + i, ease: 'easeInOut' }}
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute left-1/2 top-1/2 h-[85%] w-[1px] bg-gradient-to-b from-transparent via-[#2AB3FF]/30 to-transparent"
              style={{ transform: `translate(-50%,-50%) rotate(${i * 15}deg)` }}
              animate={{ opacity: [0.2, 0.5, 0.2], scaleY: spread }}
              transition={{ repeat: Infinity, duration: 7 + i, ease: 'easeInOut' }}
            />
          ))}
          {/* nodes */}
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={`n-${i}`}
              className="absolute w-2 h-2 rounded-full bg-[#A6FF4D]"
              style={{
                left: `${50 + Math.sin(i) * 40}%`,
                top: `${50 + Math.cos(i * 1.4) * 40}%`,
                boxShadow: '0 0 12px rgba(166,255,77,0.6)'
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3 + (i % 5), ease: 'easeInOut' }}
            />
          ))}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ boxShadow: ['0 0 0px rgba(125,251,255,0.0)', '0 0 48px rgba(125,251,255,0.25)', '0 0 0px rgba(125,251,255,0.0)'] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  )
}

function NeonLink({ children, variant = 'solid' }) {
  const base = 'relative inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm uppercase tracking-wide font-semibold transition-all'
  if (variant === 'outline') {
    return (
      <motion.a
        href="#"
        className={`${base} text-white/90 border border-[#2AB3FF]/60`}
        whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(42,179,255,0.45)' }}
      >
        {children}
        <span className="absolute inset-0 rounded-full bg-[#2AB3FF]/10 blur-md -z-10" />
      </motion.a>
    )
  }
  return (
    <motion.a
      href="#"
      className={`${base} text-black bg-[#7DFBFF]`}
      whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(125,251,255,0.55)' }}
    >
      {children}
    </motion.a>
  )
}
