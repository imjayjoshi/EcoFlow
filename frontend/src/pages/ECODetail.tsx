import { useParams, Link, useNavigate } from "react-router-dom";
import { ecos } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ECODetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const eco = ecos.find((e) => e.id === id);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  if (!eco) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">ECO not found</p>
        <Link to="/ecos" className="text-sm text-primary hover:underline mt-2 inline-block">Back to ECOs</Link>
      </div>
    );
  }

  const isEngineer = user?.role === "engineering";
  const isApprover = user?.role === "approver" || user?.role === "admin";
  const isDraft = eco.status === "draft";
  const isReviewable = eco.status === "submitted" || eco.status === "under_review";

  return (
    <div className="space-y-6 max-w-5xl">
      <Link to="/ecos" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Change Orders
      </Link>

      {/* Header */}
      <div className="bg-card rounded-lg border enterprise-shadow p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-sm text-muted-foreground">{eco.id}</span>
              <StatusBadge status={eco.status} />
              <span className="rounded-sm bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground capitalize">{eco.type}</span>
            </div>
            <h2 className="text-xl font-bold text-foreground">{eco.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{eco.description}</p>
          </div>
          {isDraft && (
            <span className="rounded-sm bg-status-draft-bg border border-status-draft/20 px-2 py-0.5 text-xs font-medium text-status-draft-foreground">
              Editable
            </span>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Stage</p>
            <p className="font-medium text-foreground">{eco.stage}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Created By</p>
            <p className="font-medium text-foreground">{eco.createdBy}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Created Date</p>
            <p className="font-medium text-foreground">{eco.createdDate}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Effective Date</p>
            <p className="font-medium text-foreground">{eco.effectiveDate}</p>
          </div>
        </div>
      </div>

      {/* Comparison View */}
      {eco.changes && eco.changes.length > 0 && (
        <div className="bg-card rounded-lg border enterprise-shadow">
          <div className="border-b px-5 py-3">
            <h3 className="text-sm font-semibold text-foreground">Proposed Changes</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
            <div className="p-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Current Version</p>
              {eco.changes.map((change, i) => {
                const [label, values] = change.split(": ");
                const [oldVal] = (values || "").split(" → ");
                return (
                  <div key={i} className="mb-2 rounded-sm bg-diff-removed p-2 text-sm">
                    <span className="font-medium text-foreground">{label}:</span>{" "}
                    <span className="text-muted-foreground">{oldVal || "—"}</span>
                  </div>
                );
              })}
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Proposed Version</p>
              {eco.changes.map((change, i) => {
                const [label, values] = change.split(": ");
                const parts = (values || "").split(" → ");
                const newVal = parts.length > 1 ? parts[1] : parts[0];
                return (
                  <div key={i} className="mb-2 rounded-sm bg-diff-added p-2 text-sm">
                    <span className="font-medium text-foreground">{label}:</span>{" "}
                    <span className="text-muted-foreground">{newVal}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="bg-card rounded-lg border enterprise-shadow p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Actions</h3>
        <div className="flex flex-wrap gap-3">
          {isDraft && isEngineer && (
            <>
              <Button variant="outline" disabled>Save Draft</Button>
              <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
                <AlertDialogTrigger asChild>
                  <Button>Submit for Approval</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-status-draft" />
                      Submit ECO for Approval
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      After submission, this ECO will be <strong>locked for editing</strong>. 
                      You will not be able to modify the proposed changes until it is sent back for rework.
                      Are you sure you want to proceed?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Confirm Submission</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}

          {isReviewable && isApprover && (
            <>
              <Button className="bg-status-approved hover:bg-status-approved/90 text-primary-foreground">
                <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
              </Button>
              <Button variant="destructive">
                <XCircle className="mr-2 h-4 w-4" /> Reject
              </Button>
              <Button variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" /> Send Back for Rework
              </Button>
            </>
          )}

          {!isDraft && !isReviewable && (
            <p className="text-sm text-muted-foreground">No actions available for this ECO status.</p>
          )}

          {isDraft && !isEngineer && (
            <p className="text-sm text-muted-foreground">Only engineering users can modify draft ECOs.</p>
          )}

          {isReviewable && !isApprover && (
            <p className="text-sm text-muted-foreground">This ECO is under review. Only approvers can take action.</p>
          )}
        </div>
      </div>
    </div>
  );
}
