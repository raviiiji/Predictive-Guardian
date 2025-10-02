
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import AIPrompt from "./pages/AIPrompt";
import Equipment from "./pages/Equipment";
import Monitoring from "./pages/Monitoring";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import DataCenter from "./pages/DataCenter";
import Benefits from "./pages/Benefits";
import Troubleshooting from "./pages/Troubleshooting";
import DriverAnalysis from "./pages/DriverAnalysis";
import ARVisualInspection from "./pages/ARVisualInspection";
import ASIAModule from "./pages/ASIAModule";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/data" element={<DataCenter />} />
          <Route path="/ai-prompt" element={<AIPrompt />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/troubleshooting" element={<Troubleshooting />} />
          <Route path="/driver-analysis" element={<DriverAnalysis />} />
          <Route path="/ar-inspection" element={<ARVisualInspection />} />
          <Route path="/asia-module" element={<ASIAModule />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
