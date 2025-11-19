import { useState } from "react";
import { Layout } from "@/components/layout";
import {
  User,
  Bell,
  Shield,
  Palette,
  Moon,
  Sun,
  Monitor,
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
      toast.success("Settings saved successfully");
    }, 1000);
  };

  const sidebarItems = [
    {
      id: "general",
      label: "General",
      icon: User,
      description: "Profile and account information",
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: Palette,
      description: "Theme and display settings",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      description: "Email and push preferences",
    },
    {
      id: "security",
      label: "Security",
      icon: Shield,
      description: "Password and 2FA",
    },
  ] as const;

  return (
    <Layout>
      <div className="container max-w-7xl py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Settings
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Manage your account preferences and workspace settings.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
              {sidebarItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    "justify-start gap-3 px-4 py-6 h-auto w-full hover:bg-gray-100/80 transition-all duration-200",
                    activeSection === item.id
                      ? "bg-blue-50 text-blue-700 hover:bg-blue-50 shadow-sm border border-blue-100"
                      : "text-gray-600"
                  )}
                  onClick={() => setActiveSection(item.id as SettingsSection)}
                >
                  <div
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      activeSection === item.id
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-500"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-xs text-muted-foreground font-normal hidden lg:block">
                      {item.description}
                    </div>
                  </div>
                  {activeSection === item.id && (
                    <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                  )}
                </Button>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <div className="space-y-6">
              {/* General Section */}
              {activeSection === "general" && (
                <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                  <CardHeader className="pb-4 border-b bg-gray-50/50 rounded-t-xl">
                    <CardTitle className="text-xl">
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your public profile and personal details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                    <div className="flex flex-col sm:flex-row items-center gap-8 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                      <div className="relative group cursor-pointer">
                        <Avatar className="h-24 w-24 border-4 border-white shadow-lg transition-transform group-hover:scale-105">
                          <AvatarImage src="/avatars/01.png" alt="@ann" />
                          <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                            AL
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                          Change
                        </div>
                      </div>
                      <div className="text-center sm:text-left space-y-2">
                        <h3 className="font-semibold text-lg">Profile Photo</h3>
                        <p className="text-sm text-muted-foreground max-w-xs">
                          We support PNGs, JPGs, and GIFs under 1MB.
                        </p>
                        <div className="flex gap-2 justify-center sm:justify-start">
                          <Button variant="outline" size="sm" className="h-8">
                            Upload New
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-gray-700">
                          First name
                        </Label>
                        <Input
                          id="firstName"
                          defaultValue="Ann"
                          className="bg-gray-50/50 focus:bg-white transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-gray-700">
                          Last name
                        </Label>
                        <Input
                          id="lastName"
                          defaultValue="Lee"
                          className="bg-gray-50/50 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="ann@saletics.com"
                        className="bg-gray-50/50 focus:bg-white transition-colors"
                      />
                      <p className="text-[0.8rem] text-muted-foreground">
                        This is the email you use to log in.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-gray-700">
                        Bio
                      </Label>
                      <Input
                        id="bio"
                        defaultValue="Admin user for BI Dashboard"
                        className="bg-gray-50/50 focus:bg-white transition-colors"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50/50 rounded-b-xl px-6 py-4 flex justify-end">
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="min-w-[120px]"
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Appearance Section */}
              {activeSection === "appearance" && (
                <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                  <CardHeader className="pb-4 border-b bg-gray-50/50 rounded-t-xl">
                    <CardTitle className="text-xl">Appearance</CardTitle>
                    <CardDescription>
                      Customize how the dashboard looks on your device.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                    <div className="space-y-4">
                      <Label className="text-base font-semibold">
                        Interface Theme
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          {
                            name: "Light",
                            icon: Sun,
                            bg: "bg-[#ecedef]",
                            border: "border-gray-200",
                          },
                          {
                            name: "Dark",
                            icon: Moon,
                            bg: "bg-slate-950",
                            border: "border-slate-800",
                          },
                          {
                            name: "System",
                            icon: Laptop,
                            bg: "bg-slate-900",
                            border: "border-slate-700",
                          },
                        ].map((theme) => (
                          <div
                            key={theme.name}
                            className={cn(
                              "cursor-pointer group relative rounded-xl border-2 p-1 transition-all hover:border-blue-500",
                              theme.name === "Light"
                                ? "border-blue-500 ring-2 ring-blue-100"
                                : "border-transparent"
                            )}
                          >
                            <div
                              className={cn(
                                "h-28 rounded-lg flex items-center justify-center mb-2",
                                theme.bg
                              )}
                            >
                              <div
                                className={cn(
                                  "w-3/4 h-3/4 rounded shadow-sm bg-white opacity-90"
                                )}
                              />
                            </div>
                            <div className="flex items-center justify-center gap-2 py-2">
                              <theme.icon className="h-4 w-4" />
                              <span className="font-medium text-sm">
                                {theme.name}
                              </span>
                            </div>
                            {theme.name === "Light" && (
                              <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-0.5">
                                <Check className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between p-4 rounded-lg border bg-white">
                      <div className="space-y-0.5">
                        <Label className="text-base font-medium">
                          Compact Mode
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Reduce whitespace to show more data on screen.
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50/50 rounded-b-xl px-6 py-4 flex justify-end">
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="min-w-[120px]"
                    >
                      {isLoading ? "Saving..." : "Save Preferences"}
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Notifications Section */}
              {activeSection === "notifications" && (
                <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                  <CardHeader className="pb-4 border-b bg-gray-50/50 rounded-t-xl">
                    <CardTitle className="text-xl">Notifications</CardTitle>
                    <CardDescription>
                      Choose what updates you want to receive.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 uppercase tracking-wider">
                        <Mail className="h-4 w-4" />
                        Email Notifications
                      </div>
                      <div className="space-y-4 pl-6 border-l-2 border-blue-100">
                        {[
                          {
                            title: "Communication emails",
                            desc: "Receive emails about your account activity.",
                            default: true,
                          },
                          {
                            title: "Marketing emails",
                            desc: "Receive emails about new products, features, and more.",
                            default: false,
                          },
                          {
                            title: "Security emails",
                            desc: "Receive emails about your account security.",
                            default: true,
                            disabled: true,
                          },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between py-2"
                          >
                            <div className="space-y-0.5">
                              <Label className="text-base font-medium">
                                {item.title}
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                {item.desc}
                              </p>
                            </div>
                            <Switch
                              defaultChecked={item.default}
                              disabled={item.disabled}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-purple-600 uppercase tracking-wider">
                        <Bell className="h-4 w-4" />
                        Push Notifications
                      </div>
                      <div className="space-y-4 pl-6 border-l-2 border-purple-100">
                        <div className="flex items-center justify-between py-2">
                          <div className="space-y-0.5">
                            <Label className="text-base font-medium">
                              New comments
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications when someone comments on
                              your dashboard.
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50/50 rounded-b-xl px-6 py-4 flex justify-end">
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="min-w-[120px]"
                    >
                      {isLoading ? "Saving..." : "Save Preferences"}
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Security Section */}
              {activeSection === "security" && (
                <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                  <CardHeader className="pb-4 border-b bg-gray-50/50 rounded-t-xl">
                    <CardTitle className="text-xl">Security</CardTitle>
                    <CardDescription>
                      Keep your account secure with a strong password and 2FA.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Change Password</h3>
                      <div className="grid gap-4 p-4 bg-gray-50 rounded-xl border">
                        <div className="space-y-2">
                          <Label htmlFor="current">Current Password</Label>
                          <Input
                            id="current"
                            type="password"
                            className="bg-white"
                          />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="new">New Password</Label>
                            <Input
                              id="new"
                              type="password"
                              className="bg-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm">Confirm Password</Label>
                            <Input
                              id="confirm"
                              type="password"
                              className="bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between p-4 rounded-lg border bg-blue-50/50 border-blue-100">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Label className="text-base font-medium">
                            Two-factor Authentication
                          </Label>
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wide">
                            Recommended
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account.
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50/50 rounded-b-xl px-6 py-4 flex justify-end">
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="min-w-[120px]"
                    >
                      {isLoading ? "Saving..." : "Update Security"}
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}
