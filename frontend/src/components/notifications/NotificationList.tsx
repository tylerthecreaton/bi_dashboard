import {
  Bell,
  Trash2,
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { th } from "date-fns/locale";

export function NotificationList() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  } = useNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-1.5 hover:bg-gray-100 rounded-md transition-all duration-200 outline-none">
          <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 hover:border-gray-300 transition-colors">
            <Bell className="w-4 h-4 text-gray-600" />
          </div>
          {unreadCount > 0 && (
            <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
          <h4 className="font-semibold text-sm text-gray-900">การแจ้งเตือน</h4>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto px-2 py-1 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={markAllAsRead}
            >
              อ่านทั้งหมด
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center text-gray-500">
              <Bell className="w-8 h-8 mb-2 text-gray-300" />
              <p className="text-sm">ไม่มีการแจ้งเตือน</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer group",
                    !notification.read && "bg-blue-50/30"
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p
                      className={cn(
                        "text-sm font-medium leading-none",
                        !notification.read ? "text-gray-900" : "text-gray-600"
                      )}
                    >
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {formatDistanceToNow(notification.timestamp, {
                        addSuffix: true,
                        locale: th,
                      })}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="flex-shrink-0 self-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {notifications.length > 0 && (
          <div className="p-2 border-t border-gray-100 bg-gray-50/50">
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-8 text-xs text-gray-500 hover:text-red-600 hover:bg-red-50"
              onClick={clearNotifications}
            >
              <Trash2 className="w-3 h-3 mr-2" />
              ล้างการแจ้งเตือนทั้งหมด
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
