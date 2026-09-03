import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as Play, f as Pause, l as RotateCcw } from "../_libs/lucide-react.mjs";
import { a as cn } from "./router-C-fsLIL7.mjs";
import { D as useCadastre, T as selectCase, i as Button, n as AppShell } from "./app-shell-BSG3YbSA.mjs";
import { t as CasePicker } from "./case-picker-CK_Oo5a-.mjs";
import { t as simulateAccess } from "./access-DhNv62cr.mjs";
import { n as EngineMark, t as EmergencyViewport } from "./viewport-frame-MoDpJWjw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/emergency-D9MVaI7-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EmergencyPage() {
	const caze = useCadastre(selectCase);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [runId, setRunId] = (0, import_react.useState)(0);
	const [done, setDone] = (0, import_react.useState)(false);
	const sim = simulateAccess(caze);
	(0, import_react.useEffect)(() => {
		setPlaying(false);
		setDone(false);
		setRunId((n) => n + 1);
	}, [caze.ulpin]);
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		const ms = sim.blocked ? 2800 : 4600;
		const t = window.setTimeout(() => setDone(true), ms);
		return () => window.clearTimeout(t);
	}, [
		playing,
		runId,
		sim.blocked
	]);
	const reset = () => {
		setPlaying(false);
		setDone(false);
		setRunId((n) => n + 1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Fire-Tender Access",
		subtitle: "UDCPR clearance route · 3D compound simulation",
		flush: true,
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CasePicker, { tone: "dark" }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full min-h-0 flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_22rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-[42vh] min-h-[240px] shrink-0 lg:h-auto lg:min-h-0 lg:flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmergencyViewport, {
						playing,
						runId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineMark, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-lg border border-border bg-card/95 p-1 shadow-[var(--shadow-panel)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: playing ? "outline" : "navy",
							onClick: () => {
								if (done) {
									reset();
									setPlaying(true);
									return;
								}
								setPlaying((p) => !p);
							},
							children: [playing && !done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), playing && !done ? "Pause" : "Run simulation"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: reset,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Reset"]
						})]
					}),
					done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("absolute left-1/2 top-6 z-20 w-[min(92%,22rem)] -translate-x-1/2 rounded-lg px-3 py-2 text-center text-sm font-semibold text-white shadow-[var(--shadow-panel)]", sim.blocked ? "bg-danger" : "bg-ok"),
						children: sim.blocked ? `BLOCKED — tender cannot pass the ${sim.pinchM.toFixed(1)} m throat. Hydrant H-04 unreachable.` : `CLEAR — tender reaches hydrant H-04. ${caze.fireRoadActualM.toFixed(1)} m ≥ ${caze.fireRoadMinM.toFixed(1)} m UDCPR.`
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "min-h-0 flex-1 overflow-y-auto border-t border-border bg-card lg:max-h-none lg:border-l lg:border-t-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("rounded-lg px-3 py-2.5", sim.pass ? "bg-ok/10 text-ok" : "bg-danger/10 text-danger"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-semibold",
								children: sim.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 text-xs opacity-90",
								children: [
									caze.project,
									" · ",
									caze.ulpin,
									" · required ",
									caze.fireRoadMinM.toFixed(1),
									" m · provided",
									" ",
									caze.fireRoadActualM.toFixed(1),
									" m"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-2",
							children: sim.checks.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-lg border border-border px-3 py-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-medium",
											children: c.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-mono text-[10px] text-muted-foreground",
											children: c.code
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase", c.pass ? "bg-ok/15 text-ok" : "bg-danger/15 text-danger"),
											children: c.pass ? "Pass" : "Fail"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1.5 flex justify-between text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground",
											children: ["Required ", c.required]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium tabular-nums",
											children: c.actual
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] leading-snug text-muted-foreground",
										children: c.note
									})
								]
							}, c.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-relaxed text-muted-foreground",
							children: "Spatial pathfinding on the 3D compound. A 2D plot check cannot prove a 5.6 m tender will physically thread the driveway, ramps and turning bay required by Maharashtra UDCPR and NBC Part 4. Badge and simulation share the same UDCPR run for this ULPIN."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/review",
								children: "Hold on compliance desk"
							})
						})
					]
				})
			})]
		})
	});
}
//#endregion
export { EmergencyPage as component };
