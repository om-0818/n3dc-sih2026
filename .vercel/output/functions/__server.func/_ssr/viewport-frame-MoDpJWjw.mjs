import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { D as Cuboid } from "../_libs/lucide-react.mjs";
import { a as cn } from "./router-C-fsLIL7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/viewport-frame-MoDpJWjw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClientOnly({ children, fallback }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	if (!mounted) return fallback ?? null;
	return children;
}
var BuildingCanvas = (0, import_react.lazy)(() => import("./building-canvas-BUd3QKCb.mjs"));
var SolarCanvas = (0, import_react.lazy)(() => import("./solar-canvas-Dk-mlHNi.mjs"));
var EmergencyCanvas = (0, import_react.lazy)(() => import("./emergency-canvas-HBGDpNlf.mjs"));
var LidarCanvas = (0, import_react.lazy)(() => import("./lidar-canvas-DCWg9taO.mjs"));
function Skeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full w-full items-center justify-center bg-sky",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-2 text-ink/70",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cuboid, { className: "size-8 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide",
				children: "Loading spatial twin"
			})]
		})
	});
}
function ReviewViewport({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full min-h-[280px] w-full overflow-hidden bg-sky",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildingCanvas, {})
			})
		}), children]
	});
}
function LidarViewport({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full min-h-[280px] w-full overflow-hidden bg-sky",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LidarCanvas, {})
			})
		}), children]
	});
}
function SolarViewport({ hour, day, heightM }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative h-full min-h-[280px] w-full overflow-hidden bg-sky",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SolarCanvas, {
					hour,
					day,
					heightM
				})
			})
		})
	});
}
function EmergencyViewport({ playing, runId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative h-full min-h-[280px] w-full overflow-hidden bg-sky",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmergencyCanvas, {
					playing,
					runId
				})
			})
		})
	});
}
function EngineMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pointer-events-none absolute bottom-3 right-3 text-right", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/50",
			children: "N3DC Engine"
		})
	});
}
//#endregion
export { SolarViewport as a, ReviewViewport as i, EngineMark as n, LidarViewport as r, EmergencyViewport as t };
