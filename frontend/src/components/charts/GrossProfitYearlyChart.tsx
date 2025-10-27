import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";

export function GrossProfitYearlyChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    // Sample data - Gross Profit by year and business type
    const years = ["2020", "2021", "2022", "2023", "2024"];
    const projectProfit = [800, 950, 1100, 1250, 1400];
    const servicesProfit = [500, 600, 700, 800, 900];
    const distributeProfit = [300, 350, 400, 450, 500];

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const maxValue = Math.max(...projectProfit, ...servicesProfit, ...distributeProfit);

    // Calculate chart area
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Bar settings
    const barGroupWidth = chartWidth / years.length;
    const barWidth = barGroupWidth / 4; // 3 bars + spacing
    const barSpacing = barWidth / 4;

    // Colors for different business types
    const colors = {
      project: "#3b82f6",
      services: "#10b981",
      distribute: "#f59e0b"
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

    // Draw bars for each year
    years.forEach((year, yearIndex) => {
      const groupX = padding + (barGroupWidth * yearIndex) + (barGroupWidth / 2);

      // Project bar
      const projectHeight = (projectProfit[yearIndex] / maxValue) * chartHeight;
      const projectX = groupX - barWidth - barSpacing;
      const projectY = height - padding - projectHeight;
      
      ctx.fillStyle = colors.project;
      ctx.fillRect(projectX, projectY, barWidth, projectHeight);

      // Services bar
      const servicesHeight = (servicesProfit[yearIndex] / maxValue) * chartHeight;
      const servicesX = groupX - barSpacing / 2;
      const servicesY = height - padding - servicesHeight;
      
      ctx.fillStyle = colors.services;
      ctx.fillRect(servicesX, servicesY, barWidth, servicesHeight);

      // Distribute bar
      const distributeHeight = (distributeProfit[yearIndex] / maxValue) * chartHeight;
      const distributeX = groupX + barWidth + barSpacing / 2;
      const distributeY = height - padding - distributeHeight;
      
      ctx.fillStyle = colors.distribute;
      ctx.fillRect(distributeX, distributeY, barWidth, distributeHeight);

      // Draw year label
      ctx.fillStyle = "#9ca3af";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(year, groupX, height - 15);
    });

    // Draw legend
    const legendY = 20;
    const legendItems = [
      { label: "Project", color: colors.project },
      { label: "Services", color: colors.services },
      { label: "Distribute", color: colors.distribute }
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
            <CardTitle className="text-gray-900">Gross Profit Yearly Comparison</CardTitle>
            <CardDescription className="text-gray-500">
              Year-over-year comparison by business type
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