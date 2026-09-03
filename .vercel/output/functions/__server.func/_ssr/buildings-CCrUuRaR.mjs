import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { P as ArrowRight } from "../_libs/lucide-react.mjs";
import { a as cn, c as useLutInvert } from "./router-C-fsLIL7.mjs";
import { D as useCadastre, i as Button, n as AppShell, v as formatUlpinGroups } from "./app-shell-BSG3YbSA.mjs";
import { t as StatusBadge } from "./status-badge-C6d8KJlO.mjs";
import { n as CardContent, t as Card } from "./card-D2qfd3EQ.mjs";
import { t as lutCss } from "./lidar-color-CJzUaZm1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/buildings-CCrUuRaR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BuildingsPage() {
	const cases = useCadastre((s) => s.cases);
	const setCase = useCadastre((s) => s.setCase);
	const invert = useLutInvert();
	const cities = (0, import_react.useMemo)(() => [
		"All",
		"Pune",
		...Array.from(new Set(cases.map((c) => c.city))).filter((c) => c !== "Pune")
	], [cases]);
	const [city, setCity] = (0, import_react.useState)("Pune");
	const rows = city === "All" ? cases : cases.filter((c) => c.city === city);
	const maxH = Math.max(...cases.map((c) => c.heightM), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Buildings & Towers",
		subtitle: "Pune Urban · vertical parcels from LIDAR + BIM",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-5 p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-2xl text-sm text-muted-foreground",
					children: "Each tower is a stack of 3D parcels, not a 2D footprint. LiDAR-measured height is cross-checked against the declared BIM envelope before a v-ULPIN is sealed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: cities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setCity(c),
						className: city === c ? "rounded-full bg-navy px-3 py-1 text-xs font-medium text-white" : "rounded-full bg-secondary px-3 py-1 text-xs font-medium text-ink hover:bg-muted",
						children: c
					}, c))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
					children: rows.map((c) => {
						const measured = c.lidarMeasuredHeightM ?? c.heightM;
						const delta = measured - c.heightM;
						const t = c.heightM / maxH;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "flex flex-col",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "flex flex-1 flex-col gap-3 pt-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-mono text-sm font-semibold tracking-wide",
													children: formatUlpinGroups(c.ulpin)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "mt-0.5 truncate text-base font-semibold",
													children: c.project
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "truncate text-xs text-muted-foreground",
													children: [
														c.ward ?? c.district,
														" · ",
														c.authority
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[10px] text-muted-foreground",
													children: ["linked case ", c.id]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1.5 overflow-hidden rounded-full bg-secondary",
										title: "Elevation heatmap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full",
											style: {
												width: `${Math.max(12, t * 100)}%`,
												background: lutCss(t, invert)
											}
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
										className: "grid grid-cols-3 gap-2 text-center text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-md bg-secondary px-1 py-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-muted-foreground",
													children: "Floors"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
													className: "font-semibold tabular-nums",
													children: c.floors
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-md bg-secondary px-1 py-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-muted-foreground",
													children: "Declared"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
													className: "font-semibold tabular-nums",
													children: [c.heightM, " m"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-md bg-secondary px-1 py-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-muted-foreground",
													children: "LiDAR"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
													className: cn("font-semibold tabular-nums", Math.abs(delta) / c.heightM > .02 ? "text-warn" : "text-ok"),
													children: [measured.toFixed(1), " m"]
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-[10px] text-muted-foreground",
										children: [c.ctsNo ? `CTS ${c.ctsNo}` : c.location, c.vUlpin ? ` · ${c.vUlpin}` : ""]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										className: "mt-auto",
										onClick: () => setCase(c.id),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/review",
											children: ["Open twin", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
										})
									})
								]
							})
						}, c.ulpin);
					})
				})
			]
		})
	});
}
//#endregion
export { BuildingsPage as component };
