import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const DEFAULT_WORDS = ['ENGINEERS', 'CREATORS', 'ENTHUSIASTS', 'STUDENTS']

// All variants use 100% identical font-family, weight, and style matching the page font
const COLOR_VARIANTS = [
  { color: '#2563eb', textShadow: '0 4px 20px rgba(37, 99, 235, 0.25)', fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 900 },
  { color: '#d97706', textShadow: '0 4px 20px rgba(217, 119, 6, 0.25)', fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 900 },
  { color: '#4f46e5', textShadow: '0 4px 20px rgba(79, 70, 229, 0.25)', fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 900 },
  { color: '#0d9488', textShadow: '0 4px 20px rgba(13, 148, 136, 0.25)', fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 900 },
]

function RotatingWords({ words = DEFAULT_WORDS, prefix = 'FOR THE NEXT GENERATION OF' }) {
  const prefersReducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (words.length <= 1) return undefined
    const id = setInterval(
      () => setIndex((current) => (current + 1) % words.length),
      2300,
    )
    return () => clearInterval(id)
  }, [words.length])

  const currentWord = words[index] ?? ''
  const currentVariant = COLOR_VARIANTS[index % COLOR_VARIANTS.length]

  if (prefersReducedMotion) {
    return (
      <div className="page-rotate-block">
        {prefix && <span className="page-rotate-prefix">{prefix}</span>}
        <span className="page-rotate-word" style={currentVariant}>{currentWord}</span>
      </div>
    )
  }

  return (
    <div className="page-rotate-block" aria-live="polite">
      {prefix && <span className="page-rotate-prefix">{prefix}</span>}

      <div className="page-rotate-slot">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentWord}
            className="page-rotate-word"
            style={currentVariant}
            initial={{
              opacity: 0,
              scaleY: 0.65,
              scaleX: 1.16,
              y: 18,
            }}
            animate={{
              opacity: 1,
              scaleY: 1,
              scaleX: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scaleY: 1.22,
              scaleX: 0.85,
              y: -18,
            }}
            transition={{
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1], // Crisp liquid spring elasticity
            }}
          >
            {currentWord}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default RotatingWords







