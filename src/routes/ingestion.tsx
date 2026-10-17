import { createFileRoute } from "@tanstack/react-router";
import { Panel, Shell } from "@/components/shell";
import { useSoc } from "@/stores/soc";

export const Route = createFileRoute("/ingestion")({ component: Ingest });

function Ingest() {
  const payload = useSoc((s) => s.payload);
  const setPayload = useSoc((s) => s.setPayload);
  const run = useSoc((s) => s.runIngest);
  const out = useSoc((s) => s.tokenized);
  const hits = useSoc((s) => s.hits);
  const ms = useSoc((s) => s.ingestMs);

  return (
    <Shell title="Ingestion Engine">
      <p className="mb-4 max-w-2xl text-sm text-muted">Local deterministic mock. Highlighting and tokens run in the browser only. This is not enterprise-grade protection.</p>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Input payload">
          <textarea value={payload} onChange={(e) => setPayload(e.target.value)} className="h-56 w-full rounded-md border border-line bg-bg p-3 font-mono text-xs" aria-label="Payload editor" />
          <button type="button" className="mt-3 rounded-md bg-accent px-3 py-2 text-sm font-medium text-on" onClick={run}>Run mock detection</button>
          {ms !== null && <p className="mt-2 font-mono text-[11px] text-muted">Mock processing {ms} ms · {hits.length} hits</p>}
        </Panel>
        <Panel title="Detection">
          {hits.length === 0 && <p className="text-sm text-muted">Run detection to list masked hits.</p>}
          <ul className="space-y-1 text-sm">
            {hits.map((h, i) => <li key={i} className="font-mono text-xs">{h.name}: {h.sample}</li>)}
          </ul>
        </Panel>
        <Panel title="Original" className="lg:col-span-1">
          <pre className="overflow-auto whitespace-pre-wrap font-mono text-xs text-muted">{payload}</pre>
        </Panel>
        <Panel title="Tokenized preview">
          <pre className="overflow-auto whitespace-pre-wrap font-mono text-xs text-mint">{out || "—"}</pre>
        </Panel>
      </div>
    </Shell>
  );
}
