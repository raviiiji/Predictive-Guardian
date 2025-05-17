
import React, { useState } from "react";
import { Home, Activity, Bell, Settings, Database, BarChart3, AlertTriangle, Cpu, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./button";
import { toast } from "@/hooks/use-toast";

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

const promptItems = [
  {
    title: "ELI5 Explanation",
    emoji: "🧒",
    prompt: "Explain this like I'm 5 years old:"
  },
  {
    title: "Step-by-Step Guide",
    emoji: "📝",
    prompt: "Give me a step-by-step guide for:"
  },
  {
    title: "3-Point Summary",
    emoji: "✏️",
    prompt: "Summarize this in 3 bullet points:"
  },
  {
    title: "Professional Email",
    emoji: "✉️",
    prompt: "Write a professional email about:"
  },
  {
    title: "Creative Ideas",
    emoji: "💡",
    prompt: "Give me 5 creative ideas for:"
  }
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [showPrompts, setShowPrompts] = useState(false);
  const [aiInput, setAiInput] = useState("");

  const handleNavigation = (event: React.MouseEvent<HTMLAnchorElement>, tabValue: string) => {
    // Don't prevent default here - allow default behavior to open in new tab
    
    // Only add the hash if not opening in a new tab (middle click or ctrl+click)
    if (!event.ctrlKey && event.button !== 1) {
      window.location.hash = tabValue;
      
      // Find the corresponding tab and click it - using setTimeout to ensure DOM is ready
      setTimeout(() => {
        const tabElement = document.querySelector(`[data-state="inactive"][value="${tabValue}"]`);
        if (tabElement) {
          (tabElement as HTMLElement).click();
        }
      }, 0);
    }
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

  const handlePromptClick = (promptText: string) => {
    setAiInput(promptText + " ");
    toast({
      title: "Prompt Selected",
      description: `"${promptText}" has been inserted.`,
      duration: 3000,
    });
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between">
            <SidebarGroupLabel>Predictive Guardian AI</SidebarGroupLabel>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-7 w-7"
              onClick={() => setShowPrompts(!showPrompts)}
              title="Toggle Prompt Library"
            >
              <Menu size={16} />
            </Button>
          </div>
          <SidebarGroupContent>
            {!showPrompts ? (
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={isItemActive(item) ? "bg-accent text-accent-foreground" : ""}
                    >
                      <a 
                        href={`/#${item.tabValue}`} 
                        className="flex items-center gap-3"
                        onClick={(e) => handleNavigation(e, item.tabValue)}
                        target="_blank" // Add target="_blank" to open in a new tab
                        rel="noopener noreferrer" // Security best practice when using target="_blank"
                      >
                        <item.icon size={18} />
                        <span>{item.title}</span>
                        {item.title === "Alerts" && (
                          <span className="ml-auto bg-destructive text-destructive-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                            3
                          </span>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            ) : (
              <>
                <div className="py-2 px-2">
                  <h3 className="text-sm font-semibold mb-2">AI Prompt Shortcuts</h3>
                  <input 
                    type="text" 
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Ask the AI anything..."
                    className="w-full px-3 py-2 text-sm rounded-md bg-background border border-input mb-2"
                  />
                </div>
                <SidebarSeparator />
                <SidebarMenu>
                  {promptItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className="hover:bg-accent/90 transition-colors"
                        onClick={() => handlePromptClick(item.prompt)}
                      >
                        <div className="flex items-center gap-3 cursor-pointer">
                          <span className="text-lg">{item.emoji}</span>
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        {showPrompts && (
          <SidebarGroup className="mt-auto">
            <SidebarMenuButton
              asChild
              className="text-center bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => setShowPrompts(false)}
            >
              <div className="flex justify-center py-1">
                <span>Back to Navigation</span>
              </div>
            </SidebarMenuButton>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
