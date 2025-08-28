'use client';
import { useState, useRef, useEffect } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import { renderToStaticMarkup } from 'react-dom/server';
import { reports } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PotholeIcon } from '@/components/icons';

const API_KEY = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;

export function InteractiveMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<tt.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const position = { lat: 13.06, lng: 80.25 }; // Approx center of Chennai

  useEffect(() => {
    if (!API_KEY || !mapContainer.current || mapRef.current) return;

    const map = tt.map({
      key: API_KEY,
      container: mapContainer.current,
      center: [position.lng, position.lat],
      zoom: 10,
      style: 'tomtom://vector/1/basic-main'
    });

    map.on('load', () => {
      setMapLoaded(true);
      reports.forEach(report => {
        const iconMarkup = renderToStaticMarkup(
            <PotholeIcon className="h-8 w-8 text-destructive" />
        );
        const iconElement = document.createElement('div');
        iconElement.innerHTML = iconMarkup;

        const popup = new tt.Popup({ offset: 25 }).setHTML(`
          <div class="p-2 max-w-xs">
            <h4 class="font-bold text-sm text-foreground">${report.address}</h4>
            <p class="text-xs text-muted-foreground">${report.description}</p>
            <p class="text-xs mt-1 text-muted-foreground">
              Severity: <span class="font-semibold text-foreground">${report.severity}</span>
            </p>
          </div>
        `);

        new tt.Marker({ element: iconElement })
          .setLngLat([report.location.lng, report.location.lat])
          .setPopup(popup)
          .addTo(map);
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  if (!API_KEY) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center p-6">
          <p className="text-muted-foreground">Map API Key is missing.</p>
          <p className="text-sm text-muted-foreground">
            Please add NEXT_PUBLIC_TOMTOM_API_KEY to your .env file.
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
