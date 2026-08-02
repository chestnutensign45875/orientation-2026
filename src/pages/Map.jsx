import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import BlurredBackground from '../components/BlurredBackground'
import RevealOnScroll from '../components/RevealOnScroll'
import InteractiveSparkles from '../components/InteractiveSparkles'
import './Page.css'

function Map() {
  const scrollRef = useRef(null)
  const navigate = useNavigate()

  return (
    <article className="page">
      <BlurredBackground src="/page.png" scrollContainerRef={scrollRef} />

      <div className="page-scroll" ref={scrollRef}>
        {/* TOP LOGOS BAR (Left: /piet.png | Right: /Logo.svg) */}
        <div className="top-logos-bar">
          <div className="top-logo-item">
            <img src="/piet.png" alt="PIET Logo" className="top-logo-img--left" />
          </div>
          <div className="top-logo-item">
            <img src="/Logo.svg" alt="ACM Logo" className="top-logo-img--right" />
          </div>
        </div>

        <header className="page-hero">
          <InteractiveSparkles />

          <div className="page-hero__inner">
            <div className="page-eyebrow">
              <span className="page-eyebrow__dot" />
              <span>NAVIGATION &amp; VENUES</span>
            </div>

            <h1 className="page-welcome__line">CAMPUS MAP</h1>
            <p className="page-lead" style={{ marginTop: '1rem' }}>
              Find your way around Poornima Institute campus, key orientation venues, auditoriums, labs, and student facilities.
            </p>
          </div>

          <div className="page-hero__footer">
            <div className="page-scroll-cue">
              <div className="page-scroll-line" />
              <span className="page-scroll-label">SCROLL</span>
            </div>
            <button
              type="button"
              className="page-swipe-hint"
              onClick={() => navigate('/about')}
              aria-label="Back to About page"
            >
              <span className="page-swipe-hint__arrow">←</span>
              <span>ABOUT</span>
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
                  <span className="page-card__tag">LOCATION // PIET JAIPUR</span>
                  <span className="page-card__tag">INTERACTIVE GUIDE</span>
                </div>

                <h2 className="page-card__title">POORNIMA CAMPUS MAP</h2>

                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                    /* FILL IN CAMPUS MAP / IMAGE EMBED HERE */
                  </span>
                  <p className="content-placeholder__hint">
                    Add interactive SVG map, Google Maps embed, or campus diagram image here.
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

export default Map

