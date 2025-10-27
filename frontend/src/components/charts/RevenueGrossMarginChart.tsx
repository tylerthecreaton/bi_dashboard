import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";

export function RevenueGrossMarginChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    // Sample data for New Business Breakdown (Pie Chart)
    const data = [
      { label: "Core Business", value: 65, color: "#3b82f6" },
      { label: "New Business", value: 25, color: "#10b981" },
      { label: "JV", value: 10, color: "#f59e0b" }
    ];

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 60;

    // Draw background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Calculate total and angles
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -Math.PI / 2; // Start from top

    // Draw pie slices
    data.forEach((item) => {
      const sliceAngle = (item.value / total) * Math.PI * 2;
      
      // Draw slice
      ctx.fillStyle = item.color;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();
      
      // Draw border
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw percentage label
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
      
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${item.value}%`, labelX, labelY);
      
      currentAngle += sliceAngle;
    });

    // Draw legend
    const legendX = 20;
    let legendY = 20;
    
    data.forEach((item) => {
      // Color box
      ctx.fillStyle = item.color;
      ctx.fillRect(legendX, legendY, 15, 15);
      
      // Label
      ctx.fillStyle = "#374151";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`${item.label}: ${item.value}%`, legendX + 20, legendY + 12);
      
      legendY += 25;
    });

    // Draw title
    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("New Business Breakdown", centerX, height - 20);
  }, []);

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900">Revenue & Gross Margin by Business Type</CardTitle>
            <CardDescription className="text-gray-500">
              Core, New Business, and JV breakdown
            </CardDescription>
            <p className="text-xs text-green-600 font-semibold mt-1">
              Total Revenue: $15.2M | Gross Margin: 42%
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