import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/images/logo.png';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Programs', to: '/programs' },
  { label: 'Centers', to: '/centers' },
  { label: 'Team', to: '/team' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
];

export default function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="CFDE Connect" className="h-8 w-auto" />
            <span className="font-semibold text-foreground text-sm hidden sm:block">
              CFDE Connect
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive(to)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Portal login + mobile toggle */}
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link to="/portal">Member Portal</Link>
            </Button>
            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(to)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {label}
              </Link>
            ))}
            <Button asChild size="sm" className="mt-2 w-full">
              <Link to="/portal" onClick={() => setMobileOpen(false)}>
                Member Portal
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
