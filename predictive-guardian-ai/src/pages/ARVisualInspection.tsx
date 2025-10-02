
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Navbar } from "@/components/ui/navbar";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Scan, Car, WrenchIcon, Triangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ARVisualInspection = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("technician");
  const [scanning, setScanning] = useState(false);
  const [detectedIssue, setDetectedIssue] = useState<null | {
    component: string;
    location: string;
    issue: string;
    solution: string;
    cost: number;
    severity: "low" | "medium" | "high";
  }>(null);

  const handleScan = () => {
    setScanning(true);
    
    // Simulate detection process
    setTimeout(() => {
      setScanning(false);
      
      // Simulate detection results
      const issues = [
        {
          component: "Brake Caliper",
          location: "Front Right Wheel",
          issue: "Excessive wear on brake pad (2mm remaining)",
          solution: "Replace brake pads and inspect rotor surface",
          cost: 149.99,
          severity: "high" as const,
        },
        {
          component: "Air Filter",
          location: "Engine Bay, Right Side",
          issue: "Clogged with debris, restricting airflow",
          solution: "Replace air filter element",
          cost: 24.99,
          severity: "medium" as const,
        },
        {
          component: "Oil Gasket",
          location: "Engine, Lower Crankcase",
          issue: "Minor oil seepage detected",
          solution: "Replace oil pan gasket during next service",
          cost: 89.95,
          severity: "low" as const,
        }
      ];
      
      // Randomly select one issue to display
      const randomIssue = issues[Math.floor(Math.random() * issues.length)];
      setDetectedIssue(randomIssue);
      
      toast({
        title: "Issue Detected",
        description: `Found issue with ${randomIssue.component}`,
        variant: "destructive",
      });
    }, 2500);
  };

  const clearDetection = () => {
    setDetectedIssue(null);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background text-foreground">
        <Navbar />
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex-1 p-6 lg:px-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight">AR Visual Inspection</h1>
              <p className="text-muted-foreground">
                Use augmented reality to diagnose and repair vehicle issues
              </p>
            </div>
            <Separator className="my-4" />
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList>
                <TabsTrigger value="technician">
                  <WrenchIcon className="mr-2 h-4 w-4" />
                  Technician View
                </TabsTrigger>
                <TabsTrigger value="driver">
                  <Car className="mr-2 h-4 w-4" />
                  Driver View
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="technician" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>YOLOv8 Component Detection</CardTitle>
                      <CardDescription>Point camera at vehicle components for AI diagnostics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted aspect-video rounded-md flex flex-col items-center justify-center relative overflow-hidden">
                        {scanning ? (
                          <div className="flex flex-col items-center justify-center">
                            <Scan className="h-16 w-16 text-primary animate-pulse" />
                            <p className="text-lg font-medium mt-4">Scanning Component...</p>
                          </div>
                        ) : detectedIssue ? (
                          <div className="w-full h-full bg-background/80 absolute inset-0 flex flex-col items-center justify-center p-6">
                            <Triangle 
                              className={
                                detectedIssue.severity === "high" ? "h-16 w-16 text-destructive mb-2" :
                                detectedIssue.severity === "medium" ? "h-16 w-16 text-amber-500 mb-2" :
                                "h-16 w-16 text-yellow-500 mb-2"
                              } 
                              fill="currentColor"
                              fillOpacity={0.2}
                            />
                            <h3 className="text-xl font-bold">{detectedIssue.component}</h3>
                            <p className="text-muted-foreground text-center">{detectedIssue.issue}</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <Scan className="h-16 w-16 text-muted-foreground" />
                            <p className="text-lg font-medium mt-4">Ready to scan</p>
                            <p className="text-sm text-muted-foreground">Position camera at component</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {detectedIssue ? (
                        <Button variant="outline" onClick={clearDetection}>
                          Clear Detection
                        </Button>
                      ) : (
                        <Button 
                          onClick={handleScan} 
                          disabled={scanning}
                        >
                          {scanning ? "Scanning..." : "Scan Component"}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                  
                  {detectedIssue && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Diagnostic Report</CardTitle>
                        <CardDescription>Details about the detected issue</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Component</h3>
                          <p className="text-base">{detectedIssue.component}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                          <p className="text-base">{detectedIssue.location}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Issue</h3>
                          <p className="text-base">{detectedIssue.issue}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Recommended Solution</h3>
                          <p className="text-base">{detectedIssue.solution}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Estimated Cost</h3>
                          <p className="text-lg font-semibold">${detectedIssue.cost.toFixed(2)}</p>
                        </div>
                        <div className="mt-4">
                          <div 
                            className={
                              detectedIssue.severity === "high" ? "px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium inline-block" :
                              detectedIssue.severity === "medium" ? "px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium inline-block" :
                              "px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium inline-block"
                            }
                          >
                            {detectedIssue.severity === "high" ? "High Priority" :
                             detectedIssue.severity === "medium" ? "Medium Priority" :
                             "Low Priority"}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          onClick={() => {
                            toast({
                              title: "3D Model Available",
                              description: "Opening interactive repair guide",
                              variant: "default",
                            });
                          }}
                        >
                          View 3D Repair Guide
                        </Button>
                      </CardFooter>
                    </Card>
                  )}
                </div>
                
                {!detectedIssue && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>How to use AR Visual Inspection</CardTitle>
                      <CardDescription>Guide for technicians</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Point your device camera at the vehicle component you want to inspect</li>
                        <li>Tap the "Scan Component" button to initiate YOLOv8 detection</li>
                        <li>The system will analyze the component and identify any issues</li>
                        <li>For identified issues, view the 3D repair guide by clicking the button</li>
                        <li>Follow on-screen guidance to complete the repair process</li>
                      </ol>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="driver" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Self-Service Diagnostics</CardTitle>
                    <CardDescription>For drivers to identify simple issues</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted aspect-video rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <Car className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium">Driver Self-Diagnostics</h3>
                        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                          Use your smartphone camera to scan dashboard warning lights or vehicle components.
                          Our AI will provide guidance on severity and next steps.
                        </p>
                        <Button className="mt-4" variant="outline">
                          Launch Mobile Experience
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Common Issues</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          <span>Check Engine Light</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                          <span>Low Tire Pressure</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                          <span>Battery Warning</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          <span>Coolant Temperature</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>DIY Repairs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span>Replace Wiper Blades</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span>Change Air Filter</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span>Replace Light Bulbs</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span>Check Fluid Levels</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Service Locator</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">Find nearby service centers for repairs that require professional assistance</p>
                      <Button className="w-full" variant="outline">Find Service Centers</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ARVisualInspection;
