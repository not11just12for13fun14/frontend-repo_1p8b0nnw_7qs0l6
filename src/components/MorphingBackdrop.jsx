import { motion } from 'framer-motion'

// Animated SVG that morphs between several science-inspired shapes
// Serves as a luminous, morphing backdrop behind the Spline scene
export default function MorphingBackdrop() {
  // A series of abstract path shapes that evoke: sphere/earth, atom, grid, circuit, molecule
  const paths = [
    // 1. Sphere-like blob
    'M300,100 C420,100 500,180 500,300 C500,420 420,500 300,500 C180,500 100,420 100,300 C100,180 180,100 300,100 Z',
    // 2. Atom-like with lobes
    'M300,120 C440,120 480,240 480,300 C480,360 440,480 300,480 C160,480 120,360 120,300 C120,240 160,120 300,120 Z M220,220 C260,180 340,180 380,220 C420,260 420,340 380,380 C340,420 260,420 220,380 C180,340 180,260 220,220 Z',
    // 3. Grid diamond
    'M300,140 L460,300 L300,460 L140,300 Z M220,220 L380,220 L380,380 L220,380 Z',
    // 4. Circuit-like
    'M150,300 L450,300 M300,150 L300,450 M220,220 A80,80 0 1,1 380,220 A80,80 0 1,1 220,220 Z M210,210 L180,180 M390,210 L420,180 M210,390 L180,420 M390,390 L420,420',
    // 5. Molecule network
    'M260,180 A20,20 0 1,1 300,180 L360,220 A20,20 0 1,1 380,260 L340,340 A20,20 0 1,1 300,360 L240,320 A20,20 0 1,1 220,280 L260,180 Z'
  ]

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <motion.svg
        viewBox="0 0 600 600"
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#7DFBFF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#2AB3FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#966BFF" stopOpacity="0" />
          </radialGradient>
          <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
        </defs>
        {/* Glow field */}
        <rect width="600" height="600" fill="url(#glow)" />
        {/* Morphing path */}
        <motion.path
          d={paths[0]}
          fill="none"
          stroke="#7DFBFF"
          strokeOpacity="0.7"
          strokeWidth="2"
          filter="url(#softBlur)"
          animate={{
            d: paths,
            pathLength: [0.95, 1, 0.95]
          }}
          transition={{
            duration: 18,
            ease: 'easeInOut',
            repeat: Infinity
          }}
        />
        {/* Secondary inner stroke for depth */}
        <motion.path
          d={paths[0]}
          fill="none"
          stroke="#2AB3FF"
          strokeOpacity="0.35"
          strokeWidth="1"
          animate={{ d: paths }}
          transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
        />
      </motion.svg>
      {/* Subtle animated beams */}
      <div className="absolute inset-0 mix-blend-screen">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#7DFBFF]/40 to-transparent"
            style={{ transform: `translateX(-50%) rotate(${i * 20}deg)` }}
            animate={{ opacity: [0.1, 0.35, 0.1] }}
            transition={{ repeat: Infinity, duration: 8 + i * 2, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  )
}
