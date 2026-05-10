import { MeshGradient } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

interface HeroSectionProps {
  title?: string
  highlightText?: string
  description?: string
  buttonText?: string
  onButtonClick?: () => void
  colors?: string[]
  distortion?: number
  swirl?: number
  speed?: number
  offsetX?: number
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  buttonClassName?: string
  maxWidth?: string
  veilOpacity?: string
  fontFamily?: string
  fontWeight?: number
}

export function HeroSection({
  title = "Unlock Your Potential with",
  highlightText = "AI Study OS",
  description = "The ultimate workspace for modern students. Notes, assignments, and study tools—enhanced by Gemini AI to help you achieve more with less stress.",
  buttonText = "Get Started Free",
  onButtonClick,
  colors = ["#6366f1", "#a78bfa", "#f472b6", "#818cf8", "#c084fc", "#fb7185"],
  distortion = 0.8,
  swirl = 0.6,
  speed = 0.42,
  offsetX = 0.08,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  buttonClassName = "",
  maxWidth = "max-w-7xl",
  veilOpacity = "bg-white/10",
  fontFamily = "Space Grotesk, sans-serif",
  fontWeight = 700,
}: HeroSectionProps) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const update = () =>
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick()
    }
  }

  return (
    <section className={`relative w-full min-h-screen overflow-hidden flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 w-full h-full">
        {mounted && (
          <>
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={colors}
              distortion={distortion}
              swirl={swirl}
              grainMixer={0}
              grainOverlay={0}
              speed={speed}
              offsetX={offsetX}
            />
            <div className={`absolute inset-0 pointer-events-none backdrop-blur-3xl ${veilOpacity}`} />
          </>
        )}
      </div>
      
      <div className={`relative z-10 ${maxWidth} mx-auto px-6 w-full py-20 lg:py-32`}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/60 text-indigo-700 text-xs font-bold uppercase tracking-widest shadow-sm bg-white/40">
             <span>AI-Powered Education · Beta</span>
          </div>

          <h1
            className={`text-slate-900 text-balance text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[1.1] tracking-tight ${titleClassName}`}
            style={{ fontFamily, fontWeight }}
          >
            {title} <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600">
              {highlightText}
            </span>
          </h1>

          <p className={`text-lg sm:text-xl text-slate-700 font-medium text-pretty max-w-2xl mx-auto leading-relaxed px-4 ${descriptionClassName}`}>
            {description}
          </p>

          <div className="flex justify-center pt-4">
            <button
              onClick={handleButtonClick}
              className={`px-10 py-5 rounded-2xl bg-indigo-600 text-white font-bold text-lg flex items-center gap-2 group transition-all hover:scale-105 shadow-2xl shadow-indigo-500/20 active:scale-95 ${buttonClassName}`}
            >
              {buttonText} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
