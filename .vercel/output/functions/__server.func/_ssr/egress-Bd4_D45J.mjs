import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Shell, n as Panel, o as useSoc, t as Badge } from "./shell-CQAIUQsf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/egress-Bd4_D45J.js
var import_jsx_runtime = require_jsx_runtime();
function Egress() {
	const rows = useSoc((s) => s.egress);
	const q = useSoc((s) => s.query).toLowerCase();
	const sel = useSoc((s) => s.selectedEgress);
	const setEgress = useSoc((s) => s.setEgress);
	const filtered = rows.filter((r) => `${r.id} ${r.agent} ${r.destination} ${r.rule}`.toLowerCase().includes(q));
	const open = rows.find((r) => r.id === sel);
	const blocked = rows.filter((r) => r.verdict === "BLOCK").length;
	const allowed = rows.filter((r) => r.verdict === "ALLOW").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "Egress Warden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 max-w-2xl text-sm text-muted",
				children: "Deterministic demo rule: any outbound request tagged with a registered decoy signature is BLOCK. Launch the command-center simulation to reproduce SIM-REQ."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 grid gap-3 sm:grid-cols-4",
				children: [
					["Inspected", rows.length + 40],
					["Allowed", allowed],
					["Blocked", blocked],
					["Median mock latency", "0.4 ms"]
				].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-line bg-card p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-xl",
						children: v
					})]
				}, String(k)))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[760px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "font-mono text-[11px] text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Request" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Agent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Destination" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Time" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Rule" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Verdict" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "ms" })
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "cursor-pointer border-t border-line",
						onClick: () => setEgress(r.id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 font-mono text-xs",
								children: r.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.agent }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.destination }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "font-mono text-[11px]",
								children: r.ts
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.rule }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { v: r.verdict }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "font-mono",
								children: r.ms
							})
						]
					}, r.id)) })]
				})
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Request inspection",
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [
							"Rule ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono",
								children: open.rule
							}),
							" produced ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { v: open.verdict }),
							" for ",
							open.agent,
							" → ",
							open.destination,
							"."
						]
					}),
					open.verdict === "BLOCK" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Match is the registered honey-decoy signature. The ledger records the block; it does not perform it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-2 text-xs text-accent",
						onClick: () => setEgress(null),
						children: "Close"
					})
				]
			})
		]
	});
}
//#endregion
export { Egress as component };
