import {Link, NavLink, Outlet} from 'react-router-dom'
import { ThemeToggle } from '../features/theme/components/ThemeToggle'
import {Icon, useScrollToHash} from "../features/util/components/util.tsx";
import {socialPlatforms, teamSocials} from "../data/siteContent.ts";

/*export function MainLayout() {
  return (
    <div className="layout-root">
      <header className="topbar">
        <div className="brand">Lyrinth</div>
        <div className="topbar-actions">
          <nav className="nav-links">
            <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/">
              Home
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/login">
              Login
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/admin">
              Admin
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
*/
export function MainLayout() {
  useScrollToHash();
  return (
      <div className="layout-root">
        <header className="topbar">
          <div className="brand">Lyrinth</div>
          <div className="topbar-actions">
            <nav className="nav-links">
              <NavLink to="/#home">Home</NavLink>
              <NavLink to="/#projects">Project</NavLink>
              <NavLink to="/#about">About</NavLink>
            </nav>
            <ThemeToggle />
          </div>
        </header>

        <main className="page-container">
          <Outlet />
        </main>
        <Footer />
      </div>
  )
}
//Footer

function Footer() {
  return (
      <footer className="footer">
        <div className="footer__content">
            <div className="contact-info">
                <h3>Contact Us</h3>
                <p><a href="mailto:contact@lyrinth.com"></a>contact@lyrinth.com</p>
            </div>
            <div className="social-links">
                {socialPlatforms.some((platform) => teamSocials?.[platform]) && <h3>Follow Us</h3>}
                <div className={"social-links__btn-group"}>
                {socialPlatforms.map((platform) => {
                    const link = teamSocials?.[platform];
                    if (!link) {
                        return null;
                    }

                    return (
                        <a
                            className={`social-links__social-btn social-links__social-btn--${platform}`}
                            key={`social-links-${platform}`}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent card click
                                window.open(link, '_blank', 'noopener,noreferrer');
                            }}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`social-links ${platform}`}
                        >
                            <Icon name={platform} />
                        </a>
                    );
                })}
                </div>
            </div>
            <div className="footer-links">
                <h3>Quick Links</h3>
                <nav className="footer-links__nav">
                    <NavLink to="/#home">Home</NavLink>
                    <NavLink to="/#projects">Project</NavLink>
                    <NavLink to="/#about">About</NavLink>
                </nav>
                <Link to="/terms">Terms of Service</Link>
            </div>
        </div>
          <div className="footer-divider" />
          <span className={"footer__copyright"}>&copy; {new Date().getFullYear()} Lyrinth. All rights reserved.</span>
      </footer>
  )
}
