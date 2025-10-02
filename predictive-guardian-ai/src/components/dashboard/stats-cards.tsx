
import React from "react";
import { StatusCard } from "./status-card";
import { Activity, AlertTriangle, CheckCircle2, Clock, Cpu } from "lucide-react";

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatusCard
        title="Total Equipment"
        value="124"
        icon={<Cpu className="h-4 w-4" />}
        description="Active across all facilities"
        trend="up"
        trendValue="3 new this month"
      />
      <StatusCard
        title="Healthy Status"
        value="87%"
        icon={<CheckCircle2 className="h-4 w-4" />}
        description="All systems operational"
        trend="up"
        trendValue="2% improvement"
      />
      <StatusCard
        title="Active Alerts"
        value="7"
        icon={<AlertTriangle className="h-4 w-4" />}
        description="3 critical, 4 warnings"
        trend="down"
        trendValue="12% decrease"
      />
      <StatusCard
        title="Average Uptime"
        value="99.6%"
        icon={<Activity className="h-4 w-4" />}
        description="Last 30 days"
        trend="stable"
        trendValue="No change"
      />
    </div>
  );
}
