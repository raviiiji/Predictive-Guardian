
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartCard } from "./chart-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Generate predictive maintenance data
const generateData = (days: number) => {
  const data = [];
  const now = new Date();
  let vibrationTrend = 10;
  let temperatureTrend = 45;
  const failurePoint = 50; // Failure threshold
  
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (days - i - 1));
    
    // Natural increase in metrics over time
    vibrationTrend = Math.min(failurePoint, vibrationTrend * 1.05);
    temperatureTrend = Math.min(100, temperatureTrend * 1.02);
    
    // Add some natural variation
    const vibration = Math.max(5, vibrationTrend + (Math.random() * 5 - 2.5));
    const temperature = Math.max(40, temperatureTrend + (Math.random() * 3 - 1.5));
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      vibration: parseFloat(vibration.toFixed(2)),
      temperature: parseFloat(temperature.toFixed(2)),
      predicted: i > days - 8 ? parseFloat(vibrationTrend.toFixed(2)) : undefined,
      predictedTemp: i > days - 8 ? parseFloat(temperatureTrend.toFixed(2)) : undefined,
      threshold: failurePoint
    });
  }
  return data;
};

export function PredictiveChart() {
  const [data, setData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState<string>("30");
  
  useEffect(() => {
    setData(generateData(parseInt(timeRange)));
  }, [timeRange]);

  const timeRangeOptions = [
    { value: "7", label: "7 days" },
    { value: "30", label: "30 days" },
    { value: "90", label: "90 days" },
  ];

  return (
    <ChartCard 
      title="Predictive Analytics - Equipment Health" 
      className="col-span-2"
      action={
        <div className="flex items-center gap-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-24 h-8 text-xs">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              {timeRangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" className="h-8 text-xs">Export</Button>
        </div>
      }
    >
      <div className="p-4" style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="rgba(255,255,255,0.5)" 
              fontSize={10} 
              tickMargin={10}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)" 
              fontSize={10}
              tickMargin={10} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                borderColor: "hsl(var(--border))",
                borderRadius: "0.5rem",
                fontSize: "12px",
                color: "white" 
              }} 
            />
            <Legend wrapperStyle={{ fontSize: "12px", marginTop: "10px" }} />
            <Line 
              type="monotone" 
              dataKey="vibration" 
              stroke="#2C7A7B" 
              name="Vibration" 
              strokeWidth={2}
              dot={false} 
              activeDot={{ r: 6 }} 
            />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="#E53E3E" 
              name="Temperature" 
              strokeWidth={2}
              dot={false} 
              activeDot={{ r: 6 }} 
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#2C7A7B" 
              strokeDasharray="5 5" 
              name="Predicted Vibration" 
              strokeWidth={2}
              dot={false} 
            />
            <Line 
              type="monotone" 
              dataKey="predictedTemp" 
              stroke="#E53E3E" 
              strokeDasharray="5 5" 
              name="Predicted Temperature" 
              strokeWidth={2}
              dot={false} 
            />
            <Line 
              type="monotone" 
              dataKey="threshold" 
              stroke="#FFC107" 
              strokeDasharray="3 3" 
              name="Failure Threshold" 
              strokeWidth={2}
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
