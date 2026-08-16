import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EXEC_CARDS = [
  {
    id: 'chair',
    role: 'CHAIR',
    name: 'Rohan Dey',
    image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786905369/720444854_17945310894207482_4880129284187953178_n_yurzof.jpg',
    badge: 'HEAD OF COUNCIL',
    badgeClass: 'page-card__pill--blue',
  },
  {
    id: 'advisory',
    role: 'ADVISORY',
    name: 'Anusha Shandilya',
    image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030733/advisary_rbq73h.jpg',
    badge: 'HEAD OF COUNCIL',
    badgeClass: 'page-card__pill--blue',
  },
  {
    id: 'co-chair-1',
    role: 'CO-CHAIR',
    name: 'Suhani Kumari',
    image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786906012/WhatsApp_Image_2026-08-17_at_00.11.22_1_tvr55x.jpg',
    badge: 'EXECUTIVE BOARD',
    badgeClass: 'page-card__pill--amber',
  },
  {
    id: 'co-chair-2',
    role: 'CO-CHAIR',
    name: 'Purushotam Lingwal',
    image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030735/co-chair2_jmhgoa.jpg',
    badge: 'EXECUTIVE BOARD',
    badgeClass: 'page-card__pill--amber',
  },
]

export default function ExecutiveStackedDeck() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isHovered, setIsHovered] = useState(false)

  const isDraggingRef = useRef(false)
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 })

  const handleNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % EXEC_CARDS.length)
  }, [])

  const handlePrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + EXEC_CARDS.length) % EXEC_CARDS.length)
  }, [])

  // Auto switching to next card every 3.5s
  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      handleNext()
    }, 3500)
    return () => clearInterval(timer)
  }, [handleNext, isHovered])

  // Handle Drag gesture end for swipe
  const handleDragEnd = (_, info) => {
    const swipeThreshold = 35
    const swipeVelocity = 150
    const offset = info.offset.x
    const velocity = info.velocity.x

    if (offset < -swipeThreshold || velocity < -swipeVelocity) {
      handleNext()
    } else if (offset > swipeThreshold || velocity > swipeVelocity) {
      handlePrev()
    }

    setTimeout(() => {
      isDraggingRef.current = false
    }, 80)
  }

  // Touch Swipe Gesture Fallback
  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    }
  }

  const handleTouchEnd = (e) => {
    if (!touchStartRef.current.time) return
    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    const deltaTime = Date.now() - touchStartRef.current.time

    if (
      Math.abs(deltaX) > Math.abs(deltaY) * 1.15 &&
      Math.abs(deltaX) > 40 &&
      deltaTime < 500
    ) {
      if (deltaX < 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }
    touchStartRef.current.time = 0
  }

  const activeCard = EXEC_CARDS[currentIndex]

  return (
    <div
      className="deck-wrapper"
      style={{ marginTop: '2rem' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left Navigation Arrow */}


      {/* Stacked Deck Container with Touch Swipe Support */}
      <div
        className="deck-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Deck Card 2 */}
        <div className="deck-card-bg deck-card-bg--2" />

        {/* Background Deck Card 1 */}
        <div className="deck-card-bg deck-card-bg--1" />

        {/* Animated & Swipable Front Card */}
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={activeCard.id}
            className="deck-card-active"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragStart={() => {
              isDraggingRef.current = true
            }}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, scale: 0.94, x: direction * 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.94, x: -direction * 40 }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 28,
              mass: 0.8,
            }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="deck-card__header">
              <span className={`page-card__pill ${activeCard.badgeClass}`}>
                {activeCard.badge}
              </span>
            </div>

            {/* LARGER AVATAR FRAME */}
            <div
              className="exec-avatar-frame"
              style={{
                width: '9.5rem',
                height: '9.5rem',
                margin: '1rem auto 0.75rem',
                borderWidth: '4px',
                boxShadow: '0 12px 28px rgba(15, 23, 42, 0.14)',
              }}
            >
              <img src={activeCard.image} alt={activeCard.name} className="exec-avatar-img" />
            </div>

            <div style={{ marginBottom: '0.5rem' }}>
              <span className="exec-role" style={{ fontSize: '0.82rem' }}>{activeCard.role}</span>
              <h3 className="exec-name" style={{ fontSize: '1.25rem', marginTop: '0.2rem' }}>{activeCard.name}</h3>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Navigation Arrow */}
    </div>
  )
}
