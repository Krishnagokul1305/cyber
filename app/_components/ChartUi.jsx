"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Raw Data
const rawData = [
  { type: "SQL Injection", ip: "::1", timestamp: "12/25/2024, 3:57:26 PM" },
  { type: "SQL Injection", ip: "::1", timestamp: "12/25/2024, 3:59:39 PM" },
  { type: "SQL Injection", ip: "::1", timestamp: "12/26/2024, 8:57:57 AM" },
  { type: "SQL Injection", ip: "::1", timestamp: "12/26/2024, 9:40:29 AM" },
  { type: "SQL Injection", ip: "::1", timestamp: "12/26/2024, 9:44:51 AM" },
  { type: "SQL Injection", ip: "::1", timestamp: "12/27/2024, 8:57:57 AM" },
];

const normalData = [
  { ip: "::1", timestamp: "12/25/2024, 1:00:00 PM" },
  { ip: "::1", timestamp: "12/25/2024, 1:00:00 PM" },
  { ip: "::1", timestamp: "12/25/2024, 2:00:00 PM" },
  { ip: "::1", timestamp: "12/26/2024, 10:00:00 AM" },
  { ip: "::1", timestamp: "12/26/2024, 11:00:00 AM" },
];

// Helper function to format timestamps into dates
function getDateFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
}

// Aggregate data by date
const aggregateDataByDate = (data) => {
  return data.reduce((acc, entry) => {
    const date = getDateFromTimestamp(entry.timestamp);
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
};

const attackCountsByDate = aggregateDataByDate(rawData);
const normalCountsByDate = aggregateDataByDate(normalData);

// Combine into chart data format
const dates = [
  ...new Set([
    ...Object.keys(attackCountsByDate),
    ...Object.keys(normalCountsByDate),
  ]),
].sort();

const chartData = dates.map((date) => ({
  date,
  desktop: normalCountsByDate[date] || 0,
  mobile: attackCountsByDate[date] || 0,
}));

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

export function ChartUi() {
  return (
    <Card className="w-[550px] h-[400px] bg-white/70">
      <CardHeader>
        <CardTitle>Normal - Attack Activities</CardTitle>
        <CardDescription>Recent Activities</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            style={{ height: "400px" }}
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(5)} // Show MM-DD
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="desktop"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
