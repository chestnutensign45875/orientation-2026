import { motion, useReducedMotion } from 'framer-motion'
import './TextReveal.css'

function TextReveal({ text, className = '', as: Tag = 'span' }) {
  const prefersReducedMotion = useReducedMotion()
  const chars = [...text]

  if (prefersReducedMotion) {
    return <Tag className={`text-reveal ${className}`.trim()}>{text}</Tag>
  }

  return (
    <Tag className={`text-reveal ${className}`.trim()} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="text-reveal__char"
          initial={{ opacity: 0, y: '110%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.08 + i * 0.045,
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Tag>
  )
}

export default TextReveal
