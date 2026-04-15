import { Calendar, MapPin, Clock, LogIn } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Static placeholder events — replace with Base44 public query when available
const UPCOMING_EVENTS = [
  {
    id: 1,
    title: 'CFDE All-Hands Meeting',
    type: 'All-Hands Meeting',
    date: 'May 14–15, 2025',
    time: '10:00 AM – 4:00 PM ET',
    location: 'Virtual (Zoom)',
    description: 'Biannual CFDE all-hands meeting bringing together all programs, centers, and community members.',
  },
  {
    id: 2,
    title: 'Ontology Working Group',
    type: 'Working Group',
    date: 'May 6, 2025',
    time: '2:00 PM – 3:00 PM ET',
    location: 'Virtual (Zoom)',
    description: 'Monthly working group call on ontology harmonization across CFDE programs.',
  },
  {
    id: 3,
    title: 'CFDE Data Science Webinar',
    type: 'Webinar',
    date: 'May 20, 2025',
    time: '1:00 PM – 2:00 PM ET',
    location: 'Virtual',
    description: 'Webinar showcasing data science tools and workflows from Common Fund programs.',
  },
];

const TYPE_COLORS = {
  'All-Hands Meeting': 'bg-blue-100 text-blue-700',
  'Working Group': 'bg-purple-100 text-purple-700',
  'Webinar': 'bg-green-100 text-green-700',
  'Workshop': 'bg-orange-100 text-orange-700',
  'Conference': 'bg-red-100 text-red-700',
};

export default function PublicEvents() {
  return (
    <div>
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-[hsl(217,71%,45%)] to-[hsl(217,71%,35%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/20">
            CFDE Events
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Upcoming Events
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Meetings, webinars, working groups, and workshops across the CFDE community.
          </p>
        </div>
      </section>

      {/* Events list */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {UPCOMING_EVENTS.map((event) => (
              <div key={event.id} className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{event.title}</h3>
                    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${TYPE_COLORS[event.type] || 'bg-muted text-muted-foreground'}`}>
                      {event.type}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> {event.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {event.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> {event.location}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Portal CTA */}
          <div className="mt-10 bg-muted/50 rounded-xl border border-border p-6 text-center">
            <LogIn className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">RSVP &amp; See All Events</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Log in to the member portal to RSVP, create events, and access the full community calendar.
            </p>
            <Button asChild>
              <Link to="/portal">Go to Portal</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
