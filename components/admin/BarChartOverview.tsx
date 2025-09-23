"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function BarChartOverview({
  chartData,
}: {
  chartData: { month: string; total: number }[];
}) {
  return (
    <ChartContainer
      config={{
        total: {
          label: "total",
          color: "orange",
        },
      }}
      className="min-h-[200px] w-full"
    >
      <BarChart  accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} tickMargin={10} axisLine={true} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="total" fill="var(--color-total)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
