import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const DEFAULT_WORDS = ['ENGINEERS', 'CREATORS', 'ENTHUSIASTS', 'STUDENTS']

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
      2500,
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

  const chars = currentWord.split('')

  return (
    <div className="page-rotate-block" aria-live="polite">
      {prefix && <span className="page-rotate-prefix">{prefix}</span>}

      <div className="page-rotate-slot">
        <motion.div
          className="morph-word-wrap"
          style={currentVariant}
          layout
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {chars.map((char, charIdx) => (
              <motion.span
                key={`${char}-${charIdx}`}
                className="morph-char"
                initial={{
                  opacity: 0,
                  y: 14,
                  rotateX: 70,
                  scale: 0.88,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -14,
                  rotateX: -70,
                  scale: 0.88,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 420,
                  damping: 26,
                  mass: 0.5,
                  delay: charIdx * 0.018,
                }}
              >
                {char}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default RotatingWords









