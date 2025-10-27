import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";

export function CashFlowChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    // Sample data - Cash Flow by month
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const cashIn = [3200, 3500, 3100, 3800, 4200, 3900, 4500, 4100, 4400, 4700, 4600, 4900];
    const cashOut = [2800, 2900, 2700, 3100, 3300, 3200, 3500, 3400, 3600, 3800, 3700, 3900];

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const maxValue = Math.max(...cashIn, ...cashOut);
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

    // Draw zero line (important for cash flow)
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw Y-axis labels
    ctx.fillStyle = "#9ca3af";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxValue / 5) * (5 - i));
      const y = padding + (chartHeight / 5) * i + 4;
      ctx.fillText(`$${value}K`, padding - 10, y);
    }

    // Draw cash in area
    ctx.fillStyle = "rgba(16, 185, 129, 0.1)";
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);

    for (let i = 0; i < cashIn.length; i++) {
      const x = padding + (chartWidth / (cashIn.length - 1)) * i;
      const y = height - padding - ((cashIn[i] - minValue) / (maxValue - minValue)) * chartHeight;
      if (i === 0) {
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fill();

    // Draw cash out area
    ctx.fillStyle = "rgba(239, 68, 68, 0.1)";
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);

    for (let i = 0; i < cashOut.length; i++) {
      const x = padding + (chartWidth / (cashOut.length - 1)) * i;
      const y = height - padding - ((cashOut[i] - minValue) / (maxValue - minValue)) * chartHeight;
      if (i === 0) {
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fill();

    // Draw cash in line
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let i = 0; i < cashIn.length; i++) {
      const x = padding + (chartWidth / (cashIn.length - 1)) * i;
      const y = height - padding - ((cashIn[i] - minValue) / (maxValue - minValue)) * chartHeight;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw cash out line
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let i = 0; i < cashOut.length; i++) {
      const x = padding + (chartWidth / (cashOut.length - 1)) * i;
      const y = height - padding - ((cashOut[i] - minValue) / (maxValue - minValue)) * chartHeight;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw dots for cash in
    ctx.fillStyle = "#10b981";
    for (let i = 0; i < cashIn.length; i++) {
      const x = padding + (chartWidth / (cashIn.length - 1)) * i;
      const y = height - padding - ((cashIn[i] - minValue) / (maxValue - minValue)) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw dots for cash out
    ctx.fillStyle = "#ef4444";
    for (let i = 0; i < cashOut.length; i++) {
      const x = padding + (chartWidth / (cashOut.length - 1)) * i;
      const y = height - padding - ((cashOut[i] - minValue) / (maxValue - minValue)) * chartHeight;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw X-axis labels
    ctx.fillStyle = "#9ca3af";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    for (let i = 0; i < months.length; i++) {
      const x = padding + (chartWidth / (months.length - 1)) * i;
      ctx.fillText(months[i], x, height - 15);
    }

    // Draw net cash flow indicators (positive/negative areas between lines)
    for (let i = 0; i < months.length - 1; i++) {
      const x1 = padding + (chartWidth / (months.length - 1)) * i;
      const x2 = padding + (chartWidth / (months.length - 1)) * (i + 1);
      const y1_in = height - padding - ((cashIn[i] - minValue) / (maxValue - minValue)) * chartHeight;
      const y2_in = height - padding - ((cashIn[i + 1] - minValue) / (maxValue - minValue)) * chartHeight;
      const y1_out = height - padding - ((cashOut[i] - minValue) / (maxValue - minValue)) * chartHeight;
      const y2_out = height - padding - ((cashOut[i + 1] - minValue) / (maxValue - minValue)) * chartHeight;

      // Calculate net flow area
      const netFlow = cashIn[i] - cashOut[i];
      const netColor = netFlow >= 0 ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)";
      
      ctx.fillStyle = netColor;
      ctx.beginPath();
      ctx.moveTo(x1, y1_in);
      ctx.lineTo(x2, y2_in);
      ctx.lineTo(x2, y2_out);
      ctx.lineTo(x1, y1_out);
      ctx.closePath();
      ctx.fill();
    }

    // Draw legend
    const legendY = 20;
    
    // Cash in legend
    ctx.fillStyle = "#10b981";
    ctx.fillRect(width - 150, legendY, 15, 15);
    ctx.fillStyle = "#374151";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Cash In", width - 130, legendY + 12);

    // Cash out legend
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(width - 150, legendY + 25, 15, 15);
    ctx.fillStyle = "#374151";
    ctx.fillText("Cash Out", width - 130, legendY + 37);

    // Net flow legend
    ctx.fillStyle = "#6b7280";
    ctx.fillRect(width - 150, legendY + 50, 15, 15);
    ctx.fillStyle = "#374151";
    ctx.fillText("Net Flow", width - 130, legendY + 62);

    // Draw current values
    const currentCashIn = cashIn[cashIn.length - 1];
    const currentCashOut = cashOut[cashOut.length - 1];
    const netFlow = currentCashIn - currentCashOut;
    
    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`Cash In: $${currentCashIn}K`, padding, padding - 10);
    ctx.fillText(`Cash Out: $${currentCashOut}K`, padding + 120, padding - 10);
    ctx.fillStyle = netFlow >= 0 ? "#10b981" : "#ef4444";
    ctx.fillText(`Net: $${netFlow}K`, padding + 240, padding - 10);
  }, []);

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900">Cash Flow Analysis</CardTitle>
            <CardDescription className="text-gray-500">
              Monthly cash in and cash out trends
            </CardDescription>
            <p className="text-xs text-green-600 font-semibold mt-1">
              Positive cash flow: $1,000K this month
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