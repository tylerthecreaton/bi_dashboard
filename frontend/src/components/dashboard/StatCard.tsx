import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon?: ReactNode;
  trend?: "up" | "down";
  variant?: "default" | "gradient" | "minimal";
}

export function StatCard({
  title,
  value,
  change,
  icon,
  trend = "up",
  variant = "default",
}: StatCardProps) {
  const isPositive = trend === "up" || (trend === undefined && change >= 0);

  const cardStyles = {
    default: "border-0 shadow-lg hover:shadow-xl bg-gradient-to-br from-white to-gray-50",
    gradient: "border-0 shadow-xl hover:shadow-2xl bg-gradient-to-br from-slate-50 to-white",
    minimal: "border border-gray-200 bg-white hover:shadow-md"
  };

  const iconContainerStyles = {
    default: isPositive
      ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-600 shadow-sm"
      : "bg-gradient-to-r from-red-50 to-rose-50 text-red-600 shadow-sm",
    gradient: isPositive
      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md"
      : "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md",
    minimal: isPositive
      ? "bg-emerald-50 text-emerald-600"
      : "bg-red-50 text-red-600"
  };

  const trendStyles = {
    default: isPositive
      ? "text-emerald-600 bg-emerald-50"
      : "text-red-600 bg-red-50",
    gradient: isPositive
      ? "text-emerald-700 bg-gradient-to-r from-emerald-50 to-teal-50"
      : "text-red-700 bg-gradient-to-r from-red-50 to-rose-50",
    minimal: isPositive
      ? "text-emerald-600"
      : "text-red-600"
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] group",
        cardStyles[variant]
      )}
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-100 to-transparent rounded-full -mr-10 -mt-10 opacity-50 group-hover:opacity-70 transition-opacity" />
      
      <CardContent className="p-6 relative">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {title}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 leading-tight">
                {value}
              </p>
              
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold transition-all",
                    trendStyles[variant]
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3.5 h-3.5" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5" />
                  )}
                  {Math.abs(change)}%
                </div>
                
                <span className="text-xs text-gray-500">
                  {isPositive ? "เพิ่มขึ้น" : "ลดลง"}จากเดือนที่แล้ว
                </span>
              </div>
            </div>
          </div>
          
          {icon && (
            <div
              className={cn(
                "p-3 rounded-xl transition-all duration-300 group-hover:scale-110",
                iconContainerStyles[variant]
              )}
            >
              {icon}
            </div>
          )}
        </div>
        
        {variant !== "minimal" && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-30" />
        )}
      </CardContent>
    </Card>
  );
}
