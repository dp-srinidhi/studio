'use client';
import { useState, useMemo } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { reports } from '@/lib/data';
import type { PotholeReport } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function PotholeMarker({ report }: { report: PotholeReport }) {
  const [open, setOpen] = useState(false);
  const position = useMemo(() => ({ lat: report.location.lat, lng: report.location.lng }), [report]);

  return (
    <>
      <AdvancedMarker
        position={position}
        onClick={() => setOpen(true)}
      />
      {open && (
        <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
          <div className="p-2 max-w-xs">
            <h4 className="font-bold text-sm text-foreground">{report.address}</h4>
            <p className="text-xs text-muted-foreground">{report.description}</p>
            <p className="text-xs mt-1 text-muted-foreground">
              Severity: <span className="font-semibold text-foreground">{report.severity}</span>
            </p>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export function InteractiveMap() {
  const position = { lat: 13.06, lng: 80.25 }; // Approx center of Chennai

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
        <APIProvider apiKey={API_KEY}>
          <Map
            defaultCenter={position}
            defaultZoom={10}
            mapId="chennai_road_watch_map"
            gestureHandling={'greedy'}
            disableDefaultUI={true}
          >
            {reports.map((report) => (
              <PotholeMarker key={report.id} report={report} />
            ))}
          </Map>
        </APIProvider>
      </CardContent>
    </Card>
  );
}
