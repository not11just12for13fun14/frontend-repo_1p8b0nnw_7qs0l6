import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Reactive audio glow: subtle spectrum pulse on hover
// Creates a media element and an analyser to drive glow intensity when hovered
export default function AudioGlow({ children }) {
  const [active, setActive] = useState(false)
  const [intensity, setIntensity] = useState(0.2)
  const audioRef = useRef(null)
  const analyserRef = useRef(null)
  const rafRef = useRef(null)
  const sourceRef = useRef(null)
  const ctxRef = useRef(null)

  useEffect(() => {
    const audio = new Audio()
    audio.src = 'https://cdn.pixabay.com/download/audio/2021/09/08/audio_8fc6ed7ef7.mp3?filename=soft-whoosh-ambient-110117.mp3'
    audio.loop = true
    audio.volume = 0.12
    audioRef.current = audio

    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    ctxRef.current = ctx
    const source = ctx.createMediaElementSource(audio)
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 256
    source.connect(analyser)
    analyser.connect(ctx.destination)
    analyserRef.current = analyser
    sourceRef.current = source

    const data = new Uint8Array(analyser.frequencyBinCount)
    const tick = () => {
      analyser.getByteFrequencyData(data)
      let sum = 0
      for (let i = 0; i < data.length; i++) sum += data[i]
      const avg = sum / data.length
      const mapped = Math.min(1, avg / 180)
      setIntensity(0.15 + mapped * 0.85)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      try { source.disconnect(); analyser.disconnect(); ctx.close() } catch {}
    }
  }, [])

  const onEnter = async () => {
    try {
      await ctxRef.current.resume()
      await audioRef.current.play()
    } catch {}
    setActive(true)
  }
  const onLeave = () => {
    audioRef.current.pause()
    setActive(false)
  }

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <motion.div
        className="pointer-events-none absolute -inset-6 rounded-3xl"
        animate={{ opacity: active ? 1 : 0.4, boxShadow: [`0 0 0 rgba(125,251,255,0)`, `0 0 ${24 + intensity * 36}px rgba(125,251,255,0.45)`] }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        style={{ filter: `hue-rotate(${intensity * 10}deg) saturate(${1 + intensity * 0.3})` }}
      />
      {children}
    </div>
  )
}
