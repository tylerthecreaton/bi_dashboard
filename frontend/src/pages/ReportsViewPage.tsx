import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Download } from "lucide-react";
import { toast } from "sonner";

type ReportCard = {
  id: number;
  title: string;
  description: string;
  icon: typeof FileText;
};

const AVAILABLE_REPORTS: ReportCard[] = [
  {
    id: 1,
    title: "รายงานประจำเดือน",
    description: "ตัวชี้วัดประสิทธิภาพรายเดือนโดยละเอียด",
    icon: FileText,
  },
  {
    id: 2,
    title: "การวิเคราะห์รายไตรมาส",
    description: "การวิเคราะห์ธุรกิจรายไตรมาสอย่างครอบคลุม",
    icon: FileText,
  },
  {
    id: 3,
    title: "สรุปประจำปี",
    description: "สรุปประสิทธิภาพสิ้นปีและข้อมูลเชิงลึก",
    icon: FileText,
  },
];

const RECENT_REPORTS = [
  {
    id: 1,
    title: "รายงานประสิทธิภาพ Q4 2024",
    timeAgo: "สร้างเมื่อ 2 ชั่วโมงที่แล้ว",
  },
  {
    id: 2,
    title: "การวิเคราะห์ยอดขายประจำเดือน",
    timeAgo: "สร้างเมื่อ 1 วันที่แล้ว",
  },
  {
    id: 3,
    title: "รายงานสรุปผู้บริหาร",
    timeAgo: "สร้างเมื่อ 3 วันที่แล้ว",
  },
];

export function ReportsViewPage() {
  const navigate = useNavigate();

  const handleExport = () => {
    toast.success("ส่งออกรายงานสำเร็จ");
  };

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
                  ศูนย์รายงาน
                </p>
                <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                  รายงานและเอกสาร
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-slate-600">
                  รายงานและเอกสารที่ครอบคลุมสำหรับข้อมูลเชิงลึกทางธุรกิจของคุณ
                </p>
              </div>
            </div>
            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
              <Button
                type="button"
                className="h-10 rounded-lg bg-emerald-600 text-white shadow-sm hover:bg-emerald-700"
                onClick={handleExport}
              >
                <Download className="mr-2 h-4 w-4" />
                ส่งออกรายงาน
              </Button>
            </div>
          </div>
        </div>

        {/* Available Reports Section */}
        <section>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                รายงานที่พร้อมใช้งาน
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                เลือกรายงานที่คุณต้องการดาวน์โหลดหรือดูรายละเอียด
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {AVAILABLE_REPORTS.map((report) => {
                const Icon = report.icon;
                return (
                  <div
                    key={report.id}
                    className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-5 shadow-sm transition hover:border-emerald-200 hover:bg-white hover:shadow-md"
                  >
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-slate-900">
                        {report.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">
                        {report.description}
                      </p>
                    </div>
                    <Button
                      onClick={handleExport}
                      className="mt-4 w-full rounded-lg bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      ดาวน์โหลด
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Recent Reports Section */}
        <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                รายงานล่าสุด
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                รายงานที่สร้างขึ้นล่าสุดและพร้อมให้ดาวน์โหลด
              </p>
            </div>
            <ul className="space-y-4">
              {RECENT_REPORTS.map((report) => (
                <li
                  key={report.id}
                  className="flex items-start gap-4 rounded-lg border border-slate-200 bg-slate-50/50 p-4 transition hover:border-emerald-200 hover:bg-white"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900">{report.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {report.timeAgo}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExport}
                    className="flex-shrink-0 rounded-lg border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 p-6 text-white shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-100">
                เคล็ดลับ
              </p>
              <h3 className="mt-2 text-xl font-semibold">
                การจัดการรายงานอัตโนมัติ
              </h3>
              <p className="mt-3 text-sm text-emerald-100">
                ตั้งค่าการสร้างรายงานอัตโนมัติเพื่อรับข้อมูลเชิงลึกล่าสุดโดยไม่ต้องดำเนินการด้วยตนเอง
                ประหยัดเวลาและเพิ่มประสิทธิภาพในการทำงาน
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">
                สถิติรายงาน
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">รายงานทั้งหมด</span>
                  <span className="text-lg font-bold text-slate-900">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">สร้างเดือนนี้</span>
                  <span className="text-lg font-bold text-emerald-600">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">
                    ดาวน์โหลดทั้งหมด
                  </span>
                  <span className="text-lg font-bold text-slate-900">156</span>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
