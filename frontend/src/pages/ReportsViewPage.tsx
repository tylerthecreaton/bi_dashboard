import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { toast } from "sonner";

export function ReportsViewPage() {
  const navigate = useNavigate();

  const handleExport = () => {
    toast.success("Report exported successfully");
  };

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
              <FileText className="w-6 h-6 mr-2" />
              <h1 className="text-xl font-semibold">Reports View</h1>
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
          <div className="absolute inset-0 bg-gradient-to-t from-orange-900/50 via-transparent to-red-900/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Title Section */}
          <section className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Reports & Documentation
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Comprehensive reports and documentation for your business
              intelligence
            </p>
          </section>

          {/* Available Reports Section */}
          <section className="mb-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-8 text-center">
                Available Reports
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-colors">
                  <FileText className="w-8 h-8 text-white mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">
                    Monthly Report
                  </h4>
                  <p className="text-white/70 mb-4">
                    Detailed monthly performance metrics
                  </p>
                  <Button onClick={handleExport} className="w-full">
                    Download Report
                  </Button>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-colors">
                  <FileText className="w-8 h-8 text-white mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">
                    Quarterly Analysis
                  </h4>
                  <p className="text-white/70 mb-4">
                    Comprehensive quarterly business analysis
                  </p>
                  <Button onClick={handleExport} className="w-full">
                    Download Report
                  </Button>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-colors">
                  <FileText className="w-8 h-8 text-white mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">
                    Annual Summary
                  </h4>
                  <p className="text-white/70 mb-4">
                    Year-end performance summary and insights
                  </p>
                  <Button onClick={handleExport} className="w-full">
                    Download Report
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Reports Section */}
          <section>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Recent Reports
              </h3>
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/50">
                  No recent reports available. Generated reports will appear
                  here.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
