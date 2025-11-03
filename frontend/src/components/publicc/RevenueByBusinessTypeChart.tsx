import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function RevenueByBusinessTypeChart() {
  // Sample data - Revenue by business type and quarter
  const data = [
    { quarter: "Q1", project: 1200, services: 800, distribute: 600 },
    { quarter: "Q2", project: 1350, services: 850, distribute: 650 },
    { quarter: "Q3", project: 1400, services: 900, distribute: 700 },
    { quarter: "Q4", project: 1500, services: 950, distribute: 750 },
  ];

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900">
              Revenue by Business Type
            </CardTitle>
            <CardDescription className="text-gray-500">
              Quarterly comparison by business type
            </CardDescription>
            <p className="text-xs text-blue-600 font-semibold mt-1">
              Project: 45% | Services: 30% | Distribute: 25%
            </p>
          </div>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Quarterly
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="quarter"
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
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="rect" />
            <Bar
              dataKey="project"
              fill="#3b82f6"
              name="Project"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="services"
              fill="#10b981"
              name="Services"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="distribute"
              fill="#f59e0b"
              name="Distribute"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
