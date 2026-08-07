import { useState,  useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BRANCHES_DATA = [
  {
    id: 'cse',
    branchName: 'COMPUTER SCIENCE & ENGG.',
    category: 'COMPUTER ENGINEERING',
    badgeClass: 'page-card__pill--blue',
    desc: 'Core computer science, software engineering, algorithms, full-stack development, and cloud computing systems.',
    curriculumUrl: '#',
  },
  {
    id: 'cse',
    branchName: 'COMPUTER SCIENCE & ENGG.(REGIONAL)',
    category: 'COMPUTER ENGINEERING',
    badgeClass: 'page-card__pill--blue',
    desc: 'Core computer science, software engineering, algorithms, full-stack development, and cloud computing systems.',
    curriculumUrl: '#',
  },
  {
    id: 'cse-ai',
    branchName: 'CSE (ARTIFICIAL INTELLIGENCE)',
    category: 'ARTIFICIAL INTELLIGENCE & DATA SCIENCE',
    badgeClass: 'page-card__pill--amber',
    desc: 'Neural networks, machine learning models, computer vision, natural language processing, and autonomous systems.',
    curriculumUrl: '#',
  },
  {
    id: 'cse-ai',
    branchName: 'CSE (ARTIFICIAL INTELLIGENCE & DATA SCIENCE)',
    category: 'ARTIFICIAL INTELLIGENCE & DATA SCIENCE',
    badgeClass: 'page-card__pill--amber',
    desc: 'Neural networks, machine learning models, computer vision, natural language processing, and autonomous systems.',
    curriculumUrl: '#',
  },
  {
    id: 'cse-ds',
    branchName: 'CSE (DATA SCIENCE)',
    category: 'ARTIFICIAL INTELLIGENCE & DATA SCIENCE',
    badgeClass: 'page-card__pill--blue',
    desc: 'Big data analytics, statistical modeling, predictive analytics, enterprise data pipelines, and data visualization.',
    curriculumUrl: '#',
  },
  {
    id: 'cse-iot',
    branchName: 'CSE (INTERNET OF THINGS)',
    category: 'INTERNET OF THINGS',
    badgeClass: 'page-card__pill--blue',
    desc: 'Big data analytics, statistical modeling, predictive analytics, enterprise data pipelines, and data visualization.',
    curriculumUrl: '#',
  },
  {
    id: 'ece',
    branchName: 'ELECTRONICS AND COMMUNICATION ENGINEERING',
    category: 'INTERNET OF THINGS',
    badgeClass: 'page-card__pill--blue',
    desc: 'Big data analytics, statistical modeling, predictive analytics, enterprise data pipelines, and data visualization.',
    curriculumUrl: '#',
  },
]

export default function BranchStackedDeck() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isHovered, setIsHovered] = useState(false)

  const isDraggingRef = useRef(false)
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 })

  const handleNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % BRANCHES_DATA.length)
  }, [])

  const handlePrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + BRANCHES_DATA.length) % BRANCHES_DATA.length)
  }, [])

  // Drag gesture handler
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

  const activeCard = BRANCHES_DATA[currentIndex]

  const handleButtonClick = (url, type) => {
    if (url && url !== '#') {
      window.open(url, '_blank')
    } else {
      alert(`${type} document for ${activeCard.branchName} will be available soon!`)
    }
  }

  return (
    <div
      className="deck-wrapper"
      style={{ marginTop: '2rem' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left Navigation Arrow */}

      {/* Stacked Deck Container */}
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
            style={{ justifyContent: 'flex-start', gap: '0.4rem' }}
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
            <div className="deck-card__header" style={{ marginBottom: '0.5rem' }}>
              <span className={`page-card__pill ${activeCard.badgeClass}`}>
                {activeCard.category}
              </span>
            </div>

            <div className="branch-card__icon" style={{ fontSize: '2.4rem', margin: '0.2rem 0' }}>
              {activeCard.icon}
            </div>

            <h3 className="deck-card__title" style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>
              {activeCard.branchName}
            </h3>

            <p className="deck-card__desc" style={{ fontSize: '0.84rem', margin: '0 0 0.5rem', lineHeight: '1.45' }}>
              {activeCard.desc}
            </p>

            {/* TWO ACTION BUTTONS: CURRICULUM & CREDIT SCHEME */}
            <div className="branch-card__actions" style={{ display: 'flex', gap: '0.5rem', width: '100%', marginTop: '0.85rem' }}>
              <button
                type="button"
                className="branch-action-btn branch-action-btn--primary"
                onClick={(e) => {
                  e.stopPropagation()
                  handleButtonClick(activeCard.curriculumUrl, 'Curriculum')
                }}
              >
                <span>CURRICULUM</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Navigation Arrow */}

    </div>
  )
}
