import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Fingerprint, b as Binary, o as ShieldCheck, s as ShieldAlert, t as Waypoints, y as Bug } from "../_libs/lucide-react.mjs";
import { i as Shell, n as Panel, o as useSoc, r as SIM_STEPS, t as Badge } from "./shell-CQAIUQsf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-S3HCRKcy.js
var import_jsx_runtime = require_jsx_runtime();
var LAYERS = [
	{
		n: "01",
		name: "Ingest Engine",
		info: "Detect & tokenize",
		icon: Waypoints
	},
	{
		n: "02",
		name: "Decoy Engine",
		info: "Attributable tripwires",
		icon: Bug
	},
	{
		n: "03",
		name: "Agent Sandbox",
		info: "Simulated tool use",
		icon: Fingerprint
	},
	{
		n: "04",
		name: "Egress Warden",
		info: "Deterministic block",
		icon: ShieldAlert
	},
	{
		n: "05",
		name: "Hash Ledger",
		info: "Append-only audit",
		icon: Binary
	}
];
function Command() {
	const eventsAll = useSoc((s) => s.events);
	const decoys = useSoc((s) => s.decoys);
	const egress = useSoc((s) => s.egress);
	const hits = useSoc((s) => s.hits);
	const c = {
		ingest: 128 + eventsAll.filter((e) => e.type.includes("Sensitive") || e.type.includes("Ingest")).length,
		tokens: 64 + hits.length + eventsAll.filter((e) => e.type.includes("Token")).length,
		decoys: decoys.length,
		inspected: egress.length + 40,
		blocked: egress.filter((e) => e.verdict === "BLOCK").length
	};
	const chain = useSoc((s) => s.chainOk);
	const layer = useSoc((s) => s.selectedLayer);
	const setLayer = useSoc((s) => s.setLayer);
	const idx = useSoc((s) => s.simIndex);
	const status = useSoc((s) => s.simStatus);
	const launch = useSoc((s) => s.launch);
	const pause = useSoc((s) => s.pause);
	const resume = useSoc((s) => s.resume);
	const reset = useSoc((s) => s.resetSim);
	const step = useSoc((s) => s.step);
	const replay = useSoc((s) => s.replay);
	const events = eventsAll.slice(0, 5);
	const metrics = [
		{
			label: "Ingestion events",
			value: c.ingest,
			unit: "events",
			ok: true,
			icon: Waypoints
		},
		{
			label: "Elements tokenized",
			value: c.tokens,
			unit: "fields",
			ok: true,
			icon: Fingerprint
		},
		{
			label: "Decoys deployed",
			value: c.decoys,
			unit: "tripwires",
			ok: true,
			icon: Bug
		},
		{
			label: "Requests inspected",
			value: c.inspected,
			unit: "outbound",
			ok: true,
			icon: ShieldCheck
		},
		{
			label: "Exfil blocked",
			value: c.blocked,
			unit: "blocks",
			ok: c.blocked === 0,
			icon: ShieldAlert
		},
		{
			label: "Ledger integrity",
			value: chain === false ? "FAIL" : chain ? "OK" : "UNVERIFIED",
			unit: "sha-256 chain",
			ok: chain !== false,
			icon: Binary
		}
	];
	const activeLayer = idx < 0 ? -1 : Math.min(idx <= 1 ? 0 : idx === 2 ? 1 : idx === 3 ? 2 : idx <= 5 ? 3 : 4, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "Command Center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] tracking-[0.2em] text-accent",
						children: "MIRAGE-Z"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-semibold tracking-tight md:text-3xl",
						children: "Autonomous Zero-Trust Egress Warden"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-xl text-sm text-muted",
						children: "Deterministic AI security. Attributable deception. Cryptographic accountability."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-line bg-card px-3 py-2 font-mono text-[11px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-mint",
						children: "STATUS"
					}), " demonstration · local mock · not enforcement"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-md bg-accent px-3 py-2 text-sm font-medium text-on",
						onClick: launch,
						children: "Launch security simulation"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-md border border-line px-3 py-2 text-sm",
						onClick: pause,
						disabled: status !== "running",
						children: "Pause"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-md border border-line px-3 py-2 text-sm",
						onClick: resume,
						disabled: status !== "paused",
						children: "Resume"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-md border border-line px-3 py-2 text-sm",
						onClick: step,
						children: "Step forward"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-md border border-line px-3 py-2 text-sm",
						onClick: replay,
						children: "Replay"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-md border border-line px-3 py-2 text-sm",
						onClick: reset,
						children: "Reset"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
				children: metrics.map((m) => {
					const Icon = m.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "lift rounded-md border border-line bg-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs",
									children: m.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-accent" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 font-mono text-2xl",
								children: m.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex items-center justify-between text-[11px] text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.unit }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: m.ok ? "text-mint" : "text-crit",
									children: m.ok ? "nominal" : "attention"
								})]
							})
						]
					}, m.label);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Five-layer pipeline · demonstration flow",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex min-w-[720px] items-stretch gap-2",
							children: LAYERS.map((L, i) => {
								const Icon = L.icon;
								const hot = i === activeLayer && status !== "idle";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setLayer(layer === i ? null : i),
									className: `flex-1 rounded-md border p-3 text-left ${hot ? "border-accent bg-elev" : "border-line bg-bg-2"} ${i === 3 && idx >= 5 ? "ring-1 ring-crit" : ""}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-mono text-[10px] text-accent",
											children: ["LAYER ", L.n]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "my-2 size-4" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-medium",
											children: L.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] text-muted",
											children: L.info
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 font-mono text-[10px] text-muted",
											children: hot ? "active" : "standby"
										})
									]
								}, L.n);
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 720 16",
						className: "mt-2 h-4 w-full",
						"aria-hidden": true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: "20",
							y1: "8",
							x2: "700",
							y2: "8",
							className: "flow-dash",
							stroke: "var(--secondary)",
							strokeWidth: "1.5"
						})
					}),
					layer !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-muted",
						children: [
							LAYERS[layer].name,
							": ",
							LAYERS[layer].info,
							". The ledger records decisions; it does not block traffic. Egress warden is the enforcement point in this architecture. Figures and events here are simulated."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 grid gap-1 text-[12px] text-muted md:grid-cols-2",
						children: SIM_STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: i === idx ? "text-accent" : "",
							children: [
								i + 1,
								". ",
								s
							]
						}, s))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Recent security timeline",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center gap-2 border-b border-line pb-2 text-sm last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[11px] text-muted",
								children: e.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: e.type }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { v: e.severity }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto font-mono text-[11px] text-muted",
								children: e.agentId
							})
						]
					}, e.id))
				})
			})
		]
	});
}
//#endregion
export { Command as component };
