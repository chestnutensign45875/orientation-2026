import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import BlurredBackground from '../components/BlurredBackground'
import RevealOnScroll from '../components/RevealOnScroll'
import InteractiveSparkles from '../components/InteractiveSparkles'
import './Page.css'

const EXECUTIVE_LEADS = [
  {
    id: 'chair',
    role: 'CHAIR',
    name: 'Rohan Dey',
    image: '/captains/chair.jpg',
    badge: 'HEAD OF COUNCIL',
    badgeClass: 'page-card__pill--blue',
    initRotate: 14,
    initX: 45,
    targetRotate: 4,
    targetX: 0,
  },
  {
    id: 'advisory',
    role: 'Advisory',
    name: 'Anusha Shandilya',
    image: '/captains/advisary.jpeg',
    badge: 'HEAD OF COUNCIL',
    badgeClass: 'page-card__pill--blue',
    initRotate: -14,
    initX: -45,
    targetRotate: -4,
    targetX: 0,
  },
  {
    id: 'co-chair-1',
    role: 'CO-CHAIR',
    name: 'Suhani Kumari',
    image: '/captains/co-chair1.jpg',
    badge: 'EXECUTIVE BOARD',
    badgeClass: 'page-card__pill--amber',
    initRotate: -14,
    initX: -45,
    targetRotate: -4,
    targetX: 0,
  },
  {
    id: 'co-chair-2',
    role: 'CO-CHAIR',
    name: 'Purushotam Lingwal',
    image: '/captains/co-chair2.jpg',
    badge: 'EXECUTIVE BOARD',
    badgeClass: 'page-card__pill--amber',
    initRotate: 14,
    initX: 45,
    targetRotate: 4,
    targetX: 0,
  },
]

const CLUBS_DATA = [
  {
    id: 'acm',
    name: 'ACM',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/acm.png',
    brief: 'A community for students interested in computer science, coding, open source, technical events and developing real-world problem-solving skills.',
    fullDesc: 'The ACM Club is a community for students passionate about computing, programming and technology. Through coding sessions, workshops, competitions, hackathons and collaborative projects, members strengthen their technical and problem-solving skills while exploring new areas of computing. ',
    captain: {
      name: 'Khyati Arora',
      role: 'Captain',
      image: '/captains/acm.jpg',
      email: 'acm.captain@piet.ac.in',
      instagram: 'https://instagram.com/acm_piet',
    },
  },
  {
    id: 'aws',
    name: 'AWS Club',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/aws.png',
    brief: 'Get hands-on with cloud computing through AWS workshops, projects and collaborative learning — with a focus on real-world skills and opportunities.',
    fullDesc: 'If cloud computing interests you, this is another place to explore it. From Buzz the Cloud to a Tech Escape Room and UI Sprint, the club mixes learning with hands-on challenges and experimentation.',
    captain: {
      name: 'Aarya Maheshwari',
      role: 'Captain',
      image: '/captains/aws.jpg',
      email: 'aws.lead@piet.ac.in',
      instagram: 'https://instagram.com/aws_piet',
    },
  },
  {
    id: 'Debug-Club',
    name: 'The Debug Club',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/debug.png',
    brief: 'For coders and problem-solvers who enjoy DSA, coding contests, hackathons, and figuring out why their code decided to stop working.',
    fullDesc: "Programming, web development, Android development and gaming — all under one roof. Students explore backend development, cloud computing, cybersecurity and Linux through activities such as Backend Matters, Cloud Roadmap, CyberQuest and Linux Unlocked.",
    captain: {
      name: 'Ayush Sharma',
      role: 'Captain',
      image: '/captains/debug.jpg',
      email: 'debugclub@poornima.org',
      instagram: 'https://instagram.com/debugclub',
    },
  },
  {
    id: 'cyborgs-club',
    name: 'The Cyborgs',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/cyborgs.png',
    brief: 'Explore AI, automation and modern software development through workshops, projects and hands-on experimentation.',
    fullDesc: 'AI, Machine Learning, Web Development, Python, Automation, and UI/UX. Cyborgs brings together students who want to explore technology beyond the classroom — from their first line of code to real-world projects and workshops.',
    captain: {
      name: 'Divyansh Dua',
      role: 'Captain',
      image: '/captains/cyborgs.jpg',
      email: 'cyborgs.lead@piet.ac.in',
      instagram: 'https://instagram.com/cyborgs_piet',
    },
  },
  {
    id: 'iste-club',
    name: 'ISTE',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/iste.png',
    brief: 'Discover emerging technologies, work on innovative projects and develop technical and professional skills through workshops and competitions.',
    fullDesc: 'The ISTE Club provides students with a platform to explore engineering, technology and innovation beyond the classroom. Through workshops, technical sessions, competitions and hands-on projects, members develop practical skills, problem-solving abilities and industry awareness while working together on new ideas. ',
    captain: {
      name: 'Ananya Gupta',
      role: 'Captain',
      image: '/captains/iste.jpg',
      email: 'iste.lead@piet.ac.in',
      instagram: 'https://instagram.com/iste_piet',
    },
  },
  {
    id: 'ieee-club',
    name: 'IEEE',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/ieee.png',
    brief: 'A space to explore technology beyond the classroom through workshops, hands-on sessions, industry interaction and innovative projects.',
    fullDesc: 'IEEE student branch brings international tech standards, research paper workshops, hardware design sessions, and global network connections to campus.',
    captain: {
      name: 'Kartik Khurana',
      role: 'Captain',
      image: '/captains/ieee.jpg',
      email: 'ieee@poornima.org',
      instagram: 'https://www.instagram.com/ieee.piet',
    },
  },
  {
    id: 'mlsa-club',
    name: 'MLSA',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/mlsa.png',
    brief: 'Learn and build with Microsoft technologies, from web development and AI/ML to cloud computing, Azure and GitHub.',
    fullDesc: 'The Microsoft Learn Student Ambassadors community gives students opportunities to develop technical and leadership skills, connect with professionals and access Microsoft resources.',
    captain: {
      name: 'Satyendra Singh',
      role: 'Captain',
      image: '/captains/mlsa.jpg',
      email: 'mlsa.lead@piet.ac.in',
      instagram: 'https://instagram.com/mlsa_piet',
    },
  },
  {
    id: 'inventive-club',
    name: 'Inventive Club',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/inventive.png',
    brief: 'Got an idea? Turn it into something real. Inventive encourages students to build prototypes, explore startups and solve real-world problems.',
    fullDesc: 'This is where ideas move beyond the "what if" stage. Inventive brings students together around technology, engineering, creative problem-solving and realistic projects.',
    captain: {
      name: 'Yash Raj Sodha',
      role: 'Captain',
      image: '/captains/inventive.jpg',
      email: 'inventive.lead@piet.ac.in',
      instagram: 'https://instagram.com/inventive_piet',
    },
  },
  {
    id: 'udaan-club',
    name: 'Udaan Aeromodelling Club',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/udaan.png',
    brief: 'Build, experiment and fly. Udaan gives students hands-on experience with RC planes, gliders and hovercrafts while exploring aerodynamics and design.',
    fullDesc: 'Hands-on exposure to RC aircraft, gliders, aircraft design and construction, with students participating in project exhibitions, competitions and flight expos.',
    captain: {
      name: 'Lakshy Parmar',
      role: 'Captain',
      image: '/captains/udaan.jpg',
      email: 'udaan@poornima.org',
      instagram: 'https://www.instagram.com/udaan_aeromodelling_club?igsh=ZmQ1cG40bHJuZDNl',
    },
  },
  {
    id: 'vibrant-vision-club',
    name: 'Vibrant Vision',
    category: 'CULTURAL',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/vibrant_vision.png',
    brief: 'A creative space for art, craft, design and social awareness — with activities ranging from Art for a Cause and Diya Decoration to miniature art.',
    fullDesc: 'Vibrant Vision celebrates visual arts, handicrafts, poster design, installation art, and creative expressions across campus events.',
    captain: {
      name: 'Tarushi Khandelwal',
      role: 'Captain',
      image: '/captains/vibrant-vision.jpg',
      email: 'vibrantvision.lead@piet.ac.in',
      instagram: 'https://instagram.com/vibrantvision_piet',
    },
  },
  {
    id: 'dk-club',
    name: 'Desi Kalakaarz',
    category: 'CULTURAL',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/dk.png',
    brief: 'For dancers, singers and performers who want to explore classical, folk and Western arts and take the stage at college events.',
    fullDesc: 'Dance, music, performances and cultural expression. A space for students to learn, collaborate and perform alongside people who share the same passion.',
    captain: {
      name: 'Mahika Khanna',
      role: 'Captain',
      image: '/captains/dk.jpg',
      email: 'dk.lead@piet.ac.in',
      instagram: 'https://instagram.com/desikalakaarz_piet',
    },
  },
  {
    id: 'jdc-club',
    name: 'Joshiley Drama Club',
    category: 'CULTURAL',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/jdc.png',
    brief: 'For people who love stories and are not afraid of a stage. Explore acting, scriptwriting, direction, plays and Nukkad Nataks.',
    fullDesc: 'Joshiley Drama Club provides students a platform to explore theatre, street plays (Nukkad Natak), scriptwriting, and full-length stage productions.',
    captain: {
      name: 'Shriyam Tailong',
      role: 'Captain',
      image: '/captains/jdc.jpeg',
      email: 'joshileydrama@poornima.org',
      instagram: 'https://www.instagram.com/joshileydramaclub',
    },
  },
  {
    id: 'spic-macay-club',
    name: 'Spic Macay Club',
    category: 'CULTURAL',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/spic_macay.png',
    brief: 'Experience India\'s rich cultural heritage through classical music, dance, workshops, performances and interactions with renowned artists.',
    fullDesc: 'SPIC MACAY gives students opportunities to experience Indian classical music, dance, theatre and traditional arts featuring interactions with accomplished national artists.',
    captain: {
      name: 'Himanshu Soni',
      role: 'Captain',
      image: '/captains/co-chair.jpg',
      email: 'spicmacay.lead@piet.ac.in',
      instagram: 'https://instagram.com/spicmacay_piet',
    },
  },
  {
    id: 'literary',
    name: 'Literary Club',
    category: 'MEDIA & PUB',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/literary.png',
    brief: 'For readers, writers and people who always have something to say — with debates, poetry, storytelling, writing competitions and public speaking.',
    fullDesc: 'Poetry, storytelling, debates, extempore, MUNs, and public speaking. The Literary Club gives students opportunities to develop writing, communication and stage confidence.',
    captain: {
      name: 'Kanupriya Sharma',
      role: 'Captain',
      image: '/captains/literary.jpg',
      email: 'literary.lead@piet.ac.in',
      instagram: 'https://instagram.com/literary_piet',
    },
  },
  {
    id: 'sports-fitness-club',
    name: 'Sports Club',
    category: 'ATHLETICS',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/nitish.png',
    brief: 'Because college shouldn\'t happen entirely behind a desk. Coordinates college-level sporting activities and teams across volleyball, cricket, basketball and table tennis.',
    fullDesc: 'The Sports & Athletics Club manages campus tournaments for cricket, football, basketball, badminton, and esports. We train student athletes for state and national inter-college championships.',
    captain: {
      name: 'Nitish Sharma',
      role: 'Captain',
      image: '/captains/sports.png',
      email: 'sports@poornima.org',
      instagram: 'https://instagram.com/sports.piet',
    },
  },
  {
    id: 'perfect-pixel-club',
    name: 'Perfect Pixels',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/perfect_pixels.png',
    brief: 'Capture campus life through photography, videography and visual storytelling while learning editing, content creation and filmmaking.',
    fullDesc: 'Perfect Pixels explores photography, cinematography, filmmaking, social media, and digital content creation, including photo walks and campus coverage.',
    captain: {
      name: 'Anshul Sharma',
      role: 'Captain',
      image: '/captains/pp.jpg',
      email: 'pixels.lead@piet.ac.in',
      instagram: 'https://instagram.com/perfectpixels_piet',
    },
  },
  {
    id: 'social-welfare-club',
    name: 'NSS',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--amber',
    logo: '/clubs/nss.png',
    brief: 'Get involved beyond campus through cleanliness drives, educational outreach, awareness campaigns and community service initiatives.',
    fullDesc: 'The NSS Club encourages students to engage with society through community service, awareness drives, volunteering and social initiatives. It helps develop empathy, responsibility and leadership while creating opportunities to contribute to the community. ',
    captain: {
      name: 'Vaibhav Sharma',
      role: 'Captain',
      image: '/captains/nss.jpg',
      email: 'nss.piet@poornima.org',
      instagram: 'https://www.instagram.com/nss.pietjaipur',
    },
  },
  {
    id: 'origin-club',
    name: 'Origin Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/origin.png',
    brief: 'A graphic design community where creativity meets technology through design workshops, competitions and collaborative projects.',
    fullDesc: 'Drawing, painting, sculpture, crafting, graphic design, audio and video editing — a creative space to explore digital design tools.',
    captain: {
      name: 'Shalini Choudhary',
      role: 'Captain',
      image: '/captains/origin.jpg',
      email: 'origin.lead@piet.ac.in',
      instagram: 'https://instagram.com/origin_piet',
    },
  },
  {
    id: 'indgenius-club',
    name: 'INDGenius Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/indgenius.png',
    brief: 'Connect with a wider student network through leadership, internships, opportunities and discussions around India\'s growth and development.',
    fullDesc: 'A mix of innovation, leadership, discussion, technical activities and social responsibility. From Youth Parliament and cloud sessions to hackathons and leadership programs.',
    captain: {
      name: 'Anushka Shekhawat',
      role: 'Captain',
      image: '/captains/indgenius.jpg',
      email: 'indgenius.lead@piet.ac.in',
      instagram: 'https://instagram.com/indgenius_piet',
    },
  },
  {
    id: 'aptineus-club',
    name: 'Aptineus Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/aptineus.png',
    brief: 'Focusing on aptitude, logical reasoning, soft skills and interview prep to help students excel in placement drives and competitive exams.',
    fullDesc: 'The Aptineus Club focuses on developing students\' aptitude, logical reasoning, communication and problem-solving skills through interactive activities, challenges and learning sessions. It helps students build confidence and prepare for academic, competitive and professional opportunities. ',
    captain: {
      name: 'Harsh Yadav',
      role: 'Aptitude & Training Captain',
      image: '/captains/aptineus.jpeg',
      email: 'aptineusclub@poornima.org',
      instagram: 'https://instagram.com/aptineus_club',
    },
  },
  {
    id: 'graduate-gateway-club',
    name: 'Graduate Gateway',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/graduate_gateway.png',
    brief: 'Focuses on higher education, competitive examinations and career pathways through sessions such as CAT and UPSC guidance and aptitude activities.',
    fullDesc: 'Graduate Gateway assists students aspiring for GATE, CAT, GRE, UPSC, and higher studies abroad with mentorship sessions and resource libraries.',
    captain: {
      name: 'Rishabh Nandi',
      role: 'Captain',
      // image: '/captains/co-chair.jpg',
      email: 'gateway.lead@piet.ac.in',
      instagram: 'https://instagram.com/gradgateway_piet',
    },
  },
  {
    id: 'esports-club',
    name: 'Esports Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/esports.png',
    brief: 'For competitive gamers who enjoy tournaments, strategy and teamwork — with opportunities to explore game development too.',
    fullDesc: 'Brings students together for gaming tournaments, Valorant leagues, BGMI cups, and game design sessions with College Rivals.',
    captain: {
      name: 'Gajendra Singh',
      role: 'Gaming Tournament Director',
      image: '/captains/esports.jpg',
      email: 'esports.lead@piet.ac.in',
      instagram: 'https://instagram.com/esports_piet',
    },
  },
  {
    id: 'pbic-club',
    name: 'PBIC Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/pbic.png',
    brief: 'Got a startup idea? PBIC helps students explore entrepreneurship, develop business plans and pitch their ideas to incubators.',
    fullDesc: 'The Poornima Business Incubation Centre (PBIC) provides students with a platform to explore entrepreneurship, innovation and startup ideas. It helps students develop their ideas, understand the business side of innovation, work with teams and take their concepts closer to becoming real ventures. ',
    captain: {
      name: 'Dev Pratap Singh Rathore',
      role: 'Captain',
      image: '/captains/pbic.jpg',
      email: 'pbic.lead@piet.ac.in',
      instagram: 'https://instagram.com/pbic_piet',
    },
  },
  {
    id: 'helping-hands-club',
    name: 'Helping Hands',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/helping_hands.png',
    brief: 'A student-led community focused on giving back through blood donation, donation drives, awareness activities and community service.',
    fullDesc: 'Focused on community support, essential resource distribution, and educational empowerment initiatives such as blood donation and Vastradaan drives.',
    captain: {
      name: 'Aditya Agarwal',
      role: 'Captain',
      image: '/captains/helping-hands.jpg',
      email: 'helpinghands.lead@piet.ac.in',
      instagram: 'https://instagram.com/helpinghands_piet',
    },
  },
  {
    id: 'wise-club',
    name: 'WISE Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/wise.png',
    brief: 'Supporting women pursuing careers in science and engineering through discussions, educational initiatives, career development and hackathons.',
    fullDesc: 'Women in Science & Engineering (WISE) empowers female engineers through technical hackathons, leadership seminars, and career mentorship.',
    captain: {
      name: 'Anisha Agarwal',
      role: 'Captain',
      image: '/captains/wise.jpg',
      email: 'wise.lead@piet.ac.in',
      instagram: 'https://instagram.com/wise_piet',
    },
  },
  {
    id: 'iete-club',
    name: 'IETE Club',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/iete.jpeg',
    brief: 'A community for students passionate about electronics, telecommunication and technology. Learn through hands-on experiences and build new skills.',
    fullDesc: 'IETE Student Forum provides a space for electronics, telecom, and IoT enthusiasts to explore hardware design, PCB etching, and embedded systems.',
    captain: {
      name: 'Aarohi Jalan',
      role: 'Captain',
      image: '/captains/iete.jpg',
      email: 'iete.lead@piet.ac.in',
      instagram: 'https://instagram.com/iete_piet',
    },
  },
  {
    id: 'mechatron-club',
    name: 'Mechatron Club',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/mechatron.png',
    brief: 'Learn by building. Mechatron is a hands-on technical community exploring Robotics, AI, VR, Automation, Embedded Systems and Computer Vision.',
    fullDesc: 'Combines mechanical, electronics, and software engineering. Students build robots, VR experiences, automated machines, and computer vision projects.',
    captain: {
      name: 'Navya Sharma',
      role: 'Captain',
      image: '/captains/mechatron.jpeg',
      email: 'mechatron.lead@piet.ac.in',
      instagram: 'https://www.instagram.com/mechatron.piet?igsh=OTBhdnYxczNyb28x',
    },
  },
  {
    id: 'yi-club',
    name: 'Young Indians (Yi)',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/yi.png',
    brief: 'A platform for young minds to explore leadership, entrepreneurship, innovation and social impact in partnership with CII.',
    fullDesc: 'Yi brings together students to explore leadership, innovation, and social impact through industry interactions, national summits, and youth summits.',
    captain: {
      name: 'Pranjal Sharma',
      role: 'Captain',
      image: '/captains/yi.jpeg',
      email: 'yi.lead@piet.ac.in',
      instagram: 'https://instagram.com/yi_piet',
    },
  },
  {
    id: 'iks-club',
    name: 'Indian Knowledge System',
    category: 'CULTURAL',
    badgeClass: 'page-card__pill--blue',
    logo: '/clubs/iks.jpeg',
    brief: 'A space to explore India’s rich knowledge, traditions, sciences and cultural heritage, while connecting ancient wisdom with modern learning.',
    fullDesc: 'IKS explores traditional Indian sciences, architecture, philosophy, and arts, connecting ancient insights with modern engineering and sustainability.',
    captain: {
      name: 'Ojasva Dixit',
      role: 'Captain',
      image: '/captains/iks.jpeg',
      email: 'iks.lead@piet.ac.in',
      instagram: 'https://instagram.com/iks_piet',
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

            {/* HERO 3D ROTATING CARD STACK */}
            <div className="council-rotator-wrap">
              <div className="rotator-card">
                <div className="rotator-card__content">
                  <img src="/council/1.jpeg" alt="Council 1" className="rotator-card__logo" />
                </div>
              </div>
              <div className="rotator-card">
                <div className="rotator-card__content">
                  <img src="/council/2.jpeg" alt="Council 2" className="rotator-card__logo" />
                </div>
              </div>
              <div className="rotator-card">
                <div className="rotator-card__content">
                  <img src="/council/3.jpeg" alt="Council 3" className="rotator-card__logo" />
                </div>
              </div>
            </div>

            <p className="page-lead" style={{ marginTop: '1rem' }}>
              Explore campus student clubs, executive boards, and meet the captains leading Pehla Kadam 2026.
            </p>

            {/* EXECUTIVE BOARD CHAIR & CO-CHAIRS (Scroll Fan Expansion Animation) */}
            <div className="exec-board-section">
              <span className="page-card__pill page-card__pill--blue">EXECUTIVE BOARD</span>
              <h2 className="page-card__title" style={{ marginTop: '0.6rem', fontSize: '1.6rem' }}>CHAIR &amp; CO-CHAIRPERSONS</h2>

              <motion.div
                className="exec-board-container"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
              >
                {EXECUTIVE_LEADS.map((lead, idx) => (
                  <motion.div
                    key={lead.id}
                    className="exec-glass-card"
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 40,
                        rotate: lead.initRotate,
                        x: lead.initX,
                        scale: 0.92,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        rotate: lead.targetRotate,
                        x: lead.targetX,
                        scale: 1,
                        transition: {
                          type: 'spring',
                          stiffness: 220,
                          damping: 22,
                          delay: idx * 0.12,
                        },
                      },
                    }}
                    whileHover={{
                      rotate: 0,
                      scale: 1.05,
                      y: -10,
                      transition: { type: 'spring', stiffness: 350, damping: 20 },
                    }}
                  >
                    <div className="exec-avatar-frame">
                      <img src={lead.image} alt={lead.name} className="exec-avatar-img" />
                    </div>
                    <span className="exec-role">{lead.role}</span>
                    <h3 className="exec-name">{lead.name}</h3>
                    <p className="exec-bio">{lead.bio}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
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

            {/* BACK TO ABOUT PILL BUTTON AT BOTTOM OF PAGE */}
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

              {/* CAPTAIN PROFILE CARD */}
              <div className="captain-card">
                <div className="captain-avatar-frame">
                  <img
                    src={activeClub.captain.image}
                    alt={activeClub.captain.name}
                    className="captain-avatar-img"
                    onError={(e) => {
                      e.target.src = '/Logo.svg'
                    }}
                  />
                </div>
                <div className="captain-info">
                  <span className="captain-role">{activeClub.captain.role}</span>
                  <h3 className="captain-name">{activeClub.captain.name}</h3>
                  <p className="captain-bio">{activeClub.captain.bio}</p>

                  {/* CAPTAIN INSTAGRAM & EMAIL SOCIAL LINKS */}
                  <div className="captain-social-bar">
                    <a
                      href={activeClub.captain.instagram || 'https://instagram.com/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="captain-social-link captain-social-link--insta"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      <span>INSTAGRAM</span>
                    </a>

                    <a
                      href={`mailto:${activeClub.captain.email}`}
                      className="captain-social-link captain-social-link--email"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <span>EMAIL</span>
                    </a>
                  </div>
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
