import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import BlurredBackground from '../components/BlurredBackground'
import RevealOnScroll from '../components/RevealOnScroll'
import InteractiveSparkles from '../components/InteractiveSparkles'
import './Page.css'

function Map() {
  const scrollRef = useRef(null)
  const containerRef = useRef(null)
  const navigate = useNavigate()

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen()
      }
    }
  }

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

        {/* HERO HEADER */}
        <header className="page-hero">
          <InteractiveSparkles />

          <div className="page-hero__inner">

            <h1 className="page-welcome__line">CAMPUS VIRTUAL TOUR</h1>
            <p className="page-lead" style={{ marginTop: '1rem' }}>
              Explore Poornima Institute campus in immersive 360° VR. Navigate auditoriums, academic blocks, labs, and orientation venues.
            </p>
          </div>

          <div className="page-hero__footer">
            <div className="page-scroll-cue">
              <div className="page-scroll-line" />
              <span className="page-scroll-label">SCROLL</span>
            </div>
          </div>
        </header>

        {/* MAP SECTION */}
        <section className="page-content-wrap" style={{ paddingBlock: '1rem 3rem' }}>
          <div className="page-content" style={{ maxWidth: '1200px' }}>
            <RevealOnScroll scrollContainerRef={scrollRef}>
              <div className="map-tour-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <span className="page-card__pill page-card__pill--blue">360° IMMERSIVE VIEW</span>
                <button
                  type="button"
                  onClick={handleFullscreen}
                  style={{
                    background: 'rgba(37, 99, 235, 0.08)',
                    border: '1px solid var(--border-blue)',
                    color: 'var(--blue-dark)',
                    borderRadius: '9px',
                    padding: '0.4rem 1rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                  }}
                >
                  <span>⛶</span> FULLSCREEN 360° TOUR
                </button>
              </div>

              {/* 360° IFRAME CONTAINER */}
              <div className="map-iframe-wrapper" ref={containerRef}>
                <iframe
                  className="map-iframe"
                  src="https://kuula.co/share/collection/7TZs8?logo=0&info=0&fs=1&vr=1&sd=1&initload=0&thumbs=1"
                  title="Poornima Campus 360 Virtual Tour"
                  allow="xr-spatial-tracking; gyroscope; accelerometer; compass; stereo; VR; fullscreen"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </RevealOnScroll>

            {/* BACK TO ABOUT PILL BUTTON AT BOTTOM */}
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

export default Map
