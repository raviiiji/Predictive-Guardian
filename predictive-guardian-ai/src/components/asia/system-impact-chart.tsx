
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

export function ASIASystemImpactChart() {
  const [selectedSystem, setSelectedSystem] = useState("engine");
  const [selectedView, setSelectedView] = useState("timeline");

  const systemOptions = [
    { value: "engine", label: "Engine System" },
    { value: "brakes", label: "Brake System" },
    { value: "cooling", label: "Cooling System" },
    { value: "electrical", label: "Electrical System" },
    { value: "fuel", label: "Fuel System" },
  ];

  // Generate timeline data based on selected system
  const getTimelineData = () => {
    switch (selectedSystem) {
      case "engine":
        return [
          { month: "Jan", baseline: 100, actual: 102, predicted: 104 },
          { month: "Feb", baseline: 99, actual: 101, predicted: 103 },
          { month: "Mar", baseline: 98, actual: 100, predicted: 102 },
          { month: "Apr", baseline: 97, actual: 101, predicted: 103 },
          { month: "May", baseline: 96, actual: 99, predicted: 101 },
          { month: "Jun", baseline: 95, actual: 98, predicted: 100 },
          { month: "Jul", baseline: 94, actual: 96, predicted: 98 },
          { month: "Aug", baseline: 93, actual: 95, predicted: 97 },
          { month: "Sep", baseline: 92, actual: 97, predicted: 99 },
          { month: "Oct", baseline: 91, actual: 96, predicted: 98 },
          { month: "Nov", baseline: 90, actual: 95, predicted: 97 },
          { month: "Dec", baseline: 89, actual: 94, predicted: 96 },
        ];
      case "brakes":
        return [
          { month: "Jan", baseline: 100, actual: 98, predicted: 97 },
          { month: "Feb", baseline: 98, actual: 96, predicted: 95 },
          { month: "Mar", baseline: 96, actual: 94, predicted: 93 },
          { month: "Apr", baseline: 94, actual: 93, predicted: 92 },
          { month: "May", baseline: 92, actual: 91, predicted: 90 },
          { month: "Jun", baseline: 90, actual: 92, predicted: 93 },
          { month: "Jul", baseline: 88, actual: 90, predicted: 92 },
          { month: "Aug", baseline: 86, actual: 89, predicted: 91 },
          { month: "Sep", baseline: 84, actual: 87, predicted: 89 },
          { month: "Oct", baseline: 82, actual: 85, predicted: 87 },
          { month: "Nov", baseline: 80, actual: 84, predicted: 86 },
          { month: "Dec", baseline: 78, actual: 82, predicted: 84 },
        ];
      case "cooling":
        return [
          { month: "Jan", baseline: 100, actual: 99, predicted: 98 },
          { month: "Feb", baseline: 99, actual: 97, predicted: 96 },
          { month: "Mar", baseline: 98, actual: 96, predicted: 95 },
          { month: "Apr", baseline: 97, actual: 95, predicted: 94 },
          { month: "May", baseline: 96, actual: 95, predicted: 94 },
          { month: "Jun", baseline: 95, actual: 93, predicted: 92 },
          { month: "Jul", baseline: 94, actual: 91, predicted: 90 },
          { month: "Aug", baseline: 93, actual: 90, predicted: 89 },
          { month: "Sep", baseline: 92, actual: 91, predicted: 90 },
          { month: "Oct", baseline: 91, actual: 92, predicted: 91 },
          { month: "Nov", baseline: 90, actual: 93, predicted: 92 },
          { month: "Dec", baseline: 89, actual: 92, predicted: 91 },
        ];
      case "electrical":
        return [
          { month: "Jan", baseline: 100, actual: 100, predicted: 100 },
          { month: "Feb", baseline: 100, actual: 100, predicted: 100 },
          { month: "Mar", baseline: 100, actual: 99, predicted: 99 },
          { month: "Apr", baseline: 100, actual: 98, predicted: 98 },
          { month: "May", baseline: 99, actual: 97, predicted: 97 },
          { month: "Jun", baseline: 99, actual: 98, predicted: 98 },
          { month: "Jul", baseline: 98, actual: 97, predicted: 97 },
          { month: "Aug", baseline: 98, actual: 96, predicted: 96 },
          { month: "Sep", baseline: 97, actual: 95, predicted: 95 },
          { month: "Oct", baseline: 97, actual: 96, predicted: 96 },
          { month: "Nov", baseline: 96, actual: 95, predicted: 95 },
          { month: "Dec", baseline: 96, actual: 94, predicted: 94 },
        ];
      case "fuel":
        return [
          { month: "Jan", baseline: 100, actual: 103, predicted: 105 },
          { month: "Feb", baseline: 99, actual: 102, predicted: 104 },
          { month: "Mar", baseline: 98, actual: 103, predicted: 105 },
          { month: "Apr", baseline: 97, actual: 101, predicted: 103 },
          { month: "May", baseline: 96, actual: 100, predicted: 102 },
          { month: "Jun", baseline: 95, actual: 99, predicted: 101 },
          { month: "Jul", baseline: 94, actual: 98, predicted: 100 },
          { month: "Aug", baseline: 93, actual: 97, predicted: 99 },
          { month: "Sep", baseline: 92, actual: 96, predicted: 98 },
          { month: "Oct", baseline: 91, actual: 98, predicted: 100 },
          { month: "Nov", baseline: 90, actual: 99, predicted: 101 },
          { month: "Dec", baseline: 89, actual: 97, predicted: 99 },
        ];
      default:
        return [];
    }
  };

  // Generate factors data based on selected system
  const getFactorsData = () => {
    switch (selectedSystem) {
      case "engine":
        return [
          { name: "Driver Behavior", value: 35 },
          { name: "Environmental", value: 25 },
          { name: "Component Quality", value: 20 },
          { name: "Maintenance", value: 15 },
          { name: "Vehicle Age", value: 5 },
        ];
      case "brakes":
        return [
          { name: "Driver Behavior", value: 45 },
          { name: "Terrain", value: 30 },
          { name: "Component Quality", value: 15 },
          { name: "Vehicle Weight", value: 5 },
          { name: "Environmental", value: 5 },
        ];
      case "cooling":
        return [
          { name: "Environmental", value: 40 },
          { name: "Component Quality", value: 25 },
          { name: "Maintenance", value: 20 },
          { name: "Engine Load", value: 10 },
          { name: "Vehicle Age", value: 5 },
        ];
      case "electrical":
        return [
          { name: "Component Quality", value: 30 },
          { name: "Environmental", value: 25 },
          { name: "Maintenance", value: 20 },
          { name: "Usage Patterns", value: 15 },
          { name: "Vehicle Age", value: 10 },
        ];
      case "fuel":
        return [
          { name: "Driver Behavior", value: 40 },
          { name: "Component Quality", value: 25 },
          { name: "Environmental", value: 15 },
          { name: "Maintenance", value: 15 },
          { name: "Fuel Quality", value: 5 },
        ];
      default:
        return [];
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Generate improvement data based on selected system
  const getImprovementData = () => {
    switch (selectedSystem) {
      case "engine":
        return [
          { name: "Lifespan", current: 92, improved: 98 },
          { name: "Performance", current: 88, improved: 95 },
          { name: "Efficiency", current: 85, improved: 92 },
          { name: "Emissions", current: 78, improved: 90 },
        ];
      case "brakes":
        return [
          { name: "Pad Life", current: 82, improved: 92 },
          { name: "Stopping Power", current: 90, improved: 95 },
          { name: "Heat Dissipation", current: 85, improved: 93 },
          { name: "Noise Level", current: 75, improved: 90 },
        ];
      case "cooling":
        return [
          { name: "Heat Transfer", current: 84, improved: 94 },
          { name: "Fan Efficiency", current: 80, improved: 92 },
          { name: "Pump Life", current: 82, improved: 95 },
          { name: "Corrosion Resistance", current: 75, improved: 90 },
        ];
      case "electrical":
        return [
          { name: "Battery Life", current: 88, improved: 96 },
          { name: "Start Reliability", current: 92, improved: 98 },
          { name: "Charging Rate", current: 85, improved: 93 },
          { name: "Component Durability", current: 80, improved: 92 },
        ];
      case "fuel":
        return [
          { name: "Efficiency", current: 82, improved: 94 },
          { name: "Power Output", current: 85, improved: 92 },
          { name: "Injector Life", current: 80, improved: 91 },
          { name: "Emissions Rating", current: 75, improved: 88 },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>System Impact Analysis</CardTitle>
              <CardDescription>
                Visualize how various factors affect vehicle systems over time
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedSystem} onValueChange={setSelectedSystem}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select system" />
                </SelectTrigger>
                <SelectContent>
                  {systemOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Tabs value={selectedView} onValueChange={setSelectedView} className="w-[250px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="factors">Factors</TabsTrigger>
                  <TabsTrigger value="improve">Improvement</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <TabsContent value="timeline" className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getTimelineData()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Health %', angle: -90, position: 'insideLeft' }} />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      borderColor: "hsl(var(--border))",
                      borderRadius: "0.5rem",
                      fontSize: "12px"
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="baseline" 
                    stroke="#8884d8" 
                    name="Baseline"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#2C7A7B" 
                    name="Actual"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#82ca9d" 
                    strokeDasharray="5 5"
                    name="Predicted"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="factors" className="h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={getFactorsData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {getFactorsData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, 'Impact Weight']}
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          borderColor: "hsl(var(--border))",
                          borderRadius: "0.5rem",
                          fontSize: "12px"
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Impact Factors for {systemOptions.find(s => s.value === selectedSystem)?.label}</h3>
                  <div className="space-y-4">
                    {getFactorsData().map((factor, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">{factor.name}</span>
                          <span className="text-sm font-medium">{factor.value}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div 
                            className="h-1.5 rounded-full" 
                            style={{ 
                              width: `${factor.value}%`, 
                              backgroundColor: COLORS[index % COLORS.length] 
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="improve" className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getImprovementData()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Score', angle: -90, position: 'insideLeft' }} />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      borderColor: "hsl(var(--border))",
                      borderRadius: "0.5rem",
                      fontSize: "12px"
                    }}
                  />
                  <Legend />
                  <Bar dataKey="current" fill="#8884d8" name="Current" />
                  <Bar dataKey="improved" fill="#82ca9d" name="After Improvements" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              {systemOptions.find(s => s.value === selectedSystem)?.label} Health Summary
              <Badge 
                variant="outline" 
                className={
                  selectedSystem === "brakes" ? 
                  "bg-amber-500/10 text-amber-500" : 
                  "bg-green-500/10 text-green-500"
                }
              >
                {selectedSystem === "brakes" ? "Monitor" : "Healthy"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Key Insights</div>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>
                  {selectedSystem === "engine" && "Engine performance is 8% above baseline for this usage pattern"}
                  {selectedSystem === "brakes" && "Brake wear is occurring 12% faster than expected due to terrain"}
                  {selectedSystem === "cooling" && "Cooling system efficiency improves 7% with recent maintenance"}
                  {selectedSystem === "electrical" && "Battery life extended by 15% through optimized charging cycles"}
                  {selectedSystem === "fuel" && "Fuel efficiency has improved 9% over baseline after injector cleaning"}
                </li>
                <li>
                  {selectedSystem === "engine" && "Oil change interval can be safely extended by 500 miles"}
                  {selectedSystem === "brakes" && "Recommend inspection 30 days earlier than scheduled maintenance"}
                  {selectedSystem === "cooling" && "Thermal efficiency remains stable across varied climate conditions"}
                  {selectedSystem === "electrical" && "All sensors operating within optimal parameters"}
                  {selectedSystem === "fuel" && "Recent driving patterns suggest 5% better MPG than manufacturer specs"}
                </li>
                <li>
                  {selectedSystem === "engine" && "Component replacement improved overall engine lifespan by 10.6%"}
                  {selectedSystem === "brakes" && "Driver behavior contributes to 45% of brake system wear rate"}
                  {selectedSystem === "cooling" && "Heat dissipation is 8% below optimal in high temperature conditions"}
                  {selectedSystem === "electrical" && "Low temperature has minimal impact on current electrical system"}
                  {selectedSystem === "fuel" && "Oxygen sensor replacement improved combustion efficiency by 12%"}
                </li>
              </ul>
            </div>
            
            <div>
              <div className="text-sm font-medium mb-2">AI Recommendations</div>
              <p className="text-sm text-muted-foreground">
                {selectedSystem === "engine" && "Continue current maintenance schedule with extended oil change intervals. Consider synthetic oil upgrade for further efficiency gains."}
                {selectedSystem === "brakes" && "Schedule early inspection of brake pads. Consider upgrade to ceramic pads better suited for current driving patterns."}
                {selectedSystem === "cooling" && "Current system performing well. Recommend preventative flush to maintain optimal performance for summer months."}
                {selectedSystem === "electrical" && "No action needed. All electrical components operating within optimal parameters with extended lifespan prediction."}
                {selectedSystem === "fuel" && "Fuel system performing above expectations. Continue using premium fuel for optimal injector performance."}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Environmental Adaptation Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium mb-2">Climate Resilience</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Cold Operation</span>
                    <span className="text-xs">
                      {selectedSystem === "brakes" || selectedSystem === "electrical" ? "Strong" : "Moderate"}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full bg-blue-500" 
                      style={{ 
                        width: selectedSystem === "brakes" || selectedSystem === "electrical" ? "85%" : "65%" 
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1 mt-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Heat Operation</span>
                    <span className="text-xs">
                      {selectedSystem === "cooling" ? "Moderate" : "Strong"}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full bg-red-500" 
                      style={{ 
                        width: selectedSystem === "cooling" ? "65%" : "80%" 
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">Terrain Adaptation</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Elevation</span>
                    <span className="text-xs">
                      {selectedSystem === "engine" || selectedSystem === "fuel" ? "Sensitive" : "Resilient"}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full bg-green-500" 
                      style={{ 
                        width: selectedSystem === "engine" || selectedSystem === "fuel" ? "60%" : "85%" 
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1 mt-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Road Conditions</span>
                    <span className="text-xs">
                      {selectedSystem === "brakes" || selectedSystem === "cooling" ? "Sensitive" : "Moderate"}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full bg-amber-500" 
                      style={{ 
                        width: selectedSystem === "brakes" || selectedSystem === "cooling" ? "60%" : "75%" 
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium mb-2">Adaptation Strategy</div>
              <p className="text-xs text-muted-foreground">
                {selectedSystem === "engine" && "The engine control module has adapted to your driving patterns by optimizing fuel-air mixture and timing. This dynamic tuning has improved performance while maintaining efficiency across varied environmental conditions."}
                {selectedSystem === "brakes" && "The system has detected increased brake usage in mountainous regions and has adjusted maintenance intervals accordingly. Consider upgrading to high-performance brake pads better suited for variable terrain."}
                {selectedSystem === "cooling" && "Cooling system performance varies significantly with ambient temperature. The system has adjusted fan operation timing and coolant flow rates to compensate for these variations."}
                {selectedSystem === "electrical" && "Battery charging cycles have been optimized based on temperature variations and usage patterns. The system now maintains optimal charge levels across all environmental conditions."}
                {selectedSystem === "fuel" && "Fuel injection timing and duration have been fine-tuned based on altitude changes and fuel quality detection. This has resulted in consistent performance across varied driving conditions."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
