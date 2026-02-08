export interface Product {
  id: string;
  name: string;
  version: string;
  status: "active" | "archived";
  lastUpdated: string;
  description: string;
}

export interface BomItem {
  id: string;
  component: string;
  quantity: number;
  unit: string;
  operationTime: string;
  cost: number;
}

export interface BoM {
  id: string;
  productId: string;
  productName: string;
  version: string;
  status: "active" | "archived";
  items: BomItem[];
}

export interface ECO {
  id: string;
  title: string;
  type: "product" | "bom";
  status: "draft" | "submitted" | "under_review" | "approved" | "rejected" | "archived";
  stage: string;
  createdBy: string;
  createdDate: string;
  effectiveDate: string;
  targetProduct: string;
  description: string;
  changes?: string[];
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  entity: string;
  oldValue: string;
  newValue: string;
}

export const products: Product[] = [
  { id: "PRD-001", name: "Hydraulic Actuator Assembly", version: "3.2.1", status: "active", lastUpdated: "2026-02-05", description: "Main hydraulic actuator for landing gear systems" },
  { id: "PRD-002", name: "Avionics Control Module", version: "2.1.0", status: "active", lastUpdated: "2026-01-28", description: "Primary flight control avionics module" },
  { id: "PRD-003", name: "Fuel Injection Manifold", version: "1.4.2", status: "active", lastUpdated: "2026-02-01", description: "High-pressure fuel injection manifold assembly" },
  { id: "PRD-004", name: "Legacy Sensor Array", version: "5.0.0", status: "archived", lastUpdated: "2025-11-15", description: "Deprecated sensor array — replaced by PRD-002" },
  { id: "PRD-005", name: "Composite Wing Panel", version: "1.0.3", status: "active", lastUpdated: "2026-02-07", description: "Carbon-fiber composite structural wing panel" },
];

export const boms: BoM[] = [
  {
    id: "BOM-001", productId: "PRD-001", productName: "Hydraulic Actuator Assembly", version: "3.2.1", status: "active",
    items: [
      { id: "C1", component: "Piston Rod", quantity: 2, unit: "pcs", operationTime: "45 min", cost: 320 },
      { id: "C2", component: "Cylinder Housing", quantity: 1, unit: "pcs", operationTime: "120 min", cost: 890 },
      { id: "C3", component: "Hydraulic Seal Kit", quantity: 4, unit: "set", operationTime: "15 min", cost: 45 },
      { id: "C4", component: "Mounting Bracket", quantity: 2, unit: "pcs", operationTime: "30 min", cost: 210 },
    ],
  },
  {
    id: "BOM-002", productId: "PRD-002", productName: "Avionics Control Module", version: "2.1.0", status: "active",
    items: [
      { id: "C5", component: "PCB Main Board", quantity: 1, unit: "pcs", operationTime: "90 min", cost: 1200 },
      { id: "C6", component: "Processor Unit", quantity: 1, unit: "pcs", operationTime: "20 min", cost: 680 },
      { id: "C7", component: "Connector Harness", quantity: 3, unit: "pcs", operationTime: "25 min", cost: 95 },
    ],
  },
];

export const ecos: ECO[] = [
  { id: "ECO-2026-001", title: "Update Piston Rod Material Specification", type: "bom", status: "draft", stage: "Drafting", createdBy: "Sarah Chen", createdDate: "2026-02-06", effectiveDate: "2026-03-01", targetProduct: "PRD-001", description: "Change piston rod material from 4140 steel to 17-4PH stainless steel for improved corrosion resistance.", changes: ["Material: 4140 Steel → 17-4PH SS", "Cost: $320 → $385 per unit"] },
  { id: "ECO-2026-002", title: "Revise Avionics Module Connector Pinout", type: "product", status: "submitted", stage: "Technical Review", createdBy: "Sarah Chen", createdDate: "2026-02-03", effectiveDate: "2026-04-15", targetProduct: "PRD-002", description: "Revise connector pinout to support new sensor integration protocol.", changes: ["Pin 12: NC → Data In", "Pin 14: NC → Data Out", "Connector type: MIL-38999 → MIL-38999-III"] },
  { id: "ECO-2026-003", title: "Add Redundant Seal to Fuel Manifold", type: "bom", status: "under_review", stage: "Approval", createdBy: "Sarah Chen", createdDate: "2026-01-25", effectiveDate: "2026-02-28", targetProduct: "PRD-003", description: "Add secondary O-ring seal to prevent fuel leakage under high vibration conditions.", changes: ["Added: Secondary O-ring (Viton 75A)", "Quantity: 0 → 2 per assembly", "Cost impact: +$12/unit"] },
  { id: "ECO-2026-004", title: "Optimize Wing Panel Layup Sequence", type: "product", status: "approved", stage: "Completed", createdBy: "Sarah Chen", createdDate: "2026-01-10", effectiveDate: "2026-02-01", targetProduct: "PRD-005", description: "Optimize carbon fiber layup sequence for 8% weight reduction.", changes: ["Layup: [0/45/-45/90]s → [0/60/-60/0]s", "Weight: 12.4 kg → 11.4 kg"] },
  { id: "ECO-2026-005", title: "Downgrade Legacy Sensor Firmware", type: "product", status: "rejected", stage: "Rejected", createdBy: "Sarah Chen", createdDate: "2026-01-15", effectiveDate: "2026-02-15", targetProduct: "PRD-004", description: "Attempt to downgrade firmware on archived product.", changes: [] },
];

export const auditLogs: AuditEntry[] = [
  { id: "AUD-001", timestamp: "2026-02-07 14:32:01", user: "Sarah Chen", action: "Created ECO", entity: "ECO-2026-001", oldValue: "—", newValue: "Draft" },
  { id: "AUD-002", timestamp: "2026-02-06 09:15:22", user: "Sarah Chen", action: "Submitted ECO", entity: "ECO-2026-002", oldValue: "Draft", newValue: "Submitted" },
  { id: "AUD-003", timestamp: "2026-02-05 16:45:10", user: "James Morton", action: "Approved ECO", entity: "ECO-2026-004", oldValue: "Under Review", newValue: "Approved" },
  { id: "AUD-004", timestamp: "2026-02-04 11:20:33", user: "James Morton", action: "Rejected ECO", entity: "ECO-2026-005", oldValue: "Under Review", newValue: "Rejected" },
  { id: "AUD-005", timestamp: "2026-02-03 08:00:00", user: "Alex Turner", action: "Updated Config", entity: "Approval Stages", oldValue: "3 stages", newValue: "4 stages" },
  { id: "AUD-006", timestamp: "2026-02-02 13:30:45", user: "Sarah Chen", action: "Updated Draft", entity: "ECO-2026-003", oldValue: "v1", newValue: "v2" },
];
