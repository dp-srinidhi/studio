'use client';
import { useRef, useEffect, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const API_KEY = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;

// Starting point for our rover
const initialPosition = { lat: 13.06, lng: 80.25 };

export function LiveRoverMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<tt.Map | null>(null);
  const markerRef = useRef<tt.Marker | null>(null);
  const [loading, setLoading] = useState(true);

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
        center: [initialPosition.lng, initialPosition.lat],
        zoom: 14,
      });

      mapRef.current = map;

      map.on('load', () => {
        setLoading(false);
        // Add the rover marker
        const marker = new tt.Marker({ color: '#FF0000' }) // Red color for the rover
          .setLngLat([initialPosition.lng, initialPosition.lat])
          .addTo(map);
        markerRef.current = marker;
      });
    }

    // Simulate live data by updating the marker position every 3 seconds
    const interval = setInterval(() => {
      if (markerRef.current) {
        const currentLngLat = markerRef.current.getLngLat();
        const newLng = currentLngLat.lng + (Math.random() - 0.5) * 0.001;
        const newLat = currentLngLat.lat + (Math.random() - 0.5) * 0.001;
        markerRef.current.setLngLat([newLng, newLat]);
        
        // Optionally, center the map on the new position
        // mapRef.current?.panTo([newLng, newLat]);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
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
    <Card className="h-full w-full">
      <CardContent className="h-full w-full p-0 rounded-b-lg overflow-hidden">
        {loading && <Skeleton className="h-full w-full" />}
        <div ref={mapContainer} className="map-container h-full w-full" style={{ display: loading ? 'none' : 'block' }} />
      </CardContent>
    </Card>
  );
}
