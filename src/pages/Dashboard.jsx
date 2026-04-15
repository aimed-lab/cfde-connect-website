import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Calendar, ArrowRight, Sparkles, Building2, FlaskConical, ExternalLink, GitBranch } from 'lucide-react';
import { CFDE_RESOURCES, CFDE_PROGRAMS, CFDE_CENTERS } from '@/lib/cfdeData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import EventCard from '@/components/shared/EventCard';
import ExploreModal from '@/components/dashboard/ExploreModal';

export default function Dashboard() {
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
  });

  const { data: profiles = [], isLoading: profilesLoading } = useQuery({
    queryKey: ['profiles'],
    queryFn: () => base44.entities.Profile.list('-created_date', 500),
  });

  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => base44.entities.Event.list('-start_date', 50),
  });

  const [exploreModal, setExploreModal] = useState(null); // null | 'members' | 'events' | 'consortia' | 'centers'

  const myProfile = profiles.find(p => p.user_email === user?.email);
  const upcomingEvents = events.filter(e => new Date(e.start_date) >= new Date()).slice(0, 3);
  const suggestedMembers = profiles
    .filter(p => p.user_email !== user?.email)
    .filter(p => {
      if (!myProfile) return true;
      const myAff = myProfile.consortium || myProfile.center_consortium;
      const pAff = p.consortium || p.center_consortium;
      return myAff && pAff && myAff === pAff;
    })
    .slice(0, 4);

  const handleRSVP = async (event) => {
    const isAttending = event.attendees?.includes(user?.email);
    const attendees = isAttending
      ? event.attendees.filter(e => e !== user?.email)
      : [...(event.attendees || []), user?.email];
    await base44.entities.Event.update(event.id, { attendees });
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 to-primary p-8 lg:p-10 text-primary-foreground">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative z-10">
          <h1 className="text-2xl lg:text-3xl font-bold font-serif">
            Welcome{myProfile ? `, ${myProfile.full_name.split(' ')[0]}` : ''}
          </h1>
          <p className="text-primary-foreground/80 mt-2 max-w-lg text-sm lg:text-base">
            Connect with researchers across the NIH Common Fund Data Ecosystem (CFDE) — spanning 19 programs and 5 centers. Discover collaborators, share knowledge, and build the future of FAIR biomedical data together.
          </p>
          {!myProfile && (
            <Link to="/profile">
              <Button className="mt-5 bg-white text-primary hover:bg-white/90 font-medium">
                <Sparkles className="h-4 w-4 mr-2" />
                Set Up Your Profile
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats row — all explorable */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          className="p-4 cursor-pointer hover:border-primary/40 hover:shadow-sm transition-all"
          onClick={() => navigate('/directory')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Members</p>
              <p className="text-2xl font-bold mt-1">{profiles.length}</p>
              <p className="text-xs text-primary mt-0.5">Browse directory →</p>
            </div>
            <Users className="h-8 w-8 text-primary opacity-20" />
          </div>
        </Card>

        <Card
          className="p-4 cursor-pointer hover:border-accent/40 hover:shadow-sm transition-all"
          onClick={() => navigate('/events')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Upcoming Events</p>
              <p className="text-2xl font-bold mt-1">{upcomingEvents.length}</p>
              <p className="text-xs text-accent mt-0.5">View all events →</p>
            </div>
            <Calendar className="h-8 w-8 text-accent opacity-20" />
          </div>
        </Card>

        <Card
          className="p-4 cursor-pointer hover:border-chart-4/40 hover:shadow-sm transition-all"
          onClick={() => setExploreModal('consortia')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Consortia</p>
              <p className="text-2xl font-bold mt-1">{CFDE_PROGRAMS.length}</p>
              <p className="text-xs text-chart-4 mt-0.5">Explore programs →</p>
            </div>
            <FlaskConical className="h-8 w-8 text-chart-4 opacity-20" />
          </div>
        </Card>

        <Card
          className="p-4 cursor-pointer hover:border-chart-2/40 hover:shadow-sm transition-all"
          onClick={() => setExploreModal('centers')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">CFDE Centers</p>
              <p className="text-2xl font-bold mt-1">{CFDE_CENTERS.length}</p>
              <p className="text-xs text-chart-2 mt-0.5">Explore centers →</p>
            </div>
            <Building2 className="h-8 w-8 text-chart-2 opacity-20" />
          </div>
        </Card>
      </div>

      {/* Explore modals */}
      <ExploreModal
        type={exploreModal}
        onClose={() => setExploreModal(null)}
        profiles={profiles}
        events={events}
        onNavigateDirectory={(filter) => { setExploreModal(null); navigate(`/directory?filter=${filter}`); }}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming events */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
            <Link to="/events" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {eventsLoading ? (
            <div className="space-y-3">
              {[1, 2].map(i => <Skeleton key={i} className="h-32 rounded-lg" />)}
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} onRSVP={handleRSVP} currentUserEmail={user?.email} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center text-muted-foreground">
              <Calendar className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No upcoming events yet</p>
              <Link to="/events">
                <Button variant="outline" size="sm" className="mt-3">Create an Event</Button>
              </Link>
            </Card>
          )}
        </div>

        {/* Suggested connections */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Suggested Connections</h2>
            <Link to="/directory" className="text-sm text-primary hover:underline flex items-center gap-1">
              Browse <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {profilesLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 rounded-lg" />)}
            </div>
          ) : suggestedMembers.length > 0 ? (
            <div className="space-y-3">
              {suggestedMembers.map(profile => {
                const affiliation = profile.consortium || profile.cfde_center || profile.center_consortium;
                return (
                  <Card key={profile.id} className="p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile.avatar_url} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {profile.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <Link to={`/member/${profile.id}`} className="font-medium text-sm hover:text-primary transition-colors">
                          {profile.full_name}
                        </Link>
                        <p className="text-xs text-muted-foreground truncate">{profile.institution}</p>
                        {affiliation && <Badge variant="outline" className="text-[10px] mt-1">{affiliation}</Badge>}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="p-6 text-center text-muted-foreground">
              <Users className="h-8 w-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Invite colleagues to connect</p>
            </Card>
          )}
        </div>
      </div>

      {/* CFDE Resources */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">CFDE Tools & Resources</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Data Flow — internal page */}
          <Link to="/data-flow" className="group">
            <Card className="p-4 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer h-full">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-sm group-hover:text-primary transition-colors flex items-center gap-1.5">
                    <GitBranch className="h-3.5 w-3.5 text-primary" />
                    CFDE Data Flow
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Interactive Sankey: programs → data types → repositories</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
              </div>
            </Card>
          </Link>
          {CFDE_RESOURCES.map(resource => (
            <a key={resource.name} href={resource.url} target="_blank" rel="noopener noreferrer" className="group">
              <Card className="p-4 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer h-full">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-sm group-hover:text-primary transition-colors">{resource.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}