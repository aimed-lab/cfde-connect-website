import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CFDE_PROGRAMS, CFDE_CENTERS, PROGRAM_DESCRIPTIONS } from '@/lib/cfdeData';

export default function ConsortiaModal({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>CFDE Consortia & Centers</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="consortia">
          <TabsList className="w-full">
            <TabsTrigger value="consortia" className="flex-1">
              Consortia ({CFDE_PROGRAMS.length})
            </TabsTrigger>
            <TabsTrigger value="centers" className="flex-1">
              Centers ({CFDE_CENTERS.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consortia" className="mt-4 space-y-2">
            {CFDE_PROGRAMS.map(prog => (
              <div key={prog} className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
                <Badge variant="outline" className="text-xs shrink-0 mt-0.5">{prog}</Badge>
                <p className="text-sm text-muted-foreground">{PROGRAM_DESCRIPTIONS[prog]}</p>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="centers" className="mt-4 space-y-2">
            {CFDE_CENTERS.map(center => (
              <div key={center} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5">
                <Badge className="text-xs shrink-0 mt-0.5 bg-primary/10 text-primary border-primary/20">{center}</Badge>
                <p className="text-sm text-muted-foreground">{PROGRAM_DESCRIPTIONS[center]}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}