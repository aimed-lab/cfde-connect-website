import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Save, Plus, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { CFDE_PROGRAMS, CFDE_CENTERS, WORKING_GROUPS } from '@/lib/cfdeData';

function TagInput({ tags, setTags, placeholder }) {
  const [input, setInput] = useState('');

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setInput('');
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs gap-1">
            {tag}
            <button onClick={() => setTags(tags.filter(t => t !== tag))}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
          className="flex-1"
        />
        <Button type="button" variant="outline" size="icon" onClick={addTag}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default function MyProfile() {
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: '', title: '', institution: '', department: '',
    consortium: '', cfde_center: '', city: '', state: '', country: 'United States',
    bio: '', research_interests: [], expertise: [], working_groups: [],
    website: '', orcid: '', open_to_collaborate: true,
  });

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
  });

  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ['profiles'],
    queryFn: () => base44.entities.Profile.list('-created_date', 200),
    enabled: !!user,
  });

  const myProfile = profiles.find(p => p.user_email === user?.email);

  useEffect(() => {
    if (myProfile) {
      setForm({
        full_name: myProfile.full_name || '',
        title: myProfile.title || '',
        institution: myProfile.institution || '',
        department: myProfile.department || '',
        consortium: myProfile.consortium || '',
        cfde_center: myProfile.cfde_center || '',
        city: myProfile.city || '',
        state: myProfile.state || '',
        country: myProfile.country || 'United States',
        bio: myProfile.bio || '',
        research_interests: myProfile.research_interests || [],
        expertise: myProfile.expertise || [],
        working_groups: myProfile.working_groups || [],
        website: myProfile.website || '',
        orcid: myProfile.orcid || '',
        open_to_collaborate: myProfile.open_to_collaborate ?? true,
      });
    } else if (user) {
      setForm(prev => ({ ...prev, full_name: user.full_name || '' }));
    }
  }, [myProfile, user]);

  const handleSave = async () => {
    setSaving(true);
    const data = {
      ...form,
      user_email: user.email,
      consortium: form.consortium === 'none' ? '' : form.consortium,
      cfde_center: form.cfde_center === 'none' ? '' : form.cfde_center,
    };
    if (myProfile) {
      await base44.entities.Profile.update(myProfile.id, data);
    } else {
      await base44.entities.Profile.create(data);
    }
    queryClient.invalidateQueries({ queryKey: ['profiles'] });
    toast.success('Profile saved successfully');
    setSaving(false);
  };

  const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8 max-w-3xl mx-auto flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif">My Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {myProfile ? 'Update your professional profile' : 'Create your profile to start connecting'}
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Basic info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input value={form.full_name} onChange={e => updateField('full_name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Professional Title</Label>
              <Input placeholder="e.g. Principal Investigator" value={form.title} onChange={e => updateField('title', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Institution *</Label>
              <Input placeholder="e.g. Johns Hopkins University" value={form.institution} onChange={e => updateField('institution', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Input value={form.department} onChange={e => updateField('department', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Consortium / Program</Label>
              <Select value={form.consortium} onValueChange={v => updateField('consortium', v)}>
                <SelectTrigger><SelectValue placeholder="Select a consortium (optional)" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {CFDE_PROGRAMS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  <SelectItem value="NIH Common Fund">NIH Common Fund</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>CFDE Center</Label>
              <Select value={form.cfde_center} onValueChange={v => updateField('cfde_center', v)}>
                <SelectTrigger><SelectValue placeholder="Select a center (optional)" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {CFDE_CENTERS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Location */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>City</Label>
              <Input value={form.city} onChange={e => updateField('city', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>State</Label>
              <Input value={form.state} onChange={e => updateField('state', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <Input value={form.country} onChange={e => updateField('country', e.target.value)} />
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Bio */}
          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea
              placeholder="Tell others about your research and interests..."
              value={form.bio}
              onChange={e => updateField('bio', e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Research Interests</Label>
            <TagInput tags={form.research_interests} setTags={v => updateField('research_interests', v)} placeholder="Add an interest and press Enter" />
          </div>
          <div className="space-y-2">
            <Label>Expertise</Label>
            <TagInput tags={form.expertise} setTags={v => updateField('expertise', v)} placeholder="Add expertise and press Enter" />
          </div>

          {/* Working Groups */}
          <div className="space-y-2">
            <Label>CFDE Working Groups</Label>
            <p className="text-xs text-muted-foreground">Select the working groups you participate in</p>
            <div className="flex flex-wrap gap-2">
              {WORKING_GROUPS.map(wg => {
                const selected = form.working_groups.includes(wg);
                return (
                  <button
                    key={wg}
                    type="button"
                    onClick={() => {
                      const next = selected
                        ? form.working_groups.filter(w => w !== wg)
                        : [...form.working_groups, wg];
                      updateField('working_groups', next);
                    }}
                    className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                      selected
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-muted-foreground border-border hover:border-primary hover:text-primary'
                    }`}
                  >
                    {wg}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Links */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>ORCID</Label>
              <Input placeholder="0000-0002-1825-0097" value={form.orcid} onChange={e => updateField('orcid', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              <Input placeholder="https://..." value={form.website} onChange={e => updateField('website', e.target.value)} />
            </div>
          </div>

          {/* Collaboration toggle */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium text-sm">Open to Collaborate</p>
              <p className="text-xs text-muted-foreground">Let others know you're available for collaboration</p>
            </div>
            <Switch checked={form.open_to_collaborate} onCheckedChange={v => updateField('open_to_collaborate', v)} />
          </div>

          <Button onClick={handleSave} disabled={saving || !form.full_name || !form.institution} className="w-full gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {myProfile ? 'Update Profile' : 'Create Profile'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}