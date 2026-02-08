import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, type UserRole } from "@/contexts/AuthContext";
import {
  LayoutDashboard, Package, Layers, FileText, CheckSquare,
  BarChart3, ScrollText, Settings, LogOut, ChevronLeft, ChevronRight, Shield,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationBell } from "@/components/NotificationBell";
import { Input } from "@/components/ui/input";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  roles?: UserRole[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Products", path: "/products", icon: Package },
  { label: "Bills of Materials", path: "/bom", icon: Layers },
  { label: "Change Orders", path: "/ecos", icon: FileText },
  { label: "Approvals", path: "/approvals", icon: CheckSquare, roles: ["approver", "admin"] },
  { label: "Reports", path: "/reports", icon: BarChart3 },
  { label: "Audit Logs", path: "/audit-logs", icon: ScrollText },
  { label: "Settings", path: "/settings", icon: Settings, roles: ["admin"] },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const visibleItems = navItems.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role))
  );

  const roleLabels: Record<UserRole, string> = {
    engineering: "Engineering",
    approver: "Approver",
    operations: "Operations",
    admin: "Administrator",
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-200 border-r border-sidebar-border",
          collapsed ? "w-16" : "w-60"
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
          <Shield className="h-6 w-6 shrink-0 text-sidebar-primary" />
          {!collapsed && (
            <span className="text-base font-bold text-sidebar-accent-foreground tracking-tight">
              ECOFlow
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {visibleItems.map((item) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="h-4.5 w-4.5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User + Collapse */}
        <div className="border-t border-sidebar-border p-3 space-y-2">
          {!collapsed && user && (
            <div className="px-2 mb-2">
              <p className="text-xs font-semibold text-sidebar-accent-foreground truncate">{user.name}</p>
              <p className="text-xs text-sidebar-muted truncate">{roleLabels[user.role]}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
            title="Logout"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center gap-3 rounded-md px-3 py-1.5 text-xs text-sidebar-muted hover:text-sidebar-foreground transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b border-border bg-card px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-semibold text-foreground">
              {visibleItems.find((i) => location.pathname.startsWith(i.path))?.label ?? "ECOFlow"}
            </h1>
            {/* Search */}
            <div className="relative hidden md:flex">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search ECOs, products..."
                className="h-8 w-64 pl-8 text-xs bg-muted/50 border-transparent focus:border-border focus:bg-background"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <NotificationBell />
            
            {/* User info */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                <span className="font-medium text-foreground">{user?.name}</span>
              </span>
              <span className="rounded-sm bg-muted px-2 py-0.5 text-xs font-medium">
                {user ? roleLabels[user.role] : ""}
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
