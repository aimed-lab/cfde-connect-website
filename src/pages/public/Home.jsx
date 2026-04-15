import { Link } from 'react-router-dom';
import { ArrowRight, Users, Calendar, FlaskConical, Building2, ExternalLink, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CFDE_PROGRAMS, CFDE_CENTERS, CFDE_RESOURCES, PROGRAM_DESCRIPTIONS } from '@/lib/cfdeData';
import heroBg from '@/assets/images/hero-bg.png';
import logoUab from '@/assets/images/logo-uab.png';
import logoCu from '@/assets/images/logo-cu-anschutz.png';
import logoUcla from '@/assets/images/logo-ucla.png';

const STATS = [
  { icon: FlaskConical, label: 'Common Fund Programs', value: CFDE_PROGRAMS.length, to: '/programs' },
  { icon: Building2,   label: 'CFDE Centers',          value: CFDE_CENTERS.length,   to: '/centers'  },
  { icon: Users,       label: 'Community Members',      value: '500+',                to: '/portal/directory' },
  { icon: Calendar,    label: 'Events Per Year',         value: '50+',                 to: '/events'   },
];

const FEATURED_PROGRAMS = CFDE_PROGRAMS.slice(0, 6);

const CORES = [
  {
    name: 'Administrative Core',
    institution: 'University of Alabama at Birmingham',
    logo: logoUab,
    desc: 'Facilitates inter-consortium communication, manages stakeholder discussions via agile project management, and coordinates community engagement across all CFDE programs.',
    to: '/team#admin',
  },
  {
    name: 'Evaluation Core',
    institution: 'University of Colorado Anschutz',
    logo: logoCu,
    desc: 'Collects standardized metrics — grants, publications, citations — from Common Fund initiatives to demonstrate collective impact to NIH and the broader research community.',
    to: '/team#eval',
  },
  {
    name: 'Sustainability Core',
    institution: 'University of California, Los Angeles',
    logo: logoUcla,
    desc: 'Leads long-term sustainability planning for CFDE data resources and platforms, ensuring continued value and access for the biomedical research community.',
    to: '/team#sustainability',
  },
];

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
              Transforming Data Into Discovery: Building a Connected Biomedical Future
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              CONNECT ICC coordinates stakeholder activities and facilitates collaboration within
              the CFDE, enhancing the potential for biomedical research transformation through
              platform coordination and data sustainability.
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

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-4">Our Mission</Badge>
          <blockquote className="font-serif text-2xl sm:text-3xl font-semibold text-foreground max-w-3xl mx-auto leading-snug">
            "The mission of the Common Fund Data Ecosystem is to connect common fund data sets
            to power AI-driven medicine."
          </blockquote>
        </div>
      </section>

      {/* Three Integrated Cores */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3">Three Integrated Cores</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              CONNECT ICC Structure
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              The Integration &amp; Coordination Center is built on three cores spanning three
              leading research institutions.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {CORES.map(({ name, institution, logo, desc, to }) => (
              <Link
                key={name}
                to={to}
                className="bg-card rounded-xl border border-border p-6 hover:shadow-md hover:border-primary/30 transition-all group flex flex-col"
              >
                <div className="h-10 flex items-center mb-4">
                  <img src={logo} alt={institution} className="h-8 w-auto object-contain" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{name}</h3>
                <p className="text-xs text-primary font-medium mb-3">{institution}</p>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{desc}</p>
                <span className="mt-4 text-xs text-primary font-medium inline-flex items-center gap-1">
                  Meet the team <ChevronRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured programs */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <Badge variant="outline" className="mb-3">Programs</Badge>
              <h2 className="font-serif text-3xl font-bold text-foreground">Common Fund Programs</h2>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link to="/programs">View all {CFDE_PROGRAMS.length} <ArrowRight className="ml-2 h-4 w-4" /></Link>
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
      <section className="py-20 bg-muted/30">
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
                  <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{name}</h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
                </div>
                <p className="text-xs text-muted-foreground">{description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">Part of the CFDE community?</h2>
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
