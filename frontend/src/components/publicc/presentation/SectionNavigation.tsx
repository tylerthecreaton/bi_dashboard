import { useState, useEffect } from "react";
import { 
  Home, 
  Filter, 
  BarChart3, 
  LineChart, 
  Info 
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: "welcome",
    label: "Welcome",
    icon: <Home className="w-4 h-4" />,
  },
  {
    id: "filters",
    label: "Filters",
    icon: <Filter className="w-4 h-4" />,
  },
  {
    id: "metrics",
    label: "Metrics",
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    id: "charts",
    label: "Charts",
    icon: <LineChart className="w-4 h-4" />,
  },
  {
    id: "footer",
    label: "Contact",
    icon: <Info className="w-4 h-4" />,
  },
];

interface SectionNavigationProps {
  className?: string;
}

export function SectionNavigation({ className = "" }: SectionNavigationProps) {
  const [activeSection, setActiveSection] = useState("welcome");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className={`fixed top-1/2 right-8 transform -translate-y-1/2 z-50 ${className}`}>
      <div className="relative bg-black/20 backdrop-blur-md rounded-full p-4 border border-white/10 shadow-2xl">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] rounded-full" />
        
        <div className="relative z-10 flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`
                group relative flex items-center justify-center w-12 h-12 rounded-full 
                transition-all duration-300 hover:scale-110
                ${
                  activeSection === item.id
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }
              `}
              title={item.label}
            >
              {/* Tooltip */}
              <div className="absolute right-full mr-3 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {item.label}
              </div>
              
              {/* Active indicator */}
              {activeSection === item.id && (
                <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" />
              )}
              
              {item.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
