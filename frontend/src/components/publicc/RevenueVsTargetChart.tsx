import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function RevenueVsTargetChart() {
  // Sample data
  const data = [
    { month: "Jan", actual: 850, target: 1000 },
    { month: "Feb", actual: 920, target: 1000 },
    { month: "Mar", actual: 1100, target: 1000 },
    { month: "Apr", actual: 1050, target: 1100 },
    { month: "May", actual: 1200, target: 1100 },
    { month: "Jun", actual: 1150, target: 1200 },
    { month: "Jul", actual: 1300, target: 1200 },
    { month: "Aug", actual: 1250, target: 1300 },
    { month: "Sep", actual: 1400, target: 1300 },
    { month: "Oct", actual: 1350, target: 1400 },
    { month: "Nov", actual: 1450, target: 1400 },
    { month: "Dec", actual: 1500, target: 1500 },
  ];

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900">
              Overall Revenue YTD vs Target
            </CardTitle>
            <CardDescription className="text-gray-500">
              Year to Date Performance
            </CardDescription>
            <p className="text-xs text-green-600 font-semibold mt-1">
              +8.5% Above target
            </p>
          </div>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            YTD
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickLine={{ stroke: "#f3f4f6" }}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickLine={{ stroke: "#f3f4f6" }}
              tickFormatter={(value) => `$${value}K`}
            />
            <Tooltip
              formatter={(value: number) => [`$${value}K`, ""]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Target Revenue"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#3b82f6"
              strokeWidth={3}
              name="Actual Revenue"
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
