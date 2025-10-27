import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";

export function RevenueByBusinessTypeChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    // Sample data - Revenue by business type and quarter
    const quarters = ["Q1", "Q2", "Q3", "Q4"];
    const projectRevenue = [1200, 1350, 1400, 1500];
    const servicesRevenue = [800, 850, 900, 950];
    const distributeRevenue = [600, 650, 700, 750];

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const maxValue = Math.max(...projectRevenue, ...servicesRevenue, ...distributeRevenue);
    const minValue = 0;

    // Calculate chart area
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Bar settings
    const barGroupWidth = chartWidth / quarters.length;
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

    // Draw bars for each quarter
    quarters.forEach((quarter, quarterIndex) => {
      const groupX = padding + (barGroupWidth * quarterIndex) + (barGroupWidth / 2);

      // Project bar
      const projectHeight = (projectRevenue[quarterIndex] / maxValue) * chartHeight;
      const projectX = groupX - barWidth - barSpacing;
      const projectY = height - padding - projectHeight;
      
      ctx.fillStyle = colors.project;
      ctx.fillRect(projectX, projectY, barWidth, projectHeight);

      // Services bar
      const servicesHeight = (servicesRevenue[quarterIndex] / maxValue) * chartHeight;
      const servicesX = groupX - barSpacing / 2;
      const servicesY = height - padding - servicesHeight;
      
      ctx.fillStyle = colors.services;
      ctx.fillRect(servicesX, servicesY, barWidth, servicesHeight);

      // Distribute bar
      const distributeHeight = (distributeRevenue[quarterIndex] / maxValue) * chartHeight;
      const distributeX = groupX + barWidth + barSpacing / 2;
      const distributeY = height - padding - distributeHeight;
      
      ctx.fillStyle = colors.distribute;
      ctx.fillRect(distributeX, distributeY, barWidth, distributeHeight);

      // Draw quarter label
      ctx.fillStyle = "#9ca3af";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(quarter, groupX, height - 15);
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
            <CardTitle className="text-gray-900">Revenue by Business Type</CardTitle>
            <CardDescription className="text-gray-500">
              Quarterly comparison by business type
            </CardDescription>
            <p className="text-xs text-blue-600 font-semibold mt-1">
              Project: 45% | Services: 30% | Distribute: 25%
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