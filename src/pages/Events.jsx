import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import BlurredBackground from '../components/BlurredBackground'
import RevealOnScroll from '../components/RevealOnScroll'
import InteractiveSparkles from '../components/InteractiveSparkles'
import './Page.css'

// Single active event date (Updated manually each day by admin)
const ACTIVE_EVENT_DATE = '2026-08-17'

const TIMELINE_SLOTS = [
  {
    id: 'slot-1',
    slotNum: 'SLOT 01',
    timeLabel: '08:00 AM',
    timeRange: '8:00 AM – 9:30 AM',
    startHour: 8,
    startMin: 0,
    endHour: 9,
    endMin: 30,
    title: 'Morning Registration & Campus Welcome',
    venue: 'Main Gate & Auditorium Foyer',
    speaker: 'Orientation Steering Team',
    image: '', // Place event image URL here e.g. '/events/slot1.jpg'
  },
  {
    id: 'slot-2',
    slotNum: 'SLOT 02',
    timeLabel: '09:30 AM',
    timeRange: '9:30 AM – 11:00 AM',
    startHour: 9,
    startMin: 30,
    endHour: 11,
    endMin: 0,
    title: 'Keynote Address & Leadership Session',
    venue: 'PIET Main Auditorium',
    speaker: 'Director & Executive Board',
    image: '',
  },
  {
    id: 'slot-3',
    slotNum: 'LUNCH',
    timeLabel: '11:00 AM',
    timeRange: '11:00 AM – 12:00 PM',
    startHour: 11,
    startMin: 0,
    endHour: 12,
    endMin: 0,
    title: 'Lunch Break ',
    speaker: 'Hospitality Team',
    isBreak: true,
  },
  {
    id: 'slot-4',
    slotNum: 'SLOT 03',
    timeLabel: '12:00 PM',
    timeRange: '12:00 PM – 1:30 PM',
    startHour: 12,
    startMin: 0,
    endHour: 13,
    endMin: 30,
    title: 'Departmental Expos & Hands-on Workshops',
    venue: 'Academic Blocks & Labs',
    speaker: 'HODs & Student Club Leads',
    image: '',
  },
  {
    id: 'slot-5',
    slotNum: 'SLOT 04',
    timeLabel: '01:30 PM',
    timeRange: '1:30 PM – 2:50 PM',
    startHour: 13,
    startMin: 30,
    endHour: 14,
    endMin: 50,
    title: 'Cultural Showcase & Grand Finale',
    venue: 'Open Air Amphitheatre',
    speaker: 'Cultural Board & Student Clubs',
    image: '',
  },
]

function getEventStatus(dateStr, slot, now) {
  const [year, month, day] = dateStr.split('-').map(Number)
  const slotStart = new Date(year, month - 1, day, slot.startHour, slot.startMin, 0)
  const slotEnd = new Date(year, month - 1, day, slot.endHour, slot.endMin, 0)

  if (now > slotEnd) {
    return { type: 'ended', label: 'ENDED' }
  }
  if (now >= slotStart && now <= slotEnd) {
    return { type: 'live', label: 'CURRENTLY GOING' }
  }

  // Calculate countdown
  const diffMs = slotStart - now
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000)

  let countdownText = ''
  if (diffHrs > 24) {
    const days = Math.floor(diffHrs / 24)
    countdownText = `STARTING IN ${days}d ${diffHrs % 24}h`
  } else if (diffHrs > 0) {
    countdownText = `STARTING IN ${String(diffHrs).padStart(2, '0')}h ${String(diffMins).padStart(2, '0')}m`
  } else {
    countdownText = `STARTING IN ${String(diffMins).padStart(2, '0')}m ${String(diffSecs).padStart(2, '0')}s`
  }

  return { type: 'upcoming', label: countdownText }
}

function Events() {
  const scrollRef = useRef(null)
  const navigate = useNavigate()
  const [now, setNow] = useState(new Date())
  const [forceUnlock, setForceUnlock] = useState(false)

  // Real-time ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Calculate unlock time (8 hours before 8:00 AM = 12:00 AM midnight of ACTIVE_EVENT_DATE)
  const [year, month, day] = ACTIVE_EVENT_DATE.split('-').map(Number)
  const firstSlotStart = new Date(year, month - 1, day, 8, 0, 0)
  const unlockTime = new Date(firstSlotStart.getTime() - 8 * 60 * 60 * 1000)
  const isUnlocked = forceUnlock || now >= unlockTime

  // Lock countdown text calculation
  const lockDiffMs = Math.max(0, unlockTime - now)
  const lockHrs = Math.floor(lockDiffMs / (1000 * 60 * 60))
  const lockMins = Math.floor((lockDiffMs % (1000 * 60 * 60)) / (1000 * 60))
  const lockSecs = Math.floor((lockDiffMs % (1000 * 60)) / 1000)
  const lockTimerText = `${String(lockHrs).padStart(2, '0')}h ${String(lockMins).padStart(2, '0')}m ${String(lockSecs).padStart(2, '0')}s`

  return (
    <article className="page">
      <BlurredBackground src="https://res.cloudinary.com/vbqcwa7d/image/upload/v1786031295/page_rx5cr9.png" scrollContainerRef={scrollRef} />

      <div className="page-scroll" ref={scrollRef}>
        {/* TOP LOGOS BAR (Left: /piet.png | Right: /Logo.svg) */}
        <div className="top-logos-bar">
          <div className="top-logo-item">
            <img src="https://res.cloudinary.com/vbqcwa7d/image/upload/v1786031296/piet_ppyo4j.png" alt="PIET Logo" className="top-logo-img--left" />
          </div>
          <div className="top-logo-item">
            <img src="https://res.cloudinary.com/vbqcwa7d/image/upload/v1786031295/Logo_mieuoo.svg" alt="ACM Logo" className="top-logo-img--right" />
          </div>
        </div>

        {/* HERO HEADER */}
        <header className="page-hero">
          <InteractiveSparkles />

          <div className="page-hero__inner">


            <h1 className="page-welcome__line">EVENT SCHEDULE</h1>

            {/* HERO 3D ROTATING CARD STACK (PAST EVENT HIGHLIGHTS) */}
            <div className="council-rotator-wrap">
              <div className="rotator-card">
                <div className="rotator-card__content">
                  <img src="https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030716/1_jatxuh.jpg" alt="Past Event Highlight 1" className="rotator-card__logo" />
                </div>
              </div>
              <div className="rotator-card">
                <div className="rotator-card__content">
                  <img src="https://res.cloudinary.com/vbqcwa7d/image/upload/v1786031173/2_bo0jvx.jpg" alt="Past Event Highlight 2" className="rotator-card__logo" />
                </div>
              </div>
              <div className="rotator-card">
                <div className="rotator-card__content">
                  <img src="https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030718/3_vmgn3w.jpg" alt="Past Event Highlight 3" className="rotator-card__logo" />
                </div>
              </div>
            </div>

            <p className="page-lead" style={{ marginTop: '1rem' }}>
              Explore daily orientation sessions, workshops, keynotes, and real-time event updates for Pehla Kadam 2026.
            </p>
          </div>

          <div className="page-hero__footer">
            <div className="page-scroll-cue">
              <div className="page-scroll-line" />
              <span className="page-scroll-label">SCROLL</span>
            </div>
          </div>
        </header>

        {/* TIMELINE SECTION */}
        <section className="page-content-wrap">
          <div className="page-content">
            <RevealOnScroll scrollContainerRef={scrollRef}>
              {/* PREVIEW TOGGLE (For testing & demonstration) */}
              {/*<div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>*/}
              {/*  <button*/}
              {/*    type="button"*/}
              {/*    onClick={() => setForceUnlock(!forceUnlock)}*/}
              {/*    style={{*/}
              {/*      background: 'rgba(37, 99, 235, 0.08)',*/}
              {/*      border: '1px solid var(--border-blue)',*/}
              {/*      color: 'var(--blue-dark)',*/}
              {/*      borderRadius: '999px',*/}
              {/*      padding: '0.3rem 0.85rem',*/}
              {/*      fontSize: '0.75rem',*/}
              {/*      fontWeight: 700,*/}
              {/*      cursor: 'pointer',*/}
              {/*    }}*/}
              {/*  >*/}
              {/*    {isUnlocked ? '🔒 PREVIEW LOCKED STATE' : '🔓 PREVIEW UNLOCKED TIMELINE'}*/}
              {/*  </button>*/}
              {/*</div>*/}

              {/* IF LOCKED (< 8 HOURS BEFORE FIRST SLOT) */}
              {!isUnlocked ? (
                <motion.div
                  className="events-lock-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="events-lock-icon-wrap">
                    🔒
                  </div>
                  <span className="events-lock-badge">SCHEDULE LOCKED</span>
                  <h2 className="events-lock-title">NEXT SCHEDULE UNLOCKS AT MIDNIGHT</h2>
                  <div className="events-lock-timer">
                    {lockTimerText}
                  </div>
                  <p className="events-lock-desc">
                    The event timeline reveals 8 hours prior to the morning session (08:00 AM). Check back at 12:00 AM!
                  </p>
                </motion.div>
              ) : (
                /* UNLOCKED TIMELINE AXIS AND CARDS */
                <div className="timeline-container">
                  <div className="timeline-track-line" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key="unlocked-schedule"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                    >
                      {TIMELINE_SLOTS.map((slot, index) => {
                        const status = getEventStatus(ACTIVE_EVENT_DATE, slot, now)

                        return (
                          <motion.div
                            key={slot.id}
                            className={`timeline-item timeline-item--${status.type}`}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08, duration: 0.35 }}
                          >
                            {/* TIME SIDEBAR */}
                            <div className="timeline-time-col">
                              <span className="timeline-time-text">{slot.timeLabel}</span>
                              <span className="timeline-slot-num">{slot.slotNum}</span>
                            </div>

                            {/* TIMELINE NODE DOT */}
                            <div className="timeline-node-wrap">
                              <div className="timeline-node-dot" />
                            </div>

                            {/* EVENT GLASS CARD */}
                            <motion.div
                              className="timeline-card"
                              whileHover={{ y: -3, transition: { duration: 0.2 } }}
                              whileTap={{ scale: 0.985 }}
                            >
                              <div className="timeline-card__header">
                                {/* DYNAMIC STATUS BADGE */}
                                {status.type === 'live' && (
                                  <span className="event-badge event-badge--live">
                                    <span className="event-badge--live__dot" />
                                    <span>{status.label}</span>
                                  </span>
                                )}

                                {status.type === 'upcoming' && (
                                  <span className="event-badge event-badge--upcoming">
                                    ⏱ {status.label}
                                  </span>
                                )}

                                {status.type === 'ended' && (
                                  <span className="event-badge event-badge--ended">
                                    ✓ {status.label}
                                  </span>
                                )}

                                {slot.venue && !slot.isBreak ? (
                                  <div className="timeline-card__venue">
                                    📍 <span>{slot.venue}</span>
                                  </div>
                                ) : null}
                              </div>

                              <h3 className="timeline-card__title">{slot.title}</h3>

                              {/* EVENT IMAGE HOLDER (Hidden for Lunch Break) */}
                              {!slot.isBreak ? (
                                <div className="timeline-card__image-frame">
                                  {slot.image ? (
                                    <img
                                      src={slot.image}
                                      alt={slot.title}
                                      className="timeline-card__img"
                                      onError={(e) => {
                                        e.target.style.display = 'none'
                                        if (e.target.nextSibling) {
                                          e.target.nextSibling.style.display = 'flex'
                                        }
                                      }}
                                    />
                                  ) : null}
                                  <div
                                    className="timeline-card__image-placeholder"
                                    style={{ display: slot.image ? 'none' : 'flex' }}
                                  >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                      <circle cx="8.5" cy="8.5" r="1.5" />
                                      <polyline points="21 15 16 10 5 21" />
                                    </svg>
                                    <span>EVENT IMAGE HOLDER ({slot.slotNum})</span>
                                  </div>
                                </div>
                              ) : null}

                              <p className="timeline-card__desc">{slot.desc}</p>

                              <div className="timeline-card__footer">
                                <div className="timeline-card__speaker">
                                  👤 <span>{slot.speaker}</span>
                                </div>
                                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                                  🕒 {slot.timeRange}
                                </span>
                              </div>
                            </motion.div>
                          </motion.div>
                        )
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </RevealOnScroll>

            {/* BACK TO ABOUT PILL BUTTON AT BOTTOM OF PAGE */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem', marginBottom: '1.5rem' }}>
              <button
                type="button"
                className="page-swipe-hint"
                onClick={() => navigate('/about')}
                aria-label="Back to About page"
              >
                <span className="page-swipe-hint__arrow">←</span>
                <span>BACK TO ABOUT</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}

export default Events
