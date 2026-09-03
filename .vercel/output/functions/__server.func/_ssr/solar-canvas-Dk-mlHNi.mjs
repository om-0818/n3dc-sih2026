import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { l as Canvas, n as GizmoHelper, r as OrbitControls, s as Line, t as GizmoViewport } from "../_libs/@react-three/drei+[...].mjs";
import { c as useLutInvert, l as useTheme } from "./router-C-fsLIL7.mjs";
import { D as useCadastre, T as selectCase } from "./app-shell-BSG3YbSA.mjs";
import { r as sceneSky, t as lutCss } from "./lidar-color-CJzUaZm1.mjs";
import { n as SceneLights, r as TowerFrame, t as CityContext } from "./tower-frame-B6lvXXOT.mjs";
import { r as sunDirection } from "./sun-CCmnZNxZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/solar-canvas-Dk-mlHNi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SunPath({ day }) {
	const pts = (0, import_react.useMemo)(() => {
		const a = [];
		for (let h = 6; h <= 18; h += .5) a.push(sunDirection(h, day, 70));
		return a;
	}, [day]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
		points: pts,
		color: "#e8c15a",
		lineWidth: 1,
		transparent: true,
		opacity: .7
	}), pts.filter((_, i) => i % 2 === 0).map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: p,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			.38,
			8,
			8
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			color: "#f3d27a",
			transparent: true,
			opacity: .55
		})]
	}, i))] });
}
function ShadowFan({ hour, day, invert, height }) {
	const dir = sunDirection(hour, day, 1);
	if (dir[1] < .08) return null;
	const k = height / dir[1];
	const dx = -dir[0] * k;
	const dz = -dir[2] * k;
	const len = Math.hypot(dx, dz);
	const yaw = Math.atan2(dx, dz);
	const color = lutCss(invert ? .15 : .82, invert);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			dx / 2,
			.05,
			dz / 2
		],
		rotation: [
			-Math.PI / 2,
			0,
			-yaw
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [24, Math.max(8, len)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			color,
			transparent: true,
			opacity: invert ? .32 : .22,
			depthWrite: false
		})]
	});
}
function SolarCanvas({ hour, day, heightM }) {
	const caze = useCadastre(selectCase);
	const layers = useCadastre((s) => s.layers);
	const selectedFloor = useCadastre((s) => s.selectedFloor);
	const sun = sunDirection(hour, day, 70);
	const night = sun[1] < 8;
	const sunPos = [
		sun[0],
		Math.max(sun[1], 4),
		sun[2]
	];
	const dark = useTheme((s) => s.mode) === "dark";
	const invert = useLutInvert();
	const daySky = sceneSky(dark);
	const sky = night ? "#1a2a3c" : daySky;
	const camY = Math.min(56, 14 + heightM * .12);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
		shadows: true,
		dpr: [1, 1.75],
		camera: {
			position: [
				36,
				camY,
				8
			],
			fov: 42,
			near: .1,
			far: 400
		},
		gl: {
			antialias: true,
			alpha: false
		},
		onCreated: ({ gl }) => {
			gl.setClearColor(sky);
			gl.toneMapping = 4;
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
					180
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneLights, {
				sun: sunPos,
				intensity: night ? .18 : 1.7,
				dark: night || dark
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: sunPos,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					2.4,
					16,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: night ? "#9aa8b8" : "#ffe08a" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunPath, { day }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShadowFan, {
				hour,
				day,
				invert,
				height: heightM
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TowerFrame, {
				selectedFloor,
				layers: {
					...layers,
					encroachments: false,
					utilities: false
				},
				xray: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CityContext, { showNorthHouse: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
				makeDefault: true,
				enableDamping: true,
				maxPolarAngle: Math.PI * .48,
				target: [
					0,
					Math.min(18, heightM * .2),
					-10
				],
				minDistance: 18,
				maxDistance: 140
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GizmoHelper, {
				alignment: "top-right",
				margin: [56, 56],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GizmoViewport, {
					axisColors: [
						"#c0392b",
						"#1f8a4c",
						"#5aa0c8"
					],
					labelColor: night || dark ? "#e6edf5" : "#132033"
				})
			})
		]
	}, caze.ulpin);
}
//#endregion
export { SolarCanvas as default };
