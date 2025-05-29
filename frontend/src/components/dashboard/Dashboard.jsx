import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { StatsCards } from "./StatsCards";
import { InventoryChart } from "./InventoryChart";
import { RecentOrders } from "./RecentOrders";
import { LowStockAlerts } from "./LowStockAlerts";
import { SalesAnalytics } from './SalesAnalytics';
import { useToast } from '../../context/ToastContext';

export const Dashboard = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [stats, setStats] = React.useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStockItems: 0,
  });
  const [salesData, setSalesData] = React.useState([]);
  const { addToast } = useToast();

  React.useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [statsResponse, salesResponse] = await Promise.all([
        fetch('http://localhost:5000/api/dashboard/stats'),
        fetch('http://localhost:5000/api/dashboard/sales'),
      ]);

      if (!statsResponse.ok || !salesResponse.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const [statsData, salesData] = await Promise.all([
        statsResponse.json(),
        salesResponse.json(),
      ]);

      setStats(statsData);
      setSalesData(salesData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      addToast('Failed to load dashboard data. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Overview of your inventory and sales
        </p>
      </div>
      
      <StatsCards stats={stats} isLoading={isLoading} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesAnalytics data={salesData} />
        <InventoryChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LowStockAlerts />
        <RecentOrders />
      </div>
    </div>
  );
}; 