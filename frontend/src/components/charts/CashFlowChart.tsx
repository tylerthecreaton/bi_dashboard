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
  Legend,
} from "recharts";

const data = [
  { name: "Jan", income: 3200, expense: 2800 },
  { name: "Feb", income: 3500, expense: 2900 },
  { name: "Mar", income: 3100, expense: 2700 },
  { name: "Apr", income: 3800, expense: 3100 },
  { name: "May", income: 4200, expense: 3300 },
  { name: "Jun", income: 3900, expense: 3200 },
  { name: "Jul", income: 4500, expense: 3500 },
  { name: "Aug", income: 4100, expense: 3400 },
  { name: "Sep", income: 4400, expense: 3600 },
  { name: "Oct", income: 4700, expense: 3800 },
  { name: "Nov", income: 4600, expense: 3700 },
  { name: "Dec", income: 4900, expense: 3900 },
];

export function CashFlowChart() {
  const currentMonth = data[data.length - 1];
  const netFlow = currentMonth.income - currentMonth.expense;

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900 text-lg font-semibold">
              Cash Flow Analysis
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              Monthly cash in and cash out trends
            </CardDescription>
            <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              Positive cash flow: ${(netFlow / 1000).toFixed(1)}M this month
            </p>
          </div>
          <button className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            Monthly
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
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
                tickFormatter={(value) => `$${value / 1000}M`}
              />
              <Tooltip
                cursor={{
                  stroke: "#9ca3af",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-xl">
                        <p className="text-sm font-semibold text-gray-900 mb-2">
                          {label}
                        </p>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-xs text-gray-500">
                            Cash In:
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            ${payload[0].value?.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <span className="text-xs text-gray-500">
                            Cash Out:
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            ${payload[1].value?.toLocaleString()}
                          </span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            Net Flow:
                          </span>
                          <span
                            className={`text-sm font-bold ${
                              (payload[0].value as number) -
                                (payload[1].value as number) >=
                              0
                                ? "text-emerald-600"
                                : "text-red-600"
                            }`}
                          >
                            $
                            {(
                              (payload[0].value as number) -
                              (payload[1].value as number)
                            ).toLocaleString()}
                          </span>
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
                iconType="circle"
                formatter={(value) => (
                  <span className="text-sm text-gray-600 font-medium ml-1">
                    {value}
                  </span>
                )}
              />
              <Area
                type="monotone"
                dataKey="income"
                name="Cash In"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorIncome)"
              />
              <Area
                type="monotone"
                dataKey="expense"
                name="Cash Out"
                stroke="#ef4444"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorExpense)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Total Cash In</span>
            <span className="font-semibold text-gray-900 text-base">
              $
              {(
                data.reduce((acc, curr) => acc + curr.income, 0) / 1000
              ).toFixed(1)}
              M
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Total Cash Out</span>
            <span className="font-semibold text-gray-900 text-base">
              $
              {(
                data.reduce((acc, curr) => acc + curr.expense, 0) / 1000
              ).toFixed(1)}
              M
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-xs text-gray-400">Net Cash Flow</span>
            <span
              className={`font-semibold text-base ${
                data.reduce(
                  (acc, curr) => acc + (curr.income - curr.expense),
                  0
                ) >= 0
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              $
              {(
                data.reduce(
                  (acc, curr) => acc + (curr.income - curr.expense),
                  0
                ) / 1000
              ).toFixed(1)}
              M
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
