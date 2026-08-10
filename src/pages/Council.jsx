import { useState, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import BlurredBackground from '../components/BlurredBackground'
import RevealOnScroll from '../components/RevealOnScroll'
import InteractiveSparkles from '../components/InteractiveSparkles'
import ExecutiveStackedDeck from '../components/ExecutiveStackedDeck'
import './Page.css'

const CATEGORIES = ['ALL', 'TECHNICAL', 'CULTURAL', 'COMMUNITY', 'MEDIA & PUB', 'ATHLETICS']

const CLUBS_DATA = [
  {
    id: 'acm',
    name: 'ACM',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786032846/CLUB-removebg-preview_zv2th3.png',
    brief: 'A community for students interested in computer science, coding, open source, technical events and developing real-world problem-solving skills.',
    fullDesc: 'The ACM Club is a community for students passionate about computing, programming and technology. Through coding sessions, workshops, competitions, hackathons and collaborative projects, members strengthen their technical and problem-solving skills while exploring new areas of computing. ',
    captain: {
      name: 'Khyati Arora',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786034898/IMG-20260806-WA0011.jpg_bzrkua.jpg',
      email: 'acm@poornima.org',
      instagram: 'https://www.instagram.com/acm.chapter_piet',
    },
  },
  {
    id: 'aws',
    name: 'AWS Club',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030621/aws_lzcckr.png',
    brief: 'Get hands-on with cloud computing through AWS workshops, projects and collaborative learning — with a focus on real-world skills and opportunities.',
    fullDesc: 'If cloud computing interests you, this is another place to explore it. From Buzz the Cloud to a Tech Escape Room and UI Sprint, the club mixes learning with hands-on challenges and experimentation.',
    captain: {
      name: 'Aarya Maheshwari',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786349669/copy_of_img_0827_utn3wk.heic',
      email: 'aws@poornima.org',
      instagram: 'https://instagram.com/aws.piet',
    },
  },
  {
    id: 'Debug-Club',
    name: 'The Debug Club',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030615/debug_fcig0h.png',
    brief: 'For coders and problem-solvers who enjoy DSA, coding contests, hackathons, and figuring out why their code decided to stop working.',
    fullDesc: "Programming, web development, DSA — all under one roof. Students explore backend development, cloud computing, cybersecurity and Linux through activities all year.",
    captain: {
      name: 'Ayush Sharma',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030735/debug_pbnxyn.jpg',
      email: 'debugclub@poornima.org',
      instagram: 'https://instagram.com/debugclub',
    },
  },
  {
    id: 'cyborgs-club',
    name: 'The Cyborgs',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030619/cyborgs_e8k8z0.png',
    brief: 'Explore AI, automation and modern software development through workshops, projects and hands-on experimentation.',
    fullDesc: 'AI, Machine Learning, Web Development, Python, Automation, and UI/UX. Cyborgs brings together students who want to explore technology beyond the classroom — from their first line of code to real-world projects and workshops.',
    captain: {
      name: 'Divyansh Dua',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030736/cyborgs_srelkc.jpg',
      email: 'cyborgs.lead@piet.ac.in',
      instagram: 'https://instagram.com/cyborgs_piet',
    },
  },
  {
    id: 'iste-club',
    name: 'ISTE',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030618/iste_olbreq.png',
    brief: 'Discover emerging technologies, work on innovative projects and develop technical and professional skills through workshops and competitions.',
    fullDesc: 'The ISTE Club provides students with a platform to explore engineering, technology and innovation beyond the classroom. Through workshops, technical sessions, competitions and hands-on projects, members develop practical skills, problem-solving abilities and industry awareness while working together on new ideas. ',
    captain: {
      name: 'Ananya Gupta',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786255831/WhatsApp_Image_2026-08-09_at_11.37.42_ip7teo.jpg',
      email: 'iste@poornima.org',
      instagram: 'https://www.instagram.com/iste_piet',
    },
  },
  {
    id: 'ieee-club',
    name: 'IEEE',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030617/ieee_q3lp7j.png',
    brief: 'A space to explore technology beyond the classroom through workshops, hands-on sessions, industry interaction and innovative projects.',
    fullDesc: 'IEEE student branch brings international tech standards, research paper workshops, hardware design sessions, and global network connections to campus.',
    captain: {
      name: 'Kartik Khurana',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030735/ieee_fjtm9w.jpg',
      email: 'ieee@poornima.org',
      instagram: 'https://www.instagram.com/ieee.piet',
    },
  },
  {
    id: 'mlsa-club',
    name: 'MLSA',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030615/mlsa_tmarii.png',
    brief: 'Learn and build with Microsoft technologies, from web development and AI/ML to cloud computing, Azure and GitHub.',
    fullDesc: 'The Microsoft Learn Student Ambassadors community gives students opportunities to develop technical and leadership skills, connect with professionals and access Microsoft resources.',
    captain: {
      name: 'Satyendra Singh',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030733/mlsa_o3r35x.jpg',
      email: 'mlsa.lead@piet.ac.in',
      instagram: 'https://instagram.com/mlsa_piet',
    },
  },
  {
    id: 'inventive-club',
    name: 'Inventive Club',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030620/inventive_qfguxl.png',
    brief: 'Got an idea? Turn it into something real. Inventive encourages students to build prototypes, explore startups and solve real-world problems.',
    fullDesc: 'This is where ideas move beyond the "what if" stage. Inventive brings students together around technology, engineering, creative problem-solving and realistic projects.',
    captain: {
      name: 'Yash Raj Sodha',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030740/inventive_djbwqp.jpg',
      email: 'inventive.club@poornima.org',
      instagram: 'https://www.instagram.com/inventiveclubpiet',
    },
  },
  {
    id: 'udaan-club',
    name: 'Udaan Aeromodelling Club',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030620/udaan_irikfo.png',
    brief: 'Build, experiment and fly. Udaan gives students hands-on experience with RC planes, gliders and hovercrafts while exploring aerodynamics and design.',
    fullDesc: 'Hands-on exposure to RC aircraft, gliders, aircraft design and construction, with students participating in project exhibitions, competitions and flight expos.',
    captain: {
      name: 'Lakshy Parmar',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030741/udaan_bunlow.jpg',
      email: 'udaan@poornima.org',
      instagram: 'https://www.instagram.com/udaan_aeromodelling_club?igsh=ZmQ1cG40bHJuZDNl',
    },
  },
  {
    id: 'vibrant-vision-club',
    name: 'Vibrant Vision',
    category: 'CULTURAL',
    badgeClass: 'page-card__pill--blue',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030619/vibrant_vision_uokd2w.png',
    brief: 'A creative space for art, craft, design and social awareness — with activities ranging from Art for a Cause and Diya Decoration to miniature art.',
    fullDesc: 'Vibrant Vision celebrates visual arts, handicrafts, poster design, installation art, and creative expressions across campus events.',
    captain: {
      name: 'Tarushi Khandelwal',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030739/vibrant-vision_nndfpa.jpg',
      email: 'vibrant@poornima.org',
      instagram: 'https://instagram.com/vibrantvision.piet',
    },
  },
  {
    id: 'dk-club',
    name: 'Desi Kalakaarz',
    category: 'CULTURAL',
    badgeClass: 'page-card__pill--blue',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030619/dk_ciybih.png',
    brief: 'For dancers, singers and performers who want to explore classical, folk and Western arts and take the stage at college events.',
    fullDesc: 'Dance, music, performances and cultural expression. A space for students to learn, collaborate and perform alongside people who share the same passion.',
    captain: {
      name: 'Mahika Khanna',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030730/dk_elfvuo.jpg',
      email: 'desikalakar@poornima.org',
      instagram: 'https://www.instagram.com/kalakarzz',
    },
  },
  {
    id: 'jdc-club',
    name: 'Joshiley Drama Club',
    category: 'CULTURAL',
    badgeClass: 'page-card__pill--blue',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030617/jdc_fhzx8y.png',
    brief: 'For people who love stories and are not afraid of a stage. Explore acting, scriptwriting, direction, plays and Nukkad Nataks.',
    fullDesc: 'Joshiley Drama Club provides students a platform to explore theatre, street plays (Nukkad Natak), scriptwriting, and full-length stage productions.',
    captain: {
      name: 'Shriyam Tailong',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030732/jdc_wgw27u.jpg',
      email: 'joshileydrama@poornima.org',
      instagram: 'https://www.instagram.com/joshileydramaclub',
    },
  },
  {
    id: 'spic-macay-club',
    name: 'Spic Macay Club',
    category: 'CULTURAL',
    badgeClass: 'page-card__pill--blue',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030618/spic_macay_shpzzk.png',
    brief: 'Experience India\'s rich cultural heritage through classical music, dance, workshops, performances and interactions with renowned artists.',
    fullDesc: 'SPIC MACAY gives students opportunities to experience Indian classical music, dance, theatre and traditional arts featuring interactions with accomplished national artists.',
    captain: {
      name: 'Himanshu Soni',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030728/spic_y1nczb.jpg',
      email: 'spicmacay.lead@piet.ac.in',
      instagram: 'https://instagram.com/spicmacay_piet',
    },
  },
  {
    id: 'literary',
    name: 'Literary Club',
    category: 'MEDIA & PUB',
    badgeClass: 'page-card__pill--blue',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030616/literary_fhk5iq.png',
    brief: 'For readers, writers and people who always have something to say — with debates, poetry, storytelling, writing competitions and public speaking.',
    fullDesc: 'Poetry, storytelling, debates, extempore, MUNs, and public speaking. The Literary Club gives students opportunities to develop writing, communication and stage confidence.',
    captain: {
      name: 'Kanupriya Sharma',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030738/literary_jzyms4.jpg',
      email: 'literaryclub.piet@poornima.org',
      instagram: 'https://instagram.com/literary_club_piet',
    },
  },
  {
    id: 'sports-fitness-club',
    name: 'Sports Club',
    category: 'ATHLETICS',
    badgeClass: 'page-card__pill--blue',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030620/nitish_jutvim.png',
    brief: 'Because college shouldn\'t happen entirely behind a desk. Coordinates college-level sporting activities and teams across volleyball, cricket, basketball and table tennis.',
    fullDesc: 'The Sports & Athletics Club manages campus tournaments for cricket, football, basketball, badminton, and esports. We train student athletes for state and national inter-college championships.',
    captain: {
      name: 'Nitish Sharma',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030739/sports_ip3acw.png',
      email: 'sports@poornima.org',
      instagram: 'https://instagram.com/sports.piet',
    },
  },
  {
    id: 'perfect-pixel-club',
    name: 'Perfect Pixels',
    category: 'MEDIA & PUB',
    badgeClass: 'page-card__pill--blue',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030618/perfect_pixels_powh90.png',
    brief: 'Capture campus life through photography, videography and visual storytelling while learning editing, content creation and filmmaking.',
    fullDesc: 'Perfect Pixels explores photography, cinematography, filmmaking, social media, and digital content creation, including photo walks and campus coverage.',
    captain: {
      name: 'Anshul Sharma',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786348542/WhatsApp_Image_2026-08-10_at_13.23.15_dmt908.jpg',
      email: 'pixels.lead@piet.ac.in',
      instagram: 'https://instagram.com/perfectpixels_piet',
    },
  },
  {
    id: 'social-welfare-club',
    name: 'NSS',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030616/nss_trfmvg.png',
    brief: 'Get involved beyond campus through cleanliness drives, educational outreach, awareness campaigns and community service initiatives.',
    fullDesc: 'The NSS Club encourages students to engage with society through community service, awareness drives, volunteering and social initiatives. It helps creating opportunities to contribute to the community. ',
    captain: {
      name: 'Vaibhav Sharma',
      role: 'Captain',
      image: ' https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030739/nss_ypirh6.jpg',
      email: 'nss.piet@poornima.org',
      instagram: 'https://www.instagram.com/nss.pietjaipur',
     },
  },
  {
    id: 'origin-club',
    name: 'Origin Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030618/origin_s8ysci.png',
    brief: 'A graphic design community where creativity meets technology through design workshops, competitions and collaborative projects.',
    fullDesc: 'Drawing, painting, sculpture, crafting, graphic design, audio and video editing — a creative space to explore digital design tools.',
    captain: {
      name: 'Shalini Choudhary',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030745/origin_pz58nc.jpg',
      email: 'origin.lead@piet.ac.in',
      instagram: 'https://instagram.com/origin_piet',
    },
  },
  {
    id: 'indgenius-club',
    name: 'INDGenius Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030615/indgenius_tou3il.png',
    brief: 'Connect with a wider student network through leadership, internships, opportunities and discussions around India\'s growth and development.',
    fullDesc: 'A mix of innovation, leadership, discussion, technical activities and social responsibility. From Youth Parliament and cloud sessions to hackathons and leadership programs.',
    captain: {
      name: 'Anushka Shekhawat',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030731/indgenius_btl0xf.jpg',
      email: 'indgenius.lead@piet.ac.in',
      instagram: 'https://instagram.com/indgenius_piet',
    },
  },
  {
    id: 'aptineus-club',
    name: 'Aptineus Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030620/aptineus_imsmjx.png',
    brief: 'Focusing on aptitude, logical reasoning, soft skills and interview prep to help students excel in placement drives and competitive exams.',
    fullDesc: 'The Aptineus Club focuses on developing students\' aptitude, logical reasoning, communication and problem-solving skills through interactive activities, challenges and learning sessions. It helps students build confidence and prepare for academic, competitive and professional opportunities. ',
    captain: {
      name: 'Harsh Yadav',
      role: 'Aptitude & Training Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030737/aptineus_tpnrc1.jpg',
      email: 'aptineusclub@poornima.org',
      instagram: 'https://instagram.com/aptineus_club',
    },
  },
  {
    id: 'graduate-gateway-club',
    name: 'Graduate Gateway',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030616/graduate_gateway_b9ht3x.png',
    brief: 'Focuses on higher education, competitive examinations and career pathways through sessions such as CAT and UPSC guidance and aptitude activities.',
    fullDesc: 'Graduate Gateway assists students aspiring for GATE, CAT, GRE, UPSC, and higher studies abroad with mentorship sessions and resource libraries.',
    captain: {
      name: 'Rishabh Nandi',
      role: 'Captain',
      email: 'gateway.lead@piet.ac.in',
      instagram: 'https://instagram.com/gradgateway_piet',
    },
  },
  {
    id: 'esports-club',
    name: 'Esports Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030616/esports_yloquf.png',
    brief: 'For competitive gamers who enjoy tournaments, strategy and teamwork — with opportunities to explore game development too.',
    fullDesc: 'Brings students together for gaming tournaments, Valorant leagues, BGMI cups, and game design sessions with College Rivals.',
    captain: {
      name: 'Gajendra Singh',
      role: 'Gaming Tournament Director',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030742/esports_hi07wd.jpg',
      email: 'esports.lead@piet.ac.in',
      instagram: 'https://instagram.com/esports_piet',
    },
  },
  {
    id: 'pbic-club',
    name: 'PBIC Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030617/pbic_ntcoc0.png',
    brief: 'Got a startup idea? PBIC helps students explore entrepreneurship, develop business plans and pitch their ideas to incubators.',
    fullDesc: 'The Poornima Business Incubation Centre (PBIC) provides students with a platform to explore entrepreneurship, innovation and startup ideas. It helps students develop their ideas, understand the business side of innovation, work with teams and take their concepts closer to becoming real ventures. ',
    captain: {
      name: 'Dev Pratap Singh Rathore',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030732/pbic_qwizmi.jpg',
      email: 'pbic.lead@piet.ac.in',
      instagram: 'https://instagram.com/pbic_piet',
    },
  },
  {
    id: 'helping-hands-club',
    name: 'Happy Hive',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786206898/HAPPY_HIVE_LOGO_pxk2hp.png',
    brief: 'A student-led community focused on giving back through blood donation, donation drives, awareness activities and community service.',
    fullDesc: 'Focused on community support, essential resource distribution, and educational empowerment initiatives such as blood donation and Vastradaan drives.',
    captain: {
      name: 'Aditya Agarwal',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030738/helping-hands_xtaz4s.jpg',
      email: 'helpinghands.lead@piet.ac.in',
      instagram: 'https://instagram.com/helpinghands_piet',
    },
  },
  {
    id: 'wise-club',
    name: 'WISE Club',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030619/wise_ff4lnl.png',
    brief: 'Supporting women pursuing careers in science and engineering through discussions, educational initiatives, career development and hackathons.',
    fullDesc: 'Women in Science & Engineering (WISE) empowers female engineers through technical hackathons, leadership seminars, and career mentorship.',
    captain: {
      name: 'Anisha Agarwal',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786039874/wise_kd755w.jpg',
      email: 'wise@poornima.org',
      instagram: 'https://instagram.com/wise.piet_',
    },
  },
  {
    id: 'iete-club',
    name: 'IETE Club',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030622/iete_dcbigt.jpg',
    brief: 'A community for students passionate about electronics, telecommunication and technology. Learn through hands-on experiences and build new skills.',
    fullDesc: 'IETE Student Forum provides a space for electronics, telecom, and IoT enthusiasts to explore hardware design, PCB etching, and embedded systems.',
    captain: {
      name: 'Aarohi Jalan',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786037559/iete1_ytdqcw.jpg',
      email: 'piet.ietechapter@poornima.org',
      instagram: 'https://instagram.com/iete.piet_jaipur',
    },
  },
  {
    id: 'mechatron-club',
    name: 'Mechatron Club',
    category: 'TECHNICAL',
    badgeClass: 'page-card__pill--amber',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030622/mechatron_hnnk0a.png',
    brief: 'Learn by building. Mechatron is a hands-on technical community exploring Robotics, AI, VR, Automation, Embedded Systems and Computer Vision.',
    fullDesc: 'Combines mechanical, electronics, and software engineering. Students build robots, VR experiences, automated machines, and computer vision projects.',
    captain: {
      name: 'Navya Sharma',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030736/mechatron_uyj2gy.jpg',
      email: 'mechatron.lead@piet.ac.in',
      instagram: 'https://www.instagram.com/mechatron.piet?igsh=OTBhdnYxczNyb28x',
    },
  },
  {
    id: 'yi-club',
    name: 'Young Indians (Yi)',
    category: 'COMMUNITY',
    badgeClass: 'page-card__pill--blue',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030620/yi_kaeget.png',
    brief: 'A platform for young minds to explore leadership, entrepreneurship, innovation and social impact in partnership with CII.',
    fullDesc: 'Yi brings together students to explore leadership, innovation, and social impact through industry interactions, national summits, and youth summits.',
    captain: {
      name: 'Pranjal Sharma',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030732/yi_zyaowr.jpg',
      email: 'yi.lead@piet.ac.in',
      instagram: 'https://instagram.com/yi_piet',
    },
  },
  {
    id: 'iks-club',
    name: 'Indian Knowledge System',
    category: 'CULTURAL',
    badgeClass: 'page-card__pill--blue',
    logo: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030621/iks_vta6fp.jpg',
    brief: 'A space to explore India’s rich knowledge, traditions, sciences and cultural heritage, while connecting ancient wisdom with modern learning.',
    fullDesc: 'IKS explores traditional Indian sciences, architecture, philosophy, and arts, connecting ancient insights with modern engineering and sustainability.',
    captain: {
      name: 'Ojasva Dixit',
      role: 'Captain',
      image: 'https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030731/iks_ejnw8s.jpg',
      email: 'iks.lead@piet.ac.in',
      instagram: 'https://instagram.com/iks_piet',
    },
  },
]

function Council() {
  const scrollRef = useRef(null)
  const navigate = useNavigate()
  const [activeClub, setActiveClub] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  const filteredClubs = useMemo(() => {
    if (selectedCategory === 'ALL') return CLUBS_DATA
    return CLUBS_DATA.filter((club) => club.category === selectedCategory)
  }, [selectedCategory])

  const categoryCounts = useMemo(() => {
    const counts = { ALL: CLUBS_DATA.length }
    CLUBS_DATA.forEach((club) => {
      counts[club.category] = (counts[club.category] || 0) + 1
    })
    return counts
  }, [])

  return (
    <article className="page">
      <BlurredBackground src="https://res.cloudinary.com/vbqcwa7d/image/upload/v1786031295/page_rx5cr9.png" scrollContainerRef={scrollRef} />

      <div className="page-scroll" ref={scrollRef}>
        {/* TOP LOGOS BAR (Left: /piet.png | Right: /Logo.svg) with Framer Motion */}
        <motion.div
          className="top-logos-bar"
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="top-logo-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="https://res.cloudinary.com/vbqcwa7d/image/upload/v1786031296/piet_ppyo4j.png" alt="PIET Logo" className="top-logo-img--left" />
          </motion.div>
          <motion.div
            className="top-logo-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="https://res.cloudinary.com/vbqcwa7d/image/upload/v1786031295/Logo_mieuoo.svg" alt="ACM Logo" className="top-logo-img--right" />
          </motion.div>
        </motion.div>

        {/* HERO HEADER */}
        <header className="page-hero">
          <InteractiveSparkles />

          <div className="page-hero__inner">

            <motion.h1
              className="page-welcome__line"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              STUDENT COUNCIL
            </motion.h1>

            {/* HERO 3D ROTATING CARD STACK WITH FLOAT ANIMATION */}
            <motion.div
              className="council-rotator-wrap"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="rotator-card">
                <div className="rotator-card__content">
                  <img src="https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030705/1_hr48vj.jpg" alt="Council 1" className="rotator-card__logo" />
                </div>
              </div>
              <div className="rotator-card">
                <div className="rotator-card__content">
                  <img src="https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030703/2_l8xocy.jpg" alt="Council 2" className="rotator-card__logo" />
                </div>
              </div>
              <div className="rotator-card">
                <div className="rotator-card__content">
                  <img src="https://res.cloudinary.com/vbqcwa7d/image/upload/v1786030705/3_varr61.jpg" alt="Council 3" className="rotator-card__logo" />
                </div>
              </div>
            </motion.div>

            <motion.p
              className="page-lead"
              style={{ marginTop: '1rem' }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              Explore campus student clubs, executive boards, and meet the captains leading Pehla Kadam 2026.
            </motion.p>

            {/* EXECUTIVE BOARD CHAIR & CO-CHAIRS (Stacked Deck with Auto Switching) */}
            <motion.div
              className="exec-board-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <span className="page-card__pill page-card__pill--blue">EXECUTIVE BOARD</span>
              <h2 className="page-card__title" style={{ marginTop: '0.6rem', fontSize: '1.6rem' }}>CHAIR &amp; CO-CHAIRS</h2>
              <ExecutiveStackedDeck />
            </motion.div>
          </div>

          {/* Animated Scroll Cue Footer */}
          <div className="page-hero__footer">
            <motion.div
              className="page-scroll-cue"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
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

        {/* CLUBS GRID SECTION WITH ANIMATED CATEGORY TABS */}
        <section className="page-content-wrap">
          <div className="page-content">
            <RevealOnScroll scrollContainerRef={scrollRef}>
              <div className="clubs-section-header">
                <span className="page-card__pill page-card__pill--amber">CAMPUS CLUBS</span>
                <h2 className="page-card__title" style={{ marginTop: '0.75rem' }}>EXPLORE 29 CAMPUS CLUBS</h2>
              </div>

              {/* Animated Category Filter Pills */}
              <div className="club-filter-tabs">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat
                  return (
                    <motion.button
                      key={cat}
                      type="button"
                      className={`club-filter-btn ${isActive ? 'is-active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.94 }}
                      layout
                    >
                      <span>{cat}</span>
                      <span className="club-filter-btn__count">
                        {categoryCounts[cat] || 0}
                      </span>
                    </motion.button>
                  )
                })}
              </div>

              {/* Filterable Club Tiles Grid with Shared Expandable Layout Animations */}
              <motion.div className="clubs-grid" layout>
                <AnimatePresence mode="popLayout">
                  {filteredClubs.map((club) => (
                    <motion.div
                      key={club.id}
                      layoutId={`expandable-card-${club.id}`}
                      className="club-tile"
                      onClick={() => setActiveClub(club)}
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 28,
                      }}
                      whileHover={{ scale: 1.025, y: -3 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <div className="club-tile__header">
                        <motion.div className="club-tile__logo-wrap" layoutId={`expandable-logo-${club.id}`}>
                          <img src={club.logo} alt={`${club.name} Logo`} className="club-tile__logo-img" />
                        </motion.div>
                        <motion.span layoutId={`expandable-pill-${club.id}`} className={`page-card__pill ${club.badgeClass}`}>
                          {club.category}
                        </motion.span>
                      </div>

                      <div>
                        <motion.h3 layoutId={`expandable-title-${club.id}`} className="club-tile__title">{club.name}</motion.h3>
                        <p className="club-tile__brief">{club.brief}</p>
                      </div>

                      <div className="club-tile__action">
                        <span>VIEW CLUB &amp; CAPTAIN</span>
                        <span className="club-tile__action-arrow">→</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </RevealOnScroll>

            {/* BACK TO ABOUT PILL BUTTON WITH TAP ANIMATION */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem', marginBottom: '1.5rem' }}>
              <motion.button
                type="button"
                className="page-swipe-hint"
                onClick={() => navigate('/about')}
                aria-label="Back to About page"
                whileHover={{ scale: 1.04, x: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="page-swipe-hint__arrow">←</span>
                <span>BACK TO ABOUT</span>
              </motion.button>
            </div>
          </div>
        </section>
      </div>

      {/* EXPANDABLE PROFILE CARD MODAL OVERLAY */}
      <AnimatePresence>
        {activeClub && (
          <motion.div
            className="club-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveClub(null)}
          >
            <motion.div
              layoutId={`expandable-card-${activeClub.id}`}
              className="club-modal-container"
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                type="button"
                className="club-modal__close-btn"
                onClick={() => setActiveClub(null)}
                aria-label="Close modal"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>

              <div className="club-tile__header" style={{ marginBottom: '1rem' }}>
                <motion.div className="club-tile__logo-wrap" layoutId={`expandable-logo-${activeClub.id}`} style={{ width: '4rem', height: '4rem' }}>
                  <img src={activeClub.logo} alt={activeClub.name} className="club-tile__logo-img" />
                </motion.div>
                <motion.span layoutId={`expandable-pill-${activeClub.id}`} className={`page-card__pill ${activeClub.badgeClass}`}>
                  {activeClub.category}
                </motion.span>
              </div>

              <motion.h2 layoutId={`expandable-title-${activeClub.id}`} className="page-card__title" style={{ fontSize: '1.8rem', textAlign: 'left', marginBottom: '0.75rem' }}>
                {activeClub.name}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: 0.12, duration: 0.22 }}
              >
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
                    {activeClub.captain.bio && <p className="captain-bio">{activeClub.captain.bio}</p>}

                    {/* CAPTAIN INSTAGRAM & EMAIL SOCIAL LINKS */}
                    <div className="captain-social-bar">
                      <motion.a
                        href={activeClub.captain.instagram || 'https://instagram.com/'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="captain-social-link captain-social-link--insta"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.94 }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                        <span>INSTAGRAM</span>
                      </motion.a>

                      <motion.a
                        href={`mailto:${activeClub.captain.email}`}
                        className="captain-social-link captain-social-link--email"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.94 }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <span>EMAIL</span>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

export default Council

