import { createFileRoute } from "@tanstack/react-router";
import { Panel, Shell } from "@/components/shell";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  return (
    <Shell title="Settings">
      <Panel title="Demonstration console">
        <ul className="space-y-2 text-sm text-muted">
          <li>Operator: Valyrian Tech · IBM Z Datathon 2026 theme AI Secured.</li>
          <li>Data plane: in-browser Zustand store. Nothing is sent to an enforcement backend.</li>
          <li>Theme: Light, Dark, or System from the header control. The choice is stored in this browser.</li>
          <li>Replace mock services with APIs without changing the page layout: ingestion, decoy registry, egress decisions, and the hash chain are isolated in the engine module.</li>
        </ul>
      </Panel>
    </Shell>
  );
}
