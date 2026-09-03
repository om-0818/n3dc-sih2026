import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as cn } from "./router-C-fsLIL7.mjs";
import { D as useCadastre, T as selectCase, v as formatUlpinGroups } from "./app-shell-BSG3YbSA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/case-picker-CK_Oo5a-.js
var import_jsx_runtime = require_jsx_runtime();
function CasePicker({ tone = "light", className }) {
	const cases = useCadastre((s) => s.cases);
	const current = useCadastre(selectCase);
	const setByUlpin = useCadastre((s) => s.setCaseByUlpin);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: cn("flex min-w-0 items-center gap-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("hidden shrink-0 text-[10px] font-medium uppercase tracking-wider sm:inline", tone === "dark" ? "text-white/60" : "text-muted-foreground"),
			children: "ULPIN"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			"aria-label": "Select 3D ULPIN parcel",
			value: current.ulpin,
			onChange: (e) => setByUlpin(e.target.value),
			className: cn("h-8 max-w-[min(220px,46vw)] truncate rounded-md border px-2 text-xs font-medium", tone === "dark" ? "border-white/20 bg-white/10 text-white" : "border-border bg-card text-ink"),
			children: cases.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
				value: c.ulpin,
				className: "text-ink",
				children: [
					formatUlpinGroups(c.ulpin),
					" · ",
					c.project
				]
			}, c.ulpin))
		})]
	});
}
//#endregion
export { CasePicker as t };
