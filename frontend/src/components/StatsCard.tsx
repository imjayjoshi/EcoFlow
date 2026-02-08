import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  variant?: "default" | "draft" | "review" | "approved" | "rejected";
}

const variantStyles: Record<string, string> = {
  default: "border-border",
  draft: "border-l-4 border-l-status-draft border-t-border border-r-border border-b-border",
  review: "border-l-4 border-l-status-review border-t-border border-r-border border-b-border",
  approved: "border-l-4 border-l-status-approved border-t-border border-r-border border-b-border",
  rejected: "border-l-4 border-l-status-rejected border-t-border border-r-border border-b-border",
};

export function StatsCard({ title, value, icon: Icon, subtitle, variant = "default" }: StatsCardProps) {
  return (
    <div className={cn("bg-card rounded-lg border p-5 enterprise-shadow", variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-bold text-card-foreground">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="rounded-md bg-muted p-2">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
