
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Navbar } from "@/components/ui/navbar";
import { Separator } from "@/components/ui/separator";
import { PredictiveChart } from "@/components/dashboard/predictive-chart";
import { VehicleHealthChart } from "@/components/dashboard/vehicle-health-chart";

const Monitoring = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background text-foreground">
        <Navbar />
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex-1 p-6 lg:px-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight">Monitoring</h1>
              <p className="text-muted-foreground">
                Real-time monitoring of all systems and equipment.
              </p>
            </div>
            <Separator className="my-4" />
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <PredictiveChart />
                <VehicleHealthChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Monitoring;
