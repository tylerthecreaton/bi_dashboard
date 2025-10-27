import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon?: ReactNode;
  trend?: "up" | "down";
}

export function StatCard({
  title,
  value,
  change,
  icon,
  trend = "up",
}: StatCardProps) {
  const isPositive = change >= 0;
  const trendColor = isPositive ? "text-green-600" : "text-red-600";
  const bgColor = isPositive ? "bg-green-50" : "bg-red-50";

  return (
    <Card className="hover:shadow-md transition-all duration-200 border-gray-200 bg-white">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
            <div className="flex items-center mt-3">
              <span className={`inline-flex items-center ${trendColor}`}>
                {trend === "up" ? (
                  <ArrowUp className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDown className="w-4 h-4 mr-1" />
                )}
                <span className="text-xs font-semibold">
                  {Math.abs(change)}%
                </span>
              </span>
              <span className="text-xs text-gray-500 ml-2">
                From last month
              </span>
            </div>
          </div>
          {icon && <div className={`p-3 rounded-lg ${bgColor}`}>{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
}
