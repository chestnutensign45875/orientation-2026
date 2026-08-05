import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const cardsData = [
  {
    id: 'events',
    path: '/events',
    category: 'WORKSHOPS & SESSIONS',
    badgeClass: 'nav-card__badge--blue',
    title: 'EVENTS & SCHEDULE',
    desc: 'Explore multi-day induction sessions, keynote talks, interactive workshops, and cultural performances.',
    btnText: 'EXPLORE EVENTS →',
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="url(#blue-grad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="blue-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563eb" />
            <stop offset="1" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
  {
    id: 'map',
    path: '/map',
    category: 'CAMPUS GUIDE',
    badgeClass: 'nav-card__badge--amber',
    title: 'CAMPUS MAP & VENUES',
    desc: 'Find auditoriums, labs, hostels, canteen, and orientation venues across campus.',
    btnText: 'VIEW MAP →',
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="url(#amber-grad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="amber-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d97706" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    ),
  },
  {
    id: 'council',
    path: '/council',
    category: 'LEADERSHIP & CLUBS',
    badgeClass: 'nav-card__badge--teal',
    title: 'STUDENT COUNCIL',
    desc: 'Meet the student leads,  mentors, and team behind Pehla Kadam 2026.',
    btnText: 'MEET COUNCIL →',
    icon: (
      <img
        src="/Logo.svg"
        alt="ACM Council Logo"
        style={{ width: '2.75rem', height: '2.75rem', objectFit: 'contain' }}
      />
    ),
  },
]

function StackedCardDeck() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const isDraggingRef = useRef(false)
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 })
  const navigate = useNavigate()

  const handleNext = useCallback((e) => {
    e?.stopPropagation()
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % cardsData.length)
  }, [])

  const handlePrev = useCallback((e) => {
    e?.stopPropagation()
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length)
  }, [])

  const activeCard = cardsData[currentIndex]
  const nextCard = cardsData[(currentIndex + 1) % cardsData.length]


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

  const handleCardClick = () => {
    if (!isDraggingRef.current) {
      navigate(activeCard.path)
    }
  }

  return (
    <div className="deck-wrapper">
      {/* Left Navigation Arrow */}
      <button
        type="button"
        className="deck-nav-btn deck-nav-btn--left"
        onClick={handlePrev}
        aria-label="Previous card"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Stacked Deck Card Box */}
      <div
        className="deck-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Deck Card 2 (Rotated right) */}
        <div className="deck-card-bg deck-card-bg--2" />

        {/* Background Deck Card 1 (Rotated left) */}
        <div className="deck-card-bg deck-card-bg--1" />

        {/* Active Animated Draggable & Swipable Front Card (Silky smooth 60fps performance) */}
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={activeCard.id}
            className="deck-card-active"
            onClick={handleCardClick}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => {
              isDraggingRef.current = true
            }}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, scale: 0.95, x: direction * 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: -direction * 50 }}
            transition={{
              type: 'spring',
              stiffness: 380,
              damping: 30,
              mass: 0.75,
            }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="deck-card__header">
              <span className={`nav-card__badge ${activeCard.badgeClass}`}>
                {activeCard.category}
              </span>
            </div>

            <div className="deck-card__icon-wrap">
              {activeCard.icon}
            </div>

            <h3 className="deck-card__title">{activeCard.title}</h3>
            <p className="deck-card__desc">{activeCard.desc}</p>

            <button
              type="button"
              className="deck-card__action-btn"
              onClick={(e) => {
                e.stopPropagation()
                navigate(activeCard.path)
              }}
            >
              <span>{activeCard.btnText}</span>
            </button>
          </motion.div>
        </AnimatePresence>



      </div>

      {/* Right Navigation Arrow */}
      <button
        type="button"
        className="deck-nav-btn deck-nav-btn--right"
        onClick={handleNext}
        aria-label="Next card"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination Dots Indicator */}
      <div className="deck-dots">
        {cardsData.map((card, idx) => (
          <button
            key={card.id}
            type="button"
            className={`deck-dot ${idx === currentIndex ? 'is-active' : ''}`}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1)
              setCurrentIndex(idx)
            }}
            aria-label={`Go to card ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default StackedCardDeck
