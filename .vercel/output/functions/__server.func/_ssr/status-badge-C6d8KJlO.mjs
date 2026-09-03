import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as cn } from "./router-C-fsLIL7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-badge-C6d8KJlO.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium tracking-wide", {
	variants: { variant: {
		default: "border-transparent bg-secondary text-ink",
		navy: "border-transparent bg-navy text-white",
		ok: "border-transparent bg-ok/15 text-ok",
		warn: "border-transparent bg-warn/15 text-warn",
		danger: "border-transparent bg-danger/15 text-danger",
		review: "border-transparent bg-review/15 text-review",
		outline: "border-border text-muted-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var MAP = {
	under_review: {
		label: "Under Review",
		variant: "review"
	},
	approved: {
		label: "Approved",
		variant: "ok"
	},
	flagged: {
		label: "Flagged",
		variant: "warn"
	},
	rejected: {
		label: "Rejected",
		variant: "danger"
	}
};
function StatusBadge({ status }) {
	const m = MAP[status];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: m.variant,
		children: m.label
	});
}
//#endregion
export { StatusBadge as t };
