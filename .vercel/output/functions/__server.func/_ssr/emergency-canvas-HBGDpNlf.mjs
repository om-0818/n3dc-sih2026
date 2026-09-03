import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as Html, l as Canvas, n as GizmoHelper, p as CatmullRomCurve3, r as OrbitControls, s as Line, t as GizmoViewport, u as useFrame, y as Vector3 } from "../_libs/@react-three/drei+[...].mjs";
import { l as useTheme } from "./router-C-fsLIL7.mjs";
import { D as useCadastre, T as selectCase } from "./app-shell-BSG3YbSA.mjs";
import { r as sceneSky } from "./lidar-color-CJzUaZm1.mjs";
import { n as SceneLights, r as TowerFrame, t as CityContext } from "./tower-frame-B6lvXXOT.mjs";
import { t as simulateAccess } from "./access-DhNv62cr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/emergency-canvas-HBGDpNlf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PATH = [
	[
		42,
		.4,
		18
	],
	[
		28,
		.4,
		18
	],
	[
		18,
		.4,
		18
	],
	[
		12,
		.4,
		10
	],
	[
		10,
		.4,
		0
	],
	[
		10,
		.4,
		-8
	],
	[
		4,
		.4,
		-14
	]
];
function Truck({ playing, pinchAt, runId }) {
	const ref = (0, import_react.useRef)(null);
	const tRef = (0, import_react.useRef)(0);
	const playingRef = (0, import_react.useRef)(playing);
	playingRef.current = playing;
	const curve = (0, import_react.useMemo)(() => new CatmullRomCurve3(PATH.map((p) => new Vector3(...p))), []);
	(0, import_react.useEffect)(() => {
		tRef.current = 0;
	}, [runId]);
	useFrame((_, delta) => {
		if (!ref.current) return;
		const dt = Math.min(delta, .1);
		if (playingRef.current) tRef.current = Math.min(pinchAt, tRef.current + dt * .2);
		const t = Math.max(0, Math.min(.999, tRef.current));
		const p = curve.getPointAt(t);
		const look = curve.getPointAt(Math.min(.999, t + .02));
		ref.current.position.copy(p);
		ref.current.lookAt(look);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.7,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.4,
					1.1,
					5.6
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#9b1b1b",
					roughness: .45,
					metalness: .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.45,
					-.8
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.2,
					.7,
					2.4
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#7a1515",
					roughness: .5
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.55,
					1.6
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.3,
					.9,
					.3
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#c9a227" })]
			})
		]
	});
}
function Roads({ actualM, minM, pass }) {
	const throat = Math.max(3.6, actualM);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				26,
				.06,
				18
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [36, Math.max(6.2, actualM)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#5d6168",
				roughness: .9
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				10,
				.06,
				4
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [throat, 28] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: pass ? "#5a6168" : "#6a4a3a",
				roughness: .9
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				10 + throat / 2 + .2,
				.9,
				4
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.4,
				1.8,
				10
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#c4b8a4" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				10 - throat / 2 - .2,
				.9,
				4
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.4,
				1.8,
				10
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#c4b8a4" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				4,
				.7,
				-14
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.35,
				.35,
				1.2,
				10
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#b42318",
				metalness: .4,
				roughness: .4
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
			position: [
				10,
				2.4,
				6
			],
			center: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: pass ? "rounded-md bg-ok px-2 py-1 text-xs font-semibold text-white" : "rounded-md bg-danger px-2 py-1 text-xs font-semibold text-white",
				children: [
					actualM.toFixed(1),
					" m · required ",
					minM.toFixed(1),
					" m"
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
			position: [
				26,
				2.2,
				18
			],
			center: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-md bg-navy px-2 py-1 text-xs font-semibold text-white",
				children: "Approach"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
			position: [
				4,
				2.6,
				-14
			],
			center: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-md bg-navy px-2 py-1 text-xs font-semibold text-white",
				children: "Hydrant H-04"
			})
		})
	] });
}
function EmergencyCanvas({ playing, runId }) {
	const caze = useCadastre(selectCase);
	const sim = simulateAccess(caze);
	const layers = useCadastre((s) => s.layers);
	const selectedFloor = useCadastre((s) => s.selectedFloor);
	const dark = useTheme((s) => s.mode) === "dark";
	const sky = sceneSky(dark);
	const night = dark;
	const camY = Math.min(48, 18 + caze.heightM * .12);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
		shadows: true,
		dpr: [1, 1.75],
		frameloop: "always",
		camera: {
			position: [
				48,
				camY,
				36
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
					80,
					200
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneLights, {
				sun: [
					30,
					50,
					20
				],
				dark: night,
				intensity: night ? .5 : 1.35
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TowerFrame, {
				selectedFloor,
				layers: {
					...layers,
					encroachments: false,
					utilities: false,
					parcels: false
				},
				xray: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CityContext, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Roads, {
				actualM: caze.fireRoadActualM,
				minM: caze.fireRoadMinM,
				pass: sim.pass
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
				points: PATH,
				color: sim.pass ? "#15803d" : "#c2410c",
				lineWidth: 2,
				dashed: true,
				dashSize: 1,
				gapSize: .6
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, {
				playing,
				pinchAt: sim.pathEnd,
				runId
			}, runId),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
				makeDefault: true,
				enableDamping: true,
				target: [
					8,
					2,
					6
				],
				minDistance: 16,
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
					labelColor: night ? "#e6edf5" : "#132033"
				})
			})
		]
	}, caze.ulpin);
}
//#endregion
export { EmergencyCanvas as default };
