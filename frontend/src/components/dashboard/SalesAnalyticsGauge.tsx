import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef } from "react";

export function SalesAnalyticsGauge() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;

    // Draw background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Draw gauge background (gray)
    ctx.strokeStyle = "#f3f4f6";
    ctx.lineWidth = 30;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, Math.PI * 2);
    ctx.stroke();

    // Draw gauge value (blue) - 72%
    const percentage = 0.72;
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 30;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, Math.PI + Math.PI * percentage);
    ctx.stroke();

    // Draw center circle
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 40, 0, Math.PI * 2);
    ctx.fill();

    // Draw percentage text
    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 48px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("72%", centerX, centerY);

    // Draw label
    ctx.fillStyle = "#9ca3af";
    ctx.font = "14px sans-serif";
    ctx.fillText("Sales Percentage", centerX, centerY + 40);

    // Draw tick marks
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 2;
    for (let i = 0; i <= 10; i++) {
      const angle = Math.PI + (Math.PI / 10) * i;
      const x1 = centerX + Math.cos(angle) * (radius + 5);
      const y1 = centerY + Math.sin(angle) * (radius + 5);
      const x2 = centerX + Math.cos(angle) * (radius + 15);
      const y2 = centerY + Math.sin(angle) * (radius + 15);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }, []);

  return (
    <Card className="border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-gray-900">Sales Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <canvas ref={canvasRef} className="w-full" />
      </CardContent>
    </Card>
  );
}
