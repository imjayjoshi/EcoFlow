"use client";

import { useState } from "react";
import { Bell, CheckCircle, XCircle, Clock, AlertTriangle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/contexts/NotificationContext";
import { type Notification } from "@/data/notificationsData";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const notificationIcons: Record<Notification["type"], React.ElementType> = {
  approval_pending: Clock,
  eco_submitted: AlertTriangle,
  eco_approved: CheckCircle,
  eco_rejected: XCircle,
  eco_updated: Settings,
  system: Settings
};

const notificationColors: Record<Notification["type"], string> = {
  approval_pending: "text-status-submitted",
  eco_submitted: "text-status-draft",
  eco_approved: "text-status-approved",
  eco_rejected: "text-status-rejected",
  eco_updated: "text-muted-foreground",
  system: "text-muted-foreground"
};

const priorityIndicators: Record<Notification["priority"], string> = {
  high: "bg-status-rejected",
  medium: "bg-status-draft",
  low: "bg-muted"
};

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export function NotificationBell() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead
  } = useNotifications();
  const [open, setOpen] = useState(false);

  const recentNotifications = notifications.slice(0, 6);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0 hover:bg-muted">
          <Bell className="h-4.5 w-4.5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-status-rejected text-[10px] font-semibold text-white animate-pulse px-[4px] py-[4px]">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-96 p-0 shadow-xl border-border" sideOffset={8}>
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-foreground">Notifications</h4>
            {unreadCount > 0 && (
              <span className="rounded-full bg-status-rejected/10 px-2 py-0.5 text-xs font-medium text-status-rejected">
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
        </div>

        <ScrollArea className="h-80">
          <div className="divide-y divide-border">
            {recentNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bell className="h-8 w-8 text-muted-foreground/50 mb-2" />
                <p className="text-sm text-muted-foreground">No notifications</p>
              </div>
            ) : (
              recentNotifications.map((notification) => {
                const Icon = notificationIcons[notification.type];
                return (
                  <div
                    key={notification.id}
                    className={cn(
                      "relative flex gap-3 px-4 py-3 transition-colors hover:bg-muted/50 cursor-pointer",
                      !notification.read && "bg-primary/5"
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className={cn("absolute left-0 top-0 bottom-0 w-1", priorityIndicators[notification.priority])} />
                    <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted", notificationColors[notification.type])}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={cn("text-sm font-medium leading-tight", !notification.read ? "text-foreground" : "text-muted-foreground")}>
                          {notification.title}
                        </p>
                        {!notification.read && <span className="h-2 w-2 shrink-0 rounded-full bg-status-submitted" />}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground/70">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                        {notification.ecoId && (
                          <Link
                            href={`/ecos/${notification.ecoId}`}
                            className="text-[10px] font-medium text-primary hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpen(false);
                            }}
                          >
                            View ECO →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>

        <Separator />
        <div className="p-2">
          <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-foreground" asChild>
            <Link href="/notifications" onClick={() => setOpen(false)}>
              View all notifications
            </Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}