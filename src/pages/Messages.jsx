import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Send, ArrowLeft, MessageSquare, Search } from 'lucide-react';
import { format } from 'date-fns';

export default function Messages() {
  const queryClient = useQueryClient();
  const [selectedConvo, setSelectedConvo] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState('');
  const messagesEndRef = useRef(null);

  const urlParams = new URLSearchParams(window.location.search);
  const toEmail = urlParams.get('to');
  const toName = urlParams.get('name');

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
  });

  const { data: conversations = [], isLoading: convosLoading } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => base44.entities.Conversation.list('-updated_date', 50),
  });

  const { data: messages = [], isLoading: msgsLoading } = useQuery({
    queryKey: ['messages', selectedConvo?.id],
    queryFn: () => base44.entities.Message.filter({ conversation_id: selectedConvo.id }, 'created_date', 200),
    enabled: !!selectedConvo,
  });

  // Handle deep-link to a new conversation
  useEffect(() => {
    if (toEmail && user && conversations.length >= 0 && !convosLoading) {
      const existing = conversations.find(c =>
        c.participants?.includes(toEmail) && c.participants?.includes(user.email)
      );
      if (existing) {
        setSelectedConvo(existing);
      } else {
        // Create new conversation
        (async () => {
          const convo = await base44.entities.Conversation.create({
            participants: [user.email, toEmail],
            participant_names: [user.full_name || user.email, toName || toEmail],
          });
          queryClient.invalidateQueries({ queryKey: ['conversations'] });
          setSelectedConvo(convo);
        })();
      }
      // Clear URL params
      window.history.replaceState({}, '', '/messages');
    }
  }, [toEmail, user, conversations, convosLoading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedConvo) return;
    setSending(true);
    await base44.entities.Message.create({
      conversation_id: selectedConvo.id,
      sender_email: user.email,
      sender_name: user.full_name || user.email,
      content: newMessage.trim(),
      read_by: [user.email],
    });
    await base44.entities.Conversation.update(selectedConvo.id, {
      last_message: newMessage.trim(),
      last_message_date: new Date().toISOString(),
      last_message_by: user.email,
    });
    setNewMessage('');
    queryClient.invalidateQueries({ queryKey: ['messages', selectedConvo.id] });
    queryClient.invalidateQueries({ queryKey: ['conversations'] });
    setSending(false);
  };

  const getOtherName = (convo) => {
    const idx = convo.participants?.indexOf(user?.email);
    if (idx === 0) return convo.participant_names?.[1] || convo.participants?.[1];
    return convo.participant_names?.[0] || convo.participants?.[0];
  };

  const filteredConvos = conversations.filter(c => {
    if (!search) return true;
    const name = getOtherName(c);
    return name?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex h-full">
      {/* Conversation list */}
      <div className={`w-full md:w-80 lg:w-96 border-r flex flex-col bg-card ${selectedConvo ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b space-y-3">
          <h2 className="text-lg font-semibold">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search conversations" value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {convosLoading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 rounded-lg" />)}
            </div>
          ) : filteredConvos.length > 0 ? (
            filteredConvos.map(convo => {
              const otherName = getOtherName(convo);
              const initials = otherName?.split(' ').map(n => n[0]).join('').slice(0, 2) || '?';
              const isSelected = selectedConvo?.id === convo.id;
              return (
                <button
                  key={convo.id}
                  onClick={() => setSelectedConvo(convo)}
                  className={`w-full text-left p-4 border-b transition-colors ${isSelected ? 'bg-primary/5' : 'hover:bg-muted/50'}`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{otherName}</p>
                      {convo.last_message && (
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{convo.last_message}</p>
                      )}
                    </div>
                    {convo.last_message_date && (
                      <span className="text-[10px] text-muted-foreground flex-shrink-0">
                        {format(new Date(convo.last_message_date), 'MMM d')}
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-20" />
              <p className="text-sm">No conversations yet</p>
              <p className="text-xs mt-1">Visit the directory to message someone</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat area */}
      <div className={`flex-1 flex flex-col ${!selectedConvo ? 'hidden md:flex' : 'flex'}`}>
        {selectedConvo ? (
          <>
            <div className="p-4 border-b bg-card flex items-center gap-3">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedConvo(null)}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {getOtherName(selectedConvo)?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{getOtherName(selectedConvo)}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {msgsLoading ? (
                <div className="space-y-3">
                  {[1, 2].map(i => <Skeleton key={i} className="h-12 w-48 rounded-lg" />)}
                </div>
              ) : (
                messages.map(msg => {
                  const isMe = msg.sender_email === user?.email;
                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${isMe ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <p className="text-sm">{msg.content}</p>
                        <p className={`text-[10px] mt-1 ${isMe ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                          {format(new Date(msg.created_date), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-card">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={!newMessage.trim() || sending} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p className="font-medium">Select a conversation</p>
              <p className="text-sm mt-1">Or start a new one from the directory</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}