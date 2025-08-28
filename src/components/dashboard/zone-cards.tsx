'use client';
import { zones } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wrench, TrafficCone, Cloud } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function ZoneCards() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Pothole Status by Zone</CardTitle>
                <CardDescription>Potholes fixed and conditions in each Chennai zone.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {zones.map(zone => (
                        <div key={zone.name} className="flex flex-col p-4 border rounded-lg bg-card text-card-foreground shadow-sm space-y-4">
                            <h3 className="text-sm font-semibold text-center">{zone.name}</h3>
                            <div className="flex items-center justify-center gap-2">
                                <Wrench className="h-5 w-5 text-primary" />
                                <span className="text-2xl font-bold">{zone.potholes.filled}</span>
                                <p className="text-xs text-muted-foreground mt-1">Fixed</p>
                            </div>
                            <div className="flex flex-col space-y-2 pt-2 border-t">
                                <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor={`traffic-${zone.name}`} className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <TrafficCone className="h-4 w-4" />
                                        <span>Traffic</span>
                                    </Label>
                                    <Switch id={`traffic-${zone.name}`} />
                                </div>
                                <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor={`weather-${zone.name}`} className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Cloud className="h-4 w-4" />
                                        <span>Weather</span>
                                    </Label>
                                    <Switch id={`weather-${zone.name}`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
