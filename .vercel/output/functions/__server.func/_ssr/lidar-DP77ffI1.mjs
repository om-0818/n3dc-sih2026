import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { E as Download, O as Copy, T as FileUp, k as Contrast, l as RotateCcw, s as Scan } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as cn, c as useLutInvert, l as useTheme, o as copyText } from "./router-C-fsLIL7.mjs";
import { C as measureLidar, D as useCadastre, S as lidarApiBase, T as selectCase, a as LIDAR_ACCEPT, b as heightDeltaTone, f as cloudForCase, i as Button, n as AppShell, o as LIDAR_DEMOS, p as cloudToXyz, r as BACKEND_CURL, t as ASPRS_LABEL, v as formatUlpinGroups } from "./app-shell-BSG3YbSA.mjs";
import { t as CasePicker } from "./case-picker-CK_Oo5a-.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-D2qfd3EQ.mjs";
import { t as lutCss } from "./lidar-color-CJzUaZm1.mjs";
import { n as EngineMark, r as LidarViewport } from "./viewport-frame-MoDpJWjw.mjs";
import { t as Slider } from "./slider-BbA8muU2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lidar-DP77ffI1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LUTS = [
	{
		id: "elevation",
		label: "Elevation"
	},
	{
		id: "intensity",
		label: "Intensity"
	},
	{
		id: "class",
		label: "ASPRS class"
	},
	{
		id: "rgb",
		label: "RGB"
	}
];
var CLASS_FILTERS = [
	2,
	3,
	5,
	6,
	9,
	11,
	13,
	14
];
function LidarPage() {
	const caze = useCadastre(selectCase);
	const ingest = useCadastre((s) => s.ingestLidar);
	const clear = useCadastre((s) => s.clearLidarUpload);
	const setByUlpin = useCadastre((s) => s.setCaseByUlpin);
	const busy = useCadastre((s) => s.lidarBusy);
	const err = useCadastre((s) => s.lidarError);
	const source = useCadastre((s) => s.lidarSource);
	const fileName = useCadastre((s) => s.lidarFileName);
	const revision = useCadastre((s) => s.lidarRevision);
	const enabled = useCadastre((s) => s.enabledClasses);
	const toggleClass = useCadastre((s) => s.toggleClass);
	const lut = useTheme((s) => s.lidarLut);
	const setLut = useTheme((s) => s.setLidarLut);
	const invert = useLutInvert();
	const toggleInvert = useTheme((s) => s.toggleLidarInvert);
	const size = useTheme((s) => s.lidarPointSize);
	const setSize = useTheme((s) => s.setLidarPointSize);
	const inputRef = (0, import_react.useRef)(null);
	const [drag, setDrag] = (0, import_react.useState)(false);
	const remote = Boolean(lidarApiBase());
	const cloud = (0, import_react.useMemo)(() => cloudForCase(caze, source !== "synthetic"), [
		caze,
		source,
		revision
	]);
	const metrics = (0, import_react.useMemo)(() => measureLidar(cloud, caze), [cloud, caze]);
	const tone = heightDeltaTone(metrics.deltaPct);
	const ulpinShown = formatUlpinGroups(cloud.header.ulpin || caze.ulpin);
	const onFile = async (file) => {
		if (!file) return;
		try {
			await ingest(file);
			toast.success(`ULPIN ${caze.ulpin} · loaded ${file.name}`);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Ingest failed");
		}
	};
	const loadDemo = async (demo) => {
		setByUlpin(demo.ulpin);
		try {
			const res = await fetch(demo.file);
			if (!res.ok) throw new Error("Demo tile missing");
			const blob = await res.blob();
			const file = new File([blob], demo.file.split("/").pop() ?? "demo.xyz", { type: "text/plain" });
			await ingest(file);
			toast.success(`Tile for ULPIN ${formatUlpinGroups(demo.ulpin)}`);
		} catch {
			clear();
			toast.message(`Synthetic ${demo.ward} block · ULPIN ${formatUlpinGroups(demo.ulpin)}`);
		}
	};
	const downloadXyz = () => {
		const text = cloudToXyz(cloud, `ULPIN ${caze.ulpin} · ${caze.project} · ${caze.location}`);
		const blob = new Blob([text], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${caze.ulpin}.xyz`;
		a.click();
		URL.revokeObjectURL(url);
	};
	const copyContract = async (kind) => {
		if (kind === "python") {
			const text = await (await fetch("/n3dc_lidar_ingest.py")).text();
			if (await copyText(text)) toast.message("Python ingest service copied — send to backend");
			return;
		}
		if (await copyText(BACKEND_CURL)) toast.message("cURL snippet copied");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "LIDAR Ingest & Vertical Mapping",
		subtitle: `${ulpinShown} · ${caze.city} · EPSG:32643`,
		flush: true,
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CasePicker, { tone: "dark" }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full min-h-0 min-w-0 flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_24rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative h-[44vh] min-h-[260px] min-w-0 shrink-0 lg:h-auto lg:min-h-0 lg:flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LidarViewport, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-none absolute left-3 top-3 z-10 rounded-md bg-card/95 px-3 py-2.5 shadow-[var(--shadow-panel)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
								children: "3D ULPIN"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-base font-semibold tracking-wide text-ink sm:text-lg",
								children: ulpinShown
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 text-xs font-medium",
								children: caze.project
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-muted-foreground",
								children: [
									"linked case ",
									caze.id,
									caze.ctsNo ? ` · CTS ${caze.ctsNo}` : ""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: [
									metrics.pointCount.toLocaleString("en-IN"),
									" pts · ",
									metrics.densityPtsM2.toFixed(1),
									" ",
									"pts/m² · ",
									source === "synthetic" ? "synthetic Pune block" : fileName
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute bottom-3 left-3 z-10 flex overflow-hidden rounded-md text-[10px] font-medium shadow-[var(--shadow-panel)]",
						children: Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-2 w-6",
							style: { background: lutCss(i / 7, invert) }
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngineMark, {})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden border-t border-border bg-card lg:border-l lg:border-t-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-navy px-3 py-3 text-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60",
									children: "3D ULPIN — legal identifier"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 font-mono text-lg font-semibold tracking-wide",
									children: ulpinShown
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-[11px] text-white/55",
									children: [
										"linked case ",
										caze.id,
										" · ",
										caze.ward ?? caze.location
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("rounded-lg px-3 py-2.5", tone === "ok" && "bg-ok/10 text-ok", tone === "warn" && "bg-warn/10 text-warn", tone === "alert" && "bg-danger/10 text-danger"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm font-semibold",
								children: [
									"LiDAR height ",
									metrics.measuredHeightM.toFixed(1),
									" m vs declared",
									" ",
									metrics.declaredHeightM.toFixed(1),
									" m"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 text-xs opacity-90",
								children: [
									"Stamped onto ULPIN ",
									caze.ulpin,
									". Δ ",
									metrics.deltaM >= 0 ? "+" : "",
									metrics.deltaM.toFixed(2),
									" m (",
									metrics.deltaPct >= 0 ? "+" : "",
									metrics.deltaPct.toFixed(1),
									"%) · ground ",
									metrics.groundZ.toFixed(2),
									" m · class-6 roof ",
									metrics.buildingZMax.toFixed(2),
									" m.",
									" ",
									tone === "ok" ? "Inside RERA 2% band." : "Cross-check BIM before seal."
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onDragOver: (e) => {
								e.preventDefault();
								setDrag(true);
							},
							onDragLeave: () => setDrag(false),
							onDrop: (e) => {
								e.preventDefault();
								setDrag(false);
								onFile(e.dataTransfer.files[0]);
							},
							className: cn("rounded-xl border border-dashed px-4 py-5 text-center", drag ? "border-accent bg-accent/10" : "border-border bg-secondary/40"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "mx-auto size-6 text-accent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm font-medium",
									children: "Drop LAS / XYZ / N3DC tile"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										"Joins on ULPIN ",
										formatUlpinGroups(caze.ulpin),
										". Browser reads uncompressed LAS and XYZ.",
										" ",
										remote ? "LAZ/E57 POST to the ingest API." : "LAZ and E57 need the backend ingest service — not live in this demo."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: inputRef,
									type: "file",
									className: "hidden",
									accept: LIDAR_ACCEPT.join(","),
									onChange: (e) => void onFile(e.target.files?.[0])
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex justify-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										disabled: busy,
										onClick: () => inputRef.current?.click(),
										children: busy ? "Reading…" : "Choose file"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										onClick: clear,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Synthetic"]
									})]
								}),
								err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-danger",
									children: err
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
							children: "Pune demo tiles"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-col gap-1.5",
							children: LIDAR_DEMOS.map((d) => {
								const active = caze.ulpin === d.ulpin;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => void loadDemo(d),
									className: cn("rounded-md px-3 py-2.5 text-left", active ? "bg-navy text-white" : "bg-secondary text-ink hover:bg-muted"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-mono text-sm font-semibold tracking-wide",
											children: formatUlpinGroups(d.ulpin)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-0.5 text-xs font-medium",
											children: [
												d.ward,
												" CTS ",
												d.cts,
												" · ",
												d.label
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("text-[10px]", active ? "text-white/55" : "text-muted-foreground"),
											children: ["linked case ", d.caseId]
										})
									]
								}, d.ulpin);
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
								children: "Colour lookup"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 grid grid-cols-2 gap-1.5",
								children: LUTS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setLut(l.id),
									className: cn("rounded-md px-2 py-1.5 text-xs font-medium", lut === l.id ? "bg-navy text-white" : "bg-secondary text-ink hover:bg-muted"),
									children: l.label
								}, l.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: toggleInvert,
								className: cn("mt-2 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md text-xs font-medium", invert ? "bg-accent text-accent-foreground" : "bg-secondary text-ink"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contrast, { className: "size-3.5" }), invert ? "LUT inverted (night)" : "Standard LUT"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-1 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Point size" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums",
										children: size.toFixed(2)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									value: [size],
									min: .16,
									max: .9,
									step: .02,
									onValueChange: (v) => setSize(v[0] ?? .42)
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
							children: "ASPRS classes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-1",
							children: CLASS_FILTERS.map((k) => {
								const n = cloud.header.classes[String(k)] ?? 0;
								const on = enabled.includes(k);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex cursor-pointer items-center justify-between gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											className: "size-3.5 accent-accent",
											checked: on,
											onChange: () => toggleClass(k)
										}), ASPRS_LABEL[k] ?? `Class ${k}`]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums text-muted-foreground",
										children: n.toLocaleString("en-IN")
									})]
								}) }, k);
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "shadow-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
								className: "p-0 pb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
									className: "flex items-center gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scan, { className: "size-3.5 text-accent" }), "Tile header"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "grid grid-cols-2 gap-x-3 gap-y-1.5 p-0 font-mono text-[11px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[9px] uppercase tracking-wider text-muted-foreground",
											children: "3D ULPIN"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-semibold tracking-wide text-ink",
											children: ulpinShown
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
										k: "CTS",
										v: caze.ctsNo ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
										k: "CRS",
										v: cloud.header.crs || "EPSG:32643"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
										k: "Datum",
										v: cloud.header.verticalDatum || "EGM2008"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
										k: "Origin",
										v: metrics.bbox.lat ? `${metrics.bbox.lat.toFixed(4)}° N, ${metrics.bbox.lng.toFixed(4)}° E` : "local metres"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
										k: "Elevation",
										v: `${metrics.zMin.toFixed(1)} – ${metrics.zMax.toFixed(1)} m`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
										k: "Ward",
										v: caze.ward ?? caze.location
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
										k: "Sensor",
										v: cloud.header.sensor
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[9px] uppercase tracking-wider text-muted-foreground",
											children: "Linked case"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-muted-foreground",
											children: caze.id
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-secondary/60 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
									children: "Backend contract"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "ULPIN is the required join key. caseId is an audit reference only. LAZ, E57, EPSG reprojection, EGM2008 and Bhunaksha parcel clip live on the GIS service — they are not stubbed as live in this browser."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => void copyContract("curl"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), "Copy cURL"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => void copyContract("python"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), "Copy Python"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "navy",
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: "/n3dc_lidar_ingest.py",
												download: true,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "Download .py"]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "outline",
											onClick: downloadXyz,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "This XYZ"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
									className: "mt-2 max-w-full overflow-x-auto whitespace-pre-wrap break-all rounded-md bg-navy-deep p-2 font-mono text-[10px] leading-relaxed text-white/80",
									children: BACKEND_CURL
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/review",
								children: "Open this ULPIN in case review"
							})
						})
					]
				})
			})]
		})
	});
}
function Meta({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[9px] uppercase tracking-wider text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "truncate text-ink",
			children: v
		})]
	});
}
//#endregion
export { LidarPage as component };
