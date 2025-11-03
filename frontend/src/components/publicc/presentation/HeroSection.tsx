import { Button } from "@/components/ui/button";
import { Eye, LogIn, BarChart3 } from "lucide-react";
import "./animations.css";

const DASHBOARD_TITLE = "Business Intelligence Dashboard";
const DASHBOARD_DESCRIPTION =
  "Real-time insights and analytics for informed decision-making";

interface HeroSectionProps {
  onLogin: () => void;
}

export function HeroSection({ onLogin }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Full Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("/wallpaper.jpg")`,
        }}
      >
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        {/* Additional gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-purple-900/40" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Logo at top left */}
        <div className="absolute top-8 left-8 animate-fade-in-up">
          <img
            src="/tkc-logo.svg"
            alt="TKC Logo"
            className="w-32 h-32 filter brightness-0 invert"
          />
        </div>

        <div className="text-center max-w-5xl mx-auto">
          {/* Title with better contrast */}
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 animate-fade-in-up delay-100 drop-shadow-2xl">
            {DASHBOARD_TITLE}
          </h1>

          {/* Description with better contrast */}
          <p className="text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-200 drop-shadow-lg">
            {DASHBOARD_DESCRIPTION}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 animate-fade-in-up delay-300">
            <div className="flex items-center text-white/90 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 shadow-lg">
              <Eye className="w-5 h-5 mr-2" />
              Public View
            </div>
            <Button
              onClick={onLogin}
              className="flex items-center text-white/90 bg-white/10 backdrop-blur-md px-6 py-6 rounded-full border border-white/30 shadow-lg"
            >
              <LogIn className="w-5 h-5 mr-6" />
              <span>Admin Login</span>
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
            </div>
            <p className="text-white/60 text-sm mt-2">Scroll to explore</p>
          </div>
        </div>
      </div>
    </div>
  );
}
