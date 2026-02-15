"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
    const { login, isAuthenticated } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/dashboard");
        }
    }, [isAuthenticated, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(email, password);
            router.push("/dashboard");
        } catch {
            setError("Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (isAuthenticated) return null;

    return (
        <div className="flex min-h-screen">
            {/* Left panel */}
            <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12">
                <div className="flex items-center gap-3">
                    <Shield className="h-8 w-8 text-primary-foreground" />
                    <span className="text-xl font-bold text-primary-foreground tracking-tight">ECOFlow</span>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-primary-foreground leading-tight">
                        Engineering Change<br />Order Management
                    </h2>
                    <p className="mt-4 text-sm text-primary-foreground/70 max-w-md leading-relaxed">
                        Enterprise-grade product lifecycle management. Govern change orders, track approvals,
                        and maintain version integrity across your engineering organization.
                    </p>
                </div>
                <p className="text-xs text-primary-foreground/40">© 2026 ECOFlow Systems. All rights reserved.</p>
            </div>

            {/* Right panel */}
            <div className="flex flex-1 items-center justify-center bg-background p-8">
                <div className="w-full max-w-sm">
                    <div className="mb-8 lg:hidden flex items-center gap-2">
                        <Shield className="h-6 w-6 text-primary" />
                        <span className="text-lg font-bold text-foreground">ECOFlow</span>
                    </div>

                    <h1 className="text-2xl font-bold text-foreground">Sign in</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Enter your credentials to access the system
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        {error && (
                            <div className="flex items-center gap-2 rounded-md bg-status-rejected-bg border border-status-rejected/20 px-3 py-2 text-sm text-status-rejected-foreground">
                                <AlertCircle className="h-4 w-4 shrink-0 text-status-rejected" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">Email</label>
                            <Input
                                type="email"
                                placeholder="you@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-10"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">Password</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-10"
                            />
                        </div>

                        <Button type="submit" className="w-full h-10" disabled={loading}>
                            {loading ? "Signing in…" : "Sign in"}
                        </Button>
                    </form>

                    <div className="mt-8 rounded-md bg-muted p-3">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Demo accounts (any password):</p>
                        <div className="space-y-1 text-xs text-muted-foreground">
                            <p><span className="font-mono">eng@ecoflow.com</span> — Engineering</p>
                            <p><span className="font-mono">approver@ecoflow.com</span> — Approver</p>
                            <p><span className="font-mono">ops@ecoflow.com</span> — Operations</p>
                            <p><span className="font-mono">admin@ecoflow.com</span> — Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
