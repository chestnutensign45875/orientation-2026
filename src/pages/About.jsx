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
            
            {/* Card 1: About Pehla Kadam 2026 Orientation */}
            <RevealOnScroll scrollContainerRef={scrollRef}>
              <div className="page-card">
                <div className="page-card__header">
                  <span className="page-card__pill">INTRODUCTION PROGRAM</span>
                  <span className="page-card__pill page-card__pill--amber">PEHLA KADAM 2026</span>
                </div>
                
                <h2 className="page-card__title">So… where did you just land?</h2>
                
                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                    Welcome to Poornima Institute of Engineering & Technology, Jaipur.
                  </span>
                  <p className="content-placeholder__hint">
                    Starting college comes with plenty of questions — new classrooms, new people, new routines and a completely new experience. You don't need all the answers right away. Everyone starts somewhere.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            {/* Card 2: About Poornima Group & PIET */}
            <RevealOnScroll scrollContainerRef={scrollRef} delay={0.1}>
              <div className="page-card">
                <div className="page-card__header">
                  <span className="page-card__pill">INSTITUTE OVERVIEW</span>
                  <span className="page-card__pill page-card__pill--amber">POORNIMA GROUP</span>
                </div>

                <h2 className="page-card__title">What can you study here?</h2>

                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                    Find your path, one step at a time.
                  </span>
                  <p className="content-placeholder__hint">
                    PIET offers a range of engineering programmes, giving students different ways to explore technology, discover their interests and build their future.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

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

                <h2 className="page-card__title">More than a course </h2>

                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                  Your college story happens outside the classroom too.
                  </span>
                  <p className="content-placeholder__hint">
                    From first friendships and club meetings to competitions, projects, fests and unexpected moments, college becomes a collection of experiences you never planned for.
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

                <h2 className="page-card__title">First time here?  </h2>

                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                  Let's get you around
                  </span>
                  <p className="content-placeholder__hint">
                    Get familiar with your classrooms, labs, library, activity spaces, canteen and the places you'll soon know by heart.
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

                <h2 className="page-card__title">Looking for your people? </h2>

                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                  Find a community that feels like yours.
                  </span>
                  <p className="content-placeholder__hint">
                    Explore clubs and student communities across technology, sports, creativity, entrepreneurship, photography, drama and more.
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

                <h2 className="page-card__title">Beyond the classroom </h2>

                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                  Try something you’ve never tried before.
                  </span>
                  <p className="content-placeholder__hint">
                    Join a club, compete, volunteer, perform, build or play. You don't need to be good at something before you start — sometimes you discover your strengths by simply giving things a chance.                   </p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll scrollContainerRef={scrollRef} delay={0.2}>
              <div className="page-card">
                <div className="page-card__header">
                  <span className="page-card__pill">STUDENT GUIDE</span>
                  <span className="page-card__pill page-card__pill--amber">BATCH OF 2026</span>
                </div>

                <h2 className="page-card__title">Got an idea? </h2>

                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                  Turn curiosity into something real.
                  </span>
                  <p className="content-placeholder__hint">
                    Explore hackathons, projects, internships, entrepreneurship and other opportunities that take you beyond your regular timetable and syllabus.
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

                <h2 className="page-card__title">What happens after class? </h2>

                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                  Some of the best memories aren't planned.
                  </span>
                  <p className="content-placeholder__hint">
                    EFests, workshops, competitions, sports and celebrations bring a different energy to campus — and often become the moments you remember years later.
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



