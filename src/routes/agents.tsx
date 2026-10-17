import { createFileRoute } from "@tanstack/react-router";
import { Badge, Panel, Shell } from "@/components/shell";
import { useSoc } from "@/stores/soc";

export const Route = createFileRoute("/agents")({ component: Agents });

function Agents() {
  const agents = useSoc((s) => s.agents);
  const sel = useSoc((s) => s.selectedAgent);
  const setAgent = useSoc((s) => s.setAgent);
  const open = agents.find((a) => a.id === sel) ?? agents[0];

  return (
    <Shell title="Agent Sandbox">
      <p className="mb-4 max-w-2xl text-sm text-muted">Execution here is simulated. It is not a hardware or VM isolate. Authorized calls stay inside declared tools. Unauthorized outbound calls are what the egress warden is meant to stop.</p>
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <ul className="space-y-2">
          {agents.map((a) => (
            <li key={a.id}>
              <button type="button" onClick={() => setAgent(a.id)} className={`w-full rounded-md border p-3 text-left ${open?.id === a.id ? "border-accent bg-card" : "border-line"}`}>
                <div className="text-sm font-medium">{a.name}</div>
                <div className="font-mono text-[11px] text-muted">{a.id} · {a.status}</div>
              </button>
            </li>
          ))}
        </ul>
        {open && (
          <Panel title="Inspection">
            <p className="font-mono text-xs text-muted">{open.id}</p>
            <p className="mt-1 text-sm">Status <Badge v={open.status.toUpperCase()} /></p>
            <p className="mt-2 text-sm text-muted">Permissions: {open.permissions.join(", ")}</p>
            <h3 className="mt-4 text-xs tracking-wide text-muted uppercase">Tool timeline</h3>
            <ol className="mt-2 space-y-2">
              {open.calls.map((c, i) => (
                <li key={i} className="rounded-md border border-line bg-bg-2 p-2 text-sm">
                  <span className="font-mono text-xs">{c.tool}</span> · {c.kind}
                  <div className="text-muted">{c.detail}</div>
                </li>
              ))}
            </ol>
          </Panel>
        )}
      </div>
    </Shell>
  );
}
