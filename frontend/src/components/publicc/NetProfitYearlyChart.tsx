import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";

export function NetProfitYearlyChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    // Sample data - Net Profit by year
    const years = ["2020", "2021", "2022", "2023", "2024"];
    const netProfit = [800, 950, 1100, 1250, 1400];

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const maxValue = Math.max(...netProfit);
    const minValue = 0;

    // Calculate chart area
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

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

    // Draw chart area (filled area)
    ctx.fillStyle = "rgba(139, 92, 246, 0.08)";
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);

    for (let i = 0; i < netProfit.length; i++) {
      const x = padding + (chartWidth / (netProfit.length - 1)) * i;
      const y = height - padding - ((netProfit[i] - minValue) / (maxValue - minValue)) * chartHeight;
      if (i === 0) {
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fill();

    // Draw line
    ctx.strokeStyle = "#8b5cf6";
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let i = 0; i < netProfit.length; i++) {
      const x = padding + (chartWidth / (netProfit.length - 1)) * i;
      const y = height - padding - ((netProfit[i] - minValue) / (maxValue - minValue)) * chartHeight;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw dots
    ctx.fillStyle = "#8b5cf6";
    for (let i = 0; i < netProfit.length; i++) {
      const x = padding + (chartWidth / (netProfit.length - 1)) * i;
      const y = height - padding - ((netProfit[i] - minValue) / (maxValue - minValue)) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw value labels on dots
    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    for (let i = 0; i < netProfit.length; i++) {
      const x = padding + (chartWidth / (netProfit.length - 1)) * i;
      const y = height - padding - ((netProfit[i] - minValue) / (maxValue - minValue)) * chartHeight;
      ctx.fillText(`$${netProfit[i]}K`, x, y - 10);
    }

    // Draw X-axis labels
    ctx.fillStyle = "#9ca3af";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    for (let i = 0; i < years.length; i++) {
      const x = padding + (chartWidth / (years.length - 1)) * i;
      ctx.fillText(years[i], x, height - 15);
    }

    // Draw growth indicators
    ctx.fillStyle = "#10b981";
    ctx.font = "10px sans-serif";
    for (let i = 1; i < netProfit.length; i++) {
      const growth = ((netProfit[i] - netProfit[i-1]) / netProfit[i-1] * 100).toFixed(1);
      const x = padding + (chartWidth / (netProfit.length - 1)) * i;
      const y = height - padding - ((netProfit[i] - minValue) / (maxValue - minValue)) * chartHeight;
      ctx.fillText(`+${growth}%`, x, y + 20);
    }
  }, []);

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900">Net Profit Yearly Comparison</CardTitle>
            <CardDescription className="text-gray-500">
              Year-over-year net profit trends
            </CardDescription>
            <p className="text-xs text-green-600 font-semibold mt-1">
              2024 Growth: +12% from 2023
            </p>
          </div>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Yearly
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <canvas ref={canvasRef} className="w-full" />
      </CardContent>
    </Card>
  );
}
