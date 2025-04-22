
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface EquipmentCardProps {
  title: string;
  health: number;
  status: "healthy" | "warning" | "critical" | "maintenance";
  lastMaintenance: string;
  nextPrediction: string;
  type: string;
  className?: string;
}

export function EquipmentCard({
  title,
  health,
  status,
  lastMaintenance,
  nextPrediction,
  type,
  className,
}: EquipmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-kpit-success";
      case "warning":
        return "text-kpit-warning";
      case "critical":
        return "text-kpit-danger";
      case "maintenance":
        return "text-blue-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getHealthColor = (health: number) => {
    if (health > 75) return "bg-kpit-success";
    if (health > 50) return "bg-kpit-warning";
    return "bg-kpit-danger";
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <span className={cn("text-xs font-medium", getStatusColor(status))}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-muted-foreground">Health Score</div>
          <div className="font-medium">{health}%</div>
        </div>
        <Progress value={health} className={cn("h-1.5", getHealthColor(health))} />
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div>
            <div className="text-xs text-muted-foreground">Type</div>
            <div className="text-xs font-medium mt-1">{type}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Last Maintenance</div>
            <div className="text-xs font-medium mt-1">{lastMaintenance}</div>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="text-xs text-muted-foreground">Predicted Next Maintenance</div>
          <div className="text-xs font-medium mt-1">{nextPrediction}</div>
        </div>
      </CardContent>
    </Card>
  );
}
