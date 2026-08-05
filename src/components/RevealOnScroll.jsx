import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import './RevealOnScroll.css'

function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  y = 48,
  scrollContainerRef,
}) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainerRef,
    offset: ['start 0.92', 'start 0.55'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const translateY = useTransform(scrollYProgress, [0, 1], [y, 0])

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={`reveal ${className}`.trim()}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ opacity, y: translateY }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export default RevealOnScroll
