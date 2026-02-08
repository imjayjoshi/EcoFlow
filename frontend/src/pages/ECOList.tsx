import { ecos } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { FileText, Filter } from "lucide-react";
import { useState } from "react";

export default function ECOList() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = statusFilter === "all" ? ecos : ecos.filter((e) => e.status === statusFilter);

  const statuses = ["all", "draft", "submitted", "under_review", "approved", "rejected"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Engineering Change Orders</h2>
          <p className="text-sm text-muted-foreground">Track and manage all ECOs</p>
        </div>
        {user?.role === "engineering" && (
          <Link to="/ecos/create">
            <Button><FileText className="mr-2 h-4 w-4" /> Create ECO</Button>
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              statusFilter === s
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {s === "all" ? "All" : s === "under_review" ? "Under Review" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-lg border enterprise-shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-5 py-3 text-left font-semibold text-foreground">ECO ID</th>
              <th className="px-5 py-3 text-left font-semibold text-foreground">Title</th>
              <th className="px-5 py-3 text-left font-semibold text-foreground">Type</th>
              <th className="px-5 py-3 text-left font-semibold text-foreground">Status</th>
              <th className="px-5 py-3 text-left font-semibold text-foreground">Stage</th>
              <th className="px-5 py-3 text-left font-semibold text-foreground">Created By</th>
              <th className="px-5 py-3 text-left font-semibold text-foreground">Effective Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((eco) => (
              <tr key={eco.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3">
                  <Link to={`/ecos/${eco.id}`} className="font-mono text-sm text-muted-foreground hover:text-foreground">
                    {eco.id}
                  </Link>
                </td>
                <td className="px-5 py-3 font-medium text-foreground">
                  <Link to={`/ecos/${eco.id}`} className="hover:underline">{eco.title}</Link>
                </td>
                <td className="px-5 py-3">
                  <span className="rounded-sm bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground capitalize">{eco.type}</span>
                </td>
                <td className="px-5 py-3"><StatusBadge status={eco.status} /></td>
                <td className="px-5 py-3 text-sm text-muted-foreground">{eco.stage}</td>
                <td className="px-5 py-3 text-muted-foreground">{eco.createdBy}</td>
                <td className="px-5 py-3 text-muted-foreground">{eco.effectiveDate}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-muted-foreground">No ECOs found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
