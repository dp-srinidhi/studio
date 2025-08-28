import { ReportForm } from "@/components/report/report-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportPotholePage() {
    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-3xl font-bold tracking-tight">Report a Pothole</h2>
                <p className="text-muted-foreground">
                    Help us improve our roads. Fill out the form below to report an issue.
                </p>
            </header>
            <Card>
                <CardHeader>
                    <CardTitle>New Pothole Report</CardTitle>
                    <CardDescription>
                        Please provide the location, severity, and a photo of the pothole.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ReportForm />
                </CardContent>
            </Card>
        </div>
    )
}
