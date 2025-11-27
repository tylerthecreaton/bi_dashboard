import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";

const data = [
  { name: "Q1 2024", actual: 7200, forecast: null, newProjects: 850 },
  { name: "Q2 2024", actual: 6800, forecast: null, newProjects: 750 },
  { name: "Q3 2024", actual: 6500, forecast: null, newProjects: 700 },
  { name: "Q4 2024", actual: 6200, forecast: 6200, newProjects: 650 },
  { name: "Q1 2025", actual: null, forecast: 5800, newProjects: 600 },
  { name: "Q2 2025", actual: null, forecast: 5500, newProjects: 550 },
];

export function ForecastBacklogChart() {
  const currentBacklog = data[3].actual; // Q4 2024
  const forecastEnd = data[5].forecast; // Q2 2025
  const reduction =
    currentBacklog && forecastEnd
      ? ((currentBacklog - forecastEnd) / currentBacklog) * 100
      : 0;

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900 text-lg font-semibold">
              การวิเคราะห์งานค้างดำเนินการที่คาดการณ์
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              แนวโน้มงานค้างดำเนินการจริงและที่คาดการณ์พร้อมโปรเจคใหม่
            </CardDescription>
            <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              คาดว่าจะลดลง: -{reduction.toFixed(1)}% ในไตรมาส 2 ปี 2025
            </p>
          </div>
          <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            รายไตรมาส
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
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
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}K บาท`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                domain={[0, 3000]} // Scale new projects to be smaller bars
                hide={true}
              />
              <Tooltip
                cursor={{ fill: "#f9fafb" }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-xl">
                        <p className="text-sm font-semibold text-gray-900 mb-2">
                          {label}
                        </p>
                        {payload.map((entry, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 mb-1"
                          >
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-xs text-gray-500">
                              {entry.name}:
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {entry.value
                                ? `${entry.value.toLocaleString()} บาท`
                                : "ไม่มีข้อมูล"}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                formatter={(value) => (
                  <span className="text-sm text-gray-600 font-medium ml-1">
                    {value}
                  </span>
                )}
              />
              <ReferenceLine
                x="Q4 2024"
                stroke="#ef4444"
                strokeDasharray="3 3"
                label={{
                  value: "คาดการณ์",
                  position: "top",
                  fill: "#ef4444",
                  fontSize: 10,
                }}
              />
              <Bar
                yAxisId="right"
                dataKey="newProjects"
                name="โปรเจคใหม่"
                fill="rgba(16, 185, 129, 0.7)"
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="actual"
                name="งานค้างดำเนินการจริง"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
                activeDot={{ r: 6 }}
                connectNulls
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="forecast"
                name="งานค้างดำเนินการที่คาดการณ์"
                stroke="#9ca3af"
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={{ r: 4, fill: "#9ca3af", strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 flex items-center justify-between text-sm text-gray-500 px-2 border-t border-gray-100 pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">งานค้างดำเนินการปัจจุบัน</span>
            <span className="font-semibold text-gray-900 text-base">
              {currentBacklog?.toLocaleString()} บาท
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-xs text-gray-400">คาดการณ์ (ไตรมาส 2 2025)</span>
            <span className="font-semibold text-gray-900 text-base">
              {forecastEnd?.toLocaleString()} บาท
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
