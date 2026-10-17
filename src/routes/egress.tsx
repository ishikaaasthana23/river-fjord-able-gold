import { createFileRoute } from "@tanstack/react-router";
import { Badge, Panel, Shell } from "@/components/shell";
import { useSoc } from "@/stores/soc";

export const Route = createFileRoute("/egress")({ component: Egress });

function Egress() {
  const rows = useSoc((s) => s.egress);
  const q = useSoc((s) => s.query).toLowerCase();
  const sel = useSoc((s) => s.selectedEgress);
  const setEgress = useSoc((s) => s.setEgress);
  const filtered = rows.filter((r) => `${r.id} ${r.agent} ${r.destination} ${r.rule}`.toLowerCase().includes(q));
  const open = rows.find((r) => r.id === sel);
  const blocked = rows.filter((r) => r.verdict === "BLOCK").length;
  const allowed = rows.filter((r) => r.verdict === "ALLOW").length;

  return (
    <Shell title="Egress Warden">
      <p className="mb-4 max-w-2xl text-sm text-muted">Deterministic demo rule: any outbound request tagged with a registered decoy signature is BLOCK. Launch the command-center simulation to reproduce SIM-REQ.</p>
      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        {[
          ["Inspected", rows.length + 40],
          ["Allowed", allowed],
          ["Blocked", blocked],
          ["Median mock latency", "0.4 ms"],
        ].map(([k, v]) => (
          <div key={String(k)} className="rounded-md border border-line bg-card p-3">
            <div className="text-xs text-muted">{k}</div>
            <div className="font-mono text-xl">{v}</div>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="font-mono text-[11px] text-muted">
            <tr><th>Request</th><th>Agent</th><th>Destination</th><th>Time</th><th>Rule</th><th>Verdict</th><th>ms</th></tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="cursor-pointer border-t border-line" onClick={() => setEgress(r.id)}>
                <td className="py-2 font-mono text-xs">{r.id}</td>
                <td>{r.agent}</td>
                <td>{r.destination}</td>
                <td className="font-mono text-[11px]">{r.ts}</td>
                <td>{r.rule}</td>
                <td><Badge v={r.verdict} /></td>
                <td className="font-mono">{r.ms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && (
        <Panel title="Request inspection" className="mt-4">
          <p className="text-sm">Rule <span className="font-mono">{open.rule}</span> produced <Badge v={open.verdict} /> for {open.agent} → {open.destination}.</p>
          {open.verdict === "BLOCK" && <p className="mt-2 text-sm text-muted">Match is the registered honey-decoy signature. The ledger records the block; it does not perform it.</p>}
          <button type="button" className="mt-2 text-xs text-accent" onClick={() => setEgress(null)}>Close</button>
        </Panel>
      )}
    </Shell>
  );
}
