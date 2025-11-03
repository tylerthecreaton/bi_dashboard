// React & Router
import { useNavigate } from "react-router-dom";

// Components
import {
  HeroSection,
  WelcomeSection,
  FiltersSection,
  KeyMetricsSection,
  ChartsSection,
  Footer,
  SectionNavigation,
} from "@/components/publicc/presentation";
import { type FilterState } from "@/components/publicc/ChartFilters";

// Utilities
import { toast } from "sonner";

export function PublicPresentationPage() {
  const navigate = useNavigate();

  const handleExport = () => {
    toast.success("Export data successfully");
  };

  const handleFiltersChange = (filters: FilterState) => {
    console.log("Filters changed:", filters);
    // Here you would typically apply filters to your data
    // and trigger a re-render of the charts
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      <HeroSection onLogin={handleLogin} />
      <main className="relative min-h-screen">
        {/* Background image for main content */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("/wallpaper_2.jpg")`,
          }}
        >
          {/* Dark overlay for main content */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

          {/* Color gradient overlay for visual appeal */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 via-transparent to-purple-900/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <WelcomeSection />
          <FiltersSection onFiltersChange={handleFiltersChange} />
          <KeyMetricsSection />
          <ChartsSection />
          <Footer />
        </div>

        {/* Section Navigation */}
        <SectionNavigation />
      </main>
    </div>
  );
}
