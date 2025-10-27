import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";

export function SalesChart() {
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
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const data = [
      2500, 3200, 2800, 3500, 3000, 3200, 3800, 3500, 3200, 4000, 3900, 3600,
    ];

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const maxValue = Math.max(...data);
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
      ctx.fillText(`$${value / 1000}K`, padding - 10, y);
    }

    // Draw chart area (filled area)
    ctx.fillStyle = "rgba(59, 130, 246, 0.08)";
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);

    for (let i = 0; i < data.length; i++) {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const y =
        height -
        padding -
        ((data[i] - minValue) / (maxValue - minValue)) * chartHeight;
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
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i < data.length; i++) {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const y =
        height -
        padding -
        ((data[i] - minValue) / (maxValue - minValue)) * chartHeight;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw dots
    ctx.fillStyle = "#3b82f6";
    for (let i = 0; i < data.length; i++) {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      const y =
        height -
        padding -
        ((data[i] - minValue) / (maxValue - minValue)) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw X-axis labels
    ctx.fillStyle = "#9ca3af";
    ctx.textAlign = "center";
    for (let i = 0; i < data.length; i++) {
      const x = padding + (chartWidth / (data.length - 1)) * i;
      ctx.fillText(months[i], x, height - 15);
    }
  }, []);

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900">Overall Sales</CardTitle>
            <CardDescription className="text-gray-500">
              $3,872.24
            </CardDescription>
            <p className="text-xs text-green-600 font-semibold mt-1">
              +2.26% From last month
            </p>
          </div>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Monthly
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <canvas ref={canvasRef} className="w-full" />
      </CardContent>
    </Card>
  );
}
