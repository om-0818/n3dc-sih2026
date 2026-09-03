import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as cn } from "./router-C-fsLIL7.mjs";
import { D as useCadastre, d as carpetDeltaPct, n as AppShell, v as formatUlpinGroups } from "./app-shell-BSG3YbSA.mjs";
import { t as StatusBadge } from "./status-badge-C6d8KJlO.mjs";
import { t as Input } from "./input-BCDuUHLy.mjs";
import { t as format } from "../_libs/date-fns.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/applications-CoMQgcAO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-10 items-center gap-1 rounded-lg bg-secondary p-1", className),
	...props
}));
TabsList.displayName = "TabsList";
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors data-[state=active]:bg-card data-[state=active]:text-ink data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
	...props
}));
TabsTrigger.displayName = "TabsTrigger";
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-3 focus-visible:outline-none", className),
	...props
}));
TabsContent.displayName = "TabsContent";
var FILTERS = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "under_review",
		label: "Review"
	},
	{
		id: "approved",
		label: "Approved"
	},
	{
		id: "flagged",
		label: "Flagged"
	},
	{
		id: "rejected",
		label: "Rejected"
	}
];
function ApplicationsPage() {
	const cases = useCadastre((s) => s.cases);
	const setCase = useCadastre((s) => s.setCase);
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const rows = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		return cases.filter((c) => {
			if (filter !== "all" && c.status !== filter) return false;
			if (!needle) return true;
			return c.project.toLowerCase().includes(needle) || c.id.toLowerCase().includes(needle) || c.location.toLowerCase().includes(needle) || c.city.toLowerCase().includes(needle) || c.ulpin.includes(needle);
		});
	}, [
		cases,
		q,
		filter
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Applications",
		subtitle: "Registrar queue · India",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-4 p-4 sm:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search ULPIN, project, linked case…",
					className: "sm:max-w-sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
					value: filter,
					onValueChange: (v) => setFilter(v),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, { children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: f.id,
						children: f.label
					}, f.id)) })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-x-auto rounded-xl bg-card shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[640px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-[10px] uppercase tracking-wider text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "3D ULPIN"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Project"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Filed"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Carpet Δ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "3D ∩"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Status"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((c) => {
						const delta = carpetDeltaPct(c.carpetDeclared, c.carpetMeasured);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/review",
										onClick: () => setCase(c.id),
										className: "font-mono text-xs font-semibold tracking-wide text-accent hover:underline",
										children: formatUlpinGroups(c.ulpin)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[10px] text-muted-foreground",
										children: ["linked case ", c.id]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium",
										children: c.project
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: c.location
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "whitespace-nowrap px-4 py-3 text-muted-foreground",
									children: format(new Date(c.submittedAt), "dd MMM yyyy")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3 tabular-nums",
									children: [
										delta >= 0 ? "+" : "",
										delta.toFixed(1),
										"%"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: c.intersects3d ? "TRUE" : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status })
								})
							]
						}, c.ulpin);
					}) })]
				}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-4 py-8 text-center text-sm text-muted-foreground",
					children: "No matching applications."
				}) : null]
			})]
		})
	});
}
//#endregion
export { ApplicationsPage as component };
