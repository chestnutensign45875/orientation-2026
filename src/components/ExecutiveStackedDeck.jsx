import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EXEC_CARDS = [
  {
    id: 'chair',
    role: 'CHAIR',
    name: 'Rohan Dey',
    image: '/captains/chair.jpg',
    badge: 'HEAD OF COUNCIL',
    badgeClass: 'page-card__pill--blue',
  },
  {
    id: 'advisory',
    role: 'ADVISORY',
    name: 'Anusha Shandilya',
    image: '/captains/advisary.jpeg',
    badge: 'HEAD OF COUNCIL',
    badgeClass: 'page-card__pill--blue',
  },
  {
    id: 'co-chair-1',
    role: 'CO-CHAIR',
    name: 'Suhani Kumari',
    image: '/captains/co-chair1.jpg',
    badge: 'EXECUTIVE BOARD',
    badgeClass: 'page-card__pill--amber',
  },
  {
    id: 'co-chair-2',
    role: 'CO-CHAIR',
    name: 'Purushotam Lingwal',
    image: '/captains/co-chair2.jpg',
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
      <button
        type="button"
        className="deck-nav-btn deck-nav-btn--left"
        onClick={handlePrev}
        aria-label="Previous executive card"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

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
      <button
        type="button"
        className="deck-nav-btn deck-nav-btn--right"
        onClick={handleNext}
        aria-label="Next executive card"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
