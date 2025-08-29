'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Circle, MapPin, Wrench } from 'lucide-react';
import { ZoneTraffic } from '@/components/dashboard/zone-cards';

// Mock data for the rover status
const roverData = {
  zone: 'Adyar',
  materials: 75, // percentage
  fixedPotholes: 12,
  isActive: true,
  location: { lat: 13.004, lng: 80.254 },
};

export function RoverStatus() {
  return (
    <div className="grid gap-4 md:gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Rover Status</CardTitle>
          <CardDescription>
            Real-time operational data from the rover.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Circle
                className={`h-3 w-3 ${
                  roverData.isActive ? 'fill-primary' : 'fill-muted'
                }`}
              />
              <span className="text-sm font-medium">
                {roverData.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{roverData.zone} Zone</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Material Status</h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-20">Asphalt Mix</span>
              <Progress value={roverData.materials} className="flex-1" />
              <span className="text-sm font-semibold">{roverData.materials}%</span>
            </div>
          </div>
          
          <Separator />

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Potholes Fixed</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <Wrench className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">
                  {roverData.fixedPotholes}
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Current Traffic</p>
                <div className="mt-2">
                    <ZoneTraffic lat={roverData.location.lat} lon={roverData.location.lng} />
                </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
