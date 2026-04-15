import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const TOPICS = [
  'General inquiry',
  'Member portal access',
  'Events & meetings',
  'CFDE programs',
  'Data & resources',
  'Other',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Placeholder: replace with Base44 function or email service call
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div>
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-[hsl(215,25%,12%)] to-[hsl(215,25%,22%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-white/10 text-white/90 border-white/20 hover:bg-white/10">
            Get in Touch
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Questions about CFDE Connect, the member portal, or the ICC? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="font-semibold text-foreground mb-2">CFDE ICC</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The CFDE Integration &amp; Coordination Center is based at the University of Alabama
                  at Birmingham, with partners at CU Anschutz and UCLA.
                </p>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-foreground">Portal Access</p>
                  <p className="text-muted-foreground">
                    For questions about logging in or accessing the member portal, please use the form.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Events</p>
                  <p className="text-muted-foreground">
                    CFDE events are listed on the{' '}
                    <a href="/events" className="text-primary hover:underline">Events page</a>. RSVP
                    requires a portal account.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Programs</p>
                  <p className="text-muted-foreground">
                    For questions about specific CFDE programs, visit the{' '}
                    <a href="/programs" className="text-primary hover:underline">Programs page</a> for
                    direct links to each program's resources.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle2 className="h-12 w-12 text-accent mb-4" />
                  <h3 className="font-semibold text-foreground text-xl mb-2">Message sent!</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Thanks for reaching out. We'll get back to you as soon as possible.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', topic: '', message: '' }); }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@institution.edu"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="topic">Topic</Label>
                    <select
                      id="topic"
                      name="topic"
                      value={form.topic}
                      onChange={handleChange}
                      required
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="" disabled>Select a topic</option>
                      {TOPICS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can we help?"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? (
                      <>Sending...</>
                    ) : (
                      <><Send className="h-4 w-4 mr-2" /> Send Message</>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
