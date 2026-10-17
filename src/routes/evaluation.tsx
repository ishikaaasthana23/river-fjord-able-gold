import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Badge, Shell } from "@/components/shell";
import { useSoc } from "@/stores/soc";

export const Route = createFileRoute("/evaluation")({ component: EvalPage });

function EvalPage() {
  const evals = useSoc((s) => s.evals);
  const runOne = useSoc((s) => s.runOneEval);
  const runAll = useSoc((s) => s.runAllEval);
  const reset = useSoc((s) => s.resetEval);
  const [only, setOnly] = useState<"all" | "open" | "fail">("all");
  const [open, setOpen] = useState<string | null>(null);
  const rows = evals.filter((c) => (only === "open" ? c.pass === undefined : only === "fail" ? c.pass === false : true));
  const detail = evals.find((c) => c.id === open);
  const passed = evals.filter((c) => c.pass).length;

  return (
    <Shell title="Golden Evaluation Suite">
      <p className="mb-4 max-w-2xl text-sm text-muted">
        Illustrative 20-case suite for the demo. Decisions are scripted to the expected verdict. They are not backend-verified security tests and are not official results.
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        <button type="button" className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-on" onClick={runAll}>Run mock suite</button>
        <button type="button" className="rounded-md border border-line px-3 py-2 text-sm" onClick={reset}>Reset</button>
        {(["all", "open", "fail"] as const).map((f) => (
          <button key={f} type="button" onClick={() => setOnly(f)} className={`rounded-md border px-3 py-2 text-sm ${only === f ? "border-accent text-accent" : "border-line"}`}>{f}</button>
        ))}
        <span className="self-center font-mono text-xs text-muted">{passed}/{evals.length} passing in this session</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="font-mono text-[11px] text-muted">
            <tr><th>Case</th><th>Scenario</th><th>Expected</th><th>Actual</th><th>Status</th><th>ms</th><th>Ledger</th><th /></tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-t border-line">
                <td className="py-2 font-mono text-xs">{c.id}</td>
                <td>{c.scenario}</td>
                <td><Badge v={c.expected} /></td>
                <td>{c.actual ? <Badge v={c.actual} /> : "—"}</td>
                <td>{c.pass === undefined ? "pending" : c.pass ? "pass" : "fail"}</td>
                <td className="font-mono">{c.ms ?? "—"}</td>
                <td>{c.ledgerOk === undefined ? "—" : c.ledgerOk ? "noted" : "no"}</td>
                <td className="space-x-2">
                  <button type="button" className="text-xs text-accent" onClick={() => runOne(c.id)}>Run</button>
                  <button type="button" className="text-xs text-accent" onClick={() => setOpen(c.id)}>Inspect</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {detail && (
        <div className="mt-4 rounded-md border border-line bg-card p-4 text-sm">
          <p className="font-mono text-xs text-accent">{detail.id}</p>
          <p className="mt-1">{detail.scenario}</p>
          <p className="mt-2 text-muted">Expected {detail.expected}. Mock runner echoes that decision. Not a certified test harness.</p>
          <button type="button" className="mt-2 text-xs text-accent" onClick={() => setOpen(null)}>Close</button>
        </div>
      )}
    </Shell>
  );
}
