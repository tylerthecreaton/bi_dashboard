import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3, TrendingUp } from "lucide-react";
import { KeyMetricsSection } from "@/components/publicc/presentation/KeyMetricsSection";
import { ChartsSection } from "@/components/publicc/presentation/ChartsSection";

export function DashboardViewPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6 sm:px-4 md:px-6 lg:px-8">
        {/* Header Card */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-lg border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                  ภาพรวมข้อมูล
                </p>
                <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                  แดชบอร์ดหลัก
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-slate-600">
                  ติดตามตัวชี้วัดประสิทธิภาพและการแสดงผลข้อมูลแบบเรียลไทม์
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
              <TrendingUp className="h-4 w-4" />
              อัปเดตล่าสุด
            </div>
          </div>
        </div>

        {/* Key Metrics Section */}
        <section>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <header className="flex flex-col gap-2 border-b border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  ตัวชี้วัดประสิทธิภาพหลัก
                </h2>
                <p className="text-xs text-slate-500">
                  ภาพรวมตัวชี้วัดที่สำคัญของระบบ
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-600">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                ข้อมูลสด
              </span>
            </header>
            <div className="px-4 pb-4 pt-2 sm:px-6 sm:pb-6">
              <KeyMetricsSection />
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <header className="flex flex-col gap-2 border-b border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  การแสดงผลข้อมูล
                </h2>
                <p className="text-xs text-slate-500">
                  กราฟและแผนภูมิแสดงแนวโน้มข้อมูล
                </p>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                ดูรายละเอียดเพิ่มเติม
              </Button>
            </header>
            <div className="px-4 pb-4 pt-2 sm:px-6 sm:pb-6">
              <ChartsSection />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
