import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as OrthographicCamera, c as Html, i as PerspectiveCamera, l as Canvas, n as GizmoHelper, r as OrbitControls, t as GizmoViewport, y as Vector3 } from "../_libs/@react-three/drei+[...].mjs";
import { l as useTheme } from "./router-C-fsLIL7.mjs";
import { D as useCadastre, T as selectCase } from "./app-shell-BSG3YbSA.mjs";
import { r as sceneSky } from "./lidar-color-CJzUaZm1.mjs";
import { n as LidarPoints } from "./lidar-points-jr9Ec6a-.mjs";
import { n as SceneLights, r as TowerFrame, t as CityContext } from "./tower-frame-B6lvXXOT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/building-canvas-BUd3QKCb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MeasureLayer() {
	const points = useCadastre((s) => s.measurePoints);
	const dist = (0, import_react.useMemo)(() => {
		if (points.length < 2) return null;
		const a = new Vector3(...points[0]);
		const b = new Vector3(...points[1]);
		return a.distanceTo(b);
	}, [points]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [points.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: p,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			.28,
			12,
			12
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#5aa0c8" })]
	}, i)), points.length === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("line", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferGeometry", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferAttribute", {
		attach: "attributes-position",
		args: [new Float32Array([...points[0], ...points[1]]), 3]
	}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineBasicMaterial", { color: "#5aa0c8" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
		position: mid(points[0], points[1]),
		center: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-md bg-navy px-2 py-1 font-mono text-xs text-white",
			children: [dist?.toFixed(2), " m"]
		})
	})] }) : null] });
}
function mid(a, b) {
	return [
		(a[0] + b[0]) / 2,
		(a[1] + b[1]) / 2 + .8,
		(a[2] + b[2]) / 2
	];
}
function PickableSite() {
	const tool = useCadastre((s) => s.tool);
	const push = useCadastre((s) => s.pushMeasure);
	const selectedFloor = useCadastre((s) => s.selectedFloor);
	const layers = useCadastre((s) => s.layers);
	const xray = useCadastre((s) => s.xray);
	const onDown = (e) => {
		if (tool !== "measure") return;
		e.stopPropagation();
		push([
			e.point.x,
			e.point.y,
			e.point.z
		]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		onPointerDown: onDown,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TowerFrame, {
				selectedFloor,
				layers,
				xray
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CityContext, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LidarPoints, {})
		]
	});
}
function Cameras() {
	const ortho = useCadastre((s) => s.ortho);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerspectiveCamera, {
		makeDefault: !ortho,
		position: [
			34,
			22,
			40
		],
		fov: 40,
		near: .1,
		far: 400
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrthographicCamera, {
		makeDefault: ortho,
		position: [
			34,
			28,
			40
		],
		zoom: 16,
		near: -200,
		far: 400
	})] });
}
function BuildingCanvas() {
	const controls = (0, import_react.useRef)(null);
	const tool = useCadastre((s) => s.tool);
	const caze = useCadastre(selectCase);
	const dark = useTheme((s) => s.mode) === "dark";
	const sky = sceneSky(dark);
	const night = dark;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
		shadows: true,
		dpr: [1, 1.75],
		gl: {
			antialias: true,
			alpha: false
		},
		onCreated: ({ gl }) => {
			gl.setClearColor(sky);
			gl.toneMapping = 4;
			gl.toneMappingExposure = night ? .95 : 1.08;
			gl.shadowMap.enabled = true;
			gl.shadowMap.type = 1;
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
					70,
					night ? 160 : 190
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cameras, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneLights, {
				dark: night,
				intensity: night ? .55 : 1.35
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PickableSite, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeasureLayer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
				ref: controls,
				makeDefault: true,
				enableDamping: true,
				dampingFactor: .08,
				enableRotate: tool !== "pan",
				enablePan: true,
				maxPolarAngle: Math.PI * .49,
				minDistance: 16,
				maxDistance: 180,
				target: [
					0,
					4,
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
					labelColor: night ? "#e6edf5" : "#132033"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
				position: [
					0,
					-12,
					0
				],
				style: {
					pointerEvents: "none",
					opacity: 0,
					width: 0,
					height: 0
				},
				children: caze.ulpin
			})
		]
	}, caze.ulpin);
}
//#endregion
export { BuildingCanvas as default };
