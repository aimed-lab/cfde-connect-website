import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CFDE_CENTERS, WORKING_GROUPS, PROGRAM_DESCRIPTIONS } from '@/lib/cfdeData';

const CENTER_DETAILS = {
  'CFDE Data Resource Center (DRC)': {
    abbr: 'DRC',
    url: 'https://info.cfde.cloud',
    color: 'bg-blue-50 border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
  },
  'CFDE Integration & Coordination Center (ICC)': {
    abbr: 'ICC',
    url: 'https://cfdeconnect.org',
    color: 'bg-teal-50 border-teal-200',
    badge: 'bg-teal-100 text-teal-700',
    current: true,
  },
  'CFDE Cloud Workspace Center (CWIC)': {
    abbr: 'CWIC',
    url: 'https://info.cfde.cloud',
    color: 'bg-purple-50 border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
  },
  'CFDE Knowledge Center (KC)': {
    abbr: 'KC',
    url: 'https://info.cfde.cloud',
    color: 'bg-orange-50 border-orange-200',
    badge: 'bg-orange-100 text-orange-700',
  },
  'CFDE Training Center (TC)': {
    abbr: 'TC',
    url: 'https://info.cfde.cloud',
    color: 'bg-green-50 border-green-200',
    badge: 'bg-green-100 text-green-700',
  },
};

export default function Centers() {
  return (
    <div>
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-[hsl(168,55%,42%)] to-[hsl(168,55%,30%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/20">
            CFDE Infrastructure
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            Centers &amp; Working Groups
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Five specialized centers and nine working groups form the operational backbone of the
            CFDE ecosystem.
          </p>
        </div>
      </section>

      {/* Centers */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <Badge variant="outline" className="mb-3">Centers</Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground">CFDE Centers</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Each center serves a distinct role in building and maintaining the CFDE infrastructure.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CFDE_CENTERS.map((center) => {
              const details = CENTER_DETAILS[center] || {};
              const description = PROGRAM_DESCRIPTIONS[center];
              const displayName = center.replace(/\s*\([^)]+\)$/, '');

              return (
                <div
                  key={center}
                  className={`rounded-xl border p-5 flex flex-col ${details.color || 'bg-card border-border'}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-semibold text-foreground text-sm leading-snug">{displayName}</h3>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {details.current && (
                        <span className="text-xs font-medium text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                          This site
                        </span>
                      )}
                      {details.abbr && (
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${details.badge || 'bg-muted text-muted-foreground'}`}>
                          {details.abbr}
                        </span>
                      )}
                    </div>
                  </div>
                  {description && (
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-4">{description}</p>
                  )}
                  {details.url && !details.current && (
                    <a
                      href={details.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-auto"
                    >
                      Visit site <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Working groups */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <Badge variant="outline" className="mb-3">Collaboration</Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground">Working Groups</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Cross-program working groups tackle shared challenges across the CFDE ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {WORKING_GROUPS.map((group) => (
              <div
                key={group}
                className="bg-card rounded-xl border border-border px-4 py-3 text-center hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <p className="text-sm font-medium text-foreground">{group}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Working group membership is managed through the{' '}
            <a href="/portal/profile" className="text-primary hover:underline">member portal</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
