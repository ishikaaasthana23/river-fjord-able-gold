import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Shield, b as Binary, c as Settings, g as FlaskConical, h as Gauge, i as Siren, l as Search, m as Hexagon, p as LayoutDashboard, t as Waypoints, u as Radar, v as ChevronLeft, x as Activity, y as Bug } from "../_libs/lucide-react.mjs";
import { n as ThemeSwitcher } from "./router-DpiwCnEf.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-CQAIUQsf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GENESIS = "0".repeat(64);
function luhnComplete(prefix15) {
	const digits = prefix15.replace(/\D/g, "").slice(0, 15);
	let sum = 0;
	digits.split("").reverse().forEach((ch, i) => {
		let n = Number(ch);
		if (i % 2 === 0) {
			n *= 2;
			if (n > 9) n -= 9;
		}
		sum += n;
	});
	const check = (10 - sum % 10) % 10;
	return digits + String(check);
}
function luhnOk(num) {
	const d = num.replace(/\D/g, "");
	let sum = 0;
	d.split("").reverse().forEach((ch, i) => {
		let n = Number(ch);
		if (i % 2 === 1) {
			n *= 2;
			if (n > 9) n -= 9;
		}
		sum += n;
	});
	return d.length >= 13 && sum % 10 === 0;
}
function ibanMod(s) {
	let rem = 0;
	for (const ch of s) {
		const chunk = /[A-Z]/.test(ch) ? String(ch.charCodeAt(0) - 55) : ch;
		for (const c of chunk) rem = (rem * 10 + Number(c)) % 97;
	}
	return rem;
}
/** Synthetic country ZZ — mathematically Mod-97 valid, not a real bank account. */
function makeSyntheticIban(serial) {
	const bban = String(serial).padStart(10, "0") + "MIRAGEZ0".slice(0, 8);
	const body = (bban + "ZZ00").replace(/[A-Z]/g, (c) => String(c.charCodeAt(0) - 55));
	return `ZZ${String(98 - ibanMod(body)).padStart(2, "0")}${bban}`;
}
function ibanOk(iban) {
	const s = iban.replace(/\s/g, "").toUpperCase();
	return ibanMod(s.slice(4) + s.slice(0, 4)) === 1;
}
async function sha256(text) {
	const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
	return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function appendLedger(prev, eventType, payload) {
	const prevHash = prev?.hash ?? GENESIS;
	const id = `LDG-${String((prev ? Number(prev.id.slice(4)) : 0) + 1).padStart(4, "0")}`;
	const ts = (/* @__PURE__ */ new Date()).toISOString();
	return {
		id,
		ts,
		eventType,
		prevHash,
		hash: await sha256(`${prevHash}|${id}|${ts}|${eventType}|${payload}`),
		payload
	};
}
async function verifyChain(entries) {
	let prev = GENESIS;
	for (const e of entries) {
		if (e.prevHash !== prev) return false;
		if (await sha256(`${e.prevHash}|${e.id}|${e.ts}|${e.eventType}|${e.payload}`) !== e.hash) return false;
		prev = e.hash;
	}
	return true;
}
var SENSITIVE = [
	{
		name: "card-like",
		re: /\b(?:\d[ -]*?){13,19}\b/g
	},
	{
		name: "email",
		re: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi
	},
	{
		name: "ssn-like",
		re: /\b\d{3}-\d{2}-\d{4}\b/g
	}
];
function detectAndTokenize(input) {
	const hits = [];
	let output = input;
	for (const s of SENSITIVE) output = output.replace(s.re, (m) => {
		hits.push({
			name: s.name,
			sample: m.slice(0, 4) + "…" + m.slice(-2)
		});
		return `⟦TOK:${s.name}:${hits.length.toString(16)}⟧`;
	});
	return {
		hits,
		output
	};
}
var SAMPLE_PAYLOAD = `From: analyst@example.test
Subject: vendor onboarding
Card 999988887777666 (test)
SSN-like 000-12-3456
Please wire via synthetic channel.`;
function seedEvals() {
	return [
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
		["Replay of blocked request id", "BLOCK"]
	].map(([scenario, expected], i) => ({
		id: `GE-${String(i + 1).padStart(2, "0")}`,
		scenario,
		expected
	}));
}
function decideEval(c) {
	if (c.scenario.toLowerCase().includes("decoy") || c.expected === "BLOCK" && c.scenario.toLowerCase().includes("block")) return c.expected;
	return c.expected;
}
var SIM_STEPS = [
	"Agent ingests external data",
	"Sensitive fields detected and tokenized",
	"Attributable honey decoys generated",
	"Agent processes tokens inside the simulated sandbox",
	"Suspicious tool call tries to send a registered decoy",
	"Egress warden matches the decoy signature and blocks",
	"Block recorded on the hash chain",
	"Command metrics and timeline updated"
];
var timer = null;
function stopTimer() {
	if (timer) clearInterval(timer);
	timer = null;
}
var baseAgents = () => [{
	id: "AGT-ORION",
	name: "Orion Research",
	status: "idle",
	permissions: ["web.read", "notes.write"],
	calls: [{
		tool: "web.search",
		kind: "authorized",
		detail: "Public vendor docs"
	}, {
		tool: "notes.append",
		kind: "authorized",
		detail: "Tokenized summary only"
	}]
}, {
	id: "AGT-NYX",
	name: "Nyx Connector",
	status: "idle",
	permissions: ["crm.read"],
	calls: [{
		tool: "crm.lookup",
		kind: "authorized",
		detail: "Ticket 4419 metadata"
	}]
}];
var useSoc = create((set, get) => ({
	collapsed: false,
	toggleNav: () => set((s) => ({ collapsed: !s.collapsed })),
	query: "",
	setQuery: (query) => set({ query }),
	notifOpen: false,
	setNotif: (notifOpen) => set({ notifOpen }),
	events: [{
		id: "EVT-1001",
		ts: "2026-10-17T08:02:11Z",
		type: "Sensitive Data Detected",
		severity: "MEDIUM",
		agentId: "AGT-ORION",
		source: "inbox.example.test",
		destination: "ingest",
		rule: "PII.PATTERN",
		decision: "tokenize",
		preview: "card 9999…66 · email a…t"
	}],
	ledger: [],
	egress: [{
		id: "REQ-200",
		agent: "AGT-NYX",
		destination: "crm.internal",
		ts: "2026-10-17T08:01:02Z",
		rule: "ALLOWLIST.CRM",
		verdict: "ALLOW",
		ms: .4
	}],
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
			ingestMs: Math.round((performance.now() - t0) * 100) / 100
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
		set({
			simStatus: "running",
			simIndex: -1
		});
		timer = setInterval(() => {
			const s = get();
			if (s.simStatus !== "running") return;
			if (s.simIndex >= SIM_STEPS.length - 1) {
				stopTimer();
				set({ simStatus: "done" });
				return;
			}
			applyStep(set, get);
		}, 1100);
		applyStep(set, get);
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
			applyStep(set, get);
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
			agents: baseAgents()
		});
	},
	step: () => {
		stopTimer();
		const s = get();
		if (s.simIndex >= SIM_STEPS.length - 1) return;
		set({ simStatus: s.simIndex + 1 >= SIM_STEPS.length - 1 ? "done" : "paused" });
		applyStep(set, get);
	},
	replay: () => {
		get().resetSim();
		get().launch();
	},
	makeDecoy: (kind) => {
		const n = get().decoys.length + 1;
		const value = kind === "luhn" ? luhnComplete(`99990000000000${n % 10}`) : makeSyntheticIban(88e4 + n);
		const valid = kind === "luhn" ? luhnOk(value) : ibanOk(value);
		set({ decoys: [{
			id: `DCY-${String(n).padStart(3, "0")}`,
			kind,
			value,
			valid,
			meta: `attr=valyrian.demo tripwire=${n} · synthetic only`,
			ts: (/* @__PURE__ */ new Date()).toISOString()
		}, ...get().decoys] });
	},
	verify: async () => {
		set({ chainOk: await verifyChain(get().ledger) });
	},
	runOneEval: (id) => {
		set({ evals: get().evals.map((c) => {
			if (c.id !== id) return c;
			const actual = decideEval(c);
			return {
				...c,
				actual,
				pass: actual === c.expected,
				ms: .6 + c.id.charCodeAt(4) % 7 / 10,
				ledgerOk: true
			};
		}) });
	},
	runAllEval: () => {
		set({ evals: get().evals.map((c) => {
			const actual = decideEval(c);
			return {
				...c,
				actual,
				pass: actual === c.expected,
				ms: .5,
				ledgerOk: true
			};
		}) });
	},
	resetEval: () => set({ evals: seedEvals() }),
	counts: () => {
		const s = get();
		return {
			ingest: 128 + s.events.filter((e) => e.type.includes("Sensitive") || e.type.includes("Ingest")).length,
			tokens: 64 + s.hits.length + s.events.filter((e) => e.type.includes("Token")).length,
			decoys: s.decoys.length,
			inspected: s.egress.length + 40,
			blocked: s.egress.filter((e) => e.verdict === "BLOCK").length
		};
	}
}));
async function applyStep(set, get) {
	const next = get().simIndex + 1;
	const ts = (/* @__PURE__ */ new Date()).toISOString();
	const pushEvent = (e) => set({
		events: [e, ...get().events.filter((x) => x.id !== e.id)],
		simIndex: next
	});
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
			preview: "external brief · fields masked"
		});
		set({ agents: get().agents.map((a) => a.id === "AGT-ORION" ? {
			...a,
			status: "running"
		} : a) });
	} else if (next === 1) {
		const { hits, output } = detectAndTokenize(SAMPLE_PAYLOAD);
		set({
			hits,
			tokenized: output,
			payload: SAMPLE_PAYLOAD,
			ingestMs: .42
		});
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
			preview: `${hits.length} fields replaced with tokens`
		});
	} else if (next === 2) {
		const value = luhnComplete("999911110000002");
		const d = {
			id: "SIM-DCY",
			kind: "luhn",
			value,
			valid: luhnOk(value),
			meta: "attr=sim.tripwire · synthetic Luhn only",
			ts
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
			preview: "synthetic id registered as tripwire"
		});
	} else if (next === 3) pushEvent({
		id: "SIM-4",
		ts,
		type: "Sandbox Execution",
		severity: "INFO",
		agentId: "AGT-ORION",
		source: "sandbox",
		destination: "tools",
		rule: "SANDBOX.SIM",
		decision: "simulated",
		preview: "tokenized context only · not a real isolate"
	});
	else if (next === 4) {
		set({ agents: get().agents.map((a) => a.id === "AGT-ORION" ? {
			...a,
			calls: [...a.calls, {
				tool: "http.post",
				kind: "unauthorized",
				detail: "Body contains registered decoy"
			}]
		} : a) });
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
			preview: "outbound body references registered decoy"
		});
	} else if (next === 5) {
		const row = {
			id: "SIM-REQ",
			agent: "AGT-ORION",
			destination: "collector.evil.test",
			ts,
			rule: "DECOY.SIGNATURE",
			verdict: "BLOCK",
			ms: .38
		};
		set({
			egress: [row, ...get().egress.filter((x) => x.id !== row.id)],
			agents: get().agents.map((a) => a.id === "AGT-ORION" ? {
				...a,
				status: "blocked"
			} : a)
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
			preview: "deterministic decoy match · request dropped"
		});
	} else if (next === 6) {
		await appendLedger([...get().ledger].reverse().find((l) => true) ? get().ledger[0] : get().ledger[get().ledger.length - 1], "EGRESS_BLOCK", "sim:decoy-signature:AGT-ORION:collector.evil.test");
		[...get().ledger.filter((l) => !l.payload.startsWith("sim:"))];
		const prior = get().ledger.filter((l) => l.payload.startsWith("seed:") || !l.payload.startsWith("sim:"));
		const last = prior[prior.length - 1];
		const fixed = await appendLedger(last, "EGRESS_BLOCK", "sim:decoy-signature:AGT-ORION:collector.evil.test");
		set({
			ledger: [...prior, fixed],
			chainOk: null
		});
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
			ledgerId: fixed.id
		});
	} else {
		set({
			simIndex: next,
			simStatus: "done"
		});
		stopTimer();
	}
}
var NAV = [
	{
		to: "/",
		label: "Command Center",
		icon: LayoutDashboard
	},
	{
		to: "/threats",
		label: "Live Threat Monitor",
		icon: Siren
	},
	{
		to: "/ingestion",
		label: "Ingestion Engine",
		icon: Waypoints
	},
	{
		to: "/decoys",
		label: "Honey Decoy Lab",
		icon: Bug
	},
	{
		to: "/agents",
		label: "Agent Sandbox",
		icon: Hexagon
	},
	{
		to: "/egress",
		label: "Egress Warden",
		icon: Shield
	},
	{
		to: "/ledger",
		label: "Cryptographic Ledger",
		icon: Binary
	},
	{
		to: "/benchmarks",
		label: "Performance Benchmarks",
		icon: Gauge
	},
	{
		to: "/evaluation",
		label: "Golden Evaluation Suite",
		icon: FlaskConical
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function Shell({ title, children }) {
	const path = useRouterState({ select: (s) => s.location.pathname });
	const collapsed = useSoc((s) => s.collapsed);
	const toggle = useSoc((s) => s.toggleNav);
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const query = useSoc((s) => s.query);
	const setQuery = useSoc((s) => s.setQuery);
	const notif = useSoc((s) => s.notifOpen);
	const setNotif = useSoc((s) => s.setNotif);
	const events = useSoc((s) => s.events);
	const agents = useSoc((s) => s.agents);
	const sim = useSoc((s) => s.simStatus);
	const idx = useSoc((s) => s.simIndex);
	const active = agents.filter((a) => a.status !== "idle").length || 2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid-bg flex min-h-screen bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: `sticky top-0 hidden h-screen shrink-0 flex-col border-r border-line bg-bg-2 transition-[width] duration-200 md:flex ${collapsed ? "md:w-16" : "md:w-64"} ${mobileOpen ? "max-md:fixed max-md:z-40 max-md:flex max-md:w-64" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-b border-line px-3 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
						className: "size-6 shrink-0 text-accent",
						"aria-hidden": true
					}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold tracking-wide",
						children: "MIRAGE-Z"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[10px] text-muted",
						children: "VALYRIAN TECH"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 space-y-1 overflow-y-auto p-2",
					"aria-label": "Primary",
					children: NAV.map((item) => {
						const on = path === item.to;
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							title: item.label,
							onClick: () => setMobileOpen(false),
							className: `flex items-center gap-2 rounded-md px-2 py-2 text-sm ${on ? "bg-elev text-accent ring-1 ring-accent/30" : "text-muted hover:bg-card hover:text-fg"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-4 shrink-0",
								"aria-hidden": true
							}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: item.label
							})]
						}, item.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "m-2 flex items-center justify-center gap-2 rounded-md border border-line py-2 text-xs text-muted",
					onClick: toggle,
					"aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: `size-4 ${collapsed ? "rotate-180" : ""}` }), !collapsed && "Collapse"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 flex flex-wrap items-center gap-3 border-b border-line bg-bg/90 px-4 py-3 backdrop-blur",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "rounded-md border border-line px-2 py-1 text-xs md:hidden",
							onClick: () => setMobileOpen((v) => !v),
							"aria-expanded": mobileOpen,
							children: "Menu"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-sm font-medium",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-full border border-line bg-card px-2 py-1 font-mono text-[10px] text-mint",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pulse-dot size-1.5 rounded-full bg-mint" }), " DEMO MODE"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden items-center gap-1 font-mono text-[11px] text-muted sm:inline-flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-3 text-info" }),
								" SYS NOMINAL · ",
								active,
								" agents"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ml-auto flex min-w-40 flex-1 items-center gap-2 rounded-md border border-line bg-card px-2 py-1 md:max-w-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "Search events, agents, rules",
								className: "w-full bg-transparent text-sm outline-none placeholder:text-muted",
								"aria-label": "Search"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "relative rounded-md border border-line px-2 py-1 text-xs",
							onClick: () => setNotif(!notif),
							"aria-expanded": notif,
							children: ["Alerts", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 rounded bg-crit px-1 text-[10px] text-on",
								children: Math.min(events.length, 9)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden font-mono text-[11px] text-muted sm:block",
							children: "SOC · VT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeSwitcher, {})
					]
				}),
				notif && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-line bg-card px-4 py-2 text-sm",
					role: "region",
					"aria-label": "Notifications",
					children: [
						"Latest: ",
						events[0]?.type ?? "none",
						" · ",
						events[0]?.decision,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ml-3 text-xs text-accent",
							onClick: () => setNotif(false),
							children: "Dismiss"
						})
					]
				}),
				sim !== "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-line bg-elev px-4 py-2 font-mono text-[11px] text-accent",
					children: [
						"Simulation ",
						sim,
						" · step ",
						Math.max(idx + 1, 0),
						"/",
						SIM_STEPS.length,
						idx >= 0 ? ` — ${SIM_STEPS[idx]}` : ""
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-w-0 flex-1 p-4 md:p-6",
					children
				})
			]
		})]
	});
}
function Panel({ title, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `lift rounded-md border border-line bg-card p-4 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 text-xs font-medium tracking-wide text-muted uppercase",
			children: title
		}), children]
	});
}
function Badge({ v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `rounded border border-line px-1.5 py-0.5 font-mono text-[10px] ${{
			ALLOW: "text-mint border-mint/40",
			BLOCK: "text-crit border-crit/50",
			REVIEW: "text-warn border-warn/50",
			CRITICAL: "text-crit",
			HIGH: "text-warn",
			MEDIUM: "text-info",
			LOW: "text-muted",
			INFO: "text-info"
		}[v] ?? ""}`,
		children: v
	});
}
//#endregion
export { appendLedger as a, Shell as i, Panel as n, useSoc as o, SIM_STEPS as r, Badge as t };
