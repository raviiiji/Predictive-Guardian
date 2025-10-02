
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Navbar } from "@/components/ui/navbar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DriverImpactChart } from "@/components/dashboard/driver-impact-chart";
import { SensorComparisonChart } from "@/components/dashboard/sensor-comparison-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DriverAnalysis = () => {
  const [selectedDriver, setSelectedDriver] = useState("driver-1");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background text-foreground">
        <Navbar />
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex-1 p-6 lg:px-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight">Driver Behavior Analysis</h1>
              <p className="text-muted-foreground">
                Analyze how driving patterns affect vehicle health, sensor performance, and efficiency.
              </p>
            </div>
            <Separator className="my-4" />
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold">Driver Profile:</h2>
                <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Driver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="driver-1">John Smith</SelectItem>
                    <SelectItem value="driver-2">Sarah Chen</SelectItem>
                    <SelectItem value="driver-3">Robert Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Learning Status:</span>
                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                  Active Learning
                </Badge>
              </div>
            </div>
            
            <Tabs defaultValue="impact">
              <TabsList className="grid grid-cols-3 mb-4 w-full md:w-[600px]">
                <TabsTrigger value="impact">Driver Impact</TabsTrigger>
                <TabsTrigger value="sensor-comparison">Sensor Comparison</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="impact" className="space-y-6">
                <DriverImpactChart driverId={selectedDriver} />
              </TabsContent>
              
              <TabsContent value="sensor-comparison" className="space-y-6">
                <SensorComparisonChart driverId={selectedDriver} />
              </TabsContent>
              
              <TabsContent value="recommendations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">AI-Generated Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-amber-500 pl-4 py-2">
                        <h3 className="font-medium">Reduce Harsh Acceleration</h3>
                        <p className="text-sm text-muted-foreground">
                          Current driving pattern shows frequent rapid acceleration, which increases fuel consumption by 22% and accelerates engine wear.
                          Recommend smoother acceleration to extend engine lifespan by an estimated 15%.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-green-500 pl-4 py-2">
                        <h3 className="font-medium">Optimal Braking Detected</h3>
                        <p className="text-sm text-muted-foreground">
                          Braking patterns are within optimal ranges, extending brake pad lifespan. 
                          Current use suggests 18% longer brake component lifespan compared to fleet average.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-amber-500 pl-4 py-2">
                        <h3 className="font-medium">High RPM Operation</h3>
                        <p className="text-sm text-muted-foreground">
                          Engine frequently operated at high RPM ranges. Recommend shifting at lower RPM to reduce engine stress
                          and improve fuel efficiency by an estimated 12-15%.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Learning Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Model Confidence</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "87%" }}></div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        AI model has processed 328 hours of driving data and continues to improve recommendations as more data is collected.
                        Next update scheduled in 3 days.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DriverAnalysis;
