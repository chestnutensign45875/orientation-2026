import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import BlurredBackground from '../components/BlurredBackground'
import RevealOnScroll from '../components/RevealOnScroll'
import InteractiveSparkles from '../components/InteractiveSparkles'
import './Page.css'

const CLUBS_DATA = [
  {
    id: 'acm',
    name: 'ACM',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/acm.png',
    brief: 'A community for students interested in computer science, coding, open source, technical events and developing real-world problem-solving skills. ',
    fullDesc: 'PIET ACM Student Chapter is dedicated to empowering students through hands-on technical projects, algorithmic problem-solving, open-source development, and national hackathons. Members gain mentorship from industry seniors and alumni.',
    captain: {
      name: 'Captain Name',
      role: 'Club President / Lead',
      image: '/acm.jpg', // Placeholder until photo provided
      email: 'acm.captain@piet.ac.in',
      bio: 'Lead organizer & senior coordinator for Pehla Kadam 2026 technical tracks.',
    },
  },
  {
    id: 'aws',
    name: 'AWS Club',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/aws.png',
    brief: 'Get hands-on with cloud computing through AWS workshops, projects and collaborative learning — with a focus on real-world skills and opportunities',
    fullDesc: 'If cloud computing interests you, this is another place to explore it. From Buzz the Cloud to a Tech Escape Room and UI Sprint, the club mixes learning with hands-on challenges and experimentation. ',
    captain: {
      name: 'Captain Name',
      role: 'Club President / Lead',
      image: '/acm.jpg', // Placeholder until photo provided
      email: 'acm.captain@piet.ac.in',
      bio: 'Lead organizer & senior coordinator for Pehla Kadam 2026 technical tracks.',
    },
  },
  {
    id: 'Debug-Club',
    name: 'The Debug Club',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/debug.png',
    brief: 'For coders and problem-solvers who enjoy DSA, coding contests, hackathons, and figuring out why their code decided to stop working. ',
    fullDesc: 'Programming, web development, Android development and gaming — all under one roof. And it\'s not just theory. Students have explored backend development, cloud computing, cybersecurity and Linux through activities such as Backend Matters, Cloud Roadmap, CyberQuest and Linux Unlocked. ',
    captain: {
      name: 'Captain Name',
      role: 'Debug Lead',
      image: '/captains/debug.jpg',
      email: 'robotics.lead@piet.ac.in',
      bio: 'Passionate hardware engineer and IoT developer guiding project teams.',
    },
  },
  {
    id: 'cyborgs-club',
    name: 'The Cyborgs',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/cyborgs.png',
    brief: 'Explore AI, automation and modern software development through workshops, projects and hands-on experimentation. ',
    fullDesc: 'AI. Machine Learning. Web Development. Python. Automation. UI/UX. Emerging technologies. Cyborgs brings together students who want to explore technology beyond the classroom — from their first line of code to real-world projects and workshops. Recent activities included Blockchain Unlocked, Git & GitHub Essentials, Cloud Connect, Foundations Forge and AI & ML Spark. ',
    captain: {
      name: 'Captain Name',
      role: 'NSS Lead Coordinator',
      image: '/Logo.svg',
      email: 'nss.lead@piet.ac.in',
      bio: 'Social activist and student mentor driving community impact programs.',
    },
  },
  {
    id: 'iste-club',
    name: 'ISTE',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/iste.png',
    brief: 'Discover emerging technologies, work on innovative projects and develop technical and professional skills through workshops and competitions. ',
    fullDesc: 'The Social Welfare & NSS wing mobilizes student volunteers for blood donation drives, tree plantation initiatives, rural education workshops, and campus sustainability projects.',
    captain: {
      name: 'Captain Name',
      role: 'NSS Lead Coordinator',
      image: '/Logo.svg',
      email: 'nss.lead@piet.ac.in',
      bio: 'Social activist and student mentor driving community impact programs.',
    },
  },
  {
    id: 'ieee-club',
    name: 'IEEE',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/ieee.png',
    brief: 'A space to explore technology beyond the classroom through workshops, hands-on sessions, industry interaction and innovative projects.',
    fullDesc: 'The Social Welfare & NSS wing mobilizes student volunteers for blood donation drives, tree plantation initiatives, rural education workshops, and campus sustainability projects.',
    captain: {
      name: 'Captain Name',
      role: 'NSS Lead Coordinator',
      image: '/Logo.svg',
      email: 'nss.lead@piet.ac.in',
      bio: 'Social activist and student mentor driving community impact programs.',
    },
  },
  {
    id: 'mlsa-club',
    name: 'MLSA',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/mlsa.png',
    brief: 'Learn and build with Microsoft technologies, from web development and AI/ML to cloud\n' +
        'computing, Azure and GitHub.',
    fullDesc: 'The Microsoft Learn Student Ambassadors community gives students opportunities to develop technical and leadership skills, connect with professionals and access Microsoft resources. ',
    captain: {
      name: 'Captain Name',
      role: 'NSS Lead Coordinator',
      image: '/Logo.svg',
      email: 'nss.lead@piet.ac.in',
      bio: 'Social activist and student mentor driving community impact programs.',
    },
  },
  {
    id: 'inventive-club',
    name: 'Inventive Club',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/inventive.png',
    brief: 'Got an idea? Turn it into something real. Inventive encourages students to build prototypes,\n' +
        'explore startups and solve real-world problems.',
    fullDesc: 'This is where ideas can move beyond the “what if we built this?” stage. Inventive brings students together around technology, engineering, creative problem-solving and realistic projects. One of its project exhibitions, UDBHAV 2025, featured 105 student teams and attracted more than 500 attendees. The club has also hosted sessions on robotics, aeromodelling and generative AI. ',
    captain: {
      name: 'Captain Name',
      role: 'NSS Lead Coordinator',
      image: '/Logo.svg',
      email: 'nss.lead@piet.ac.in',
      bio: 'Social activist and student mentor driving community impact programs.',
    },
  },
  {
    id: 'udaan-club',
    name: 'Udaan Aeromodelling Club',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/udaan.png',
    brief: 'Build, experiment and fly. Udaan gives students hands-on experience with RC planes,\n' +
        'gliders and hovercrafts while exploring aerodynamics and design.',
    fullDesc: 'The club gives students hands-on exposure to RC aircraft, gliders, aircraft design and construction, with students participating in project exhibitions, competitions and events such as FlightQuest 2.0 and BITS Pilani\'s SkyHigh. Because apparently engineering students weren\'t satisfied with keeping their projects on the ground. :) ',
    captain: {
      name: 'Captain Name',
      role: 'NSS Lead Coordinator',
      image: '/Logo.svg',
      email: 'nss.lead@piet.ac.in',
      bio: 'Social activist and student mentor driving community impact programs.',
    },
  },
  {
    id: 'vibrant-vision-club',
    name: 'Vibrant Vision',
    category: 'CULTURAL',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/vibrant_vision.png',
    brief: 'A creative space for art, craft, design and social awareness — with activities ranging from Art for a Cause and Diya Decoration to miniature art and online talent hunts. ',
    fullDesc: 'The Social Welfare & NSS wing mobilizes student volunteers for blood donation drives, tree plantation initiatives, rural education workshops, and campus sustainability projects.',
    captain: {
      name: 'Captain Name',
      role: 'NSS Lead Coordinator',
      image: '/Logo.svg',
      email: 'nss.lead@piet.ac.in',
      bio: 'Social activist and student mentor driving community impact programs.',
    },
  },
  {
    id: 'dk-club',
    name: 'Desi Kalakaarz',
    category: 'CULTURAL',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/dk.png',
    brief: 'For dancers, singers and performers who want to explore classical, folk and Western arts\n' +
        'and take the stage at college events.',
    fullDesc: 'Dance, music, performances and cultural expression. It\'s a space for students to learn, collaborate and perform alongside people who enjoy the same things. Recent activities included Navdurga, a Garba Workshop and Dev Festival. ',
    captain: {
      name: 'Captain Name',
      role: 'NSS Lead Coordinator',
      image: '/Logo.svg',
      email: 'nss.lead@piet.ac.in',
      bio: 'Social activist and student mentor driving community impact programs.',
    },
  },
  {
    id: 'jdc-club',
    name: 'Joshiley Drama Club',
    category: 'CULTURAL',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/jdc.png',
    brief: 'For people who love stories and are not afraid of a stage. Explore acting, scriptwriting,direction, plays and Nukkad Nataks.',
    fullDesc: 'Not everyone is comfortable performing in front of a crowd. But if you are — or if you want to become that person — Joshiley gives students a space to explore theatre through everything from Nukkad Nataks to full-length stage productions. ',
    captain: {
      name: 'Captain Name',
      role: 'NSS Lead Coordinator',
      image: '/Logo.svg',
      email: 'nss.lead@piet.ac.in',
      bio: 'Social activist and student mentor driving community impact programs.',
    },
  },
  {
    id: 'spic-macay-club',
    name: 'Spic Macay Club',
    category: 'CULTURAL',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/spic_macay.png',
    brief: 'Experience India\'s rich cultural heritage through classical music, dance, workshops,\n' +
        'performances and interactions with renowned artists',
    fullDesc: 'Not everything about college has to be about what\'s new. SPIC MACAY gives students opportunities to experience Indian classical music, dance, theatre and traditional arts, often through interactions with accomplished artists. Recent programmes included classical music performances, Garba workshops, cultural festivals, Odissi demonstrations and sessions featuring renowned artists. ',
    captain: {
      name: 'Captain Name',
      role: 'NSS Lead Coordinator',
      image: '/Logo.svg',
      email: 'nss.lead@piet.ac.in',
      bio: 'Social activist and student mentor driving community impact programs.',
    },
  },
  {
    id: 'literary',
    name: 'Literary ',
    category: 'MEDIA & PUB',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/literary.png',
    brief: 'For readers, writers and people who always have something to say — with debates, poetry, storytelling, writing competitions and public speaking. ',
    fullDesc: 'Poetry. Storytelling. Debates. Extempore. MUNs. Public speaking. The Literary Club gives students opportunities to develop their writing, communication and confidence — with activities such as Garjana, Verbal Voyage, Talent Hunt and Poornima Manthan, an inter-college debate involving Poornima institutions. And yes, if you\'re the person who always has something to say… this might be your place. ',
    captain: {
      name: 'Captain Name',
      role: 'Editor-in-Chief',
      image: '/Logo.svg',
      email: 'media.lead@piet.ac.in',
      bio: 'Writer, photographer, and chief editor managing campus media coverage.',
    },
  },
  {
    id: 'sports-fitness-club',
    name: 'Sports',
    category: 'ATHLETICS',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/nitish.png',
    brief: 'Because college shouldn\'t happen entirely behind a desk. The Sports Club coordinates college-level sporting activities and teams across games including volleyball, box cricket, basketball and table tennis.  ',
    fullDesc: 'The Sports & Athletics Club manages campus tournaments for cricket, football, basketball, badminton, and esports. We train student athletes for state and national inter-college championships.',
    captain: {
      name: 'Captain Name',
      role: 'Sports Captain',
      image: '/Logo.svg',
      email: 'sports.captain@piet.ac.in',
      bio: 'Varsity athlete organizing orientation sports leagues and fitness challenges.',
    },
  },
  {
    id: 'perfect-pixel-club',
    name: 'Perfect Pixels',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/perfect_pixels.png',
    brief: 'Capture campus life through photography, videography and visual storytelling while learning\n' +
        'editing, content creation and filmmaking.',
    fullDesc: 'Photography goes beyond simply taking a good picture. The club explores photography, cinematography, filmmaking, marketing, social media and digital skills, including activities such as photo walks. ',
    captain: {
      name: 'Captain Name',
      role: 'Sports Captain',
      image: '/Logo.svg',
      email: 'sports.captain@piet.ac.in',
      bio: 'Varsity athlete organizing orientation sports leagues and fitness challenges.',
    },
  },
  {
    id: 'social-welfare-club',
    name: 'NSS',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/nss.png',
    brief: 'Get involved beyond campus through cleanliness drives, educational outreach, awareness campaigns and community service initiatives. ',
    fullDesc: 'The Social Welfare & NSS wing mobilizes student volunteers for blood donation drives, tree plantation initiatives, rural education workshops, and campus sustainability projects.',
    captain: {
      name: 'Captain Name',
      role: 'NSS Lead Coordinator',
      image: '/Logo.svg',
      email: 'nss.lead@piet.ac.in',
      bio: 'Social activist and student mentor driving community impact programs.',
    },
  },
  {
    id: 'origin-club',
    name: 'Origin Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/origin.png',
    brief: 'A graphic design community where creativity meets technology through design workshops, competitions and collaborative projects.',
    fullDesc: 'Drawing, painting, sculpture, crafting, graphic design, audio and video editing — a space to explore different forms of creativity. ',
    captain: {
      name: 'Captain Name',
      role: 'Sports Captain',
      image: '/Logo.svg',
      email: 'sports.captain@piet.ac.in',
      bio: 'Varsity athlete organizing orientation sports leagues and fitness challenges.',
    },
  },
  {
    id: 'indgenius-club',
    name: 'INDGenius Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/indgenius.png',
    brief: 'Connect with a wider student network through leadership, internships, opportunities and\n' +
        'discussions around India\'s growth and development',
    fullDesc: 'A mix of innovation, leadership, discussion, technical activities and social responsibility. From Youth Parliament and cloud sessions to hackathon opportunities and leadership programmes, the club encourages students to look beyond academics and develop a wider perspective. ',
    captain: {
      name: 'Captain Name',
      role: 'Sports Captain',
      image: '/Logo.svg',
      email: 'sports.captain@piet.ac.in',
      bio: 'Varsity athlete organizing orientation sports leagues and fitness challenges.',
    },
  },
  {
    id: 'aptineus-club',
    name: 'Aptineus Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/aptineus.png',
    brief: 'Connect with a wider student network through leadership, internships, opportunities and\n' +
        'discussions around India\'s growth and development',
    fullDesc: 'The Sports & Athletics Club manages campus tournaments for cricket, football, basketball, badminton, and esports. We train student athletes for state and national inter-college championships.',
    captain: {
      name: 'Captain Name',
      role: 'Sports Captain',
      image: '/Logo.svg',
      email: 'sports.captain@piet.ac.in',
      bio: 'Varsity athlete organizing orientation sports leagues and fitness challenges.',
    },
  },
  {
    id: 'graduate-gateway-club',
    name: 'Graduate Gateway Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/graduate_gateway.png',
    brief: 'Graduate Gateway focuses on higher education, competitive examinations and career pathways through sessions such as CAT and UPSC guidance and aptitude activities. ',
    fullDesc: 'The Sports & Athletics Club manages campus tournaments for cricket, football, basketball, badminton, and esports. We train student athletes for state and national inter-college championships.',
    captain: {
      name: 'Captain Name',
      role: 'Sports Captain',
      image: '/Logo.svg',
      email: 'sports.captain@piet.ac.in',
      bio: 'Varsity athlete organizing orientation sports leagues and fitness challenges.',
    },
  },
  {
    id: 'esports-club',
    name: 'Esports Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/esports.png',
    brief: 'For competitive gamers who enjoy tournaments, strategy and teamwork — with\n' +
        'opportunities to explore game development too.',
    fullDesc: 'For those whose competition happens on a screen. The club brings students together for tournaments, gaming sessions and inter-college competitions, with activities including College Rivals 3, an OMEN Valorant Tournament and an IEEE gaming session. ',
    captain: {
      name: 'Captain Name',
      role: 'Sports Captain',
      image: '/Logo.svg',
      email: 'sports.captain@piet.ac.in',
      bio: 'Varsity athlete organizing orientation sports leagues and fitness challenges.',
    },
  },
  {
    id: 'pbic-club',
    name: 'PBIC Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/pbic.png',
    brief: 'Got a startup idea? PBIC helps students explore entrepreneurship, develop business plans and pitch their ideas.',
    fullDesc: 'The Sports & Athletics Club manages campus tournaments for cricket, football, basketball, badminton, and esports. We train student athletes for state and national inter-college championships.',
    captain: {
      name: 'Captain Name',
      role: 'Sports Captain',
      image: '/Logo.svg',
      email: 'sports.captain@piet.ac.in',
      bio: 'Varsity athlete organizing orientation sports leagues and fitness challenges.',
    },
  },
  {
    id: 'helping-hands-club',
    name: 'Helping Hands Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/helping_hands.png',
    brief: 'A student-led community focused on giving back through blood donation, donation drives,\n' +
        'awareness activities and community service.',
    fullDesc: 'Some student experiences aren\'t about competitions or careers. Helping Hands works around community support, essential resources and educational empowerment, with initiatives such as blood donation and Vastradaan drives. It\'s a reminder that college can also be about what you give back. ',
    captain: {
      name: 'Captain Name',
      role: 'Sports Captain',
      image: '/Logo.svg',
      email: 'sports.captain@piet.ac.in',
      bio: 'Varsity athlete organizing orientation sports leagues and fitness challenges.',
    },
  },
  {
    id: 'wise-club',
    name: 'WISE Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/wise.png',
    brief: 'WISE focuses on supporting women pursuing careers in science and engineering through discussions, educational initiatives, career development and community-building. The club also organised a Women\'s Hackathon focused on empowering women through innovation, teamwork and real-world problem solving. ',
    fullDesc: 'The Sports & Athletics Club manages campus tournaments for cricket, football, basketball, badminton, and esports. We train student athletes for state and national inter-college championships.',
    captain: {
      name: 'Captain Name',
      role: 'Sports Captain',
      image: '/Logo.svg',
      email: 'sports.captain@piet.ac.in',
      bio: 'Varsity athlete organizing orientation sports leagues and fitness challenges.',
    },
  },
  {
    id: 'iete-club',
    name: 'IETE Club',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--blue',
    // logo: '/clubs/iete.png',
    brief: 'A community for students passionate about electronics, telecommunication and technology. Learn through hands-on experiences, build new skills, and connect with the industry. ',
    fullDesc: 'The IETE Student Forum is a space for students interested in electronics, telecommunication, information technology, and related fields to learn beyond the classroom. Through workshops, seminars, competitions, industrial visits, and hands-on projects, students get opportunities to explore new technologies and gain practical experience. ',
    captain: {
      name: 'Captain Name',
      role: 'Sports Captain',
      image: '/Logo.svg',
      email: 'sports.captain@piet.ac.in',
      bio: 'Varsity athlete organizing orientation sports leagues and fitness challenges.',
    },
  },
  {
    id: 'mechatron-club',
    name: 'Mechatron Club',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/mechatron.png',
    brief: 'Learn by building. Mechatron is a hands-on technical community exploring Robotics, AI, VR, Automation, Embedded Systems and Computer Vision. Through workshops, hackathons, competitions and interdisciplinary projects, students turn ideas into working solutions. ',
    fullDesc: 'The Sports & Athletics Club manages campus tournaments for cricket, football, basketball, badminton, and esports. We train student athletes for state and national inter-college championships.',
    captain: {
      name: 'Captain Name',
      role: 'Sports Captain',
      image: '/Logo.svg',
      email: 'sports.captain@piet.ac.in',
      bio: 'Varsity athlete organizing orientation sports leagues and fitness challenges.',
    },
  },
  {
    id: 'yi-club',
    name: 'Young Indians Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/yi.png',
    brief: 'A platform for young minds to explore leadership, entrepreneurship, innovation and social impact. ',
    fullDesc: 'Young minds. Bigger ideas. Real impact. Yi brings together students and young professionals to explore leadership, entrepreneurship, innovation and social impact. Through workshops, competitions, industry interactions and community initiatives, the club encourages students to collaborate, take initiative and contribute to building a better future. ',
    captain: {
      name: 'Captain Name',
      role: 'Sports Captain',
      image: '/Logo.svg',
      email: 'sports.captain@piet.ac.in',
      bio: 'Varsity athlete organizing orientation sports leagues and fitness challenges.',
    },
  },
  {
    id: 'iks-club',
    name: 'Indian Knowledge System',
    category: 'CULTURAL',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/iks.jpeg',
    brief: 'A space to explore India’s rich knowledge, traditions, sciences and cultural heritage, while connecting ancient wisdom with modern learning. ',
    fullDesc: 'IKS is a space to explore India’s rich heritage, traditional knowledge and cultural wisdom across areas such as science, philosophy, arts, literature and everyday practices. The club encourages students to understand the relevance of this knowledge in today’s world through discussions, activities and cultural experiences. ',
    captain: {
      name: 'Captain Name',
      role: 'Sports Captain',
      image: '/Logo.svg',
      email: 'sports.captain@piet.ac.in',
      bio: 'Varsity athlete organizing orientation sports leagues and fitness challenges.',
    },
  },
]

function Council() {
  const scrollRef = useRef(null)
  const navigate = useNavigate()
  const [activeClub, setActiveClub] = useState(null)

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


            <h1 className="page-welcome__line">STUDENT COUNCIL</h1>
            <p className="page-lead" style={{ marginTop: '1rem' }}>
              Explore campus student clubs, executive boards, and meet the captains leading Pehla Kadam 2026.
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

        {/* CLUBS GRID SECTION */}
        <section className="page-content-wrap">
          <div className="page-content">
            <RevealOnScroll scrollContainerRef={scrollRef}>
              <div className="clubs-section-header">
                <span className="page-card__pill page-card__pill--amber">CAMPUS CLUBS</span>
                <h2 className="page-card__title" style={{ marginTop: '0.75rem' }}>SELECT A CLUB TO VIEW DETAILS</h2>
              </div>

              <div className="clubs-grid">
                {CLUBS_DATA.map((club) => (
                  <motion.div
                    key={club.id}
                    className="club-tile"
                    onClick={() => setActiveClub(club)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="club-tile__header">
                      <div className="club-tile__logo-wrap">
                        <img src={club.logo} alt={`${club.name} Logo`} className="club-tile__logo-img" />
                      </div>
                      <span className={`page-card__pill ${club.badgeClass}`}>
                        {club.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="club-tile__title">{club.name}</h3>
                      <p className="club-tile__brief">{club.brief}</p>
                    </div>

                    <div className="club-tile__action">
                      <span>VIEW CLUB &amp; CAPTAIN</span>
                      <span className="club-tile__action-arrow">→</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </div>

      {/* CLUB DETAIL MODAL OVERLAY */}
      <AnimatePresence>
        {activeClub && (
          <motion.div
            className="club-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveClub(null)}
          >
            <motion.div
              className="club-modal-container"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="club-modal__close-btn"
                onClick={() => setActiveClub(null)}
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="club-tile__header" style={{ marginBottom: '1rem' }}>
                <div className="club-tile__logo-wrap" style={{ width: '4rem', height: '4rem' }}>
                  <img src={activeClub.logo} alt={activeClub.name} className="club-tile__logo-img" />
                </div>
                <span className={`page-card__pill ${activeClub.badgeClass}`}>
                  {activeClub.category}
                </span>
              </div>

              <h2 className="page-card__title" style={{ fontSize: '1.8rem', textAlign: 'left', marginBottom: '0.75rem' }}>
                {activeClub.name}
              </h2>

              <p className="page-lead" style={{ textAlign: 'left', maxWidth: '100%', fontSize: '0.98rem' }}>
                {activeClub.fullDesc}
              </p>

              {/* KEY ACTIVITIES */}
              {activeClub.activities && (
                <div style={{ marginTop: '1.25rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    FLAGSHIP ACTIVITIES
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {activeClub.activities.map((act, i) => (
                      <span key={i} className="page-card__pill" style={{ fontSize: '0.78rem', padding: '0.3rem 0.75rem' }}>
                        ✦ {act}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CAPTAIN PROFILE CARD */}
              <div className="captain-card">
                <div className="captain-avatar-frame">
                  <img
                    src={activeClub.captain.image}
                    alt={activeClub.captain.name}
                    className="captain-avatar-img"
                    onError={(e) => {
                      e.target.src = '/Logo.svg' // Fallback if image fails to load
                    }}
                  />
                </div>
                <div className="captain-info">
                  <span className="captain-role">{activeClub.captain.role}</span>
                  <h3 className="captain-name">{activeClub.captain.name}</h3>
                  <p className="captain-bio">{activeClub.captain.bio}</p>
                  <span style={{ fontSize: '0.8rem', color: 'var(--blue)', fontWeight: 600, marginTop: '0.25rem' }}>
                    ✉ {activeClub.captain.email}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

export default Council

