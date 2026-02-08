import { boms } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function BillOfMaterials() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Bills of Materials</h2>
        <p className="text-sm text-muted-foreground">View BoM structures and component details</p>
      </div>

      <div className="flex items-center gap-2 rounded-md bg-status-draft-bg border border-status-draft/20 px-4 py-2.5 text-sm text-status-draft-foreground">
        <AlertTriangle className="h-4 w-4 shrink-0 text-status-draft" />
        BoMs are read-only. Modifications require an Engineering Change Order.
      </div>

      <div className="space-y-4">
        {boms.map((bom) => (
          <div key={bom.id} className="bg-card rounded-lg border enterprise-shadow overflow-hidden">
            <div className="flex items-center justify-between border-b px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-muted-foreground">{bom.id}</span>
                <span className="font-medium text-foreground">{bom.productName}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground">v{bom.version}</span>
                <StatusBadge status={bom.status} />
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/30">
                  <th className="px-5 py-2 text-left font-medium text-muted-foreground">Component</th>
                  <th className="px-5 py-2 text-left font-medium text-muted-foreground">Qty</th>
                  <th className="px-5 py-2 text-left font-medium text-muted-foreground">Unit</th>
                  <th className="px-5 py-2 text-left font-medium text-muted-foreground">Op. Time</th>
                  <th className="px-5 py-2 text-right font-medium text-muted-foreground">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {bom.items.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/20">
                    <td className="px-5 py-2.5 font-medium text-foreground">{item.component}</td>
                    <td className="px-5 py-2.5 text-muted-foreground">{item.quantity}</td>
                    <td className="px-5 py-2.5 text-muted-foreground">{item.unit}</td>
                    <td className="px-5 py-2.5 text-muted-foreground">{item.operationTime}</td>
                    <td className="px-5 py-2.5 text-right font-mono text-muted-foreground">${item.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
