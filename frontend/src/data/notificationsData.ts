export interface Notification {
  id: string;
  type: "approval_pending" | "eco_submitted" | "eco_approved" | "eco_rejected" | "eco_updated" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  ecoId?: string;
  priority: "high" | "medium" | "low";
}

export const notifications: Notification[] = [
  {
    id: "NOTIF-001",
    type: "approval_pending",
    title: "Approval Required",
    message: "ECO-2026-003 requires your approval — Add Redundant Seal to Fuel Manifold",
    timestamp: "2026-02-08 09:15:00",
    read: false,
    ecoId: "ECO-2026-003",
    priority: "high",
  },
  {
    id: "NOTIF-002",
    type: "eco_submitted",
    title: "ECO Submitted",
    message: "ECO-2026-002 has been submitted for technical review",
    timestamp: "2026-02-08 08:30:00",
    read: false,
    ecoId: "ECO-2026-002",
    priority: "medium",
  },
  {
    id: "NOTIF-003",
    type: "eco_approved",
    title: "ECO Approved",
    message: "ECO-2026-004 has been approved and applied to production",
    timestamp: "2026-02-07 16:45:00",
    read: true,
    ecoId: "ECO-2026-004",
    priority: "low",
  },
  {
    id: "NOTIF-004",
    type: "eco_rejected",
    title: "ECO Rejected",
    message: "ECO-2026-005 was rejected — Downgrade Legacy Sensor Firmware",
    timestamp: "2026-02-07 14:20:00",
    read: true,
    ecoId: "ECO-2026-005",
    priority: "medium",
  },
  {
    id: "NOTIF-005",
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance window on Feb 10, 2026 from 02:00-04:00 UTC",
    timestamp: "2026-02-06 10:00:00",
    read: true,
    priority: "low",
  },
  {
    id: "NOTIF-006",
    type: "approval_pending",
    title: "Approval Required",
    message: "ECO-2026-002 is awaiting technical review sign-off",
    timestamp: "2026-02-08 07:00:00",
    read: false,
    ecoId: "ECO-2026-002",
    priority: "high",
  },
];

export const getUnreadCount = () => notifications.filter((n) => !n.read).length;

export const getPendingApprovals = () => 
  notifications.filter((n) => n.type === "approval_pending" && !n.read);
