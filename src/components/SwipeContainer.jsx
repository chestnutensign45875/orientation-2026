import { useCallback, useEffect, useRef, useState, createContext, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from 'framer-motion'
import './SwipeContainer.css'

export const SwipeContext = createContext({
  activeIndex: 0,
  goToIndex: () => {},
  nextPage: () => {},
  prevPage: () => {},
})

export const useSwipe = () => useContext(SwipeContext)

function SwipePanel({ index, activeIndex, x, width, children }) {
  const scale = useTransform(x, (latest) => {
    if (width === 0) return 1
    const panelX = latest + index * width
    const distance = Math.abs(panelX) / width
    return 1 - Math.min(distance, 1) * 0.05
  })

  const opacity = useTransform(x, (latest) => {
    if (width === 0) return 1
    const panelX = latest + index * width
    const distance = Math.abs(panelX) / width
    return 1 - Math.min(distance, 1) * 0.25
  })

  return (
    <motion.div
      className="swipe-panel"
      style={{ scale, opacity }}
      data-active={index === activeIndex || undefined}
    >
      {children}
    </motion.div>
  )
}

function SwipeContainer({ pages }) {
  const location = useLocation()
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef(null)
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  )

  const routeIndex = pages.findIndex((p) => p.path === location.pathname)
  const activeIndex = routeIndex >= 0 ? routeIndex : 0

  const x = useMotionValue(-activeIndex * width)

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth)
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Sync x position whenever activeIndex or width changes
  useEffect(() => {
    if (width === 0) return
    const target = -activeIndex * width
    if (prefersReducedMotion) {
      x.set(target)
      return
    }
    animate(x, target, {
      type: 'spring',
      stiffness: 320,
      damping: 32,
      mass: 0.8,
    })
  }, [activeIndex, width, x, prefersReducedMotion])

  const goToIndex = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(pages.length - 1, index))
      if (clamped !== activeIndex) {
        navigate(pages[clamped].path)
      } else {
        // Snap back if same index
        animate(x, -clamped * width, {
          type: 'spring',
          stiffness: 350,
          damping: 30,
        })
      }
    },
    [activeIndex, navigate, pages, width, x],
  )

  const nextPage = useCallback(() => {
    if (activeIndex < pages.length - 1) {
      goToIndex(activeIndex + 1)
    }
  }, [activeIndex, goToIndex, pages.length])

  const prevPage = useCallback(() => {
    if (activeIndex > 0) {
      goToIndex(activeIndex - 1)
    }
  }, [activeIndex, goToIndex])

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextPage()
      } else if (e.key === 'ArrowLeft') {
        prevPage()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextPage, prevPage])

  // Touch Swipe Gesture Fallback Handler
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 })

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

    // Trigger swipe if horizontal movement > vertical movement and deltaX > 45px
    if (
      Math.abs(deltaX) > Math.abs(deltaY) * 1.15 &&
      Math.abs(deltaX) > 45 &&
      deltaTime < 600
    ) {
      if (deltaX < 0) {
        nextPage() // Swiped left -> Go to Next Page
      } else {
        prevPage() // Swiped right -> Go to Prev Page
      }
    }
    touchStartRef.current.time = 0
  }

  const handleDragEnd = useCallback(
    (_, info) => {
      if (width === 0) return

      const velocityThreshold = 250
      const offsetThreshold = width * 0.14
      const offset = info.offset.x
      const velocity = info.velocity.x

      if (offset < -offsetThreshold || velocity < -velocityThreshold) {
        nextPage()
      } else if (offset > offsetThreshold || velocity > velocityThreshold) {
        prevPage()
      } else {
        animate(x, -activeIndex * width, {
          type: 'spring',
          stiffness: 350,
          damping: 30,
        })
      }
    },
    [activeIndex, nextPage, prevPage, width, x],
  )

  return (
    <SwipeContext.Provider
      value={{ activeIndex, goToIndex, nextPage, prevPage }}
    >
      <div
        className="swipe-shell"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navbar removed as requested by user */}

        <div className="swipe-viewport">
          <motion.div
            className="swipe-track"
            style={{ x, width: `${pages.length * 100}vw` }}
            drag={prefersReducedMotion ? false : 'x'}
            dragConstraints={{
              left: -(pages.length - 1) * width,
              right: 0,
            }}
            dragElastic={0.12}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
          >
            {pages.map(({ path, Component }, index) => (
              <SwipePanel
                key={path}
                index={index}
                activeIndex={activeIndex}
                x={x}
                width={width}
              >
                <Component />
              </SwipePanel>
            ))}
          </motion.div>
        </div>
      </div>
    </SwipeContext.Provider>
  )
}

export default SwipeContainer


