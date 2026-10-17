import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Shell, n as Panel, o as useSoc, t as Badge } from "./shell-CQAIUQsf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agents-CBE1V9l1.js
var import_jsx_runtime = require_jsx_runtime();
function Agents() {
	const agents = useSoc((s) => s.agents);
	const sel = useSoc((s) => s.selectedAgent);
	const setAgent = useSoc((s) => s.setAgent);
	const open = agents.find((a) => a.id === sel) ?? agents[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		title: "Agent Sandbox",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 max-w-2xl text-sm text-muted",
			children: "Execution here is simulated. It is not a hardware or VM isolate. Authorized calls stay inside declared tools. Unauthorized outbound calls are what the egress warden is meant to stop."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[280px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: agents.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setAgent(a.id),
					className: `w-full rounded-md border p-3 text-left ${open?.id === a.id ? "border-accent bg-card" : "border-line"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-medium",
						children: a.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-mono text-[11px] text-muted",
						children: [
							a.id,
							" · ",
							a.status
						]
					})]
				}) }, a.id))
			}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Inspection",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-muted",
						children: open.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm",
						children: ["Status ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { v: open.status.toUpperCase() })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: ["Permissions: ", open.permissions.join(", ")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 text-xs tracking-wide text-muted uppercase",
						children: "Tool timeline"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-2 space-y-2",
						children: open.calls.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-md border border-line bg-bg-2 p-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs",
									children: c.tool
								}),
								" · ",
								c.kind,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted",
									children: c.detail
								})
							]
						}, i))
					})
				]
			})]
		})]
	});
}
//#endregion
export { Agents as component };
