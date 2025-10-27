import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DashboardHeaderProps {
  onExport?: () => void;
  title?: string;
}

export function DashboardHeader({ onExport, title }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {title || "Welcome Back, Ann"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Monitor every activity of your sales performance
            </p>
          </div>
          <Button
            onClick={onExport}
            variant="outline"
            className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>
    </header>
  );
}
