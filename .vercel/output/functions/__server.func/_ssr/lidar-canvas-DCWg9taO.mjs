import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as OrthographicCamera, i as PerspectiveCamera, l as Canvas, n as GizmoHelper, r as OrbitControls, t as GizmoViewport } from "../_libs/@react-three/drei+[...].mjs";
import { l as useTheme } from "./router-C-fsLIL7.mjs";
import { D as useCadastre, T as selectCase } from "./app-shell-BSG3YbSA.mjs";
import { r as sceneSky } from "./lidar-color-CJzUaZm1.mjs";
import { n as LidarPoints, t as LidarGroundGrid } from "./lidar-points-jr9Ec6a-.mjs";
import { n as SceneLights, r as TowerFrame, t as CityContext } from "./tower-frame-B6lvXXOT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lidar-canvas-DCWg9taO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Cameras() {
	const ortho = useCadastre((s) => s.ortho);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerspectiveCamera, {
		makeDefault: !ortho,
		position: [
			38,
			28,
			46
		],
		fov: 38,
		near: .1,
		far: 400
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrthographicCamera, {
		makeDefault: ortho,
		position: [
			38,
			32,
			46
		],
		zoom: 14,
		near: -200,
		far: 400
	})] });
}
function LidarCanvas() {
	const controls = (0, import_react.useRef)(null);
	const tool = useCadastre((s) => s.tool);
	const layers = useCadastre((s) => s.layers);
	const selectedFloor = useCadastre((s) => s.selectedFloor);
	const xray = useCadastre((s) => s.xray);
	const caze = useCadastre(selectCase);
	const dark = useTheme((s) => s.mode) === "dark";
	const sky = sceneSky(dark);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
		dpr: [1, 1.6],
		gl: {
			antialias: true,
			alpha: false
		},
		onCreated: ({ gl }) => {
			gl.setClearColor(sky);
			gl.toneMapping = 4;
			gl.toneMappingExposure = dark ? .92 : 1.05;
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
				attach: "background",
				args: [sky]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
				attach: "fog",
				args: [
					sky,
					90,
					240
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cameras, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneLights, {
				sun: dark ? [
					28,
					46,
					22
				] : [
					40,
					48,
					32
				],
				intensity: dark ? .85 : 1.2,
				dark
			}),
			layers.building ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TowerFrame, {
				selectedFloor,
				layers: {
					...layers,
					lidar: false
				},
				xray
			}) : null,
			layers.building ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CityContext, {}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LidarGroundGrid, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LidarPoints, { force: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
				ref: controls,
				makeDefault: true,
				enableDamping: true,
				dampingFactor: .08,
				enableRotate: tool !== "pan",
				maxPolarAngle: Math.PI * .49,
				minDistance: 12,
				maxDistance: 140,
				target: [
					0,
					8,
					0
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GizmoHelper, {
				alignment: "top-right",
				margin: [64, 64],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GizmoViewport, {
					axisColors: [
						"#c0392b",
						"#1f8a4c",
						"#5aa0c8"
					],
					labelColor: dark ? "#e6edf5" : "#132033"
				})
			})
		]
	}, `${dark ? "night" : "day"}-${caze.ulpin}`);
}
//#endregion
export { LidarCanvas as default };
