'use client';
import { useRef, useEffect, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { reports, zones } from '@/lib/data';
import { wards } from '@/lib/wards';
import { Skeleton } from '@/components/ui/skeleton';
import type { Zone } from '@/lib/types';

const API_KEY = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;

function getZoneForWard(wardId: number, allZones: Zone[]): Zone | undefined {
    // This mapping is based on the GCC zone definitions.
    if (wardId >= 1 && wardId <= 14) return allZones.find(z => z.name === 'Thiruvottiyur');
    if (wardId >= 15 && wardId <= 21) return allZones.find(z => z.name === 'Manali');
    if (wardId >= 22 && wardId <= 33) return allZones.find(z => z.name === 'Madhavaram');
    if (wardId >= 34 && wardId <= 48) return allZones.find(z => z.name === 'Tondiarpet');
    if (wardId >= 49 && wardId <= 63) return allZones.find(z => z.name === 'Royapuram');
    if (wardId >= 64 && wardId <= 78) return allZones.find(z => z.name === 'Thiru-Vi-Ka Nagar');
    if (wardId >= 79 && wardId <= 93) return allZones.find(z => z.name === 'Ambattur');
    if (wardId >= 94 && wardId <= 108) return allZones.find(z => z.name === 'Anna Nagar');
    if (wardId >= 109 && wardId <= 126) return allZones.find(z => z.name === 'Teynampet');
    if (wardId >= 127 && wardId <= 142) return allZones.find(z => z.name === 'Kodambakkam');
    if (wardId >= 143 && wardId <= 155) return allZones.find(z => z.name === 'Valasaravakkam');
    if (wardId >= 156 && wardId <= 167) return allZones.find(z => z.name === 'Alandur');
    if (wardId >= 170 && wardId <= 182) return allZones.find(z => z.name === 'Adyar');
    if ((wardId >= 183 && wardId <= 191) || wardId === 168 || wardId === 169) return allZones.find(z => z.name === 'Perungudi');
    if (wardId >= 192 && wardId <= 200) return allZones.find(z => z.name === 'Sholinganallur');
    return undefined;
}


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

          // Add ward markers
          wards.forEach(ward => {
            const el = document.createElement('div');
            el.className = 'w-2 h-2 rounded-full border-2 border-white';
            const zone = getZoneForWard(ward.id, zones);
            if (zone) {
              el.style.backgroundColor = zone.color;
            } else {
              el.style.backgroundColor = '#808080'; // Default gray for unassigned
            }

            new tt.Marker({ element: el })
              .setLngLat([ward.location.lng, ward.location.lat])
              .setPopup(new tt.Popup({ offset: 25 }).setHTML(`
                <div class="p-1">
                  <h4 class="font-bold text-xs text-foreground">Ward ${ward.id}: ${ward.name}</h4>
                </div>
              `))
              .addTo(map);
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
        <CardTitle>Live Pothole & Ward Map</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 rounded-b-lg overflow-hidden">
        {loading && <Skeleton className="h-full w-full" />}
        <div ref={mapContainer} className="map-container h-full w-full" style={{ display: loading ? 'none' : 'block' }} />
      </CardContent>
    </Card>
  );
}
