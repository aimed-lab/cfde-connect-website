import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Building2, MessageSquare, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfileCard({ profile, currentUserEmail, isAdmin, onDelete }) {
  const initials = profile.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?';

  const location = [profile.city, profile.state, profile.country].filter(Boolean).join(', ');

  return (
    <Card className="p-5 hover:shadow-md transition-shadow duration-200 group">
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarImage src={profile.avatar_url} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link
                to={`/member/${profile.id}`}
                className="font-semibold text-foreground hover:text-primary transition-colors"
              >
                {profile.full_name}
              </Link>
              {profile.title && (
                <p className="text-sm text-muted-foreground mt-0.5">{profile.title}</p>
              )}
            </div>
            {profile.open_to_collaborate && (
              <Badge variant="secondary" className="bg-accent/10 text-accent text-xs flex-shrink-0">
                Open to collaborate
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" />
              {profile.institution}
            </span>
            {location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {location}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {(profile.consortium) && (
              <Badge variant="outline" className="text-xs font-medium">{profile.consortium}</Badge>
            )}
            {(profile.cfde_center) && (
              <Badge className="text-xs font-medium bg-primary/10 text-primary border-primary/20">{profile.cfde_center}</Badge>
            )}
            {(!profile.consortium && !profile.cfde_center && profile.center_consortium) && (
              <Badge variant="outline" className="text-xs font-medium">{profile.center_consortium}</Badge>
            )}
            {profile.research_interests?.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            {currentUserEmail && profile.user_email !== currentUserEmail && (
              <Link to={`/messages?to=${profile.user_email}&name=${encodeURIComponent(profile.full_name)}`}>
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                  Message
                </Button>
              </Link>
            )}
            {isAdmin && (
              <>
                <Link to={`/member/${profile.id}`}>
                  <Button size="sm" variant="outline" className="h-8 text-xs">
                    <Pencil className="h-3.5 w-3.5 mr-1.5" />
                    Edit
                  </Button>
                </Link>
                <Button size="sm" variant="outline" className="h-8 text-xs text-destructive hover:text-destructive" onClick={() => onDelete?.(profile)}>
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}