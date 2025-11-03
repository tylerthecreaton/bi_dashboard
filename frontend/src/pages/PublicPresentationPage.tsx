import { StatCard } from "@/components/publicc/StatCard";
import { RevenueVsTargetChart } from "@/components/publicc/RevenueVsTargetChart";
import { RevenueByBusinessTypeChart } from "@/components/publicc/RevenueByBusinessTypeChart";
import { GrossProfitYearlyChart } from "@/components/publicc/GrossProfitYearlyChart";
import { GrossProfitQuarterlyChart } from "@/components/publicc/GrossProfitQuarterlyChart";
import { ToplineBottomlineChart } from "@/components/publicc/ToplineBottomlineChart";
import { NetProfitYearlyChart } from "@/components/publicc/NetProfitYearlyChart";
import { NetProfitQuarterlyChart } from "@/components/publicc/NetProfitQuarterlyChart";
import { RevenueGrossMarginChart } from "@/components/publicc/RevenueGrossMarginChart";
import { RevenueByQuarterChart } from "@/components/publicc/RevenueByQuarterChart";
import { FinancialRatioChart } from "@/components/publicc/FinancialRatioChart";
import { BacklogChart } from "@/components/publicc/BacklogChart";
import {
  ChartFilters,
  type FilterState,
} from "@/components/publicc/ChartFilters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  DollarSign,
  Target,
  PieChart,
  BarChart3,
  Eye,
  LogIn,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img
                src="/wallpaper.jpg"
                alt="Business Intelligence Dashboard"
                className="w-32 h-32 object-cover rounded-lg shadow-lg"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Business Intelligence Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Real-time insights and analytics for informed decision-making
            </p>
            <div className="flex justify-center items-center space-x-6">
              <div className="flex items-center text-sm text-gray-500">
                <Eye className="w-4 h-4 mr-1" />
                Public View
              </div>
              <Button
                onClick={handleLogin}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
              >
                <LogIn className="w-4 h-4" />
                <span>Admin Login</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to Our Analytics Dashboard
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Explore our comprehensive business metrics and performance
            indicators. This dashboard provides real-time insights into revenue,
            profit margins, and key business analytics. Use the filters below to
            customize your view and focus on the data that matters most to you.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Filter Data
          </h3>
          <ChartFilters onFiltersChange={handleFiltersChange} />
        </div>

        {/* Key Metrics */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-6">
            Key Performance Indicators
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Overall Revenue YTD"
              value="$12.5M"
              change={8.2}
              trend="up"
              icon={<DollarSign className="w-6 h-6 text-green-600" />}
            />
            <StatCard
              title="Revenue Target"
              value="$15.0M"
              change={0}
              trend="up"
              icon={<Target className="w-6 h-6 text-blue-600" />}
            />
            <StatCard
              title="Gross Profit"
              value="$4.2M"
              change={5.7}
              trend="up"
              icon={<TrendingUp className="w-6 h-6 text-green-600" />}
            />
            <StatCard
              title="Net Profit"
              value="$2.1M"
              change={3.4}
              trend="up"
              icon={<PieChart className="w-6 h-6 text-purple-600" />}
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-6">
            Detailed Analytics
          </h3>
          <Tabs defaultValue="revenue" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="profit">Profit</TabsTrigger>
              <TabsTrigger value="business">Business Analysis</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
            </TabsList>

            <TabsContent value="revenue" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueVsTargetChart />
                <RevenueByBusinessTypeChart />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueGrossMarginChart />
                <RevenueByQuarterChart />
              </div>
            </TabsContent>

            <TabsContent value="profit" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GrossProfitYearlyChart />
                <GrossProfitQuarterlyChart />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NetProfitYearlyChart />
                <NetProfitQuarterlyChart />
              </div>
            </TabsContent>

            <TabsContent value="business" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ToplineBottomlineChart />
                <BacklogChart />
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FinancialRatioChart />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2024 Business Intelligence Dashboard</p>
          <p className="mt-2">
            For more detailed analytics, please contact our team.
          </p>
        </div>
      </main>
    </div>
  );
}
