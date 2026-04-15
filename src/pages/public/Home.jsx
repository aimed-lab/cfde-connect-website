import { Link } from 'react-router-dom';
import { ArrowRight, Users, Calendar, FlaskConical, Building2, ExternalLink, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CFDE_PROGRAMS, CFDE_CENTERS, CFDE_RESOURCES, PROGRAM_DESCRIPTIONS } from '@/lib/cfdeData';
import heroBg from '@/assets/images/hero-bg.png';

const STATS = [
  { icon: FlaskConical, label: 'Common Fund Programs', value: CFDE_PROGRAMS.length, to: '/programs' },
  { icon: Building2, label: 'CFDE Centers', value: CFDE_CENTERS.length, to: '/centers' },
  { icon: Users, label: 'Community Members', value: '500+', to: '/portal/directory' },
  { icon: Calendar, label: 'Events Per Year', value: '50+', to: '/events' },
];

const FEATURED_PROGRAMS = CFDE_PROGRAMS.slice(0, 6);

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[580px] flex items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(215,25%,8%)]/85 via-[hsl(215,25%,8%)]/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/30 hover:bg-accent/20">
              NIH Common Fund Data Ecosystem
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Connecting CFDE Programs, People &amp; Data
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              CFDE Connect is the hub for the NIH Common Fund Data Ecosystem community —
              facilitating collaboration, sharing resources, and advancing biomedical discovery
              across 19 Common Fund programs.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/about">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
                <Link to="/portal">Member Portal</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border">
            {STATS.map(({ icon: Icon, label, value, to }) => (
              <Link
                key={label}
                to={to}
                className="flex flex-col items-center py-8 px-4 text-center hover:bg-muted/50 transition-colors group"
              >
                <Icon className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-2xl font-bold text-foreground">{value}</span>
                <span className="text-sm text-muted-foreground mt-1">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About blurb */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">About CFDE</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
                The Common Fund Data Ecosystem
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The NIH Common Fund Data Ecosystem (CFDE) connects data, tools, and communities from 19 Common
                Fund programs. By making these data findable, accessible, interoperable, and reusable (FAIR),
                the CFDE enables researchers to leverage the full breadth of NIH investments.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The Integration &amp; Coordination Center (ICC) coordinates operations, evaluation, and
                sustainability across the CFDE — bringing together institutions including UAB, CU Anschutz,
                and UCLA.
              </p>
              <Button asChild variant="outline">
                <Link to="/about">
                  About the ICC <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Inter-Consortium Communication', desc: 'Facilitating collaboration and knowledge sharing across all CFDE programs.' },
                { title: 'Operations & Governance', desc: 'Developing guidelines and management systems for CFDE-wide coordination.' },
                { title: 'Evaluation & Metrics', desc: 'Measuring impact and gathering standardized metrics across CF programs.' },
                { title: 'Team Science', desc: 'Advancing best practices and frameworks for distributed scientific teams.' },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-card rounded-xl border border-border p-5">
                  <h3 className="font-semibold text-foreground text-sm mb-2">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured programs */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <Badge variant="outline" className="mb-3">Programs</Badge>
              <h2 className="font-serif text-3xl font-bold text-foreground">Common Fund Programs</h2>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link to="/programs">View all {CFDE_PROGRAMS.length} programs <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED_PROGRAMS.map((program) => (
              <div key={program} className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-foreground text-sm mb-2">{program}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {PROGRAM_DESCRIPTIONS[program]}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 sm:hidden">
            <Button asChild variant="outline" className="w-full">
              <Link to="/programs">View all {CFDE_PROGRAMS.length} programs <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-3">Tools</Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground">CFDE Tools &amp; Resources</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Open platforms and tools to explore, integrate, and analyze Common Fund data.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CFDE_RESOURCES.map(({ name, url, description }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card rounded-xl border border-border p-5 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                    {name}
                  </h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
                </div>
                <p className="text-xs text-muted-foreground">{description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Part of the CFDE community?
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Log in to the member portal to connect with colleagues, RSVP to events, and access
            community resources.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
            <Link to="/portal">Access the Portal</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
