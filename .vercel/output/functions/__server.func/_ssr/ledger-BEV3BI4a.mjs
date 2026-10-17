import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as appendLedger, i as Shell, n as Panel, o as useSoc } from "./shell-CQAIUQsf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ledger-BEV3BI4a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LedgerPage() {
	const ledger = useSoc((s) => s.ledger);
	const chainOk = useSoc((s) => s.chainOk);
	const verify = useSoc((s) => s.verify);
	const [focus, setFocus] = (0, import_react.useState)(null);
	const open = ledger.find((e) => e.id === focus);
	const latest = ledger[ledger.length - 1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "Cryptographic Ledger",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 max-w-2xl text-sm text-muted",
				children: "Demonstration sequential SHA-256 hash chain via Web Crypto. This is not a Merkle tree and does not claim CPACF or LinuxONE acceleration."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Entries",
						v: String(ledger.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Latest hash",
						v: latest ? latest.hash.slice(0, 18) + "…" : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Verification",
						v: chainOk === null ? "not run" : chainOk ? "intact" : "broken"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mb-4 rounded-md bg-accent px-3 py-2 text-sm font-medium text-on",
				onClick: () => {
					if (ledger.length === 0) {
						appendLedger(void 0, "GENESIS_NOTE", "seed:demo-chain").then((e) => {
							useSoc.setState({
								ledger: [e],
								chainOk: null
							});
						});
						return;
					}
					verify();
				},
				children: ledger.length === 0 ? "Seed chain" : "Verify integrity"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 overflow-x-auto pb-2",
				children: [ledger.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setFocus(e.id),
					className: "min-w-36 rounded-md border border-line bg-card p-2 text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[10px] text-accent",
							children: e.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs",
							children: e.eventType
						}),
						i < ledger.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] text-muted",
							children: "links →"
						})
					]
				}, e.id)), ledger.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Empty chain. Seed it or finish the simulation."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[720px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "font-mono text-[11px] text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "ID" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Time" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Type" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Prev" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Hash" })
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ledger.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 font-mono text-xs",
								children: e.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "font-mono text-[11px]",
								children: e.ts
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: e.eventType }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "font-mono text-[11px]",
								children: [e.prevHash.slice(0, 10), "…"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "font-mono text-[11px]",
								children: [e.hash.slice(0, 10), "…"]
							})
						]
					}, e.id)) })]
				})
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Linked event",
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs break-all",
						children: open.hash
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: open.payload
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-2 text-xs text-accent",
						onClick: () => setFocus(null),
						children: "Close"
					})
				]
			})
		]
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-line bg-card p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-mono text-sm",
			children: v
		})]
	});
}
//#endregion
export { LedgerPage as component };
