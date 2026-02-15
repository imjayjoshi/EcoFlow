"use client";

import { products } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Products() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-foreground">Product Master</h2>
                <p className="text-sm text-muted-foreground">View product versions and lifecycle status</p>
            </div>

            <div className="flex items-center gap-2 rounded-md bg-status-draft-bg border border-status-draft/20 px-4 py-2.5 text-sm text-status-draft-foreground">
                <AlertTriangle className="h-4 w-4 shrink-0 text-status-draft" />
                Products cannot be edited directly. Changes must go through an Engineering Change Order (ECO).
            </div>

            <div className="bg-card rounded-lg border enterprise-shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b bg-muted/50">
                            <th className="px-5 py-3 text-left font-semibold text-foreground">Product ID</th>
                            <th className="px-5 py-3 text-left font-semibold text-foreground">Name</th>
                            <th className="px-5 py-3 text-left font-semibold text-foreground">Version</th>
                            <th className="px-5 py-3 text-left font-semibold text-foreground">Status</th>
                            <th className="px-5 py-3 text-left font-semibold text-foreground">Last Updated</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {products.map((p) => (
                            <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                                <td className="px-5 py-3">
                                    <Link href={`/products/${p.id}`} className="font-mono text-sm text-muted-foreground hover:text-foreground">
                                        {p.id}
                                    </Link>
                                </td>
                                <td className="px-5 py-3 font-medium text-foreground">
                                    <Link href={`/products/${p.id}`} className="hover:underline">{p.name}</Link>
                                </td>
                                <td className="px-5 py-3 font-mono text-muted-foreground">v{p.version}</td>
                                <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                                <td className="px-5 py-3 text-muted-foreground">{p.lastUpdated}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
