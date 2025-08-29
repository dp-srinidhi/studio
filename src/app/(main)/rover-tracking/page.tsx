import { LiveRoverMap } from '@/components/rover-tracking/live-rover-map';
import { RoverStatus } from '@/components/rover-tracking/rover-status';

export default function RoverTrackingPage() {
  return (
    <div className="flex flex-col h-full gap-4 md:gap-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Rover Tracking</h2>
        <p className="text-muted-foreground">
          Live location and status of the active pothole repair rover.
        </p>
      </header>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-5 flex-1">
        <div className="lg:col-span-3 h-[600px] lg:h-auto">
          <LiveRoverMap />
        </div>
        <div className="lg:col-span-2">
          <RoverStatus />
        </div>
      </div>
    </div>
  );
}
