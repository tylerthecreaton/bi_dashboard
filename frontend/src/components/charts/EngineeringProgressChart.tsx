import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";

export function EngineeringProgressChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    // Sample data - Engineering Progress by department
    const departments = [
      { name: "Infrastructure", progress: 85, target: 90, color: "#3b82f6" },
      { name: "Software Dev", progress: 72, target: 80, color: "#10b981" },
      { name: "QA Testing", progress: 68, target: 75, color: "#f59e0b" },
      { name: "DevOps", progress: 78, target: 85, color: "#8b5cf6" },
      { name: "Security", progress: 92, target: 95, color: "#ef4444" },
      { name: "Data Analytics", progress: 65, target: 70, color: "#06b6d4" }
    ];

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartHeight = height - padding * 2;

    // Draw background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Calculate bar dimensions
    const barHeight = chartHeight / (departments.length * 2);
    const barWidth = width - padding * 2 - 100; // Leave space for labels

    // Draw title
    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Engineering Progress by Department", width / 2, 25);

    // Draw progress bars
    departments.forEach((dept, index) => {
      const y = padding + (index * barHeight * 1.5);
      const x = padding + 100; // Leave space for department names

      // Draw department name
      ctx.fillStyle = "#374151";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(dept.name, x - 10, y + barHeight / 2 + 4);

      // Draw background bar (target)
      ctx.fillStyle = "#f3f4f6";
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw progress bar
      const progressWidth = (dept.progress / 100) * barWidth;
      const gradient = ctx.createLinearGradient(x, 0, x + progressWidth, 0);
      gradient.addColorStop(0, dept.color);
      gradient.addColorStop(1, dept.color + "cc");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, progressWidth, barHeight);

      // Draw target line
      const targetX = x + (dept.target / 100) * barWidth;
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(targetX, y);
      ctx.lineTo(targetX, y + barHeight);
      ctx.stroke();

      // Draw progress percentage
      ctx.fillStyle = "#1f2937";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`${dept.progress}%`, x + barWidth + 10, y + barHeight / 2 + 4);

      // Draw status indicator
      let status = "On Track";
      let statusColor = "#10b981";
      
      if (dept.progress < dept.target * 0.8) {
        status = "Behind";
        statusColor = "#ef4444";
      } else if (dept.progress < dept.target * 0.95) {
        status = "At Risk";
        statusColor = "#f59e0b";
      }

      ctx.fillStyle = statusColor;
      ctx.font = "10px sans-serif";
      ctx.fillText(status, x + barWidth + 50, y + barHeight / 2 + 4);
    });

    // Draw overall progress
    const overallProgress = departments.reduce((sum, dept) => sum + dept.progress, 0) / departments.length;
    const overallTarget = departments.reduce((sum, dept) => sum + dept.target, 0) / departments.length;

    // Draw overall progress gauge
    const gaugeX = width - 120;
    const gaugeY = height - 80;
    const gaugeRadius = 40;

    // Draw gauge background
    ctx.strokeStyle = "#f3f4f6";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(gaugeX, gaugeY, gaugeRadius, Math.PI, Math.PI * 2);
    ctx.stroke();

    // Draw gauge progress
    const gaugeProgress = overallProgress / 100;
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(gaugeX, gaugeY, gaugeRadius, Math.PI, Math.PI + Math.PI * gaugeProgress);
    ctx.stroke();

    // Draw gauge text
    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${Math.round(overallProgress)}%`, gaugeX, gaugeY + 5);

    ctx.fillStyle = "#6b7280";
    ctx.font = "10px sans-serif";
    ctx.fillText("Overall", gaugeX, gaugeY + 20);

    // Draw legend
    const legendY = height - 25;
    ctx.fillStyle = "#6b7280";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Red line indicates target", padding, legendY);
  }, []);

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900">Engineering Progress Overview</CardTitle>
            <CardDescription className="text-gray-500">
              Progress by department with target indicators
            </CardDescription>
            <p className="text-xs text-blue-600 font-semibold mt-1">
              Overall Progress: 77% | Target: 82%
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