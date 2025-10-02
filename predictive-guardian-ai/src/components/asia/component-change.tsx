
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SensorComparisonChart } from "@/components/dashboard/sensor-comparison-chart";
import { useToast } from "@/hooks/use-toast";

export function ASIAComponentChange() {
  const { toast } = useToast();
  const [selectedComponent, setSelectedComponent] = useState("oxygen-sensor");
  const [selectedDriver, setSelectedDriver] = useState("driver1");

  const componentOptions = [
    { value: "oxygen-sensor", label: "Oxygen Sensor", replaced: true },
    { value: "mass-airflow", label: "Mass Airflow Sensor", replaced: true },
    { value: "coolant-temp", label: "Coolant Temperature Sensor", replaced: true },
    { value: "fuel-injector", label: "Fuel Injector", replaced: false },
    { value: "brake-pads", label: "Brake Pads", replaced: false },
  ];

  const driverOptions = [
    { value: "driver1", label: "James Wilson" },
    { value: "driver2", label: "Sarah Johnson" },
    { value: "driver3", label: "Mike Thompson" },
  ];

  const componentImpacts = {
    "oxygen-sensor": {
      engineLife: "+7.2%",
      fuelConsumption: "-12.5%",
      emissions: "-18.3%",
      maintenanceSchedule: "+2.5 months",
      recommendation: "Maintain current driving patterns to maximize component efficiency."
    },
    "mass-airflow": {
      engineLife: "+5.8%",
      fuelConsumption: "-9.3%",
      emissions: "-12.1%",
      maintenanceSchedule: "+1.5 months",
      recommendation: "Avoid excessive idle time to maintain optimal performance."
    },
    "coolant-temp": {
      engineLife: "+4.1%",
      fuelConsumption: "-5.2%",
      emissions: "-8.4%",
      maintenanceSchedule: "+1 month",
      recommendation: "Consider coolant flush in 6 months to maintain optimal thermal efficiency."
    },
  };

  const handleAnalyze = () => {
    toast({
      title: "Analysis Complete",
      description: `Impact analysis for ${componentOptions.find(c => c.value === selectedComponent)?.label} updated.`,
    });
  };

  const getSelectedComponentImpact = () => {
    return componentImpacts[selectedComponent as keyof typeof componentImpacts];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Component Change Analysis</CardTitle>
          <CardDescription>Analyze the impact of component replacements or upgrades on vehicle systems</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Select Component</label>
              <Select value={selectedComponent} onValueChange={setSelectedComponent}>
                <SelectTrigger>
                  <SelectValue placeholder="Select component" />
                </SelectTrigger>
                <SelectContent>
                  {componentOptions.map((component) => (
                    <SelectItem key={component.value} value={component.value}>
                      <div className="flex items-center justify-between w-full">
                        <span>{component.label}</span>
                        {component.replaced && (
                          <Badge variant="outline" className="ml-2 bg-blue-500/10 text-blue-500">
                            Replaced
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Select Driver</label>
              <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                <SelectTrigger>
                  <SelectValue placeholder="Select driver" />
                </SelectTrigger>
                <SelectContent>
                  {driverOptions.map((driver) => (
                    <SelectItem key={driver.value} value={driver.value}>
                      {driver.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={handleAnalyze} className="w-full mt-4">Analyze Impact</Button>
        </CardContent>
      </Card>
      
      {componentOptions.find(c => c.value === selectedComponent)?.replaced && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              System Impact Analysis
              <Badge variant="outline" className="bg-green-500/10 text-green-500">Positive Impact</Badge>
            </CardTitle>
            <CardDescription>
              How the {componentOptions.find(c => c.value === selectedComponent)?.label} replacement affects vehicle systems
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Engine Lifespan</div>
                <div className="text-lg font-semibold text-green-500">{getSelectedComponentImpact().engineLife}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Fuel Consumption</div>
                <div className="text-lg font-semibold text-green-500">{getSelectedComponentImpact().fuelConsumption}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Emissions</div>
                <div className="text-lg font-semibold text-green-500">{getSelectedComponentImpact().emissions}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Maintenance Timeline</div>
                <div className="text-lg font-semibold text-green-500">{getSelectedComponentImpact().maintenanceSchedule}</div>
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium mb-1">AI Recommendation:</div>
              <div className="text-sm text-muted-foreground">{getSelectedComponentImpact().recommendation}</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => {
              toast({
                title: "Analysis Downloaded",
                description: "Comprehensive component impact report has been exported.",
              });
            }}>
              Export Analysis Report
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {componentOptions.find(c => c.value === selectedComponent)?.replaced && (
        <SensorComparisonChart driverId={selectedDriver} />
      )}
    </div>
  );
}
