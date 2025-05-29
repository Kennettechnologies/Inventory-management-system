import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Brain, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data - In production, this would come from your AI model
const forecastData = [
  { month: "Jan", actual: 100, predicted: 95, trend: "up" },
  { month: "Feb", actual: 120, predicted: 115, trend: "up" },
  { month: "Mar", actual: 110, predicted: 105, trend: "down" },
  { month: "Apr", actual: 130, predicted: 125, trend: "up" },
  { month: "May", actual: 140, predicted: 135, trend: "up" },
  { month: "Jun", actual: 150, predicted: 145, trend: "up" },
];

const insights = [
  {
    title: "Seasonal Trend Detected",
    description: "Inventory levels typically increase by 15% during summer months",
    impact: "high",
  },
  {
    title: "Supply Chain Optimization",
    description: "Consider increasing stock levels for high-demand items",
    impact: "medium",
  },
  {
    title: "Risk Assessment",
    description: "3 items are at risk of stockout in the next 30 days",
    impact: "high",
  },
];

const getImpactColor = (impact: string) => {
  switch (impact) {
    case "high": return "bg-red-100 text-red-800";
    case "medium": return "bg-yellow-100 text-yellow-800";
    case "low": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export const InventoryForecast = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            AI-Powered Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Actual"
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Predicted"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${
                  insight.impact === "high" ? "bg-red-100" : 
                  insight.impact === "medium" ? "bg-yellow-100" : 
                  "bg-green-100"
                }`}>
                  {insight.impact === "high" ? (
                    <TrendingUp className="w-5 h-5 text-red-600" />
                  ) : insight.impact === "medium" ? (
                    <TrendingDown className="w-5 h-5 text-yellow-600" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{insight.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{insight.description}</p>
                  <Badge className={`mt-2 ${getImpactColor(insight.impact)}`}>
                    {insight.impact} impact
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}; 