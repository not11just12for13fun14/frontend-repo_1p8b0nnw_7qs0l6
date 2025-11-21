import { motion } from 'framer-motion'

export default function FooterCTA() {
  return (
    <footer className="relative bg-black py-20 overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(700px_400px_at_50%_20%,rgba(42,179,255,0.15),transparent_70%)]" />
      </div>
      <div className="relative z-10 container mx-auto px-6 md:px-10 text-center">
        <motion.h3
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Start Your Journey
        </motion.h3>
        <motion.p
          className="mt-3 text-[#C9D4E0] max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          Join a modern, innovation‑focused campus where science feels alive. Discover, experiment, and build the future.
        </motion.p>
        <motion.a
          href="#"
          className="mt-8 inline-flex items-center justify-center px-10 py-3 rounded-full uppercase tracking-wide text-sm font-semibold text-white border border-[#2AB3FF]/70"
          whileHover={{ scale: 1.06, boxShadow: '0 0 36px rgba(42,179,255,0.6)' }}
        >
          Enter STEM Hub
        </motion.a>
      </div>
    </footer>
  )
}
