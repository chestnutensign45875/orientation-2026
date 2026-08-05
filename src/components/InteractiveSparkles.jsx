import { motion } from 'framer-motion'

function SparkleIcon({ size = 28, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  )
}

const SPARKLES_CONFIG = [
  {
    id: 'star-1',
    size: 38,
    color: '#2563eb',
    top: '3%',
    left: '7%',
    x: [0, 16, -22, 12, -8, 0],
    y: [0, -18, 14, -25, 10, 0],
    rotate: [0, 25, -40, 60, -15, 0],
    scale: [1, 1.1, 0.95, 1.08, 1],
    duration: 9.5,
  },
  {
    id: 'star-2',
    size: 28,
    color: '#d97706',
    top: '7%',
    right: '9%',
    x: [0, -20, 14, -10, 18, 0],
    y: [0, 15, -24, 18, -12, 0],
    rotate: [0, -35, 50, -20, 30, 0],
    scale: [1, 0.92, 1.12, 0.96, 1],
    duration: 11.2,
  },
  {
    id: 'star-3',
    size: 44,
    color: '#4f46e5',
    top: '34%',
    left: '3%',
    x: [0, 24, -12, 18, -26, 0],
    y: [0, -12, 22, -16, 20, 0],
    rotate: [0, 40, -20, 75, -45, 0],
    scale: [1, 1.08, 0.94, 1.14, 1],
    duration: 12.8,
  },
  {
    id: 'star-4',
    size: 22,
    color: '#0d9488',
    top: '40%',
    right: '5%',
    x: [0, -14, 20, -22, 12, 0],
    y: [0, -20, 10, -26, 14, 0],
    rotate: [0, -50, 30, -65, 20, 0],
    scale: [1, 1.15, 0.9, 1.1, 1],
    duration: 8.7,
  },
  {
    id: 'star-5',
    size: 32,
    color: '#d97706',
    bottom: '14%',
    left: '8%',
    x: [0, 18, -16, 25, -12, 0],
    y: [0, 14, -20, 12, -18, 0],
    rotate: [0, 30, -45, 55, -25, 0],
    scale: [1, 0.94, 1.1, 0.92, 1],
    duration: 10.4,
  },
  {
    id: 'star-6',
    size: 26,
    color: '#2563eb',
    bottom: '10%',
    right: '7%',
    x: [0, -22, 16, -18, 20, 0],
    y: [0, -16, 25, -12, 15, 0],
    rotate: [0, -40, 60, -30, 45, 0],
    scale: [1, 1.12, 0.95, 1.06, 1],
    duration: 13.5,
  },
]

function InteractiveSparkles() {
  return (
    <div className="interactive-sparkles-layer">
      {SPARKLES_CONFIG.map((star) => (
        <motion.div
          key={star.id}
          className="interactive-star-wrap"
          style={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            right: star.right,
            bottom: star.bottom,
            cursor: 'grab',
            zIndex: 8,
          }}
          drag
          dragConstraints={{ left: -140, right: 140, top: -140, bottom: 140 }}
          dragElastic={0.4}
          dragSnapToOrigin
          whileHover={{ scale: 1.25, rotate: 15 }}
          whileDrag={{ scale: 1.4, rotate: 90, cursor: 'grabbing' }}
          whileTap={{ scale: 0.9 }}
          animate={{
            x: star.x,
            y: star.y,
            rotate: star.rotate,
            scale: star.scale,
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        >
          <SparkleIcon size={star.size} color={star.color} />
        </motion.div>
      ))}
    </div>
  )
}

export default InteractiveSparkles

