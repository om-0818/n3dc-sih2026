import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { A as CircleAlert, P as ArrowRight, a as ShieldCheck, r as Sun, u as Radar, x as Flame } from "../_libs/lucide-react.mjs";
import { a as cn } from "./router-C-fsLIL7.mjs";
import { D as useCadastre, c as REGION_STATS, i as Button, n as AppShell, s as PMC_TAX_PILOT, v as formatUlpinGroups } from "./app-shell-BSG3YbSA.mjs";
import { t as StatusBadge } from "./status-badge-C6d8KJlO.mjs";
import { t as format } from "../_libs/date-fns.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-D2qfd3EQ.mjs";
import { i as Bar, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bh3n7ybj.js
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const cases = useCadastre((s) => s.cases);
	const setCase = useCadastre((s) => s.setCase);
	const audit = useCadastre((s) => s.audit);
	const featured = cases.find((c) => c.id === "SR-2026-11345") ?? cases[0];
	const queue = cases.filter((c) => c.status === "under_review");
	const counts = [
		{
			name: "Review",
			n: cases.filter((c) => c.status === "under_review").length
		},
		{
			name: "Approved",
			n: cases.filter((c) => c.status === "approved").length
		},
		{
			name: "Flagged",
			n: cases.filter((c) => c.status === "flagged").length
		},
		{
			name: "Rejected",
			n: cases.filter((c) => c.status === "rejected").length
		}
	];
	const metrics = [
		{
			label: "Total buildings",
			value: REGION_STATS.buildings.toLocaleString("en-IN"),
			hint: "+3.2% this month"
		},
		{
			label: "3D towers",
			value: REGION_STATS.towers.toLocaleString("en-IN"),
			hint: "+2.1% this month"
		},
		{
			label: "Land parcels",
			value: REGION_STATS.parcels.toLocaleString("en-IN"),
			hint: "+1.6% this month"
		},
		{
			label: "Active applications",
			value: String(REGION_STATS.applications),
			hint: "Live queue"
		},
		{
			label: "Approved projects",
			value: String(REGION_STATS.approved),
			hint: "+5.6% verified"
		},
		{
			label: "LIDAR coverage",
			value: `${REGION_STATS.lidarKm2.toLocaleString("en-IN")} km²`,
			hint: "Pune Urban · 260 of 527 km² mapped"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "National 3D Vertical Land & Property Cadastre",
		subtitle: "Pune Urban Region · PMC / PCMC · v-ULPIN · LIDAR",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl flex-col gap-5 p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6",
					children: metrics.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "relative overflow-hidden pl-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 left-0 w-1 bg-accent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
								className: "p-4 pb-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
									children: m.label
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-4 pt-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-sans text-xl font-semibold tabular-nums whitespace-nowrap sm:text-2xl",
									children: m.value
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("mt-1 text-xs", m.label === "Active applications" ? "text-review" : "text-ok"),
									children: m.hint
								})]
							})
						]
					}, m.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureLink, {
							to: "/lidar",
							icon: Radar,
							kicker: "Airborne · UTM India",
							title: "LIDAR vertical mapping",
							body: "Drop a LAS tile or fly the synthetic India block. Invert the LUT. Classify ground, building, water."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureLink, {
							to: "/solar",
							icon: Sun,
							kicker: "Easements Act, 1882",
							title: "Shadow & sunlight rights",
							body: "Does this tower steal winter light from the north neighbour? Move the sun and find out."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureLink, {
							to: "/emergency",
							icon: Flame,
							kicker: "UDCPR · NBC Part 4",
							title: "Fire-tender access",
							body: "A 5.6 m engine has to physically thread the compound. The 4.8 m throat fails."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureLink, {
							to: "/audit",
							icon: ShieldCheck,
							kicker: "SHA-256 chain",
							title: "Immutable title ledger",
							body: "Every approve, flag and conveyance is a block. Tamper the middle and Verify breaks."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-5 lg:grid-cols-[1.4fr_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground",
										children: "Priority ULPIN"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-mono text-lg font-semibold tracking-wide sm:text-xl",
										children: formatUlpinGroups(featured.ulpin)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-1 text-xl font-semibold",
										children: featured.project
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: [
											"linked case ",
											featured.id,
											" · ",
											featured.district,
											" · ",
											featured.floors,
											" floors +",
											" ",
											featured.basements,
											" basements"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-wrap items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: featured.status }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-warn",
												children: "RERA carpet +1.2%"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-danger",
												children: "ST_3DIntersects"
											})
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								onClick: () => setCase(featured.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/review",
									children: ["Open compliance workspace", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 border-t border-border text-center text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Height",
									v: `${featured.heightM} m`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Units",
									v: String(featured.units)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Plot",
									v: `${featured.plotArea.toLocaleString("en-IN")} m²`
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Queue mix" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "h-44",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: counts,
								barSize: 22,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										tick: { fontSize: 11 },
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { hide: true }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										cursor: { fill: "color-mix(in oklab, var(--ink) 6%, transparent)" },
										contentStyle: {
											fontSize: 12,
											borderRadius: 8,
											border: "1px solid var(--border)",
											background: "var(--card)",
											color: "var(--ink)"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "n",
										fill: "var(--navy-mid)",
										radius: [
											4,
											4,
											0,
											0
										]
									})
								]
							})
						})
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-5 lg:grid-cols-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							className: "flex-row items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Under review" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/applications",
								className: "text-xs font-medium text-accent hover:underline",
								children: "All applications"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "flex flex-col gap-0 px-0",
							children: queue.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/review",
								onClick: () => setCase(c.id),
								className: "flex items-center justify-between gap-3 border-t border-border px-5 py-3 hover:bg-secondary/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-mono text-xs font-semibold tracking-wide",
											children: formatUlpinGroups(c.ulpin)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-sm font-medium",
											children: c.project
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "truncate text-xs text-muted-foreground",
											children: [
												"linked case ",
												c.id,
												" · ",
												c.location
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status })]
							}, c.id))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Live system alerts" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertRow, {
								tone: "warn",
								text: "Height constraint near Lohegaon OLS — Viman Nagar Heights",
								time: "10:30"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertRow, {
								tone: "info",
								text: "New LAS tile · Baner 47/2A (PMC / MRSAC)",
								time: "10:15"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertRow, {
								tone: "warn",
								text: "Subsurface utility clash · Green Heights Basement 2",
								time: "Yesterday"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/emergency",
										children: "Fire access"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/solar",
										children: "Solar rights"
									})
								})]
							})
						]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-5 lg:grid-cols-[1.4fr_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "PMC 3D Twin drone survey — unregistered subset" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "overflow-x-auto px-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-5 pb-3 text-xs text-muted-foreground",
							children: "Published MahaPREIT / PMC pilot figures (₹55.42 cr across 78 properties). This is a static replay for the registrar demo — not a live PMC or Bhunaksha feed."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "text-xs uppercase tracking-wider text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-2 font-medium",
										children: "Ward office"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-2 font-medium",
										children: "Unregistered"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-5 py-2 font-medium",
										children: "₹ crore"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: PMC_TAX_PILOT.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-2",
										children: row.ward
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-2 tabular-nums",
										children: row.n
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-2 tabular-nums",
										children: row.crore.toFixed(2)
									})
								]
							}, row.ward)) })]
						})]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Vertical Property Card" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col gap-3 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "MLRC 1966 §148 amendment: every flat gets a VPC with carpet, UDS and encumbrances. New MahaRERA projects auto-issue from Jan 2026; existing societies apply collectively (₹500 / flat) by Dec 2027." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "2D Mahabhunaksha still cannot see strata. N3DC is the 3D overlay — not a live Bhunaksha socket." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/ulpin",
									children: "Encode a v-ULPIN"
								})
							})
						]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex-row items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Recent ledger events" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/audit",
						className: "text-xs font-medium text-accent hover:underline",
						children: "Open ledger"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "overflow-x-auto px-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-xs uppercase tracking-wider text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-2 font-medium",
									children: "When"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-2 font-medium",
									children: "Event"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-2 font-medium",
									children: "Actor"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: audit.slice(-4).reverse().map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "whitespace-nowrap px-5 py-2.5 text-muted-foreground",
									children: format(new Date(e.at), "dd MMM")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-2.5",
									children: e.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-2.5 text-muted-foreground",
									children: e.actor
								})
							]
						}, e.hash)) })]
					})
				})] }) })
			]
		})
	});
}
function FeatureLink({ to, icon: Icon, kicker, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "group rounded-xl bg-card p-4 shadow-[var(--shadow-border)] transition-colors hover:bg-secondary/40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-accent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-semibold uppercase tracking-[0.16em]",
					children: kicker
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 text-base font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent",
				children: ["Open module", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 transition-transform group-hover:translate-x-0.5" })]
			})
		]
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] uppercase tracking-wider text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-semibold tabular-nums",
			children: v
		})]
	});
}
function AlertRow({ text, time, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: cn("mt-0.5 size-4 shrink-0", tone === "warn" ? "text-warn" : "text-accent") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "shrink-0 text-xs text-muted-foreground",
			children: time
		})]
	});
}
//#endregion
export { Dashboard as component };
