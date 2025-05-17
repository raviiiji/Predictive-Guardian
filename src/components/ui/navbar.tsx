
import React from "react";
import { Bell, Settings, HelpCircle } from "lucide-react";
import { Button } from "./button";

export function Navbar() {
  return (
    <div className="bg-primary h-16 px-6 flex items-center justify-between border-b border-border">
      <div className="flex items-center space-x-2">
        <div className="font-bold text-xl text-white">Predictive Guardian AI</div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
          <Settings className="h-5 w-5" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-white">
          KP
        </div>
      </div>
    </div>
  );
}
