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
// import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { BadgeDollarSign, CreditCard, Users, Barcode, TrendingUp } from "lucide-react";
import BarChartOverview from "./barChartOverview";
import TableOrdersOverview from "./TableOrdersOverviw";
export default function OverviewPage() {
    return (
        <div className="container mx-auto px-3 py-3">
            <div className="flex justify-between items-center mb-4 px-3">
                <h1 className="font-bold text-xl">Overview</h1>
            </div>
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


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4  mx-auto w-full h-screen ">
                <div > 
                    <Card className=" p-6 text-center">
                       <TableOrdersOverview/>
                    </Card>
                </div>

                <div >
                    <Card >
                        <BarChartOverview />
                    </Card>          
                </div>
            </div>
        </div>

    );
}