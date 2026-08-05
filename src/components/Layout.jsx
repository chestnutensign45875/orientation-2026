import { NavLink, Outlet } from 'react-router-dom'
import './Layout.css'

const navItems = [
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/map', label: 'Map' },
]

function Layout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <NavLink to="/" className="site-brand">
          Orientation 2026
        </NavLink>
        <nav className="site-nav" aria-label="Main">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'site-nav-link is-active' : 'site-nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Orientation 2026 — building in progress</p>
      </footer>
    </div>
  )
}

export default Layout
