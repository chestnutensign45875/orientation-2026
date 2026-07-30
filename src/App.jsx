import { useEffect, useState } from 'react'
import './App.css'

function formatTime(date) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
}

function RocketIllustration() {
  return (
    <svg
      className="rocket-illustration"
      viewBox="0 0 280 280"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      {/* Outer soft ring */}
      <circle cx="140" cy="140" r="138" fill="#f0f4f8" />
      {/* Night sky circle */}
      <circle cx="140" cy="140" r="118" fill="#1e3a5f" />

      {/* Stars */}
      <g fill="#ffffff">
        <path d="M72 88 l4.5 9.5 10.5 1.5 -7.5 7.5 1.8 10.5L72 112l-9.3 4.9 1.8-10.5-7.5-7.5 10.5-1.5z" />
        <path d="M188 58 l3.2 6.8 7.5 1.1 -5.4 5.3 1.3 7.5L188 75l-6.6 3.5 1.3-7.5-5.4-5.3 7.5-1.1z" />
        <path d="M210 168 l2.5 5.3 5.8 0.8 -4.2 4.1 1 5.8L210 181l-5.1 2.7 1-5.8-4.2-4.1 5.8-0.8z" />
        <path d="M55 175 l2 4.2 4.6 0.7 -3.3 3.2 0.8 4.6L55 185.5l-4.1 2.1 0.8-4.6-3.3-3.2 4.6-0.7z" />
        <circle cx="160" cy="95" r="2.5" />
        <circle cx="95" cy="200" r="2" />
        <circle cx="220" cy="110" r="1.8" />
      </g>

      {/* Exhaust / clouds */}
      <ellipse cx="95" cy="195" rx="55" ry="38" fill="#f5c518" />
      <ellipse cx="55" cy="175" rx="38" ry="30" fill="#ffd84d" />
      <ellipse cx="130" cy="210" rx="42" ry="28" fill="#ffd84d" />
      <ellipse cx="80" cy="220" rx="32" ry="22" fill="#ffe066" />
      <ellipse cx="40" cy="200" rx="22" ry="16" fill="#f5c518" />

      {/* Rocket body */}
      <g transform="translate(155 55) rotate(28)">
        {/* Main body */}
        <path
          d="M40 10 C40 10 72 55 72 115 C72 145 58 165 40 175 C22 165 8 145 8 115 C8 55 40 10 40 10Z"
          fill="#e84c4c"
        />
        {/* Nose highlight */}
        <path
          d="M40 10 C40 10 58 45 62 90 C50 85 30 85 18 90 C22 45 40 10 40 10Z"
          fill="#f06a6a"
          opacity="0.45"
        />
        {/* Window */}
        <circle cx="40" cy="95" r="16" fill="#f5d9a8" />
        <circle cx="40" cy="95" r="11" fill="#fff5e0" />
        {/* Fins */}
        <path d="M8 125 L-18 155 L8 145 Z" fill="#c62828" />
        <path d="M72 125 L98 155 L72 145 Z" fill="#c62828" />
        {/* Fin inner */}
        <path d="M8 125 L-8 145 L8 140 Z" fill="#e84c4c" />
        <path d="M72 125 L88 145 L72 140 Z" fill="#e84c4c" />
        {/* Body stripe */}
        <rect x="18" y="128" width="44" height="8" rx="4" fill="#fff" opacity="0.35" />
        {/* Flame */}
        <path
          d="M28 175 Q40 210 52 175 Q40 188 28 175Z"
          fill="#ff9f1a"
        />
        <path
          d="M33 175 Q40 198 47 175 Q40 182 33 175Z"
          fill="#ffe066"
        />
      </g>
    </svg>
  )
}

function LogoMark() {
  return (
    <svg
      className="logo-mark"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="presentation"
    >
      <circle cx="24" cy="24" r="24" fill="#1e3a5f" />
      <path
        d="M14 28 L34 16 L22 32 L20 26 Z"
        fill="#e84c4c"
      />
      <path
        d="M14 28 L22 32 L20 26 Z"
        fill="#f5c518"
      />
    </svg>
  )
}

function App() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <main className="page">
      <section className="card" aria-labelledby="headline">
        <div className="card-content">
          <time className="clock" dateTime={now.toISOString()}>
            {formatTime(now)}
          </time>

          <h1 id="headline" className="headline">
            Website under
            <br />
            construction
          </h1>

          <p className="subcopy">
            Orientation 2026 is on the way. This site is being built —
            check back soon for events, the curriculum, and the campus map.
          </p>

          <div className="card-footer">
            <LogoMark />
            <span className="badge">Coming soon</span>
          </div>
        </div>

        <div className="card-visual">
          <RocketIllustration />
        </div>
      </section>
    </main>
  )
}

export default App
