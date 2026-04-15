import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, MessageSquare, Calendar, User, X, LogOut, FileText, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

const baseNavItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/directory', label: 'Directory', icon: Users },
  { path: '/messages', label: 'Messages', icon: MessageSquare },
  { path: '/events', label: 'Events', icon: Calendar },
  { path: '/profile', label: 'My Profile', icon: User },
  { path: '/data-flow', label: 'Data Flow', icon: GitBranch },
];

const adminNavItems = [
  { path: '/meeting-notes', label: 'Meeting Notes', icon: FileText },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const { data: user } = useQuery({ queryKey: ['me'], queryFn: () => base44.auth.me() });
  const isAdmin = user?.role === 'admin';
  const navItems = isAdmin ? [...baseNavItems, ...adminNavItems] : baseNavItems;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-sidebar text-sidebar-foreground
        flex flex-col transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo area */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-sidebar-primary-foreground tracking-tight">CFDE Connect</h1>
              <p className="text-xs text-sidebar-foreground/60 mt-0.5">NIH Common Fund Network</p>
            </div>
            <Button variant="ghost" size="icon" className="lg:hidden text-sidebar-foreground" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="h-px bg-sidebar-border mx-4" />

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ path, label, icon: NavIcon }) => {
            const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                  ${isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }
                `}
              >
                <NavIcon className="h-4.5 w-4.5 flex-shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={() => base44.auth.logout()}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}