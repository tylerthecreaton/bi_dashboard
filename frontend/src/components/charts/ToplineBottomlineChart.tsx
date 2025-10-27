import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";

export function ToplineBottomlineChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    // Sample data - Revenue (Topline) and Net Profit (Bottomline)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const revenue = [2500, 2700, 2600, 2800, 3000, 3200, 3100, 3300, 3400, 3500, 3600, 3700];
    const netProfit = [250, 270, 260, 280, 300, 320, 310, 330, 340, 350, 360, 370];

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const maxRevenue = Math.max(...revenue);
    const maxNetProfit = Math.max(...netProfit);

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

    // Draw Y-axis labels (left side for revenue)
    ctx.fillStyle = "#9ca3af";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxRevenue / 5) * (5 - i));
      const y = padding + (chartHeight / 5) * i + 4;
      ctx.fillText(`$${value}K`, padding - 10, y);
    }

    // Draw Y-axis labels (right side for net profit)
    ctx.textAlign = "left";
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxNetProfit / 5) * (5 - i));
      const y = padding + (chartHeight / 5) * i + 4;
      ctx.fillText(`$${value}K`, width - padding + 10, y);
    }

    // Draw revenue bars
    const barWidth = chartWidth / (revenue.length * 2);
    revenue.forEach((value, index) => {
      const barHeight = (value / maxRevenue) * chartHeight;
      const x = padding + (index * barWidth * 2) + barWidth / 2;
      const y = height - padding - barHeight;
      
      ctx.fillStyle = "rgba(59, 130, 246, 0.7)";
      ctx.fillRect(x, y, barWidth, barHeight);
    });

    // Draw net profit line
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3;
    ctx.beginPath();

    netProfit.forEach((value, index) => {
      const x = padding + (index * barWidth * 2) + barWidth;
      const y = height - padding - (value / maxNetProfit) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw dots for net profit
    ctx.fillStyle = "#ef4444";
    netProfit.forEach((value, index) => {
      const x = padding + (index * barWidth * 2) + barWidth;
      const y = height - padding - (value / maxNetProfit) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw X-axis labels
    ctx.fillStyle = "#9ca3af";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    months.forEach((month, index) => {
      const x = padding + (index * barWidth * 2) + barWidth;
      ctx.fillText(month, x, height - 15);
    });

    // Draw legend
    const legendY = 20;
    
    // Revenue legend
    ctx.fillStyle = "rgba(59, 130, 246, 0.7)";
    ctx.fillRect(width - 150, legendY, 15, 15);
    ctx.fillStyle = "#374151";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Revenue (Topline)", width - 130, legendY + 12);

    // Net Profit legend
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(width - 150, legendY + 25, 15, 15);
    ctx.fillStyle = "#374151";
    ctx.fillText("Net Profit (Bottomline)", width - 130, legendY + 37);

    // Draw axis labels
    ctx.fillStyle = "#6b7280";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "center";
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Revenue ($K)", 0, 0);
    ctx.restore();

    ctx.save();
    ctx.translate(width - 15, height / 2);
    ctx.rotate(Math.PI / 2);
    ctx.fillText("Net Profit ($K)", 0, 0);
    ctx.restore();
  }, []);

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900">Topline vs Bottomline Analysis</CardTitle>
            <CardDescription className="text-gray-500">
              Revenue and Net Profit comparison
            </CardDescription>
            <p className="text-xs text-green-600 font-semibold mt-1">
              Net Margin: 10% | Revenue Growth: +12.5%
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