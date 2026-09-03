import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as cn, s as formatHour } from "./router-C-fsLIL7.mjs";
import { D as useCadastre, T as selectCase, i as Button, n as AppShell } from "./app-shell-BSG3YbSA.mjs";
import { t as CasePicker } from "./case-picker-CK_Oo5a-.mjs";
import { a as SolarViewport, n as EngineMark } from "./viewport-frame-MoDpJWjw.mjs";
import { t as Slider } from "./slider-BbA8muU2.mjs";
import { a as Cell, i as Bar, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
import { i as sunlightHoursOnNorthNeighbor, n as hourlyIllumination, t as SOLAR_PRESETS } from "./sun-CCmnZNxZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/solar-BpEKoAty.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SolarPage() {
	const caze = useCadastre(selectCase);
	const [hour, setHour] = (0, import_react.useState)(10.5);
	const [preset, setPreset] = (0, import_react.useState)("winter");
	const [height, setHeight] = (0, import_react.useState)(caze.heightM);
	const [gap, setGap] = (0, import_react.useState)(28);
	(0, import_react.useEffect)(() => {
		setHeight(caze.heightM);
	}, [caze.ulpin, caze.heightM]);
	const heightMax = Math.max(80, Math.ceil((caze.heightM + 40) / 10) * 10);
	const day = SOLAR_PRESETS.find((p) => p.id === preset)?.day ?? 355;
	const dateLabel = SOLAR_PRESETS.find((p) => p.id === preset)?.dateLabel ?? "21 Dec";
	const hours = sunlightHoursOnNorthNeighbor({
		buildingH: height,
		gapM: gap,
		dayOfYear: day
	});
	const pass = hours >= 4;
	const series = (0, import_react.useMemo)(() => hourlyIllumination({
		buildingH: height,
		gapM: gap,
		dayOfYear: day
	}), [
		height,
		gap,
		day
	]);
	const reduced = Math.max(12, height - 6.3);
	const recovered = sunlightHoursOnNorthNeighbor({
		buildingH: reduced,
		gapM: gap,
		dayOfYear: 355
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Shadow & Sunlight Right",
		subtitle: "Solar envelope · Indian Easements Act, 1882",
		flush: true,
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CasePicker, { tone: "dark" }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full min-h-0 flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_22rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-[42vh] min-h-[240px] shrink-0 lg:h-auto lg:min-h-0 lg:flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SolarViewport, {
						hour,
						day,
						heightM: height
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineMark, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-none absolute left-3 top-3 rounded-md bg-card/95 px-3 py-2 text-xs shadow-[var(--shadow-panel)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium",
							children: caze.project
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-muted-foreground",
							children: [
								dateLabel,
								" · ",
								formatHour(hour),
								" IST"
							]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "min-h-0 flex-1 overflow-y-auto border-t border-border bg-card lg:max-h-none lg:border-l lg:border-t-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("rounded-lg px-3 py-2.5", pass ? "bg-ok/10 text-ok" : "bg-danger/10 text-danger"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-semibold",
								children: pass ? "Easement of light satisfied" : "North neighbour under 4 h winter light"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 text-xs opacity-90",
								children: [
									hours.toFixed(1),
									" h on 21 Dec against a ",
									4,
									" h civic threshold. Filed BIM run: ",
									caze.solarWinterHours.toFixed(1),
									" h."
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
							children: "Season"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-1",
							children: SOLAR_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setPreset(p.id),
								className: cn("rounded-md px-2 py-2 text-xs font-medium", preset === p.id ? "bg-navy text-white" : "bg-secondary text-ink hover:bg-secondary/80"),
								children: p.dateLabel
							}, p.id))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "Sun hour"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono tabular-nums",
								children: formatHour(hour)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min: 6,
							max: 18,
							step: .25,
							value: [hour],
							onValueChange: (v) => setHour(v[0] ?? 12)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "Proposed height"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono tabular-nums",
								children: [height.toFixed(1), " m"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min: 12,
							max: heightMax,
							step: .5,
							value: [height],
							onValueChange: (v) => setHeight(v[0] ?? caze.heightM)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "Gap to north house"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono tabular-nums",
								children: [gap.toFixed(0), " m"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min: 8,
							max: 40,
							step: 1,
							value: [gap],
							onValueChange: (v) => setGap(v[0] ?? 18)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "h-28",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: series,
									barSize: 10,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "hour",
											tickFormatter: (h) => String(h),
											tick: { fontSize: 10 },
											axisLine: false,
											tickLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
											fontSize: 12,
											borderRadius: 8
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "altDeg",
											radius: [
												3,
												3,
												0,
												0
											],
											children: series.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: row.lit ? "var(--ok)" : "var(--danger)" }, row.hour))
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[10px] text-muted-foreground",
								children: "Green = south façade of the north neighbour still receives beam."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-relaxed text-muted-foreground",
							children: "Indian Easements Act, 1882 (ss. 4, 15): a prescriptive easement of light cannot be extinguished by a new high-rise whose winter solar envelope drops the neighbour below four hours of beam. This is the Pune / Mumbai dispute the 2D cadastre cannot see."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-secondary px-3 py-2 text-xs",
							children: [
								"Drop two floors (",
								reduced.toFixed(1),
								" m) and winter light recovers to",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [recovered.toFixed(1), " h"] }),
								recovered >= 4 ? " — threshold met." : "."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/review",
								children: "Open compliance workspace"
							})
						})
					]
				})
			})]
		})
	});
}
//#endregion
export { SolarPage as component };
