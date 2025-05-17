
import React, { useState } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend,
  ReferenceLine
} from "recharts";
import { ChartCard } from "./chart-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Generate simulated sensor data before and after maintenance/replacement
const generateSensorData = (sensorType: string) => {
  // Define sensor types and their characteristics
  const sensorCharacteristics = {
    'oxygen-sensor': {
      name: 'Oxygen Sensor',
      unit: 'Volts',
      beforeMean: 0.45,
      beforeVariability: 0.15,
      afterMean: 0.8,
      afterVariability: 0.05,
      idealValue: 0.8,
      dataPoints: 24,
      improvementMetrics: {
        fuelEconomy: '+12%',
        emissions: '-18%',
        enginePerformance: '+8%'
      },
      replacementDate: '2025-04-15'
    },
    'mass-airflow': {
      name: 'Mass Airflow Sensor',
      unit: 'g/s',
      beforeMean: 18,
      beforeVariability: 4,
      afterMean: 22,
      afterVariability: 1.5,
      idealValue: 22,
      dataPoints: 24,
      improvementMetrics: {
        fuelEconomy: '+9%',
        emissions: '-12%',
        enginePerformance: '+15%'
      },
      replacementDate: '2025-03-22'
    },
    'coolant-temp': {
      name: 'Coolant Temperature Sensor',
      unit: '°C',
      beforeMean: 95,
      beforeVariability: 12,
      afterMean: 88,
      afterVariability: 3,
      idealValue: 88,
      dataPoints: 24,
      improvementMetrics: {
        fuelEconomy: '+5%',
        emissions: '-8%',
        enginePerformance: '+6%'
      },
      replacementDate: '2025-04-02'
    },
  };
  
  const sensor = sensorCharacteristics[sensorType as keyof typeof sensorCharacteristics];
  
  // Generate data before and after maintenance
  const beforeData = [];
  const afterData = [];
  
  for (let i = 0; i < sensor.dataPoints; i++) {
    const hour = i;
    
    // Before readings with more variability and offset from ideal
    const beforeReading = sensor.beforeMean + 
      (Math.random() * 2 - 1) * sensor.beforeVariability;
    
    // After readings with less variability and closer to ideal
    const afterReading = sensor.afterMean + 
      (Math.random() * 2 - 1) * sensor.afterVariability;
    
    beforeData.push({
      hour,
      reading: parseFloat(beforeReading.toFixed(2)),
      type: 'before'
    });
    
    afterData.push({
      hour,
      reading: parseFloat(afterReading.toFixed(2)),
      type: 'after'
    });
  }
  
  return {
    sensorInfo: sensor,
    data: [...beforeData, ...afterData]
  };
};

interface SensorComparisonChartProps {
  driverId: string;
}

export function SensorComparisonChart({ driverId }: SensorComparisonChartProps) {
  const [selectedSensor, setSelectedSensor] = useState('oxygen-sensor');
  const [sensorData, setSensorData] = useState(() => generateSensorData(selectedSensor));
  
  const handleSensorChange = (value: string) => {
    setSelectedSensor(value);
    setSensorData(generateSensorData(value));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-medium">Sensor Comparison:</h2>
          <Select value={selectedSensor} onValueChange={handleSensorChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Sensor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oxygen-sensor">Oxygen Sensor</SelectItem>
              <SelectItem value="mass-airflow">Mass Airflow Sensor</SelectItem>
              <SelectItem value="coolant-temp">Coolant Temperature</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
          Replaced on {sensorData.sensorInfo.replacementDate}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard 
          title={`${sensorData.sensorInfo.name} Readings Before & After Replacement`}
          className="lg:col-span-2"
        >
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={sensorData.data}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis 
                  dataKey="hour" 
                  label={{ value: 'Time (hours)', position: 'insideBottom', offset: -10 }}
                />
                <YAxis 
                  label={{ 
                    value: `Reading (${sensorData.sensorInfo.unit})`, 
                    angle: -90, 
                    position: 'insideLeft' 
                  }}
                />
                <Tooltip
                  formatter={(value: number) => [`${value} ${sensorData.sensorInfo.unit}`, 'Reading']}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "0.5rem" 
                  }}
                />
                <Legend />
                <ReferenceLine 
                  y={sensorData.sensorInfo.idealValue} 
                  stroke="#FFC107" 
                  strokeDasharray="3 3" 
                  label={{ 
                    value: 'Ideal', 
                    position: 'right', 
                    style: { fill: '#FFC107' } 
                  }} 
                />
                <Line
                  dataKey="reading"
                  stroke="#E53E3E"
                  strokeWidth={2}
                  name="Before Replacement"
                  dot={{ r: 2 }}
                  activeDot={{ r: 6 }}
                  data={sensorData.data.filter(d => d.type === 'before')}
                />
                <Line
                  dataKey="reading"
                  stroke="#2C7A7B"
                  strokeWidth={2}
                  name="After Replacement"
                  dot={{ r: 2 }}
                  activeDot={{ r: 6 }}
                  data={sensorData.data.filter(d => d.type === 'after')}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Impact Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Performance Improvements</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Fuel Economy</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    {sensorData.sensorInfo.improvementMetrics.fuelEconomy}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Emissions</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    {sensorData.sensorInfo.improvementMetrics.emissions}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Engine Performance</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    {sensorData.sensorInfo.improvementMetrics.enginePerformance}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Reading Stability</h3>
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 rounded-full bg-red-500"></span>
                <span className="text-sm text-muted-foreground">Before: High Variability</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="h-3 w-3 rounded-full bg-teal-600"></span>
                <span className="text-sm text-muted-foreground">After: Low Variability</span>
              </div>
            </div>
            
            <div className="pt-2">
              <h3 className="text-sm font-medium mb-2">AI Assessment</h3>
              <p className="text-sm text-muted-foreground">
                This sensor replacement has significantly improved vehicle performance and efficiency.
                Driver behavior shows optimal utilization of the new sensor capabilities,
                resulting in better than expected improvements.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
