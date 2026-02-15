"use client";

import { use } from "react";
import { products } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";

const versionHistory = [
    { version: "3.2.1", date: "2026-02-05", status: "active" as const, note: "ECO-2026-004 applied" },
    { version: "3.2.0", date: "2026-01-10", status: "archived" as const, note: "ECO-2025-018 applied" },
    { version: "3.1.0", date: "2025-09-22", status: "archived" as const, note: "Initial release update" },
    { version: "3.0.0", date: "2025-06-01", status: "archived" as const, note: "Major redesign" },
];

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const product = products.find((p) => p.id === id);

    if (!product) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">Product not found</p>
                <Link href="/products" className="text-sm text-primary hover:underline mt-2 inline-block">Back to Products</Link>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <Link href="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Products
            </Link>

            <div className="bg-card rounded-lg border enterprise-shadow p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-mono text-muted-foreground">{product.id}</p>
                        <h2 className="text-xl font-bold text-foreground mt-1">{product.name}</h2>
                        <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-muted-foreground">v{product.version}</span>
                        <StatusBadge status={product.status} />
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-lg border enterprise-shadow">
                <div className="border-b px-5 py-3">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4" /> Version History
                    </h3>
                </div>
                <div className="p-5">
                    <div className="relative pl-6 space-y-6">
                        <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
                        {versionHistory.map((v, i) => (
                            <div key={v.version} className="relative">
                                <div className={`absolute -left-4 top-1.5 h-2.5 w-2.5 rounded-full border-2 ${i === 0 ? "bg-status-approved border-status-approved" : "bg-card border-border"}`} />
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-sm font-semibold text-foreground">v{v.version}</span>
                                    <StatusBadge status={v.status} />
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">{v.date} · {v.note}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
