
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Database, Server, Code, Github } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ServiceStatus {
  name: string;
  status: "running" | "stopped" | "warning";
  port: number;
  cpu: number;
  memory: number;
  icon: React.ReactNode;
}

interface WorkflowStatus {
  name: string;
  status: "success" | "failed" | "running";
  time: string;
  branch: string;
  commit: string;
}

export function VirtualEnvironment() {
  const [services, setServices] = useState<ServiceStatus[]>([
    { 
      name: "Next.js", 
      status: "running", 
      port: 3000, 
      cpu: 23, 
      memory: 45,
      icon: <Code className="h-5 w-5" />
    },
    { 
      name: "FastAPI", 
      status: "running", 
      port: 8000, 
      cpu: 15, 
      memory: 32,
      icon: <Server className="h-5 w-5" />
    },
    { 
      name: "PostgreSQL", 
      status: "running", 
      port: 5432, 
      cpu: 8, 
      memory: 28,
      icon: <Database className="h-5 w-5" />
    },
    { 
      name: "Redis", 
      status: "running", 
      port: 6379, 
      cpu: 5, 
      memory: 12,
      icon: <Server className="h-5 w-5" />
    }
  ]);

  const [workflows, setWorkflows] = useState<WorkflowStatus[]>([
    {
      name: "CI: pytest/ESLint",
      status: "success",
      time: "10 minutes ago",
      branch: "develop",
      commit: "a1b2c3d"
    },
    {
      name: "CD: Deploy to AWS ECS",
      status: "running",
      time: "5 minutes ago",
      branch: "main",
      commit: "e4f5g6h"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-green-500";
      case "stopped": return "bg-red-500";
      case "warning": return "bg-yellow-500";
      case "success": return "bg-green-500";
      case "failed": return "bg-red-500";
      default: return "bg-blue-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running": return <Badge className="bg-green-500">Running</Badge>;
      case "stopped": return <Badge className="bg-red-500">Stopped</Badge>;
      case "warning": return <Badge className="bg-yellow-500">Warning</Badge>;
      case "success": return <Badge className="bg-green-500">Success</Badge>;
      case "failed": return <Badge className="bg-red-500">Failed</Badge>;
      default: return <Badge className="bg-blue-500">{status}</Badge>;
    }
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Docker Virtual Environment</CardTitle>
          <Badge variant="outline" className="ml-2">Docker Compose</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="services">
          <TabsList>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="workflows">GitHub Actions</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="services">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.name} className="flex flex-col p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {service.icon}
                        <span className="font-medium">{service.name}</span>
                        <span className="text-xs text-muted-foreground">:{service.port}</span>
                      </div>
                      {getStatusBadge(service.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span>CPU</span>
                          <span>{service.cpu}%</span>
                        </div>
                        <Progress value={service.cpu} className="h-2 mt-1" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Memory</span>
                          <span>{service.memory}%</span>
                        </div>
                        <Progress value={service.memory} className="h-2 mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="workflows">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <div key={workflow.name} className="flex flex-col p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Github className="h-5 w-5" />
                        <span className="font-medium">{workflow.name}</span>
                      </div>
                      {getStatusBadge(workflow.status)}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Branch:</span>
                        <span className="ml-2">{workflow.branch}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Commit:</span>
                        <span className="ml-2">{workflow.commit}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time:</span>
                        <span className="ml-2">{workflow.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="logs">
            <ScrollArea className="h-[300px] pr-4">
              <pre className="text-xs font-mono p-4 bg-muted rounded-lg">
                {`[2025-04-22 09:15:32] [Next.js] Server started on port 3000
[2025-04-22 09:15:35] [FastAPI] Application startup complete
[2025-04-22 09:15:36] [PostgreSQL] Database system is ready to accept connections
[2025-04-22 09:15:37] [Redis] Ready to accept connections
[2025-04-22 09:20:45] [GitHub Actions] CI workflow started on branch develop
[2025-04-22 09:25:32] [GitHub Actions] CI workflow completed successfully
[2025-04-22 09:30:15] [GitHub Actions] CD workflow started on branch main
[2025-04-22 09:31:22] [AWS ECS] Preparing deployment to production cluster
[2025-04-22 09:32:45] [AWS ECS] Deploying containers to production environment
[2025-04-22 09:33:15] [AWS ECS] Container deployment in progress...`}
              </pre>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
