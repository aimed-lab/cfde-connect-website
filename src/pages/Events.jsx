import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Calendar, Filter } from 'lucide-react';
import { EVENT_TYPES, ALL_EVENT_CONSORTIA } from '@/lib/cfdeData';
import EventCard from '@/components/shared/EventCard';
import CreateEventDialog from '@/components/events/CreateEventDialog';

export default function Events() {
  const queryClient = useQueryClient();
  const [showCreate, setShowCreate] = useState(false);
  const [timeFilter, setTimeFilter] = useState('upcoming');
  const [typeFilter, setTypeFilter] = useState('All');

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
  });

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => base44.entities.Event.list('-start_date', 200),
  });

  const now = new Date();
  const filteredEvents = events
    .filter(e => {
      const start = new Date(e.start_date);
      if (timeFilter === 'upcoming') return start >= now;
      if (timeFilter === 'past') return start < now;
      return true;
    })
    .filter(e => typeFilter === 'All' || e.event_type === typeFilter)
    .sort((a, b) => {
      if (timeFilter === 'past') return new Date(b.start_date) - new Date(a.start_date);
      return new Date(a.start_date) - new Date(b.start_date);
    });

  const handleRSVP = async (event) => {
    const isAttending = event.attendees?.includes(user?.email);
    const attendees = isAttending
      ? event.attendees.filter(e => e !== user?.email)
      : [...(event.attendees || []), user?.email];
    await base44.entities.Event.update(event.id, { attendees });
    queryClient.invalidateQueries({ queryKey: ['events'] });
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif">Events</h1>
          <p className="text-sm text-muted-foreground mt-1">Discover and attend CFDE events</p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Create Event
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <Tabs value={timeFilter} onValueChange={setTimeFilter}>
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
        </Tabs>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-44">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {['All', ...EVENT_TYPES].map(t => (
              <SelectItem key={t} value={t}>{t === 'All' ? 'All Types' : t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-40 rounded-lg" />)}
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="space-y-4">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} onRSVP={handleRSVP} currentUserEmail={user?.email} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-muted-foreground">
          <Calendar className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p className="font-medium">No events found</p>
          <p className="text-sm mt-1">Create an event to get started</p>
        </div>
      )}

      <CreateEventDialog open={showCreate} onOpenChange={setShowCreate} userEmail={user?.email} userName={user?.full_name} />
    </div>
  );
}