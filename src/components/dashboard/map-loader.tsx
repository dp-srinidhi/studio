'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const InteractiveMap = dynamic(
  () => import('@/components/dashboard/interactive-map').then(mod => mod.InteractiveMap),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-full w-full" />
  }
);

export function MapLoader() {
  return <InteractiveMap />;
}
