
import React from "react";
import { EquipmentCard } from "./equipment-card";

const equipmentData = [
  {
    id: "equip1",
    title: "Engine Compressor #A2",
    health: 92,
    status: "healthy",
    lastMaintenance: "Mar 15, 2025",
    nextPrediction: "Jul 22, 2025",
    type: "Rotary Compressor"
  },
  {
    id: "equip2",
    title: "Hydraulic Pump #B7",
    health: 68,
    status: "warning",
    lastMaintenance: "Feb 03, 2025",
    nextPrediction: "May 18, 2025",
    type: "Variable Displacement"
  },
  {
    id: "equip3",
    title: "Cooling System #C4",
    health: 42,
    status: "critical",
    lastMaintenance: "Dec 12, 2024",
    nextPrediction: "Apr 30, 2025",
    type: "Heat Exchanger"
  },
  {
    id: "equip4",
    title: "Conveyor #D9",
    health: 84,
    status: "healthy",
    lastMaintenance: "Mar 30, 2025",
    nextPrediction: "Aug 15, 2025",
    type: "Belt Drive"
  },
  {
    id: "equip5",
    title: "Electric Motor #E6",
    health: 76,
    status: "warning",
    lastMaintenance: "Jan 25, 2025",
    nextPrediction: "May 10, 2025",
    type: "AC Induction"
  },
  {
    id: "equip6",
    title: "Boiler System #F2",
    health: 88,
    status: "maintenance",
    lastMaintenance: "Mar 05, 2025",
    nextPrediction: "Jun 15, 2025",
    type: "Fire Tube"
  }
];

export function EquipmentHealth() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {equipmentData.map((equipment) => (
        <EquipmentCard
          key={equipment.id}
          title={equipment.title}
          health={equipment.health}
          status={equipment.status as any}
          lastMaintenance={equipment.lastMaintenance}
          nextPrediction={equipment.nextPrediction}
          type={equipment.type}
        />
      ))}
    </div>
  );
}
