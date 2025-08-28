import { zones } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wrench } from 'lucide-react';

export function ZoneCards() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Pothole Status by Zone</CardTitle>
                <CardDescription>Potholes fixed in each Chennai zone.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {zones.map(zone => (
                        <div key={zone.name} className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                            <h3 className="text-sm font-semibold text-center mb-2">{zone.name}</h3>
                            <div className="flex items-center gap-2">
                                <Wrench className="h-5 w-5 text-primary" />
                                <span className="text-2xl font-bold">{zone.potholes.filled}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Fixed</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
