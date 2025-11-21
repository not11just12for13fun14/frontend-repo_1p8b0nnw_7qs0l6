import { useCallback } from 'react'
import Hero from './components/Hero'
import ModuleOrbit from './components/ModuleOrbit'
import ScienceGlobe from './components/ScienceGlobe'
import ParticleField from './components/ParticleField'

function App() {
  const handleStart = useCallback(() => {
    const el = document.getElementById('modules')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* floating STEM particles with parallax */}
      <div className="absolute inset-0" aria-hidden>
        <ParticleField />
      </div>

      {/* main sections */}
      <div className="relative">
        <Hero onPrimary={handleStart} />
        <div id="modules">
          <ModuleOrbit />
        </div>
        <ScienceGlobe />
        <footer className="relative bg-black/95 border-t border-white/10 py-10 text-center">
          <p className="text-xs text-[#C9D4E0]">© {new Date().getFullYear()} STEM & Engineering School</p>
        </footer>
      </div>
    </div>
  )
}

export default App
