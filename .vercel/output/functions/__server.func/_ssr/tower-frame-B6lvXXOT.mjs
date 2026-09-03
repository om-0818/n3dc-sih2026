import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as RepeatWrapping, f as CanvasTexture, g as Quaternion, o as Edges, s as Line, v as SRGBColorSpace, y as Vector3 } from "../_libs/@react-three/drei+[...].mjs";
import { D as useCadastre, T as selectCase, x as isRoofFloor } from "./app-shell-BSG3YbSA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tower-frame-B6lvXXOT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function makeFacadeTexture(base, seed = 1) {
	const c = document.createElement("canvas");
	c.width = 256;
	c.height = 512;
	const ctx = c.getContext("2d");
	if (!ctx) throw new Error("canvas");
	ctx.fillStyle = base;
	ctx.fillRect(0, 0, 256, 512);
	ctx.fillStyle = shade(base, -12);
	ctx.fillRect(0, 0, 256, 18);
	const cols = 5;
	const rows = 12;
	for (let r = 0; r < rows; r++) for (let col = 0; col < cols; col++) {
		ctx.fillStyle = (r * 11 + col * 7 + seed) % 4 !== 0 ? "#d7e4f0" : "#24313c";
		ctx.fillRect(18 + col * 48, 28 + r * 38, 26, 18);
	}
	const tex = new CanvasTexture(c);
	tex.anisotropy = 4;
	tex.colorSpace = SRGBColorSpace;
	tex.wrapS = RepeatWrapping;
	tex.wrapT = RepeatWrapping;
	return tex;
}
function shade(hex, amt) {
	const n = parseInt(hex.replace("#", ""), 16);
	const r = Math.max(0, Math.min(255, (n >> 16) + amt));
	const g = Math.max(0, Math.min(255, (n >> 8 & 255) + amt));
	const b = Math.max(0, Math.min(255, (n & 255) + amt));
	return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
}
var NEIGHBORS = [
	{
		p: [
			-42,
			14,
			-36
		],
		s: [
			18,
			28,
			16
		],
		c: "#8aa0b3",
		seed: 2
	},
	{
		p: [
			-58,
			10,
			-8
		],
		s: [
			14,
			20,
			14
		],
		c: "#7d93a6",
		seed: 3
	},
	{
		p: [
			-48,
			18,
			28
		],
		s: [
			16,
			36,
			14
		],
		c: "#93a7b8",
		seed: 4
	},
	{
		p: [
			48,
			16,
			-32
		],
		s: [
			18,
			32,
			15
		],
		c: "#8499ab",
		seed: 5
	},
	{
		p: [
			62,
			12,
			6
		],
		s: [
			14,
			24,
			16
		],
		c: "#90a4b5",
		seed: 6
	},
	{
		p: [
			50,
			20,
			38
		],
		s: [
			20,
			40,
			16
		],
		c: "#7b90a2",
		seed: 7
	},
	{
		p: [
			8,
			11,
			-52
		],
		s: [
			22,
			22,
			14
		],
		c: "#97abbb",
		seed: 8
	},
	{
		p: [
			-18,
			9,
			-48
		],
		s: [
			16,
			18,
			12
		],
		c: "#879dad",
		seed: 9
	},
	{
		p: [
			22,
			8,
			56
		],
		s: [
			24,
			16,
			14
		],
		c: "#8ea3b4",
		seed: 10
	},
	{
		p: [
			-28,
			13,
			52
		],
		s: [
			18,
			26,
			14
		],
		c: "#7f95a7",
		seed: 11
	},
	{
		p: [
			78,
			22,
			-18
		],
		s: [
			16,
			44,
			16
		],
		c: "#6f8699",
		seed: 12
	},
	{
		p: [
			-78,
			16,
			18
		],
		s: [
			18,
			32,
			18
		],
		c: "#8096a8",
		seed: 13
	}
];
var TREES = [
	[
		22,
		0,
		-22
	],
	[
		28,
		0,
		-18
	],
	[
		-24,
		0,
		-22
	],
	[
		-30,
		0,
		18
	],
	[
		32,
		0,
		22
	],
	[
		-36,
		0,
		-8
	],
	[
		18,
		0,
		28
	],
	[
		-22,
		0,
		24
	]
];
function Neighbor({ p, s, c, seed }) {
	const tex = (0, import_react.useMemo)(() => makeFacadeTexture(c, seed), [c, seed]);
	(0, import_react.useEffect)(() => () => tex.dispose(), [tex]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: p,
		castShadow: true,
		receiveShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: s }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			map: tex,
			roughness: .72,
			metalness: .08
		})]
	});
}
function Tree({ position }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				1.1,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.16,
				.22,
				2.2,
				6
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#5c4033",
				roughness: .9
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				3.1,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
				1.5,
				3.1,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3f6b45",
				roughness: .85
			})]
		})]
	});
}
function CityContext({ showNorthHouse = false }) {
	const pitW = 38;
	const pitD = 34;
	const world = 260;
	const ring = 113;
	const side = 111;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				-.2,
				73.5
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				world,
				.4,
				ring
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#6d7f58",
				roughness: .95
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				-.2,
				-17 - ring / 2
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				world,
				.4,
				ring
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#657656",
				roughness: .95
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				74.5,
				-.2,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				side,
				.4,
				pitD
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#70845c",
				roughness: .95
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-19 - side / 2,
				-.2,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				side,
				.4,
				pitD
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#6a7c56",
				roughness: .95
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				-9.3,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				pitW,
				.5,
				pitD
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#5a3f2c",
				roughness: 1
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				-4.7,
				pitD / 2
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				pitW,
				9.2,
				.6
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#6b4d35",
				roughness: .95
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				-4.7,
				-17
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				pitW,
				9.2,
				.6
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#624530",
				roughness: .95
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				pitW / 2,
				-4.7,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.6,
				9.2,
				pitD
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#734f36",
				roughness: .95
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-19,
				-4.7,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.6,
				9.2,
				pitD
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#5c402c",
				roughness: .95
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				90,
				.02,
				12
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [18, 220] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#6a6e74",
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
				-12,
				.02,
				80
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [180, 16] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#6a6e74",
				roughness: .9
			})]
		}),
		NEIGHBORS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Neighbor, { ...n }, n.seed)),
		TREES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tree, { position: p }, p.join(","))),
		showNorthHouse ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				0,
				-28
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					6.5,
					0
				],
				castShadow: true,
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					16,
					13,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#c4b8a4",
					roughness: .8
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					13.4,
					0
				],
				rotation: [
					0,
					Math.PI / 4,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
					12,
					3.2,
					4
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#7a4a3a",
					roughness: .85
				})]
			})]
		}) : null
	] });
}
function SceneLights({ sun = [
	40,
	48,
	32
], intensity = 1.35, dark = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			dark ? "#1a3048" : "#d7e6f4",
			dark ? "#0c1014" : "#8a7a62",
			dark ? .35 : .55
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: dark ? .16 : .28 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: sun,
			intensity,
			castShadow: true,
			"shadow-mapSize-width": 2048,
			"shadow-mapSize-height": 2048,
			"shadow-camera-near": 2,
			"shadow-camera-far": 180,
			"shadow-camera-left": -50,
			"shadow-camera-right": 50,
			"shadow-camera-top": 50,
			"shadow-camera-bottom": -50,
			color: dark ? "#c8d8ea" : "#fff3de"
		})
	] });
}
var CONCRETE = "#c9c3b6";
var CONCRETE_DARK = "#b7b0a2";
var BASE_H = 3;
function columnPositions() {
	const pts = [];
	for (let ix = 0; ix < 5; ix++) for (let iz = 0; iz < 5; iz++) pts.push([-11 + ix * (22 / 4), -10 + iz * 5]);
	return pts;
}
var COL_POS = columnPositions();
function Slab({ y, floor, selected, xray, encroachment }) {
	const dim = encroachment ? [
		25.2,
		.32,
		20
	] : [
		22,
		.32,
		20
	];
	const x = encroachment ? 1.6 : 0;
	const faded = xray && !selected && floor > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			x,
			y,
			0
		],
		castShadow: true,
		receiveShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			dim[0],
			dim[1],
			dim[2]
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: encroachment ? "#c45a4a" : CONCRETE,
			roughness: .88,
			transparent: faded,
			opacity: faded ? .18 : 1,
			depthWrite: !faded
		})]
	});
}
function VolumeHighlight({ y, h, color, extraX = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			extraX / 2,
			y,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				22.55 + extraX,
				h,
				20.55
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color,
				transparent: true,
				opacity: .22,
				depthWrite: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Edges, {
				color,
				threshold: 15
			})
		]
	});
}
function Pipes({ basementDepth }) {
	const z = -basementDepth + 1.4;
	const segs = [
		{
			a: [
				-16,
				z,
				-14
			],
			b: [
				18,
				z,
				-14
			],
			c: "#1d6ea8",
			r: .22
		},
		{
			a: [
				18,
				z,
				-14
			],
			b: [
				18,
				z,
				12
			],
			c: "#1d6ea8",
			r: .22
		},
		{
			a: [
				-14,
				z + .8,
				10
			],
			b: [
				16,
				z + .8,
				4
			],
			c: "#c9a227",
			r: .18
		},
		{
			a: [
				8,
				z - .8,
				-12
			],
			b: [
				8,
				z - .8,
				14
			],
			c: "#c2410c",
			r: .16
		},
		{
			a: [
				8,
				z - .8,
				14
			],
			b: [
				-10,
				z - .8,
				14
			],
			c: "#c2410c",
			r: .16
		},
		{
			a: [
				-2,
				z + .4,
				-8
			],
			b: [
				14,
				z + .4,
				2
			],
			c: "#1a5c86",
			r: .2
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: segs.map((s, i) => {
		const a = new Vector3(...s.a);
		const b = new Vector3(...s.b);
		const dir = b.clone().sub(a);
		const len = dir.length();
		const mid = a.clone().add(b).multiplyScalar(.5);
		const quat = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), dir.clone().normalize());
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: mid,
			quaternion: quat,
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				s.r,
				s.r,
				len,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: s.c,
				metalness: .55,
				roughness: .32
			})]
		}, i);
	}) });
}
function TowerFrame({ selectedFloor, layers, xray }) {
	const caze = useCadastre(selectCase);
	const storeys = Math.max(1, caze.floors);
	const below = Math.max(0, caze.basements);
	const fh = caze.heightM / storeys;
	const colH = storeys * fh + below * BASE_H + .6;
	const colY = (storeys * fh - below * BASE_H) / 2;
	const encroachmentFloor = caze.intersects3d ? -Math.min(2, Math.max(1, below)) : null;
	const floors = [];
	for (let f = -below; f <= storeys; f++) {
		if (f === 0) continue;
		floors.push(f);
	}
	floors.push(storeys + 1);
	const slabY = (floor) => {
		if (floor < 0) return floor * BASE_H;
		if (isRoofFloor(floor, storeys)) return storeys * fh;
		return (floor - 1) * fh;
	};
	const volumeCenterY = (floor) => {
		if (floor < 0) return (floor + .5) * BASE_H;
		if (isRoofFloor(floor, storeys)) return storeys * fh + .35;
		return (floor - .5) * fh;
	};
	const volumeHeight = (floor) => {
		if (isRoofFloor(floor, storeys)) return .7;
		if (floor < 0) return BASE_H;
		return fh;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		layers.building ? COL_POS.map(([x, z], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				x,
				colY,
				z
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.5,
				colH,
				.5
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: CONCRETE_DARK,
				roughness: .9
			})]
		}, i)) : null,
		layers.building ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				colY,
				0
			],
			castShadow: true,
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				4.8,
				colH,
				5.4
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#b4aea1",
				roughness: .86
			})]
		}) : null,
		floors.map((f) => {
			const y = slabY(f);
			if (!layers.building && !(layers.floors && f === selectedFloor)) return null;
			const enc = Boolean(layers.encroachments && encroachmentFloor != null && f === encroachmentFloor);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slab, {
				y,
				floor: f,
				selected: f === selectedFloor,
				xray,
				encroachment: enc
			}, f);
		}),
		layers.floors && selectedFloor !== encroachmentFloor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeHighlight, {
			y: volumeCenterY(selectedFloor),
			h: volumeHeight(selectedFloor) - .08,
			color: "#e3b341"
		}) : null,
		layers.encroachments && encroachmentFloor != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeHighlight, {
			y: volumeCenterY(encroachmentFloor),
			h: volumeHeight(encroachmentFloor) - .08,
			color: "#e23d3d",
			extraX: 3.2
		}) : null,
		layers.setbacks ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				0,
				.05,
				0
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
				points: [
					[
						-16,
						0,
						-15
					],
					[
						16,
						0,
						-15
					],
					[
						16,
						0,
						15
					],
					[
						-16,
						0,
						15
					],
					[
						-16,
						0,
						-15
					]
				],
				color: "#c9a227",
				lineWidth: 1.5,
				dashed: true,
				dashSize: 1.2,
				gapSize: .6
			})
		}) : null,
		layers.parcels ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				storeys * fh * .45,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					26,
					storeys * fh * .95,
					24
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#1a5c86",
					transparent: true,
					opacity: .06,
					depthWrite: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Edges, { color: "#1a5c86" })
			]
		}) : null,
		layers.utilities && below > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pipes, { basementDepth: below * BASE_H }) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				storeys * fh + .55,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				22.8,
				.5,
				20.8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#b8b2a6",
				roughness: .85
			})]
		})
	] });
}
//#endregion
export { SceneLights as n, TowerFrame as r, CityContext as t };
