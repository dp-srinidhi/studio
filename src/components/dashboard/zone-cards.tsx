'use client';
import { zones } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wrench, Cloud, Sun, CloudRain, TrafficCone } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { WeatherData, TrafficData } from '@/lib/types';
import { fetchWeatherForZone } from '@/lib/weather';
import { fetchTrafficForZone } from '@/lib/traffic';
import { Skeleton } from '@/components/ui/skeleton';

function getWeatherIcon(weather: string) {
  switch (weather) {
    case 'Clear':
      return <Sun className="h-4 w-4" />;
    case 'Clouds':
      return <Cloud className="h-4 w-4" />;
    case 'Rain':
    case 'Drizzle':
    case 'Thunderstorm':
      return <CloudRain className="h-4 w-4" />;
    default:
      return <Cloud className="h-4 w-4" />;
  }
}

function getTrafficStyling(speed: number, freeFlowSpeed: number) {
    const ratio = speed / freeFlowSpeed;
    if (ratio > 0.8) return { color: 'text-primary', label: 'Low Traffic' };
    if (ratio > 0.5) return { color: 'text-yellow-500', label: 'Moderate Traffic' };
    return { color: 'text-destructive', label: 'High Traffic' };
}

function ZoneWeather({ lat, lon }: { lat: number; lon: number }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWeather() {
      try {
        const data = await fetchWeatherForZone(lat, lon);
        setWeather(data);
      } catch (error) {
        console.error('Failed to fetch weather data', error);
      } finally {
        setLoading(false);
      }
    }
    getWeather();
  }, [lat, lon]);

  if (loading) {
    return <Skeleton className="h-5 w-20" />;
  }

  if (!weather) {
    return <div className="text-xs text-muted-foreground">N/A</div>;
  }

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {getWeatherIcon(weather.weather[0].main)}
      <span>
        {Math.round(weather.main.temp)}°C, {weather.weather[0].main}
      </span>
    </div>
  );
}

function ZoneTraffic({ lat, lon }: { lat: number, lon: number}) {
    const [traffic, setTraffic] = useState<TrafficData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getTraffic() {
            try {
                const data = await fetchTrafficForZone(lat, lon);
                setTraffic(data);
            } catch (error) {
                console.error('Failed to fetch traffic data', error);
            } finally {
                setLoading(false);
            }
        }
        getTraffic();
    }, [lat, lon]);

    if (loading) {
        return <Skeleton className="h-5 w-24" />;
    }

    if (!traffic || !traffic.flowSegmentData) {
        return <div className="text-xs text-muted-foreground">Traffic: N/A</div>;
    }

    const { currentSpeed, freeFlowSpeed } = traffic.flowSegmentData;
    const { color, label } = getTrafficStyling(currentSpeed, freeFlowSpeed);

    return (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrafficCone className={`h-4 w-4 ${color}`} />
            <span className={color}>
                {label}
            </span>
        </div>
    )
}


export function ZoneCards() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Pothole Status by Zone</CardTitle>
                <CardDescription>Potholes fixed and current conditions in each Chennai zone.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {zones.map(zone => (
                        <div key={zone.name} className="flex flex-col p-4 border rounded-lg bg-card text-card-foreground shadow-sm space-y-3">
                            <h3 className="text-sm font-semibold text-center">{zone.name}</h3>
                            <div className="flex items-center justify-center gap-2">
                                <Wrench className="h-5 w-5 text-primary" />
                                <span className="text-2xl font-bold">{zone.potholes.filled}</span>
                                <p className="text-xs text-muted-foreground mt-1">Fixed</p>
                            </div>
                            <div className="pt-2 border-t flex flex-col items-center space-y-2">
                               <ZoneWeather lat={zone.center.lat} lon={zone.center.lng} />
                               <ZoneTraffic lat={zone.center.lat} lon={zone.center.lng} />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
