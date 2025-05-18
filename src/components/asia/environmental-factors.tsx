
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Wind, ThermometerSun, ThermometerSnowflake, Car } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ASIAEnvironmentalFactors() {
  const { toast } = useToast();
  const [selectedClimate, setSelectedClimate] = useState("temperate");
  const [selectedTerrain, setSelectedTerrain] = useState("mixed");
  const [temperature, setTemperature] = useState([22]);
  const [humidity, setHumidity] = useState([45]);
  const [precipitation, setPrecipitation] = useState([15]);
  const [elevation, setElevation] = useState([200]);
  const [activeTab, setActiveTab] = useState("climate");

  const climateOptions = [
    { value: "tropical", label: "Tropical" },
    { value: "arid", label: "Arid/Desert" },
    { value: "temperate", label: "Temperate" },
    { value: "continental", label: "Continental" },
    { value: "polar", label: "Polar/Arctic" },
  ];

  const terrainOptions = [
    { value: "flat", label: "Flat/Plains" },
    { value: "hilly", label: "Hilly" },
    { value: "mountain", label: "Mountainous" },
    { value: "mixed", label: "Mixed Terrain" },
  ];

  const handleSimulate = () => {
    toast({
      title: "Simulation Complete",
      description: `Environmental impact analysis has been updated.`,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="climate">
            <ThermometerSun className="h-4 w-4 mr-2" />
            Climate Factors
          </TabsTrigger>
          <TabsTrigger value="terrain">
            <Car className="h-4 w-4 mr-2" />
            Terrain Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="climate" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Climate Impact Simulation</CardTitle>
              <CardDescription>
                Analyze how temperature, humidity and precipitation affect vehicle systems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Climate Type</label>
                  <Select value={selectedClimate} onValueChange={setSelectedClimate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select climate type" />
                    </SelectTrigger>
                    <SelectContent>
                      {climateOptions.map((climate) => (
                        <SelectItem key={climate.value} value={climate.value}>{climate.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Temperature</label>
                    <span className="text-sm text-muted-foreground">{temperature[0]}°C</span>
                  </div>
                  <Slider 
                    value={temperature} 
                    min={-20} 
                    max={50} 
                    step={1}
                    onValueChange={setTemperature} 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>-20°C</span>
                    <span>50°C</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Humidity</label>
                    <span className="text-sm text-muted-foreground">{humidity[0]}%</span>
                  </div>
                  <Slider 
                    value={humidity} 
                    min={0} 
                    max={100} 
                    step={1}
                    onValueChange={setHumidity} 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Precipitation</label>
                    <span className="text-sm text-muted-foreground">{precipitation[0]} mm/day</span>
                  </div>
                  <Slider 
                    value={precipitation} 
                    min={0} 
                    max={100} 
                    step={1}
                    onValueChange={setPrecipitation} 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0 mm</span>
                    <span>100 mm</span>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSimulate} className="w-full">Simulate Climate Impact</Button>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium">Engine System Impact</CardTitle>
                  {temperature[0] > 30 ? (
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500">Caution</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">Normal</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Operating Temperature</div>
                  <div className="text-sm font-medium">
                    {temperature[0] > 30 ? 
                      `${85 + (temperature[0] - 30) * 1.5}°C (Above optimal)` : 
                      `${85 - (30 - temperature[0]) * 0.5}°C (Optimal)`
                    }
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Oil Degradation Rate</div>
                  <div className="text-sm font-medium">
                    {temperature[0] > 30 ? 
                      <span className="text-amber-500">+{(temperature[0] - 30) * 2}% faster</span> : 
                      <span className="text-green-500">Normal</span>
                    }
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Cooling System Load</div>
                  <div className="text-sm font-medium">
                    {temperature[0] > 30 ? 
                      <span className="text-amber-500">High ({60 + (temperature[0] - 30) * 2}%)</span> : 
                      <span>Normal ({60 - (30 - temperature[0]) * 1}%)</span>
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium">Electrical System Impact</CardTitle>
                  {humidity[0] > 70 ? (
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500">Caution</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">Normal</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Battery Performance</div>
                  <div className="text-sm font-medium">
                    {temperature[0] < 5 ? 
                      <span className="text-amber-500">{100 - (5 - temperature[0]) * 3}% efficiency</span> : 
                      <span>100% efficiency</span>
                    }
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Connector Corrosion Risk</div>
                  <div className="text-sm font-medium">
                    {humidity[0] > 70 ? 
                      <span className="text-amber-500">Elevated ({(humidity[0] - 70) * 3}%)</span> : 
                      <span className="text-green-500">Low ({humidity[0] / 3}%)</span>
                    }
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Sensor Accuracy</div>
                  <div className="text-sm font-medium">
                    {humidity[0] > 80 ? 
                      <span className="text-amber-500">Reduced ({100 - (humidity[0] - 80)}%)</span> : 
                      <span>Normal (100%)</span>
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="terrain" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Terrain Impact Analysis</CardTitle>
              <CardDescription>
                Analyze how road conditions and elevation affect vehicle systems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Terrain Type</label>
                  <Select value={selectedTerrain} onValueChange={setSelectedTerrain}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select terrain type" />
                    </SelectTrigger>
                    <SelectContent>
                      {terrainOptions.map((terrain) => (
                        <SelectItem key={terrain.value} value={terrain.value}>{terrain.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Elevation</label>
                    <span className="text-sm text-muted-foreground">{elevation[0]} m</span>
                  </div>
                  <Slider 
                    value={elevation} 
                    min={0} 
                    max={3000} 
                    step={50}
                    onValueChange={setElevation} 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Sea level</span>
                    <span>3000 m</span>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSimulate} className="w-full">Analyze Terrain Impact</Button>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium">Powertrain Impact</CardTitle>
                  {selectedTerrain === "mountain" || elevation[0] > 1500 ? (
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500">Moderate Stress</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">Low Stress</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Engine Load</div>
                  <div className="text-sm font-medium">
                    {selectedTerrain === "mountain" ? 
                      <span className="text-amber-500">Increased (+22%)</span> : 
                      selectedTerrain === "hilly" ?
                      <span className="text-amber-500">Increased (+12%)</span> :
                      <span>Normal</span>
                    }
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Fuel Efficiency</div>
                  <div className="text-sm font-medium">
                    {elevation[0] > 1500 ? 
                      <span className="text-amber-500">{100 - (elevation[0] - 1500) / 50}% of baseline</span> : 
                      <span>100% of baseline</span>
                    }
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Transmission Heat</div>
                  <div className="text-sm font-medium">
                    {selectedTerrain === "mountain" ? 
                      <span className="text-amber-500">+15°C above normal</span> : 
                      selectedTerrain === "hilly" ?
                      <span className="text-amber-500">+8°C above normal</span> :
                      <span>Normal operating temperature</span>
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium">Maintenance Impact</CardTitle>
                  {selectedTerrain === "mountain" ? (
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500">Schedule Adjustment</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">Standard Schedule</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Brake System</div>
                  <div className="text-sm font-medium">
                    {selectedTerrain === "mountain" ? 
                      <span className="text-amber-500">Inspection needed -30 days earlier</span> : 
                      selectedTerrain === "hilly" ?
                      <span className="text-amber-500">Inspection needed -15 days earlier</span> :
                      <span>Standard schedule</span>
                    }
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Suspension Components</div>
                  <div className="text-sm font-medium">
                    {selectedTerrain === "mountain" || selectedTerrain === "hilly" ? 
                      <span className="text-amber-500">Higher wear detected</span> : 
                      <span className="text-green-500">Normal wear pattern</span>
                    }
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Oil Change Interval</div>
                  <div className="text-sm font-medium">
                    {elevation[0] > 1500 ? 
                      <span className="text-amber-500">Reduced by {Math.round((elevation[0] - 1500) / 100)}%</span> : 
                      <span>Standard interval</span>
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
