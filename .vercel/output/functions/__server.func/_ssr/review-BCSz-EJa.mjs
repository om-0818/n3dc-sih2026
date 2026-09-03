import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { N as Box, S as Flag, b as Hand, c as Ruler, g as Maximize2, j as Check, l as RotateCcw, n as TriangleAlert, p as Move, s as Scan, t as X, y as Layers } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as cn } from "./router-C-fsLIL7.mjs";
import { D as useCadastre, E as shortHash, T as selectCase, _ as floorListForCase, d as carpetDeltaPct, g as floorLabel, i as Button, l as Sheet, n as AppShell, u as SheetContent, v as formatUlpinGroups } from "./app-shell-BSG3YbSA.mjs";
import { t as StatusBadge } from "./status-badge-C6d8KJlO.mjs";
import { t as format } from "../_libs/date-fns.mjs";
import { t as CasePicker } from "./case-picker-CK_Oo5a-.mjs";
import { i as ReviewViewport, n as EngineMark } from "./viewport-frame-MoDpJWjw.mjs";
import { i as Viewport, n as Scrollbar, r as Thumb, t as Root } from "../_libs/radix-ui__react-scroll-area.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/review-BCSz-EJa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HashGrid({ hash }) {
	const cells = hash.replace(/[^0-9a-f]/gi, "").slice(0, 64).split("").map((ch, i) => parseInt(ch, 16) % 2 === 0 || i % 7 === 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid size-24 grid-cols-8 gap-px rounded-md bg-navy p-1",
		"aria-hidden": "true",
		children: cells.slice(0, 64).map((on, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: on ? "bg-white" : "bg-navy" }, i))
	});
}
function PropertyCard({ caze, entry }) {
	const delta = carpetDeltaPct(caze.carpetDeclared, caze.carpetMeasured);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "overflow-hidden rounded-xl border border-border bg-card text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between bg-navy px-5 py-3 text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.18em] text-white/70",
					children: "Department of Registration & Stamps · Maharashtra"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: "3D Vertical Property Card"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-right font-mono text-[10px] text-white/70",
					children: "N3DC · v-ULPIN"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 p-5 sm:grid-cols-[1fr_auto]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid grid-cols-2 gap-x-4 gap-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: "3D ULPIN"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-mono text-base font-semibold tracking-wide",
								children: formatUlpinGroups(caze.ulpin)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted-foreground",
							children: "Project"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-medium",
							children: caze.project
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted-foreground",
							children: "Linked case"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono text-xs text-muted-foreground",
							children: caze.id
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: "v-ULPIN"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-mono text-xs text-accent",
								children: caze.vUlpin ?? "Pending seal"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted-foreground",
							children: "RERA"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono text-xs",
							children: caze.reraId
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted-foreground",
							children: "Extents"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
							caze.floors,
							"F + ",
							caze.basements,
							"B · ",
							caze.heightM,
							" m"
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted-foreground",
							children: "Carpet Δ"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: delta > 1 ? "text-warn" : "text-ok",
							children: [
								delta >= 0 ? "+" : "",
								delta.toFixed(2),
								"%"
							]
						})] })
					]
				}), entry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HashGrid, { hash: entry.hash }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HashGrid, { hash: caze.ulpin.repeat(5) })]
			}),
			entry ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border px-5 py-3 font-mono text-[10px] text-muted-foreground",
				children: [
					"Sealed ",
					format(new Date(entry.at), "dd MMM yyyy HH:mm"),
					" · ",
					shortHash(entry.hash)
				]
			}) : null
		]
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-navy-deep/50", className),
	...props
}));
DialogOverlay.displayName = "DialogOverlay";
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-card p-6 text-ink shadow-[var(--shadow-panel)]", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = "DialogContent";
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("text-lg font-semibold tracking-tight", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
		className: "h-full w-full rounded-[inherit]",
		children
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scrollbar, {
		orientation: "vertical",
		className: "flex w-2.5 touch-none select-none border-l border-l-transparent p-px",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, { className: "relative flex-1 rounded-full bg-border" })
	})]
}));
ScrollArea.displayName = "ScrollArea";
var LAYERS = [
	{
		key: "building",
		label: "Building Model"
	},
	{
		key: "floors",
		label: "Floor Slices (3D)"
	},
	{
		key: "parcels",
		label: "Parcels (3D)"
	},
	{
		key: "encroachments",
		label: "Encroachments"
	},
	{
		key: "setbacks",
		label: "Setbacks"
	},
	{
		key: "utilities",
		label: "Utilities"
	},
	{
		key: "lidar",
		label: "LIDAR cloud"
	}
];
function ReviewPage() {
	const caze = useCadastre(selectCase);
	const selectedFloor = useCadastre((s) => s.selectedFloor);
	const layers = useCadastre((s) => s.layers);
	const toggleLayer = useCadastre((s) => s.toggleLayer);
	const setFloor = useCadastre((s) => s.setFloor);
	const tool = useCadastre((s) => s.tool);
	const setTool = useCadastre((s) => s.setTool);
	const xray = useCadastre((s) => s.xray);
	const ortho = useCadastre((s) => s.ortho);
	const approve = useCadastre((s) => s.approve);
	const flag = useCadastre((s) => s.flag);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [confirm, setConfirm] = (0, import_react.useState)(null);
	const [sealed, setSealed] = (0, import_react.useState)(null);
	const [fs, setFs] = (0, import_react.useState)(false);
	const [mobileLayers, setMobileLayers] = (0, import_react.useState)(false);
	const delta = carpetDeltaPct(caze.carpetDeclared, caze.carpetMeasured);
	const locked = caze.status === "approved" || caze.status === "rejected";
	const onApprove = async () => {
		setBusy(true);
		try {
			const entry = await approve();
			setSealed(entry);
			toast.success("3D ULPIN sealed to ledger");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Approve failed");
		} finally {
			setBusy(false);
			setConfirm(null);
		}
	};
	const onFlag = async () => {
		setBusy(true);
		try {
			await flag("3D intersection / RERA carpet dispute held pending site inspection.");
			toast.message("Case flagged and held");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Flag failed");
		} finally {
			setBusy(false);
			setConfirm(null);
		}
	};
	const tools = (0, import_react.useMemo)(() => [
		{
			id: "orbit",
			icon: RotateCcw,
			label: "Orbit"
		},
		{
			id: "pan",
			icon: Hand,
			label: "Pan"
		},
		{
			id: "measure",
			icon: Ruler,
			label: "Measure"
		},
		{
			id: "reset",
			icon: Move,
			label: "Reset view"
		}
	], []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "REGISTRAR COMPLIANCE CONTROL PANEL",
		subtitle: `${caze.city} · ${caze.authority} · v-ULPIN workspace`,
		flush: true,
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CasePicker, { tone: "dark" }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-full min-h-0 flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid min-w-0 shrink-0 grid-cols-2 border-b border-border bg-card md:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 px-3 py-1.5 md:px-4 md:py-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] font-medium uppercase tracking-wider text-muted-foreground",
										children: "3D ULPIN"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate font-mono text-[11px] font-semibold tracking-wide sm:text-sm",
										children: formatUlpinGroups(caze.ulpin)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "truncate text-[10px] text-muted-foreground",
										children: ["linked case ", caze.id]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
								label: "Project",
								value: caze.project
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
								label: "Location",
								value: caze.location
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-between gap-2 px-3 py-1.5 md:px-4 md:py-2.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-medium uppercase tracking-wider text-muted-foreground",
									children: "Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: caze.status })] })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative min-h-[38vh] flex-1 md:min-h-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ReviewViewport, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pointer-events-auto absolute left-3 top-3 z-10 hidden w-56 flex-col gap-3 md:flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
									title: "Layer Controls",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayerList, {
										layers,
										toggleLayer
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
									title: "Floor Selector",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
										className: "h-56",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloorList, {
											caze,
											selectedFloor,
											setFloor
										})
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "pointer-events-auto absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-md bg-card/95 px-2.5 py-1.5 text-xs font-medium shadow-[var(--shadow-panel)] md:hidden",
								onClick: () => setMobileLayers(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }), "Layers"]
							}),
							caze.violations.some((v) => v.severity === "warn" || /rera|carpet/i.test(v.code + v.title)) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
								tone: "warn",
								title: caze.violations.find((v) => v.severity === "warn" || /rera|carpet/i.test(v.code + v.title))?.title ?? "Warning",
								className: "absolute right-4 top-16 z-10 hidden max-w-56 md:block"
							}) : null,
							layers.encroachments && caze.intersects3d ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
								tone: "danger",
								title: caze.violations.find((v) => v.severity === "alert")?.title ?? "Alert: ST_3DIntersects == TRUE (Subsurface Utility Encroachment)",
								className: "absolute right-4 top-48 z-10 hidden max-w-64 md:block"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5 rounded-lg border border-border bg-card/95 p-1 shadow-[var(--shadow-panel)]",
								children: [
									tools.map((t) => {
										const Icon = t.icon;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											title: t.label,
											onClick: () => setTool(t.id),
											className: cn("flex size-9 items-center justify-center rounded-md text-ink/80 hover:bg-secondary", tool === t.id && "bg-navy text-white hover:bg-navy"),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
										}, t.id);
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										title: "X-ray floors",
										onClick: () => setTool("xray"),
										className: cn("flex size-9 items-center justify-center rounded-md hover:bg-secondary", xray && "bg-navy text-white"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scan, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										title: "Orthographic",
										onClick: () => setTool("ortho"),
										className: cn("flex size-9 items-center justify-center rounded-md hover:bg-secondary", ortho && "bg-navy text-white"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										title: "Fullscreen",
										onClick: () => {
											const el = document.documentElement;
											if (!document.fullscreenElement) {
												el.requestFullscreen();
												setFs(true);
											} else {
												document.exitFullscreen();
												setFs(false);
											}
										},
										className: "flex size-9 items-center justify-center rounded-md hover:bg-secondary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-4" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineMark, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: fs ? "Fullscreen" : ""
							})
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid shrink-0 gap-px border-t border-border bg-border md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "bg-card px-3 py-2 md:px-4 md:py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mb-1.5 hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground md:mb-2 md:block",
									children: "Validation Summary"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											ok: caze.topologyValid,
											danger: !caze.topologyValid,
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }),
											label: caze.topologyValid ? "Topology Valid" : "Topology open"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											warn: true,
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5" }),
											label: `RERA Carpet Area ${delta >= 0 ? "+" : ""}${delta.toFixed(1)}% Deviation`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											danger: caze.intersects3d,
											ok: !caze.intersects3d,
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5" }),
											label: caze.intersects3d ? "3D Intersection Detected" : "No 3D intersection"
										}),
										caze.lidarMeasuredHeightM != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											ok: Math.abs(caze.lidarMeasuredHeightM - caze.heightM) / caze.heightM <= .02,
											warn: Math.abs(caze.lidarMeasuredHeightM - caze.heightM) / caze.heightM > .02 && Math.abs(caze.lidarMeasuredHeightM - caze.heightM) / caze.heightM <= .05,
											danger: Math.abs(caze.lidarMeasuredHeightM - caze.heightM) / caze.heightM > .05,
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scan, { className: "size-3.5" }),
											label: `LiDAR height ${caze.lidarMeasuredHeightM.toFixed(1)} m vs ${caze.heightM.toFixed(1)} m`
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 hidden flex-wrap gap-3 text-xs md:flex",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/lidar",
											className: "text-accent underline-offset-2 hover:underline",
											children: "LIDAR"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/solar",
											className: "text-accent underline-offset-2 hover:underline",
											children: "Solar envelope"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/emergency",
											className: "text-accent underline-offset-2 hover:underline",
											children: "Fire access"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/audit",
											className: "text-accent underline-offset-2 hover:underline",
											children: "Ledger"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/ulpin",
											className: "text-accent underline-offset-2 hover:underline",
											children: "v-ULPIN"
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "bg-card px-3 py-2 md:px-4 md:py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-1.5 hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground md:mb-2 md:block",
								children: "Recommended Action"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-row gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ok",
									className: "flex-1",
									size: "sm",
									disabled: locked || busy,
									onClick: () => setConfirm("approve"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), "Approve 3D ULPIN"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "danger",
									className: "flex-1",
									size: "sm",
									disabled: locked || busy,
									onClick: () => setConfirm("flag"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-4" }), "Flag Dispute"]
								})]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: confirm !== null,
				onOpenChange: () => setConfirm(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: confirm === "approve" ? "Seal 3D ULPIN?" : "Flag dispute and hold?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: confirm === "approve" ? caze.intersects3d ? "ST_3DIntersects is still TRUE. Approval will be recorded as an exception on the immutable ledger." : "This writes a SHA-256 chained record and issues a vertical ULPIN for the current floor stack." : "The case remains on hold. No v-ULPIN is issued until the subsurface clash is cleared." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setConfirm(null),
					children: "Cancel"
				}), confirm === "approve" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ok",
					disabled: busy,
					onClick: () => void onApprove(),
					children: "Confirm approve"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "danger",
					disabled: busy,
					onClick: () => void onFlag(),
					children: "Confirm hold"
				})] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!sealed,
				onOpenChange: () => setSealed(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Property card issued" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Hash-chained to the Pune Urban Region ledger. Copy the v-ULPIN into the registry extract." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PropertyCard, {
							caze: {
								...caze,
								vUlpin: sealed?.vUlpin ?? caze.vUlpin
							},
							entry: sealed
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/audit",
								children: "Open ledger"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => setSealed(null),
							children: "Done"
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: mobileLayers,
				onOpenChange: setMobileLayers,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "left",
					className: "bg-card text-ink",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-3 text-sm font-semibold",
							children: "Layers & floors"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayerList, {
							layers,
							toggleLayer
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-2 mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
							children: "Floor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
							className: "h-64",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloorList, {
								caze,
								selectedFloor,
								setFloor
							})
						})
					]
				})
			})
		]
	});
}
function Meta({ label, value, mono }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-3 py-1.5 md:px-4 md:py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] font-medium uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("truncate text-sm font-semibold", mono && "font-mono"),
			children: value
		})]
	});
}
function Panel({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-card/95 p-3 shadow-[var(--shadow-panel)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
			children: title
		}), children]
	});
}
function Callout({ title, tone, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-md px-3 py-2 text-xs font-semibold leading-snug shadow-[var(--shadow-panel)]", tone === "warn" && "bg-floor text-ink", tone === "danger" && "bg-danger text-white", className),
		children: title
	});
}
function Chip({ label, icon, ok, warn, danger }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", ok && "bg-ok/10 text-ok", warn && "bg-warn/10 text-warn", danger && "bg-danger/10 text-danger"),
		children: [icon, label]
	});
}
function LayerList({ layers, toggleLayer }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-1.5",
		children: LAYERS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "flex cursor-pointer items-center gap-2 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "checkbox",
				className: "size-3.5 accent-navy",
				checked: layers[l.key],
				onChange: () => toggleLayer(l.key)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn(l.key === "encroachments" && layers.encroachments && "text-danger"),
				children: l.label
			})]
		}) }, l.key))
	});
}
function FloorList({ caze, selectedFloor, setFloor }) {
	const alertFloors = new Set(caze.violations.filter((v) => v.floor != null).map((v) => v.floor));
	if (caze.intersects3d) alertFloors.add(-Math.min(2, Math.max(1, caze.basements)));
	const list = floorListForCase(caze);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "pr-2",
		children: list.map((f) => {
			const active = f === selectedFloor;
			const alert = alertFloors.has(f);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFloor(f),
				className: cn("flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm", active && !alert && "bg-floor/25 font-medium text-ink", active && alert && "bg-danger/15 font-medium text-danger", !active && alert && "text-danger", !active && !alert && "hover:bg-secondary"),
				children: floorLabel(f, caze.floors)
			}) }, f);
		})
	});
}
//#endregion
export { ReviewPage as component };
