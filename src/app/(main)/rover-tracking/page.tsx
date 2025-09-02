'use client';

import { LiveRoverMap } from '@/components/rover-tracking/live-rover-map';
import { RoverStatus } from '@/components/rover-tracking/rover-status';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function RoverTrackingPage() {
  const { role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Skeleton className="w-64 h-32" />
      </div>
    )
  }

  if (role !== 'operator') {
    return (
        <div className="flex items-center justify-center h-full">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl text-destructive">Access Denied</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground">
                        You do not have permission to view this page. This page is restricted to operators only.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
  }

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
