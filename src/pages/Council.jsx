import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import BlurredBackground from '../components/BlurredBackground'
import RevealOnScroll from '../components/RevealOnScroll'
import './Page.css'

function Council() {
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
          <div className="page-hero__inner">
            <div className="page-eyebrow">
              <span className="page-eyebrow__dot" />
              <span>LEADERSHIP &amp; CLUBS</span>
            </div>

            <h1 className="page-welcome__line">STUDENT COUNCIL</h1>
            <p className="page-lead" style={{ marginTop: '1rem' }}>
              Meet the student council, organizing committee, event leads, and mentors behind Pehla Kadam 2026.
            </p>

            <button
              type="button"
              className="page-swipe-hint"
              onClick={() => navigate('/about')}
              style={{ marginTop: '1.5rem' }}
              aria-label="Back to About page"
            >
              <span className="page-swipe-hint__arrow">←</span>
              <span>BACK TO ABOUT</span>
            </button>
          </div>

          <div className="page-hero__footer">
            <div className="page-scroll-cue">
              <div className="page-scroll-line" />
              <span className="page-scroll-label">SCROLL</span>
            </div>
          </div>
        </header>

        <section className="page-content-wrap">
          <div className="page-content">
            <RevealOnScroll scrollContainerRef={scrollRef}>
              <div className="page-card">
                <div className="page-card__header">
                  <span className="page-card__pill">EXECUTIVE BOARD</span>
                  <span className="page-card__pill page-card__pill--amber">PEHLA KADAM 2026</span>
                </div>

                <h2 className="page-card__title">STUDENT COUNCIL LEADS</h2>

                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                    Add Student Council Members &amp; Leads here
                  </span>
                  <p className="content-placeholder__hint">
                    Add student president, coordinators, team photos, and committee details here.
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

export default Council
