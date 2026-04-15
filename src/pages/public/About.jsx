import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import aboutBg from '@/assets/images/about-bg.jpg';

const WORK_AREAS = [
  {
    title: 'Inter-Consortium Communication & Events',
    items: [
      'Organizing cross-program meetings and workshops',
      'Managing CFDE all-hands and working group sessions',
      'Facilitating communication channels across consortia',
    ],
  },
  {
    title: 'Operation Guidelines & Management Systems',
    items: [
      'Developing CFDE-wide standard operating procedures',
      'Managing project tracking and reporting systems',
      'Coordinating governance and compliance processes',
    ],
  },
  {
    title: 'Communication Strategies',
    items: [
      'Maintaining CFDE community platforms and portals',
      'Creating newsletters, announcements, and updates',
      'Managing external communications and outreach',
    ],
  },
  {
    title: 'Team Science Practices',
    items: [
      'Advancing best practices for distributed collaboration',
      'Supporting onboarding and training for community members',
      'Promoting inclusive and equitable team environments',
    ],
  },
];

const INSTITUTIONS = [
  { name: 'University of Alabama at Birmingham (UAB)', role: 'Administrative & Informatics Lead' },
  { name: 'University of Colorado Anschutz (CU Anschutz)', role: 'Evaluation Core Lead' },
  { name: 'University of California, Los Angeles (UCLA)', role: 'Partner Institution' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative py-24 bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutBg})` }}
      >
        <div className="absolute inset-0 bg-[hsl(215,25%,8%)]/75" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30 hover:bg-accent/20">
            About CFDE Connect
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
            Integration &amp; Coordination Center
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            The ICC connects people, programs, and data across the NIH Common Fund Data Ecosystem —
            enabling collaboration at scale.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Our Mission</Badge>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                What is the CFDE?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The NIH Common Fund Data Ecosystem (CFDE) is an initiative to make data from NIH Common
                Fund programs more findable, accessible, interoperable, and reusable (FAIR). With 19
                programs generating vast amounts of biomedical data, the CFDE creates the infrastructure
                to connect and leverage these resources.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The CFDE Integration &amp; Coordination Center (ICC) serves as the operational backbone
                of this ecosystem — coordinating across programs, facilitating community building, and
                ensuring long-term sustainability of CFDE resources.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                CFDE Connect, our community portal, enables researchers and staff across all CFDE-affiliated
                programs to connect, collaborate, and stay informed.
              </p>
            </div>
            <div className="bg-muted/30 rounded-2xl p-8 border border-border">
              <h3 className="font-semibold text-foreground mb-6">Partner Institutions</h3>
              <div className="space-y-4">
                {INSTITUTIONS.map(({ name, role }) => (
                  <div key={name} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground text-sm">{name}</p>
                      <p className="text-xs text-muted-foreground">{role}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Part of our team? Join the community portal to access all collaboration tools.
                </p>
                <Button asChild size="sm">
                  <Link to="/portal">Access the Portal <ChevronRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key work areas */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3">Our Work</Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground">Key Work Areas</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              The ICC focuses on four interconnected areas to support the CFDE community.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {WORK_AREAS.map(({ title, items }) => (
              <div key={title} className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">{title}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Meet the Team</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Learn about the people behind the CFDE Integration &amp; Coordination Center.
          </p>
          <Button asChild variant="outline">
            <Link to="/team">View Team <ChevronRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
