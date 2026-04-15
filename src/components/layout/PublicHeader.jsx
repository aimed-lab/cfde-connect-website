import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/images/logo.png';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  {
    label: 'Cores',
    to: '/team',
    children: [
      { label: 'Administrative Core', to: '/team#admin' },
      { label: 'Evaluation Core', to: '/team#eval' },
      { label: 'Sustainability Core', to: '/team#sustainability' },
    ],
  },
  { label: 'Programs', to: '/programs' },
  { label: 'Centers', to: '/centers' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
];

export default function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coresOpen, setCoresOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="CFDE Connect" className="h-9 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, to, children }) =>
              children ? (
                <div
                  key={to}
                  className="relative"
                  onMouseEnter={() => setCoresOpen(true)}
                  onMouseLeave={() => setCoresOpen(false)}
                >
                  <Link
                    to={to}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      isActive(to)
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {label}
                  </Link>
                  {coresOpen && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-lg border border-border py-1 z-50">
                      {children.map(({ label: cl, to: ct }) => (
                        <Link
                          key={ct}
                          to={ct}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                          onClick={() => setCoresOpen(false)}
                        >
                          {cl}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
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
              )
            )}
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
            {NAV_LINKS.map(({ label, to, children }) => (
              <div key={to}>
                <Link
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(to)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {label}
                </Link>
                {children?.map(({ label: cl, to: ct }) => (
                  <Link
                    key={ct}
                    to={ct}
                    onClick={() => setMobileOpen(false)}
                    className="block pl-6 pr-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    {cl}
                  </Link>
                ))}
              </div>
            ))}
            <Button asChild size="sm" className="mt-2 w-full">
              <Link to="/portal" onClick={() => setMobileOpen(false)}>Member Portal</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
