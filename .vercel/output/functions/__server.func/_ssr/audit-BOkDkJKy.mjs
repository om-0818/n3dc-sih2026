import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { O as Copy, _ as Link2, a as ShieldCheck, j as Check, o as ShieldAlert } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as cn, o as copyText } from "./router-C-fsLIL7.mjs";
import { D as useCadastre, E as shortHash, T as selectCase, i as Button, n as AppShell, v as formatUlpinGroups } from "./app-shell-BSG3YbSA.mjs";
import { t as Input } from "./input-BCDuUHLy.mjs";
import { t as format } from "../_libs/date-fns.mjs";
import { t as CasePicker } from "./case-picker-CK_Oo5a-.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-D2qfd3EQ.mjs";
import { r as unitsForCase, t as Label } from "./units-hDi1G9wJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit-BOkDkJKy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KIND = {
	genesis: "Genesis",
	submit: "Submit",
	validate: "Validate",
	approve: "Approve",
	flag: "Flag",
	transfer: "Transfer",
	amend: "Amend"
};
function AuditPage() {
	const audit = useCadastre((s) => s.audit);
	const verified = useCadastre((s) => s.chainVerified);
	const verify = useCadastre((s) => s.verifyChain);
	const tamper = useCadastre((s) => s.tamper);
	const restore = useCadastre((s) => s.restoreChain);
	const transfer = useCadastre((s) => s.transfer);
	const backup = useCadastre((s) => s.backupAudit);
	const caze = useCadastre(selectCase);
	const [unit, setUnit] = (0, import_react.useState)("0601");
	const [buyer, setBuyer] = (0, import_react.useState)("Deshmukh, P.");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const first = unitsForCase(caze).find((u) => u.floor > 0);
		setUnit(first?.unit ?? "0601");
	}, [caze.ulpin]);
	const onVerify = async () => {
		if (await verify()) toast.success("Chain intact — every prevHash matches");
		else toast.error("Chain broken — a block hash no longer links");
	};
	const onTransfer = async () => {
		setBusy(true);
		try {
			const entry = await transfer({
				unit,
				buyer
			});
			toast.success(`Title hashed ${shortHash(entry.hash)}`);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Transfer failed");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Immutable Title Ledger",
		subtitle: "Hash-chained v-ULPIN audit trail · National ledger",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CasePicker, { tone: "dark" }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-5 p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "SHA-256 append-only chain"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Approve, flag and convey write a block. There is no edit, only a later amend."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "navy",
								onClick: () => void onVerify(),
								children: [verified === true ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-4" }), "Verify chain"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "warn",
								onClick: tamper,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4" }), "Simulate tamper"]
							}),
							backup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: restore,
								children: "Restore replica"
							}) : null
						]
					})]
				}),
				verified !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("rounded-lg px-4 py-3 text-sm font-medium", verified ? "bg-ok/10 text-ok" : "bg-danger/10 text-danger"),
					children: verified ? "Verified. Genesis prevHash is 64 zeroes and every subsequent block links." : "BREAK. Block #2 hash was altered; block #3 prevHash no longer matches. Title fraud would be caught here."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 lg:grid-cols-[1fr_20rem]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "flex flex-col",
						children: audit.map((e, i) => {
							const broken = i > 0 && e.prevHash !== audit[i - 1]?.hash;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "relative pl-8",
								children: [
									i < audit.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-[11px] top-7 h-full w-px bg-border" }) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("absolute left-0 top-3 flex size-6 items-center justify-center rounded-full text-[10px] font-bold", broken ? "bg-danger text-white" : "bg-navy text-white"),
										children: e.index
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: cn("mb-3 rounded-xl bg-card p-4 shadow-[var(--shadow-border)]", broken && "ring-1 ring-danger"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-start justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
													children: KIND[e.kind]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "text-sm font-semibold",
													children: e.title
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
													className: "text-xs text-muted-foreground",
													children: format(new Date(e.at), "dd MMM yyyy HH:mm")
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm text-muted-foreground",
												children: e.detail
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
												className: "mt-3 grid gap-1 font-mono text-[10px] text-muted-foreground sm:grid-cols-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-1",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "hash" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
																className: "truncate text-ink",
																children: shortHash(e.hash)
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																className: "text-accent",
																onClick: async () => {
																	if (await copyText(e.hash)) toast.message("Hash copied");
																},
																"aria-label": "Copy hash",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" })
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "truncate",
														children: ["prev ", shortHash(e.prevHash)]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: e.actor }),
													e.vUlpin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "truncate text-accent",
														children: e.vUlpin
													}) : null
												]
											})
										]
									})
								]
							}, `${e.index}-${e.hash}`);
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Record a conveyance" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "flex flex-col gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										"Writes a transfer block for ",
										caze.project,
										". ULPIN",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-ink",
											children: formatUlpinGroups(caze.ulpin)
										}),
										". The previous occupant is retired; the v-ULPIN state is hashed."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "unit",
									children: "Unit"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "unit",
									value: unit,
									onChange: (e) => setUnit(e.target.value)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "buyer",
									children: "Buyer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "buyer",
									value: buyer,
									onChange: (e) => setBuyer(e.target.value)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									disabled: busy || !unit || !buyer,
									onClick: () => void onTransfer(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), "Seal transfer"]
								})
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Why the jury cares" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "Double-booked flats and silent registry edits die here. Every Approve 3D ULPIN click on the compliance desk is a block. Tamper the middle of the chain and Verify fails in front of the registrar."
						})] })]
					})]
				})
			]
		})
	});
}
//#endregion
export { AuditPage as component };
