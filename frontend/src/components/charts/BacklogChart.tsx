import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";

export function BacklogChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    // Sample data - Backlog by quarter
    const quarters = ["Q1 2023", "Q2 2023", "Q3 2023", "Q4 2023", "Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"];
    const backlog = [8500, 8200, 7800, 7500, 7200, 6800, 6500, 6200];
    const newBacklog = [1200, 1100, 1000, 900, 850, 800, 750, 700];

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const maxValue = Math.max(...backlog);
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

    // Draw total backlog area
    ctx.fillStyle = "rgba(59, 130, 246, 0.1)";
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);

    for (let i = 0; i < backlog.length; i++) {
      const x = padding + (chartWidth / (backlog.length - 1)) * i;
      const y = height - padding - ((backlog[i] - minValue) / (maxValue - minValue)) * chartHeight;
      if (i === 0) {
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fill();

    // Draw total backlog line
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let i = 0; i < backlog.length; i++) {
      const x = padding + (chartWidth / (backlog.length - 1)) * i;
      const y = height - padding - ((backlog[i] - minValue) / (maxValue - minValue)) * chartHeight;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw new backlog line
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();

    for (let i = 0; i < newBacklog.length; i++) {
      const x = padding + (chartWidth / (newBacklog.length - 1)) * i;
      const y = height - padding - ((newBacklog[i] - minValue) / (maxValue - minValue)) * chartHeight;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw dots for total backlog
    ctx.fillStyle = "#3b82f6";
    for (let i = 0; i < backlog.length; i++) {
      const x = padding + (chartWidth / (backlog.length - 1)) * i;
      const y = height - padding - ((backlog[i] - minValue) / (maxValue - minValue)) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw dots for new backlog
    ctx.fillStyle = "#10b981";
    for (let i = 0; i < newBacklog.length; i++) {
      const x = padding + (chartWidth / (newBacklog.length - 1)) * i;
      const y = height - padding - ((newBacklog[i] - minValue) / (maxValue - minValue)) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw X-axis labels
    ctx.fillStyle = "#9ca3af";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "center";
    for (let i = 0; i < quarters.length; i++) {
      const x = padding + (chartWidth / (quarters.length - 1)) * i;
      ctx.fillText(quarters[i], x, height - 15);
    }

    // Draw year separator lines
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    // Separator between 2023 and 2024
    const separatorX = padding + (chartWidth / (quarters.length - 1)) * 3.5;
    ctx.beginPath();
    ctx.moveTo(separatorX, padding);
    ctx.lineTo(separatorX, height - padding);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw year labels
    ctx.fillStyle = "#6b7280";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("2023", padding + (chartWidth / (quarters.length - 1)) * 1.75, padding - 10);
    ctx.fillText("2024", padding + (chartWidth / (quarters.length - 1)) * 5.75, padding - 10);

    // Draw legend
    const legendY = 20;
    
    // Total backlog legend
    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(width - 150, legendY, 15, 15);
    ctx.fillStyle = "#374151";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Total Backlog", width - 130, legendY + 12);

    // New backlog legend
    ctx.fillStyle = "#10b981";
    ctx.fillRect(width - 150, legendY + 25, 15, 15);
    ctx.fillStyle = "#374151";
    ctx.fillText("New Backlog", width - 130, legendY + 37);

    // Draw current values
    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`Current: $${backlog[backlog.length - 1]}K`, padding, padding - 10);
    ctx.fillText(`New: $${newBacklog[newBacklog.length - 1]}K`, padding + 120, padding - 10);
  }, []);

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900">Backlog Analysis</CardTitle>
            <CardDescription className="text-gray-500">
              Total and new backlog trends over time
            </CardDescription>
            <p className="text-xs text-green-600 font-semibold mt-1">
              Reduction: -27.1% from Q1 2023
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