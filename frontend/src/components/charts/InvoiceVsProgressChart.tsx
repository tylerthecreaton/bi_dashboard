import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";

export function InvoiceVsProgressChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    // Sample data - Invoice Amount vs Engineering Progress
    const projects = [
      { name: "Project A", invoice: 2500, progress: 85, value: 3000 },
      { name: "Project B", invoice: 1800, progress: 60, value: 2500 },
      { name: "Project C", invoice: 3200, progress: 95, value: 3500 },
      { name: "Project D", invoice: 1200, progress: 40, value: 2000 },
      { name: "Project E", invoice: 2800, progress: 75, value: 3200 },
      { name: "Project F", invoice: 900, progress: 25, value: 1500 },
      { name: "Project G", invoice: 2100, progress: 55, value: 2800 },
      { name: "Project H", invoice: 3500, progress: 90, value: 3800 }
    ];

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const maxInvoice = Math.max(...projects.map(p => p.invoice));
    const maxProgress = 100;

    // Calculate chart area
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Draw background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = "#f3f4f6";
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i <= 5; i++) {
      const x = padding + (chartWidth / 5) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Draw X-axis labels (Invoice Amount)
    ctx.fillStyle = "#9ca3af";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxInvoice / 5) * i);
      const x = padding + (chartWidth / 5) * i;
      ctx.fillText(`$${value}K`, x, height - 15);
    }

    // Draw Y-axis labels (Progress %)
    ctx.fillStyle = "#9ca3af";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxProgress / 5) * (5 - i));
      const y = padding + (chartHeight / 5) * i + 4;
      ctx.fillText(`${value}%`, padding - 10, y);
    }

    // Draw ideal correlation line (45-degree line representing perfect alignment)
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, padding);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw project bubbles
    projects.forEach((project, index) => {
      const x = padding + (project.invoice / maxInvoice) * chartWidth;
      const y = height - padding - (project.progress / maxProgress) * chartHeight;
      
      // Calculate bubble size based on project value
      const bubbleRadius = Math.sqrt(project.value / 100) * 2;
      
      // Draw bubble with gradient
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, bubbleRadius);
      
      // Color based on performance (above/below ideal line)
      const idealY = height - padding - (project.invoice / maxInvoice) * chartHeight;
      const isAboveIdeal = y < idealY;
      
      if (isAboveIdeal) {
        gradient.addColorStop(0, "rgba(16, 185, 129, 0.8)");
        gradient.addColorStop(1, "rgba(16, 185, 129, 0.2)");
      } else {
        gradient.addColorStop(0, "rgba(239, 68, 68, 0.8)");
        gradient.addColorStop(1, "rgba(239, 68, 68, 0.2)");
      }
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, bubbleRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw bubble border
      ctx.strokeStyle = isAboveIdeal ? "#10b981" : "#ef4444";
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw project name for larger bubbles
      if (bubbleRadius > 8) {
        ctx.fillStyle = "#1f2937";
        ctx.font = "10px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(project.name, x, y + 3);
      }
    });

    // Draw axis labels
    ctx.fillStyle = "#374151";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Invoice Amount ($K)", width / 2, height - 2);
    
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Engineering Progress (%)", 0, 0);
    ctx.restore();

    // Draw legend
    const legendY = 20;
    
    // Above ideal legend
    ctx.fillStyle = "rgba(16, 185, 129, 0.8)";
    ctx.beginPath();
    ctx.arc(width - 140, legendY + 8, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#374151";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Ahead of Progress", width - 125, legendY + 12);

    // Below ideal legend
    ctx.fillStyle = "rgba(239, 68, 68, 0.8)";
    ctx.beginPath();
    ctx.arc(width - 140, legendY + 28, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#374151";
    ctx.fillText("Behind Progress", width - 125, legendY + 32);

    // Ideal line legend
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(width - 145, legendY + 48);
    ctx.lineTo(width - 125, legendY + 48);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#374151";
    ctx.fillText("Ideal Correlation", width - 120, legendY + 52);

    // Draw correlation info
    const correlation = 0.87; // Sample correlation coefficient
    ctx.fillStyle = "#6b7280";
    ctx.font = "11px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`Correlation: ${correlation}`, padding, padding - 10);
    ctx.fillText("Bubble size = Project Value", padding + 120, padding - 10);
  }, []);

  return (
    <Card className="col-span-full lg:col-span-2 border-gray-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900">Invoice vs Engineering Progress</CardTitle>
            <CardDescription className="text-gray-500">
              Correlation between invoiced amount and project progress
            </CardDescription>
            <p className="text-xs text-green-600 font-semibold mt-1">
              Strong correlation: 0.87
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