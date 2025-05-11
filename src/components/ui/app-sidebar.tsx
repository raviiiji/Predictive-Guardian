
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
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/",
    tabValue: "overview"
  },
  {
    title: "Equipment",
    icon: Cpu,
    url: "/equipment",
    tabValue: "equipment"
  },
  {
    title: "Monitoring",
    icon: Activity,
    url: "/monitoring",
    tabValue: "overview"
  },
  {
    title: "Analytics",
    icon: BarChart3,
    url: "/analytics",
    tabValue: "models"
  },
  {
    title: "Alerts",
    icon: AlertTriangle,
    url: "/alerts",
    tabValue: "alerts"
  },
  {
    title: "Data Center",
    icon: Database,
    url: "/data",
    tabValue: "environment"
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
    tabValue: "overview"
  },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const handleNavigation = (event: React.MouseEvent<HTMLAnchorElement>, tabValue: string) => {
    event.preventDefault();
    
    // Update URL hash for tab tracking
    window.location.hash = tabValue;
    
    // Find the corresponding tab and click it - using setTimeout to ensure DOM is ready
    setTimeout(() => {
      const tabElement = document.querySelector(`[data-state="inactive"][value="${tabValue}"]`);
      if (tabElement) {
        (tabElement as HTMLElement).click();
      }
    }, 0);
  };

  // Determine if an item is active based on URL path or hash
  const isItemActive = (item: any) => {
    if (currentPath === "/" && item.title === "Dashboard") return true;
    if (item.url === currentPath) return true;
    
    // Check if this item's tab value matches the current hash
    const currentHash = window.location.hash.replace("#", "");
    if (currentHash && currentHash === item.tabValue) return true;
    
    return false;
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>KPIT Guardian AI</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={isItemActive(item) ? "bg-accent text-white" : ""}
                  >
                    <a 
                      href={`/#${item.tabValue}`} 
                      className="flex items-center gap-3"
                      onClick={(e) => handleNavigation(e, item.tabValue)}
                    >
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
