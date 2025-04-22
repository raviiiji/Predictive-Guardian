
import React from "react";
import { Home, Activity, Bell, Settings, Database, BarChart3, AlertTriangle, Cpu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/",
    active: true,
  },
  {
    title: "Equipment",
    icon: Cpu,
    url: "#equipment",
  },
  {
    title: "Monitoring",
    icon: Activity,
    url: "#monitoring",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    url: "#analytics",
  },
  {
    title: "Alerts",
    icon: AlertTriangle,
    url: "#alerts",
  },
  {
    title: "Data Center",
    icon: Database,
    url: "#data",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "#settings",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>KPIT Guardian AI</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={item.active ? "bg-accent text-white" : ""}>
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span>{item.title}</span>
                      {item.title === "Alerts" && (
                        <span className="ml-auto bg-kpit-warning text-black text-xs font-medium px-2 py-0.5 rounded-full">
                          3
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
