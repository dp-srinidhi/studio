import { LiveRoverMap } from '@/components/rover-tracking/live-rover-map';

export default function RoverTrackingPage() {
  return (
    <div className="flex flex-col h-full gap-4 md:gap-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Rover Tracking</h2>
        <p className="text-muted-foreground">
          Live location of the active pothole repair rover.
        </p>
      </header>
      <div className="flex-1">
        <LiveRoverMap />
      </div>
    </div>
  );
}
