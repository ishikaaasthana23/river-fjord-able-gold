import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Panel, Shell } from "@/components/shell";
import { useSoc } from "@/stores/soc";

export const Route = createFileRoute("/decoys")({ component: Decoys });

function Decoys() {
  const [kind, setKind] = useState<"luhn" | "iban">("luhn");
  const [copied, setCopied] = useState("");
  const decoys = useSoc((s) => s.decoys);
  const make = useSoc((s) => s.makeDecoy);

  return (
    <Shell title="Honey Decoy Lab">
      <p className="mb-4 max-w-2xl text-sm text-muted">
        Attributable decoys are synthetic identifiers that pass a checksum so they look plausible to an exfiltrating agent, then act as tripwires: if they leave the trust boundary, egress policy can block them. Checksum validity is not real-world account validity. All values here are synthetic test data.
      </p>
      <Panel title="Generate">
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-sm">Type
            <select value={kind} onChange={(e) => setKind(e.target.value as "luhn" | "iban")} className="ml-2 rounded-md border border-line bg-bg px-2 py-2">
              <option value="luhn">Luhn mod 10 (synthetic)</option>
              <option value="iban">IBAN mod 97 country ZZ (synthetic)</option>
            </select>
          </label>
          <button type="button" className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-on" onClick={() => make(kind)}>Generate</button>
        </div>
      </Panel>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="font-mono text-[11px] text-muted">
            <tr><th className="py-2">ID</th><th>Kind</th><th>Value</th><th>Checksum</th><th>Attribution</th><th /></tr>
          </thead>
          <tbody>
            {decoys.length === 0 && <tr><td colSpan={6} className="py-6 text-muted">No decoys yet. Generate one to register a tripwire in this demo.</td></tr>}
            {decoys.map((d) => (
              <tr key={d.id} className="border-t border-line">
                <td className="py-2 font-mono text-xs">{d.id}</td>
                <td>{d.kind}</td>
                <td className="font-mono text-xs">{d.value}</td>
                <td className={d.valid ? "text-mint" : "text-crit"}>{d.valid ? "math ok" : "fail"}</td>
                <td className="text-xs text-muted">{d.meta}</td>
                <td>
                  <button type="button" className="text-xs text-accent" onClick={() => { void navigator.clipboard.writeText(d.value); setCopied(d.id); }}>
                    {copied === d.id ? "Copied" : "Copy"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}
