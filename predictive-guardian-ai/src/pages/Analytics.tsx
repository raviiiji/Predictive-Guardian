
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Navbar } from "@/components/ui/navbar";
import { Separator } from "@/components/ui/separator";
import { ModelTrainingVisualization } from "@/components/dashboard/model-training-visualization";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const navigate = useNavigate();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background text-foreground">
        <Navbar />
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex-1 p-6 lg:px-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
              <p className="text-muted-foreground">
                AI model training and performance analytics.
              </p>
            </div>
            <Separator className="my-4" />
            
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">AI Model Training & Performance</h2>
                <Button 
                  variant="outline"
                  className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500"
                  onClick={() => navigate("/driver-analysis")}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  New: Driver Behavior AI
                </Button>
              </div>
              <ModelTrainingVisualization />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;
