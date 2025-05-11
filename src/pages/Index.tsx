
import React, { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Navbar } from "@/components/ui/navbar";
import { Separator } from "@/components/ui/separator";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { PredictiveChart } from "@/components/dashboard/predictive-chart";
import { EquipmentHealth } from "@/components/dashboard/equipment-health";
import { AlertsPanel } from "@/components/dashboard/alerts-data";
import { VehicleHealthChart } from "@/components/dashboard/vehicle-health-chart";
import { MaintenanceAlerts } from "@/components/dashboard/maintenance-alerts";
import { ModelTrainingVisualization } from "@/components/dashboard/model-training-visualization";
import { VirtualEnvironment } from "@/components/dashboard/virtual-environment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "react-router-dom";

const Index = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const location = useLocation();
  
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Handle URL hash changes and update the active tab
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && ["overview", "equipment", "alerts", "models", "environment"].includes(hash)) {
        setActiveTab(hash);
      }
    };
    
    // Set initial tab from URL hash
    handleHashChange();
    
    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange);
    
    // Clean up
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Force tab refresh when active tab changes
  useEffect(() => {
    console.log("Active tab changed to:", activeTab);
  }, [activeTab]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background text-foreground">
        <Navbar />
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex-1 p-6 lg:px-8">
            <div className="flex items-center justify-between">
              <DashboardHeader 
                title="KPIT Predictive Guardian AI" 
                subtitle="Real-time equipment health monitoring and predictive maintenance"
                onRefresh={handleRefresh}
              />
              <SidebarTrigger />
            </div>
            <Separator className="my-4" />
            
            <div className="space-y-6">
              <StatsCards key={`stats-${refreshKey}`} />
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="equipment">Equipment</TabsTrigger>
                  <TabsTrigger value="alerts">Alerts</TabsTrigger>
                  <TabsTrigger value="models">Model Training</TabsTrigger>
                  <TabsTrigger value="environment">Environment</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <VehicleHealthChart key={`health-${refreshKey}`} />
                    <MaintenanceAlerts key={`maintenance-${refreshKey}`} />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <PredictiveChart key={`chart-${refreshKey}`} />
                    <AlertsPanel key={`alerts-${refreshKey}`} />
                  </div>
                </TabsContent>
                
                <TabsContent value="equipment">
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold">Equipment Health Status</h2>
                    <p className="text-sm text-muted-foreground">Monitor and manage all connected equipment</p>
                  </div>
                  <EquipmentHealth key={`equipment-${refreshKey}`} />
                </TabsContent>
                
                <TabsContent value="alerts">
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold">System Alerts</h2>
                    <p className="text-sm text-muted-foreground">View and manage all system alerts and notifications</p>
                  </div>
                  <div className="max-w-3xl">
                    <AlertsPanel key={`all-alerts-${refreshKey}`} />
                  </div>
                </TabsContent>

                <TabsContent value="models">
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold">AI Model Training & Performance</h2>
                    <p className="text-sm text-muted-foreground">LSTM model training process and performance metrics</p>
                  </div>
                  <ModelTrainingVisualization key={`model-training-${refreshKey}`} />
                </TabsContent>
                
                <TabsContent value="environment">
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold">Development Environment</h2>
                    <p className="text-sm text-muted-foreground">Monitor Docker containers and CI/CD workflows</p>
                  </div>
                  <VirtualEnvironment key={`environment-${refreshKey}`} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
