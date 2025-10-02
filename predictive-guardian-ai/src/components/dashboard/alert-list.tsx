
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: "critical" | "warning" | "info" | "resolved";
  equipment: string;
}

interface AlertListProps {
  alerts: Alert[];
  className?: string;
}

export function AlertList({ alerts, className }: AlertListProps) {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-4 w-4 text-kpit-danger" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-kpit-warning" />;
      case "info":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "resolved":
        return <Check className="h-4 w-4 text-kpit-success" />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-kpit-danger/10 text-kpit-danger border-kpit-danger/20";
      case "warning":
        return "bg-kpit-warning/10 text-kpit-warning border-kpit-warning/20";
      case "info":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "resolved":
        return "bg-kpit-success/10 text-kpit-success border-kpit-success/20";
      default:
        return "";
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-kpit-warning" />
          Recent Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {getSeverityIcon(alert.severity)}
                  <span className="ml-2 font-medium">{alert.title}</span>
                </div>
                <Badge variant="outline" className={cn(getSeverityColor(alert.severity))}>
                  {alert.severity}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{alert.description}</p>
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-muted-foreground">{alert.equipment}</span>
                <span className="text-muted-foreground">{alert.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
