import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import './About.css'

function About() {
  const words = ['Engineers', 'Creators', 'Enthusiasts', 'Students']
  const [wordIndex, setWordIndex] = useState(0)
  const articleRef = useRef(null)
  const { scrollY } = useScroll({ container: articleRef })
  const backgroundY = useTransform(scrollY, [0, 900], [0, -90])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % words.length)
    }, 2200)
    return () => window.clearInterval(interval)
  }, [words.length])

  return (
    <article className="about" ref={articleRef}>
      <div className="about-bg" aria-hidden="true">
        <motion.div className="about-bg-parallax" style={{ y: backgroundY }}>
          <img
            className="about-bg-image"
            src="/college.jpg"
            alt=""
          />
        </motion.div>
        <div className="about-bg-blur" />
        <div className="about-bg-overlay" />
        <div className="about-bg-vignette" />
      </div>

      <div className="about-content">
        <section className="about-hero" aria-labelledby="welcome-title">
          <p className="about-kicker">Orientation 2026</p>
          <h1 className="about-welcome" id="welcome-title">WELCOME</h1>

          <div className="about-rotator" aria-live="polite">
            <span className="about-rotator-word-wrap">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[wordIndex]}
                  className="about-rotator-word"
                  initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -22, filter: 'blur(6px)' }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          <div className="about-scroll-hint" aria-hidden="true">
            <span className="about-scroll-label">Discover more</span>
            <span className="about-scroll-line" />
          </div>
        </section>
        have a look at this repo , this is a website that i am creating for an orientation event in our college , the website needs to be frontend only , so i chose react + vite project for this one, now if you look at the pages in the src directory , there a three pages , about , events and map , and a fourth page known as coming soon which is just set to default until the website is done cause its already deployed , so when its done , i would just remove the coming soon content and the about page would be default , so what i want you to do is first help me in making the about page ,
        first of all , the website needs to follow a mobile first design , all the pages in the website would follow a darkish blue and white theme , the darkish blue background and the white in foreground , also in the backgound there would be a college image , check the local directory for the images, but in the code do not directly use the images from the local directory , instead copy the image you want to use in the public directory first
        next , we are going to use framer motion for the website , and the pages should go like the about page to be default , when i swipe right on the screen , the events page opens and map page on another right swipe just like they have on instagram but with more smooth and elegant animationn
        now for the about page , the background needs to be my college photo in blur the has a scrolling effect , take the photo from page.png in the local directory , leave the content part in the code empty for me , thats for me to fill in , the first this in the page should be welcome screen , below welcome the font should change from engineers , creaters , enthusiasts , students and then about the college content which i would fill , take inspiration from the screenshot in the local directory on to how the website should look but strictly follow the theme that i described above
        {/* Add your college introduction and orientation details here. */}
        <section className="about-body" aria-label="About the college" />
        <div className="about-end-spacer" />
      </div>
    </article>
  )
}

export default About
