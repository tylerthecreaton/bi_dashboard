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
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { name: "Banking", value: 2800, color: "#3b82f6" },
  { name: "Manufacturing", value: 2200, color: "#10b981" },
  { name: "Retail", value: 1900, color: "#f59e0b" },
  { name: "Healthcare", value: 1600, color: "#ef4444" },
  { name: "Finance", value: 2400, color: "#8b5cf6" },
  { name: "Technology", value: 3100, color: "#06b6d4" },
];

export function GrossProfitByVerticalChart() {
  const totalProfit = data.reduce((sum, item) => sum + item.value, 0);
  const maxProfitItem = data.reduce((prev, current) =>
    prev.value > current.value ? prev : current
  );

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900 text-lg font-semibold">
              Gross Profit by Vertical
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              Gross profit breakdown by industry vertical
            </CardDescription>
            <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              {maxProfitItem.name} leads with $
              {(maxProfitItem.value / 1000).toFixed(1)}M profit
            </p>
          </div>
          <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            Current Year
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f3f4f6"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                tickFormatter={(value) => `$${value}K`}
              />
              <Tooltip
                cursor={{ fill: "#f9fafb" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-xl">
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: data.color }}
                          />
                          <p className="text-sm font-semibold text-gray-900">
                            {data.name}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 pl-4">
                          Profit:{" "}
                          <span className="font-medium text-gray-900">
                            ${data.value.toLocaleString()}K
                          </span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 flex items-center justify-between text-sm text-gray-500 px-2 border-t border-gray-100 pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Total Profit</span>
            <span className="font-semibold text-gray-900 text-base">
              ${(totalProfit / 1000).toFixed(1)}M
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-xs text-gray-400">Highest Performing</span>
            <span className="font-semibold text-gray-900 text-base">
              {maxProfitItem.name}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
