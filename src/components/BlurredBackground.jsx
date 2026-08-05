import { useScroll, useTransform, motion } from 'framer-motion'
import './BlurredBackground.css'

function BlurredBackground({ src = '/page.png', scrollContainerRef }) {
  const { scrollY } = useScroll({ container: scrollContainerRef })
  const y = useTransform(scrollY, [0, 600, 1200], [0, 80, 160])
  const scale = useTransform(scrollY, [0, 800], [1.12, 1.22])

  return (
    <div className="blurred-bg" aria-hidden="true">
      <motion.div
        className="blurred-bg__image"
        style={{
          y,
          scale,
          backgroundImage: `url(${src})`,
        }}
      />
      <div className="blurred-bg__overlay" />
      <div className="blurred-bg__grain" />
    </div>
  )
}

export default BlurredBackground
