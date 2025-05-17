
import React, { useEffect, useState } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar,
  ComposedChart, Legend
} from "recharts";
import { ChartCard } from "./chart-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Generate simulated data showing how driver behavior affects vehicle metrics
const generateDriverImpactData = (driverId: string) => {
  // Different driving patterns based on driver ID
  const driverProfiles = {
    'driver-1': { acceleration: 'aggressive', braking: 'moderate', speeds: 'high', cornering: 'aggressive' },
    'driver-2': { acceleration: 'smooth', braking: 'gentle', speeds: 'moderate', cornering: 'smooth' },
    'driver-3': { acceleration: 'moderate', braking: 'aggressive', speeds: 'varying', cornering: 'moderate' },
  };
  
  const profile = driverProfiles[driverId as keyof typeof driverProfiles];
  
  // Base values that will be modified by driver profile
  let fuelEfficiencyBase = 22; // mpg
  let engineWearBase = 0.05; // % per 100 miles
  let brakeWearBase = 0.08; // % per 100 miles
  let tiresWearBase = 0.1; // % per 100 miles
  
  // Adjust based on driver profile
  if (profile.acceleration === 'aggressive') {
    fuelEfficiencyBase -= 4;
    engineWearBase += 0.03;
  } else if (profile.acceleration === 'smooth') {
    fuelEfficiencyBase += 2;
    engineWearBase -= 0.01;
  }
  
  if (profile.braking === 'aggressive') {
    brakeWearBase += 0.04;
    tiresWearBase += 0.02;
  } else if (profile.braking === 'gentle') {
    brakeWearBase -= 0.02;
    tiresWearBase -= 0.01;
  }
  
  if (profile.speeds === 'high') {
    fuelEfficiencyBase -= 3;
    engineWearBase += 0.02;
  } else if (profile.speeds === 'moderate') {
    fuelEfficiencyBase += 2;
  }
  
  // Generate time-series data
  const data = [];
  for (let week = 1; week <= 12; week++) {
    // Add some random variation to base values
    const randomFactor = 0.9 + (Math.random() * 0.2); // 0.9-1.1
    
    const timePoint = `Week ${week}`;
    const fuelEfficiency = parseFloat((fuelEfficiencyBase * randomFactor).toFixed(1));
    const engineWear = parseFloat((engineWearBase * randomFactor).toFixed(3));
    const brakeWear = parseFloat((brakeWearBase * randomFactor).toFixed(3));
    const tiresWear = parseFloat((tiresWearBase * randomFactor).toFixed(3));
    
    data.push({
      timePoint,
      fuelEfficiency,
      engineWear,
      brakeWear,
      tiresWear,
    });
  }
  
  // Generate driving habit score
  const drivingHabits = [
    { name: 'Acceleration', score: profile.acceleration === 'aggressive' ? 35 : profile.acceleration === 'moderate' ? 65 : 85 },
    { name: 'Braking', score: profile.braking === 'aggressive' ? 40 : profile.braking === 'moderate' ? 70 : 90 },
    { name: 'Speed Control', score: profile.speeds === 'high' ? 30 : profile.speeds === 'moderate' ? 80 : profile.speeds === 'varying' ? 60 : 75 },
    { name: 'Cornering', score: profile.cornering === 'aggressive' ? 35 : profile.cornering === 'moderate' ? 65 : 90 },
    { name: 'Idling', score: 50 + Math.floor(Math.random() * 40) },
  ];
  
  return { timeSeriesData: data, drivingHabits };
};

interface DriverImpactChartProps {
  driverId: string;
}

export function DriverImpactChart({ driverId }: DriverImpactChartProps) {
  const [data, setData] = useState<{
    timeSeriesData: any[];
    drivingHabits: any[];
  }>({ timeSeriesData: [], drivingHabits: [] });
  
  useEffect(() => {
    // Generate new data when driver ID changes
    setData(generateDriverImpactData(driverId));
  }, [driverId]);

  return (
    <ChartCard 
      title="Driver Impact on Vehicle Health & Performance" 
      className="col-span-2"
    >
      <Tabs defaultValue="fuel" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="fuel">Fuel Efficiency</TabsTrigger>
          <TabsTrigger value="wear">Component Wear</TabsTrigger>
          <TabsTrigger value="habits">Driving Habits</TabsTrigger>
          <TabsTrigger value="correlation">Correlation Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fuel" className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.timeSeriesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="timePoint" />
              <YAxis 
                domain={[0, 'dataMax + 5']}
                label={{ value: 'MPG', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "0.5rem" 
                }}
              />
              <Line
                type="monotone"
                dataKey="fuelEfficiency"
                stroke="#2C7A7B"
                name="Fuel Efficiency (MPG)"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="wear" className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.timeSeriesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="timePoint" />
              <YAxis 
                domain={[0, 0.15]}
                label={{ value: 'Wear Rate (%/100mi)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "0.5rem" 
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="engineWear"
                stroke="#E53E3E"
                name="Engine Wear"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="brakeWear"
                stroke="#3182CE"
                name="Brake Wear"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="tiresWear"
                stroke="#805AD5"
                name="Tires Wear"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="habits" className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.drivingHabits}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" />
              <YAxis 
                domain={[0, 100]}
                label={{ value: 'Score', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "0.5rem" 
                }}
              />
              <Bar
                dataKey="score"
                fill="#2C7A7B"
                name="Driving Habit Score"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="correlation" className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data.timeSeriesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="timePoint" />
              <YAxis 
                yAxisId="left"
                domain={[0, 'dataMax + 5']}
                label={{ value: 'Fuel (MPG)', angle: -90, position: 'insideLeft' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                domain={[0, 0.15]}
                label={{ value: 'Wear (%/100mi)', angle: 90, position: 'insideRight' }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "0.5rem" 
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="fuelEfficiency"
                stroke="#2C7A7B"
                name="Fuel Efficiency"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="engineWear"
                stroke="#E53E3E"
                name="Engine Wear"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </ChartCard>
  );
}
