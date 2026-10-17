import { createFileRoute } from "@tanstack/react-router";
import { Binary, Bug, Fingerprint, ShieldAlert, ShieldCheck, Waypoints } from "lucide-react";
import { Badge, Panel, Shell } from "@/components/shell";
import { SIM_STEPS, useSoc } from "@/stores/soc";

export const Route = createFileRoute("/")({ component: Command });

const LAYERS = [
  { n: "01", name: "Ingest Engine", info: "Detect & tokenize", icon: Waypoints },
  { n: "02", name: "Decoy Engine", info: "Attributable tripwires", icon: Bug },
  { n: "03", name: "Agent Sandbox", info: "Simulated tool use", icon: Fingerprint },
  { n: "04", name: "Egress Warden", info: "Deterministic block", icon: ShieldAlert },
  { n: "05", name: "Hash Ledger", info: "Append-only audit", icon: Binary },
];

function Command() {
  const eventsAll = useSoc((s) => s.events);
  const decoys = useSoc((s) => s.decoys);
  const egress = useSoc((s) => s.egress);
  const hits = useSoc((s) => s.hits);
  const c = {
    ingest: 128 + eventsAll.filter((e) => e.type.includes("Sensitive") || e.type.includes("Ingest")).length,
    tokens: 64 + hits.length + eventsAll.filter((e) => e.type.includes("Token")).length,
    decoys: decoys.length,
    inspected: egress.length + 40,
    blocked: egress.filter((e) => e.verdict === "BLOCK").length,
  };
  const chain = useSoc((s) => s.chainOk);
  const layer = useSoc((s) => s.selectedLayer);
  const setLayer = useSoc((s) => s.setLayer);
  const idx = useSoc((s) => s.simIndex);
  const status = useSoc((s) => s.simStatus);
  const launch = useSoc((s) => s.launch);
  const pause = useSoc((s) => s.pause);
  const resume = useSoc((s) => s.resume);
  const reset = useSoc((s) => s.resetSim);
  const step = useSoc((s) => s.step);
  const replay = useSoc((s) => s.replay);
  const events = eventsAll.slice(0, 5);

  const metrics = [
    { label: "Ingestion events", value: c.ingest, unit: "events", ok: true, icon: Waypoints },
    { label: "Elements tokenized", value: c.tokens, unit: "fields", ok: true, icon: Fingerprint },
    { label: "Decoys deployed", value: c.decoys, unit: "tripwires", ok: true, icon: Bug },
    { label: "Requests inspected", value: c.inspected, unit: "outbound", ok: true, icon: ShieldCheck },
    { label: "Exfil blocked", value: c.blocked, unit: "blocks", ok: c.blocked === 0, icon: ShieldAlert },
    { label: "Ledger integrity", value: chain === false ? "FAIL" : chain ? "OK" : "UNVERIFIED", unit: "sha-256 chain", ok: chain !== false, icon: Binary },
  ];

  const activeLayer = idx < 0 ? -1 : Math.min(idx <= 1 ? 0 : idx === 2 ? 1 : idx === 3 ? 2 : idx <= 5 ? 3 : 4, 4);

  return (
    <Shell title="Command Center">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-accent">MIRAGE-Z</p>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Autonomous Zero-Trust Egress Warden</h2>
          <p className="mt-1 max-w-xl text-sm text-muted">Deterministic AI security. Attributable deception. Cryptographic accountability.</p>
        </div>
        <div className="rounded-md border border-line bg-card px-3 py-2 font-mono text-[11px]">
          <span className="text-mint">STATUS</span> demonstration · local mock · not enforcement
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button type="button" className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-on" onClick={launch}>Launch security simulation</button>
        <button type="button" className="rounded-md border border-line px-3 py-2 text-sm" onClick={pause} disabled={status !== "running"}>Pause</button>
        <button type="button" className="rounded-md border border-line px-3 py-2 text-sm" onClick={resume} disabled={status !== "paused"}>Resume</button>
        <button type="button" className="rounded-md border border-line px-3 py-2 text-sm" onClick={step}>Step forward</button>
        <button type="button" className="rounded-md border border-line px-3 py-2 text-sm" onClick={replay}>Replay</button>
        <button type="button" className="rounded-md border border-line px-3 py-2 text-sm" onClick={reset}>Reset</button>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <article key={m.label} className="lift rounded-md border border-line bg-card p-4">
              <div className="flex items-center justify-between text-muted">
                <span className="text-xs">{m.label}</span>
                <Icon className="size-4 text-accent" />
              </div>
              <div className="mt-2 font-mono text-2xl">{m.value}</div>
              <div className="mt-1 flex items-center justify-between text-[11px] text-muted">
                <span>{m.unit}</span>
                <span className={m.ok ? "text-mint" : "text-crit"}>{m.ok ? "nominal" : "attention"}</span>
              </div>
            </article>
          );
        })}
      </div>

      <Panel title="Five-layer pipeline · demonstration flow">
        <div className="overflow-x-auto">
          <div className="flex min-w-[720px] items-stretch gap-2">
            {LAYERS.map((L, i) => {
              const Icon = L.icon;
              const hot = i === activeLayer && status !== "idle";
              const blocked = i === 3 && idx >= 5;
              return (
                <button
                  key={L.n}
                  type="button"
                  onClick={() => setLayer(layer === i ? null : i)}
                  className={`flex-1 rounded-md border p-3 text-left ${hot ? "border-accent bg-elev" : "border-line bg-bg-2"} ${blocked ? "ring-1 ring-crit" : ""}`}
                >
                  <div className="font-mono text-[10px] text-accent">LAYER {L.n}</div>
                  <Icon className="my-2 size-4" />
                  <div className="text-sm font-medium">{L.name}</div>
                  <div className="text-[11px] text-muted">{L.info}</div>
                  <div className="mt-2 font-mono text-[10px] text-muted">{hot ? "active" : "standby"}</div>
                </button>
              );
            })}
          </div>
        </div>
        <svg viewBox="0 0 720 16" className="mt-2 h-4 w-full" aria-hidden>
          <line x1="20" y1="8" x2="700" y2="8" className="flow-dash" stroke="var(--secondary)" strokeWidth="1.5" />
        </svg>
        {layer !== null && (
          <p className="mt-3 text-sm text-muted">
            {LAYERS[layer].name}: {LAYERS[layer].info}. The ledger records decisions; it does not block traffic. Egress warden is the enforcement point in this architecture. Figures and events here are simulated.
          </p>
        )}
        <ol className="mt-3 grid gap-1 text-[12px] text-muted md:grid-cols-2">
          {SIM_STEPS.map((s, i) => (
            <li key={s} className={i === idx ? "text-accent" : ""}>{i + 1}. {s}</li>
          ))}
        </ol>
      </Panel>

      <Panel title="Recent security timeline" className="mt-4">
        <ul className="space-y-2">
          {events.map((e) => (
            <li key={e.id} className="flex flex-wrap items-center gap-2 border-b border-line pb-2 text-sm last:border-0">
              <span className="font-mono text-[11px] text-muted">{e.id}</span>
              <span>{e.type}</span>
              <Badge v={e.severity} />
              <span className="ml-auto font-mono text-[11px] text-muted">{e.agentId}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </Shell>
  );
}
