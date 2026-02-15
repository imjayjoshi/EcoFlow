"use client";

import { useAuth } from "@/contexts/AuthContext";
import { StatsCard } from "@/components/StatsCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ecos, products, boms } from "@/data/mockData";
import {
    FileText, Clock, CheckCircle2, XCircle, Package, Layers,
    AlertTriangle, Settings, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function EngineeringDashboard() {
    const drafts = ecos.filter((e) => e.status === "draft");
    const submitted = ecos.filter((e) => e.status === "submitted" || e.status === "under_review");
    const approved = ecos.filter((e) => e.status === "approved");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Engineering Dashboard</h2>
                    <p className="text-sm text-muted-foreground">Manage your engineering change orders</p>
                </div>
                <Link href="/ecos/create">
                    <Button>
                        <FileText className="mr-2 h-4 w-4" />
                        Create New ECO
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <StatsCard title="ECOs in Draft" value={drafts.length} icon={FileText} variant="draft" subtitle="Pending your action" />
                <StatsCard title="Awaiting Approval" value={submitted.length} icon={Clock} variant="review" subtitle="Submitted for review" />
                <StatsCard title="Recently Approved" value={approved.length} icon={CheckCircle2} variant="approved" subtitle="Applied to production" />
            </div>

            <div className="bg-card rounded-lg border enterprise-shadow">
                <div className="flex items-center justify-between border-b px-5 py-3">
                    <h3 className="text-sm font-semibold text-foreground">Recent Change Orders</h3>
                    <Link href="/ecos" className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1">
                        View all <ArrowRight className="h-3 w-3" />
                    </Link>
                </div>
                <div className="divide-y">
                    {ecos.slice(0, 4).map((eco) => (
                        <Link key={eco.id} href={`/ecos/${eco.id}`} className="flex items-center justify-between px-5 py-3 hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-mono text-muted-foreground">{eco.id}</span>
                                <span className="text-sm font-medium text-foreground">{eco.title}</span>
                            </div>
                            <StatusBadge status={eco.status} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ApproverDashboard() {
    const pending = ecos.filter((e) => e.status === "under_review" || e.status === "submitted");
    const approved = ecos.filter((e) => e.status === "approved");
    const rejected = ecos.filter((e) => e.status === "rejected");

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-foreground">Approver Dashboard</h2>
                <p className="text-sm text-muted-foreground">Review and approve engineering change orders</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard title="Pending Approval" value={pending.length} icon={Clock} variant="review" subtitle="Requires your action" />
                <StatsCard title="Approved Today" value={approved.length} icon={CheckCircle2} variant="approved" />
                <StatsCard title="Rejected" value={rejected.length} icon={XCircle} variant="rejected" />
                <StatsCard title="Avg. Approval Time" value="2.4d" icon={AlertTriangle} subtitle="Target: 3 days" />
            </div>

            <div className="bg-card rounded-lg border enterprise-shadow">
                <div className="border-b px-5 py-3">
                    <h3 className="text-sm font-semibold text-foreground">ECOs Pending Your Review</h3>
                </div>
                <div className="divide-y">
                    {pending.length === 0 && (
                        <p className="px-5 py-8 text-center text-sm text-muted-foreground">No ECOs pending approval</p>
                    )}
                    {pending.map((eco) => (
                        <Link key={eco.id} href={`/ecos/${eco.id}`} className="flex items-center justify-between px-5 py-3 hover:bg-muted/50 transition-colors">
                            <div>
                                <span className="text-sm font-mono text-muted-foreground mr-3">{eco.id}</span>
                                <span className="text-sm font-medium text-foreground">{eco.title}</span>
                                <p className="text-xs text-muted-foreground mt-0.5">By {eco.createdBy} · Effective {eco.effectiveDate}</p>
                            </div>
                            <StatusBadge status={eco.status} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

function OperationsDashboard() {
    const activeProducts = products.filter((p) => p.status === "active");
    const activeBoms = boms.filter((b) => b.status === "active");

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-foreground">Operations Dashboard</h2>
                <p className="text-sm text-muted-foreground">Product and BoM overview</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <StatsCard title="Active Products" value={activeProducts.length} icon={Package} variant="approved" />
                <StatsCard title="Active BoMs" value={activeBoms.length} icon={Layers} variant="approved" />
                <StatsCard title="Recently Updated" value="3" icon={Clock} subtitle="Last 7 days" />
            </div>

            <div className="bg-card rounded-lg border enterprise-shadow">
                <div className="border-b px-5 py-3">
                    <h3 className="text-sm font-semibold text-foreground">Active Products</h3>
                </div>
                <div className="divide-y">
                    {activeProducts.map((p) => (
                        <Link key={p.id} href={`/products/${p.id}`} className="flex items-center justify-between px-5 py-3 hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-mono text-muted-foreground">{p.id}</span>
                                <span className="text-sm font-medium text-foreground">{p.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-mono text-muted-foreground">v{p.version}</span>
                                <StatusBadge status={p.status} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-foreground">Admin Dashboard</h2>
                <p className="text-sm text-muted-foreground">System overview and configuration</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard title="Total ECOs" value={ecos.length} icon={FileText} />
                <StatsCard title="Pending Approval" value={ecos.filter((e) => e.status === "under_review").length} icon={Clock} variant="review" />
                <StatsCard title="Active Products" value={products.filter((p) => p.status === "active").length} icon={Package} variant="approved" />
                <StatsCard title="System Status" value="Healthy" icon={Settings} subtitle="All services operational" />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <div className="bg-card rounded-lg border enterprise-shadow p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Approval Bottlenecks</h3>
                    <p className="text-sm text-muted-foreground">No bottlenecks detected. Average approval time: 2.4 days.</p>
                </div>
                <div className="bg-card rounded-lg border enterprise-shadow p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                        <Link href="/settings" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <Settings className="h-4 w-4" /> System Configuration
                        </Link>
                        <Link href="/audit-logs" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <FileText className="h-4 w-4" /> View Audit Logs
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const { user } = useAuth();
    if (!user) return null;

    switch (user.role) {
        case "engineering": return <EngineeringDashboard />;
        case "approver": return <ApproverDashboard />;
        case "operations": return <OperationsDashboard />;
        case "admin": return <AdminDashboard />;
    }
}
