import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export function ChartsSection() {
  return (
    <div 
      id="charts"
      className="relative bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px] rounded-2xl" />

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-8 drop-shadow-lg">
          Detailed Analytics
        </h3>
        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-md border border-white/20">
            <TabsTrigger
              value="revenue"
              className="text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20"
            >
              Revenue
            </TabsTrigger>
            <TabsTrigger
              value="profit"
              className="text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20"
            >
              Profit
            </TabsTrigger>
            <TabsTrigger
              value="business"
              className="text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20"
            >
              Business Analysis
            </TabsTrigger>
            <TabsTrigger
              value="financial"
              className="text-white/80 hover:text-white data-[state=active]:text-white data-[state=active]:bg-white/20"
            >
              Financial
            </TabsTrigger>
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
    </div>
  );
}
