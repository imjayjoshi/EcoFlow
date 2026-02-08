import { useState } from "react";
import { Bell, CheckCircle, XCircle, Clock, AlertTriangle, Settings, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/contexts/NotificationContext";
import { type Notification } from "@/data/notificationsData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const notificationIcons: Record<Notification["type"], React.ElementType> = {
  approval_pending: Clock,
  eco_submitted: AlertTriangle,
  eco_approved: CheckCircle,
  eco_rejected: XCircle,
  eco_updated: Settings,
  system: Settings,
};

const notificationColors: Record<Notification["type"], string> = {
  approval_pending: "text-status-submitted bg-status-submitted-bg",
  eco_submitted: "text-status-draft bg-status-draft-bg",
  eco_approved: "text-status-approved bg-status-approved-bg",
  eco_rejected: "text-status-rejected bg-status-rejected-bg",
  eco_updated: "text-muted-foreground bg-muted",
  system: "text-muted-foreground bg-muted",
};

const priorityLabels: Record<Notification["priority"], { label: string; class: string }> = {
  high: { label: "High", class: "bg-status-rejected-bg text-status-rejected" },
  medium: { label: "Medium", class: "bg-status-draft-bg text-status-draft" },
  low: { label: "Low", class: "bg-muted text-muted-foreground" },
};

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Notifications() {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  const [filter, setFilter] = useState<"all" | "unread" | "approval_pending">("all");

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "approval_pending") return n.type === "approval_pending";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
          <p className="text-sm text-muted-foreground">
            Stay updated on ECO status changes and approval requests
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full" onValueChange={(v) => setFilter(v as typeof filter)}>
        <TabsList>
          <TabsTrigger value="all" className="gap-2">
            All
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-xs">
              {notifications.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="unread" className="gap-2">
            Unread
            {unreadCount > 0 && (
              <span className="rounded-full bg-status-rejected px-1.5 py-0.5 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approval_pending" className="gap-2">
            Pending Approvals
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-4">
          {filteredNotifications.length === 0 ? (
            <Card className="enterprise-shadow">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground/30 mb-3" />
                <p className="text-sm font-medium text-muted-foreground">No notifications</p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  {filter === "unread" ? "All caught up!" : "Nothing to show here"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {filteredNotifications.map((notification) => {
                const Icon = notificationIcons[notification.type];
                return (
                  <Card
                    key={notification.id}
                    className={cn(
                      "enterprise-shadow transition-colors cursor-pointer hover:bg-muted/30",
                      !notification.read && "border-l-4 border-l-status-submitted"
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <CardContent className="flex items-start gap-4 p-4">
                      {/* Icon */}
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                          notificationColors[notification.type]
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p
                              className={cn(
                                "text-sm font-semibold",
                                !notification.read ? "text-foreground" : "text-muted-foreground"
                              )}
                            >
                              {notification.title}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {notification.message}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={cn(
                                "rounded-full px-2 py-0.5 text-xs font-medium",
                                priorityLabels[notification.priority].class
                              )}
                            >
                              {priorityLabels[notification.priority].label}
                            </span>
                            {!notification.read && (
                              <span className="h-2.5 w-2.5 rounded-full bg-status-submitted" />
                            )}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{formatTimestamp(notification.timestamp)}</span>
                          {notification.ecoId && (
                            <Link
                              to={`/ecos/${notification.ecoId}`}
                              className="font-medium text-primary hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View {notification.ecoId} →
                            </Link>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
