import { StatCard } from "@/components/publicc/StatCard";
import { DollarSign, Target, TrendingUp, PieChart } from "lucide-react";

interface StatCardData {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: React.ReactNode;
}

const STAT_CARDS_DATA: StatCardData[] = [
  {
    title: "Overall Revenue YTD",
    value: "$12.5M",
    change: 8.2,
    trend: "up",
    icon: <DollarSign className="w-6 h-6 text-green-400" />,
  },
  {
    title: "Revenue Target",
    value: "$15.0M",
    change: 0,
    trend: "up",
    icon: <Target className="w-6 h-6 text-blue-400" />,
  },
  {
    title: "Gross Profit",
    value: "$4.2M",
    change: 5.7,
    trend: "up",
    icon: <TrendingUp className="w-6 h-6 text-green-400" />,
  },
  {
    title: "Net Profit",
    value: "$2.1M",
    change: 3.4,
    trend: "up",
    icon: <PieChart className="w-6 h-6 text-purple-400" />,
  },
];

export function KeyMetricsSection() {
  return (
    <div 
      id="metrics"
      className="relative bg-black/20 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/10 shadow-2xl"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px] rounded-2xl" />

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-8 drop-shadow-lg">
          Key Performance Indicators
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAT_CARDS_DATA.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
}
