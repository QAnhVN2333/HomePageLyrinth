import { NavLink, Outlet } from 'react-router-dom'
import { ThemeToggle } from '../features/theme/components/ThemeToggle'

export function AdminLayout() {
  return (
    <div className="layout-root admin-layout">
      <header className="topbar">
        <div className="brand">Lyrinth Admin</div>
        <div className="topbar-actions">
          <nav className="nav-links">
            <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/">
              Home
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/login">
              Login
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/admin">
              Dashboard
            </NavLink>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  )
}

