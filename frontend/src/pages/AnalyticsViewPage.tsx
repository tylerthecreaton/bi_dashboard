import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { ChartsSection } from "@/components/publicc/presentation/ChartsSection";

export function AnalyticsViewPage() {
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
              <TrendingUp className="w-6 h-6 mr-2" />
              <h1 className="text-xl font-semibold">Analytics View</h1>
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
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 via-transparent to-blue-900/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Title Section */}
          <section className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Advanced Analytics
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Deep dive into your data with comprehensive analytics and insights
            </p>
          </section>

          {/* Analytics Content Section */}
          <section className="space-y-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Analytics Overview
              </h3>
              <ChartsSection />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
