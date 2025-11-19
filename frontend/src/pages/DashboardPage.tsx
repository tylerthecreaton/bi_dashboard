import { Layout } from "@/components/layout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { SalesAnalyticsGauge } from "@/components/dashboard/SalesAnalyticsGauge";
import { SalesTable } from "@/components/dashboard/SalesTable";
import { DollarSign, ShoppingBag, Activity, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { useNotifications } from "@/contexts/NotificationContext";
import { Button } from "@/components/ui/button";

export function DashboardPage() {
  const { addNotification } = useNotifications();
  const handleExport = () => {
    toast.success("Export data successfully");
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Layout>
      <div className="min-h-screen bg-muted/40">
        <DashboardHeader onExport={handleExport} />

        <motion.main
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="mb-4 flex justify-end">
            <Button
              onClick={() =>
                addNotification({
                  title: "Test Notification",
                  message: "This is a test notification triggered manually.",
                  type: "info",
                })
              }
            >
              Test Notification
            </Button>
          </div>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div variants={item}>
              <StatCard
                title="Total Profit"
                value="$4,127.40"
                change={2.81}
                trend="up"
                icon={<DollarSign className="w-6 h-6 text-green-600" />}
              />
            </motion.div>
            <motion.div variants={item}>
              <StatCard
                title="Avg. Order Value"
                value="$82.24"
                change={2.96}
                trend="up"
                icon={<CreditCard className="w-6 h-6 text-green-600" />}
              />
            </motion.div>
            <motion.div variants={item}>
              <StatCard
                title="Total Orders"
                value="1,702"
                change={-2.61}
                trend="down"
                icon={<ShoppingBag className="w-6 h-6 text-red-600" />}
              />
            </motion.div>
            <motion.div variants={item}>
              <StatCard
                title="Lifetime Value"
                value="$792"
                change={2.14}
                trend="up"
                icon={<Activity className="w-6 h-6 text-green-600" />}
              />
            </motion.div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Sales Chart - Takes 2 columns on xl screens */}
            <motion.div className="xl:col-span-2" variants={item}>
              <SalesChart />
            </motion.div>

            {/* Sales Analytics Gauge - Takes 1 column on xl screens */}
            <motion.div className="xl:col-span-1" variants={item}>
              <SalesAnalyticsGauge />
            </motion.div>
          </div>

          {/* Sales Table - Full width */}
          <motion.div className="mb-8" variants={item}>
            <SalesTable />
          </motion.div>
        </motion.main>
      </div>
    </Layout>
  );
}
