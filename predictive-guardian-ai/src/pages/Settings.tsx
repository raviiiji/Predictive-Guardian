
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Bell, User, Shield, Cpu, Globe } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const generalForm = useForm({
    defaultValues: {
      username: "admin",
      email: "admin@kpit.com",
      notifications: true,
      darkMode: true,
      autoSave: true,
    }
  });

  const securityForm = useForm({
    defaultValues: {
      twoFactor: false,
      sessionTimeout: "30",
    }
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update URL hash for direct linking
    window.location.hash = value;
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-6">
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account and application preferences</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
            <TabsList className="grid grid-cols-5 gap-4 bg-muted">
              <TabsTrigger value="overview" className="data-[state=active]:bg-background">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span className="hidden md:inline">Overview</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-background">
                <div className="flex items-center gap-2">
                  <Bell size={16} />
                  <span className="hidden md:inline">Notifications</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-background">
                <div className="flex items-center gap-2">
                  <Shield size={16} />
                  <span className="hidden md:inline">Security</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="system" className="data-[state=active]:bg-background">
                <div className="flex items-center gap-2">
                  <Cpu size={16} />
                  <span className="hidden md:inline">System</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="about" className="data-[state=active]:bg-background">
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  <span className="hidden md:inline">About</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Manage your account information and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...generalForm}>
                    <form className="space-y-4">
                      <FormField
                        control={generalForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="darkMode"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Dark Mode</FormLabel>
                              <FormDescription>
                                Enable dark mode for the interface
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="autoSave"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Auto Save</FormLabel>
                              <FormDescription>
                                Automatically save changes
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="alerts" checked />
                      <label htmlFor="alerts" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        System Alerts
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="maintenance" checked />
                      <label htmlFor="maintenance" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Maintenance Notifications
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="updates" />
                      <label htmlFor="updates" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Software Updates
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="newsletter" />
                      <label htmlFor="newsletter" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Newsletter
                      </label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and authentication options</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...securityForm}>
                    <form className="space-y-4">
                      <FormField
                        control={securityForm.control}
                        name="twoFactor"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Two-Factor Authentication</FormLabel>
                              <FormDescription>
                                Enable additional security for your account
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={securityForm.control}
                        name="sessionTimeout"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Session Timeout (minutes)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min="5" max="120" />
                            </FormControl>
                            <FormDescription>
                              How long before you're automatically logged out due to inactivity
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4">
                        <Button variant="outline" className="w-full">Change Password</Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="system" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure system-wide settings and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">System Resources</h3>
                        <div className="rounded-md bg-muted p-2">
                          <p className="text-sm">CPU: 30%</p>
                          <p className="text-sm">Memory: 4.2GB / 16GB</p>
                          <p className="text-sm">Disk: 230GB / 512GB</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Backup Settings</h3>
                        <div className="flex items-center space-x-2">
                          <Switch id="auto-backup" />
                          <label htmlFor="auto-backup" className="text-sm">Automatic backups</label>
                        </div>
                        <p className="text-xs text-muted-foreground">Last backup: 2 days ago</p>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button variant="destructive">Run System Diagnostic</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="about" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>About KPIT Guardian AI</CardTitle>
                  <CardDescription>System information and version details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md bg-muted p-4">
                      <p className="font-medium">KPIT Guardian AI</p>
                      <p className="text-sm text-muted-foreground">Version 1.5.0</p>
                      <p className="text-sm text-muted-foreground">Build 20250511-1</p>
                      <p className="text-xs text-muted-foreground pt-2">© 2025 KPIT Technologies. All rights reserved.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">System Information</h3>
                      <p className="text-sm">Operating System: Linux 5.15.0</p>
                      <p className="text-sm">Node.js: v18.16.1</p>
                      <p className="text-sm">Database: PostgreSQL 14.5</p>
                    </div>
                    
                    <div className="pt-2">
                      <Button variant="outline" className="mr-2">Check for Updates</Button>
                      <Button variant="outline">View Licenses</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Settings;
