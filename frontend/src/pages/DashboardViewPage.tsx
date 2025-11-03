import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { KeyMetricsSection } from "@/components/publicc/presentation/KeyMetricsSection";
import { ChartsSection } from "@/components/publicc/presentation/ChartsSection";

export function DashboardViewPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center text-white">
              <BarChart3 className="w-6 h-6 mr-2" />
              <h1 className="text-xl font-semibold">Dashboard View</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("/wallpaper_2.jpg")`,
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          {/* Color gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 via-transparent to-purple-900/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <KeyMetricsSection />
          <ChartsSection />
        </div>
      </div>
    </div>
  );
}
