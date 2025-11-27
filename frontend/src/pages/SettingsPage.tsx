import { useState } from "react";
import { Layout } from "@/components/layout";
import {
  User,
  Bell,
  Shield,
  Palette,
  Moon,
  Sun,
  Laptop,
  Mail,
  Check,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type SettingsSection = "general" | "appearance" | "notifications" | "security";

export function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("general");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("บันทึกการตั้งค่าเรียบร้อยแล้ว");
    }, 1000);
  };

  const sidebarItems = [
    {
      id: "general",
      label: "ทั่วไป",
      icon: User,
      description: "ข้อมูลโปรไฟล์และบัญชีผู้ใช้",
    },
    {
      id: "appearance",
      label: "รูปลักษณ์",
      icon: Palette,
      description: "ธีมและการตั้งค่าการแสดงผล",
    },
    {
      id: "notifications",
      label: "การแจ้งเตือน",
      icon: Bell,
      description: "การตั้งค่าอีเมลและการแจ้งเตือน",
    },
    {
      id: "security",
      label: "ความปลอดภัย",
      icon: Shield,
      description: "รหัสผ่านและการยืนยันตัวตนสองขั้นตอน",
    },
  ] as const;

  return (
    <Layout>
      <div className="container max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            การตั้งค่า
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            จัดการการตั้งค่าบัญชีผู้ใช้และพื้นที่ทำงานของคุณ
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:w-64 flex-shrink-0"
          >
            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
              {sidebarItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "justify-start gap-3 px-4 py-6 h-auto w-full hover:bg-gray-100/80 transition-all duration-200",
                      activeSection === item.id
                        ? "bg-blue-50 text-blue-700 hover:bg-blue-50 shadow-sm border border-blue-100"
                        : "text-gray-600"
                    )}
                    onClick={() => setActiveSection(item.id as SettingsSection)}
                  >
                    <motion.div
                      className={cn(
                        "p-2 rounded-lg transition-colors",
                        activeSection === item.id
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-500"
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <item.icon className="h-5 w-5" />
                    </motion.div>
                    <div className="text-left">
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-xs text-muted-foreground font-normal hidden lg:block">
                        {item.description}
                      </div>
                    </div>
                    <AnimatePresence>
                      {activeSection === item.id && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              ))}
            </nav>
          </motion.aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {/* General Section */}
                {activeSection === "general" && (
                  <motion.div
                    key="general"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                      <CardHeader className="pb-4 border-b bg-gray-50/50 rounded-t-xl">
                        <CardTitle className="text-xl">
                          ข้อมูลโปรไฟล์
                        </CardTitle>
                        <CardDescription>
                          อัปเดตโปรไฟล์สาธารณะและข้อมูลส่วนตัวของคุณ
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 space-y-8">
                        <motion.div 
                          className="flex flex-col sm:flex-row items-center gap-8 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <motion.div 
                            className="relative group cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                              <AvatarImage src="/avatars/01.png" alt="@ann" />
                              <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                AL
                              </AvatarFallback>
                            </Avatar>
                            <motion.div 
                              className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white text-xs font-medium"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              เปลี่ยน
                            </motion.div>
                          </motion.div>
                          <div className="text-center sm:text-left space-y-2">
                            <h3 className="font-semibold text-lg">รูปโปรไฟล์</h3>
                            <p className="text-sm text-muted-foreground max-w-xs">
                              รองรับไฟล์ PNG, JPG และ GIF ขนาดไม่เกิน 1MB
                            </p>
                            <div className="flex gap-2 justify-center sm:justify-start">
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button variant="outline" size="sm" className="h-8">
                                  อัปโหลดใหม่
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  ลบ
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div 
                          className="grid gap-6 md:grid-cols-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-gray-700">
                              ชื่อ
                            </Label>
                            <motion.div whileFocus={{ scale: 1.02 }}>
                              <Input
                                id="firstName"
                                defaultValue="Ann"
                                className="bg-gray-50/50 focus:bg-white transition-colors"
                              />
                            </motion.div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-gray-700">
                              นามสกุล
                            </Label>
                            <motion.div whileFocus={{ scale: 1.02 }}>
                              <Input
                                id="lastName"
                                defaultValue="Lee"
                                className="bg-gray-50/50 focus:bg-white transition-colors"
                              />
                            </motion.div>
                          </div>
                        </motion.div>

                        <motion.div 
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                        >
                          <Label htmlFor="email" className="text-gray-700">
                            อีเมล
                          </Label>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input
                              id="email"
                              type="email"
                              defaultValue="ann@saletics.com"
                              className="bg-gray-50/50 focus:bg-white transition-colors"
                            />
                          </motion.div>
                          <p className="text-[0.8rem] text-muted-foreground">
                            นี่คืออีเมลที่คุณใช้ในการเข้าสู่ระบบ
                          </p>
                        </motion.div>

                        <motion.div 
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                        >
                          <Label htmlFor="bio" className="text-gray-700">
                            ประวัติย่อ
                          </Label>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input
                              id="bio"
                              defaultValue="Admin user for BI Dashboard"
                              className="bg-gray-50/50 focus:bg-white transition-colors"
                            />
                          </motion.div>
                        </motion.div>
                      </CardContent>
                      <CardFooter className="border-t bg-gray-50/50 rounded-b-xl px-6 py-4 flex justify-end">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="min-w-[120px]"
                          >
                            {isLoading ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
                          </Button>
                        </motion.div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}

                {/* Appearance Section */}
                {activeSection === "appearance" && (
                  <motion.div
                    key="appearance"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                      <CardHeader className="pb-4 border-b bg-gray-50/50 rounded-t-xl">
                        <CardTitle className="text-xl">รูปลักษณ์</CardTitle>
                        <CardDescription>
                          ปรับแต่งรูปลักษณ์ของแดชบอร์ดบนอุปกรณ์ของคุณ
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 space-y-8">
                        <div className="space-y-4">
                          <Label className="text-base font-semibold">
                            ธีมอินเทอร์เฟซ
                          </Label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                              {
                                name: "สว่าง",
                                icon: Sun,
                                bg: "bg-[#ecedef]",
                                border: "border-gray-200",
                              },
                              {
                                name: "มืด",
                                icon: Moon,
                                bg: "bg-slate-950",
                                border: "border-slate-800",
                              },
                              {
                                name: "ตามระบบ",
                                icon: Laptop,
                                bg: "bg-slate-900",
                                border: "border-slate-700",
                              },
                            ].map((theme) => (
                              <motion.div
                                key={theme.name}
                                className={cn(
                                  "cursor-pointer group relative rounded-xl border-2 p-1",
                                  theme.name === "สว่าง"
                                    ? "border-blue-500 ring-2 ring-blue-100"
                                    : "border-transparent"
                                )}
                                whileHover={{ 
                                  scale: 1.05, 
                                  borderColor: "#3b82f6",
                                  transition: { duration: 0.2 }
                                }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <motion.div
                                  className={cn(
                                    "h-28 rounded-lg flex items-center justify-center mb-2",
                                    theme.bg
                                  )}
                                  whileHover={{ y: -2 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div
                                    className={cn(
                                      "w-3/4 h-3/4 rounded shadow-sm bg-white opacity-90"
                                    )}
                                  />
                                </motion.div>
                                <div className="flex items-center justify-center gap-2 py-2">
                                  <theme.icon className="h-4 w-4" />
                                  <span className="font-medium text-sm">
                                    {theme.name}
                                  </span>
                                </div>
                                {theme.name === "สว่าง" && (
                                  <motion.div 
                                    className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-0.5"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                  >
                                    <Check className="h-3 w-3" />
                                  </motion.div>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <motion.div 
                          className="flex items-center justify-between p-4 rounded-lg border bg-white"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.5 }}
                        >
                          <div className="space-y-0.5">
                            <Label className="text-base font-medium">
                              โหมดกระชับ
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              ลดช่องว่างเพื่อแสดงข้อมูลมากขึ้นบนหน้าจอ
                            </p>
                          </div>
                          <motion.div whileTap={{ scale: 0.9 }}>
                            <Switch />
                          </motion.div>
                        </motion.div>
                      </CardContent>
                      <CardFooter className="border-t bg-gray-50/50 rounded-b-xl px-6 py-4 flex justify-end">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="min-w-[120px]"
                          >
                            {isLoading ? "กำลังบันทึก..." : "บันทึกการตั้งค่า"}
                          </Button>
                        </motion.div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}

                {/* Notifications Section */}
                {activeSection === "notifications" && (
                  <motion.div
                    key="notifications"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                      <CardHeader className="pb-4 border-b bg-gray-50/50 rounded-t-xl">
                        <CardTitle className="text-xl">การแจ้งเตือน</CardTitle>
                        <CardDescription>
                          เลือกการอัปเดตที่คุณต้องการรับ
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 space-y-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 uppercase tracking-wider">
                            <Mail className="h-4 w-4" />
                            การแจ้งเตือนทางอีเมล
                          </div>
                          <div className="space-y-4 pl-6 border-l-2 border-blue-100">
                            {[
                              {
                                title: "อีเมลการสื่อสาร",
                                desc: "รับอีเมลเกี่ยวกับกิจกรรมบัญชีของคุณ",
                                default: true,
                              },
                              {
                                title: "อีเมลการตลาด",
                                desc: "รับอีเมลเกี่ยวกับผลิตภัณฑ์ใหม่ ฟีเจอร์ใหม่ และอื่นๆ",
                                default: false,
                              },
                              {
                                title: "อีเมลความปลอดภัย",
                                desc: "รับอีเมลเกี่ยวกับความปลอดภัยบัญชีของคุณ",
                                default: true,
                                disabled: true,
                              },
                            ].map((item, i) => (
                              <motion.div
                                key={i}
                                className="flex items-center justify-between py-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                              >
                                <div className="space-y-0.5">
                                  <Label className="text-base font-medium">
                                    {item.title}
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    {item.desc}
                                  </p>
                                </div>
                                <motion.div whileTap={{ scale: 0.9 }}>
                                  <Switch
                                    defaultChecked={item.default}
                                    disabled={item.disabled}
                                  />
                                </motion.div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-purple-600 uppercase tracking-wider">
                            <Bell className="h-4 w-4" />
                            การแจ้งเตือนแบบ Push
                          </div>
                          <div className="space-y-4 pl-6 border-l-2 border-purple-100">
                            <motion.div 
                              className="flex items-center justify-between py-2"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.5 }}
                            >
                              <div className="space-y-0.5">
                                <Label className="text-base font-medium">
                                  ความคิดเห็นใหม่
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  รับการแจ้งเตือนเมื่อมีคนคอมเมนต์บนแดชบอร์ดของคุณ
                                </p>
                              </div>
                              <motion.div whileTap={{ scale: 0.9 }}>
                                <Switch defaultChecked />
                              </motion.div>
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t bg-gray-50/50 rounded-b-xl px-6 py-4 flex justify-end">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="min-w-[120px]"
                          >
                            {isLoading ? "กำลังบันทึก..." : "บันทึกการตั้งค่า"}
                          </Button>
                        </motion.div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}

                {/* Security Section */}
                {activeSection === "security" && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                      <CardHeader className="pb-4 border-b bg-gray-50/50 rounded-t-xl">
                        <CardTitle className="text-xl">ความปลอดภัย</CardTitle>
                        <CardDescription>
                          รักษาความปลอดภัยบัญชีของคุณด้วยรหัสผ่านที่แข็งแกร่งและการยืนยันตัวตนสองขั้นตอน
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 space-y-8">
                        <motion.div 
                          className="space-y-4"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          <h3 className="font-semibold text-lg">เปลี่ยนรหัสผ่าน</h3>
                          <motion.div 
                            className="grid gap-4 p-4 bg-gray-50 rounded-xl border"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                          >
                            <div className="space-y-2">
                              <Label htmlFor="current">รหัสผ่านปัจจุบัน</Label>
                              <motion.div whileFocus={{ scale: 1.02 }}>
                                <Input
                                  id="current"
                                  type="password"
                                  className="bg-white"
                                />
                              </motion.div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor="new">รหัสผ่านใหม่</Label>
                                <motion.div whileFocus={{ scale: 1.02 }}>
                                  <Input
                                    id="new"
                                    type="password"
                                    className="bg-white"
                                  />
                                </motion.div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="confirm">ยืนยันรหัสผ่าน</Label>
                                <motion.div whileFocus={{ scale: 1.02 }}>
                                  <Input
                                    id="confirm"
                                    type="password"
                                    className="bg-white"
                                  />
                                </motion.div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>

                        <Separator />

                        <motion.div 
                          className="flex items-center justify-between p-4 rounded-lg border bg-blue-50/50 border-blue-100"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <Label className="text-base font-medium">
                                การยืนยันตัวตนสองขั้นตอน
                              </Label>
                              <motion.span 
                                className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wide"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, type: "spring" }}
                              >
                                แนะนำ
                              </motion.span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              เพิ่มความปลอดภัยให้กับบัญชีของคุณอีกชั้นหนึ่ง
                            </p>
                          </div>
                          <motion.div whileTap={{ scale: 0.9 }}>
                            <Switch />
                          </motion.div>
                        </motion.div>
                      </CardContent>
                      <CardFooter className="border-t bg-gray-50/50 rounded-b-xl px-6 py-4 flex justify-end">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="min-w-[120px]"
                          >
                            {isLoading ? "กำลังบันทึก..." : "อัปเดตความปลอดภัย"}
                          </Button>
                        </motion.div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}
