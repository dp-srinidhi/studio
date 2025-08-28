import { ReportsTable } from '@/components/reports/reports-table';

export default function MyReportsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">My Reports</h2>
                <p className="text-muted-foreground">
                    Track the status of your submitted reports.
                </p>
            </div>
            <ReportsTable />
        </div>
    )
}
