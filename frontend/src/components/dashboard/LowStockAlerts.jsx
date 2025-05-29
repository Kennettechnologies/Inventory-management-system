import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { AlertTriangle } from "lucide-react";

const lowStockItems = [
  { id: 1, name: "Product A", currentStock: 5, minStock: 10 },
  { id: 2, name: "Product B", currentStock: 3, minStock: 15 },
  { id: 3, name: "Product C", currentStock: 8, minStock: 20 },
];

export const LowStockAlerts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Low Stock Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowStockItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-red-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <div>
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    Current Stock: {item.currentStock}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-red-600">
                  Min Stock: {item.minStock}
                </p>
                <p className="text-sm text-red-500">
                  {item.minStock - item.currentStock} units needed
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 