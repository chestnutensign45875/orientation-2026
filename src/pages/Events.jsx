import { useRef } from 'react'
import BlurredBackground from '../components/BlurredBackground'
import RevealOnScroll from '../components/RevealOnScroll'
import { useSwipe } from '../components/SwipeContainer'
import './Page.css'

function Events() {
  const scrollRef = useRef(null)
  const { nextPage, prevPage } = useSwipe()

  return (
    <article className="page">
      <BlurredBackground src="/page.png" scrollContainerRef={scrollRef} />

      <div className="page-scroll" ref={scrollRef}>
        {/* TOP LOGOS BAR (Left: /1.png | Right: /2.png) */}
        <div className="top-logos-bar">
          <div className="top-logo-item">
            <img src="/piet.png" alt="Left Logo" className="top-logo-img--left" />
          </div>
          <div className="top-logo-item">
            <img src="/Logo.svg" alt="Right Logo" className="top-logo-img--right" />
          </div>
        </div>

        <header className="page-hero">

          <div className="page-hero__inner">
            <div className="page-eyebrow">
              <span className="page-eyebrow__dot" />
              <span>SCHEDULE &amp; CURRICULUM</span>
            </div>

            <h1 className="page-welcome__line">EVENTS</h1>
            <p className="page-lead" style={{ marginTop: '1rem' }}>
              Explore orientation sessions, interactive workshops, keynote addresses, and venue schedules across campus.
            </p>
          </div>

          <div className="page-hero__footer">
            <button
              type="button"
              className="page-swipe-hint"
              onClick={prevPage}
              aria-label="Go to About page"
            >
              <span className="page-swipe-hint__arrow">←</span>
              <span>ABOUT</span>
            </button>
            <button
              type="button"
              className="page-swipe-hint"
              onClick={nextPage}
              aria-label="Go to Map page"
            >
              <span>MAP</span>
              <span className="page-swipe-hint__arrow">→</span>
            </button>
          </div>
        </header>


        <section className="page-content-wrap">
          <div className="page-content">
            <RevealOnScroll scrollContainerRef={scrollRef}>
              <div className="page-card">
                <span className="page-card__corner page-card__corner--tl">+</span>
                <span className="page-card__corner page-card__corner--tr">+</span>
                <span className="page-card__corner page-card__corner--bl">+</span>
                <span className="page-card__corner page-card__corner--br">+</span>

                <div className="page-card__header">
                  <span className="page-card__tag">DAY 01 // INAUGURATION</span>
                  <span className="page-card__tag">MAIN AUDITORIUM</span>
                </div>

                <h2 className="page-card__title">WELCOME &amp; ORIENTATION SESSIONS</h2>
                
                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                    /* FILL IN EVENT SCHEDULE CONTENT HERE */
                  </span>
                  <p className="content-placeholder__hint">
                    Add session timings, speakers, hall locations, and event agendas here.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </div>
    </article>
  )
}

export default Events

