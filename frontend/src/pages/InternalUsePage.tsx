import { Layout } from "@/components/layout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProjectStatusTable } from "@/components/charts/ProjectStatusTable";
import { GrossProfitByVerticalChart } from "@/components/charts/GrossProfitByVerticalChart";
import { EngineeringProgressChart } from "@/components/charts/EngineeringProgressChart";
import { ForecastBacklogChart } from "@/components/charts/ForecastBacklogChart";
import { CashFlowChart } from "@/components/charts/CashFlowChart";
import { InvoiceVsProgressChart } from "@/components/charts/InvoiceVsProgressChart";
import { ChartFilters, type FilterState } from "@/components/charts/ChartFilters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, DollarSign, Target, PieChart, Activity } from "lucide-react";
import { toast } from "sonner";

export function InternalUsePage() {
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
        <DashboardHeader onExport={handleExport} title="Internal Use Dashboard" />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <ChartFilters onFiltersChange={handleFiltersChange} className="mb-8" />
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Active Projects"
              value="24"
              change={3}
              trend="up"
              icon={<Activity className="w-6 h-6 text-blue-600" />}
            />
            <StatCard
              title="Gross Profit"
              value="$4.2M"
              change={5.7}
              trend="up"
              icon={<DollarSign className="w-6 h-6 text-green-600" />}
            />
            <StatCard
              title="Engineering Progress"
              value="68%"
              change={2.1}
              trend="up"
              icon={<Target className="w-6 h-6 text-purple-600" />}
            />
            <StatCard
              title="Forecast Backlog"
              value="$8.5M"
              change={-1.2}
              trend="down"
              icon={<TrendingUp className="w-6 h-6 text-red-600" />}
            />
          </div>

          {/* Charts Section */}
          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              <ProjectStatusTable />
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GrossProfitByVerticalChart />
                <CashFlowChart />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ForecastBacklogChart />
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EngineeringProgressChart />
                <InvoiceVsProgressChart />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </Layout>
  );
}