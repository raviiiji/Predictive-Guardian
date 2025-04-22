
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, CarFront } from "lucide-react";
import { cn } from "@/lib/utils";

interface MaintenanceAlert {
  id: string;
  component: string;
  prediction: string;
  confidence: number;
  icon: React.ReactNode;
  severity: "high" | "medium" | "low";
}

const alerts: MaintenanceAlert[] = [
  {
    id: "1",
    component: "Battery System",
    prediction: "Potential failure in 15 days",
    confidence: 89,
    icon: <Battery className="h-5 w-5" />,
    severity: "high"
  },
  {
    id: "2",
    component: "Brake System",
    prediction: "Service required in 30 days",
    confidence: 78,
    icon: <CarFront className="h-5 w-5" />,
    severity: "medium"
  }
];

export function MaintenanceAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Predictive Maintenance Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={cn(
                "p-4 rounded-lg border",
                alert.severity === "high" 
                  ? "bg-kpit-danger/10 border-kpit-danger/20" 
                  : "bg-kpit-warning/10 border-kpit-warning/20"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "mt-1",
                  alert.severity === "high" ? "text-kpit-danger" : "text-kpit-warning"
                )}>
                  {alert.icon}
                </div>
                <div>
                  <h4 className="font-medium">{alert.component}</h4>
                  <p className="text-sm text-muted-foreground">{alert.prediction}</p>
                  <p className="text-sm mt-1">
                    Confidence: {alert.confidence}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
