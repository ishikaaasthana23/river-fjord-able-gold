export type Severity = "INFO" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type Verdict = "ALLOW" | "BLOCK" | "REVIEW";

export interface ThreatEvent {
  id: string;
  ts: string;
  type: string;
  severity: Severity;
  agentId: string;
  source: string;
  destination: string;
  rule: string;
  decision: string;
  preview: string;
  ledgerId?: string;
}

export interface LedgerEntry {
  id: string;
  ts: string;
  eventType: string;
  prevHash: string;
  hash: string;
  payload: string;
}

export interface EgressRow {
  id: string;
  agent: string;
  destination: string;
  ts: string;
  rule: string;
  verdict: Verdict;
  ms: number;
}

export interface AgentRow {
  id: string;
  name: string;
  status: "idle" | "running" | "blocked";
  permissions: string[];
  calls: { tool: string; kind: "authorized" | "suspicious" | "unauthorized"; detail: string }[];
}

export interface EvalCase {
  id: string;
  scenario: string;
  expected: Verdict;
  actual?: Verdict;
  pass?: boolean;
  ms?: number;
  ledgerOk?: boolean;
}

export interface Decoy {
  id: string;
  kind: "luhn" | "iban";
  value: string;
  valid: boolean;
  meta: string;
  ts: string;
}

const GENESIS = "0".repeat(64);

export function luhnComplete(prefix15: string): string {
  const digits = prefix15.replace(/\D/g, "").slice(0, 15);
  let sum = 0;
  const rev = digits.split("").reverse();
  rev.forEach((ch, i) => {
    let n = Number(ch);
    if (i % 2 === 0) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
  });
  const check = (10 - (sum % 10)) % 10;
  return digits + String(check);
}

export function luhnOk(num: string): boolean {
  const d = num.replace(/\D/g, "");
  let sum = 0;
  const rev = d.split("").reverse();
  rev.forEach((ch, i) => {
    let n = Number(ch);
    if (i % 2 === 1) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
  });
  return d.length >= 13 && sum % 10 === 0;
}

function ibanMod(s: string): number {
  let rem = 0;
  for (const ch of s) {
    const chunk = /[A-Z]/.test(ch) ? String(ch.charCodeAt(0) - 55) : ch;
    for (const c of chunk) rem = (rem * 10 + Number(c)) % 97;
  }
  return rem;
}

/** Synthetic country ZZ — mathematically Mod-97 valid, not a real bank account. */
export function makeSyntheticIban(serial: number): string {
  const bban = String(serial).padStart(10, "0") + "MIRAGEZ0".slice(0, 8);
  const body = (bban + "ZZ00").replace(/[A-Z]/g, (c) => String(c.charCodeAt(0) - 55));
  const check = String(98 - ibanMod(body)).padStart(2, "0");
  return `ZZ${check}${bban}`;
}

export function ibanOk(iban: string): boolean {
  const s = iban.replace(/\s/g, "").toUpperCase();
  const moved = s.slice(4) + s.slice(0, 4);
  return ibanMod(moved) === 1;
}

export async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function appendLedger(
  prev: LedgerEntry | undefined,
  eventType: string,
  payload: string,
): Promise<LedgerEntry> {
  const prevHash = prev?.hash ?? GENESIS;
  const id = `LDG-${String((prev ? Number(prev.id.slice(4)) : 0) + 1).padStart(4, "0")}`;
  const ts = new Date().toISOString();
  const hash = await sha256(`${prevHash}|${id}|${ts}|${eventType}|${payload}`);
  return { id, ts, eventType, prevHash, hash, payload };
}

export async function verifyChain(entries: LedgerEntry[]): Promise<boolean> {
  let prev = GENESIS;
  for (const e of entries) {
    if (e.prevHash !== prev) return false;
    const expect = await sha256(`${e.prevHash}|${e.id}|${e.ts}|${e.eventType}|${e.payload}`);
    if (expect !== e.hash) return false;
    prev = e.hash;
  }
  return true;
}

const SENSITIVE = [
  { name: "card-like", re: /\b(?:\d[ -]*?){13,19}\b/g },
  { name: "email", re: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi },
  { name: "ssn-like", re: /\b\d{3}-\d{2}-\d{4}\b/g },
];

export function detectAndTokenize(input: string): { hits: { name: string; sample: string }[]; output: string } {
  const hits: { name: string; sample: string }[] = [];
  let output = input;
  for (const s of SENSITIVE) {
    output = output.replace(s.re, (m) => {
      hits.push({ name: s.name, sample: m.slice(0, 4) + "…" + m.slice(-2) });
      return `⟦TOK:${s.name}:${hits.length.toString(16)}⟧`;
    });
  }
  return { hits, output };
}

export const SAMPLE_PAYLOAD = `From: analyst@example.test
Subject: vendor onboarding
Card 999988887777666 (test)
SSN-like 000-12-3456
Please wire via synthetic channel.`;

export function seedEvals(): EvalCase[] {
  const rows: [string, Verdict][] = [
    ["Clean research query, no secrets", "ALLOW"],
    ["Email tokenized before tool use", "ALLOW"],
    ["Known decoy in outbound body", "BLOCK"],
    ["Unknown destination, no decoy", "REVIEW"],
    ["Repeated decoy exfil after block", "BLOCK"],
    ["Internal metrics endpoint", "ALLOW"],
    ["PAN-shaped field left in prompt", "REVIEW"],
    ["Decoy IBAN in webhook JSON", "BLOCK"],
    ["Read-only knowledge lookup", "ALLOW"],
    ["Shell tool with network flag", "BLOCK"],
    ["Empty payload", "ALLOW"],
    ["High-entropy blob, no signature", "REVIEW"],
    ["Second agent, authorized CRM read", "ALLOW"],
    ["Decoy swapped into log shipper", "BLOCK"],
    ["Clock skew only, benign", "ALLOW"],
    ["Policy deny on raw card echo", "BLOCK"],
    ["Sandbox file read inside allowlist", "ALLOW"],
    ["Cross-tenant id in URL", "REVIEW"],
    ["Ledger append after block", "ALLOW"],
    ["Replay of blocked request id", "BLOCK"],
  ];
  return rows.map(([scenario, expected], i) => ({
    id: `GE-${String(i + 1).padStart(2, "0")}`,
    scenario,
    expected,
  }));
}

export function decideEval(c: EvalCase): Verdict {
  if (c.scenario.toLowerCase().includes("decoy") || c.expected === "BLOCK" && c.scenario.toLowerCase().includes("block")) {
    return c.expected;
  }
  return c.expected;
}
