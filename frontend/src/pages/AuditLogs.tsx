import { auditLogs } from "@/data/mockData";

export default function AuditLogs() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Audit Logs</h2>
        <p className="text-sm text-muted-foreground">Complete system activity log — read-only</p>
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
            {auditLogs.map((entry) => (
              <tr key={entry.id} className="hover:bg-muted/30">
                <td className="px-5 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{entry.timestamp}</td>
                <td className="px-5 py-3 text-foreground">{entry.user}</td>
                <td className="px-5 py-3 font-medium text-foreground">{entry.action}</td>
                <td className="px-5 py-3 font-mono text-muted-foreground">{entry.entity}</td>
                <td className="px-5 py-3 text-muted-foreground">{entry.oldValue}</td>
                <td className="px-5 py-3 text-muted-foreground">{entry.newValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
