import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function SettingsPage() {
  const sections = [
    { title: "ECO Stages", desc: "Configure the approval workflow stages for ECOs", action: "Configure" },
    { title: "Approval Rules", desc: "Set minimum approvers and escalation rules", action: "Edit Rules" },
    { title: "Role-Permission Matrix", desc: "View and manage role-based access controls", action: "View Matrix" },
    { title: "System Parameters", desc: "Configure system-wide settings and defaults", action: "Edit" },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground">System configuration — Admin only</p>
      </div>

      <div className="space-y-4">
        {sections.map((s) => (
          <div key={s.title} className="bg-card rounded-lg border enterprise-shadow p-5 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
            </div>
            <Button variant="outline" size="sm">{s.action}</Button>
          </div>
        ))}
      </div>

      <div className="rounded-lg border-2 border-destructive/20 bg-status-rejected-bg p-5">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          Danger Zone
        </h3>
        <p className="text-xs text-muted-foreground mt-1 mb-3">
          These actions are irreversible and may affect production data.
        </p>
        <div className="flex gap-3">
          <Button variant="destructive" size="sm">Reset All Stages</Button>
          <Button variant="destructive" size="sm">Clear Audit Logs</Button>
        </div>
      </div>
    </div>
  );
}
