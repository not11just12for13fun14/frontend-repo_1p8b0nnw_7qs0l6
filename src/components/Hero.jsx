import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero({ onPrimary }) {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* cosmic gradient backdrop */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(42,179,255,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_500px_at_70%_30%,rgba(150,107,255,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_30%_60%,rgba(125,251,255,0.14),transparent_70%)]" />
      </div>

      {/* 3D Spline hero object */}
      <div className="absolute inset-0" aria-hidden>
        <Spline scene="https://prod.spline.design/hGDm7Foxug7C6E8s/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* content */}
      <div className="relative z-10 container mx-auto px-6 md:px-10 pt-24 pb-10 text-center">
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_0_25px_rgba(42,179,255,0.35)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
          STEM & Engineering Hub
        </motion.h1>

        <motion.p
          className="mt-6 text-base sm:text-lg md:text-xl text-[#C9D4E0] max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: 'easeOut' }}
        >
          Explore mathematics, physics, computer science, robotics, and engineering in a clean, interactive, and scientifically inspired environment.
        </motion.p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <NeonButton onClick={onPrimary}>Start Learning</NeonButton>
          <NeonButton variant="ghost">Explore Courses</NeonButton>
        </div>
      </div>

      {/* soft top nebula overlay to avoid blocking Spline interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
    </section>
  )
}

function NeonButton({ children, onClick, variant = 'solid' }) {
  const base =
    'relative inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-3.5 rounded-full uppercase tracking-wide text-sm font-semibold transition-all duration-300'
  if (variant === 'ghost') {
    return (
      <motion.button
        onClick={onClick}
        className={`${base} text-white/90 border border-[#2AB3FF]/60 hover:border-[#2AB3FF] hover:text-white`}
        whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(42,179,255,0.45)' }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
        <span className="absolute inset-0 rounded-full bg-[#2AB3FF]/10 blur-md -z-10" aria-hidden />
      </motion.button>
    )
  }
  return (
    <motion.button
      onClick={onClick}
      className={`${base} text-white bg-[#06101F]/60 border border-[#2AB3FF]/70`}
      whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(42,179,255,0.6)' }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      <span className="absolute inset-0 rounded-full bg-[#2AB3FF]/20 blur-md -z-10" aria-hidden />
    </motion.button>
  )
}
