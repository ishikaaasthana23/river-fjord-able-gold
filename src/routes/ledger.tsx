import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Panel, Shell } from "@/components/shell";
import { appendLedger } from "@/lib/mirage/engine";
import { useSoc } from "@/stores/soc";

export const Route = createFileRoute("/ledger")({ component: LedgerPage });

function LedgerPage() {
  const ledger = useSoc((s) => s.ledger);
  const chainOk = useSoc((s) => s.chainOk);
  const verify = useSoc((s) => s.verify);
  const [focus, setFocus] = useState<string | null>(null);
  const open = ledger.find((e) => e.id === focus);
  const latest = ledger[ledger.length - 1];

  return (
    <Shell title="Cryptographic Ledger">
      <p className="mb-4 max-w-2xl text-sm text-muted">
        Demonstration sequential SHA-256 hash chain via Web Crypto. This is not a Merkle tree and does not claim CPACF or LinuxONE acceleration.
      </p>
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Stat k="Entries" v={String(ledger.length)} />
        <Stat k="Latest hash" v={latest ? latest.hash.slice(0, 18) + "…" : "—"} />
        <Stat k="Verification" v={chainOk === null ? "not run" : chainOk ? "intact" : "broken"} />
      </div>
      <button
        type="button"
        className="mb-4 rounded-md bg-accent px-3 py-2 text-sm font-medium text-on"
        onClick={() => {
          if (ledger.length === 0) {
            void appendLedger(undefined, "GENESIS_NOTE", "seed:demo-chain").then((e) => {
              useSoc.setState({ ledger: [e], chainOk: null });
            });
            return;
          }
          void verify();
        }}
      >
        {ledger.length === 0 ? "Seed chain" : "Verify integrity"}
      </button>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {ledger.map((e, i) => (
          <button key={e.id} type="button" onClick={() => setFocus(e.id)} className="min-w-36 rounded-md border border-line bg-card p-2 text-left">
            <div className="font-mono text-[10px] text-accent">{e.id}</div>
            <div className="text-xs">{e.eventType}</div>
            {i < ledger.length - 1 && <div className="text-[10px] text-muted">links →</div>}
          </button>
        ))}
        {ledger.length === 0 && <p className="text-sm text-muted">Empty chain. Seed it or finish the simulation.</p>}
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="font-mono text-[11px] text-muted"><tr><th>ID</th><th>Time</th><th>Type</th><th>Prev</th><th>Hash</th></tr></thead>
          <tbody>
            {ledger.map((e) => (
              <tr key={e.id} className="border-t border-line">
                <td className="py-2 font-mono text-xs">{e.id}</td>
                <td className="font-mono text-[11px]">{e.ts}</td>
                <td>{e.eventType}</td>
                <td className="font-mono text-[11px]">{e.prevHash.slice(0, 10)}…</td>
                <td className="font-mono text-[11px]">{e.hash.slice(0, 10)}…</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {open && (
        <Panel title="Linked event" className="mt-4">
          <p className="font-mono text-xs break-all">{open.hash}</p>
          <p className="mt-2 text-sm">{open.payload}</p>
          <button type="button" className="mt-2 text-xs text-accent" onClick={() => setFocus(null)}>Close</button>
        </Panel>
      )}
    </Shell>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-md border border-line bg-card p-3">
      <div className="text-xs text-muted">{k}</div>
      <div className="font-mono text-sm">{v}</div>
    </div>
  );
}
