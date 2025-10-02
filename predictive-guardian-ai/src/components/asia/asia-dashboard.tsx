
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Gauge, ThermometerSun, Battery, Car, Wind } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ASIAMaintenanceTimeline } from "./asia-maintenance-timeline";

export function ASIADashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex justify-between items-center">
              Engine Lifespan
              <Badge variant="outline" className="ml-2 bg-blue-500/10 text-blue-500">Analyzing</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Gauge className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Current Health</span>
              </div>
              <div className="font-medium">78%</div>
            </div>
            <Progress value={78} className="h-1.5 bg-muted" />
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Original Estimate</span>
                <span>250,000 miles</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Current Estimate</span>
                <span className="text-green-500 font-medium">276,500 miles</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Improvement</span>
                <span className="text-green-500 font-medium">+10.6%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex justify-between items-center">
              Cooling System
              <Badge variant="outline" className="ml-2 bg-amber-500/10 text-amber-500">Caution</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <ThermometerSun className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Thermal Efficiency</span>
              </div>
              <div className="font-medium">62%</div>
            </div>
            <Progress value={62} className="h-1.5 bg-muted" />
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Operating Temperature</span>
                <span>87°C (High)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Climate Impact</span>
                <span className="text-amber-500 font-medium">-8.2% efficiency</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Recommendation</span>
                <span className="text-xs">Coolant flush recommended</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex justify-between items-center">
              Battery Systems
              <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-500">Optimal</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Battery className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Charge Cycles</span>
              </div>
              <div className="font-medium">95%</div>
            </div>
            <Progress value={95} className="h-1.5 bg-muted" />
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Estimated Life</span>
                <span>48 months</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Terrain Impact</span>
                <span className="text-green-500 font-medium">Minimal</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Next Service</span>
                <span>Aug 2025</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Adaptive Maintenance Timeline</CardTitle>
          <CardDescription>
            Dynamic maintenance schedule based on environmental factors and component changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ASIAMaintenanceTimeline />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Climate Impact</CardTitle>
              <Wind className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Cold Weather Operation</span>
                <span className="text-red-500">-7.5% efficiency</span>
              </li>
              <li className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Hot Weather Operation</span>
                <span className="text-amber-500">-5.2% efficiency</span>
              </li>
              <li className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Optimal Temperature</span>
                <span>15°C - 25°C</span>
              </li>
              <li className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Humidity Impact</span>
                <span className="text-amber-500">Moderate</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Terrain Analysis</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Highway Driving</span>
                <span className="text-green-500">+4.3% efficiency</span>
              </li>
              <li className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">City Driving</span>
                <span className="text-amber-500">-2.8% efficiency</span>
              </li>
              <li className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Mountainous Terrain</span>
                <span className="text-red-500">-9.1% efficiency</span>
              </li>
              <li className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Recommended Routes</span>
                <span className="text-green-500">Optimized</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Next Maintenance</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Oil Change</span>
                <span>June 15, 2025</span>
              </li>
              <li className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Brake Inspection</span>
                <span>July 22, 2025</span>
              </li>
              <li className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Coolant Flush</span>
                <span className="font-medium text-amber-500">May 28, 2025</span>
              </li>
              <li className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Battery Check</span>
                <span>Aug 10, 2025</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
