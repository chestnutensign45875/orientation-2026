import { useRef } from 'react'
import { motion } from 'framer-motion'
import BlurredBackground from '../components/BlurredBackground'
import RotatingWords from '../components/RotatingWords'
import TextReveal from '../components/TextReveal'
import RevealOnScroll from '../components/RevealOnScroll'
import StackedCardDeck from '../components/StackedCardDeck'
import BranchStackedDeck from '../components/BranchStackedDeck'
import InteractiveSparkles from '../components/InteractiveSparkles'
import './Page.css'

/**
 * Animated Stat Badge component for mobile & desktop card highlights
 */
function StatBadge({ number, label, delay = 0 }) {
  return (
    <motion.div
      className="about-stat-badge"
      initial={{ opacity: 0, y: 15, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay, type: 'spring', stiffness: 350, damping: 25 }}
      whileHover={{ y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="about-stat-badge__number">{number}</span>
      <span className="about-stat-badge__label">{label}</span>
    </motion.div>
  )
}

/**
 * Animated Highlight Pill tag
 */
function HighlightTag({ icon, text, delay = 0 }) {
  return (
    <motion.span
      className="about-highlight-tag"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 400, damping: 22 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="about-highlight-tag__icon">{icon}</span>
      <span>{text}</span>
    </motion.span>
  )
}

/**
 * About Page — Pehla Kadam 2026 Orientation
 * Light theme with 70% opacity campus photo background (/page.png),
 * fully centered welcome hero, rotating typography, interactive draggable stars,
 * stacked card deck carousel (Events, Campus Map, Student Council), and animated content sections.
 */
function About() {
  const scrollRef = useRef(null)

  return (
    <article className="page">
      {/* Campus Background (/page.png) at 70% opacity with soft light overlay */}
      <BlurredBackground src="https://res.cloudinary.com/vbqcwa7d/image/upload/v1786031295/page_rx5cr9.png" scrollContainerRef={scrollRef} />

      <div className="page-scroll" ref={scrollRef}>
        {/* TOP LOGOS BAR (Left: /piet.png | Right: /Logo.svg) with Framer Motion Entrance */}
        <motion.div
          className="top-logos-bar"
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.a
            href="https://instagram.com/piet_jaipur"
            target="_blank"
            rel="noopener noreferrer"
            className="top-logo-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="PIET Instagram Profile"
          >
            <img src="https://res.cloudinary.com/vbqcwa7d/image/upload/v1786031296/piet_ppyo4j.png" alt="PIET Logo" className="top-logo-img--left" />
          </motion.a>
          <motion.a
            href="https://instagram.com/studentscouncilpiet"
            target="_blank"
            rel="noopener noreferrer"
            className="top-logo-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Students Council Instagram Profile"
          >
            <img src="https://res.cloudinary.com/vbqcwa7d/image/upload/v1786031295/Logo_mieuoo.svg" alt="Students Council Logo" className="top-logo-img--right" />
          </motion.a>
        </motion.div>

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
              <motion.span
                className="page-welcome__sub"
                initial={{ opacity: 0, y: 12, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6, type: 'spring', stiffness: 300 }}
              >
                TO PEHLA KADAM 2026
              </motion.span>
            </div>

            {/* Dynamic Rotating Words: ENGINEERS, CREATORS, ENTHUSIASTS, STUDENTS */}
            <RotatingWords
              prefix="FOR THE NEXT GENERATION OF"
              words={['ENGINEERS', 'CREATORS', 'ENTHUSIASTS', 'STUDENTS']}
            />

            {/* Mobile Swipe Guidance Banner
            <motion.div
              className="mobile-swipe-guide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <span className="mobile-swipe-guide__icon">👈</span>
              <span>SWIPE CARDS BELOW</span>
              <span className="mobile-swipe-guide__icon">👉</span>
            </motion.div> */}

            {/* STACKED CARDS DECK (Inspired by inspo.png) */}
            <StackedCardDeck />
          </div>

          {/* Animated Scroll Cue Footer */}
          <div className="page-hero__footer">
            <motion.div
              className="page-scroll-cue"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.div
                className="page-scroll-line"
                animate={{ scaleY: [0.6, 1.1, 0.6], opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
              <motion.span
                className="page-scroll-label"
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                SCROLL
              </motion.span>
            </motion.div>
          </div>
        </header>

        {/* ABOUT COLLEGE CONTENT SECTION WITH FRAMER MOTION ANIMATED CARDS */}
        <section className="page-content-wrap">
          <div className="page-content">

            {/* Card 1: About PIET */}
            <RevealOnScroll scrollContainerRef={scrollRef} delay={0.1}>
              <motion.div
                className="page-card"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.985 }}
              >
                <div className="page-card__header">
                  <motion.span
                    className="page-card__pill"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    STUDENT GUIDE
                  </motion.span>
                  <motion.span
                    className="page-card__pill page-card__pill--amber"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    BATCH OF 2026
                  </motion.span>
                </div>

                <h2 className="page-card__title">About PIET</h2>

                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                    More than just a number.
                  </span>
                  <p className="content-placeholder__hint">
                    Established in 2007, PIET is home to 1,700+ students, with a community built around technology, creativity, sports, entrepreneurship and exploration.
                  </p>

                  {/* Interactive Stats Grid for Mobile & Desktop */}
                  <div className="about-stats-grid">
                    <StatBadge number="1,700+" label="Active Students" delay={0.1} />
                    <StatBadge number="2007" label="Established" delay={0.18} />
                    <StatBadge number="10+" label="Student Clubs" delay={0.26} />
                    <StatBadge number="50+" label="Campus Events" delay={0.34} />
                  </div>
                </div>
              </motion.div>
            </RevealOnScroll>

            {/* Card 2: Welcome to Pehla Kadam 2026 */}
            <RevealOnScroll scrollContainerRef={scrollRef} delay={0.15}>
              <motion.div
                className="page-card"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.985 }}
              >
                <div className="page-card__header">
                  <motion.span
                    className="page-card__pill"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    STUDENT GUIDE
                  </motion.span>
                  <motion.span
                    className="page-card__pill page-card__pill--amber"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    BATCH OF 2026
                  </motion.span>
                </div>

                <h2 className="page-card__title">Welcome to Pehla Kadam 2026</h2>

                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                    Your Journey Begins Here.
                  </span>
                  <p className="content-placeholder__hint">
                    The Official Orientation Program of Poornima Institute of Engineering & Technology, Jaipur.
                    <br /><br />
                    Step into a world of innovation, friendships, inspiration, and unforgettable experiences. Pehla Kadam is designed to welcome every fresher into the PIET family with interactive sessions, cultural celebrations, motivational talks, exciting competitions, and performances by renowned personalities.
                  </p>
                </div>
              </motion.div>
            </RevealOnScroll>

            {/* Card 3: About Pehla Kadam */}
            <RevealOnScroll scrollContainerRef={scrollRef} delay={0.2}>
              <motion.div
                className="page-card"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.985 }}
              >
                <div className="page-card__header">
                  <motion.span
                    className="page-card__pill"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    STUDENT GUIDE
                  </motion.span>
                  <motion.span
                    className="page-card__pill page-card__pill--amber"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    BATCH OF 2026
                  </motion.span>
                </div>

                <h2 className="page-card__title">About Pehla Kadam</h2>

                <div className="content-placeholder">
                  <span className="content-placeholder__badge">
                    More than an Orientation Programme.
                  </span>
                  <p className="content-placeholder__hint">
                    Pehla Kadam is the flagship induction program of Poornima Institute of Engineering & Technology (PIET), Jaipur, created to make every fresher's transition into college life exciting, comfortable, and inspiring.
                    <br /><br />
                    Over five memorable days, you'll connect with faculty, seniors, industry experts, and fellow students while discovering endless opportunities in academics, innovation, leadership, sports, clubs, and campus life.
                    <br /><br />
                    Whether you're stepping into your first classroom or your first college fest, this is where your journey truly begins.
                  </p>
                </div>
              </motion.div>
            </RevealOnScroll>

            {/* Card 4: Academic Branches & Course Schemes (Stacked Deck Carousel) */}
            <RevealOnScroll scrollContainerRef={scrollRef} delay={0.25}>
              <motion.div
                className="page-card"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.985 }}
              >
                <div className="page-card__header">
                  <motion.span
                    className="page-card__pill"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ACADEMICS &amp; DEPARTMENTS
                  </motion.span>
                  <motion.span
                    className="page-card__pill page-card__pill--amber"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    COURSES &amp; SCHEMES
                  </motion.span>
                </div>

                <h2 className="page-card__title">Academic Branches &amp; Courses</h2>
                <p className="page-lead" style={{ fontSize: '0.92rem', marginBottom: '0.5rem' }}>
                  Explore engineering specializations, credit schemes, and detailed academic curriculum at PIET.
                </p>

                {/* BRANCHES STACKED CARD DECK */}
                <BranchStackedDeck />
              </motion.div>
            </RevealOnScroll>

          </div>
        </section>
      </div>
    </article>
  )
}

export default About




