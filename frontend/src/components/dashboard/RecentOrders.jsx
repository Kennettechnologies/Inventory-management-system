import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

const recentOrders = [
  {
    id: 1,
    customer: "John Doe",
    date: "2024-03-15",
    amount: 299.99,
    status: "Completed",
  },
  {
    id: 2,
    customer: "Jane Smith",
    date: "2024-03-14",
    amount: 199.50,
    status: "Processing",
  },
  {
    id: 3,
    customer: "Bob Johnson",
    date: "2024-03-13",
    amount: 499.99,
    status: "Completed",
  },
];

export const RecentOrders = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-gray-900">{order.customer}</h4>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  ${order.amount.toFixed(2)}
                </p>
                <p
                  className={`text-sm ${
                    order.status === "Completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 