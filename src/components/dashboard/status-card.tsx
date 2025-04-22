
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  className?: string;
}

export function StatusCard({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className,
}: StatusCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <div
            className={cn(
              "flex items-center text-xs mt-2",
              trend === "up" ? "text-kpit-success" : trend === "down" ? "text-kpit-danger" : "text-muted-foreground"
            )}
          >
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
            <span className="ml-1">{trendValue}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
