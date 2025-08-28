'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { PotholeStatus, PotholeSeverity, PotholeReport } from '@/lib/types';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { getReportsRealtime } from '@/lib/firestore';
import { Skeleton } from '@/components/ui/skeleton';

const getStatusBadgeVariant = (status: PotholeStatus) => {
  switch (status) {
    case 'Completed':
      return 'secondary';
    case 'In Progress':
      return 'outline';
    default:
      return 'default';
  }
};

const getSeverityBadgeVariant = (severity: PotholeSeverity) => {
    switch (severity) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'outline';
      default:
        return 'secondary';
    }
  };

export function ReportsTable() {
  const [reports, setReports] = useState<PotholeReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getReportsRealtime((fetchedReports) => {
      setReports(fetchedReports);
      setLoading(false);
    });
    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Report ID</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Zone</TableHead>
            <TableHead>Reported On</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-[50px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
              </TableRow>
            ))
          ) : (
            reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.id.substring(0, 6)}...</TableCell>
                <TableCell>{report.address}</TableCell>
                <TableCell>{report.zone}</TableCell>
                <TableCell>{format(report.reportedAt, 'PP')}</TableCell>
                <TableCell>
                  <Badge variant={getSeverityBadgeVariant(report.severity)}>{report.severity}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(report.status)}>{report.status}</Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
