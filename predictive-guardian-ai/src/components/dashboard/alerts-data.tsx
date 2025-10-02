
import React from "react";
import { AlertList } from "./alert-list";

interface Alert {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: "critical" | "warning" | "info" | "resolved";
  equipment: string;
}

const alertsData: Alert[] = [
  {
    id: "alert1",
    title: "Critical temperature threshold exceeded",
    description: "Cooling System #C4 temperature has reached 82°C, exceeding critical threshold of 80°C",
    timestamp: "Today, 10:42 AM",
    severity: "critical" as "critical",
    equipment: "Cooling System #C4"
  },
  {
    id: "alert2",
    title: "Abnormal vibration detected",
    description: "Hydraulic Pump #B7 showing abnormal vibration patterns, early intervention recommended",
    timestamp: "Today, 9:15 AM",
    severity: "warning" as "warning",
    equipment: "Hydraulic Pump #B7"
  },
  {
    id: "alert3",
    title: "Maintenance reminder",
    description: "Scheduled maintenance due for Electric Motor #E6 within next 7 days",
    timestamp: "Yesterday, 4:30 PM",
    severity: "info" as "info",
    equipment: "Electric Motor #E6"
  },
  {
    id: "alert4",
    title: "Pressure anomaly detected",
    description: "Unusual pressure fluctuations detected in Boiler System #F2",
    timestamp: "Yesterday, 1:20 PM",
    severity: "warning",
    equipment: "Boiler System #F2"
  },
  {
    id: "alert5",
    title: "Calibration completed",
    description: "Sensor calibration for Conveyor #D9 completed successfully",
    timestamp: "Apr 21, 2:15 PM",
    severity: "resolved" as "resolved",
    equipment: "Conveyor #D9"
  }
];

export function AlertsPanel() {
  return <AlertList alerts={alertsData} />;
}
