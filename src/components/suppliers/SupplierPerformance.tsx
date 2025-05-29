import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Star, Clock, Package, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data - In production, this would come from your database
const supplierData = [
  {
    name: "TechCorp",
    rating: 4.8,
    onTimeDelivery: 95,
    qualityScore: 92,
    responseTime: 2.5,
    issues: 2,
  },
  {
    name: "FurnishPro",
    rating: 4.5,
    onTimeDelivery: 88,
    qualityScore: 90,
    responseTime: 3.2,
    issues: 4,
  },
  {
    name: "Bean Master",
    rating: 4.2,
    onTimeDelivery: 85,
    qualityScore: 88,
    responseTime: 4.0,
    issues: 6,
  },
];

const getRatingColor = (rating: number) => {
  if (rating >= 4.5) return "text-green-600";
  if (rating >= 4.0) return "text-yellow-600";
  return "text-red-600";
};

const getDeliveryColor = (percentage: number) => {
  if (percentage >= 90) return "text-green-600";
  if (percentage >= 80) return "text-yellow-600";
  return "text-red-600";
};

export const SupplierPerformance = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {supplierData.map((supplier) => (
          <Card key={supplier.name}>
            <CardHeader>
              <CardTitle className="text-lg">{supplier.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className={`w-4 h-4 ${getRatingColor(supplier.rating)}`} />
                    <span className="font-medium">Rating</span>
                  </div>
                  <span className={getRatingColor(supplier.rating)}>
                    {supplier.rating}/5.0
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">On-time Delivery</span>
                  </div>
                  <span className={getDeliveryColor(supplier.onTimeDelivery)}>
                    {supplier.onTimeDelivery}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">Response Time</span>
                  </div>
                  <span>{supplier.responseTime} days</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <span className="font-medium">Active Issues</span>
                  </div>
                  <Badge variant={supplier.issues > 3 ? "destructive" : "default"}>
                    {supplier.issues}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Supplier Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={supplierData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="onTimeDelivery" fill="#3B82F6" name="On-time Delivery %" />
              <Bar dataKey="qualityScore" fill="#10B981" name="Quality Score" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}; 