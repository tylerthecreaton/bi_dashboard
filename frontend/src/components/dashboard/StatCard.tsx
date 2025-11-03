import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
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

  return (
    <Card className="border border-gray-200 bg-white hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-500 uppercase">
              {title}
            </p>
            <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
            <div className="flex items-center mt-2">
              <span
                className={`inline-flex items-center text-xs font-medium ${
                  isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {Math.abs(change)}%
              </span>
            </div>
          </div>
          {icon && (
            <div
              className={`p-2 rounded-lg ${
                isPositive
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
