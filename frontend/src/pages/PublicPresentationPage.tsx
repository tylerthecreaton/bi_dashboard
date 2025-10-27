import { Layout } from "@/components/layout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueVsTargetChart } from "@/components/charts/RevenueVsTargetChart";
import { RevenueByBusinessTypeChart } from "@/components/charts/RevenueByBusinessTypeChart";
import { GrossProfitYearlyChart } from "@/components/charts/GrossProfitYearlyChart";
import { GrossProfitQuarterlyChart } from "@/components/charts/GrossProfitQuarterlyChart";
import { ToplineBottomlineChart } from "@/components/charts/ToplineBottomlineChart";
import { NetProfitYearlyChart } from "@/components/charts/NetProfitYearlyChart";
import { NetProfitQuarterlyChart } from "@/components/charts/NetProfitQuarterlyChart";
import { RevenueGrossMarginChart } from "@/components/charts/RevenueGrossMarginChart";
import { RevenueByQuarterChart } from "@/components/charts/RevenueByQuarterChart";
import { FinancialRatioChart } from "@/components/charts/FinancialRatioChart";
import { BacklogChart } from "@/components/charts/BacklogChart";
import { ChartFilters, type FilterState } from "@/components/charts/ChartFilters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, DollarSign, Target, PieChart } from "lucide-react";
import { toast } from "sonner";

export function PublicPresentationPage() {
  const handleExport = () => {
    toast.success("Export data successfully");
  };

  const handleFiltersChange = (filters: FilterState) => {
    console.log("Filters changed:", filters);
    // Here you would typically apply filters to your data
    // and trigger a re-render of the charts
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <DashboardHeader onExport={handleExport} title="Public Presentation Dashboard" />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <ChartFilters onFiltersChange={handleFiltersChange} className="mb-8" />
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

          {/* Charts Section */}
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
        </main>
      </div>
    </Layout>
  );
}