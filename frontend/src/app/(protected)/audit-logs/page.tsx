"use client";

import { auditLogs } from "@/data/mockData";

export default function AuditLogs() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-foreground">Audit Logs</h2>
                <p className="text-sm text-muted-foreground">System-wide activity log</p>
            </div>

            <div className="bg-card rounded-lg border enterprise-shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b bg-muted/50">
                            <th className="px-5 py-3 text-left font-semibold text-foreground">Timestamp</th>
                            <th className="px-5 py-3 text-left font-semibold text-foreground">User</th>
                            <th className="px-5 py-3 text-left font-semibold text-foreground">Action</th>
                            <th className="px-5 py-3 text-left font-semibold text-foreground">Entity</th>
                            <th className="px-5 py-3 text-left font-semibold text-foreground">Old Value</th>
                            <th className="px-5 py-3 text-left font-semibold text-foreground">New Value</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {auditLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                                <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">{log.timestamp}</td>
                                <td className="px-5 py-3 font-medium text-foreground">{log.user}</td>
                                <td className="px-5 py-3">
                                    <span className="rounded-sm bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground capitalize">
                                        {log.action}
                                    </span>
                                </td>
                                <td className="px-5 py-3 font-mono text-sm text-muted-foreground">{log.entity}</td>
                                <td className="px-5 py-3 text-muted-foreground">{log.oldValue}</td>
                                <td className="px-5 py-3 text-muted-foreground">{log.newValue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
