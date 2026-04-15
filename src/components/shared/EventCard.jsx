import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

export default function EventCard({ event, onRSVP, currentUserEmail }) {
  const isAttending = event.attendees?.includes(currentUserEmail);
  const isOrganizer = event.organizer_email === currentUserEmail;
  const startDate = new Date(event.start_date);
  const isPast = startDate < new Date();

  const typeColors = {
    Conference: 'bg-chart-1/10 text-chart-1',
    Workshop: 'bg-chart-2/10 text-chart-2',
    Webinar: 'bg-chart-3/10 text-chart-3',
    Hackathon: 'bg-chart-4/10 text-chart-4',
    Meeting: 'bg-chart-5/10 text-chart-5',
    Social: 'bg-accent/10 text-accent',
    Other: 'bg-muted text-muted-foreground',
  };

  return (
    <Card className={`p-5 transition-shadow hover:shadow-md ${isPast ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={typeColors[event.event_type] || typeColors.Other}>
              {event.event_type}
            </Badge>
            {event.center_consortium && (
              <Badge variant="outline" className="text-xs">
                {event.center_consortium}
              </Badge>
            )}
            {isPast && <Badge variant="secondary" className="text-xs">Past</Badge>}
          </div>

          <h3 className="font-semibold mt-2 text-foreground">{event.title}</h3>
          {event.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {format(startDate, 'MMM d, yyyy')}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {format(startDate, 'h:mm a')}
            </span>
            {event.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {event.location}
              </span>
            )}
            {event.attendees?.length > 0 && (
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {event.attendees.length} attending
              </span>
            )}
          </div>
        </div>

        {/* Date badge */}
        <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-primary/5 flex flex-col items-center justify-center">
          <span className="text-xs font-medium text-primary uppercase">{format(startDate, 'MMM')}</span>
          <span className="text-lg font-bold text-primary leading-none">{format(startDate, 'd')}</span>
        </div>
      </div>

      {!isPast && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t">
          {isOrganizer ? (
            <Badge variant="secondary" className="text-xs">You're organizing</Badge>
          ) : (
            <Button
              size="sm"
              variant={isAttending ? 'secondary' : 'default'}
              className="h-8 text-xs"
              onClick={() => onRSVP(event)}
            >
              {isAttending ? 'Cancel RSVP' : 'RSVP'}
            </Button>
          )}
          {event.virtual_link && (
            <a href={event.virtual_link} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="h-8 text-xs">
                <ExternalLink className="h-3.5 w-3.5 mr-1" />
                Join Virtual
              </Button>
            </a>
          )}
          {event.external_url && (
            <a href={event.external_url} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="ghost" className="h-8 text-xs">
                <ExternalLink className="h-3.5 w-3.5 mr-1" />
                Info / Register
              </Button>
            </a>
          )}
        </div>
      )}
    </Card>
  );
}