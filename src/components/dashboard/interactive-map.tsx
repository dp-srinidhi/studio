'use client';
import { useState, useMemo, useEffect } from 'react';
import { reports } from '@/lib/data';
import type { PotholeReport } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PotholeIcon } from '../icons';
import { Badge } from '../ui/badge';

const API_KEY = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;

export function InteractiveMap() {
  if (!API_KEY) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center p-6">
          <p className="text-muted-foreground">Map API Key is missing.</p>
          <p className="text-sm text-muted-foreground">Please add the required API Key to your .env file.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Live Pothole Map</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)] p-0 rounded-b-lg overflow-hidden">
        <div className="w-full h-full flex items-center justify-center bg-muted">
            Map placeholder
        </div>
      </CardContent>
    </Card>
  );
}
