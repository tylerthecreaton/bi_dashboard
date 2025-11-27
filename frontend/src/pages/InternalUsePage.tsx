import { Layout } from "@/components/layout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProjectStatusTable } from "@/components/charts/ProjectStatusTable";
import { GrossProfitByVerticalChart } from "@/components/charts/GrossProfitByVerticalChart";
import { EngineeringProgressChart } from "@/components/charts/EngineeringProgressChart";
import { ForecastBacklogChart } from "@/components/charts/ForecastBacklogChart";
import { CashFlowChart } from "@/components/charts/CashFlowChart";
import { InvoiceVsProgressChart } from "@/components/charts/InvoiceVsProgressChart";
import {
  ChartFilters,
  type FilterState,
} from "@/components/charts/ChartFilters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, DollarSign, Target, Activity } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";

export function InternalUsePage() {
  const handleExport = () => {
    toast.success("ส่งออกข้อมูลสำเร็จ");
  };

  const handleFiltersChange = (filters: FilterState) => {
    console.log("Filters changed:", filters);
    // Here you would typically apply filters to your data
    // and trigger a re-render of the charts
    
    // แสดงข้อความเมื่อมีการเปลี่ยนแปลงตัวกรอง
    if (filters.operations.length > 0 || filters.verticals.length > 0 || filters.businessTypes.length > 0) {
      toast.info(`ใช้ตัวกรอง: ${filters.operations.length + filters.verticals.length + filters.businessTypes.length} รายการ`);
    }
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
        <DashboardHeader
          onExport={handleExport}
          title="แดชบอร์ดสำหรับใช้ภายใน"
        />

        <motion.main
          className="max-w mx-auto px-4 sm:px-6 lg:px-8 py-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Filters */}
          <motion.div variants={item}>
            <ChartFilters
              onFiltersChange={handleFiltersChange}
              className="mb-8"
            />
          </motion.div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div variants={item}>
              <StatCard
                title="โปรเจคที่กำลังดำเนินการ"
                value="24"
                change={3}
                trend="up"
                icon={<Activity className="w-6 h-6 text-blue-600" />}
              />
            </motion.div>
            <motion.div variants={item}>
              <StatCard
                title="กำไรขั้นต้น"
                value="4.2M บาท"
                change={5.7}
                trend="up"
                icon={<DollarSign className="w-6 h-6 text-green-600" />}
              />
            </motion.div>
            <motion.div variants={item}>
              <StatCard
                title="ความคืบหน้างานวิศวกรรม"
                value="68%"
                change={2.1}
                trend="up"
                icon={<Target className="w-6 h-6 text-purple-600" />}
              />
            </motion.div>
            <motion.div variants={item}>
              <StatCard
                title="งานค้างดำเนินการที่คาดการณ์"
                value="8.5M บาท"
                change={-1.2}
                trend="down"
                icon={<TrendingUp className="w-6 h-6 text-red-600" />}
              />
            </motion.div>
          </div>

          {/* Charts Section */}
          <motion.div variants={item}>
            <Tabs defaultValue="projects" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="projects">สถานะโปรเจค</TabsTrigger>
                <TabsTrigger value="financial">ข้อมูลการเงิน</TabsTrigger>
                <TabsTrigger value="progress">ความคืบหน้า</TabsTrigger>
                <TabsTrigger value="cashflow">กระแสเงินสด</TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="space-y-6">
                <ProjectStatusTable />
              </TabsContent>

              <TabsContent value="financial" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <GrossProfitByVerticalChart />
                  <ForecastBacklogChart />
                </div>
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <EngineeringProgressChart />
                  <InvoiceVsProgressChart />
                </div>
              </TabsContent>

              <TabsContent value="cashflow" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                  <CashFlowChart />
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.main>
      </div>
    </Layout>
  );
}
