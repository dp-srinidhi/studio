import { StatsCards } from '@/components/dashboard/stats-cards';
import { ZoneCards } from '@/components/dashboard/zone-cards';
import { InteractiveMap } from '@/components/dashboard/interactive-map';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of pothole reports and maintenance status in Chennai.
        </p>
      </header>

      <main className="flex flex-col gap-4 md:gap-8">
        <StatsCards />

        <div className="grid gap-4 md:gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ZoneCards />
          </div>
          <div className="lg:col-span-2 h-[450px] lg:h-auto">
            <InteractiveMap />
          </div>
        </div>
      </main>
    </div>
  );
}
