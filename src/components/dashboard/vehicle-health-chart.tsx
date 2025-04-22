
import React from "react";
import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartCard } from "./chart-card";

const mockData = [
  { time: "00:00", score: 92 },
  { time: "04:00", score: 88 },
  { time: "08:00", score: 85 },
  { time: "12:00", score: 82 },
  { time: "16:00", score: 78 },
  { time: "20:00", score: 75 },
];

const chartConfig = {
  score: {
    label: "Health Score",
    theme: {
      light: "#2C7A7B",
      dark: "#2C7A7B",
    },
  },
};

export function VehicleHealthChart() {
  return (
    <ChartCard title="Vehicle Health Score" className="col-span-2">
      <div className="h-[300px] w-full">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis dataKey="time" tickLine={false} axisLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--color-score)"
                strokeWidth={2}
                dot={false}
              />
              <ChartTooltip>
                <ChartTooltipContent />
              </ChartTooltip>
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </ChartCard>
  );
}
