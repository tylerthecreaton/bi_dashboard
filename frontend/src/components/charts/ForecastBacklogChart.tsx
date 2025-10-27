import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";

export function ForecastBacklogChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    // Sample data - Forecast Backlog by quarter
    const quarters = ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024", "Q1 2025", "Q2 2025"];
    const actualBacklog = [7200, 6800, 6500, 6200, null, null];
    const forecastBacklog = [null, null, null, 6200, 5800, 5500];
    const newProjects = [850, 750, 700, 650, 600, 550];

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const maxValue = Math.max(...actualBacklog.filter((v): v is number => v !== null), ...forecastBacklog.filter((v): v is number => v !== null));
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

    // Draw forecast area (lighter shade)
    ctx.fillStyle = "rgba(156, 163, 175, 0.1)";
    ctx.beginPath();
    ctx.moveTo(padding + (chartWidth / (forecastBacklog.length - 1)) * 3, height - padding);

    for (let i = 3; i < forecastBacklog.length; i++) {
      const x = padding + (chartWidth / (forecastBacklog.length - 1)) * i;
      const y = height - padding - (((forecastBacklog[i] || 0) - minValue) / (maxValue - minValue)) * chartHeight;
      if (i === 3) {
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fill();

    // Draw actual backlog line
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let i = 0; i < actualBacklog.length; i++) {
      if (actualBacklog[i] === null) continue;
      const x = padding + (chartWidth / (actualBacklog.length - 1)) * i;
      const y = height - padding - (((actualBacklog[i] || 0) - minValue) / (maxValue - minValue)) * chartHeight;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw forecast backlog line (dashed)
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();

    for (let i = 3; i < forecastBacklog.length; i++) {
      const x = padding + (chartWidth / (forecastBacklog.length - 1)) * i;
      const y = height - padding - ((forecastBacklog[i] - minValue) / (maxValue - minValue)) * chartHeight;
      if (i === 3) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw new projects bars
    const barWidth = chartWidth / (newProjects.length * 2);
    newProjects.forEach((value, index) => {
      if (value === null) return;
      const barHeight = (value / maxValue) * chartHeight * 0.3; // Scale down to not overlap
      const x = padding + (chartWidth / (newProjects.length - 1)) * index - barWidth / 2;
      const y = height - padding - barHeight;
      
      ctx.fillStyle = "rgba(16, 185, 129, 0.7)";
      ctx.fillRect(x, y, barWidth, barHeight);
    });

    // Draw dots for actual backlog
    ctx.fillStyle = "#3b82f6";
    for (let i = 0; i < actualBacklog.length; i++) {
      if (actualBacklog[i] === null) continue;
      const x = padding + (chartWidth / (actualBacklog.length - 1)) * i;
      const y = height - padding - (((actualBacklog[i] || 0) - minValue) / (maxValue - minValue)) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw dots for forecast backlog
    ctx.fillStyle = "#9ca3af";
    for (let i = 3; i < forecastBacklog.length; i++) {
      const x = padding + (chartWidth / (forecastBacklog.length - 1)) * i;
      const y = height - padding - (((forecastBacklog[i] || 0) - minValue) / (maxValue - minValue)) * chartHeight;
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

    // Draw forecast separator line
    const separatorX = padding + (chartWidth / (quarters.length - 1)) * 3.5;
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(separatorX, padding);
    ctx.lineTo(separatorX, height - padding);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw forecast label
    ctx.fillStyle = "#ef4444";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("FORECAST", separatorX + 50, padding + 15);

    // Draw legend
    const legendY = 20;
    
    // Actual backlog legend
    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(width - 150, legendY, 15, 15);
    ctx.fillStyle = "#374151";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Actual Backlog", width - 130, legendY + 12);

    // Forecast backlog legend
    ctx.fillStyle = "#9ca3af";
    ctx.fillRect(width - 150, legendY + 25, 15, 15);
    ctx.fillStyle = "#374151";
    ctx.fillText("Forecast Backlog", width - 130, legendY + 37);

    // New projects legend
    ctx.fillStyle = "rgba(16, 185, 129, 0.7)";
    ctx.fillRect(width - 150, legendY + 50, 15, 15);
    ctx.fillStyle = "#374151";
    ctx.fillText("New Projects", width - 130, legendY + 62);

    // Draw current and forecast values
    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`Current: $${actualBacklog[3]}K`, padding, padding - 10);
    ctx.fillText(`Q2 2025: $${forecastBacklog[5]}K`, padding + 120, padding - 10);
  }, []);

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900">Forecast Backlog Analysis</CardTitle>
            <CardDescription className="text-gray-500">
              Actual and forecast backlog trends with new projects
            </CardDescription>
            <p className="text-xs text-green-600 font-semibold mt-1">
              Expected reduction: -11.3% by Q2 2025
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