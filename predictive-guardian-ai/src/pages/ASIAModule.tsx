
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Navbar } from "@/components/ui/navbar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ASIASystemImpactChart } from "@/components/asia/system-impact-chart";
import { ASIAComponentChange } from "@/components/asia/component-change";
import { ASIAEnvironmentalFactors } from "@/components/asia/environmental-factors";
import { ASIADashboard } from "@/components/asia/asia-dashboard";
import { useToast } from "@/hooks/use-toast";

const ASIAModule = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background text-foreground">
        <Navbar />
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex-1 p-6 lg:px-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight">ASIA Module</h1>
              <p className="text-muted-foreground">
                Adaptive System Impact Analyzer - Analyze how terrain, behavior, and climate affect vehicle systems
              </p>
            </div>
            <Separator className="my-4" />
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-4 w-full max-w-2xl">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="component">Component Change</TabsTrigger>
                <TabsTrigger value="environment">Environmental</TabsTrigger>
                <TabsTrigger value="system-impact">System Impact</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="space-y-6">
                <ASIADashboard />
              </TabsContent>
              
              <TabsContent value="component" className="space-y-6">
                <ASIAComponentChange />
              </TabsContent>
              
              <TabsContent value="environment" className="space-y-6">
                <ASIAEnvironmentalFactors />
              </TabsContent>
              
              <TabsContent value="system-impact" className="space-y-6">
                <ASIASystemImpactChart />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ASIAModule;
