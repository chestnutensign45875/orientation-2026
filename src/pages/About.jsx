import { useRef } from 'react'
import BlurredBackground from '../components/BlurredBackground'
import RotatingWords from '../components/RotatingWords'
import TextReveal from '../components/TextReveal'
import RevealOnScroll from '../components/RevealOnScroll'
import StackedCardDeck from '../components/StackedCardDeck'
import InteractiveSparkles from '../components/InteractiveSparkles'
import './Page.css'

function SparkleSvg({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  )
}

/**
 * About Page — Pehla Kadam 2026 Orientation
 * Light theme with 70% opacity campus photo background (/page.png),
 * fully centered welcome hero, rotating typography, interactive draggable stars,
 * stacked card deck carousel (Events, Campus Map, Student Council), and content sections.
 */
function About() {
  const scrollRef = useRef(null)

  return (
    <article className="page">
      {/* Campus Background (/page.png) at 70% opacity with soft light overlay */}
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

        {/* HERO / WELCOME SCREEN - FULLY CENTERED */}
        <header className="page-hero">
          {/* Interactive Floating & Draggable Stars */}
          <InteractiveSparkles />

          <div className="page-hero__inner">

            <div className="page-welcome">
              <TextReveal
                text="WELCOME"
                as="h1"
                className="page-welcome__line"
              />
              <span className="page-welcome__sub">TO PEHLA KADAM 2026</span>
            </div>

            {/* Dynamic Rotating Words: ENGINEERS, CREATORS, ENTHUSIASTS, STUDENTS */}
            <RotatingWords
              prefix="FOR THE NEXT GENERATION OF"
              words={['ENGINEERS', 'CREATORS', 'ENTHUSIASTS', 'STUDENTS']}
            />

            {/* STACKED CARDS DECK (Inspired by inspo.png) */}
            <StackedCardDeck />
          </div>

          <div className="page-hero__footer">
            <div className="page-scroll-cue">
              <div className="page-scroll-line" />
              <span className="page-scroll-label">SCROLL</span>
            </div>
          </div>
        </header>


        {/* ABOUT COLLEGE CONTENT SECTION (READY FOR USER TO FILL IN) */}
        <section className="page-content-wrap">
          <div className="page-content">


            {/* Card 2: About Poornima Group & PIET */}


            {/* Card 3: Freshers Guide & Highlights */}
            <RevealOnScroll scrollContainerRef={scrollRef} delay={0.2}>
              <div className="page-card">
                <div className="page-card__header">
                  <span className="page-card__pill">STUDENT GUIDE</span>
                  <span className="page-card__pill page-card__pill--amber">BATCH OF 2026</span>
                </div>

                <h2 className="page-card__title">About PIET </h2>

                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                  More than just a number.
                  </span>
                  <p className="content-placeholder__hint">
                    Established in 2007, PIET is home to 1,700+ students, with a community built around technology, creativity, sports, entrepreneurship and exploration.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll scrollContainerRef={scrollRef} delay={0.2}>
              <div className="page-card">
                <div className="page-card__header">
                  <span className="page-card__pill">STUDENT GUIDE</span>
                  <span className="page-card__pill page-card__pill--amber">BATCH OF 2026</span>
                </div>

                <h2 className="page-card__title">Welcome to Pehla Kadam 2026</h2>

                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                  Your Journey Begins Here.
                  </span>
                  <p className="content-placeholder__hint">
                    The Official Orientation Program of Poornima Institute of Engineering & Technology, Jaipur.

                    Step into a world of innovation, friendships, inspiration, and unforgettable experiences. Pehla Kadam is designed to welcome every fresher into the PIET family with interactive sessions, cultural celebrations, motivational talks, exciting competitions, and performances by renowned personalities.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll scrollContainerRef={scrollRef} delay={0.2}>
              <div className="page-card">
                <div className="page-card__header">
                  <span className="page-card__pill">STUDENT GUIDE</span>
                  <span className="page-card__pill page-card__pill--amber">BATCH OF 2026</span>
                </div>

                <h2 className="page-card__title">About Pehla Kadam</h2>

                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                  More than an Orientation Programme.
                  </span>
                  <p className="content-placeholder__hint">
                    Pehla Kadam is the flagship induction program of Poornima Institute of Engineering & Technology (PIET), Jaipur, created to make every fresher's transition into college life exciting, comfortable, and inspiring.

                    Over five memorable days, you'll connect with faculty, seniors, industry experts, and fellow students while discovering endless opportunities in academics, innovation, leadership, sports, clubs, and campus life.

                    Whether you're stepping into your first classroom or your first college fest, this is where your journey truly begins.
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

export default About



