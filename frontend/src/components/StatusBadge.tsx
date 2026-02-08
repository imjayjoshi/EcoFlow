import { cn } from "@/lib/utils";

type Status = "draft" | "submitted" | "under_review" | "approved" | "rejected" | "archived" | "active";

const statusConfig: Record<Status, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-status-draft-bg text-status-draft-foreground border-status-draft/30" },
  submitted: { label: "Submitted", className: "bg-status-review-bg text-status-review-foreground border-status-review/30" },
  under_review: { label: "Under Review", className: "bg-status-review-bg text-status-review-foreground border-status-review/30" },
  approved: { label: "Approved", className: "bg-status-approved-bg text-status-approved-foreground border-status-approved/30" },
  active: { label: "Active", className: "bg-status-approved-bg text-status-approved-foreground border-status-approved/30" },
  rejected: { label: "Rejected", className: "bg-status-rejected-bg text-status-rejected-foreground border-status-rejected/30" },
  archived: { label: "Archived", className: "bg-status-archived-bg text-status-archived-foreground border-status-archived/30" },
};

export function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-semibold border", config.className)}>
      {config.label}
    </span>
  );
}
