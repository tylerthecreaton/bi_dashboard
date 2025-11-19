import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { name: "Infrastructure", progress: 85, target: 90, color: "#3b82f6" },
  { name: "Software Dev", progress: 72, target: 80, color: "#10b981" },
  { name: "QA Testing", progress: 68, target: 75, color: "#f59e0b" },
  { name: "DevOps", progress: 78, target: 85, color: "#8b5cf6" },
  { name: "Security", progress: 92, target: 95, color: "#ef4444" },
  { name: "Data Analytics", progress: 65, target: 70, color: "#06b6d4" },
];

export function EngineeringProgressChart() {
  const overallProgress =
    data.reduce((sum, item) => sum + item.progress, 0) / data.length;
  const overallTarget =
    data.reduce((sum, item) => sum + item.target, 0) / data.length;

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900 text-lg font-semibold">
              Engineering Progress Overview
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              Progress by department vs target
            </CardDescription>
            <p className="text-xs text-blue-600 font-medium mt-2 flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
              Overall Progress: {Math.round(overallProgress)}% | Target:{" "}
              {Math.round(overallTarget)}%
            </p>
          </div>
          <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            Current
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              layout="vertical"
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 40,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#f3f4f6"
              />
              <XAxis
                type="number"
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                unit="%"
              />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#374151", fontSize: 12, fontWeight: 500 }}
                width={100}
              />
              <Tooltip
                cursor={{ fill: "#f9fafb" }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-xl">
                        <p className="text-sm font-semibold text-gray-900 mb-2">
                          {label}
                        </p>
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: data.color }}
                          />
                          <span className="text-xs text-gray-500">
                            Progress:
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {data.progress}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-300" />
                          <span className="text-xs text-gray-500">Target:</span>
                          <span className="text-sm font-medium text-gray-900">
                            {data.target}%
                          </span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                              data.progress >= data.target
                                ? "bg-emerald-100 text-emerald-700"
                                : data.progress >= data.target * 0.9
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {data.progress >= data.target
                              ? "On Track"
                              : data.progress >= data.target * 0.9
                              ? "At Risk"
                              : "Behind"}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="progress"
                barSize={20}
                radius={[0, 4, 4, 0]}
                background={{ fill: "#f3f4f6", radius: [0, 4, 4, 0] }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
          {data.slice(0, 3).map((dept, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-xs text-gray-400">{dept.name}</span>
              <div className="flex items-end gap-1">
                <span className="font-semibold text-gray-900 text-sm">
                  {dept.progress}%
                </span>
                <span className="text-xs text-gray-400 mb-0.5">
                  / {dept.target}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
