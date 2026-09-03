import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { O as Copy } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as copyText } from "./router-C-fsLIL7.mjs";
import { D as useCadastre, T as selectCase, _ as floorListForCase, g as floorLabel, h as floorElevation, i as Button, m as encodeUlpin, n as AppShell, v as formatUlpinGroups, w as parseVUlpin, y as formatVUlpin } from "./app-shell-BSG3YbSA.mjs";
import { t as Input } from "./input-BCDuUHLy.mjs";
import { t as CasePicker } from "./case-picker-CK_Oo5a-.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-D2qfd3EQ.mjs";
import { n as constructionKind, r as unitsForCase, t as Label } from "./units-hDi1G9wJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ulpin-DRYlAeHE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UlpinPage() {
	const caze = useCadastre(selectCase);
	const [lat, setLat] = (0, import_react.useState)(String(caze.lat));
	const [lng, setLng] = (0, import_react.useState)(String(caze.lng));
	const [floor, setFloor] = (0, import_react.useState)(Math.min(6, caze.floors));
	const [unit, setUnit] = (0, import_react.useState)("0601");
	const [raw, setRaw] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setLat(String(caze.lat));
		setLng(String(caze.lng));
		setFloor(Math.min(6, caze.floors));
		setUnit(constructionKind(caze) === "RES" ? "0601" : `${constructionKind(caze)}01`);
		setRaw("");
	}, [
		caze.ulpin,
		caze.lat,
		caze.lng,
		caze.floors
	]);
	const floors = floorListForCase(caze);
	const units = (0, import_react.useMemo)(() => unitsForCase(caze), [caze]);
	const kind = constructionKind(caze);
	const ulpin = (0, import_react.useMemo)(() => {
		const la = Number(lat);
		const ln = Number(lng);
		if (!Number.isFinite(la) || !Number.isFinite(ln)) return caze.ulpin;
		if (Math.abs(la - caze.lat) < 1e-6 && Math.abs(ln - caze.lng) < 1e-6) return caze.ulpin;
		return encodeUlpin(la, ln);
	}, [
		lat,
		lng,
		caze.ulpin,
		caze.lat,
		caze.lng
	]);
	const vUlpin = formatVUlpin(ulpin, floor, unit, floorElevation(floor, caze.floors), caze.floors);
	const parsed = parseVUlpin(raw || vUlpin);
	const copy = async (value) => {
		if (await copyText(value)) toast.message("Copied");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Vertical ULPIN",
		subtitle: "Unique Land Parcel Identification Number · 3D extension",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CasePicker, { tone: "dark" }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-5 p-4 sm:p-6 lg:grid-cols-[1fr_1fr]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Encode a v-ULPIN" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "14-digit 2D ULPIN from latitude / longitude, then floor band, unit and orthometric elevation. This is the identifier the registrar seals onto the ledger."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "lat",
								children: "Latitude"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "lat",
								value: lat,
								onChange: (e) => setLat(e.target.value)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "lng",
								children: "Longitude"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "lng",
								value: lng,
								onChange: (e) => setLng(e.target.value)
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "floor",
								children: "Floor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								id: "floor",
								value: floor,
								onChange: (e) => setFloor(Number(e.target.value)),
								className: "flex h-10 w-full rounded-md border border-input bg-card px-3 text-sm",
								children: floors.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: f,
									children: floorLabel(f, caze.floors)
								}, f))
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "unit",
								children: "Unit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "unit",
								value: unit,
								onChange: (e) => setUnit(e.target.value)
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-navy px-3 py-3 text-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-wider text-white/60",
									children: "3D ULPIN"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-lg font-semibold tracking-wide",
									children: formatUlpinGroups(ulpin)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 text-[10px] uppercase tracking-wider text-white/60",
									children: "v-ULPIN"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "break-all text-sm",
										children: vUlpin
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => void copy(vUlpin),
										"aria-label": "Copy v-ULPIN",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 text-[11px] text-white/55",
									children: [
										caze.project,
										" · ",
										kind,
										" · linked case ",
										caze.id
									]
								})
							]
						}),
						caze.lidarMeasuredHeightM != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"LiDAR-measured height for this ULPIN:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold tabular-nums text-ink",
									children: [caze.lidarMeasuredHeightM.toFixed(1), " m"]
								}),
								" ",
								"vs declared ",
								caze.heightM.toFixed(1),
								" m",
								caze.ctsNo ? ` · CTS ${caze.ctsNo}` : "",
								"."
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
							className: "grid grid-cols-2 gap-2 text-xs sm:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
									k: "ULPIN",
									v: ulpin
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
									k: "Band",
									v: parsed?.band ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
									k: "Unit",
									v: parsed?.unit ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Part, {
									k: "Z",
									v: parsed ? `${parsed.elevation.toFixed(1)} m` : "—"
								})
							]
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Decode" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "raw",
							children: "Paste a v-ULPIN"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "raw",
							value: raw,
							placeholder: vUlpin,
							onChange: (e) => setRaw(e.target.value)
						}),
						parsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid grid-cols-2 gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted-foreground",
									children: "2D ULPIN"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-mono text-xs",
									children: parsed.ulpin
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted-foreground",
									children: "Band"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-mono",
									children: parsed.band
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted-foreground",
									children: "Unit"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-mono",
									children: parsed.unit
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted-foreground",
									children: "Elevation"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [parsed.elevation.toFixed(1), " m MSL offset"] })] })
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-danger",
							children: "Could not parse. Expect ULPIN-BAND-UNIT-Z±elev."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setRaw(vUlpin),
							children: "Fill from encoder"
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, { children: [
						"Unit register — ",
						caze.project,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-2 text-xs font-normal text-muted-foreground",
							children: [
								formatUlpinGroups(caze.ulpin),
								" · ",
								kind,
								" · ",
								caze.floors,
								"F + ",
								caze.basements,
								"B"
							]
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "overflow-x-auto px-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "text-[10px] uppercase tracking-wider text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-2 font-medium",
										children: "Unit"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-2 font-medium",
										children: "Kind"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-2 font-medium",
										children: "Floor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-2 font-medium",
										children: "Carpet"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-2 font-medium",
										children: "Owner"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-2 font-medium",
										children: "v-ULPIN"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: units.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "cursor-pointer border-t border-border hover:bg-secondary/60",
								onClick: () => {
									setFloor(u.floor);
									setUnit(u.unit);
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-2.5 font-medium",
										children: u.unit
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-2.5 font-mono text-[11px]",
										children: u.kind ?? kind
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-2.5",
										children: floorLabel(u.floor, caze.floors)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-5 py-2.5 tabular-nums",
										children: [u.carpetM2.toFixed(1), " m²"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-2.5",
										children: u.owner
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-2.5 font-mono text-[11px] text-accent",
										children: u.vUlpin
									})
								]
							}, u.vUlpin)) })]
						})
					})]
				})
			]
		})
	});
}
function Part({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-md bg-secondary px-2 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] uppercase tracking-wider text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "truncate font-mono text-xs",
			children: v
		})]
	});
}
//#endregion
export { UlpinPage as component };
