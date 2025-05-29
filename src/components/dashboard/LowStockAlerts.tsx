import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const lowStockItems = [
  { name: "Wireless Headphones", sku: "WH-001", current: 5, minimum: 10, category: "Electronics" },
  { name: "Office Chair", sku: "OC-025", current: 2, minimum: 5, category: "Furniture" },
  { name: "Coffee Beans", sku: "CB-100", current: 8, minimum: 15, category: "Food" },
  { name: "Laptop Stand", sku: "LS-030", current: 3, minimum: 8, category: "Accessories" },
];

export const LowStockAlerts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          Low Stock Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowStockItems.map((item) => (
            <div key={item.sku} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">SKU: {item.sku}</p>
              </div>
              <div className="text-right">
                <Badge variant="destructive" className="mb-1">
                  {item.current} left
                </Badge>
                <p className="text-xs text-gray-500">Min: {item.minimum}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 