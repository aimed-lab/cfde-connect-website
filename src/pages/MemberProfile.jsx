import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, MapPin, Building2, Globe, MessageSquare, ExternalLink, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CFDE_PROGRAMS, CFDE_CENTERS } from '@/lib/cfdeData';

export default function MemberProfile() {
  const pathParts = window.location.pathname.split('/');
  const memberId = pathParts[pathParts.length - 1];
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
  });

  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ['profiles'],
    queryFn: () => base44.entities.Profile.list('-created_date', 200),
  });

  const profile = profiles.find(p => p.id === memberId);
  const isAdmin = user?.role === 'admin';

  const startEdit = () => {
    setEditForm({ ...profile });
    setEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await base44.entities.Profile.update(profile.id, editForm);
    qc.invalidateQueries({ queryKey: ['profiles'] });
    toast.success('Profile updated');
    setEditing(false);
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm(`Delete ${profile.full_name}'s profile? This cannot be undone.`)) return;
    setDeleting(true);
    await base44.entities.Profile.delete(profile.id);
    qc.invalidateQueries({ queryKey: ['profiles'] });
    toast.success('Profile deleted');
    navigate('/directory');
  };

  const updateField = (field, value) => setEditForm(f => ({ ...f, [field]: value }));

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6 lg:p-8 max-w-3xl mx-auto text-center py-20">
        <p className="text-muted-foreground">Profile not found</p>
        <Link to="/directory"><Button variant="outline" className="mt-4">Back to Directory</Button></Link>
      </div>
    );
  }

  const initials = profile.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2) || '?';
  const location = [profile.city, profile.state, profile.country].filter(Boolean).join(', ');

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <Link to="/directory" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Directory
      </Link>

      <Card className="overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary/20 to-accent/20" />
        <CardContent className="pt-0 -mt-10 relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <Avatar className="h-20 w-20 border-4 border-card shadow-lg">
              <AvatarImage src={profile.avatar_url} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-xl font-bold font-serif">{profile.full_name}</h1>
              {profile.title && <p className="text-muted-foreground mt-0.5">{profile.title}</p>}
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Building2 className="h-4 w-4" /> {profile.institution}</span>
                {profile.department && <span>• {profile.department}</span>}
              </div>
              {location && (
                <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" /> {location}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              {user?.email !== profile.user_email && (
                <Link to={`/messages?to=${profile.user_email}&name=${encodeURIComponent(profile.full_name)}`}>
                  <Button className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Message
                  </Button>
                </Link>
              )}
              {isAdmin && (
                <>
                  <Button variant="outline" size="icon" onClick={startEdit}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" onClick={handleDelete} disabled={deleting}>
                    {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </Button>
                </>
              )}
            </div>
          </div>

          {profile.bio && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">About</h3>
              <p className="text-sm leading-relaxed">{profile.bio}</p>
            </div>
          )}

          <div className="mt-6 grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Affiliation</h3>
            <div className="flex flex-wrap gap-1.5">
              {profile.consortium && <Badge variant="outline" className="text-sm">{profile.consortium}</Badge>}
              {profile.cfde_center && <Badge className="text-sm bg-primary/10 text-primary border-primary/20">{profile.cfde_center}</Badge>}
              {!profile.consortium && !profile.cfde_center && profile.center_consortium && (
                <Badge variant="outline" className="text-sm">{profile.center_consortium}</Badge>
              )}
            </div>
          </div>
            {profile.research_interests?.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Research Interests</h3>
                <div className="flex flex-wrap gap-1.5">
                  {profile.research_interests.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
            {profile.expertise?.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Expertise</h3>
                <div className="flex flex-wrap gap-1.5">
                  {profile.expertise.map(tag => (
                    <Badge key={tag} className="bg-accent/10 text-accent text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
            {profile.working_groups?.length > 0 && (
              <div className="sm:col-span-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">CFDE Working Groups</h3>
                <div className="flex flex-wrap gap-1.5">
                  {profile.working_groups.map(wg => (
                    <Badge key={wg} variant="outline" className="text-xs border-primary/30 text-primary">{wg}</Badge>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-2">
              {profile.orcid && (
                <a href={`https://orcid.org/${profile.orcid}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <ExternalLink className="h-3.5 w-3.5" /> ORCID: {profile.orcid}
                </a>
              )}
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <Globe className="h-3.5 w-3.5" /> Website
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Admin Edit Dialog */}
      {editing && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card rounded-xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 space-y-4">
            <h2 className="text-lg font-semibold">Edit Member Profile</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 col-span-2">
                  <Label>Full Name</Label>
                  <Input value={editForm.full_name || ''} onChange={e => updateField('full_name', e.target.value)} required />
                </div>
                <div className="space-y-1">
                  <Label>Title</Label>
                  <Input value={editForm.title || ''} onChange={e => updateField('title', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label>Institution</Label>
                  <Input value={editForm.institution || ''} onChange={e => updateField('institution', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label>Department</Label>
                  <Input value={editForm.department || ''} onChange={e => updateField('department', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label>Consortium</Label>
                  <Select value={editForm.consortium || 'none'} onValueChange={v => updateField('consortium', v === 'none' ? '' : v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {CFDE_PROGRAMS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                      <SelectItem value="NIH Common Fund">NIH Common Fund</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>CFDE Center</Label>
                  <Select value={editForm.cfde_center || 'none'} onValueChange={v => updateField('cfde_center', v === 'none' ? '' : v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {CFDE_CENTERS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1 col-span-2">
                  <Label>Bio</Label>
                  <Textarea value={editForm.bio || ''} onChange={e => updateField('bio', e.target.value)} className="min-h-[80px]" />
                </div>
                <div className="space-y-1">
                  <Label>City</Label>
                  <Input value={editForm.city || ''} onChange={e => updateField('city', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label>State</Label>
                  <Input value={editForm.state || ''} onChange={e => updateField('state', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label>ORCID</Label>
                  <Input value={editForm.orcid || ''} onChange={e => updateField('orcid', e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label>Website</Label>
                  <Input value={editForm.website || ''} onChange={e => updateField('website', e.target.value)} />
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <Button type="button" variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
                <Button type="submit" disabled={saving} className="gap-2">
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}