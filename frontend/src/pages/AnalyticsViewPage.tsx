import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  type LucideIcon,
  Activity,
  ArrowLeft,
  BarChart3,
  Download,
  Filter,
  Search,
  TrendingUp,
} from "lucide-react";
import { ChartsSection } from "@/components/publicc/presentation/ChartsSection";

type QuickStat = {
  label: string;
  value: string;
  trend: string;
  helper: string;
};

type InsightCard = {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  bgClass: string;
  textClass: string;
};

type RecentReport = {
  id: number;
  title: string;
  timeAgo: string;
};

const QUICK_STATS: QuickStat[] = [
  {
    label: "KPI ที่ใช้งานอยู่",
    value: "42",
    trend: "+6.2%",
    helper: "เทียบกับเดือนที่แล้ว",
  },
  {
    label: "สุขภาพแคมเปญ",
    value: "87%",
    trend: "+3.1%",
    helper: "คะแนนถ่วงน้ำหนัก",
  },
  {
    label: "รายได้ (เดือนปัจจุบัน)",
    value: "$4.8M",
    trend: "+8.4%",
    helper: "สูงกว่าคาดการณ์ 14%",
  },
  {
    label: "การแจ้งเตือนความผิดปกติ",
    value: "3",
    trend: "-2 เทียบกับค่าเฉลี่ย",
    helper: "รายการที่เปิดอยู่",
  },
];

const INSIGHT_CARDS: InsightCard[] = [
  {
    title: "โมเมนตัมรายได้",
    subtitle: "การขายและไปป์ไลน์",
    description:
      "รายได้ไตรมาสปัจจุบันสูงกว่าคาดการณ์ 8% โดยมีสองข้อตกลงระดับองค์กรที่กำลังจะเข้าสู่ขั้นตอนการยืนยัน",
    icon: TrendingUp,
    bgClass: "bg-emerald-100",
    textClass: "text-emerald-700",
  },
  {
    title: "การมีส่วนร่วม",
    subtitle: "การวิเคราะห์ผลิตภัณฑ์",
    description:
      "ระยะเวลาในการใช้งานเพิ่มขึ้น 12% เทียบสัปดาห์ต่อสัปดาห์หลังจากการปรับปรุงการเริ่มต้นใช้งาน ซึ่งบ่งชี้ว่าผู้ใช้มีการยอมรับที่ดีขึ้น",
    icon: Activity,
    bgClass: "bg-blue-100",
    textClass: "text-blue-700",
  },
  {
    title: "ความแม่นยำของการคาดการณ์",
    subtitle: "การดำเนินงานด้านการเงิน",
    description:
      "ความแตกต่างระหว่างกระแสเงินสดที่คาดการณ์และจริงลดลงเหลือ 1.8% ซึ่งเป็นความเบี่ยงเบนที่ต่ำที่สุดในช่วงหกเดือนที่ผ่านมา",
    icon: BarChart3,
    bgClass: "bg-amber-100",
    textClass: "text-amber-700",
  },
  {
    title: "ความรู้สึกของลูกค้า",
    subtitle: "การสนับสนุนและ NPS",
    description:
      "คะแนนส่งเสริมสุทธิ (NPS) เพิ่มขึ้นเป็น 54 หลังจากรอบการเปิดตัวล่าสุด ตรวจสอบผู้ที่ไม่พอใจที่ถูก标记เพื่อติดตามในสัปดาห์นี้",
    icon: TrendingUp,
    bgClass: "bg-purple-100",
    textClass: "text-purple-700",
  },
];

const RECENT_REPORTS: RecentReport[] = [
  {
    id: 1,
    title: "สรุป KPI สำหรับผู้บริหาร",
    timeAgo: "สร้างเมื่อ 12 นาทีที่แล้ว",
  },
  {
    id: 2,
    title: "การวิเคราะห์การรับรู้การตลาดเชิงลึก",
    timeAgo: "แชร์เมื่อ 48 นาทีที่แล้ว",
  },
  {
    id: 3,
    title: "เครื่องมือติดตามสุขภาพลูกค้า",
    timeAgo: "ซิงค์เมื่อ 2 ชั่วโมงที่แล้ว",
  },
];

export function AnalyticsViewPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [timeframe, setTimeframe] = useState("30d");

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6 sm:px-4 md:px-6 lg:px-8">
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
                  ศูนย์ข้อมูลเชิงลึก
                </p>
                <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                  ศูนย์ควบคุมการวิเคราะห์
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-slate-600">
                  ตรวจสอบตัวชี้วัดสำคัญ สถานะแคมเปญ
                  และข้อมูลเชิงลึกข้ามฟังก์ชันโดยไม่ต้องออกจากแดชบอร์ด
                </p>
              </div>
            </div>
            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                <Filter className="mr-2 h-4 w-4" />
                กำหนดค่าตัวกรอง
              </Button>
              <Button
                type="button"
                className="h-10 rounded-lg bg-emerald-600 text-white shadow-sm hover:bg-emerald-700"
                onClick={() => navigate("/reports")}
              >
                <Download className="mr-2 h-4 w-4" />
                ส่งออกรายงาน
              </Button>
            </div>
          </div>

          <div className="border-t border-slate-100 px-4 py-4 sm:px-6 sm:py-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {QUICK_STATS.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    {item.label}
                  </p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-900">
                      {item.value}
                    </span>
                    <span className="text-xs font-medium text-emerald-600">
                      {item.trend}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{item.helper}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  type="text"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/60 py-2 pl-10 pr-3 text-sm text-slate-600 shadow-sm focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="ค้นหาตัวชี้วัดหรือรายงาน..."
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <label htmlFor="timeframe" className="font-medium">
                  ช่วงเวลา:
                </label>
                <select
                  id="timeframe"
                  value={timeframe}
                  onChange={(event) => setTimeframe(event.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="7d">7 วันที่ผ่านมา</option>
                  <option value="30d">30 วันที่ผ่านมา</option>
                  <option value="90d">ไตรมาสที่แล้ว</option>
                  <option value="12m">12 เดือนที่ผ่านมา</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="border-b border-slate-100 px-4 py-5 sm:px-6">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                    ภาพรวมประจำวัน
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-slate-900 sm:text-xl">
                    สถานะการวิเคราะห์ล่าสุด
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-slate-600">
                    ติดตามแนวโน้มรายได้ ประสิทธิภาพกำไร และ KPI
                    การดำเนินงานที่รวบรวมจากทุกทีม
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                  <TrendingUp className="h-4 w-4" />
                  อัปเดตเมื่อ 15 นาทีที่แล้ว
                </div>
              </div>
            </div>

            <div className="space-y-6 p-4 sm:p-6">
              <div className="grid gap-4 md:grid-cols-2">
                {INSIGHT_CARDS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-5 shadow-sm transition hover:border-emerald-200 hover:bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.bgClass} ${item.textClass}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-inner">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      แดชบอร์ดเชิงลึก
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      โต้ตอบกับภาพการแสดงผลด้านล่างเพื่อค้นพบปัจจัยที่อยู่เบื้องหลังตัวชี้วัดประสิทธิภาพแต่ละตัว
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    className="rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    ดูรายละเอียดเต็ม
                  </Button>
                </div>
                <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/60 p-3 sm:p-4">
                  <ChartsSection />
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 p-6 text-white shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-100">
                เคล็ดลับ
              </p>
              <h3 className="mt-2 text-xl font-semibold">
                พิธีการวิเคราะห์แบบกระชับ
              </h3>
              <p className="mt-3 text-sm text-emerald-100">
                กำหนดการตรวจสอบความผิดปกติสองครั้งต่อสัปดาห์และทำการแจ้งเตือนอัตโนมัติสำหรับตัวชี้วัดที่สำคัญที่สุดเพื่อให้ทีมสามารถตอบสนองได้อย่างรวดเร็ว
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">
                รายงานที่บันทึกล่าสุด
              </h3>
              <ul className="mt-4 space-y-4 text-sm text-slate-600">
                {RECENT_REPORTS.map((report) => (
                  <li key={report.id} className="flex gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-emerald-500" />
                    <div>
                      <p className="font-medium text-slate-900">
                        {report.title}
                      </p>
                      <p className="text-xs text-slate-400">{report.timeAgo}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
