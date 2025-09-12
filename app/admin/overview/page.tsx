// overview-page
'use client'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { BadgeDollarSign, CreditCard, Users, Barcode, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
    { month: "January", desktop: 400 },
    { month: "February", desktop: 300 },
    { month: "March", desktop: 500 },
    { month: "April", desktop: 700 },
    { month: "May", desktop: 600 },
    { month: "June", desktop: 800 },
];

export default function OverviewPage() {
    return (
        <div className="w-full h-screen flex flex-col">
  <div className="w-full h-full">
    <h1 className="font-bold text-3xl px-3 py-3 text-center">Dashboard</h1>
                <div className="container mx-auto px-3 py-3 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                Total revenue <BadgeDollarSign />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>€12,000</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                Sales <CreditCard />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>€3,200</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                Customers <Users />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>128</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                Products <Barcode />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>42</CardContent>
                    </Card>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 pb-8">
                    <Card >
                        <Table >
                            <TableHeader>
                                <TableRow>
                                    <TableHead>BUYER</TableHead>
                                    <TableHead>DATE</TableHead>
                                    <TableHead>TOTAL</TableHead>
                                    <TableHead>ACTION</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Mario Rossi</TableCell>
                                    <TableCell>11/09/2025</TableCell>
                                    <TableCell>€120</TableCell>
                                    <TableCell>
                                        <button className="text-black-500 hover:underline">Details</button>
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </Card>

                    <Card >
                        <CardHeader>
                            <CardTitle>Bar Chart</CardTitle>
                            <CardDescription>January - June 2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <BarChart accessibilityLayer data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />


                                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
                            </BarChart>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                            <div className="flex gap-2 leading-none font-medium">
                                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="text-muted-foreground leading-none">
                                Showing total visitors for the last 6 months
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div >
    );
}