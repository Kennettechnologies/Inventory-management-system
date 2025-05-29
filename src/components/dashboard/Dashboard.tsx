import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCards } from "./StatsCards";
import { InventoryChart } from "./InventoryChart";
import { RecentOrders } from "./RecentOrders";
import { LowStockAlerts } from "./LowStockAlerts";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back! Here's what's happening with your inventory.</p>
      </div>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InventoryChart />
        <LowStockAlerts />
      </div>
      
      <RecentOrders />
    </div>
  );
}; 