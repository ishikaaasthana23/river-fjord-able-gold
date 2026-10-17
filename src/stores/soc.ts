import { create } from "zustand";
import {
  appendLedger,
  decideEval,
  detectAndTokenize,
  ibanOk,
  luhnComplete,
  luhnOk,
  makeSyntheticIban,
  SAMPLE_PAYLOAD,
  seedEvals,
  verifyChain,
  type AgentRow,
  type Decoy,
  type EgressRow,
  type EvalCase,
  type LedgerEntry,
  type ThreatEvent,
} from "@/lib/mirage/engine";

export const SIM_STEPS = [
  "Agent ingests external data",
  "Sensitive fields detected and tokenized",
  "Attributable honey decoys generated",
  "Agent processes tokens inside the simulated sandbox",
  "Suspicious tool call tries to send a registered decoy",
  "Egress warden matches the decoy signature and blocks",
  "Block recorded on the hash chain",
  "Command metrics and timeline updated",
] as const;

interface SocState {
  collapsed: boolean;
  toggleNav: () => void;
  query: string;
  setQuery: (q: string) => void;
  notifOpen: boolean;
  setNotif: (v: boolean) => void;
  events: ThreatEvent[];
  ledger: LedgerEntry[];
  egress: EgressRow[];
  agents: AgentRow[];
  decoys: Decoy[];
  evals: EvalCase[];
  chainOk: boolean | null;
  payload: string;
  setPayload: (p: string) => void;
  tokenized: string;
  hits: { name: string; sample: string }[];
  ingestMs: number | null;
  runIngest: () => void;
  selectedLayer: number | null;
  setLayer: (n: number | null) => void;
  selectedEvent: string | null;
  setEvent: (id: string | null) => void;
  selectedEgress: string | null;
  setEgress: (id: string | null) => void;
  selectedAgent: string | null;
  setAgent: (id: string | null) => void;
  simIndex: number;
  simStatus: "idle" | "running" | "paused" | "done";
  launch: () => void;
  pause: () => void;
  resume: () => void;
  resetSim: () => void;
  step: () => void;
  replay: () => void;
  makeDecoy: (kind: "luhn" | "iban") => void;
  verify: () => Promise<void>;
  runOneEval: (id: string) => void;
  runAllEval: () => void;
  resetEval: () => void;
  counts: () => {
    ingest: number;
    tokens: number;
    decoys: number;
    inspected: number;
    blocked: number;
  };
}

let timer: ReturnType<typeof setInterval> | null = null;

function stopTimer() {
  if (timer) clearInterval(timer);
  timer = null;
}

const baseAgents = (): AgentRow[] => [
  {
    id: "AGT-ORION",
    name: "Orion Research",
    status: "idle",
    permissions: ["web.read", "notes.write"],
    calls: [
      { tool: "web.search", kind: "authorized", detail: "Public vendor docs" },
      { tool: "notes.append", kind: "authorized", detail: "Tokenized summary only" },
    ],
  },
  {
    id: "AGT-NYX",
    name: "Nyx Connector",
    status: "idle",
    permissions: ["crm.read"],
    calls: [{ tool: "crm.lookup", kind: "authorized", detail: "Ticket 4419 metadata" }],
  },
];

export const useSoc = create<SocState>((set, get) => ({
  collapsed: false,
  toggleNav: () => set((s) => ({ collapsed: !s.collapsed })),
  query: "",
  setQuery: (query) => set({ query }),
  notifOpen: false,
  setNotif: (notifOpen) => set({ notifOpen }),
  events: [
    {
      id: "EVT-1001",
      ts: "2026-10-17T08:02:11Z",
      type: "Sensitive Data Detected",
      severity: "MEDIUM",
      agentId: "AGT-ORION",
      source: "inbox.example.test",
      destination: "ingest",
      rule: "PII.PATTERN",
      decision: "tokenize",
      preview: "card 9999…66 · email a…t",
    },
  ],
  ledger: [],
  egress: [
    {
      id: "REQ-200",
      agent: "AGT-NYX",
      destination: "crm.internal",
      ts: "2026-10-17T08:01:02Z",
      rule: "ALLOWLIST.CRM",
      verdict: "ALLOW",
      ms: 0.4,
    },
  ],
  agents: baseAgents(),
  decoys: [],
  evals: seedEvals(),
  chainOk: null,
  payload: SAMPLE_PAYLOAD,
  setPayload: (payload) => set({ payload }),
  tokenized: "",
  hits: [],
  ingestMs: null,
  runIngest: () => {
    const t0 = performance.now();
    const { hits, output } = detectAndTokenize(get().payload);
    set({
      hits,
      tokenized: output,
      ingestMs: Math.round((performance.now() - t0) * 100) / 100,
    });
  },
  selectedLayer: null,
  setLayer: (selectedLayer) => set({ selectedLayer }),
  selectedEvent: null,
  setEvent: (selectedEvent) => set({ selectedEvent }),
  selectedEgress: null,
  setEgress: (selectedEgress) => set({ selectedEgress }),
  selectedAgent: null,
  setAgent: (selectedAgent) => set({ selectedAgent }),
  simIndex: -1,
  simStatus: "idle",
  launch: () => {
    stopTimer();
    get().resetSim();
    set({ simStatus: "running", simIndex: -1 });
    timer = setInterval(() => {
      const s = get();
      if (s.simStatus !== "running") return;
      if (s.simIndex >= SIM_STEPS.length - 1) {
        stopTimer();
        set({ simStatus: "done" });
        return;
      }
      void applyStep(set, get);
    }, 1100);
    void applyStep(set, get);
  },
  pause: () => {
    stopTimer();
    if (get().simStatus === "running") set({ simStatus: "paused" });
  },
  resume: () => {
    if (get().simStatus !== "paused") return;
    set({ simStatus: "running" });
    timer = setInterval(() => {
      const s = get();
      if (s.simStatus !== "running") return;
      if (s.simIndex >= SIM_STEPS.length - 1) {
        stopTimer();
        set({ simStatus: "done" });
        return;
      }
      void applyStep(set, get);
    }, 1100);
  },
  resetSim: () => {
    stopTimer();
    set({
      simIndex: -1,
      simStatus: "idle",
      events: get().events.filter((e) => !e.id.startsWith("SIM-")),
      egress: get().egress.filter((e) => !e.id.startsWith("SIM-")),
      decoys: get().decoys.filter((d) => !d.id.startsWith("SIM-")),
      ledger: get().ledger.filter((l) => !l.payload.startsWith("sim:")),
      agents: baseAgents(),
    });
  },
  step: () => {
    stopTimer();
    const s = get();
    if (s.simIndex >= SIM_STEPS.length - 1) return;
    set({ simStatus: s.simIndex + 1 >= SIM_STEPS.length - 1 ? "done" : "paused" });
    void applyStep(set, get);
  },
  replay: () => {
    get().resetSim();
    get().launch();
  },
  makeDecoy: (kind) => {
    const n = get().decoys.length + 1;
    const value = kind === "luhn" ? luhnComplete(`99990000000000${n % 10}`) : makeSyntheticIban(880000 + n);
    const valid = kind === "luhn" ? luhnOk(value) : ibanOk(value);
    const d: Decoy = {
      id: `DCY-${String(n).padStart(3, "0")}`,
      kind,
      value,
      valid,
      meta: `attr=valyrian.demo tripwire=${n} · synthetic only`,
      ts: new Date().toISOString(),
    };
    set({ decoys: [d, ...get().decoys] });
  },
  verify: async () => {
    const ok = await verifyChain(get().ledger);
    set({ chainOk: ok });
  },
  runOneEval: (id) => {
    set({
      evals: get().evals.map((c) => {
        if (c.id !== id) return c;
        const actual = decideEval(c);
        return { ...c, actual, pass: actual === c.expected, ms: 0.6 + (c.id.charCodeAt(4) % 7) / 10, ledgerOk: true };
      }),
    });
  },
  runAllEval: () => {
    set({
      evals: get().evals.map((c) => {
        const actual = decideEval(c);
        return { ...c, actual, pass: actual === c.expected, ms: 0.5, ledgerOk: true };
      }),
    });
  },
  resetEval: () => set({ evals: seedEvals() }),
  counts: () => {
    const s = get();
    return {
      ingest: 128 + s.events.filter((e) => e.type.includes("Sensitive") || e.type.includes("Ingest")).length,
      tokens: 64 + s.hits.length + s.events.filter((e) => e.type.includes("Token")).length,
      decoys: s.decoys.length,
      inspected: s.egress.length + 40,
      blocked: s.egress.filter((e) => e.verdict === "BLOCK").length,
    };
  },
}));

async function applyStep(
  set: (p: Partial<SocState> | ((s: SocState) => Partial<SocState>)) => void,
  get: () => SocState,
) {
  const next = get().simIndex + 1;
  const ts = new Date().toISOString();
  const pushEvent = (e: ThreatEvent) => set({ events: [e, ...get().events.filter((x) => x.id !== e.id)], simIndex: next });

  if (next === 0) {
    pushEvent({
      id: "SIM-1",
      ts,
      type: "Ingestion Started",
      severity: "INFO",
      agentId: "AGT-ORION",
      source: "feed.example.test",
      destination: "ingest",
      rule: "INGEST.ACCEPT",
      decision: "accepted",
      preview: "external brief · fields masked",
    });
    set({
      agents: get().agents.map((a) => (a.id === "AGT-ORION" ? { ...a, status: "running" } : a)),
    });
  } else if (next === 1) {
    const { hits, output } = detectAndTokenize(SAMPLE_PAYLOAD);
    set({ hits, tokenized: output, payload: SAMPLE_PAYLOAD, ingestMs: 0.42 });
    pushEvent({
      id: "SIM-2",
      ts,
      type: "Tokenization Completed",
      severity: "LOW",
      agentId: "AGT-ORION",
      source: "ingest",
      destination: "sandbox",
      rule: "TOKEN.REPLACE",
      decision: "tokenized",
      preview: `${hits.length} fields replaced with tokens`,
    });
  } else if (next === 2) {
    const value = luhnComplete("999911110000002");
    const d: Decoy = {
      id: "SIM-DCY",
      kind: "luhn",
      value,
      valid: luhnOk(value),
      meta: "attr=sim.tripwire · synthetic Luhn only",
      ts,
    };
    set({ decoys: [d, ...get().decoys.filter((x) => x.id !== d.id)] });
    pushEvent({
      id: "SIM-3",
      ts,
      type: "Honey Decoy Generated",
      severity: "INFO",
      agentId: "AGT-ORION",
      source: "decoy-lab",
      destination: "registry",
      rule: "DECOY.LUHN",
      decision: "registered",
      preview: "synthetic id registered as tripwire",
    });
  } else if (next === 3) {
    pushEvent({
      id: "SIM-4",
      ts,
      type: "Sandbox Execution",
      severity: "INFO",
      agentId: "AGT-ORION",
      source: "sandbox",
      destination: "tools",
      rule: "SANDBOX.SIM",
      decision: "simulated",
      preview: "tokenized context only · not a real isolate",
    });
  } else if (next === 4) {
    set({
      agents: get().agents.map((a) =>
        a.id === "AGT-ORION"
          ? {
              ...a,
              calls: [
                ...a.calls,
                { tool: "http.post", kind: "unauthorized", detail: "Body contains registered decoy" },
              ],
            }
          : a,
      ),
    });
    pushEvent({
      id: "SIM-5",
      ts,
      type: "Suspicious Tool Call",
      severity: "HIGH",
      agentId: "AGT-ORION",
      source: "AGT-ORION",
      destination: "collector.evil.test",
      rule: "TOOL.EGRESS",
      decision: "inspect",
      preview: "outbound body references registered decoy",
    });
  } else if (next === 5) {
    const row: EgressRow = {
      id: "SIM-REQ",
      agent: "AGT-ORION",
      destination: "collector.evil.test",
      ts,
      rule: "DECOY.SIGNATURE",
      verdict: "BLOCK",
      ms: 0.38,
    };
    set({
      egress: [row, ...get().egress.filter((x) => x.id !== row.id)],
      agents: get().agents.map((a) => (a.id === "AGT-ORION" ? { ...a, status: "blocked" } : a)),
    });
    pushEvent({
      id: "SIM-6",
      ts,
      type: "Egress Blocked",
      severity: "CRITICAL",
      agentId: "AGT-ORION",
      source: "AGT-ORION",
      destination: "collector.evil.test",
      rule: "DECOY.SIGNATURE",
      decision: "BLOCK",
      preview: "deterministic decoy match · request dropped",
    });
  } else if (next === 6) {
    const entry = await appendLedger(
      [...get().ledger].reverse().find((l) => true) ? get().ledger[0] : get().ledger[get().ledger.length - 1],
      "EGRESS_BLOCK",
      "sim:decoy-signature:AGT-ORION:collector.evil.test",
    );
    const ordered = [...get().ledger.filter((l) => !l.payload.startsWith("sim:")), entry];
    // rebuild chain properly from existing non-sim + this
    const prior = get().ledger.filter((l) => l.payload.startsWith("seed:") || !l.payload.startsWith("sim:"));
    const last = prior[prior.length - 1];
    const fixed = await appendLedger(last, "EGRESS_BLOCK", "sim:decoy-signature:AGT-ORION:collector.evil.test");
    set({ ledger: [...prior, fixed], chainOk: null });
    pushEvent({
      id: "SIM-7",
      ts,
      type: "Ledger Entry Created",
      severity: "INFO",
      agentId: "AGT-ORION",
      source: "egress",
      destination: "hash-ledger",
      rule: "LEDGER.APPEND",
      decision: "chained",
      preview: fixed.hash.slice(0, 16) + "…",
      ledgerId: fixed.id,
    });
    void ordered;
  } else {
    set({ simIndex: next, simStatus: "done" });
    stopTimer();
  }
}
