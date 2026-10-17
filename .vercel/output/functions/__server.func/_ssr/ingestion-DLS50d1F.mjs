import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Shell, n as Panel, o as useSoc } from "./shell-CQAIUQsf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ingestion-DLS50d1F.js
var import_jsx_runtime = require_jsx_runtime();
function Ingest() {
	const payload = useSoc((s) => s.payload);
	const setPayload = useSoc((s) => s.setPayload);
	const run = useSoc((s) => s.runIngest);
	const out = useSoc((s) => s.tokenized);
	const hits = useSoc((s) => s.hits);
	const ms = useSoc((s) => s.ingestMs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "Ingestion Engine",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 max-w-2xl text-sm text-muted",
			children: "Local deterministic mock. Highlighting and tokens run in the browser only. This is not enterprise-grade protection."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Input payload",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: payload,
							onChange: (e) => setPayload(e.target.value),
							className: "h-56 w-full rounded-md border border-line bg-bg p-3 font-mono text-xs",
							"aria-label": "Payload editor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-3 rounded-md bg-accent px-3 py-2 text-sm font-medium text-on",
							onClick: run,
							children: "Run mock detection"
						}),
						ms !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-mono text-[11px] text-muted",
							children: [
								"Mock processing ",
								ms,
								" ms · ",
								hits.length,
								" hits"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Detection",
					children: [hits.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Run detection to list masked hits."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1 text-sm",
						children: hits.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "font-mono text-xs",
							children: [
								h.name,
								": ",
								h.sample
							]
						}, i))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Original",
					className: "lg:col-span-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "overflow-auto whitespace-pre-wrap font-mono text-xs text-muted",
						children: payload
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Tokenized preview",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "overflow-auto whitespace-pre-wrap font-mono text-xs text-mint",
						children: out || "—"
					})
				})
			]
		})]
	});
}
//#endregion
export { Ingest as component };
