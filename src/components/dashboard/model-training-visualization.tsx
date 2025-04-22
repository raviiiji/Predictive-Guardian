
import React from "react";
import { ChartCard } from "./chart-card";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, ScatterChart, Scatter 
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Simulated training data and results
const trainingHistory = [
  { epoch: 1, loss: 0.42, val_loss: 0.45 },
  { epoch: 10, loss: 0.31, val_loss: 0.33 },
  { epoch: 20, loss: 0.24, val_loss: 0.26 },
  { epoch: 30, loss: 0.19, val_loss: 0.22 },
  { epoch: 40, loss: 0.17, val_loss: 0.20 },
  { epoch: 50, loss: 0.16, val_loss: 0.19 },
  { epoch: 60, loss: 0.155, val_loss: 0.185 },
  { epoch: 70, loss: 0.152, val_loss: 0.183 },
  { epoch: 80, loss: 0.150, val_loss: 0.181 },
  { epoch: 90, loss: 0.149, val_loss: 0.180 },
  { epoch: 100, loss: 0.148, val_loss: 0.179 },
];

// Simulated model predictions vs actual values
const modelPredictions = Array.from({ length: 30 }, (_, i) => {
  const actual = 100 - i * 2.5 + (Math.random() * 5 - 2.5);
  const predicted = actual + (Math.random() * 10 - 5);
  return {
    timePoint: i + 1,
    actual: parseFloat(actual.toFixed(1)),
    predicted: parseFloat(predicted.toFixed(1)),
  };
});

// Simulated inference performance data
const inferenceData = [
  { batchSize: 1, latency: 12 },
  { batchSize: 4, latency: 18 },
  { batchSize: 8, latency: 24 },
  { batchSize: 16, latency: 32 },
  { batchSize: 32, latency: 45 },
  { batchSize: 64, latency: 62 },
];

// Model architecture and hyperparameters
const modelInfo = {
  architecture: "LSTM (Long Short-Term Memory)",
  layers: "3 LSTM layers + 2 Dense layers",
  inputFeatures: 12,
  sequenceLength: 24,
  hiddenUnits: 64,
  dropout: 0.2,
  optimizer: "Adam",
  learningRate: 0.001,
  batchSize: 32,
  epochs: 100,
  rmse: 0.179,
  datasetSize: "10,000 sequences",
  inferenceLatency: "12-45ms",
  exportFormat: "ONNX",
};

export function ModelTrainingVisualization() {
  return (
    <ChartCard 
      title="LSTM Model Training for Health Score Prediction" 
      className="col-span-3"
    >
      <Tabs defaultValue="training" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="training">Training Process</TabsTrigger>
          <TabsTrigger value="predictions">Model Predictions</TabsTrigger>
          <TabsTrigger value="inference">Inference Performance</TabsTrigger>
          <TabsTrigger value="details">Model Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="training" className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trainingHistory}
              margin={{ top: 10, right: 30, left: 10, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="epoch" 
                label={{ value: 'Epoch', position: 'insideBottom', offset: -10 }} 
              />
              <YAxis 
                label={{ value: 'Loss (RMSE)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value: number) => value.toFixed(3)}
                contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "0.5rem", border: "1px solid hsl(var(--border))" }}
              />
              <Legend verticalAlign="top" height={36} />
              <Line 
                type="monotone" 
                dataKey="loss" 
                name="Training Loss" 
                stroke="#2C7A7B" 
                strokeWidth={2}
                dot={{ r: 3 }} 
              />
              <Line 
                type="monotone" 
                dataKey="val_loss" 
                name="Validation Loss" 
                stroke="#E53E3E" 
                strokeWidth={2} 
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="predictions" className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 10, right: 30, left: 10, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="actual" 
                name="Actual Health Score" 
                label={{ value: 'Actual Health Score', position: 'insideBottom', offset: -10 }}
                domain={[50, 100]}
                type="number"
              />
              <YAxis 
                dataKey="predicted" 
                name="Predicted Health Score"
                label={{ value: 'Predicted Health Score', angle: -90, position: 'insideLeft' }}
                domain={[50, 100]}
                type="number"
              />
              <Tooltip 
                formatter={(value: number) => value.toFixed(1)}
                contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "0.5rem", border: "1px solid hsl(var(--border))" }}
                cursor={{ strokeDasharray: '3 3' }}
              />
              <Scatter 
                name="Health Score Predictions" 
                data={modelPredictions} 
                fill="#2C7A7B" 
              />
              {/* Perfect prediction line */}
              <Line 
                type="monotone" 
                dataKey={null}
                data={[{x: 50, y: 50}, {x: 100, y: 100}]}
                stroke="#666" 
                strokeDasharray="3 3"
                strokeWidth={2}
                dot={false}
                activeDot={false}
                isAnimationActive={false}
                legendType="none"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="inference" className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={inferenceData}
              margin={{ top: 10, right: 30, left: 10, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="batchSize" 
                label={{ value: 'Batch Size', position: 'insideBottom', offset: -10 }} 
              />
              <YAxis 
                label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft' }}
                domain={[0, 70]}
              />
              <Tooltip 
                formatter={(value: number) => `${value} ms`}
                contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "0.5rem", border: "1px solid hsl(var(--border))" }}
              />
              <Line 
                type="monotone" 
                dataKey="latency" 
                name="Inference Latency" 
                stroke="#2C7A7B" 
                strokeWidth={2}
                dot={{ r: 3 }} 
              />
              {/* Target latency line */}
              <Line 
                type="monotone" 
                data={[
                  { batchSize: 1, latency: 50 },
                  { batchSize: 64, latency: 50 }
                ]} 
                dataKey="latency"
                name="Target (50ms)" 
                stroke="#E53E3E" 
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[300px] overflow-y-auto p-2">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 text-sm">Model Architecture</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Type</span>
                    <span className="font-medium text-sm">{modelInfo.architecture}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Structure</span>
                    <span className="font-medium text-sm">{modelInfo.layers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Hidden Units</span>
                    <span className="font-medium text-sm">{modelInfo.hiddenUnits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Dropout</span>
                    <span className="font-medium text-sm">{modelInfo.dropout}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 text-sm">Training Parameters</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Input Features</span>
                    <span className="font-medium text-sm">{modelInfo.inputFeatures}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Sequence Length</span>
                    <span className="font-medium text-sm">{modelInfo.sequenceLength} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Optimizer</span>
                    <span className="font-medium text-sm">{modelInfo.optimizer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Learning Rate</span>
                    <span className="font-medium text-sm">{modelInfo.learningRate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 text-sm">Performance Metrics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Final RMSE</span>
                    <Badge variant="outline" className="bg-green-500/10">
                      {modelInfo.rmse} {'<'} 0.2 ✓
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Dataset Size</span>
                    <span className="font-medium text-sm">{modelInfo.datasetSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Inference Latency</span>
                    <Badge variant="outline" className="bg-green-500/10">
                      {modelInfo.inferenceLatency} {'<'} 50ms ✓
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 text-sm">Deployment</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Export Format</span>
                    <span className="font-medium text-sm">{modelInfo.exportFormat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Preprocessing</span>
                    <span className="font-medium text-sm">Min-Max Normalization</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Window Strategy</span>
                    <span className="font-medium text-sm">Sliding (80% overlap)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Feature Importance</span>
                    <span className="font-medium text-sm">SHAP Analysis</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </ChartCard>
  );
}
