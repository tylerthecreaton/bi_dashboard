import { LogIn } from "lucide-react";
import CardNav from "@/components/CardNav";
import type { CardNavItem } from "@/components/CardNav";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const DASHBOARD_TITLE = "Business Intelligence Dashboard";
const DASHBOARD_DESCRIPTION =
  "Real-time insights and analytics for informed decision-making";

interface HeroSectionProps {
  onLogin: () => void;
}

export function HeroSection({ onLogin }: HeroSectionProps) {

  const navItems: CardNavItem[] = [
    {
      label: "Dashboard",
      bgColor: "#0D0716",
      textColor: "#ffffff",
      links: [
        {
          label: "View Dashboard",
          href: "/dashboard-view",
          ariaLabel: "Navigate to Dashboard",
        },
      ],
    },
    {
      label: "Analytics",
      bgColor: "#170D27",
      textColor: "#ffffff",
      links: [
        {
          label: "View Analytics",
          href: "/analytics-view",
          ariaLabel: "Navigate to Analytics",
        },
      ],
    },
    {
      label: "Reports",
      bgColor: "#271E37",
      textColor: "#ffffff",
      links: [
        {
          label: "View Reports",
          href: "/reports-view",
          ariaLabel: "Navigate to Reports",
        },
      ],
    },
  ];

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
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-cyan-900/40" />
      </div>

      <div className="relative min-h-screen">
        {/* Admin Login Button - Top Right */}
        <div className="absolute top-9 right-4 z-10 animate-fade-in-up delay-300">
          <ShimmerButton
            onClick={onLogin}
            shimmerColor="#60a5fa"
            shimmerSize="0.1em"
            shimmerDuration="2s"
            borderRadius="0.5rem"
            background="rgba(30, 58, 138, 0.3)"
            className="backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 text-white font-medium"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Admin Login
          </ShimmerButton>
        </div>

        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          {/* Card Navigation */}
          <CardNav
            logo="/tkc-logo.svg"
            logoAlt="TKC Logo"
            items={navItems}
            baseColor="rgba(255, 255, 255, 0.1)"
            menuColor="#ffffff"
            buttonBgColor="rgba(255, 255, 255, 0.2)"
            buttonTextColor="#ffffff"
          />

          <div className="text-center max-w-5xl mx-auto">
            {/* Title with better contrast */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 animate-fade-in-up delay-100 drop-shadow-2xl">
              {DASHBOARD_TITLE}
            </h1>

            {/* Description with better contrast */}
            <p className="text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-200 drop-shadow-lg">
              {DASHBOARD_DESCRIPTION}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
