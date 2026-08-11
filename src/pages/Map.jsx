import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapContainer, ImageOverlay, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import { CRS } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import BlurredBackground from '../components/BlurredBackground'
import RevealOnScroll from '../components/RevealOnScroll'
import InteractiveSparkles from '../components/InteractiveSparkles'
import './Page.css'

// High-resolution map image dimensions (public/campusMap.png)
const IMAGE_WIDTH = 4960
const IMAGE_HEIGHT = 7016
const bounds = [[0, 0], [IMAGE_HEIGHT, IMAGE_WIDTH]]

// Category filter definitions
const CATEGORIES = [
  { id: 'ALL', label: 'ALL LOCATIONS', icon: '📍' },
  { id: 'ACADEMICS', label: 'ACADEMICS', icon: '🏛️' },
  { id: 'AUDITORIUMS', label: 'AUDITORIUMS', icon: '🎭' },
  { id: 'LIBRARIES', label: 'LIBRARIES', icon: '📚' },
  { id: 'DINING', label: 'DINING & CAFES', icon: '☕' },
  { id: 'SPORTS', label: 'SPORTS & ARENA', icon: '🏆' },
]

// Campus locations with categories, positions, and custom colors
const BUILDINGS = [
  {
    id: 1,
    name: 'Main Academic Block (PIET)',
    category: 'ACADEMICS',
    position: [5065, 1458],
    info: 'Central Administrative Offices, Dean Office, CSE & AI Labs',
    iconEmoji: '🏫',
    color: '#2563eb', // Cobalt Blue
  },
  {
    id: 2,
    name: 'The Dome',
    category: 'AUDITORIUMS',
    position: [3335, 3896],
    info: 'Main auditorium & dome for Pehla Kadam 2026 Orientation Events',
    iconEmoji: '🎭',
    color: '#d97706', // Amber Gold
  },
  {
    id: 3,
    name: 'PIET Central Library',
    category: 'LIBRARIES',
    position: [4795, 2595],
    info: 'Open 8:00 AM – 5:00 PM | Quiet Study Zones & E-Resources',
    iconEmoji: '📚',
    color: '#4f46e5', // Deep Indigo
  },
  {
    id: 4,
    name: 'PIET Canteen',
    category: 'DINING',
    position: [2761, 2637],
    info: 'Food Court, Refreshments',
    iconEmoji: '☕',
    color: '#059669', // Emerald Green
  },
  {
    id: 5,
    name: 'Volleyball & Sports Court',
    category: 'SPORTS',
    position: [1576, 2637],
    info: 'Sports & Outdoor Athletics Ground',
    iconEmoji: '🏀',
    color: '#7c3aed', // Purple
  },
  {
    id: 6,
    name: '24/7 Open Study Library',
    category: 'LIBRARIES',
    position: [2236, 1063],
    info: 'Secondary Library & 24 Hours Quiet Study Hall',
    iconEmoji: '📚',
    color: '#4f46e5', // Deep Indigo
  },
]

// Custom DivIcon marker generator with colored dot & SVG building icon
const createCampusPin = (category = 'ACADEMICS', color = '#2563eb', isSelected = false) => {
  let svgPath = ''
  if (category === 'ACADEMICS') {
    svgPath = `<path d="M2 22h20V10L12 2 2 10v12zm4-10h3v8H6v-8zm5 0h3v8h-3v-8zm5 0h3v8h-3v-8z"/>`
  } else if (category === 'AUDITORIUMS') {
    svgPath = `<path d="M12 2L2 7l10 5 10-5-10-5zm0 8.5L4.5 7.5 12 4l7.5 3.5L12 10.5zM2 17l10 5 10-5v-3l-10 5-10-5v3z"/>`
  } else if (category === 'LIBRARIES') {
    svgPath = `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/>`
  } else if (category === 'DINING') {
    svgPath = `<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>`
  } else if (category === 'SPORTS') {
    svgPath = `<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M12 15a7 7 0 0 0 7-7V3H5v5a7 7 0 0 0 7 7z"/>`
  } else {
    svgPath = `<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>`
  }

  return L.divIcon({
    className: 'custom-campus-marker-wrapper',
    html: `
      <div class="custom-marker ${isSelected ? 'custom-marker--selected' : ''}" style="--marker-color: ${color};">
        <div class="custom-marker__dot"></div>
        <div class="custom-marker__badge">
          <svg class="custom-marker__svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${svgPath}
          </svg>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -22],
  })
}

// Set to true when you want to pick coordinates, or false for production view
const ENABLE_CLICK_LOGGER = false

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

function MapController({ bounds }) {
  const map = useMap()
  useEffect(() => {
    if (map && bounds) {
      map.fitBounds(bounds, { padding: [12, 12] })
    }
  }, [map, bounds])
  return null
}

// Controller component to smoothly pan map to selected building without changing zoom scale
function MapPanController({ panTarget }) {
  const map = useMap()
  useEffect(() => {
    if (map && panTarget) {
      map.panTo(panTarget.position, {
        animate: true,
        duration: 0.8,
      })
    }
  }, [map, panTarget])
  return null
}

function Map() {
  const scrollRef = useRef(null)
  const navigate = useNavigate()
  const markerRefs = useRef({})

  const [activeCategory, setActiveCategory] = useState('ALL')
  const [selectedBuildingId, setSelectedBuildingId] = useState(null)
  const [panTarget, setPanTarget] = useState(null)

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

  // Filter buildings by category
  const filteredBuildings = BUILDINGS.filter((b) => {
    return activeCategory === 'ALL' || b.category === activeCategory
  })

  // Select building from mobile drawer and pan map without changing zoom level
  const handleSelectBuilding = (building) => {
    setSelectedBuildingId(building.id)
    setPanTarget({ position: building.position, time: Date.now() })
    if (markerRefs.current[building.id]) {
      markerRefs.current[building.id].openPopup()
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
        <section className="page-content-wrap" style={{ paddingBlock: 'clamp(5rem, 12vw, 6.5rem) 3rem' }}>
          <div className="page-content" style={{ maxWidth: '1280px' }}>
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

              {/* CATEGORY FILTER PILLS BAR */}
              <div className="map-category-pills">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`map-cat-btn ${activeCategory === cat.id ? 'map-cat-btn--active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>

              {/* REACT LEAFLET MAP CONTAINER (FULL WIDTH ON DESKTOP) */}
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
                  <MapPanController panTarget={panTarget} />
                  <ImageOverlay url="/campusMap.png" bounds={bounds} />

                  {/* ClickLogger for Coordinate Selection */}
                  {ENABLE_CLICK_LOGGER && <ClickLogger onCoordClick={(coord) => setLastClickedCoord(coord)} />}

                  {/* Filtered Campus Location Markers with Custom SVG Shapes */}
                  {filteredBuildings.map((b) => (
                    <Marker
                      key={b.id}
                      ref={(el) => {
                        if (el) markerRefs.current[b.id] = el
                      }}
                      position={b.position}
                      icon={createCampusPin(b.category, b.color, selectedBuildingId === b.id)}
                      eventHandlers={{
                        click: () => {
                          setSelectedBuildingId(b.id)
                        },
                      }}
                    >
                      <Popup>
                        <div className="map-popup-title">{b.name}</div>
                        <div className="map-popup-info">{b.info}</div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>

              {/* MOBILE LOCATION DRAWER (ONLY VISIBLE ON MOBILE <960px) */}
              <div className="map-mobile-drawer">
                {filteredBuildings.map((b) => (
                  <div
                    key={b.id}
                    className={`map-building-item ${selectedBuildingId === b.id ? 'map-building-item--active' : ''}`}
                    style={{ '--item-color': b.color }}
                    onClick={() => handleSelectBuilding(b)}
                  >
                    <div className="map-building-item__icon">
                      {b.iconEmoji}
                    </div>
                    <div>
                      <div className="map-building-item__title">{b.name}</div>
                      <div className="map-building-item__desc">{b.info}</div>
                    </div>
                  </div>
                ))}
              </div>
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
