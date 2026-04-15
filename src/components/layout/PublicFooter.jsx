import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import logo from '@/assets/images/logo.png';

export default function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(215,25%,12%)] text-[hsl(210,16%,82%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <img src={logo} alt="CFDE Connect" className="h-8 w-auto brightness-0 invert" />
              <span className="font-semibold text-white">CFDE Connect</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              The Integration &amp; Coordination Center for the NIH Common Fund Data Ecosystem —
              connecting programs, people, and data to accelerate biomedical discovery.
            </p>
          </div>

          {/* Site links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Site</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Home', to: '/' },
                { label: 'About', to: '/about' },
                { label: 'Programs', to: '/programs' },
                { label: 'Centers', to: '/centers' },
                { label: 'Team', to: '/team' },
                { label: 'Events', to: '/events' },
                { label: 'Contact', to: '/contact' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External resources */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'CFDE Workbench', url: 'https://info.cfde.cloud' },
                { label: 'CFDE Programs', url: 'https://commonfund.nih.gov/dataecosystem' },
                { label: 'Member Portal', to: '/portal' },
              ].map(({ label, url, to }) =>
                url ? (
                  <li key={label}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      {label}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                ) : (
                  <li key={label}>
                    <Link to={to} className="hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[hsl(210,16%,60%)]">
          <p>© {year} CFDE Integration &amp; Coordination Center. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
