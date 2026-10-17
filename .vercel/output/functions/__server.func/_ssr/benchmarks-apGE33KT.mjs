import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useTheme } from "./router-DpiwCnEf.mjs";
import { i as Shell, n as Panel } from "./shell-CQAIUQsf.mjs";
import { a as Bar, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as BarChart, r as YAxis } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/benchmarks-apGE33KT.js
var import_jsx_runtime = require_jsx_runtime();
var proposed = [{
	name: "In-memory target",
	ms: 2
}, {
	name: "Cloud API compare",
	ms: 800
}];
function Bench() {
	const { resolved } = useTheme();
	const axis = resolved === "light" ? "#64748b" : "#a1a1b5";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		title: "Performance Benchmarks",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Proposed targets · from the project narrative, not verified here",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm text-muted",
						children: "The proposal discusses sub-2 ms in-memory processing versus about 800 ms cloud API round trip, on IBM LinuxONE s390x with CPACF. Those claims are not independently measured in this frontend."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-56",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: proposed,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										stroke: axis,
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: axis,
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										background: "var(--card)",
										border: "1px solid var(--border)",
										color: "var(--foreground)"
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "ms",
										fill: resolved === "light" ? "#6d28d9" : "#a78bfa",
										radius: 4
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-1 font-mono text-xs text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "P50 / P95 / P99 — not yet measured" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Throughput — not yet measured" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Sample size — n/a · environment — browser demo" })
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Measured benchmark results",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-56 items-center justify-center rounded-md border border-dashed border-line text-sm text-muted",
					children: "Not yet measured"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "No backend instrumentation is connected. Mock latency numbers elsewhere in the console are labeled demonstration timings only."
				})]
			})]
		})
	});
}
//#endregion
export { Bench as component };
