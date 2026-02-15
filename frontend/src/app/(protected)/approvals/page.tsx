"use client";

import { ecos } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import Link from "next/link";
import { StatsCard } from "@/components/StatsCard";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

export default function Approvals() {
    const pending = ecos.filter((e) => e.status === "submitted" || e.status === "under_review");
    const approved = ecos.filter((e) => e.status === "approved");
    const rejected = ecos.filter((e) => e.status === "rejected");

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-foreground">Approvals</h2>
                <p className="text-sm text-muted-foreground">Review and approve engineering change orders</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                <StatsCard title="Pending" value={pending.length} icon={Clock} variant="review" />
                <StatsCard title="Approved" value={approved.length} icon={CheckCircle2} variant="approved" />
                <StatsCard title="Rejected" value={rejected.length} icon={XCircle} variant="rejected" />
            </div>

            <div className="bg-card rounded-lg border enterprise-shadow">
                <div className="border-b px-5 py-3">
                    <h3 className="text-sm font-semibold text-foreground">Pending Review</h3>
                </div>
                <div className="divide-y">
                    {pending.length === 0 && (
                        <p className="px-5 py-8 text-center text-sm text-muted-foreground">No ECOs pending approval</p>
                    )}
                    {pending.map((eco) => (
                        <Link key={eco.id} href={`/ecos/${eco.id}`} className="flex items-center justify-between px-5 py-3 hover:bg-muted/50 transition-colors">
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-sm text-muted-foreground">{eco.id}</span>
                                    <span className="font-medium text-foreground">{eco.title}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    By {eco.createdBy} · Effective {eco.effectiveDate} · Target: {eco.targetProduct}
                                </p>
                            </div>
                            <StatusBadge status={eco.status} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
