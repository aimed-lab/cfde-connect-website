import { ExternalLink, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ADMIN_CORE = [
  {
    name: 'Jake Y. Chen',
    title: 'Principal Investigator',
    institution: 'University of Alabama at Birmingham (UAB)',
    department: 'Informatics Institute',
    bio: 'Professor Jake Y. Chen leads the Administrative Core of the CFDE Integration & Coordination Center at UAB. He brings extensive expertise in bioinformatics, data science, and large-scale biomedical research coordination.',
    links: [],
  },
  {
    name: 'Swathi Thaker',
    title: 'Operations Manager',
    institution: 'University of Alabama at Birmingham (UAB)',
    department: 'CFDE Integration & Coordination Center',
    bio: 'Swathi Thaker manages day-to-day operations of the CFDE ICC, overseeing project coordination, team communications, and administrative processes across the consortium.',
    links: [],
  },
  {
    name: 'Zhandos Sembay',
    title: 'Informatics Analyst',
    institution: 'University of Alabama at Birmingham (UAB)',
    department: 'CFDE Integration & Coordination Center',
    bio: 'Zhandos Sembay supports the informatics and data management activities of the CFDE ICC, developing tools and systems to facilitate community collaboration and data coordination.',
    links: [],
  },
];

const EVAL_CORE = [
  {
    name: 'Casey S. Greene',
    title: 'Evaluation Core Lead',
    institution: 'University of Colorado Anschutz Medical Campus',
    department: 'Department of Biomedical Informatics',
    bio: 'Professor Casey Greene leads the Evaluation Core, developing metrics and frameworks to measure the impact of CFDE investments across Common Fund programs. His lab focuses on applying computational methods to biomedical data.',
    links: [
      { label: 'GitHub', url: 'https://nih-cfde.github.io/icc-eval-coordination/' },
    ],
  },
  {
    name: 'Sean Davis',
    title: 'Evaluation Core Co-Investigator',
    institution: 'University of Colorado Anschutz Medical Campus',
    department: 'Department of Biomedical Informatics',
    bio: 'Professor Sean Davis co-leads the Evaluation Core, contributing expertise in bioinformatics, data standards, and open science practices to the CFDE evaluation framework.',
    links: [],
  },
];

const CORES = [
  {
    name: 'Administrative Core',
    description:
      'Facilitates inter-consortium communication, manages operations, and coordinates activities across all CFDE programs and centers.',
    members: ADMIN_CORE,
  },
  {
    name: 'Evaluation Core',
    description:
      'Gathers metrics and measures the impact of Common Fund investments, developing standardized evaluation frameworks across programs.',
    members: EVAL_CORE,
  },
];

function PersonCard({ person }) {
  const initials = person.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <div className="bg-card rounded-xl border border-border p-6 flex flex-col">
      {/* Avatar */}
      <div className="flex items-center gap-4 mb-4">
        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <span className="font-semibold text-primary text-lg">{initials}</span>
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{person.name}</h3>
          <p className="text-sm text-primary">{person.title}</p>
        </div>
      </div>

      <div className="mb-3 space-y-0.5">
        <p className="text-xs font-medium text-foreground">{person.institution}</p>
        <p className="text-xs text-muted-foreground">{person.department}</p>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{person.bio}</p>

      {person.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {person.links.map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              {label} <ExternalLink className="h-3 w-3" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Team() {
  return (
    <div>
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-[hsl(215,25%,12%)] to-[hsl(215,25%,20%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-white/10 text-white/90 border-white/20 hover:bg-white/10">
            The People
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Our Team
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            The CFDE Integration &amp; Coordination Center is staffed by researchers and
            professionals across three partner institutions.
          </p>
        </div>
      </section>

      {/* Cores */}
      {CORES.map(({ name, description, members }) => (
        <section key={name} className="py-16 bg-background odd:bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Badge variant="outline" className="mb-3">{name}</Badge>
              <h2 className="font-serif text-2xl font-bold text-foreground">{name}</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">{description}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {members.map((person) => (
                <PersonCard key={person.name} person={person} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Contact CTA */}
      <section className="py-14 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Get in touch</h2>
          <p className="text-muted-foreground mb-5 max-w-md mx-auto">
            Questions about CFDE Connect or the ICC? Reach out to the team.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
