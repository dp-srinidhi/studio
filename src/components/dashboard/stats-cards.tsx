'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleDotDashed, Wrench, CheckCircle2, AlertCircle } from 'lucide-react';
import { reports } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export function StatsCards() {
  const loading = false; // Data is now static
  const totalReports = reports.length;
  const completedReports = reports.filter(r => r.status === 'Completed').length;
  const inProgressReports = reports.filter(r => r.status === 'In Progress').length;
  const highSeverityReports = reports.filter(r => r.severity === 'High').length;

  const statItems = [
      { title: 'Total Reports', value: totalReports, icon: CircleDotDashed },
      { title: 'Completed', value: completedReports, icon: CheckCircle2, color: 'text-primary' },
      { title: 'In Progress', value: inProgressReports, icon: Wrench },
      { title: 'High Urgency', value: highSeverityReports, icon: AlertCircle, color: 'text-destructive' },
  ]

  if (loading) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-[40px] mb-2" />
                        <Skeleton className="h-3 w-[120px]" />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className={cn('h-4 w-4 text-muted-foreground', item.color)} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">
              {item.title === 'Total Reports' ? 'in the last month' : `of ${totalReports} total reports`}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
