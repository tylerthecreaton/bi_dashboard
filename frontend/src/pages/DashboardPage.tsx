import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { removeToken } from "@/lib/auth";
import { toast } from "sonner";

export function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    toast.success("ออกจากระบบสำเร็จ");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">BI Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ยอดขาย</CardTitle>
                <CardDescription>สรุปยอดขายรายวัน</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">฿ 1,234,567</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% จากเดือนที่แล้ว
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ลูกค้าใหม่</CardTitle>
                <CardDescription>จำนวนลูกค้าใหม่รายวัน</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">123</div>
                <p className="text-xs text-muted-foreground">
                  +15% จากเดือนที่แล้ว
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ออเดอร์</CardTitle>
                <CardDescription>จำนวนออเดอร์รายวัน</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">456</div>
                <p className="text-xs text-muted-foreground">
                  +10% จากเดือนที่แล้ว
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>กราฟยอดขาย</CardTitle>
                <CardDescription>แสดงกราฟยอดขาย 7 วันล่าสุด</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                  <p className="text-gray-500">กราฟยอดขาย (จะเพิ่มในภายหลัง)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
