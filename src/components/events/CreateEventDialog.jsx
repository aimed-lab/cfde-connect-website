import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { EVENT_TYPES, ALL_EVENT_CONSORTIA } from '@/lib/cfdeData';
const CONSORTIA = ALL_EVENT_CONSORTIA;

export default function CreateEventDialog({ open, onOpenChange, userEmail, userName }) {
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', event_type: '', center_consortium: '',
    start_date: '', end_date: '', location: '', virtual_link: '', max_attendees: '', external_url: '',
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await base44.entities.Event.create({
      ...form,
      max_attendees: form.max_attendees ? Number(form.max_attendees) : undefined,
      organizer_email: userEmail,
      organizer_name: userName,
      attendees: [userEmail],
    });
    queryClient.invalidateQueries({ queryKey: ['events'] });
    toast.success('Event created successfully');
    setForm({ title: '', description: '', event_type: '', center_consortium: '', start_date: '', end_date: '', location: '', virtual_link: '', max_attendees: '', external_url: '' });
    onOpenChange(false);
    setSaving(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Title *</Label>
            <Input value={form.title} onChange={e => update('title', e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={form.description} onChange={e => update('description', e.target.value)} className="min-h-[80px]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Event Type</Label>
              <Select value={form.event_type} onValueChange={v => update('event_type', v)}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Consortium</Label>
              <Select value={form.center_consortium} onValueChange={v => update('center_consortium', v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {CONSORTIA.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date & Time *</Label>
              <Input type="datetime-local" value={form.start_date} onChange={e => update('start_date', e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>End Date & Time</Label>
              <Input type="datetime-local" value={form.end_date} onChange={e => update('end_date', e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Location</Label>
              <Input placeholder="City or 'Virtual'" value={form.location} onChange={e => update('location', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Virtual Link</Label>
              <Input placeholder="https://zoom.us/..." value={form.virtual_link} onChange={e => update('virtual_link', e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Max Attendees</Label>
            <Input type="number" placeholder="Unlimited" value={form.max_attendees} onChange={e => update('max_attendees', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>External Registration / Info URL</Label>
            <Input placeholder="https://..." value={form.external_url} onChange={e => update('external_url', e.target.value)} />
          </div>
          <Button type="submit" disabled={saving || !form.title || !form.start_date} className="w-full gap-2">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Create Event
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}