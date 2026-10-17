import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useTheme } from "./router-DpiwCnEf.mjs";
import { i as Shell, n as Panel, o as useSoc, t as Badge } from "./shell-CQAIUQsf.mjs";
import { c as ResponsiveContainer, l as Tooltip, o as Pie, s as Cell, t as PieChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/threats-BBHWxfBQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SEV = [
	"INFO",
	"LOW",
	"MEDIUM",
	"HIGH",
	"CRITICAL"
];
function Threats() {
	const events = useSoc((s) => s.events);
	const q = useSoc((s) => s.query).toLowerCase();
	const sel = useSoc((s) => s.selectedEvent);
	const setEvent = useSoc((s) => s.setEvent);
	const [sev, setSev] = (0, import_react.useState)("ALL");
	const { resolved } = useTheme();
	const fills = resolved === "light" ? [
		"#64748b",
		"#0369a1",
		"#b45309",
		"#6d28d9",
		"#be123c"
	] : [
		"#a1a1b5",
		"#67e8f9",
		"#fbbf24",
		"#c084fc",
		"#fb7185"
	];
	const filtered = events.filter((e) => (sev === "ALL" || e.severity === sev) && `${e.type} ${e.agentId} ${e.rule} ${e.id}`.toLowerCase().includes(q));
	const dist = SEV.map((s) => ({
		name: s,
		value: events.filter((e) => e.severity === s).length || 0
	}));
	const open = events.find((e) => e.id === sel);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "Live Threat Monitor",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm text-muted",
				children: "Streaming-style timeline fed by the local demonstration store. Sensitive previews stay masked."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex flex-wrap gap-2",
				children: ["ALL", ...SEV].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setSev(s),
					className: `rounded-md border px-2 py-1 text-xs ${sev === s ? "border-accent text-accent" : "border-line text-muted"}`,
					children: s
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[220px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Severity mix",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-44",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: dist,
								dataKey: "value",
								nameKey: "name",
								innerRadius: 36,
								outerRadius: 60,
								children: dist.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: fills[i] }, `${resolved}-${i}`))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								background: "var(--card)",
								border: "1px solid var(--border)",
								color: "var(--foreground)"
							} })] })
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Events",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "max-h-[480px] space-y-2 overflow-auto",
						children: [filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted",
							children: "No events match this filter."
						}), filtered.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "w-full rounded-md border border-line bg-bg-2 p-3 text-left",
							onClick: () => setEvent(e.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[11px]",
										children: e.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { v: e.severity }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm",
										children: e.type
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 font-mono text-[11px] text-muted",
								children: [
									e.ts,
									" · ",
									e.agentId,
									" · ",
									e.source,
									" → ",
									e.destination
								]
							})]
						}) }, e.id))]
					})
				})]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Incident drawer",
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid gap-2 text-sm sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Event"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono",
							children: open.id
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Time"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono",
							children: open.ts
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Agent"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: open.agentId })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Rule"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: open.rule })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Decision"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: open.decision })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Ledger"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono",
							children: open.ledgerId ?? "—"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Masked preview"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: open.preview })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-3 text-xs text-accent",
					onClick: () => setEvent(null),
					children: "Close"
				})]
			})
		]
	});
}
//#endregion
export { Threats as component };
