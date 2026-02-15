"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "engineering" | "approver" | "operations" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for demo
const MOCK_USERS: Record<string, User> = {
  "eng@ecoflow.com": { id: "1", name: "Sarah Chen", email: "eng@ecoflow.com", role: "engineering" },
  "approver@ecoflow.com": { id: "2", name: "James Morton", email: "approver@ecoflow.com", role: "approver" },
  "ops@ecoflow.com": { id: "3", name: "Maria Lopez", email: "ops@ecoflow.com", role: "operations" },
  "admin@ecoflow.com": { id: "4", name: "Alex Turner", email: "admin@ecoflow.com", role: "admin" },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const stored = localStorage.getItem("ecoflow_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem("ecoflow_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 600));
    const found = MOCK_USERS[email.toLowerCase()];
    if (!found) throw new Error("Invalid credentials");
    setUser(found);
    localStorage.setItem("ecoflow_user", JSON.stringify(found));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("ecoflow_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
