import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  BarChart3,
  Home,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeToken } from "@/lib/auth";
import { toast } from "sonner";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    toast.success("ออกจากระบบสำเร็จ");
    navigate("/login");
  };
  
  const menuItems = [
    {
      label: "Dashboard",
      icon: BarChart3,
      href: "/dashboard",
      active: location.pathname === "/dashboard",
    },
    {
      label: "Public Presentation",
      icon: BarChart3,
      href: "/public-presentation",
      active: location.pathname === "/public-presentation",
    },
    {
      label: "Internal Use",
      icon: BarChart3,
      href: "/internal-use",
      active: location.pathname === "/internal-use",
    },
    {
      label: "Home",
      icon: Home,
      href: "/welcome",
      active: location.pathname === "/welcome",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: location.pathname === "/settings",
    },
    {
      label: "Help & Support",
      icon: HelpCircle,
      href: "/help",
      active: location.pathname === "/help",
    },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col shadow-lg`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(0,0,0,0.02) 20px, rgba(0,0,0,0.02) 21px)",
        }}
      >
        {/* Logo/Brand - macOS Window Header Style */}
        <div className="h-10 flex items-center justify-between px-3 border-b border-gray-200 bg-gray-50">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"></div>
              </div>
              <span className="text-xs font-medium text-gray-700 ml-2">
                saletics
              </span>
            </div>
          )}
          {!sidebarOpen && (
            <div className="flex gap-1.5 mx-auto">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"></div>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm ${
                  item.active
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                title={!sidebarOpen ? item.label : ""}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
                {sidebarOpen && item.active && (
                  <span className="ml-auto text-xs">▶</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-gray-200">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full gap-2 text-gray-700 hover:bg-gray-100 border-gray-300 text-sm"
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Appbar - macOS Style */}
        <header className="h-10 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-all duration-200"
          >
            {sidebarOpen ? (
              <X className="w-4 h-4 text-gray-700" />
            ) : (
              <Menu className="w-4 h-4 text-gray-700" />
            )}
          </button>

          <div className="flex items-center gap-3">
            <button className="relative p-1.5 hover:bg-gray-100 rounded-md transition-all duration-200">
              <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs text-gray-600">🔔</span>
              </div>
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="text-right">
                <p className="text-xs font-medium text-gray-900">
                  ann@saletics
                </p>
                <p className="text-xs text-gray-500">admin</p>
              </div>
              <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">AL</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area - macOS Style */}
        <main className="flex-1 overflow-auto bg-white p-4 text-sm">
          {children}
        </main>
      </div>
    </div>
  );
}
