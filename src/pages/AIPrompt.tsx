
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AIPrompt() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      setResponse(`This is a simulated response to: "${prompt}"`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>AI Assistant</CardTitle>
          <CardDescription>
            Use our AI assistant to get answers to your questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter your prompt..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Submit"}
              </Button>
            </div>
          </form>

          {response && (
            <Card className="mt-4">
              <CardHeader className="py-3">
                <CardTitle className="text-base">Response</CardTitle>
              </CardHeader>
              <ScrollArea className="h-[200px]">
                <CardContent>
                  <p className="whitespace-pre-wrap">{response}</p>
                </CardContent>
              </ScrollArea>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
