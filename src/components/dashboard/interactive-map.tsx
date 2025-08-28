'use client';
import { useState, useRef, useEffect } from 'react';
import { reports } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PotholeIcon } from '@/components/icons';
import { renderToStaticMarkup } from 'react-dom/server';


const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export function InteractiveMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const position = { lat: 13.06, lng: 80.25 }; // Approx center of Chennai

  useEffect(() => {
    if (!API_KEY || !mapContainer.current || mapRef.current || !window.google) return;

    const map = new window.google.maps.Map(mapContainer.current, {
      center: position,
      zoom: 11,
      mapId: 'DEMO_MAP_ID',
    });

    reports.forEach(report => {
      const potholeIcon = document.createElement('div');
      potholeIcon.innerHTML = renderToStaticMarkup(
        <PotholeIcon className="h-8 w-8 text-destructive" />
      );

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: report.location,
        title: report.address,
        content: potholeIcon,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2 max-w-xs">
            <h4 class="font-bold text-sm text-foreground">${report.address}</h4>
            <p class="text-xs text-muted-foreground">${report.description}</p>
            <p class="text-xs mt-1 text-muted-foreground">
              Severity: <span class="font-semibold text-foreground">${report.severity}</span>
            </p>
          </div>
        `,
      });

      marker.addListener('gmp-click', () => {
        infoWindow.open(map, marker);
      });
    });

    mapRef.current = map;

  }, []);

  if (!API_KEY) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center p-6">
          <p className="text-muted-foreground">Map API Key is missing.</p>
          <p className="text-sm text-muted-foreground">
            Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file.
          </p>
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
        <div ref={mapContainer} className="map-container h-full w-full" />
      </CardContent>
    </Card>
  );
}
