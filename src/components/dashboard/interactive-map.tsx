'use client';
import { useRef, useEffect, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { reports, zones } from '@/lib/data';
import type { PotholeReport } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const API_KEY = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;

export function InteractiveMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<tt.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const position = { lat: 13.06, lng: 80.25 }; // Approx center of Chennai

  useEffect(() => {
    if (!API_KEY) {
      console.error("TomTom API key is missing.");
      setLoading(false);
      return;
    }

    if (mapContainer.current && !mapRef.current) {
        const map = tt.map({
            key: API_KEY,
            container: mapContainer.current,
            center: [position.lng, position.lat],
            zoom: 10,
        });
        mapRef.current = map;

        map.on('load', () => {
          setLoading(false);

          zones.forEach((zone, index) => {
            const size = 0.02; // Adjust size of the polygon
            const center = zone.center;
            const coordinates = [[
              [center.lng - size, center.lat + size],
              [center.lng + size, center.lat + size],
              [center.lng + size, center.lat - size],
              [center.lng - size, center.lat - size],
              [center.lng - size, center.lat + size]
            ]];
            
            const sourceId = `zone-source-${index}`;
            const fillLayerId = `zone-layer-fill-${index}`;
            const outlineLayerId = `zone-layer-outline-${index}`;

            map.addSource(sourceId, {
              'type': 'geojson',
              'data': {
                'type': 'Feature',
                'geometry': {
                  'type': 'Polygon',
                  'coordinates': coordinates
                },
                'properties': {
                  'color': zone.color,
                  'name': zone.name
                }
              }
            });

            map.addLayer({
              'id': fillLayerId,
              'type': 'fill',
              'source': sourceId,
              'layout': {},
              'paint': {
                'fill-color': zone.color,
                'fill-opacity': 0.2
              }
            });
  
            map.addLayer({
              'id': outlineLayerId,
              'type': 'line',
              'source': sourceId,
              'layout': {},
              'paint': {
                'line-color': zone.color,
                'line-width': 2
              }
            });
          });

          // Add report markers
          reports.forEach(report => {
              new tt.Marker({ color: '#228B22' }) // ForestGreen color for the pin
              .setLngLat([report.location.lng, report.location.lat])
              .setPopup(new tt.Popup({ offset: 25 }).setHTML(`
                  <div class="p-2 max-w-xs">
                  <h4 class="font-bold text-sm text-foreground">${report.address}</h4>
                  <p class="text-xs text-muted-foreground">${report.description}</p>
                  <p class="text-xs mt-1 text-muted-foreground">
                      Severity: <span class="font-semibold text-foreground">${report.severity}</span>
                  </p>
                  </div>
              `))
              .addTo(map);
          });
        })
    }

    return () => {
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Live Pothole Map</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 rounded-b-lg overflow-hidden">
        {loading && <Skeleton className="h-full w-full" />}
        <div ref={mapContainer} className="map-container h-full w-full" style={{ display: loading ? 'none' : 'block' }} />
      </CardContent>
    </Card>
  );
}
