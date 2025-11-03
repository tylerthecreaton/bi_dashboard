import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function SalesChart() {
  // Sample data for Recharts
  const data = [
    { month: "Jan", sales: 2500 },
    { month: "Feb", sales: 3200 },
    { month: "Mar", sales: 2800 },
    { month: "Apr", sales: 3500 },
    { month: "May", sales: 3000 },
    { month: "Jun", sales: 3200 },
    { month: "Jul", sales: 3800 },
    { month: "Aug", sales: 3500 },
    { month: "Sep", sales: 3200 },
    { month: "Oct", sales: 4000 },
    { month: "Nov", sales: 3900 },
    { month: "Dec", sales: 3600 },
  ];

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900">Overall Sales</CardTitle>
            <CardDescription className="text-gray-500">
              $3,872.24
            </CardDescription>
            <p className="text-xs text-green-600 font-semibold mt-1">
              +2.26% From last month
            </p>
          </div>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Monthly
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.08} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
            <YAxis
              stroke="#9ca3af"
              fontSize={12}
              tickFormatter={(value) => `$${value / 1000}K`}
            />
            <Tooltip
              formatter={(value: number) => [
                `$${value.toLocaleString()}`,
                "Sales",
              ]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
              }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#colorSales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
