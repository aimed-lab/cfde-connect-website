import React, { useState, useMemo, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Filter, Users } from 'lucide-react';
import ProfileCard from '@/components/shared/ProfileCard';
import { toast } from 'sonner';
import { CFDE_PROGRAMS, CFDE_CENTERS } from '@/lib/cfdeData';

const CONSORTIUM_OPTIONS = ['All', ...CFDE_PROGRAMS, 'NIH Common Fund', 'Other'];
const CENTER_OPTIONS = ['All', ...CFDE_CENTERS];

export default function Directory() {
  const [search, setSearch] = useState('');
  const [consortium, setConsortium] = useState('All');
  const [center, setCenter] = useState('All');

  const qc = useQueryClient();

  // Support ?filter= from dashboard explore modal
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const f = params.get('filter');
    if (f) {
      const decoded = decodeURIComponent(f);
      if (CFDE_CENTERS.includes(decoded)) {
        setCenter(decoded);
      } else {
        setConsortium(decoded);
      }
    }
  }, []);

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
  });

  const isAdmin = user?.role === 'admin';

  const handleDelete = async (profile) => {
    if (!confirm(`Delete ${profile.full_name}'s profile?`)) return;
    await base44.entities.Profile.delete(profile.id);
    qc.invalidateQueries({ queryKey: ['profiles'] });
    toast.success('Profile deleted');
  };

  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ['profiles'],
    queryFn: () => base44.entities.Profile.list('-created_date', 500),
  });

  const filteredProfiles = useMemo(() => {
    return profiles.filter(p => {
      const matchesSearch = !search ||
        p.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        p.institution?.toLowerCase().includes(search.toLowerCase()) ||
        p.research_interests?.some(i => i.toLowerCase().includes(search.toLowerCase())) ||
        p.expertise?.some(e => e.toLowerCase().includes(search.toLowerCase()));

      // consortium filter — check new field, fallback to legacy center_consortium
      const pConsortium = p.consortium || (!CFDE_CENTERS.includes(p.center_consortium) ? p.center_consortium : '');
      const matchesConsortium = consortium === 'All' || pConsortium === consortium;

      // center filter — check new field, fallback to legacy center_consortium
      const pCenter = p.cfde_center || (CFDE_CENTERS.includes(p.center_consortium) ? p.center_consortium : '');
      const matchesCenter = center === 'All' || pCenter === center;

      return matchesSearch && matchesConsortium && matchesCenter;
    });
  }, [profiles, search, consortium, center]);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif">Member Directory</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {profiles.length} members across the CFDE network
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, institution, or interest..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={consortium} onValueChange={setConsortium}>
          <SelectTrigger className="w-full sm:w-52">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground shrink-0" />
            <SelectValue placeholder="Consortium" />
          </SelectTrigger>
          <SelectContent>
            {CONSORTIUM_OPTIONS.map(c => (
              <SelectItem key={c} value={c}>{c === 'All' ? 'All Consortia' : c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={center} onValueChange={setCenter}>
          <SelectTrigger className="w-full sm:w-52">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground shrink-0" />
            <SelectValue placeholder="CFDE Center" />
          </SelectTrigger>
          <SelectContent>
            {CENTER_OPTIONS.map(c => (
              <SelectItem key={c} value={c}>{c === 'All' ? 'All Centers' : c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-36 rounded-lg" />)}
        </div>
      ) : filteredProfiles.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredProfiles.map(profile => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              currentUserEmail={user?.email}
              isAdmin={isAdmin}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-muted-foreground">
          <Users className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p className="font-medium">No members found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}