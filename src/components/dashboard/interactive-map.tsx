'use client';
import { useState, useMemo } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { reports, zones } from '@/lib/data';
import type { PotholeReport } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PotholeIcon } from '../icons';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const CHENNAI_CENTER = { lat: 13.0827, lng: 80.2707 };

function PotholeMarker({ report }: { report: PotholeReport }) {
  const [open, setOpen] = useState(false);

  const color = useMemo(() => {
    switch (report.severity) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f97316';
      default: return '#84cc16';
    }
  }, [report.severity]);

  return (
    <>
      <AdvancedMarker
        position={report.location}
        onClick={() => setOpen(true)}
      >
        <PotholeIcon className="h-8 w-8" style={{ color }} />
      </AdvancedMarker>
      {open && (
        <InfoWindow position={report.location} onCloseClick={() => setOpen(false)}>
          <div className="p-2 max-w-xs">
            <h3 className="font-bold text-base mb-1">{report.address}</h3>
            <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
            <div className="flex justify-between items-center text-xs">
                <Badge variant={report.status === 'Completed' ? 'secondary' : 'default'}>{report.status}</Badge>
                <Badge variant="outline" style={{borderColor: color, color}}>{report.severity}</Badge>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

function MapLayers() {
  const [showTraffic, setShowTraffic] = useState(false);
  const [showWeather, setShowWeather] = useState(false);

  return (
    <div className="absolute top-2 right-2 bg-card p-3 rounded-lg shadow-md border space-y-3">
        <div className="flex items-center space-x-2">
            <Switch id="traffic" checked={showTraffic} onCheckedChange={setShowTraffic} />
            <Label htmlFor="traffic">Show Traffic</Label>
        </div>
        <div className="flex items-center space-x-2">
            <Switch id="weather" checked={showWeather} onCheckedChange={setShowWeather} />
            <Label htmlFor="weather">Show Weather</Label>
        </div>
        {/* Placeholder for future zone toggle */}
    </div>
  );
}

export function InteractiveMap() {
  if (!API_KEY) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center">
          <p className="text-muted-foreground">Google Maps API Key is missing.</p>
          <p className="text-sm text-muted-foreground">Please add it to your .env.local file.</p>
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
            <div className="w-full h-full relative">
                <Map
                    defaultCenter={CHENNAI_CENTER}
                    defaultZoom={11}
                    mapId="a3b5b3a4f8f4f4f4"
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                >
                    {reports.map((report) => (
                    <PotholeMarker key={report.id} report={report} />
                    ))}
                </Map>
                <MapLayers />
            </div>
        </APIProvider>
      </CardContent>
    </Card>
  );
}
