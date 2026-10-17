import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Shell, o as useSoc, t as Badge } from "./shell-CQAIUQsf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/evaluation-BtO-bWI2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EvalPage() {
	const evals = useSoc((s) => s.evals);
	const runOne = useSoc((s) => s.runOneEval);
	const runAll = useSoc((s) => s.runAllEval);
	const reset = useSoc((s) => s.resetEval);
	const [only, setOnly] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)(null);
	const rows = evals.filter((c) => only === "open" ? c.pass === void 0 : only === "fail" ? c.pass === false : true);
	const detail = evals.find((c) => c.id === open);
	const passed = evals.filter((c) => c.pass).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "Golden Evaluation Suite",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 max-w-2xl text-sm text-muted",
				children: "Illustrative 20-case suite for the demo. Decisions are scripted to the expected verdict. They are not backend-verified security tests and are not official results."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-md bg-accent px-3 py-2 text-sm font-medium text-on",
						onClick: runAll,
						children: "Run mock suite"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-md border border-line px-3 py-2 text-sm",
						onClick: reset,
						children: "Reset"
					}),
					[
						"all",
						"open",
						"fail"
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setOnly(f),
						className: `rounded-md border px-3 py-2 text-sm ${only === f ? "border-accent text-accent" : "border-line"}`,
						children: f
					}, f)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "self-center font-mono text-xs text-muted",
						children: [
							passed,
							"/",
							evals.length,
							" passing in this session"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[760px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "font-mono text-[11px] text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Case" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Scenario" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Expected" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Actual" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "ms" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Ledger" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 font-mono text-xs",
								children: c.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.scenario }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { v: c.expected }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.actual ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { v: c.actual }) : "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.pass === void 0 ? "pending" : c.pass ? "pass" : "fail" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "font-mono",
								children: c.ms ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.ledgerOk === void 0 ? "—" : c.ledgerOk ? "noted" : "no" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "space-x-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-xs text-accent",
									onClick: () => runOne(c.id),
									children: "Run"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-xs text-accent",
									onClick: () => setOpen(c.id),
									children: "Inspect"
								})]
							})
						]
					}, c.id)) })]
				})
			}),
			detail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-md border border-line bg-card p-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-accent",
						children: detail.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: detail.scenario
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-muted",
						children: [
							"Expected ",
							detail.expected,
							". Mock runner echoes that decision. Not a certified test harness."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-2 text-xs text-accent",
						onClick: () => setOpen(null),
						children: "Close"
					})
				]
			})
		]
	});
}
//#endregion
export { EvalPage as component };
