import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Binary,
  Bug,
  ChevronLeft,
  FlaskConical,
  Gauge,
  Hexagon,
  LayoutDashboard,
  Radar,
  Search,
  Settings,
  Shield,
  Siren,
  Waypoints,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { ThemeSwitcher } from "@/components/theme";
import { SIM_STEPS, useSoc } from "@/stores/soc";

const NAV = [
  { to: "/", label: "Command Center", icon: LayoutDashboard },
  { to: "/threats", label: "Live Threat Monitor", icon: Siren },
  { to: "/ingestion", label: "Ingestion Engine", icon: Waypoints },
  { to: "/decoys", label: "Honey Decoy Lab", icon: Bug },
  { to: "/agents", label: "Agent Sandbox", icon: Hexagon },
  { to: "/egress", label: "Egress Warden", icon: Shield },
  { to: "/ledger", label: "Cryptographic Ledger", icon: Binary },
  { to: "/benchmarks", label: "Performance Benchmarks", icon: Gauge },
  { to: "/evaluation", label: "Golden Evaluation Suite", icon: FlaskConical },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function Shell({ title, children }: { title: string; children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const collapsed = useSoc((s) => s.collapsed);
  const toggle = useSoc((s) => s.toggleNav);
  const [mobileOpen, setMobileOpen] = useState(false);
  const query = useSoc((s) => s.query);
  const setQuery = useSoc((s) => s.setQuery);
  const notif = useSoc((s) => s.notifOpen);
  const setNotif = useSoc((s) => s.setNotif);
  const events = useSoc((s) => s.events);
  const agents = useSoc((s) => s.agents);
  const sim = useSoc((s) => s.simStatus);
  const idx = useSoc((s) => s.simIndex);
  const active = agents.filter((a) => a.status !== "idle").length || 2;

  return (
    <div className="grid-bg flex min-h-screen bg-bg text-fg">
      <aside
        className={`sticky top-0 hidden h-screen shrink-0 flex-col border-r border-line bg-bg-2 transition-[width] duration-200 md:flex ${collapsed ? "md:w-16" : "md:w-64"} ${mobileOpen ? "max-md:fixed max-md:z-40 max-md:flex max-md:w-64" : ""}`}
      >
        <div className="flex items-center gap-2 border-b border-line px-3 py-4">
          <Radar className="size-6 shrink-0 text-accent" aria-hidden />
          {!collapsed && (
            <div>
              <div className="text-sm font-semibold tracking-wide">MIRAGE-Z</div>
              <div className="font-mono text-[10px] text-muted">VALYRIAN TECH</div>
            </div>
          )}
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-2" aria-label="Primary">
          {NAV.map((item) => {
            const on = path === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                title={item.label}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm ${on ? "bg-elev text-accent ring-1 ring-accent/30" : "text-muted hover:bg-card hover:text-fg"}`}
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <button type="button" className="m-2 flex items-center justify-center gap-2 rounded-md border border-line py-2 text-xs text-muted" onClick={toggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          <ChevronLeft className={`size-4 ${collapsed ? "rotate-180" : ""}`} />
          {!collapsed && "Collapse"}
        </button>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex flex-wrap items-center gap-3 border-b border-line bg-bg/90 px-4 py-3 backdrop-blur">
          <button type="button" className="rounded-md border border-line px-2 py-1 text-xs md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-expanded={mobileOpen}>
            Menu
          </button>
          <h1 className="text-sm font-medium">{title}</h1>
          <span className="inline-flex items-center gap-1 rounded-full border border-line bg-card px-2 py-1 font-mono text-[10px] text-mint">
            <span className="pulse-dot size-1.5 rounded-full bg-mint" /> DEMO MODE
          </span>
          <span className="hidden items-center gap-1 font-mono text-[11px] text-muted sm:inline-flex">
            <Activity className="size-3 text-info" /> SYS NOMINAL · {active} agents
          </span>
          <label className="ml-auto flex min-w-40 flex-1 items-center gap-2 rounded-md border border-line bg-card px-2 py-1 md:max-w-xs">
            <Search className="size-3.5 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events, agents, rules"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
              aria-label="Search"
            />
          </label>
          <button type="button" className="relative rounded-md border border-line px-2 py-1 text-xs" onClick={() => setNotif(!notif)} aria-expanded={notif}>
            Alerts
            <span className="ml-1 rounded bg-crit px-1 text-[10px] text-on">{Math.min(events.length, 9)}</span>
          </button>
          <div className="hidden font-mono text-[11px] text-muted sm:block">SOC · VT</div>
          <ThemeSwitcher />
        </header>
        {notif && (
          <div className="border-b border-line bg-card px-4 py-2 text-sm" role="region" aria-label="Notifications">
            Latest: {events[0]?.type ?? "none"} · {events[0]?.decision}
            <button type="button" className="ml-3 text-xs text-accent" onClick={() => setNotif(false)}>Dismiss</button>
          </div>
        )}
        {sim !== "idle" && (
          <div className="border-b border-line bg-elev px-4 py-2 font-mono text-[11px] text-accent">
            Simulation {sim} · step {Math.max(idx + 1, 0)}/{SIM_STEPS.length}
            {idx >= 0 ? ` — ${SIM_STEPS[idx]}` : ""}
          </div>
        )}
        <main className="min-w-0 flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

export function Panel({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`lift rounded-md border border-line bg-card p-4 ${className}`}>
      <h2 className="mb-3 text-xs font-medium tracking-wide text-muted uppercase">{title}</h2>
      {children}
    </section>
  );
}

export function Badge({ v }: { v: string }) {
  const map: Record<string, string> = {
    ALLOW: "text-mint border-mint/40",
    BLOCK: "text-crit border-crit/50",
    REVIEW: "text-warn border-warn/50",
    CRITICAL: "text-crit",
    HIGH: "text-warn",
    MEDIUM: "text-info",
    LOW: "text-muted",
    INFO: "text-info",
  };
  return <span className={`rounded border border-line px-1.5 py-0.5 font-mono text-[10px] ${map[v] ?? ""}`}>{v}</span>;
}
