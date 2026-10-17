import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Shell, n as Panel, o as useSoc } from "./shell-CQAIUQsf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/decoys-kh1-dCvr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Decoys() {
	const [kind, setKind] = (0, import_react.useState)("luhn");
	const [copied, setCopied] = (0, import_react.useState)("");
	const decoys = useSoc((s) => s.decoys);
	const make = useSoc((s) => s.makeDecoy);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "Honey Decoy Lab",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 max-w-2xl text-sm text-muted",
				children: "Attributable decoys are synthetic identifiers that pass a checksum so they look plausible to an exfiltrating agent, then act as tripwires: if they leave the trust boundary, egress policy can block them. Checksum validity is not real-world account validity. All values here are synthetic test data."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Generate",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm",
						children: ["Type", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: kind,
							onChange: (e) => setKind(e.target.value),
							className: "ml-2 rounded-md border border-line bg-bg px-2 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "luhn",
								children: "Luhn mod 10 (synthetic)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "iban",
								children: "IBAN mod 97 country ZZ (synthetic)"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-md bg-accent px-3 py-2 text-sm font-medium text-on",
						onClick: () => make(kind),
						children: "Generate"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[640px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "font-mono text-[11px] text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2",
								children: "ID"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Kind" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Value" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Checksum" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Attribution" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [decoys.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 6,
						className: "py-6 text-muted",
						children: "No decoys yet. Generate one to register a tripwire in this demo."
					}) }), decoys.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 font-mono text-xs",
								children: d.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: d.kind }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "font-mono text-xs",
								children: d.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: d.valid ? "text-mint" : "text-crit",
								children: d.valid ? "math ok" : "fail"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "text-xs text-muted",
								children: d.meta
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-xs text-accent",
								onClick: () => {
									navigator.clipboard.writeText(d.value);
									setCopied(d.id);
								},
								children: copied === d.id ? "Copied" : "Copy"
							}) })
						]
					}, d.id))] })]
				})
			})
		]
	});
}
//#endregion
export { Decoys as component };
