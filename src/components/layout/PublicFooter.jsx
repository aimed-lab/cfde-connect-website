import { Link } from 'react-router-dom';
import { Mail, ExternalLink } from 'lucide-react';
import logo from '@/assets/images/logo.png';
import logoUab from '@/assets/images/logo-uab.png';

export default function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(215,25%,12%)] text-[hsl(210,16%,82%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="CFDE Connect" className="h-10 w-auto brightness-0 invert" />
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-4">
              The Integration &amp; Coordination Center for the NIH Common Fund Data Ecosystem —
              connecting programs, people, and data to accelerate biomedical discovery.
            </p>
            <p className="text-xs text-[hsl(210,16%,50%)]">
              NIH Common Fund CFDE &nbsp;·&nbsp; Grant # U54OD036472
            </p>
            {/* Institution logo */}
            <div className="mt-4">
              <img src={logoUab} alt="University of Alabama at Birmingham" className="h-6 w-auto brightness-0 invert opacity-70" />
            </div>
          </div>

          {/* Site links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Site</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Home', to: '/' },
                { label: 'About', to: '/about' },
                { label: 'Administrative Core', to: '/team#admin' },
                { label: 'Evaluation Core', to: '/team#eval' },
                { label: 'Sustainability Core', to: '/team#sustainability' },
                { label: 'Programs', to: '/programs' },
                { label: 'Events', to: '/events' },
                { label: 'Contact', to: '/contact' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & resources */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Connect</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:cfde.icc@gmail.com"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <Mail className="h-3.5 w-3.5" /> cfde.icc@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@CFDEWorkbench"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> YouTube @CFDEWorkbench
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/CfdeWorkbench"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> X @CfdeWorkbench
                </a>
              </li>
              <li className="pt-2">
                <Link to="/portal" className="hover:text-white transition-colors font-medium">
                  Member Portal →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[hsl(210,16%,50%)]">
          <p>© {year} The University of Alabama at Birmingham. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
