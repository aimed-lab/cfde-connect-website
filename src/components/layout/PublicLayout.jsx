import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

const MEETINGS = [
  { label: 'CFDE Fall 2026 Meeting', href: 'https://fall2026.cfdeconnect.org/', note: 'October 13–14, 2026 · UC San Diego' },
  { label: 'CFDE Spring 2026 Meeting Recap', to: '/meetings/spring-2026-recap', note: 'March 24–25, 2026 · Rockville, MD' },
  { label: 'CFDE Fall 2025 Meeting Recap', to: '/meetings/fall-2025-recap', note: 'October 27–28, 2025' },
  { label: 'CFDE Spring 2025 Meeting', to: '/meetings/spring-2025', note: 'March 25–26, 2025 · Bethesda, MD' },
  { label: 'CFDE Fall 2024 Meeting', to: '/meetings/fall-2024', note: 'October 22–23, 2024 · Bethesda, MD' },
];

const CORES = [
  { label: 'Administrative Core', to: '/cores/administrative', note: 'University of Alabama at Birmingham' },
  { label: 'Evaluation Core', to: '/cores/evaluation', note: 'University of Colorado Anschutz' },
  { label: 'Sustainability Core', to: '/cores/sustainability', note: 'UCLA · University of Arizona' },
];

const SERVICE = [
  { label: 'Join / Collaborate', href: 'https://forms.gle/8T5W9BnLo5Vzz5Gt5', note: 'Google Form — external' },
  { label: 'Talent Knowledge Graph', href: 'https://cfdegraph.vercel.app/', note: 'cfdegraph.vercel.app — external' },
];

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
  );
}

function NavDropdown({ id, label, items, openMenu, setOpenMenu }) {
  const open = openMenu === id;
  return (
    <div
      className={`nav__item${open ? ' is-open' : ''}`}
      onMouseEnter={() => window.matchMedia('(min-width: 761px)').matches && setOpenMenu(id)}
      onMouseLeave={() => window.matchMedia('(min-width: 761px)').matches && setOpenMenu(null)}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpenMenu(open ? null : id)}
      >
        {label}
        <Chevron />
      </button>
      {open && (
        <div className="nav__menu">
          {items.map((item) =>
            item.to ? (
              <Link key={item.label} to={item.to}>
                {item.label}
                {item.note && <small>{item.note}</small>}
              </Link>
            ) : (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label}
                {item.note && <small>{item.note}</small>}
              </a>
            ),
          )}
        </div>
      )}
    </div>
  );
}

function Topbar() {
  const [stuck, setStuck] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close menus on navigation
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location]);

  // close dropdowns when clicking outside
  useEffect(() => {
    const onClick = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <header className={`topbar${stuck ? ' is-stuck' : ''}`} ref={barRef}>
      <div className="wrap topbar__inner">
        <Link className="topbar__brand" to="/" title="CFDE CONNECT home">
          <img src="/images/logos/cfde-connect-logo.png" alt="CFDE CONNECT — Integration & Coordination Center" />
        </Link>

        <button
          className="navtoggle"
          aria-expanded={mobileOpen}
          aria-controls="nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>

        <nav className={`nav${mobileOpen ? ' is-open' : ''}`} id="nav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'is-active' : undefined)}>Home</NavLink>
          <NavDropdown id="meetings" label="Meetings" items={MEETINGS} openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <NavDropdown id="cores" label="Cores" items={CORES} openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <NavDropdown id="service" label="Service" items={SERVICE} openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <NavLink to="/news" className={({ isActive }) => (isActive ? 'is-active' : undefined)}>News</NavLink>
          <NavLink to="/calendar" className={({ isActive }) => (isActive ? 'is-active' : undefined)}>Calendar</NavLink>
          <a className="nav__cta" href="https://portal.cfdeconnect.org/" target="_blank" rel="noopener noreferrer">
            Portal
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7" /></svg>
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__inner">
        <div className="foot__brand">
          <a className="foot__logo" href="https://www.uab.edu/" target="_blank" rel="noopener noreferrer" title="The University of Alabama at Birmingham">
            <img src="/images/logos/cfde-connect-logo.png" alt="CFDE CONNECT" />
          </a>
          <p>
            This work is supported by the{' '}
            <a href="https://reporter.nih.gov/search/K_6InDI1Wk6LIGBkj91EWA/project-details/10876608" target="_blank" rel="noopener noreferrer">
              NIH Common Fund CFDE program (Grant # U54OD036472)
            </a>
          </p>
          <p>
            UAB is an Equal Opportunity/Affirmative Action Employer committed to fostering a diverse,
            equitable, and family-friendly environment.
          </p>
        </div>

        <div className="foot__contact">
          <h2>Contact</h2>
          <a href="mailto:cfde.icc@gmail.com">cfde.icc@gmail.com</a>
          <div className="foot__social">
            <a href="mailto:cfde.icc@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.24-8 5-8-5V6.51l8 5 8-5v1.73z" /></svg>
            </a>
            <a href="https://www.youtube.com/@CFDEWorkbench" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12z" /></svg>
            </a>
            <a href="https://x.com/CfdeWorkbench" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24"><path d="M18.9 1.2h3.7l-8.1 9.3L24 22.8h-7.5l-5.9-7.7-6.7 7.7H.2l8.6-9.9L0 1.2h7.7l5.3 7 6-7zm-1.3 19.4h2L6.6 3.3h-2.2z" /></svg>
            </a>
          </div>
        </div>

        <nav className="foot__links" aria-label="Footer">
          <h2>Links</h2>
          <a href="https://www.uab.edu/" target="_blank" rel="noopener noreferrer">UAB</a>
          <a href="https://cfde.cloud/" target="_blank" rel="noopener noreferrer">CFDE Data Portal</a>
          <a href="https://forms.gle/8T5W9BnLo5Vzz5Gt5" target="_blank" rel="noopener noreferrer">Join / Collaborate</a>
          <a href="https://www.uab.edu/privacy" target="_blank" rel="noopener noreferrer">Privacy</a>
          <a href="https://www.uab.edu/toolkit/web/terms-of-use" target="_blank" rel="noopener noreferrer">Terms of Use</a>
        </nav>
      </div>
      <div className="wrap foot__legal">
        <p>© {new Date().getFullYear()} CFDE CONNECT · The University of Alabama at Birmingham</p>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function PublicLayout() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollToTop />
      <Topbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
