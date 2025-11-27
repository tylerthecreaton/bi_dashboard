import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  Cell,
} from "recharts";

const data = [
  { name: "Project A", invoice: 2500, progress: 85, value: 3000 },
  { name: "Project B", invoice: 1800, progress: 60, value: 2500 },
  { name: "Project C", invoice: 3200, progress: 95, value: 3500 },
  { name: "Project D", invoice: 1200, progress: 40, value: 2000 },
  { name: "Project E", invoice: 2800, progress: 75, value: 3200 },
  { name: "Project F", invoice: 900, progress: 25, value: 1500 },
  { name: "Project G", invoice: 2100, progress: 55, value: 2800 },
  { name: "Project H", invoice: 3500, progress: 90, value: 3800 },
];

export function InvoiceVsProgressChart() {
  // Calculate max values for axes scaling
  const maxInvoice = Math.max(...data.map((d) => d.invoice));

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900 text-lg font-semibold">
              การเรียกเก็บเงินเทียบกับความคืบหน้างานวิศวกรรม
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              ความสัมพันธ์ระหว่างจำนวนเงินที่เรียกเก็บกับความคืบหน้าโปรเจค
            </CardDescription>
            <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              ความสัมพันธ์สูง: 0.87
            </p>
          </div>
          <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            ปัจจุบัน
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                type="number"
                dataKey="invoice"
                name="จำนวนเงินที่เรียกเก็บ"
                unit="K"
                tickFormatter={(value) => `${value}K บาท`}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                label={{
                  value: "จำนวนเงินที่เรียกเก็บ (K บาท)",
                  position: "bottom",
                  offset: 0,
                  fill: "#374151",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              />
              <YAxis
                type="number"
                dataKey="progress"
                name="ความคืบหน้า"
                unit="%"
                domain={[0, 100]}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                label={{
                  value: "ความคืบหน้างานวิศวกรรม (%)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#374151",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              />
              <ZAxis
                type="number"
                dataKey="value"
                range={[100, 800]}
                name="มูลค่าโปรเจค"
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-xl">
                        <p className="text-sm font-semibold text-gray-900 mb-2">
                          {data.name}
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-xs text-gray-500">
                              เรียกเก็บ:
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {data.invoice.toLocaleString()}K บาท
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-xs text-gray-500">
                              ความคืบหน้า:
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {data.progress}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-xs text-gray-500">
                              มูลค่า:
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {data.value.toLocaleString()}K บาท
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                content={() => (
                  <div className="flex items-center justify-end gap-4 text-xs text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 opacity-80"></span>
                      <span>เกินความคืบหน้า</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500 opacity-80"></span>
                      <span>ล่าช้ากว่าความคืบหน้า</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-4 h-0.5 bg-gray-300 border-t border-dashed border-gray-400"></span>
                      <span>ความสัมพันธ์ที่เหมาะสม</span>
                    </div>
                  </div>
                )}
              />
              {/* Ideal correlation line (approximate) */}
              <ReferenceLine
                segment={[
                  { x: 0, y: 0 },
                  { x: maxInvoice, y: 100 },
                ]}
                stroke="#e5e7eb"
                strokeDasharray="5 5"
                strokeWidth={2}
              />
              <Scatter name="โปรเจค" data={data}>
                {data.map((entry, index) => {
                  // Simple logic to determine color: if progress % > (invoice / maxInvoice) * 100, it's "good" (green)
                  // This assumes linear correlation where max invoice should equal 100% progress
                  const idealProgress = (entry.invoice / maxInvoice) * 100;
                  const isGood = entry.progress >= idealProgress - 5; // Tolerance

                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        isGood
                          ? "rgba(16, 185, 129, 0.6)"
                          : "rgba(239, 68, 68, 0.6)"
                      }
                      stroke={isGood ? "#10b981" : "#ef4444"}
                      strokeWidth={1}
                    />
                  );
                })}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 flex items-center justify-between text-sm text-gray-500 px-2 border-t border-gray-100 pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">ความสัมพันธ์</span>
            <span className="font-semibold text-gray-900 text-base">0.87</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-xs text-gray-400">ขนาดบับเบิล</span>
            <span className="font-semibold text-gray-900 text-base">
              มูลค่าโปรเจค
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
