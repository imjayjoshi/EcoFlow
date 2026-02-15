"use client";

import { Settings as SettingsIcon, AlertTriangle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Settings() {
    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h2 className="text-2xl font-bold text-foreground">Settings</h2>
                <p className="text-sm text-muted-foreground">System configuration and preferences</p>
            </div>

            <div className="bg-card rounded-lg border enterprise-shadow p-6 space-y-6">
                <div>
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
                        <SettingsIcon className="h-4 w-4" /> ECO Configuration
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="text-sm font-medium text-foreground">ECO Stages</label>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Draft → Submitted → Under Review → Approved / Rejected
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-foreground">Approval Rules</label>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                At least 1 approver required for standard changes
                            </p>
                        </div>
                    </div>
                </div>

                <hr />

                <div>
                    <h3 className="text-sm font-semibold text-foreground mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="rounded border-input" />
                            <span className="text-sm text-foreground">Email notifications for ECO updates</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="rounded border-input" />
                            <span className="text-sm text-foreground">Notify on approval requests</span>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded border-input" />
                            <span className="text-sm text-foreground">Daily digest summary</span>
                        </label>
                    </div>
                </div>

                <hr />

                <div>
                    <h3 className="text-sm font-semibold text-foreground mb-4">Roles & Permissions</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong className="text-foreground">Engineering:</strong> Create, edit, submit ECOs</p>
                        <p><strong className="text-foreground">Approver:</strong> Review, approve, reject ECOs</p>
                        <p><strong className="text-foreground">Operations:</strong> View products, BoMs, reports</p>
                        <p><strong className="text-foreground">Admin:</strong> Full access + system configuration</p>
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <Button>
                        <Save className="mr-2 h-4 w-4" /> Save Preferences
                    </Button>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-card rounded-lg border border-status-rejected/20 enterprise-shadow p-6">
                <h3 className="text-sm font-semibold text-status-rejected flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-4 w-4" /> Danger Zone
                </h3>
                <p className="text-sm text-muted-foreground">
                    These actions are irreversible. Please proceed with caution.
                </p>
                <div className="mt-4 flex gap-3">
                    <Button variant="destructive" size="sm" disabled>
                        Reset All Drafts
                    </Button>
                    <Button variant="destructive" size="sm" disabled>
                        Clear Audit Logs
                    </Button>
                </div>
            </div>
        </div>
    );
}
