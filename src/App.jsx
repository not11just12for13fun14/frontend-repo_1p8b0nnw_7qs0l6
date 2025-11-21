import { useCallback } from 'react'
import Hero from './components/Hero'
import ModuleOrbit from './components/ModuleOrbit'
import ScienceGlobe from './components/ScienceGlobe'
import ParticleField from './components/ParticleField'
import FooterCTA from './components/FooterCTA'
import ScrollScenes from './components/ScrollScenes'
import WarpTransition from './components/WarpTransition'
import AudioGlow from './components/AudioGlow'

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

      {/* motion-enhanced scroll container */}
      <div className="relative">
        <ScrollScenes>
          <WarpTransition>
            <Hero onPrimary={handleStart} />
          </WarpTransition>
          <WarpTransition id="modules">
            <AudioGlow>
              <ModuleOrbit />
            </AudioGlow>
          </WarpTransition>
          <WarpTransition>
            <ScienceGlobe />
          </WarpTransition>
          <WarpTransition>
            <FooterCTA />
          </WarpTransition>
        </ScrollScenes>
      </div>
    </div>
  )
}

export default App
