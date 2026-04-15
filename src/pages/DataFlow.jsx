import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { CFDE_PROGRAMS } from '@/lib/cfdeData';

// Programs that appear in the Sankey diagram (subset with short names)
const SANKEY_PROGRAMS = [
  { label: '4DN', full: '4D Nucleome (4DN)' },
  { label: 'A2CPS', full: 'A2CPS' },
  { label: 'Bridge2AI', full: 'Bridge2AI' },
  { label: 'ExRNA', full: 'ExRNA' },
  { label: 'GlyGen', full: 'GlyGen' },
  { label: 'GTEx', full: 'GTEx' },
  { label: 'HMP', full: 'HMP' },
  { label: 'HuBMAP', full: 'HuBMAP' },
  { label: 'IDG', full: 'IDG' },
  { label: 'Kids First', full: 'Kids First' },
  { label: 'KOMP2', full: 'KOMP2' },
  { label: 'LINCS', full: 'LINCS' },
  { label: 'Metabolomics', full: 'Metabolomics' },
  { label: 'MoTrPAC', full: 'MoTrPAC' },
  { label: 'SPARC', full: 'SPARC' },
  { label: 'SenNet', full: 'SenNet' },
];

export default function DataFlow() {
  const [selected, setSelected] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const sankeyUrl = 'https://cfde-sankey.github.io/';

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif">CFDE Data Flow</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Explore how CFDE programs connect to data types, tags, and suggested repositories
          </p>
        </div>
        <a href={sankeyUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="gap-2 shrink-0">
            <ExternalLink className="h-4 w-4" />
            Open Full Screen
          </Button>
        </a>
      </div>

      {/* Info toggle */}
      <button
        onClick={() => setShowInfo(v => !v)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <Info className="h-4 w-4" />
        What does this diagram show?
        {showInfo ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>
      {showInfo && (
        <Card className="p-4 text-sm text-muted-foreground bg-muted/40 border-dashed space-y-1">
          <p>This Sankey diagram visualizes the flow from <strong className="text-foreground">CFDE Programs</strong> → <strong className="text-foreground">C2M2 Data Types</strong> → <strong className="text-foreground">Descriptive Tags</strong> → <strong className="text-foreground">Suggested Repositories</strong>.</p>
          <p>Click any node in the diagram to highlight its connections. Use the program filter below to jump to a specific consortium's data footprint.</p>
        </Card>
      )}

      {/* Program filter chips */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Filter by Program — click to highlight in diagram
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelected(null)}
            className={`px-3 py-1 rounded-full text-xs border transition-colors ${
              selected === null
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-muted-foreground border-border hover:border-primary hover:text-primary'
            }`}
          >
            All Programs
          </button>
          {SANKEY_PROGRAMS.map(({ label, full }) => (
            <button
              key={label}
              onClick={() => setSelected(selected === label ? null : label)}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                selected === label
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-muted-foreground border-border hover:border-primary hover:text-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Selected callout */}
      {selected && (
        <Card className="p-4 flex items-start gap-3 bg-primary/5 border-primary/20">
          <Badge className="bg-primary/10 text-primary border-primary/20 shrink-0">{selected}</Badge>
          <div className="text-sm">
            <p className="font-medium text-foreground">
              {SANKEY_PROGRAMS.find(p => p.label === selected)?.full}
            </p>
            <p className="text-muted-foreground mt-0.5">
              In the diagram below, locate <strong>{selected}</strong> in the left column to trace its data types and suggested repositories. You can click the node to highlight all connections.
            </p>
          </div>
        </Card>
      )}

      {/* Embedded diagram */}
      <Card className="overflow-hidden border shadow-sm">
        <div className="bg-muted/30 border-b px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-muted-foreground font-mono">cfde-sankey.github.io</span>
          <a href={sankeyUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        <iframe
          src={sankeyUrl}
          title="CFDE Data Flow Sankey Diagram"
          className="w-full"
          style={{ height: '80vh', border: 'none' }}
          loading="lazy"
        />
      </Card>
    </div>
  );
}