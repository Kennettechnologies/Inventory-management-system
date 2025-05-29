import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const calculateGrowth = (current, previous) => {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
};

export const SalesAnalytics = ({ data }) => {
  const totalSales = data.reduce((sum, day) => sum + day.sales, 0);
  const previousPeriodSales = data.slice(-14, -7).reduce((sum, day) => sum + day.sales, 0);
  const currentPeriodSales = data.slice(-7).reduce((sum, day) => sum + day.sales, 0);
  const growth = calculateGrowth(currentPeriodSales, previousPeriodSales);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Total Sales</p>
            <p className="text-2xl font-semibold text-gray-900">{formatCurrency(totalSales)}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Current Period</p>
            <p className="text-2xl font-semibold text-gray-900">{formatCurrency(currentPeriodSales)}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Growth</p>
            <div className="flex items-center">
              <p className="text-2xl font-semibold text-gray-900">{growth.toFixed(1)}%</p>
              {growth >= 0 ? (
                <TrendingUp className="h-5 w-5 text-green-500 ml-2" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500 ml-2" />
              )}
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <YAxis
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip
                formatter={(value) => formatCurrency(value)}
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}; 