import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { products, boms } from "@/data/mockData";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export default function ECOCreate() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "",
    type: "product" as "product" | "bom",
    targetProduct: "",
    effectiveDate: "",
    description: "",
    bumpVersion: true,
  });

  const canProceed = form.title && form.targetProduct && form.effectiveDate;

  return (
    <div className="space-y-6 max-w-2xl">
      <Link to="/ecos" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Change Orders
      </Link>

      <div>
        <h2 className="text-2xl font-bold text-foreground">Create Engineering Change Order</h2>
        <p className="text-sm text-muted-foreground">New ECOs are created as Draft status</p>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center gap-4">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
              step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {step > s ? <Check className="h-3.5 w-3.5" /> : s}
            </div>
            <span className={`text-sm font-medium ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
              {s === 1 ? "ECO Details" : "Change Description"}
            </span>
            {s < 2 && <div className="h-px w-8 bg-border" />}
          </div>
        ))}
      </div>

      <div className="bg-card rounded-lg border enterprise-shadow p-6">
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">ECO Title *</label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g., Update Piston Rod Material Specification"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Change Type *</label>
              <div className="flex gap-3">
                {(["product", "bom"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setForm({ ...form, type: t, targetProduct: "" })}
                    className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                      form.type === t
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t === "product" ? "Product Change" : "BoM Change"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Target {form.type === "product" ? "Product" : "BoM"} *</label>
              <select
                value={form.targetProduct}
                onChange={(e) => setForm({ ...form, targetProduct: e.target.value })}
                className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground"
              >
                <option value="">Select…</option>
                {(form.type === "product" ? products : boms).map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.id} — {"name" in item ? item.name : item.productName}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Effective Date *</label>
              <Input
                type="date"
                value={form.effectiveDate}
                onChange={(e) => setForm({ ...form, effectiveDate: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.bumpVersion}
                onChange={(e) => setForm({ ...form, bumpVersion: e.target.checked })}
                className="rounded border-input"
                id="bump"
              />
              <label htmlFor="bump" className="text-sm text-muted-foreground">
                Automatically increment version on approval
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Change Description</label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the proposed changes in detail…"
                rows={6}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              This ECO will be saved as <strong>Draft</strong>. You can edit it before submitting for approval.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
          ) : <div />}

          {step < 2 ? (
            <Button onClick={() => setStep(2)} disabled={!canProceed}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={() => navigate("/ecos")}>
              Save as Draft
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
