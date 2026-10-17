import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Panel, Shell } from "@/components/shell";
import { useTheme } from "@/components/theme";

export const Route = createFileRoute("/benchmarks")({ component: Bench });

const proposed = [
  { name: "In-memory target", ms: 2 },
  { name: "Cloud API compare", ms: 800 },
];

function Bench() {
  const { resolved } = useTheme();
  const axis = resolved === "light" ? "#64748b" : "#a1a1b5";
  const bar = resolved === "light" ? "#6d28d9" : "#a78bfa";
  return (
    <Shell title="Performance Benchmarks">
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Proposed targets · from the project narrative, not verified here">
          <p className="mb-3 text-sm text-muted">The proposal discusses sub-2 ms in-memory processing versus about 800 ms cloud API round trip, on IBM LinuxONE s390x with CPACF. Those claims are not independently measured in this frontend.</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={proposed}>
                <XAxis dataKey="name" stroke={axis} fontSize={11} />
                <YAxis stroke={axis} fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }} />
                <Bar dataKey="ms" fill={bar} radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-3 space-y-1 font-mono text-xs text-muted">
            <li>P50 / P95 / P99 — not yet measured</li>
            <li>Throughput — not yet measured</li>
            <li>Sample size — n/a · environment — browser demo</li>
          </ul>
        </Panel>
        <Panel title="Measured benchmark results">
          <div className="flex h-56 items-center justify-center rounded-md border border-dashed border-line text-sm text-muted">
            Not yet measured
          </div>
          <p className="mt-3 text-sm text-muted">No backend instrumentation is connected. Mock latency numbers elsewhere in the console are labeled demonstration timings only.</p>
        </Panel>
      </div>
    </Shell>
  );
}
