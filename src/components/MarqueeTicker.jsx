import { motion, useReducedMotion } from 'framer-motion'
import './MarqueeTicker.css'

function MarqueeTicker({ text, variant = 'lime' }) {
  const prefersReducedMotion = useReducedMotion()
  const items = Array.from({ length: 6 }, (_, i) => `${text}${i}`)

  return (
    <div
      className={`marquee marquee--${variant}`}
      aria-hidden="true"
    >
      <div
        className={`marquee__track${prefersReducedMotion ? ' marquee__track--static' : ''}`}
      >
        {items.map((key) => (
          <span key={key} className="marquee__item">
            {text}
            <span className="marquee__dot" />
          </span>
        ))}
      </div>
    </div>
  )
}

export default MarqueeTicker
