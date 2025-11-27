import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export function SalesAnalyticsGauge() {
  const percentage = 72;
  const data = [
    { name: "โปรเจค", value: percentage, color: "#3b82f6" },
    { name: "เหลือ", value: 100 - percentage, color: "#f3f4f6" },
  ];

  const renderCustomLabel = () => {
    return (
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-4xl font-bold fill-gray-900"
      >
        {`${percentage}%`}
      </text>
    );
  };

  const renderSubLabel = () => {
    return (
      <text
        x="50%"
        y="65%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-sm fill-gray-500"
      >
        เปอร์เซ็นต์ความคืบหน้า
      </text>
    );
  };

  return (
    <Card className="border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-gray-900">
          สัดส่วนรายได้ตามประเภทธุรกิจ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={340}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={100}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value}%`, ""]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="relative -mt-48">
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-gray-900">
              {percentage}%
            </div>
            <div className="text-sm text-gray-500 mt-1">
              เปอร์เซ็นต์ความคืบหน้าโดยรวม
            </div>
          </div>
        </div>
        <div className="mt-20 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">โปรเจคที่ดำเนินการ</span>
            </div>
            <span className="font-semibold text-gray-900">{percentage}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
              <span className="text-gray-700">โปรเจคที่คงเหลือ</span>
            </div>
            <span className="font-semibold text-gray-900">
              {100 - percentage}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
