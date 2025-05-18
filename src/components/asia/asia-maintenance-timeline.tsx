
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const maintenanceEvents = [
  {
    id: 1,
    name: "Oil Change",
    originalDate: "2025-07-12",
    adjustedDate: "2025-06-15",
    impact: "earlier",
    reason: "High temperature operation and city driving patterns detected",
    priority: "medium",
  },
  {
    id: 2,
    name: "Brake Inspection",
    originalDate: "2025-08-05",
    adjustedDate: "2025-07-22",
    impact: "earlier",
    reason: "Mountainous terrain driving increasing brake wear rate",
    priority: "medium",
  },
  {
    id: 3,
    name: "Coolant System Flush",
    originalDate: "2025-06-30",
    adjustedDate: "2025-05-28",
    impact: "earlier",
    reason: "Operating temperature exceeds optimal range by 12%",
    priority: "high",
  },
  {
    id: 4,
    name: "Timing Belt Replacement",
    originalDate: "2025-12-15",
    adjustedDate: "2026-02-10",
    impact: "later",
    reason: "Recent driving patterns indicate less strain than expected",
    priority: "low",
  },
  {
    id: 5,
    name: "Battery Health Check",
    originalDate: "2025-09-20",
    adjustedDate: "2025-08-10",
    impact: "earlier",
    reason: "Climate factors affecting battery performance",
    priority: "medium",
  },
];

export function ASIAMaintenanceTimeline() {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="outline" className="bg-red-500/10 text-red-500">High Priority</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500">Medium Priority</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500">Low Priority</Badge>;
      default:
        return null;
    }
  };

  const getImpactStyle = (impact: string) => {
    return impact === "earlier" 
      ? "text-amber-500" 
      : "text-green-500";
  };

  return (
    <div className="space-y-4">
      {maintenanceEvents.map((event) => (
        <Card key={event.id} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-sm">{event.name}</h3>
                {getPriorityBadge(event.priority)}
              </div>
              <p className="text-xs text-muted-foreground">{event.reason}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-muted-foreground">Original:</span>
                <span className="text-xs flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(event.originalDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Adjusted:</span>
                <span className={`text-xs font-medium flex items-center ${getImpactStyle(event.impact)}`}>
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(event.adjustedDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
