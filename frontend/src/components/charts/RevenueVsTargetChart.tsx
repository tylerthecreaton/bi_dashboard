import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";

export function RevenueVsTargetChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    // Sample data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const actualRevenue = [850, 920, 1100, 1050, 1200, 1150, 1300, 1250, 1400, 1350, 1450, 1500];
    const targetRevenue = [1000, 1000, 1000, 1100, 1100, 1200, 1200, 1300, 1300, 1400, 1400, 1500];

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const maxValue = Math.max(...targetRevenue, ...actualRevenue);
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

    // Draw target line (dashed)
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    for (let i = 0; i < targetRevenue.length; i++) {
      const x = padding + (chartWidth / (targetRevenue.length - 1)) * i;
      const y = height - padding - ((targetRevenue[i] - minValue) / (maxValue - minValue)) * chartHeight;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw actual revenue line
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i < actualRevenue.length; i++) {
      const x = padding + (chartWidth / (actualRevenue.length - 1)) * i;
      const y = height - padding - ((actualRevenue[i] - minValue) / (maxValue - minValue)) * chartHeight;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw dots for actual revenue
    ctx.fillStyle = "#3b82f6";
    for (let i = 0; i < actualRevenue.length; i++) {
      const x = padding + (chartWidth / (actualRevenue.length - 1)) * i;
      const y = height - padding - ((actualRevenue[i] - minValue) / (maxValue - minValue)) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw X-axis labels
    ctx.fillStyle = "#9ca3af";
    ctx.textAlign = "center";
    for (let i = 0; i < months.length; i++) {
      const x = padding + (chartWidth / (months.length - 1)) * i;
      ctx.fillText(months[i], x, height - 15);
    }

    // Draw legend
    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(width - 150, 20, 15, 15);
    ctx.fillStyle = "#374151";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Actual Revenue", width - 130, 32);

    ctx.fillStyle = "#ef4444";
    ctx.fillRect(width - 150, 45, 15, 15);
    ctx.fillStyle = "#374151";
    ctx.fillText("Target Revenue", width - 130, 57);
  }, []);

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900">Overall Revenue YTD vs Target</CardTitle>
            <CardDescription className="text-gray-500">
              Year to Date Performance
            </CardDescription>
            <p className="text-xs text-green-600 font-semibold mt-1">
              +8.5% Above target
            </p>
          </div>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            YTD
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <canvas ref={canvasRef} className="w-full" />
      </CardContent>
    </Card>
  );
}