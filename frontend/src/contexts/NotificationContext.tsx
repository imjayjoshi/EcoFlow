"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { notifications as initialNotifications, type Notification } from "@/data/notificationsData";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
      const newNotification: Notification = {
        ...notification,
        id: `NOTIF-${Date.now()}`,
        timestamp: new Date().toISOString(),
        read: false,
      };
      setNotifications((prev) => [newNotification, ...prev]);
    },
    []
  );

  // Simulate real-time notifications (demo purposes)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const demoNotifications: Omit<Notification, "id" | "timestamp" | "read">[] = [
        {
          type: "eco_updated",
          title: "ECO Updated",
          message: "ECO-2026-001 draft has been modified by Sarah Chen",
          ecoId: "ECO-2026-001",
          priority: "low",
        },
      ];

      // Add a demo notification after 30 seconds
      const randomNotif = demoNotifications[Math.floor(Math.random() * demoNotifications.length)];
      addNotification(randomNotif);
    }, 30000);

    return () => clearTimeout(timeout);
  }, [addNotification]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
