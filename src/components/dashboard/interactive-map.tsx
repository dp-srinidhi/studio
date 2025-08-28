'use client';
import { useEffect, useRef } from 'react';
import type { PotholeReport } from '@/lib/types';
import { reports } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const API_KEY = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;

declare var tomtom: any;

export function InteractiveMap() {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!API_KEY || !mapElement.current || typeof tomtom === 'undefined') {
      return;
    }

    if (mapRef.current) return; // a map is already initialized

    const map = tomtom.map({
      key: API_KEY,
      container: mapElement.current,
      center: [80.25, 13.06], // Approx center of Chennai
      zoom: 10,
    });
    
    mapRef.current = map;

    // Add markers for each pothole report
    reports.forEach((report: PotholeReport) => {
      const popup = new tomtom.Popup({ offset: [0, -30] }).setHTML(`
        <div class="p-2">
          <h4 class="font-bold text-sm">${report.address}</h4>
          <p class="text-xs">${report.description}</p>
          <p class="text-xs mt-1">Severity: <span class="font-semibold">${report.severity}</span></p>
        </div>
      `);

      new tomtom.Marker()
        .setLngLat([report.location.lng, report.location.lat])
        .setPopup(popup)
        .addTo(map);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  if (!API_KEY) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center p-6">
          <p className="text-muted-foreground">Map API Key is missing.</p>
          <p className="text-sm text-muted-foreground">Please add NEXT_PUBLIC_TOMTOM_API_KEY to your .env file.</p>
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
        <div ref={mapElement} className="w-full h-full" />
      </CardContent>
    </Card>
  );
}
