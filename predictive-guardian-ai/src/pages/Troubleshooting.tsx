
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Navbar } from "@/components/ui/navbar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, CheckCircle, HelpCircle, Search, Terminal, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Define troubleshooting categories
const troubleshootingCategories = [
  { 
    id: "equipment", 
    title: "Equipment Issues",
    description: "Diagnose and fix hardware-related problems",
    steps: [
      "Check if the equipment is powered on",
      "Verify all connections are secure",
      "Check for warning lights or error codes",
      "Restart the equipment if safe to do so",
      "Check equipment logs for error messages"
    ],
    commonIssues: [
      { 
        issue: "Equipment not powering on", 
        solution: "Check power supply and connections. Verify circuit breaker is not tripped." 
      },
      { 
        issue: "Unusual vibration detected", 
        solution: "Check for loose parts, imbalance, or bearing wear. Schedule maintenance if persistent." 
      },
      { 
        issue: "Unexpected shutdowns", 
        solution: "Check cooling systems and ventilation. Ensure operating conditions are within specifications." 
      },
      { 
        issue: "Error codes displayed", 
        solution: "Document the code and refer to equipment manual. Contact support if unresolved." 
      }
    ]
  },
  { 
    id: "connectivity", 
    title: "Connectivity Issues",
    description: "Resolve network and data transmission problems",
    steps: [
      "Check network connection status",
      "Verify network configurations",
      "Test connectivity to central system",
      "Check for firewall or security restrictions",
      "Restart communication modules if needed"
    ],
    commonIssues: [
      { 
        issue: "Data not transmitting", 
        solution: "Check network status, verify credentials, and ensure proper configuration." 
      },
      { 
        issue: "Intermittent connection", 
        solution: "Check for interference, signal strength, or hardware issues with communication modules." 
      },
      { 
        issue: "Authentication errors", 
        solution: "Verify credentials, check certificate validity, and ensure correct time synchronization." 
      },
      { 
        issue: "Slow data transmission", 
        solution: "Check bandwidth availability, network congestion, or hardware limitations." 
      }
    ]
  },
  { 
    id: "software", 
    title: "Software Issues",
    description: "Troubleshoot application and firmware problems",
    steps: [
      "Check current software/firmware version",
      "Look for available updates",
      "Check system logs for errors",
      "Clear cache or temporary files if applicable",
      "Restart the application or system"
    ],
    commonIssues: [
      { 
        issue: "Application crashes", 
        solution: "Check for updates, clear cache, and restart. Document the conditions when crash occurs." 
      },
      { 
        issue: "Incorrect data display", 
        solution: "Verify sensor calibration, check for data processing errors, and clear app cache." 
      },
      { 
        issue: "Update failures", 
        solution: "Ensure sufficient storage space, stable connection, and try again. Contact support if persistent." 
      },
      { 
        issue: "Performance degradation", 
        solution: "Check resource usage, clean unnecessary data, and optimize system settings." 
      }
    ]
  }
];

const Troubleshooting = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("equipment");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      toast({
        title: "Search initiated",
        description: `Searching for: "${searchTerm}"`,
        duration: 3000,
      });
    }
  };

  const handleSolve = (issue: string) => {
    toast({
      title: "Solution applied",
      description: `Troubleshooting steps for "${issue}" have been initiated`,
      duration: 3000,
    });
  };

  const filteredCategories = searchTerm.trim() 
    ? troubleshootingCategories.map(category => ({
        ...category,
        commonIssues: category.commonIssues.filter(
          issue => issue.issue.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  issue.solution.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.commonIssues.length > 0)
    : troubleshootingCategories;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background text-foreground">
        <Navbar />
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex-1 p-6 lg:px-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight">Troubleshooting</h1>
              <p className="text-muted-foreground">
                Diagnose and solve equipment and system issues quickly.
              </p>
            </div>
            <Separator className="my-4" />
            
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search for issues or solutions..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </form>

              {searchTerm.trim() && filteredCategories.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No matching issues found</h3>
                  <p className="text-muted-foreground text-center mt-2">
                    Try searching with different terms or browse the categories below.
                  </p>
                </div>
              )}

              {(!searchTerm.trim() || filteredCategories.length > 0) && (
                <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    {troubleshootingCategories.map((category) => (
                      <TabsTrigger key={category.id} value={category.id}>
                        {category.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {troubleshootingCategories.map((category) => {
                    const currentCategory = filteredCategories.find(c => c.id === category.id);
                    
                    return (
                      <TabsContent key={category.id} value={category.id}>
                        <Card>
                          <CardHeader>
                            <CardTitle>{category.title}</CardTitle>
                            <CardDescription>{category.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h3 className="font-medium mb-2">General Troubleshooting Steps:</h3>
                              <ol className="list-decimal list-inside space-y-1 pl-2">
                                {category.steps.map((step, index) => (
                                  <li key={index} className="text-sm">{step}</li>
                                ))}
                              </ol>
                            </div>
                            
                            <div>
                              <h3 className="font-medium mb-2">Common Issues:</h3>
                              {searchTerm.trim() && currentCategory?.commonIssues.length === 0 ? (
                                <div className="text-sm text-muted-foreground py-2">
                                  No matching issues found in this category.
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  {(searchTerm.trim() ? currentCategory?.commonIssues : category.commonIssues).map((item, index) => (
                                    <Card key={index} className="bg-secondary/30">
                                      <CardHeader className="py-3 px-4">
                                        <div className="flex items-start gap-2">
                                          <AlertTriangle className="h-5 w-5 text-kpit-warning mt-0.5" />
                                          <CardTitle className="text-base">{item.issue}</CardTitle>
                                        </div>
                                      </CardHeader>
                                      <CardContent className="py-3 px-4 pt-0">
                                        <div className="flex items-start gap-2">
                                          <CheckCircle className="h-5 w-5 text-kpit-success mt-0.5" />
                                          <p className="text-sm">{item.solution}</p>
                                        </div>
                                      </CardContent>
                                      <CardFooter className="py-3 px-4">
                                        <Button 
                                          variant="default" 
                                          size="sm"
                                          className="ml-auto"
                                          onClick={() => handleSolve(item.issue)}
                                        >
                                          <span>Apply Solution</span>
                                          <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                      </CardFooter>
                                    </Card>
                                  ))}
                                </div>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <p className="text-sm text-muted-foreground">
                              Need more assistance? Contact system support.
                            </p>
                            <Button variant="outline" size="sm">
                              <Terminal className="mr-2 h-4 w-4" />
                              View Diagnostic Logs
                            </Button>
                          </CardFooter>
                        </Card>
                      </TabsContent>
                    );
                  })}
                </Tabs>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Troubleshooting;
