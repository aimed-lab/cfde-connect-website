import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Search } from 'lucide-react';
import { CFDE_PROGRAMS, CFDE_CENTERS, PROGRAM_DESCRIPTIONS } from '@/lib/cfdeData';
import { Link } from 'react-router-dom';

function ConsortiaList({ items, profiles, onNavigateDirectory, colorClass, badgeClass }) {
  const [search, setSearch] = useState('');
  const filtered = items.filter(i => i.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-8 h-8 text-sm"
        />
      </div>
      {filtered.map(item => {
        const memberCount = profiles.filter(p =>
          p.consortium === item || p.cfde_center === item || p.center_consortium === item
        ).length;
        return (
          <div key={item} className={`flex items-start gap-3 p-3 rounded-lg ${colorClass}`}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={`text-xs shrink-0 ${badgeClass}`}>{item}</Badge>
                {memberCount > 0 && (
                  <button
                    onClick={() => onNavigateDirectory(encodeURIComponent(item))}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Users className="h-3 w-3" />
                    {memberCount} member{memberCount !== 1 ? 's' : ''}
                  </button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{PROGRAM_DESCRIPTIONS[item]}</p>
            </div>
          </div>
        );
      })}
      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">No results</p>
      )}
    </div>
  );
}

export default function ExploreModal({ type, onClose, profiles = [], events = [], onNavigateDirectory }) {
  const isOpen = type !== null;

  const titles = {
    consortia: 'CFDE Consortia',
    centers: 'CFDE Centers',
  };

  return (
    <Dialog open={isOpen} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{titles[type] || ''}</DialogTitle>
        </DialogHeader>

        {type === 'consortia' && (
          <ConsortiaList
            items={CFDE_PROGRAMS}
            profiles={profiles}
            onNavigateDirectory={onNavigateDirectory}
            colorClass="bg-muted/40"
            badgeClass=""
          />
        )}

        {type === 'centers' && (
          <ConsortiaList
            items={CFDE_CENTERS}
            profiles={profiles}
            onNavigateDirectory={onNavigateDirectory}
            colorClass="bg-primary/5"
            badgeClass="border-primary/30 text-primary"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}