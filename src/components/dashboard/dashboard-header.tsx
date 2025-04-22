
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  onRefresh?: () => void;
}

export function DashboardHeader({ title, subtitle, onRefresh }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-9">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="default" size="sm" className="h-9" onClick={onRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
    </div>
  );
}
