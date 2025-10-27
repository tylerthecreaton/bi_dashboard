import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";

export function RevenueByQuarterChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    // Sample data - Revenue by quarter separated by business type
    const quarters = ["Q1", "Q2", "Q3", "Q4"];
    const coreBusiness = [2000, 2100, 2200, 2300];
    const newBusiness = [800, 900, 950, 1000];
    const jvBusiness = [300, 350, 400, 450];

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const maxValue = quarters.reduce((max, quarter, index) => {
      const total = coreBusiness[index] + newBusiness[index] + jvBusiness[index];
      return Math.max(max, total);
    }, 0);

    // Calculate chart area
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Bar settings
    const barWidth = chartWidth / quarters.length / 1.5;
    const barSpacing = chartWidth / quarters.length / 3;

    // Colors for different business types
    const colors = {
      core: "#3b82f6",
      new: "#10b981",
      jv: "#f59e0b"
    };

    // Draw background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = "#f3f4f6";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw Y-axis labels
    ctx.fillStyle = "#9ca3af";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxValue / 5) * (5 - i));
      const y = padding + (chartHeight / 5) * i + 4;
      ctx.fillText(`$${value}K`, padding - 10, y);
    }

    // Draw stacked bars for each quarter
    quarters.forEach((quarter, quarterIndex) => {
      const barX = padding + (barWidth + barSpacing) * quarterIndex + barSpacing / 2;
      
      // Calculate total height for this quarter
      const totalHeight = ((coreBusiness[quarterIndex] + newBusiness[quarterIndex] + jvBusiness[quarterIndex]) / maxValue) * chartHeight;
      
      // Draw JV business (bottom)
      const jvHeight = (jvBusiness[quarterIndex] / maxValue) * chartHeight;
      const jvY = height - padding - jvHeight;
      
      ctx.fillStyle = colors.jv;
      ctx.fillRect(barX, jvY, barWidth, jvHeight);

      // Draw new business (middle)
      const newHeight = (newBusiness[quarterIndex] / maxValue) * chartHeight;
      const newY = jvY - newHeight;
      
      ctx.fillStyle = colors.new;
      ctx.fillRect(barX, newY, barWidth, newHeight);

      // Draw core business (top)
      const coreHeight = (coreBusiness[quarterIndex] / maxValue) * chartHeight;
      const coreY = newY - coreHeight;
      
      ctx.fillStyle = colors.core;
      ctx.fillRect(barX, coreY, barWidth, coreHeight);

      // Draw quarter label
      ctx.fillStyle = "#9ca3af";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(quarter, barX + barWidth / 2, height - 15);

      // Draw total value on top of each stack
      const total = coreBusiness[quarterIndex] + newBusiness[quarterIndex] + jvBusiness[quarterIndex];
      ctx.fillStyle = "#1f2937";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`$${total}K`, barX + barWidth / 2, coreY - 5);
    });

    // Draw legend
    const legendY = 20;
    const legendItems = [
      { label: "Core Business", color: colors.core },
      { label: "New Business", color: colors.new },
      { label: "JV", color: colors.jv }
    ];

    legendItems.forEach((item, index) => {
      const legendX = width - 150;
      const itemY = legendY + (index * 25);
      
      ctx.fillStyle = item.color;
      ctx.fillRect(legendX, itemY, 15, 15);
      
      ctx.fillStyle = "#374151";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(item.label, legendX + 20, itemY + 12);
    });
  }, []);

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
        <canvas ref={canvasRef} className="w-full" />
      </CardContent>
    </Card>
  );
}