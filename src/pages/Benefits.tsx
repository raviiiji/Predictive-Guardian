
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Navbar } from "@/components/ui/navbar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const benefitsList = [
  {
    id: 1,
    title: "Drastic Reduction in Downtime",
    points: [
      "Up to 50% fewer unexpected breakdowns",
      "Higher fleet uptime and customer satisfaction for OEMs & fleet operators"
    ]
  },
  {
    id: 2,
    title: "Lower Maintenance Costs",
    points: [
      "Smarter scheduling reduces preventive over-maintenance",
      "Optimized part replacement reduces inventory & labor costs"
    ]
  },
  {
    id: 3,
    title: "Safer Vehicles",
    points: [
      "Early detection of critical system failures (brakes, battery, steering, etc.)",
      "Direct improvement in road safety compliance"
    ]
  },
  {
    id: 4,
    title: "Real-Time Health Dashboard for Entire Fleet",
    points: [
      "AI-generated insights visible in a central, intuitive control center",
      "OEMs can remotely diagnose issues, reducing service center dependency"
    ]
  },
  {
    id: 5,
    title: "Evolution into a Full Vehicle Health AI Platform",
    points: [
      "Add modules like driver behavior analysis, charging optimization for EVs, or route-based maintenance suggestions"
    ]
  },
  {
    id: 6,
    title: "Integration with OEM Digital Twins",
    points: [
      "Use historical failure + real-time data to feed OEM R&D",
      "Supports vehicle design improvements and software-defined vehicle (SDV) evolution"
    ]
  },
  {
    id: 7,
    title: "Insurance Partnerships",
    points: [
      "Predictive insights reduce risk—making this valuable for usage-based insurance (UBI) models"
    ]
  },
  {
    id: 8,
    title: "Competitive Differentiator for EV Startups",
    points: [
      "Plug-and-play predictive maintenance makes new EVs more reliable and market-ready"
    ]
  },
  {
    id: 9,
    title: "Expansion Beyond Automotive",
    points: [
      "Future-ready for integration into:",
      "• Aerospace (aircraft maintenance)",
      "• Railway systems",
      "• Smart factories / industrial robotics"
    ]
  }
];

const BenefitCard = ({ benefit }: { benefit: typeof benefitsList[0] }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-secondary/50">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
            {benefit.id}
          </span>
          {benefit.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="space-y-2">
          {benefit.points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-kpit-success shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const Benefits = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background text-foreground">
        <Navbar />
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex-1 p-6 lg:px-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight">Key Benefits</h1>
              <p className="text-muted-foreground">
                How Predictive Guardian AI transforms vehicle maintenance and safety
              </p>
            </div>
            <Separator className="my-4" />
            
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefitsList.map((benefit) => (
                  <BenefitCard key={benefit.id} benefit={benefit} />
                ))}
              </div>
              
              <div className="bg-secondary/30 rounded-lg p-6 border border-border">
                <h2 className="text-xl font-semibold mb-4">Why Choose Predictive Guardian AI?</h2>
                <p className="mb-4">
                  Our AI-powered predictive maintenance system delivers tangible business value through data-driven insights, 
                  proactive maintenance scheduling, and comprehensive fleet health monitoring.
                </p>
                <p>
                  Whether you're an OEM looking to enhance service offerings, a fleet operator focused on maximizing 
                  uptime, or entering the EV market with reliability concerns, our platform provides the technological 
                  edge needed in today's competitive landscape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Benefits;
