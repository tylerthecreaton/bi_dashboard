import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";

export function GrossProfitByVerticalChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    // Sample data - Gross Profit by vertical
    const verticals = ["Banking", "Manufacturing", "Retail", "Healthcare", "Finance", "Technology"];
    const grossProfit = [2800, 2200, 1900, 1600, 2400, 3100];
    const colors = [
      "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"
    ];

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const maxValue = Math.max(...grossProfit);

    // Calculate chart area
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Bar settings
    const barWidth = chartWidth / verticals.length / 1.5;
    const barSpacing = chartWidth / verticals.length / 3;

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

    // Draw bars
    verticals.forEach((vertical, index) => {
      const barHeight = (grossProfit[index] / maxValue) * chartHeight;
      const x = padding + (barWidth + barSpacing) * index + barSpacing / 2;
      const y = height - padding - barHeight;
      
      // Draw bar with gradient effect
      const gradient = ctx.createLinearGradient(0, y, 0, height - padding);
      gradient.addColorStop(0, colors[index]);
      gradient.addColorStop(1, colors[index] + "80");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);
      
      // Draw value on top of bar
      ctx.fillStyle = "#1f2937";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`$${grossProfit[index]}K`, x + barWidth / 2, y - 5);
      
      // Draw vertical label
      ctx.fillStyle = "#9ca3af";
      ctx.font = "11px sans-serif";
      ctx.save();
      ctx.translate(x + barWidth / 2, height - 10);
      ctx.rotate(-Math.PI / 6);
      ctx.textAlign = "right";
      ctx.fillText(vertical, 0, 0);
      ctx.restore();
    });

    // Draw average line
    const average = grossProfit.reduce((sum, val) => sum + val, 0) / grossProfit.length;
    const averageY = height - padding - (average / maxValue) * chartHeight;
    
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding, averageY);
    ctx.lineTo(width - padding, averageY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw average label
    ctx.fillStyle = "#ef4444";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`Avg: $${Math.round(average)}K`, width - padding + 10, averageY + 4);

    // Draw title
    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Gross Profit by Vertical", width / 2, 25);

    // Draw summary stats
    const totalProfit = grossProfit.reduce((sum, val) => sum + val, 0);
    const maxProfit = Math.max(...grossProfit);
    const minProfit = Math.min(...grossProfit);
    const maxIndex = grossProfit.indexOf(maxProfit);
    const minIndex = grossProfit.indexOf(minProfit);
    
    ctx.fillStyle = "#6b7280";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`Total: $${totalProfit}K`, padding, height - 5);
    ctx.fillText(`Highest: ${verticals[maxIndex]} ($${maxProfit}K)`, padding + 120, height - 5);
    ctx.fillText(`Lowest: ${verticals[minIndex]} ($${minProfit}K)`, padding + 280, height - 5);
  }, []);

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900">Gross Profit by Vertical</CardTitle>
            <CardDescription className="text-gray-500">
              Gross profit breakdown by industry vertical
            </CardDescription>
            <p className="text-xs text-green-600 font-semibold mt-1">
              Technology leads with $3.1M profit
            </p>
          </div>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Current
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <canvas ref={canvasRef} className="w-full" />
      </CardContent>
    </Card>
  );
}