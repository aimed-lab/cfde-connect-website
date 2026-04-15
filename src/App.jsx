import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import PageNotFound from './lib/PageNotFound';

// Public layout + pages
import PublicLayout from '@/components/layout/PublicLayout';
import Home from '@/pages/public/Home';
import About from '@/pages/public/About';
import Programs from '@/pages/public/Programs';
import Centers from '@/pages/public/Centers';
import Team from '@/pages/public/Team';
import PublicEvents from '@/pages/public/PublicEvents';
import Contact from '@/pages/public/Contact';
import Privacy from '@/pages/public/Privacy';
import Terms from '@/pages/public/Terms';

// Portal layout + pages
import AppLayout from '@/components/layout/AppLayout';
import Dashboard from '@/pages/Dashboard';
import Directory from '@/pages/Directory';
import MemberProfile from '@/pages/MemberProfile';
import MyProfile from '@/pages/MyProfile';
import Messages from '@/pages/Messages';
import Events from '@/pages/Events';
import MeetingNotes from '@/pages/MeetingNotes';
import DataFlow from '@/pages/DataFlow';

const PortalApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-3">Loading CFDE Connect...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="directory" element={<Directory />} />
        <Route path="member/:id" element={<MemberProfile />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="messages" element={<Messages />} />
        <Route path="events" element={<Events />} />
        <Route path="meeting-notes" element={<MeetingNotes />} />
        <Route path="data-flow" element={<DataFlow />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          {/* Public website */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/centers" element={<Centers />} />
            <Route path="/team" element={<Team />} />
            <Route path="/events" element={<PublicEvents />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Route>

          {/* Member portal — auth-gated */}
          <Route
            path="/portal/*"
            element={
              <AuthProvider>
                <PortalApp />
              </AuthProvider>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App
