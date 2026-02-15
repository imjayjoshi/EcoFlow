"use client";

import { useNotifications } from "@/contexts/NotificationContext";
import { StatusBadge } from "@/components/StatusBadge";
import Link from "next/link";
import { Bell, BellOff, Check, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Notifications() {
    const { notifications, markAsRead, markAllAsRead } = useNotifications();
    const [filter, setFilter] = useState<"all" | "unread" | "approvals">("all");

    const filtered = notifications.filter((n) => {
        if (filter === "unread") return !n.read;
        if (filter === "approvals") return n.type === "approval_pending";
        return true;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
                    <p className="text-sm text-muted-foreground">Stay updated on ECO changes and approvals</p>
                </div>
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                    <CheckCheck className="mr-2 h-4 w-4" /> Mark all as read
                </Button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 border-b">
                {(["all", "unread", "approvals"] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${filter === tab
                            ? "border-primary text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {tab === "all" ? "All" : tab === "unread" ? "Unread" : "Pending Approvals"}
                    </button>
                ))}
            </div>

            <div className="space-y-2">
                {filtered.length === 0 && (
                    <div className="flex flex-col items-center py-12 text-center">
                        <BellOff className="h-12 w-12 text-muted-foreground/30 mb-3" />
                        <p className="text-sm text-muted-foreground">No notifications</p>
                    </div>
                )}
                {filtered.map((n) => (
                    <div
                        key={n.id}
                        className={`flex items-start gap-3 rounded-lg border p-4 transition-colors ${n.read ? "bg-card" : "bg-primary/5 border-primary/10"
                            }`}
                    >
                        <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${n.read ? "bg-muted" : "bg-primary/10"
                            }`}>
                            <Bell className={`h-4 w-4 ${n.read ? "text-muted-foreground" : "text-primary"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={`text-sm ${n.read ? "text-muted-foreground" : "font-medium text-foreground"}`}>
                                {n.message}
                            </p>
                            <div className="flex items-center gap-3 mt-1.5">
                                <span className="text-xs text-muted-foreground">{n.timestamp}</span>
                                {n.ecoId && (
                                    <Link href={`/ecos/${n.ecoId}`} className="text-xs text-primary hover:underline">
                                        View ECO →
                                    </Link>
                                )}
                            </div>
                        </div>
                        {!n.read && (
                            <Button variant="ghost" size="sm" onClick={() => markAsRead(n.id)} className="shrink-0">
                                <Check className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
