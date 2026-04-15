import { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CFDE_PROGRAMS, PROGRAM_DESCRIPTIONS } from '@/lib/cfdeData';

export default function Programs() {
  const [query, setQuery] = useState('');

  const filtered = CFDE_PROGRAMS.filter((p) =>
    p.toLowerCase().includes(query.toLowerCase()) ||
    (PROGRAM_DESCRIPTIONS[p] || '').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-[hsl(217,71%,45%)] to-[hsl(217,71%,35%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/20">
            Common Fund Programs
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
            CFDE Programs
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            The NIH Common Fund supports {CFDE_PROGRAMS.length} programs that generate high-value datasets
            and resources for the research community.
          </p>
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search programs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 bg-white/95"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No programs match "{query}".</p>
          ) : (
            <>
              {query && (
                <p className="text-sm text-muted-foreground mb-6">
                  Showing {filtered.length} of {CFDE_PROGRAMS.length} programs
                </p>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((program) => (
                  <ProgramCard key={program} name={program} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer note */}
      <section className="py-10 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            Data from{' '}
            <a
              href="https://commonfund.nih.gov/dataecosystem"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              commonfund.nih.gov <ExternalLink className="h-3 w-3" />
            </a>
            {' '}and{' '}
            <a
              href="https://info.cfde.cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              info.cfde.cloud <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

function ProgramCard({ name }) {
  const description = PROGRAM_DESCRIPTIONS[name];
  const abbr = name.match(/\(([^)]+)\)/)?.[1];
  const displayName = abbr ? name.replace(/\s*\([^)]+\)/, '') : name;

  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-md hover:border-primary/30 transition-all flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-semibold text-foreground text-sm leading-snug">{displayName}</h3>
        {abbr && (
          <Badge variant="secondary" className="text-xs shrink-0">{abbr}</Badge>
        )}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground leading-relaxed flex-1">{description}</p>
      )}
    </div>
  );
}
