import { createFileRoute } from "@tanstack/react-router";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Badge, Panel, Shell } from "@/components/shell";
import { useSoc } from "@/stores/soc";
import { useState } from "react";
import { useTheme } from "@/components/theme";

export const Route = createFileRoute("/threats")({ component: Threats });

const SEV = ["INFO", "LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;

function Threats() {
  const events = useSoc((s) => s.events);
  const q = useSoc((s) => s.query).toLowerCase();
  const sel = useSoc((s) => s.selectedEvent);
  const setEvent = useSoc((s) => s.setEvent);
  const [sev, setSev] = useState<string>("ALL");
  const { resolved } = useTheme();
  const fills = resolved === "light"
    ? ["#64748b", "#0369a1", "#b45309", "#6d28d9", "#be123c"]
    : ["#a1a1b5", "#67e8f9", "#fbbf24", "#c084fc", "#fb7185"];
  const filtered = events.filter((e) => (sev === "ALL" || e.severity === sev) && (`${e.type} ${e.agentId} ${e.rule} ${e.id}`.toLowerCase().includes(q)));
  const dist = SEV.map((s) => ({ name: s, value: events.filter((e) => e.severity === s).length || 0 }));
  const open = events.find((e) => e.id === sel);

  return (
    <Shell title="Live Threat Monitor">
      <p className="mb-4 text-sm text-muted">Streaming-style timeline fed by the local demonstration store. Sensitive previews stay masked.</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {["ALL", ...SEV].map((s) => (
          <button key={s} type="button" onClick={() => setSev(s)} className={`rounded-md border px-2 py-1 text-xs ${sev === s ? "border-accent text-accent" : "border-line text-muted"}`}>{s}</button>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        <Panel title="Severity mix">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dist} dataKey="value" nameKey="name" innerRadius={36} outerRadius={60}>
                  {dist.map((_, i) => <Cell key={`${resolved}-${i}`} fill={fills[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Events">
          <ul className="max-h-[480px] space-y-2 overflow-auto">
            {filtered.length === 0 && <li className="text-sm text-muted">No events match this filter.</li>}
            {filtered.map((e) => (
              <li key={e.id}>
                <button type="button" className="w-full rounded-md border border-line bg-bg-2 p-3 text-left" onClick={() => setEvent(e.id)}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px]">{e.id}</span>
                    <Badge v={e.severity} />
                    <span className="text-sm">{e.type}</span>
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-muted">{e.ts} · {e.agentId} · {e.source} → {e.destination}</div>
                </button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      {open && (
        <Panel title="Incident drawer" className="mt-4">
          <dl className="grid gap-2 text-sm sm:grid-cols-2">
            <div><dt className="text-muted">Event</dt><dd className="font-mono">{open.id}</dd></div>
            <div><dt className="text-muted">Time</dt><dd className="font-mono">{open.ts}</dd></div>
            <div><dt className="text-muted">Agent</dt><dd>{open.agentId}</dd></div>
            <div><dt className="text-muted">Rule</dt><dd>{open.rule}</dd></div>
            <div><dt className="text-muted">Decision</dt><dd>{open.decision}</dd></div>
            <div><dt className="text-muted">Ledger</dt><dd className="font-mono">{open.ledgerId ?? "—"}</dd></div>
            <div className="sm:col-span-2"><dt className="text-muted">Masked preview</dt><dd>{open.preview}</dd></div>
          </dl>
          <button type="button" className="mt-3 text-xs text-accent" onClick={() => setEvent(null)}>Close</button>
        </Panel>
      )}
    </Shell>
  );
}
