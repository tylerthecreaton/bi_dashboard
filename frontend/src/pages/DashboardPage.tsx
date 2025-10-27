import { Layout } from "@/components/layout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { SalesAnalyticsGauge } from "@/components/dashboard/SalesAnalyticsGauge";
import { SalesTable } from "@/components/dashboard/SalesTable";
import { TrendingUp } from "lucide-react";
import { toast } from "sonner";

export function DashboardPage() {
  const handleExport = () => {
    toast.success("Export data successfully");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <DashboardHeader onExport={handleExport} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Profit"
              value="$4,127.40"
              change={2.81}
              trend="up"
              icon={<TrendingUp className="w-6 h-6 text-green-600" />}
            />
            <StatCard
              title="Avg. Order Value"
              value="$82.24"
              change={2.96}
              trend="up"
              icon={<TrendingUp className="w-6 h-6 text-green-600" />}
            />
            <StatCard
              title="Total Orders"
              value="$1,702"
              change={-2.61}
              trend="down"
              icon={<TrendingUp className="w-6 h-6 text-red-600" />}
            />
            <StatCard
              title="Lifetime Value"
              value="$792"
              change={2.14}
              trend="up"
              icon={<TrendingUp className="w-6 h-6 text-green-600" />}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            <SalesChart />
          </div>

          {/* Sales Table */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <SalesTable />
            <SalesAnalyticsGauge />
          </div>
        </main>
      </div>
    </Layout>
  );
}
