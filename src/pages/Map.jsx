import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapContainer, ImageOverlay, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import { CRS } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import BlurredBackground from '../components/BlurredBackground'
import RevealOnScroll from '../components/RevealOnScroll'
import './Page.css'

// High-resolution map image dimensions rendered at 300 DPI from PDF (public/campusMap.png)
const IMAGE_WIDTH = 4960
const IMAGE_HEIGHT = 7016
const bounds = [[0, 0], [IMAGE_HEIGHT, IMAGE_WIDTH]]

// Custom Leaflet DivIcon matching campus light blue theme
const createCampusPin = (iconSymbol = '📍') => {
  return L.divIcon({
    className: 'custom-campus-marker',
    html: `
      <div class="marker-pin">
        <span class="marker-pin__inner">${iconSymbol}</span>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -32],
  })
}

// Sample initial campus locations (coordinates can be updated using ClickLogger)
const BUILDINGS = [
  {
    id: 1,
    name: 'Main Academic Block (PIET)',
    position: [4697, 1426],
    info: 'Central Administrative Offices, Dean Office, CSE & AI Labs',
    icon: '🏫',
  },
  {
    id: 2,
    name: 'The Dome',
    position: [3231, 3956],
    info: 'Main dome for Pehla Kadam 2026 Orientation Events',
    icon: '🎭',
  },
  {
    id: 3,
    name: 'PIET Central Library',
    position: [4795, 2595],
    info: 'Open 8:00 AM – 5:00 PM | Quiet Study Zones & E-Resources',
    icon: '📚',
  },
  {
    id: 4,
    name: 'PIET Canteen',
    position: [2761, 2637],
    info: 'Food Court & Refreshment',
    icon: '☕',
  },
  {
    id: 5,
    name: 'Volleyball Court',
    position: [1576, 2637],
    info: 'Sports & Athletics Ground',
    icon: '🏀',
  },
  {
    id: 6,
    name: 'Open Library',
    position: [2236, 1063],
    info: 'Secondary Library , open 24 hours',
    icon: "📚",
  }
]

// Set to true when you want to pick coordinates, or false for production view
const ENABLE_CLICK_LOGGER = false

/**
 * ClickLogger Component
 * Logs clicked [lat, lng] coordinates in console and updates UI banner for easy copying
 */
function ClickLogger({ onCoordClick }) {
  useMapEvents({
    click(e) {
      if (!ENABLE_CLICK_LOGGER) return
      const lat = Math.round(e.latlng.lat)
      const lng = Math.round(e.latlng.lng)
      console.log('Clicked Coordinates:', [lat, lng])
      if (onCoordClick) {
        onCoordClick([lat, lng])
      }
    },
  })
  return null
}

/**
 * MapController component to fit bounds automatically on mount
 */
function MapController({ bounds }) {
  const map = useMap()
  useEffect(() => {
    if (map && bounds) {
      map.fitBounds(bounds, { padding: [12, 12] })
    }
  }, [map, bounds])
  return null
}

function Map() {
  const scrollRef = useRef(null)
  const navigate = useNavigate()
  const [lastClickedCoord, setLastClickedCoord] = useState(null)
  const [copiedText, setCopiedText] = useState(false)

  const handleCopyCoord = () => {
    if (lastClickedCoord) {
      const coordStr = `[${lastClickedCoord[0]}, ${lastClickedCoord[1]}]`
      navigator.clipboard.writeText(coordStr)
      setCopiedText(true)
      setTimeout(() => setCopiedText(false), 2000)
    }
  }

  return (
    <article className="page">
      <BlurredBackground src="https://res.cloudinary.com/vbqcwa7d/image/upload/v1786031295/page_rx5cr9.png" scrollContainerRef={scrollRef} />

      <div className="page-scroll" ref={scrollRef}>
        {/* TOP LOGOS BAR (Left: piet.png | Right: Logo.svg) */}
        <div className="top-logos-bar">
          <div className="top-logo-item">
            <img src="https://res.cloudinary.com/vbqcwa7d/image/upload/v1786031296/piet_ppyo4j.png" alt="PIET Logo" className="top-logo-img--left" />
          </div>
          <div className="top-logo-item">
            <img src="https://res.cloudinary.com/vbqcwa7d/image/upload/v1786031295/Logo_mieuoo.svg" alt="ACM Logo" className="top-logo-img--right" />
          </div>
        </div>

        {/* MAP SECTION - FIRST THING USER SEES */}
        <section className="page-content-wrap" style={{ paddingBlock: 'clamp(5rem, 12vw, 7rem) 3rem' }}>
          <div className="page-content" style={{ maxWidth: '1200px' }}>
            <RevealOnScroll scrollContainerRef={scrollRef}>

              {/* CLICK LOGGER BANNER (Only visible when ENABLE_CLICK_LOGGER = true) */}
              {ENABLE_CLICK_LOGGER && lastClickedCoord && (
                <motion.div
                  className="map-coord-banner"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span>
                    📍 Last Clicked Coordinate: <strong>[{lastClickedCoord[0]}, {lastClickedCoord[1]}]</strong>
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCoord}
                    style={{
                      background: 'var(--blue)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    {copiedText ? '✓ COPIED!' : '📋 COPY COORD'}
                  </button>
                </motion.div>
              )}

              {/* REACT LEAFLET MAP CONTAINER */}
              <div className="leaflet-map-wrapper">
                <MapContainer
                  crs={CRS.Simple}
                  bounds={bounds}
                  maxBounds={bounds}
                  maxBoundsViscosity={0.5}
                  minZoom={-5}
                  maxZoom={3}
                  zoomSnap={0.25}
                  scrollWheelZoom={true}
                  style={{ height: '78vh', width: '100%' }}
                >
                  <MapController bounds={bounds} />
                  <ImageOverlay url="/campusMap.png" bounds={bounds} />

                  {/* ClickLogger for Coordinate Selection */}
                  {ENABLE_CLICK_LOGGER && <ClickLogger onCoordClick={(coord) => setLastClickedCoord(coord)} />}

                  {/* Campus Location Markers */}
                  {BUILDINGS.map((b) => (
                    <Marker key={b.id} position={b.position} icon={createCampusPin(b.icon || '📍')}>
                      <Popup>
                        <div className="map-popup-title">{b.name}</div>
                        <div className="map-popup-info">{b.info}</div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>

              {/* 
                PREVIOUS 360° VR IFRAME TOUR (COMMENTED OUT AS REQUESTED)
                <motion.div
                  className="map-iframe-wrapper"
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <iframe
                    className="map-iframe"
                    src="https://kuula.co/share/collection/7TZs8?logo=0&info=0&fs=1&vr=1&sd=1&initload=0&thumbs=1"
                    title="Poornima Campus 360 Virtual Tour"
                    allow="xr-spatial-tracking; gyroscope; accelerometer; compass; stereo; VR; fullscreen"
                    allowFullScreen
                    loading="lazy"
                  />
                </motion.div>
              */}
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
