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
import { reports } from '@/lib/data';
import type { PotholeStatus, PotholeSeverity } from '@/lib/types';
import { format } from 'date-fns';

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
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.id}</TableCell>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
