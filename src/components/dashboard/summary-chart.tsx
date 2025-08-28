'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { zones } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const chartData = zones.map(zone => ({
    name: zone.name,
    reported: zone.potholes.reported,
    filled: zone.potholes.filled,
}));

export function SummaryChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Pothole Status by Zone</CardTitle>
                <CardDescription>Reported vs. Filled potholes across Chennai zones.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} angle={-45} textAnchor="end" height={60} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{
                                background: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "var(--radius)",
                            }}
                        />
                        <Legend wrapperStyle={{ fontSize: '14px' }}/>
                        <Bar dataKey="reported" fill="hsl(var(--primary))" name="Reported" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="filled" fill="hsl(var(--secondary-foreground))" name="Filled" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
