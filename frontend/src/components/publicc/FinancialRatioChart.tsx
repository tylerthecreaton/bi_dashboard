import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";

export function FinancialRatioChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    // Sample data for Financial Ratios
    const ratios = [
      { name: "ROA", value: 0.12, target: 0.15, unit: "%", color: "#3b82f6" },
      { name: "ROE", value: 0.18, target: 0.20, unit: "%", color: "#10b981" },
      { name: "D/E", value: 0.65, target: 0.70, unit: "", color: "#f59e0b" }
    ];

    const width = canvas.width;
    const height = canvas.height;
    const gaugeWidth = width / ratios.length;
    const gaugeHeight = height - 80;
    const gaugeRadius = Math.min(gaugeWidth, gaugeHeight) / 2 - 20;

    // Draw background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Draw each gauge
    ratios.forEach((ratio, index) => {
      const centerX = gaugeWidth * index + gaugeWidth / 2;
      const centerY = height / 2 - 20;

      // Draw gauge background (gray)
      ctx.strokeStyle = "#f3f4f6";
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.arc(centerX, centerY, gaugeRadius, Math.PI * 0.75, Math.PI * 2.25);
      ctx.stroke();

      // Draw gauge value
      const percentage = Math.min(ratio.value / ratio.target, 1); // Cap at 100%
      const endAngle = Math.PI * 0.75 + (Math.PI * 1.5 * percentage);
      
      ctx.strokeStyle = ratio.color;
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.arc(centerX, centerY, gaugeRadius, Math.PI * 0.75, endAngle);
      ctx.stroke();

      // Draw center circle
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(centerX, centerY, gaugeRadius - 30, 0, Math.PI * 2);
      ctx.fill();

      // Draw ratio name
      ctx.fillStyle = "#6b7280";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(ratio.name, centerX, centerY - 10);

      // Draw ratio value
      ctx.fillStyle = "#1f2937";
      ctx.font = "bold 20px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const displayValue = ratio.unit === "%" ? (ratio.value * 100).toFixed(1) : ratio.value.toFixed(2);
      ctx.fillText(`${displayValue}${ratio.unit}`, centerX, centerY + 10);

      // Draw target line
      const targetAngle = Math.PI * 0.75 + (Math.PI * 1.5);
      const targetX = centerX + Math.cos(targetAngle) * (gaugeRadius + 10);
      const targetY = centerY + Math.sin(targetAngle) * (gaugeRadius + 10);
      
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(targetX - 5, targetY - 5);
      ctx.lineTo(targetX + 5, targetY + 5);
      ctx.moveTo(targetX + 5, targetY - 5);
      ctx.lineTo(targetX - 5, targetY + 5);
      ctx.stroke();

      // Draw tick marks
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 10; i++) {
        const angle = Math.PI * 0.75 + (Math.PI * 1.5 / 10) * i;
        const x1 = centerX + Math.cos(angle) * (gaugeRadius + 5);
        const y1 = centerY + Math.sin(angle) * (gaugeRadius + 5);
        const x2 = centerX + Math.cos(angle) * (gaugeRadius + 10);
        const y2 = centerY + Math.sin(angle) * (gaugeRadius + 10);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Draw status indicator
      let status = "Good";
      let statusColor = "#10b981";
      
      if (percentage < 0.7) {
        status = "Needs Improvement";
        statusColor = "#ef4444";
      } else if (percentage < 0.9) {
        status = "Fair";
        statusColor = "#f59e0b";
      }

      ctx.fillStyle = statusColor;
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(status, centerX, centerY + gaugeRadius + 30);
    });

    // Draw title
    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Financial Ratios Overview", width / 2, 25);

    // Draw legend
    const legendY = height - 15;
    ctx.fillStyle = "#6b7280";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Red X indicates target value", width / 2, legendY);
  }, []);

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900">Financial Ratios</CardTitle>
            <CardDescription className="text-gray-500">
              ROA, ROE, and D/E ratios performance
            </CardDescription>
            <p className="text-xs text-blue-600 font-semibold mt-1">
              ROA: 12% | ROE: 18% | D/E: 0.65
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
