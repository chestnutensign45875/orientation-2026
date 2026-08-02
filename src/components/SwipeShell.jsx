import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { animate, motion, useMotionValue } from 'framer-motion'
import About from '../pages/About'
import Events from '../pages/Events'
import Map from '../pages/Map'
import './SwipeShell.css'

const PAGES = [
  { path: '/map', label: 'Map', Component: Map },
  { path: '/events', label: 'Events', Component: Events },
  { path: '/about', label: 'About', Component: About },
]

const SWIPE_THRESHOLD = 56
const VELOCITY_THRESHOLD = 500

function pathToIndex(pathname) {
  const i = PAGES.findIndex((p) => p.path === pathname)
  return i >= 0 ? i : PAGES.length - 1
}

/**
 * Instagram-style horizontal page carousel with spring physics.
 * Physical carousel ordered so a rightward swipe advances
 * About → Events → Map, as in the event flow.
 * Vertical scroll inside each page is preserved via axis locking.
 */
function SwipeShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const shellRef = useRef(null)
  const trackRef = useRef(null)

  const index = pathToIndex(location.pathname)

  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 390,
  )

  const x = useMotionValue(
    -index * (typeof window !== 'undefined' ? window.innerWidth : 390),
  )

  const dragging = useRef(false)
  const axis = useRef(null) // 'x' | 'y' | null
  const originX = useRef(0)
  const originY = useRef(0)
  const lastX = useRef(0)
  const lastT = useRef(0)
  const velocity = useRef(0)
  const indexRef = useRef(index)
  const widthRef = useRef(width)

  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => {
    widthRef.current = width
  }, [width])

  // Measure shell width
  useEffect(() => {
    const measure = () => {
      const w = shellRef.current?.clientWidth ?? window.innerWidth
      setWidth(w)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Spring the track to the active page
  useEffect(() => {
    if (dragging.current) return
    const controls = animate(x, -index * width, {
      type: 'spring',
      stiffness: 300,
      damping: 34,
      mass: 0.9,
    })
    return controls.stop
  }, [index, width, x])

  const goTo = useCallback(
    (nextIndex) => {
      const clamped = Math.max(0, Math.min(PAGES.length - 1, nextIndex))
      if (clamped === indexRef.current) {
        animate(x, -indexRef.current * widthRef.current, {
          type: 'spring',
          stiffness: 380,
          damping: 38,
        })
        return
      }
      navigate(PAGES[clamped].path)
    },
    [navigate, x],
  )

  // Non-passive touch listeners so we can preventDefault on horizontal swipes
  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const onStart = (e) => {
      if (e.touches.length !== 1) return
      const t = e.touches[0]
      dragging.current = true
      axis.current = null
      originX.current = t.clientX
      originY.current = t.clientY
      lastX.current = t.clientX
      lastT.current = performance.now()
      velocity.current = 0
      x.stop()
    }

    const onMove = (e) => {
      if (!dragging.current || e.touches.length !== 1) return
      const t = e.touches[0]
      const dx = t.clientX - originX.current
      const dy = t.clientY - originY.current

      if (!axis.current) {
        if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return
        axis.current = Math.abs(dx) > Math.abs(dy) * 1.1 ? 'x' : 'y'
      }

      if (axis.current === 'y') return

      // Horizontal page swipe — block native scroll/bounce
      e.preventDefault()

      const now = performance.now()
      const dt = now - lastT.current
      if (dt > 0) {
        velocity.current = ((t.clientX - lastX.current) / dt) * 1000
      }
      lastX.current = t.clientX
      lastT.current = now

      const i = indexRef.current
      const w = widthRef.current
      let offset = dx
      // Rubber-band at ends
      if ((i === 0 && dx > 0) || (i === PAGES.length - 1 && dx < 0)) {
        offset = dx * 0.25
      }
      x.set(-i * w + offset)
    }

    const onEnd = () => {
      if (!dragging.current) return
      dragging.current = false

      if (axis.current !== 'x') {
        axis.current = null
        return
      }
      axis.current = null

      const i = indexRef.current
      const dx = lastX.current - originX.current
      const v = velocity.current
      let next = i

      // Swipe left (finger moves left, negative dx) → next page
      if (dx < -SWIPE_THRESHOLD || v < -VELOCITY_THRESHOLD) next = i + 1
      // Swipe right → previous page
      else if (dx > SWIPE_THRESHOLD || v > VELOCITY_THRESHOLD) next = i - 1

      goTo(next)
    }

    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: false })
    el.addEventListener('touchend', onEnd)
    el.addEventListener('touchcancel', onEnd)

    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
      el.removeEventListener('touchcancel', onEnd)
    }
  }, [goTo, x])

  // Mouse drag (desktop preview)
  const onMouseDown = (e) => {
    if (e.button !== 0) return
    dragging.current = true
    axis.current = null
    originX.current = e.clientX
    originY.current = e.clientY
    lastX.current = e.clientX
    lastT.current = performance.now()
    velocity.current = 0
    x.stop()

    const onMove = (ev) => {
      if (!dragging.current) return
      const dx = ev.clientX - originX.current
      const dy = ev.clientY - originY.current

      if (!axis.current) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
        axis.current = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
      }
      if (axis.current === 'y') return

      const now = performance.now()
      const dt = now - lastT.current
      if (dt > 0) velocity.current = ((ev.clientX - lastX.current) / dt) * 1000
      lastX.current = ev.clientX
      lastT.current = now

      const i = indexRef.current
      const w = widthRef.current
      let offset = dx
      if ((i === 0 && dx > 0) || (i === PAGES.length - 1 && dx < 0)) {
        offset = dx * 0.25
      }
      x.set(-i * w + offset)
    }

    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      if (!dragging.current) return
      dragging.current = false
      if (axis.current !== 'x') {
        axis.current = null
        return
      }
      axis.current = null

      const i = indexRef.current
      const dx = lastX.current - originX.current
      const v = velocity.current
      let next = i
      if (dx < -SWIPE_THRESHOLD || v < -VELOCITY_THRESHOLD) next = i + 1
      else if (dx > SWIPE_THRESHOLD || v > VELOCITY_THRESHOLD) next = i - 1
      goTo(next)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  return (
    <div className="swipe-shell" ref={shellRef}>
      <div className="swipe-brand" aria-hidden="true">
        <span className="swipe-brand-mark">O26</span>
        <span className="swipe-brand-text">Orientation</span>
      </div>

      <motion.div
        ref={trackRef}
        className="swipe-track"
        style={{ x, width: width * PAGES.length }}
        onMouseDown={onMouseDown}
      >
        {PAGES.map(({ path, Component }) => (
          <section
            key={path}
            className="swipe-page"
            style={{ width }}
            aria-hidden={PAGES[index].path !== path}
          >
            <Component />
          </section>
        ))}
      </motion.div>

      <nav className="swipe-dots" aria-label="Pages">
        {PAGES.map((page, i) => (
          <button
            key={page.path}
            type="button"
            className={i === index ? 'swipe-dot is-active' : 'swipe-dot'}
            aria-label={page.label}
            aria-current={i === index ? 'page' : undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </nav>

      <div className="swipe-labels" aria-hidden="true">
        {PAGES.map((page, i) => (
          <span
            key={page.path}
            className={i === index ? 'swipe-label is-active' : 'swipe-label'}
          >
            {page.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default SwipeShell
