import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", stock: 4000, orders: 2400 },
  { month: "Feb", stock: 3000, orders: 1398 },
  { month: "Mar", stock: 2000, orders: 9800 },
  { month: "Apr", stock: 2780, orders: 3908 },
  { month: "May", stock: 1890, orders: 4800 },
  { month: "Jun", stock: 2390, orders: 3800 },
];

export const InventoryChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="stock" 
              stroke="#3B82F6" 
              strokeWidth={2}
              name="Stock Levels"
            />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Orders"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}; 