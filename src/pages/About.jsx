import { useRef } from 'react'
import BlurredBackground from '../components/BlurredBackground'
import RotatingWords from '../components/RotatingWords'
import TextReveal from '../components/TextReveal'
import RevealOnScroll from '../components/RevealOnScroll'
import { useSwipe } from '../components/SwipeContainer'
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
 * fully centered welcome hero, rotating typography, and content cards.
 */
function About() {
  const scrollRef = useRef(null)
  const { nextPage } = useSwipe()

  return (
    <article className="page">
      {/* Campus Background (/page.png) at 70% opacity with soft light overlay */}
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


        {/* HERO / WELCOME SCREEN - FULLY CENTERED */}
        <header className="page-hero">

          <div className="page-hero__inner">
            {/* Floating Decorative Sparkles */}
            <div className="page-sparkle page-sparkle--blue" style={{ top: '-10px', right: '20px' }}>
              <SparkleSvg size={32} />
            </div>
            <div className="page-sparkle page-sparkle--amber" style={{ bottom: '20px', left: '-10px' }}>
              <SparkleSvg size={24} />
            </div>

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
          </div>

          <div className="page-hero__footer">
            <button
              type="button"
              className="page-swipe-hint"
              onClick={nextPage}
              aria-label="Go to Events page"
            >
              <span>SWIPE FOR EVENTS</span>
              <span className="page-swipe-hint__arrow">→</span>
            </button>
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
                    Starting college comes with a lot of questions.
                    Where's my classroom? Who am I going to sit with? Which club should I join? What is
                    college actually going to be like? And, most importantly… am I going to survive
                    engineering?
                    You don't need to have all the answers right away. Everyone starts somewhere.
                    Established in 2007, PIET is now home to 1,700+ students, each with a different
                    reason for being here. Some are here to code and build. Some are passionate about
                    sports, creativity or entrepreneurship. And some are still figuring out what they enjoy
                    and where they want to go.
                    And that's perfectly okay
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

                <h2 className="page-card__title">Because college is more than a course.</h2>

                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                    That's the side of PIET we want you to discover.
                  </span>
                  <p className="content-placeholder__hint">
                    It's the person sitting next to you on your first day.
                    It's finding that one place on campus where you always end up hanging out.
                    It's joining a club because your friend convinced you to "just come once."
                    It's spending three hours fixing a project that should have taken thirty minutes.
                    It's walking into a competition with no idea what you're doing — and coming out
                    knowing something new.
                    It's the fest you almost decided not to attend.
                    It's the random conversation that turns into a friendship.
                    It's the people you didn't know you'd meet when you first walked through the gates.
                    And somewhere between classes, deadlines, events, mistakes, late evenings and
                    completely unplanned moments, you start creating a life that is uniquely yours
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

                <h2 className="page-card__title">Okay, now for the official stuff.</h2>

                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                  Because every good introduction needs a little bit of paperwork. :)
                  </span>
                  <p className="content-placeholder__hint">
                    Established: 2007
                    Student Community: 1,700+
                    Affiliated to: Rajasthan Technical University
                    Approved by: AICTE
                    Recognized under: UGC 2(f)
                    That's the formal introduction.
                    Now let's talk about the part you'll actually remember.
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

                <h2 className="page-card__title">Want something beyond the classroom?</h2>

                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                  Your degree is only one part of your college experience.
                  </span>
                  <p className="content-placeholder__hint">
                    Join a club. Participate in a competition. Volunteer for an event. Step onto a stage.
                    Pick up a camera. Build something. Play a sport.
                    You don't have to be good at something before you try it.
                    Sometimes, you discover what you're good at by simply giving it a chance.
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



