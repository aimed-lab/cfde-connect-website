import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { FolderOpen, FileText, Upload, Download, Trash2, Plus, ArrowLeft, Loader2, Box } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { ALL_AFFILIATIONS } from '@/lib/cfdeData';

function invoke(action, extra = {}) {
  return base44.functions.invoke('boxMeetingNotes', { action, ...extra }).then(r => r.data);
}

export default function MeetingNotes() {
  const { data: user } = useQuery({ queryKey: ['me'], queryFn: () => base44.auth.me() });
  const isAdmin = user?.role === 'admin';

  const [selectedFolder, setSelectedFolder] = useState(null); // { id, name }
  const [uploadOpen, setUploadOpen] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', consortium: '' });
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const qc = useQueryClient();

  const { data: foldersData, isLoading: foldersLoading } = useQuery({
    queryKey: ['box-folders'],
    queryFn: () => invoke('list_folders'),
    enabled: isAdmin,
  });

  const { data: filesData, isLoading: filesLoading } = useQuery({
    queryKey: ['box-files', selectedFolder?.id],
    queryFn: () => invoke('list_files', { folderId: selectedFolder.id }),
    enabled: !!selectedFolder,
  });

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    await invoke('upload_note', {
      consortiumName: form.consortium,
      noteTitle: form.title,
      noteContent: form.content,
    });
    toast.success('Meeting note uploaded to Box');
    qc.invalidateQueries({ queryKey: ['box-folders'] });
    qc.invalidateQueries({ queryKey: ['box-files'] });
    setForm({ title: '', content: '', consortium: '' });
    setUploadOpen(false);
    setUploading(false);
  };

  const handleDownload = async (file) => {
    const { downloadUrl } = await invoke('get_download_url', { fileId: file.id });
    if (downloadUrl) window.open(downloadUrl, '_blank');
  };

  const handleDelete = async (fileId) => {
    setDeletingId(fileId);
    await invoke('delete_file', { fileId });
    toast.success('File deleted');
    qc.invalidateQueries({ queryKey: ['box-files', selectedFolder?.id] });
    setDeletingId(null);
  };

  if (!isAdmin) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold font-serif mb-2">Meeting Notes</h1>
        <p className="text-muted-foreground">Admin access required to manage meeting notes.</p>
      </div>
    );
  }

  const folders = foldersData?.folders?.filter(f => f.type === 'folder') || [];
  const files = filesData?.files || [];

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Box className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold font-serif">Meeting Notes</h1>
          </div>
          <p className="text-sm text-muted-foreground">Synced to Box — organized by consortia</p>
        </div>
        <Button onClick={() => setUploadOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Upload Note
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Folder list */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Consortia Folders</h2>
          {foldersLoading ? (
            [1, 2, 3].map(i => <Skeleton key={i} className="h-12 rounded-lg" />)
          ) : folders.length === 0 ? (
            <Card className="p-4 text-center text-sm text-muted-foreground">
              No folders yet. Upload a note to create one.
            </Card>
          ) : (
            folders.map(folder => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                  selectedFolder?.id === folder.id
                    ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'bg-card hover:bg-muted border-border'
                }`}
              >
                <FolderOpen className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm font-medium truncate">{folder.name}</span>
              </button>
            ))
          )}
        </div>

        {/* Files panel */}
        <div className="lg:col-span-2 space-y-3">
          {!selectedFolder ? (
            <Card className="p-8 text-center text-muted-foreground">
              <FolderOpen className="h-10 w-10 mx-auto mb-3 opacity-20" />
              <p className="text-sm">Select a consortia folder to view meeting notes</p>
            </Card>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <button onClick={() => setSelectedFolder(null)} className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <h2 className="font-semibold">{selectedFolder.name}</h2>
                <Badge variant="outline" className="text-xs">{files.length} files</Badge>
              </div>
              {filesLoading ? (
                [1, 2, 3].map(i => <Skeleton key={i} className="h-14 rounded-lg" />)
              ) : files.length === 0 ? (
                <Card className="p-6 text-center text-sm text-muted-foreground">No notes in this folder yet.</Card>
              ) : (
                files.map(file => (
                  <Card key={file.id} className="p-4 flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      {file.modified_at && (
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(file.modified_at), 'MMM d, yyyy')}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleDownload(file)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(file.id)}
                        disabled={deletingId === file.id}
                      >
                        {deletingId === file.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </>
          )}
        </div>
      </div>

      {/* Upload Dialog */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload Meeting Note</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="space-y-2">
              <Label>Consortia / Program *</Label>
              <Select value={form.consortium} onValueChange={v => setForm(f => ({ ...f, consortium: v }))}>
                <SelectTrigger><SelectValue placeholder="Select consortium" /></SelectTrigger>
                <SelectContent>
                  {ALL_AFFILIATIONS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Note Title *</Label>
              <Input
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="e.g. March 2026 All-Hands Notes"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Content *</Label>
              <Textarea
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                placeholder="Paste or type meeting notes here..."
                className="min-h-[160px]"
                required
              />
            </div>
            <Button type="submit" disabled={uploading || !form.consortium || !form.title || !form.content} className="w-full gap-2">
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              Upload to Box
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}