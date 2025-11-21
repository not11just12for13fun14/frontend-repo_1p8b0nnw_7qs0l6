import { motion } from 'framer-motion'
import { Atom, Cpu, Microscope, CircuitBoard, GraduationCap, Cloud, Bot, SquareSigma } from 'lucide-react'

const modules = [
  { key: 'math', label: 'Mathematics', icon: SquareSigma },
  { key: 'physics', label: 'Physics', icon: Atom },
  { key: 'cs', label: 'Computer Science', icon: Cpu },
  { key: 'robotics', label: 'Robotics', icon: Bot },
  { key: 'engineering', label: 'Engineering', icon: CircuitBoard },
  { key: 'labs', label: 'Laboratories', icon: Microscope },
  { key: 'online', label: 'Online Courses', icon: Cloud },
  { key: 'faculty', label: 'Faculty', icon: GraduationCap },
]

export default function ModuleOrbit() {
  return (
    <section className="relative py-24 md:py-32 bg-black">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_0%,rgba(150,107,255,0.12),transparent_70%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-10">
        <motion.h2
          className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(125,251,255,0.35)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          Explore the STEM Galaxy
        </motion.h2>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {modules.map((m, i) => {
            const Icon = m.icon
            return (
              <motion.div
                key={m.key}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#0A1526]/80 to-[#02060B]/80 p-6 overflow-hidden"
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden>
                  <div className="absolute inset-0 bg-[radial-gradient(400px_200px_at_50%_-10%,rgba(42,179,255,0.18),transparent_70%)]" />
                </div>
                <motion.div
                  className="w-14 h-14 rounded-xl border border-[#2AB3FF]/40 flex items-center justify-center text-white"
                  animate={{ rotate: [0, 3, 0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
                >
                  <Icon className="w-7 h-7 text-[#7DFBFF] drop-shadow-[0_0_12px_rgba(125,251,255,0.45)]" />
                </motion.div>
                <h3 className="mt-4 text-white font-semibold text-lg">{m.label}</h3>
                <p className="mt-2 text-sm text-[#C9D4E0]">Dive into concepts with interactive lessons, labs, and projects.</p>
                <motion.div
                  className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#2AB3FF]/10 blur-2xl"
                  animate={{ opacity: [0.2, 0.45, 0.2] }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
