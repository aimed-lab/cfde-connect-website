import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CFDE_CENTERS, PROGRAM_DESCRIPTIONS } from '@/lib/cfdeData';

const CENTER_URLS = {
  "CFDE Data Resource Center (DRC)": "https://info.cfde.cloud",
  "CFDE Integration & Coordination Center (ICC)": "https://cfdeconnect.org",
  "CFDE Cloud Workspace Center (CWIC)": "https://www.nih.gov/research-training/medical-research-initiatives/common-fund",
  "CFDE Knowledge Center (KC)": "https://info.cfde.cloud",
  "CFDE Training Center (TC)": "https://www.nih.gov/research-training/medical-research-initiatives/common-fund",
};

const CENTER_SHORT = {
  "CFDE Data Resource Center (DRC)": "DRC",
  "CFDE Integration & Coordination Center (ICC)": "ICC",
  "CFDE Cloud Workspace Center (CWIC)": "CWIC",
  "CFDE Knowledge Center (KC)": "KC",
  "CFDE Training Center (TC)": "TC",
};

export default function CentersSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">CFDE Centers</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CFDE_CENTERS.map(center => (
          <a
            key={center}
            href={CENTER_URLS[center]}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <Card className="p-4 h-full hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">{CENTER_SHORT[center]}</span>
                </div>
                <div>
                  <p className="font-medium text-sm group-hover:text-primary transition-colors leading-tight">{center}</p>
                  <p className="text-xs text-muted-foreground mt-1">{PROGRAM_DESCRIPTIONS[center]}</p>
                </div>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}