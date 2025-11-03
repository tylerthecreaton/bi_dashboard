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
  Cell,
  LabelList,
} from "recharts";

export function RevenueByQuarterChart() {
  // Sample data - Revenue by quarter separated by business type
  const data = [
    { quarter: "Q1", core: 2000, new: 800, jv: 300, total: 3100 },
    { quarter: "Q2", core: 2100, new: 900, jv: 350, total: 3350 },
    { quarter: "Q3", core: 2200, new: 950, jv: 400, total: 3550 },
    { quarter: "Q4", core: 2300, new: 1000, jv: 450, total: 3750 },
  ];

  const colors = {
    core: "#3b82f6",
    new: "#10b981",
    jv: "#f59e0b",
  };

  const renderTotalLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill="#1f2937"
        textAnchor="middle"
        className="text-xs font-bold"
      >
        ${value}K
      </text>
    );
  };

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900">Revenue by Quarter</CardTitle>
            <CardDescription className="text-gray-500">
              Separated by Core Business, New Business, and JV
            </CardDescription>
            <p className="text-xs text-blue-600 font-semibold mt-1">
              Q4 Growth: +12.5% from Q3
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
              formatter={(value: number, name: string) => {
                const labelMap: { [key: string]: string } = {
                  core: "Core Business",
                  new: "New Business",
                  jv: "JV",
                  total: "Total",
                };
                return [`$${value}K`, labelMap[name] || name];
              }}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="rect"
              formatter={(value: string) => {
                const labelMap: { [key: string]: string } = {
                  core: "Core Business",
                  new: "New Business",
                  jv: "JV",
                };
                return labelMap[value] || value;
              }}
            />
            <Bar
              dataKey="core"
              stackId="a"
              fill={colors.core}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="new"
              stackId="a"
              fill={colors.new}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="jv"
              stackId="a"
              fill={colors.jv}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="total"
              fill="transparent"
              stackId="a"
              label={renderTotalLabel}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
