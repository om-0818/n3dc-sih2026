import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
import { C as Fingerprint, D as Cuboid, M as Building2, a as ShieldCheck, h as Menu, i as Shield, k as Contrast, m as Moon, r as Sun, t as X, u as Radar, v as LayoutDashboard, w as Files, x as Flame } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay, n as DialogClose, o as DialogPortal, r as DialogContent, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as cn, c as useLutInvert, i as TooltipTrigger, l as useTheme, n as Tooltip, r as TooltipContent } from "./router-C-fsLIL7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-BSG3YbSA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* N3DC LIDAR ingest contract — frontend + backend share this shape.
*
* Primary key is the 14-digit 3D ULPIN (DoLR). caseId is an audit
* reference only — never the join key.
*
* Send `public/n3dc_lidar_ingest.py` to the backend team. They implement
* POST /v1/lidar/ingest; this client already speaks that API.
*
* Browser can parse: uncompressed LAS, XYZ/CSV, n3dc-lidar-tile JSON.
* Backend REQUIRED for: LAZ, COPC, E57, EPSG reprojection, EGM2008, parcel clip.
*
* Indian defaults:
*   Horizontal CRS  EPSG:32643 (WGS 84 / UTM 43N) for MH / west coast
*   Vertical datum  EGM2008 orthometric (MSL)
*   Classification  ASPRS LAS 1.4
*   Parcel key      14-digit ULPIN
*/
var N3DC_LIDAR_SPEC = "n3dc-lidar-tile/1.0";
var LIDAR_ACCEPT = [
	".las",
	".laz",
	".copc.laz",
	".e57",
	".ply",
	".xyz",
	".txt",
	".csv",
	".json"
];
var ASPRS_LABEL = {
	1: "Unclassified",
	2: "Ground",
	3: "Low vegetation",
	4: "Medium vegetation",
	5: "High vegetation",
	6: "Building",
	7: "Noise",
	9: "Water",
	10: "Rail",
	11: "Road surface",
	13: "Wire — conductor",
	14: "Transmission tower",
	17: "Bridge deck",
	18: "High noise"
};
function packPoint(view, offset, x, y, z, intensity, klass, r, g, b, scale) {
	view.setInt16(offset + 0, Math.round(x / scale), true);
	view.setInt16(offset + 2, Math.round(y / scale), true);
	view.setInt16(offset + 4, Math.round(z / scale), true);
	view.setUint16(offset + 6, Math.max(0, Math.min(65535, Math.round(intensity))), true);
	view.setUint8(offset + 8, klass & 255);
	view.setUint8(offset + 9, r & 255);
	view.setUint8(offset + 10, g & 255);
	view.setUint8(offset + 11, b & 255);
}
function unpackTilePoints(tile) {
	const buf = tile.points ?? (tile.pointsB64 ? Uint8Array.from(atob(tile.pointsB64), (c) => c.charCodeAt(0)).buffer : /* @__PURE__ */ new ArrayBuffer(0));
	const view = new DataView(buf);
	const count = Math.floor(view.byteLength / 12);
	const positions = new Float32Array(count * 3);
	const colors = new Float32Array(count * 3);
	const intensity = new Float32Array(count);
	const classification = new Uint8Array(count);
	const height = new Float32Array(count);
	const s = tile.scale || .01;
	for (let i = 0; i < count; i++) {
		const o = i * 12;
		const x = view.getInt16(o + 0, true) * s;
		const y = view.getInt16(o + 2, true) * s;
		const z = view.getInt16(o + 4, true) * s;
		positions[i * 3] = x;
		positions[i * 3 + 1] = z;
		positions[i * 3 + 2] = y;
		intensity[i] = view.getUint16(o + 6, true) / 65535;
		classification[i] = view.getUint8(o + 8);
		height[i] = z;
		colors[i * 3] = view.getUint8(o + 9) / 255;
		colors[i * 3 + 1] = view.getUint8(o + 10) / 255;
		colors[i * 3 + 2] = view.getUint8(o + 11) / 255;
	}
	return {
		positions,
		colors,
		intensity,
		classification,
		height
	};
}
function lidarApiBase() {
	return "".replace(/\/$/, "");
}
async function ingestLidarRemote(file, meta) {
	const base = lidarApiBase();
	if (!base) throw new Error("VITE_LIDAR_API is not set — falling back to local parse.");
	if (!/^\d{14}$/.test(meta.ulpin)) throw new Error("ulpin must be the 14-digit DoLR identifier (join key).");
	const body = new FormData();
	body.append("file", file);
	body.append("ulpin", meta.ulpin);
	if (meta.caseId) body.append("caseId", meta.caseId);
	body.append("targetEpsg", String(meta.targetEpsg ?? 32643));
	body.append("verticalDatum", meta.verticalDatum ?? "EGM2008");
	body.append("clipToParcel", meta.clipToParcel === false ? "false" : "true");
	body.append("maxPoints", String(meta.maxPoints ?? 18e4));
	const res = await fetch(`${base}/v1/lidar/ingest`, {
		method: "POST",
		body
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Ingest failed (${res.status}): ${text.slice(0, 240)}`);
	}
	const tile = await res.json();
	if (tile.pointsUrl && !tile.points && !tile.pointsB64) {
		const bin = await fetch(tile.pointsUrl.startsWith("http") ? tile.pointsUrl : `${base}${tile.pointsUrl}`);
		if (bin.ok) tile.points = await bin.arrayBuffer();
	}
	return tile;
}
var BACKEND_CURL = `# N3DC LIDAR ingest — ULPIN is the required join key
# caseId is an optional audit reference (linked registrar file), never the lookup key.
# Accepts LAS / LAZ / E57 (via PDAL) / XYZ. Returns a quantized web tile.
# Indian default CRS: EPSG:32643 (UTM 43N) · vertical: EGM2008 MSL

curl -X POST "$N3DC_API/v1/lidar/ingest" \\
  -F "file=@/data/pune/baner-47-2A.laz" \\
  -F "ulpin=19041856427377" \\
  -F "caseId=SR-2026-11345" \\
  -F "targetEpsg=32643" \\
  -F "verticalDatum=EGM2008" \\
  -F "clipToParcel=true" \\
  -F "maxPoints=180000"

# Look up the latest tile for a parcel:
#   GET $N3DC_API/v1/lidar/ulpin/19041856427377
#
# Response: ulpin first. measuredHeightM = class-6 Zmax − class-2 ground.
# 12-byte packed points.bin (or pointsB64 for small tiles).
`;
function emptyOrigin(lat, lng, epsg = 32643) {
	return {
		lat,
		lng,
		zMsl: 0,
		easting: 0,
		northing: 0,
		utmZone: Math.floor((lng + 180) / 6) + 1,
		epsg
	};
}
var FLOOR_H = 3.15;
function mulberry32(seed) {
	let a = seed >>> 0;
	return () => {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function seedFrom(s) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
	return h >>> 0;
}
function epsgForLng(lng) {
	return 32600 + (Math.floor((lng + 180) / 6) + 1);
}
var COASTAL = /* @__PURE__ */ new Set([
	"Mumbai",
	"Chennai",
	"Kolkata"
]);
function push(w, x, y, z, klass, intensity, rgb) {
	if (w.i >= w.cap) return;
	packPoint(w.view, w.i * 12, x, y, z, intensity * 65535, klass, rgb[0], rgb[1], rgb[2], .01);
	w.classes[String(klass)] = (w.classes[String(klass)] ?? 0) + 1;
	if (z > w.zMax) w.zMax = z;
	w.i += 1;
}
function boxShell(w, cx, cz, sx, sz, y0, y1, density, klass, rgb) {
	const rng = w.rng;
	const area = 2 * (sx + sz) * (y1 - y0) + sx * sz;
	const n = Math.max(12, Math.floor(area * density));
	for (let k = 0; k < n && w.i < w.cap; k++) {
		const face = rng();
		let x = 0;
		let z = 0;
		let y = y0 + rng() * (y1 - y0);
		if (face < .22) {
			x = cx - sx / 2;
			z = cz + (rng() - .5) * sz;
		} else if (face < .44) {
			x = cx + sx / 2;
			z = cz + (rng() - .5) * sz;
		} else if (face < .66) {
			z = cz - sz / 2;
			x = cx + (rng() - .5) * sx;
		} else if (face < .88) {
			z = cz + sz / 2;
			x = cx + (rng() - .5) * sx;
		} else {
			y = y1;
			x = cx + (rng() - .5) * sx;
			z = cz + (rng() - .5) * sz;
		}
		const scan = .35 + .65 * Math.abs(Math.sin(x * .18 + z * .04));
		push(w, x, z, y, klass, scan * (.7 + rng() * .3), rgb);
	}
}
function disk(w, cx, cz, radius, y, n, klass, rgb, jitterY = .15) {
	for (let k = 0; k < n && w.i < w.cap; k++) {
		const a = w.rng() * Math.PI * 2;
		const r = Math.sqrt(w.rng()) * radius;
		push(w, cx + Math.cos(a) * r, cz + Math.sin(a) * r, y + (w.rng() - .5) * jitterY, klass, .4 + w.rng() * .4, rgb);
	}
}
var NEIGHBORS = [
	{
		p: [-42, -36],
		s: [18, 16],
		h: 28
	},
	{
		p: [-58, -8],
		s: [14, 14],
		h: 20
	},
	{
		p: [-48, 28],
		s: [16, 14],
		h: 36
	},
	{
		p: [48, -32],
		s: [18, 15],
		h: 32
	},
	{
		p: [62, 6],
		s: [14, 16],
		h: 24
	},
	{
		p: [50, 38],
		s: [20, 16],
		h: 40
	},
	{
		p: [8, -52],
		s: [22, 14],
		h: 22
	},
	{
		p: [-18, -48],
		s: [16, 12],
		h: 18
	},
	{
		p: [22, 56],
		s: [24, 14],
		h: 16
	},
	{
		p: [-28, 52],
		s: [18, 14],
		h: 26
	}
];
var cache = /* @__PURE__ */ new Map();
function syntheticLidar(caze, pointBudget) {
	const cap = pointBudget ?? (typeof window !== "undefined" && window.innerWidth < 640 ? 16e3 : 22e3);
	const key = `${caze.ulpin}:${cap}`;
	const hit = cache.get(key);
	if (hit) return hit;
	const packed = /* @__PURE__ */ new ArrayBuffer(cap * 12);
	const w = {
		view: new DataView(packed),
		i: 0,
		cap,
		classes: {},
		zMax: 0,
		rng: mulberry32(seedFrom(caze.ulpin + caze.id))
	};
	const rng = w.rng;
	const height = caze.heightM;
	const coastal = COASTAL.has(caze.city);
	const vegBoost = caze.city === "Bengaluru" || caze.city === "Pune" ? 1.35 : 1;
	const groundN = Math.floor(cap * .28);
	for (let k = 0; k < groundN && w.i < cap; k++) {
		const x = (rng() - .5) * 160;
		const z = (rng() - .5) * 160;
		const nala = Math.abs(x + z * .3) < 3.2 ? -1.4 : 0;
		const road = Math.abs(x - 90) < 9 || Math.abs(z - 80) < 8 ? .12 : 0;
		const y = nala + (rng() - .5) * .25 + (coastal && x > 70 ? -.6 : 0);
		const onRoad = road > 0;
		const klass = onRoad ? 11 : coastal && x > 78 ? 9 : 2;
		const rgb = onRoad ? [
			70,
			74,
			78
		] : klass === 9 ? [
			40,
			90,
			170
		] : [
			130 + rng() * 30 | 0,
			110,
			70
		];
		push(w, x, z, y, klass, .3 + .7 * Math.abs(Math.sin(x * .16)), rgb);
	}
	boxShell(w, 0, 0, 22, 20, -caze.basements * 3, height, 1.8, 6, [
		210,
		205,
		195
	]);
	for (let f = 1; f <= caze.floors; f++) {
		const y = f * FLOOR_H;
		const slabN = 40;
		for (let k = 0; k < slabN && w.i < cap; k++) push(w, (rng() - .5) * 22, (rng() - .5) * 20, y + (rng() - .5) * .08, 6, .55 + rng() * .3, [
			200,
			196,
			186
		]);
	}
	for (const n of NEIGHBORS) boxShell(w, n.p[0], n.p[1], n.s[0], n.s[1], 0, n.h, .55, 6, [
		160,
		170,
		180
	]);
	for (const [tx, tz] of [
		[22, -22],
		[28, -18],
		[-24, -22],
		[-30, 18],
		[32, 22],
		[-36, -8],
		[18, 28],
		[-22, 24],
		[40, -8],
		[-12, 36],
		[8, -28],
		[-44, 8]
	]) {
		const h = 3.2 + rng() * 3.4 * vegBoost;
		disk(w, tx, tz, .35, .2, 8, 3, [
			90,
			140,
			60
		]);
		const blob = Math.floor(70 * vegBoost);
		for (let k = 0; k < blob && w.i < cap; k++) {
			const a = rng() * Math.PI * 2;
			const r = rng() * 1.6;
			push(w, tx + Math.cos(a) * r, tz + Math.sin(a) * r, 1.4 + rng() * h, 5, .35 + rng() * .4, [
				30 + rng() * 40 | 0,
				90 + rng() * 50 | 0,
				40
			]);
		}
	}
	for (let s = 0; s < 2; s++) {
		const z0 = -18 + s * 22;
		for (let t = 0; t < 40 && w.i < cap; t++) push(w, -30 + t * 1.6, z0, 9.5 + Math.sin(t * .4) * .4, 13, .85, [
			240,
			200,
			40
		]);
	}
	if (caze.intersects3d) for (let t = 0; t < 80 && w.i < cap; t++) push(w, -16 + t * .4, -14, -7.4 + (rng() - .5) * .3, 14, .7, [
		200,
		80,
		50
	]);
	const unpacked = unpackTilePoints({
		spec: N3DC_LIDAR_SPEC,
		jobId: `synth-${caze.id}`,
		status: "ready",
		ulpin: caze.ulpin,
		caseId: caze.id,
		crs: `EPSG:${epsgForLng(caze.lng)}`,
		verticalDatum: "EGM2008",
		origin: emptyOrigin(caze.lat, caze.lng, epsgForLng(caze.lng)),
		scale: .01,
		count: w.i,
		densityPtsM2: caze.lidarPtsM2,
		bounds: {
			min: [
				-80,
				-80,
				-caze.basements * 3
			],
			max: [
				80,
				80,
				w.zMax
			]
		},
		classes: w.classes,
		sensor: `${caze.authority} airborne block · Riegl VQ-1560 II`,
		capturedAt: "2026-01-18T06:40:00+05:30",
		city: caze.city,
		state: caze.state,
		encoding: "i16-xyz-u16i-u8c-u8rgb",
		points: packed.slice(0, w.i * 12)
	});
	const cloud = {
		header: {
			spec: N3DC_LIDAR_SPEC,
			jobId: `synth-${caze.id}`,
			status: "ready",
			ulpin: caze.ulpin,
			caseId: caze.id,
			crs: `EPSG:${epsgForLng(caze.lng)}`,
			verticalDatum: "EGM2008",
			origin: emptyOrigin(caze.lat, caze.lng, epsgForLng(caze.lng)),
			scale: .01,
			count: w.i,
			densityPtsM2: caze.lidarPtsM2,
			bounds: {
				min: [
					-80,
					-80,
					-caze.basements * 3
				],
				max: [
					80,
					80,
					w.zMax
				]
			},
			classes: w.classes,
			sensor: `${caze.authority} airborne block · Riegl VQ-1560 II`,
			capturedAt: "2026-01-18T06:40:00+05:30",
			city: caze.city,
			state: caze.state,
			encoding: "i16-xyz-u16i-u8c-u8rgb"
		},
		positions: unpacked.positions,
		rgb: unpacked.colors,
		intensity: unpacked.intensity,
		classification: unpacked.classification,
		height: unpacked.height,
		count: unpacked.positions.length / 3
	};
	cache.set(key, cloud);
	return cloud;
}
var uploaded = null;
function setUploadedCloud(cloud, name) {
	uploaded = cloud;
}
function cloudForCase(caze, preferUpload) {
	if (preferUpload && uploaded) {
		if (!uploaded.header.ulpin || uploaded.header.ulpin === caze.ulpin) return uploaded;
	}
	return syntheticLidar(caze);
}
var FEATURED_CASE_ID = "SR-2026-11345";
var CASES = [
	{
		id: "SR-2026-11345",
		project: "Green Heights Tower",
		location: "Baner, Pune",
		district: "Pune Urban — Baner",
		city: "Pune",
		state: "Maharashtra",
		authority: "PMC / MRSAC",
		status: "under_review",
		buildingId: "BLD-2026-0841",
		floors: 10,
		basements: 3,
		heightM: 31.5,
		lat: 18.5642,
		lng: 73.7768,
		ulpin: "19041856427377",
		reraId: "P52100048122",
		carpetDeclared: 842,
		carpetMeasured: 852.1,
		topologyValid: true,
		intersects3d: true,
		setbackRequired: {
			front: 6,
			side: 6,
			rear: 6
		},
		setbackActual: {
			front: 6.2,
			side: 5.1,
			rear: 6.4
		},
		owner: "Green Heights CHS (proposed)",
		developer: "Aarav Infra Pvt. Ltd.",
		submittedAt: "2026-08-12T11:20:00+05:30",
		units: 78,
		plotArea: 1840,
		fsi: 3.12,
		fireRoadMinM: 6,
		fireRoadActualM: 4.8,
		solarWinterHours: 2.4,
		solarThresholdHours: 4,
		lidarPtsM2: 14.2,
		lidarMeasuredHeightM: 32.1,
		ctsNo: "47/2A",
		ward: "Baner",
		vpcStatus: "pending",
		surveySource: "PMC 3D Twin · MahaPREIT drone + MLS",
		violations: [
			{
				code: "RERA-CA-01",
				severity: "warn",
				title: "RERA carpet area +1.2% deviation",
				detail: "Measured 3D net carpet on Floor 6 is 852.1 m² against declared 842.0 m² (RERA 4th schedule, 2% caution band).",
				floor: 6
			},
			{
				code: "ST-3D-INT",
				severity: "alert",
				title: "ST_3DIntersects == TRUE",
				detail: "Basement 2 volume intersects municipal water main W-18 and HT duct HT-04 (subsurface utility encroachment).",
				floor: -2
			},
			{
				code: "TOPO-OK",
				severity: "ok",
				title: "Topology valid",
				detail: "Closed manifold, no self-intersections, vertical topology stack is consistent."
			}
		]
	},
	{
		id: "SR-2026-10902",
		project: "Skyline Tower",
		location: "Kharadi, Pune",
		district: "Pune Urban — Kharadi",
		city: "Pune",
		state: "Maharashtra",
		authority: "PMC / MRSAC",
		status: "approved",
		buildingId: "BLD-2024-0756",
		floors: 42,
		basements: 2,
		heightM: 156.4,
		lat: 18.5512,
		lng: 73.9471,
		ulpin: "19041855127394",
		vUlpin: "19041855127394-F01-COMM-Z+4.2",
		reraId: "P52100039011",
		carpetDeclared: 21440,
		carpetMeasured: 21412,
		topologyValid: true,
		intersects3d: false,
		setbackRequired: {
			front: 12,
			side: 9,
			rear: 9
		},
		setbackActual: {
			front: 12.4,
			side: 9.6,
			rear: 9.2
		},
		owner: "Skyline Commercial LLP",
		developer: "Horizon Estates",
		submittedAt: "2026-04-18T10:00:00+05:30",
		units: 214,
		plotArea: 9200,
		fsi: 4.8,
		fireRoadMinM: 9,
		fireRoadActualM: 9.4,
		solarWinterHours: 5.2,
		solarThresholdHours: 4,
		lidarPtsM2: 11.8,
		lidarMeasuredHeightM: 156.1,
		ctsNo: "12/8",
		ward: "Kharadi",
		vpcStatus: "issued",
		surveySource: "NAKSHA oblique + LiDAR",
		violations: [{
			code: "TOPO-OK",
			severity: "ok",
			title: "Topology valid",
			detail: "All vertical parcels disjoint and watertight."
		}]
	},
	{
		id: "SR-2026-11018",
		project: "Green View Residency",
		location: "Balewadi, Pune",
		district: "Pune Urban — Balewadi",
		city: "Pune",
		state: "Maharashtra",
		authority: "PMC",
		status: "approved",
		buildingId: "BLD-2025-2210",
		floors: 18,
		basements: 2,
		heightM: 58.2,
		lat: 18.5788,
		lng: 73.7701,
		ulpin: "19041857887377",
		vUlpin: "19041857887377-F01-RES-Z+3.1",
		reraId: "P52100044190",
		carpetDeclared: 6120,
		carpetMeasured: 6114,
		topologyValid: true,
		intersects3d: false,
		setbackRequired: {
			front: 6,
			side: 6,
			rear: 6
		},
		setbackActual: {
			front: 6.8,
			side: 6.4,
			rear: 6.1
		},
		owner: "Green View CHS",
		developer: "Sahyadri Builders",
		submittedAt: "2026-05-02T09:40:00+05:30",
		units: 96,
		plotArea: 3100,
		fsi: 2.9,
		fireRoadMinM: 6,
		fireRoadActualM: 6.5,
		solarWinterHours: 4.8,
		solarThresholdHours: 4,
		lidarPtsM2: 13.1,
		lidarMeasuredHeightM: 58.4,
		ctsNo: "88/3",
		ward: "Balewadi",
		vpcStatus: "issued",
		surveySource: "PMC 3D Twin",
		violations: []
	},
	{
		id: "SR-2026-11220",
		project: "Tech Park Phase 2",
		location: "Hinjewadi, Pune",
		district: "Pune Urban — Hinjewadi",
		city: "Pune",
		state: "Maharashtra",
		authority: "PCMC / MRSAC",
		status: "approved",
		buildingId: "BLD-2025-3304",
		floors: 14,
		basements: 3,
		heightM: 61,
		lat: 18.5912,
		lng: 73.7388,
		ulpin: "19041859127373",
		vUlpin: "19041859127373-F01-IT-Z+4.0",
		reraId: "P52100040112",
		carpetDeclared: 18400,
		carpetMeasured: 18390,
		topologyValid: true,
		intersects3d: false,
		setbackRequired: {
			front: 9,
			side: 6,
			rear: 6
		},
		setbackActual: {
			front: 9.2,
			side: 6.6,
			rear: 6.8
		},
		owner: "Westwind Parks",
		developer: "Westwind Parks",
		submittedAt: "2026-03-22T16:10:00+05:30",
		units: 0,
		plotArea: 14200,
		fsi: 2.4,
		fireRoadMinM: 9,
		fireRoadActualM: 10.1,
		solarWinterHours: 6.1,
		solarThresholdHours: 4,
		lidarPtsM2: 9.6,
		lidarMeasuredHeightM: 60.8,
		ctsNo: "HIN-14/2",
		ward: "Hinjewadi",
		vpcStatus: "issued",
		surveySource: "PCMC drone block",
		violations: []
	},
	{
		id: "SR-2026-11401",
		project: "Riverfront Residences",
		location: "Aundh, Pune",
		district: "Pune Urban — Aundh",
		city: "Pune",
		state: "Maharashtra",
		authority: "PMC",
		status: "under_review",
		buildingId: "BLD-2026-0912",
		floors: 22,
		basements: 2,
		heightM: 72.4,
		lat: 18.5601,
		lng: 73.8077,
		ulpin: "19041856017380",
		reraId: "P52100049901",
		carpetDeclared: 9800,
		carpetMeasured: 9812,
		topologyValid: true,
		intersects3d: false,
		setbackRequired: {
			front: 9,
			side: 6,
			rear: 6
		},
		setbackActual: {
			front: 9.1,
			side: 6,
			rear: 6.2
		},
		owner: "Riverfront SPV",
		developer: "Mula Realty",
		submittedAt: "2026-08-28T14:05:00+05:30",
		units: 132,
		plotArea: 4200,
		fsi: 3.4,
		fireRoadMinM: 6,
		fireRoadActualM: 6.1,
		solarWinterHours: 3.8,
		solarThresholdHours: 4,
		lidarPtsM2: 12.4,
		lidarMeasuredHeightM: 73,
		ctsNo: "AUN-21/6",
		ward: "Aundh",
		vpcStatus: "pending",
		surveySource: "PMC 3D Twin",
		violations: [{
			code: "SOLAR-01",
			severity: "warn",
			title: "Winter sunlight under 4h",
			detail: "North neighbor south facade receives 3.8h on 21 Dec."
		}]
	},
	{
		id: "SR-2026-10844",
		project: "Magarpatta Spire",
		location: "Hadapsar, Pune",
		district: "Pune Urban — Hadapsar",
		city: "Pune",
		state: "Maharashtra",
		authority: "PMC",
		status: "flagged",
		buildingId: "BLD-2025-1788",
		floors: 28,
		basements: 3,
		heightM: 96,
		lat: 18.5162,
		lng: 73.9266,
		ulpin: "19041851627392",
		reraId: "P52100036620",
		carpetDeclared: 14220,
		carpetMeasured: 14680,
		topologyValid: false,
		intersects3d: true,
		setbackRequired: {
			front: 12,
			side: 9,
			rear: 9
		},
		setbackActual: {
			front: 11.2,
			side: 8.4,
			rear: 9
		},
		owner: "Spire Owners Association",
		developer: "Eastfield Corp",
		submittedAt: "2026-02-11T12:00:00+05:30",
		units: 168,
		plotArea: 6100,
		fsi: 4.1,
		fireRoadMinM: 9,
		fireRoadActualM: 7.2,
		solarWinterHours: 1.8,
		solarThresholdHours: 4,
		lidarPtsM2: 10.9,
		lidarMeasuredHeightM: 99.8,
		ctsNo: "MAG-4/1",
		ward: "Hadapsar",
		vpcStatus: "society-apply",
		surveySource: "PMC 3D Twin",
		violations: [{
			code: "TOPO-OPEN",
			severity: "alert",
			title: "Non-manifold slab on Floor 14",
			detail: "Open edge loop — vertical parcel cannot be sealed.",
			floor: 14
		}, {
			code: "RERA-CA-04",
			severity: "alert",
			title: "Carpet deviation +3.2%",
			detail: "Exceeds RERA 2% reporting threshold."
		}]
	},
	{
		id: "SR-2026-11512",
		project: "Viman Nagar Heights",
		location: "Viman Nagar, Pune",
		district: "Pune Urban — Viman Nagar",
		city: "Pune",
		state: "Maharashtra",
		authority: "PMC",
		status: "under_review",
		buildingId: "BLD-2026-1018",
		floors: 16,
		basements: 2,
		heightM: 54.8,
		lat: 18.5674,
		lng: 73.9144,
		ulpin: "19041856747391",
		reraId: "P52100051220",
		carpetDeclared: 7040,
		carpetMeasured: 7033,
		topologyValid: true,
		intersects3d: false,
		setbackRequired: {
			front: 6,
			side: 6,
			rear: 6
		},
		setbackActual: {
			front: 6.4,
			side: 6.2,
			rear: 6.6
		},
		owner: "VN Heights LLP",
		developer: "Lohegaon Developers",
		submittedAt: "2026-08-30T17:45:00+05:30",
		units: 88,
		plotArea: 2680,
		fsi: 3,
		fireRoadMinM: 6,
		fireRoadActualM: 6.3,
		solarWinterHours: 4.1,
		solarThresholdHours: 4,
		lidarPtsM2: 12,
		lidarMeasuredHeightM: 55.1,
		ctsNo: "VN-9/2",
		ward: "Viman Nagar",
		vpcStatus: "pending",
		surveySource: "PMC 3D Twin · OLS overlay",
		violations: [{
			code: "AERO-01",
			severity: "warn",
			title: "Height near OLS surface",
			detail: "Lohegaon OLS check: 4.2 m clearance remaining."
		}]
	},
	{
		id: "SR-2026-10730",
		project: "Wakad Central",
		location: "Wakad, Pune",
		district: "Pune Urban — Wakad",
		city: "Pune",
		state: "Maharashtra",
		authority: "PCMC",
		status: "rejected",
		buildingId: "BLD-2025-0901",
		floors: 12,
		basements: 2,
		heightM: 39.6,
		lat: 18.5978,
		lng: 73.7633,
		ulpin: "19041859787376",
		reraId: "P52100028811",
		carpetDeclared: 4100,
		carpetMeasured: 4092,
		topologyValid: true,
		intersects3d: true,
		setbackRequired: {
			front: 6,
			side: 6,
			rear: 6
		},
		setbackActual: {
			front: 4.9,
			side: 5.2,
			rear: 6
		},
		owner: "Wakad Central JV",
		developer: "Ring Road Constructions",
		submittedAt: "2026-01-19T11:30:00+05:30",
		units: 64,
		plotArea: 1980,
		fsi: 2.5,
		fireRoadMinM: 6,
		fireRoadActualM: 5.1,
		solarWinterHours: 4.4,
		solarThresholdHours: 4,
		lidarPtsM2: 11.2,
		lidarMeasuredHeightM: 39.4,
		ctsNo: "WAK-3/7",
		ward: "Wakad",
		vpcStatus: "society-apply",
		surveySource: "PCMC drone block",
		violations: [{
			code: "SETBACK-F",
			severity: "alert",
			title: "Front setback shortfall",
			detail: "4.9 m provided against 6.0 m UDCPR."
		}]
	},
	{
		id: "SR-2026-11620",
		project: "Karve Road Residency",
		location: "Kothrud, Pune",
		district: "Pune Urban — Kothrud",
		city: "Pune",
		state: "Maharashtra",
		authority: "PMC",
		status: "under_review",
		buildingId: "BLD-2026-1188",
		floors: 14,
		basements: 2,
		heightM: 45.6,
		lat: 18.5074,
		lng: 73.8077,
		ulpin: "19041850747380",
		reraId: "P52100047801",
		carpetDeclared: 5280,
		carpetMeasured: 5294,
		topologyValid: true,
		intersects3d: false,
		setbackRequired: {
			front: 6,
			side: 6,
			rear: 6
		},
		setbackActual: {
			front: 6.3,
			side: 6.1,
			rear: 6
		},
		owner: "Karve Road CHS (proposed)",
		developer: "Paranjape Schemes",
		submittedAt: "2026-08-21T10:15:00+05:30",
		units: 72,
		plotArea: 2140,
		fsi: 2.8,
		fireRoadMinM: 6,
		fireRoadActualM: 6.2,
		solarWinterHours: 4.3,
		solarThresholdHours: 4,
		lidarPtsM2: 13.4,
		lidarMeasuredHeightM: 45.9,
		ctsNo: "12/4A",
		ward: "Kothrud",
		vpcStatus: "society-apply",
		surveySource: "PMC 3D Twin · Baner–Kothrud block",
		violations: [{
			code: "VPC-AGM",
			severity: "warn",
			title: "VPC society AGM pending",
			detail: "MLRC vertical property card needs a society resolution before 31 Dec 2027."
		}]
	},
	{
		id: "SR-2026-11801",
		project: "Ghole Road Heights",
		location: "Shivajinagar, Pune",
		district: "Pune Urban — Shivajinagar",
		city: "Pune",
		state: "Maharashtra",
		authority: "PMC",
		status: "under_review",
		buildingId: "BLD-2026-1502",
		floors: 11,
		basements: 2,
		heightM: 36.4,
		lat: 18.5309,
		lng: 73.8472,
		ulpin: "19041853097384",
		reraId: "P52100050118",
		carpetDeclared: 4120,
		carpetMeasured: 4188,
		topologyValid: true,
		intersects3d: false,
		setbackRequired: {
			front: 6,
			side: 4.5,
			rear: 4.5
		},
		setbackActual: {
			front: 6.1,
			side: 4.6,
			rear: 4.5
		},
		owner: "Ghole Road CHS (proposed)",
		developer: "Deccan Buildcon",
		submittedAt: "2026-08-16T09:50:00+05:30",
		units: 44,
		plotArea: 1480,
		fsi: 3,
		fireRoadMinM: 6,
		fireRoadActualM: 6,
		solarWinterHours: 3.6,
		solarThresholdHours: 4,
		lidarPtsM2: 15.8,
		lidarMeasuredHeightM: 37.1,
		ctsNo: "SHV-11/3",
		ward: "Shivajinagar",
		vpcStatus: "pending",
		surveySource: "PMC 3D Twin · Ghole Road drone block",
		violations: [{
			code: "TAX-PILOT",
			severity: "warn",
			title: "PMC 3D Twin tax-net watch",
			detail: "Ghole Road–Shivajinagar ward office: 24 unregistered properties in the published MahaPREIT subset (₹17.27 cr). This record is inside the mapped block — not a live PMC levy."
		}]
	},
	{
		id: "SR-2026-11840",
		project: "Yerawada Riverside",
		location: "Yerawada, Pune",
		district: "Pune Urban — Yerawada",
		city: "Pune",
		state: "Maharashtra",
		authority: "PMC",
		status: "flagged",
		buildingId: "BLD-2026-1610",
		floors: 16,
		basements: 2,
		heightM: 52.8,
		lat: 18.5526,
		lng: 73.8774,
		ulpin: "19041855267387",
		reraId: "P52100048820",
		carpetDeclared: 6840,
		carpetMeasured: 6910,
		topologyValid: true,
		intersects3d: true,
		setbackRequired: {
			front: 6,
			side: 6,
			rear: 6
		},
		setbackActual: {
			front: 6,
			side: 5.4,
			rear: 6.2
		},
		owner: "Yerawada Riverside CHS",
		developer: "Mutha Constructions",
		submittedAt: "2026-07-29T15:20:00+05:30",
		units: 84,
		plotArea: 2460,
		fsi: 3.1,
		fireRoadMinM: 6,
		fireRoadActualM: 5.8,
		solarWinterHours: 4,
		solarThresholdHours: 4,
		lidarPtsM2: 12.7,
		lidarMeasuredHeightM: 53.4,
		ctsNo: "YER-6/2",
		ward: "Yerawada",
		vpcStatus: "society-apply",
		surveySource: "PMC 3D Twin · Mula-Mutha LiDAR strip",
		violations: [{
			code: "FLOOD-01",
			severity: "alert",
			title: "Mula-Mutha flood-line watch",
			detail: "Bare-earth DEM from the LiDAR strip places the plot 38 m from the published blue flood line. Side setback 5.4 m against 6.0 m UDCPR."
		}]
	},
	{
		id: "SR-2026-12004",
		project: "Lodha Park Tower 5",
		location: "Worli, Mumbai",
		district: "Mumbai City — Worli",
		city: "Mumbai",
		state: "Maharashtra",
		authority: "MCGM / MRSAC",
		status: "under_review",
		buildingId: "BLD-2026-4401",
		floors: 64,
		basements: 4,
		heightM: 234,
		lat: 19.0176,
		lng: 72.8162,
		ulpin: "19021901767281",
		reraId: "P51800061209",
		carpetDeclared: 42800,
		carpetMeasured: 42910,
		topologyValid: true,
		intersects3d: false,
		setbackRequired: {
			front: 12,
			side: 12,
			rear: 12
		},
		setbackActual: {
			front: 12.6,
			side: 12.1,
			rear: 12.4
		},
		owner: "Worli Sea Face CHS",
		developer: "Macrotech Developers",
		submittedAt: "2026-07-14T10:10:00+05:30",
		units: 240,
		plotArea: 9800,
		fsi: 6.2,
		fireRoadMinM: 12,
		fireRoadActualM: 12.4,
		solarWinterHours: 3.2,
		solarThresholdHours: 4,
		lidarPtsM2: 18.6,
		violations: [{
			code: "CRZ-II",
			severity: "warn",
			title: "CRZ-II coastal setback watch",
			detail: "Arabian Sea LIDAR returns class 9 within 48 m of the west facade."
		}]
	},
	{
		id: "SR-2026-12088",
		project: "BKC One",
		location: "Bandra-Kurla Complex, Mumbai",
		district: "Mumbai Suburban — BKC",
		city: "Mumbai",
		state: "Maharashtra",
		authority: "MMRDA",
		status: "approved",
		buildingId: "BLD-2025-8810",
		floors: 36,
		basements: 3,
		heightM: 148,
		lat: 19.0662,
		lng: 72.8691,
		ulpin: "19021906627286",
		vUlpin: "19021906627286-F01-COMM-Z+5.0",
		reraId: "P51800050112",
		carpetDeclared: 31200,
		carpetMeasured: 31180,
		topologyValid: true,
		intersects3d: false,
		setbackRequired: {
			front: 12,
			side: 9,
			rear: 9
		},
		setbackActual: {
			front: 12.8,
			side: 9.4,
			rear: 9.6
		},
		owner: "BKC One REIT",
		developer: "Naman Group",
		submittedAt: "2026-03-02T12:00:00+05:30",
		units: 0,
		plotArea: 7400,
		fsi: 5.4,
		fireRoadMinM: 9,
		fireRoadActualM: 10.2,
		solarWinterHours: 5.6,
		solarThresholdHours: 4,
		lidarPtsM2: 16.4,
		violations: []
	},
	{
		id: "SR-2026-13021",
		project: "Prestige Shantiniketan T3",
		location: "Whitefield, Bengaluru",
		district: "Bengaluru Urban — Whitefield",
		city: "Bengaluru",
		state: "Karnataka",
		authority: "BBMP / KSRSAC",
		status: "under_review",
		buildingId: "BLD-2026-3309",
		floors: 22,
		basements: 2,
		heightM: 78.4,
		lat: 12.9698,
		lng: 77.75,
		ulpin: "19121296987775",
		reraId: "PRM/KA/RERA/1251/446/PR/2024/0012",
		carpetDeclared: 18640,
		carpetMeasured: 18702,
		topologyValid: true,
		intersects3d: false,
		setbackRequired: {
			front: 9,
			side: 8,
			rear: 8
		},
		setbackActual: {
			front: 9.1,
			side: 8,
			rear: 8.2
		},
		owner: "Shantiniketan Owners Welfare",
		developer: "Prestige Group",
		submittedAt: "2026-06-21T11:05:00+05:30",
		units: 176,
		plotArea: 11200,
		fsi: 3.3,
		fireRoadMinM: 8,
		fireRoadActualM: 8.4,
		solarWinterHours: 4.6,
		solarThresholdHours: 4,
		lidarPtsM2: 10.8,
		violations: [{
			code: "BWSSB-01",
			severity: "warn",
			title: "Storm drain easement",
			detail: "LIDAR class 2 depression tracks a 4.1 m nala along the east setback."
		}]
	},
	{
		id: "SR-2026-14016",
		project: "My Home Bhooja",
		location: "HITEC City, Hyderabad",
		district: "Rangareddy — Gachibowli",
		city: "Hyderabad",
		state: "Telangana",
		authority: "GHMC / TSRSAC",
		status: "approved",
		buildingId: "BLD-2024-2201",
		floors: 44,
		basements: 3,
		heightM: 168.2,
		lat: 17.4435,
		lng: 78.3772,
		ulpin: "19171744357837",
		vUlpin: "19171744357837-F01-RES-Z+4.8",
		reraId: "P02400003451",
		carpetDeclared: 36400,
		carpetMeasured: 36380,
		topologyValid: true,
		intersects3d: false,
		setbackRequired: {
			front: 12,
			side: 9,
			rear: 9
		},
		setbackActual: {
			front: 12.4,
			side: 9.8,
			rear: 9.5
		},
		owner: "Bhooja Federation",
		developer: "My Home Constructions",
		submittedAt: "2026-02-08T09:20:00+05:30",
		units: 320,
		plotArea: 18600,
		fsi: 4,
		fireRoadMinM: 9,
		fireRoadActualM: 11,
		solarWinterHours: 5.8,
		solarThresholdHours: 4,
		lidarPtsM2: 9.4,
		violations: []
	},
	{
		id: "SR-2026-15007",
		project: "DLF The Crest",
		location: "Sector 54, Gurugram",
		district: "Gurugram — Golf Course Road",
		city: "Gurugram",
		state: "Haryana",
		authority: "GMDA / HARSAC",
		status: "flagged",
		buildingId: "BLD-2025-5402",
		floors: 38,
		basements: 3,
		heightM: 142,
		lat: 28.4421,
		lng: 77.1054,
		ulpin: "19282844217710",
		reraId: "178 OF 2017",
		carpetDeclared: 22880,
		carpetMeasured: 23410,
		topologyValid: true,
		intersects3d: true,
		setbackRequired: {
			front: 12,
			side: 9,
			rear: 9
		},
		setbackActual: {
			front: 11.4,
			side: 9,
			rear: 9.1
		},
		owner: "Crest AOA",
		developer: "DLF Limited",
		submittedAt: "2026-05-19T16:40:00+05:30",
		units: 210,
		plotArea: 8600,
		fsi: 4.6,
		fireRoadMinM: 9,
		fireRoadActualM: 8.1,
		solarWinterHours: 2.9,
		solarThresholdHours: 4,
		lidarPtsM2: 13.7,
		violations: [{
			code: "HUDA-ROAD",
			severity: "alert",
			title: "Fire-tender throat 8.1 m",
			detail: "Sector 54 service lane LIDAR returns a 8.1 m clear width against 9.0 m NBC."
		}]
	},
	{
		id: "SR-2026-16033",
		project: "TVH Quadrant",
		location: "OMR, Chennai",
		district: "Chengalpattu — Padur",
		city: "Chennai",
		state: "Tamil Nadu",
		authority: "GCC / TNGIS",
		status: "under_review",
		buildingId: "BLD-2026-1804",
		floors: 18,
		basements: 2,
		heightM: 64.8,
		lat: 12.9121,
		lng: 80.2279,
		ulpin: "19121291218022",
		reraId: "TN/29/Building/0124/2025",
		carpetDeclared: 9420,
		carpetMeasured: 9411,
		topologyValid: true,
		intersects3d: false,
		setbackRequired: {
			front: 7,
			side: 5,
			rear: 5
		},
		setbackActual: {
			front: 7.2,
			side: 5.4,
			rear: 5.1
		},
		owner: "Quadrant Residents",
		developer: "TVH",
		submittedAt: "2026-07-02T13:15:00+05:30",
		units: 112,
		plotArea: 4200,
		fsi: 2.8,
		fireRoadMinM: 7,
		fireRoadActualM: 7.3,
		solarWinterHours: 5.1,
		solarThresholdHours: 4,
		lidarPtsM2: 11.5,
		violations: []
	},
	{
		id: "SR-2026-17019",
		project: "GIFT One",
		location: "GIFT City, Gandhinagar",
		district: "Gandhinagar — GIFT SEZ",
		city: "Gandhinagar",
		state: "Gujarat",
		authority: "GIFTCL / BISAG",
		status: "approved",
		buildingId: "BLD-2023-0101",
		floors: 29,
		basements: 3,
		heightM: 122,
		lat: 23.1612,
		lng: 72.6834,
		ulpin: "19232316127268",
		vUlpin: "19232316127268-F01-IFSC-Z+5.4",
		reraId: "PR/GJ/GANDHINAGAR/GANDHINAGAR/MAA07890/110119",
		carpetDeclared: 28600,
		carpetMeasured: 28588,
		topologyValid: true,
		intersects3d: false,
		setbackRequired: {
			front: 12,
			side: 9,
			rear: 9
		},
		setbackActual: {
			front: 14,
			side: 10.2,
			rear: 9.8
		},
		owner: "GIFT SEZ Authority",
		developer: "GIFTCL",
		submittedAt: "2026-01-11T10:00:00+05:30",
		units: 0,
		plotArea: 16e3,
		fsi: 5.4,
		fireRoadMinM: 12,
		fireRoadActualM: 14.8,
		solarWinterHours: 6.4,
		solarThresholdHours: 4,
		lidarPtsM2: 15.2,
		violations: []
	},
	{
		id: "SR-2026-18042",
		project: "Uniworld City Heights",
		location: "New Town, Kolkata",
		district: "North 24 Parganas — Action Area II",
		city: "Kolkata",
		state: "West Bengal",
		authority: "NKDA / WBGEDCL",
		status: "under_review",
		buildingId: "BLD-2026-2290",
		floors: 26,
		basements: 2,
		heightM: 88.6,
		lat: 22.581,
		lng: 88.4594,
		ulpin: "19222258108845",
		reraId: "HIRA/P/NOR/2024/001122",
		carpetDeclared: 15440,
		carpetMeasured: 15510,
		topologyValid: true,
		intersects3d: false,
		setbackRequired: {
			front: 9,
			side: 6,
			rear: 6
		},
		setbackActual: {
			front: 9,
			side: 6.2,
			rear: 6.1
		},
		owner: "Uniworld AOA",
		developer: "Bengal Unitech",
		submittedAt: "2026-08-04T15:50:00+05:30",
		units: 148,
		plotArea: 6400,
		fsi: 3.1,
		fireRoadMinM: 6,
		fireRoadActualM: 6.4,
		solarWinterHours: 4.2,
		solarThresholdHours: 4,
		lidarPtsM2: 8.9,
		violations: [{
			code: "EKW-01",
			severity: "warn",
			title: "Wetland buffer watch",
			detail: "East Kolkata Wetland LIDAR class 9 returns 62 m east of the plot."
		}]
	}
];
var SEED_AUDIT = [
	{
		index: 0,
		kind: "genesis",
		title: "N3DC ledger opened",
		detail: "National chain initialised for 3D ULPIN. Genesis prevHash is 64 zeroes.",
		actor: "N3DC Engine",
		at: "2026-04-01T09:00:00+05:30",
		hash: "6b1c0e8a4d72f91c0a55e3b8d21f7c904e6a12b0c8d34f5a9e1b7c2d3a4e5f60",
		prevHash: "0000000000000000000000000000000000000000000000000000000000000000"
	},
	{
		index: 1,
		kind: "approve",
		title: "Skyline Tower — 3D ULPIN issued",
		detail: "Commercial tower approved. Spatial overlaps: 0.",
		actor: "Registrar L2 · Kharadi",
		caseId: "SR-2026-10902",
		vUlpin: "19041855127394-F01-COMM-Z+4.2",
		at: "2026-05-02T16:40:00+05:30",
		hash: "c91a4e77b0d2f6a13e8c45d09b27a1f0c3d8e6b4a5920f1c7d3e8a0b1c2d3e4f",
		prevHash: "6b1c0e8a4d72f91c0a55e3b8d21f7c904e6a12b0c8d34f5a9e1b7c2d3a4e5f60"
	},
	{
		index: 2,
		kind: "approve",
		title: "Green View Residency — vertical parcels sealed",
		detail: "18 floors, 96 units mapped. RERA carpet delta −0.1%.",
		actor: "Registrar L2 · Baner",
		caseId: "SR-2026-11018",
		vUlpin: "19041857887377-F01-RES-Z+3.1",
		at: "2026-05-01T12:12:00+05:30",
		hash: "1f8e0c3a9b47d2e6c0a15f8d3b29e7a4c6d0b1e2f3a4958677c8d9e0f1a2b3c4",
		prevHash: "c91a4e77b0d2f6a13e8c45d09b27a1f0c3d8e6b4a5920f1c7d3e8a0b1c2d3e4f"
	},
	{
		index: 3,
		kind: "approve",
		title: "GIFT One — IFSC campus v-ULPIN",
		detail: "Gandhinagar SEZ sealed. Fire road 14.8 m.",
		actor: "Registrar L2 · Gandhinagar",
		caseId: "SR-2026-17019",
		vUlpin: "19232316127268-F01-IFSC-Z+5.4",
		at: "2026-04-30T18:05:00+05:30",
		hash: "a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f8091",
		prevHash: "1f8e0c3a9b47d2e6c0a15f8d3b29e7a4c6d0b1e2f3a4958677c8d9e0f1a2b3c4"
	},
	{
		index: 4,
		kind: "submit",
		title: "Green Heights Tower filed",
		detail: "Case SR-2026-11345 submitted with 3D BIM extract, Baner LAS tile and RERA form 1.",
		actor: "Aarav Infra Pvt. Ltd.",
		caseId: "SR-2026-11345",
		at: "2026-08-12T11:20:00+05:30",
		hash: "09c1d2e3f4a5b60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f",
		prevHash: "a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f8091"
	},
	{
		index: 5,
		kind: "validate",
		title: "Automated 3D validation ran",
		detail: "Topology valid. Carpet +1.2%. ST_3DIntersects true on Basement 2. LIDAR density 14.2 pts/m².",
		actor: "N3DC Validator",
		caseId: "SR-2026-11345",
		at: "2026-08-12T11:21:08+05:30",
		hash: "77e8d9c0b1a2938475665748392a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4",
		prevHash: "09c1d2e3f4a5b60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f"
	},
	{
		index: 6,
		kind: "flag",
		title: "Magarpatta Spire held",
		detail: "Non-manifold geometry and carpet +3.2%. Dispute flagged.",
		actor: "Registrar L1 · Hadapsar",
		caseId: "SR-2026-10844",
		at: "2026-02-14T10:44:00+05:30",
		hash: "bbccddeeff00112233445566778899aabbccddeeff00112233445566778899aa",
		prevHash: "77e8d9c0b1a2938475665748392a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4"
	},
	{
		index: 7,
		kind: "approve",
		title: "BKC One — commercial v-ULPIN",
		detail: "MMRDA plot sealed. LIDAR density 16.4 pts/m².",
		actor: "Registrar L2 · Bandra",
		caseId: "SR-2026-12088",
		vUlpin: "19021906627286-F01-COMM-Z+5.0",
		at: "2026-07-19T15:22:00+05:30",
		hash: "1234abcd5678ef901234abcd5678ef901234abcd5678ef901234abcd5678ef90",
		prevHash: "bbccddeeff00112233445566778899aabbccddeeff00112233445566778899aa"
	}
];
var REGION_STATS = {
	buildings: 12842,
	towers: 1256,
	parcels: 8966,
	applications: 428,
	approved: 312,
	lidarKm2: 260,
	cityAreaKm2: 527,
	cities: 1
};
/** Published MahaPREIT / PMC 3D Twin drone-survey pilot (not a live PMC API). */
var PMC_TAX_PILOT = [
	{
		ward: "Ghole Road — Shivajinagar",
		n: 24,
		crore: 17.27
	},
	{
		ward: "Nagar Road — Wadgaon Sheri",
		n: 2,
		crore: 15.07
	},
	{
		ward: "Dhole Patil Road",
		n: 8,
		crore: 14.38
	},
	{
		ward: "Hadapsar",
		n: 2,
		crore: 3.75
	},
	{
		ward: "Yerawada",
		n: 7,
		crore: 3.69
	},
	{
		ward: "Aundh — Baner",
		n: 23,
		crore: 2.13
	},
	{
		ward: "Dhankawadi",
		n: 13,
		crore: .13
	}
];
var LIDAR_DEMOS = [
	{
		caseId: "SR-2026-11345",
		ulpin: "19041856427377",
		file: "/lidar-samples/baner-green-heights.xyz",
		label: "Green Heights Tower",
		ward: "Baner",
		cts: "47/2A"
	},
	{
		caseId: "SR-2026-10902",
		ulpin: "19041855127394",
		file: "/lidar-samples/kharadi-skyline.xyz",
		label: "Skyline Tower",
		ward: "Kharadi",
		cts: "12/8"
	},
	{
		caseId: "SR-2026-10844",
		ulpin: "19041851627392",
		file: "/lidar-samples/hadapsar-spire.xyz",
		label: "Magarpatta Spire",
		ward: "Hadapsar",
		cts: "MAG-4/1"
	}
];
async function sha256Hex(input) {
	const data = new TextEncoder().encode(input);
	const digest = await crypto.subtle.digest("SHA-256", data);
	return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function shortHash(hex) {
	const clean = hex.replace(/^0x/, "");
	return `0x${clean.slice(0, 10)}…${clean.slice(-8)}`;
}
function genesisHash() {
	return "0".repeat(64);
}
var BUDGET = 2e4;
function budget() {
	if (typeof window === "undefined") return 16e3;
	return window.innerWidth < 640 ? 12e3 : 2e4;
}
function detectKind(file, bytes) {
	const name = file.name.toLowerCase();
	const u8 = new Uint8Array(bytes);
	if (name.endsWith(".laz") || name.endsWith(".copc.laz")) return "laz";
	if (name.endsWith(".e57")) return "unknown";
	if (name.endsWith(".json") || name.endsWith(".n3dc.json")) return "json";
	if (name.endsWith(".xyz") || name.endsWith(".txt") || name.endsWith(".csv")) return "xyz";
	if (u8.length >= 4 && u8[0] === 76 && u8[1] === 65 && u8[2] === 83 && u8[3] === 70) return "las";
	if (name.endsWith(".las")) return "las";
	return "unknown";
}
function tileToCloud(tile) {
	const unpacked = unpackTilePoints(tile);
	return {
		header: tile,
		positions: unpacked.positions,
		rgb: unpacked.colors,
		intensity: unpacked.intensity,
		classification: unpacked.classification,
		height: unpacked.height,
		count: unpacked.positions.length / 3
	};
}
function parseJsonTile(text) {
	const tile = JSON.parse(text);
	if (tile.spec !== "n3dc-lidar-tile/1.0" && !tile.pointsB64 && !tile.points) throw new Error("JSON is not an n3dc-lidar-tile/1.0 payload");
	return tileToCloud(tile);
}
function parseXyz(text, fileName) {
	const lines = text.split(/\r?\n/);
	const cap = Math.min(budget(), BUDGET);
	const xs = [];
	const ys = [];
	const zs = [];
	const is = [];
	const cs = [];
	let headerUlpin = "";
	let headerCase = "";
	let headerCrs = "local-metres";
	let headerDatum = "file";
	for (const line of lines) {
		const t = line.trim();
		if (!t) continue;
		if (t.startsWith("#") || t.startsWith("//")) {
			const u = t.match(/ULPIN\s+(\d{14})/i);
			if (u?.[1]) headerUlpin = u[1];
			const cid = t.match(/linked-case\s+(SR-\d{4}-\d+)/i) ?? t.match(/caseId\s+(SR-\d{4}-\d+)/i);
			if (cid?.[1]) headerCase = cid[1];
			const crs = t.match(/CRS\s+(EPSG:\d+)/i);
			if (crs?.[1]) headerCrs = crs[1];
			if (/EGM2008/i.test(t)) headerDatum = "EGM2008";
			continue;
		}
		const p = t.split(/[,\s]+/);
		const x = Number(p[0]);
		const y = Number(p[1]);
		const z = Number(p[2]);
		if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) continue;
		xs.push(x);
		ys.push(y);
		zs.push(z);
		is.push(p[3] !== void 0 ? Number(p[3]) : .55);
		cs.push(p[4] !== void 0 ? Number(p[4]) : 1);
	}
	if (xs.length < 8) throw new Error("XYZ file has no usable rows (need x y z per line).");
	const stride = Math.max(1, Math.ceil(xs.length / cap));
	let ox = 0;
	let oy = 0;
	let oz = Infinity;
	for (let i = 0; i < xs.length; i++) {
		ox += xs[i];
		oy += ys[i];
		if (zs[i] < oz) oz = zs[i];
	}
	ox /= xs.length;
	oy /= ys.length;
	const count = Math.ceil(xs.length / stride);
	const packed = /* @__PURE__ */ new ArrayBuffer(count * 12);
	const view = new DataView(packed);
	let w = 0;
	const classes = {};
	let zMax = -Infinity;
	for (let i = 0; i < xs.length; i += stride) {
		const x = xs[i] - ox;
		const y = ys[i] - oy;
		const z = zs[i] - oz;
		if (z > zMax) zMax = z;
		const klass = Number.isFinite(cs[i]) ? cs[i] : 1;
		const inten = Number.isFinite(is[i]) ? is[i] : .55;
		packPoint(view, w * 12, x, y, z, inten > 1 ? inten : inten * 65535, klass, 180, 180, 190, .01);
		classes[String(klass | 0)] = (classes[String(klass | 0)] ?? 0) + 1;
		w += 1;
	}
	return tileToCloud({
		spec: N3DC_LIDAR_SPEC,
		jobId: `local-xyz-${Date.now()}`,
		status: "ready",
		ulpin: headerUlpin,
		caseId: headerCase || void 0,
		crs: headerCrs,
		verticalDatum: headerDatum,
		origin: emptyOrigin(0, 0),
		scale: .01,
		count: w,
		densityPtsM2: 0,
		bounds: {
			min: [
				-40,
				-40,
				0
			],
			max: [
				40,
				40,
				zMax
			]
		},
		classes,
		sensor: fileName,
		capturedAt: (/* @__PURE__ */ new Date()).toISOString(),
		city: "",
		state: "",
		encoding: "i16-xyz-u16i-u8c-u8rgb",
		points: packed.slice(0, w * 12)
	});
}
function parseLas(buffer, fileName) {
	const view = new DataView(buffer);
	if (buffer.byteLength < 227) throw new Error("LAS header truncated");
	if (String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3)) !== "LASF") throw new Error("Not a LAS file (missing LASF signature).");
	const versionMinor = view.getUint8(25);
	const headerSize = view.getUint16(94, true);
	const offset = view.getUint32(96, true);
	const fmt = view.getUint8(104);
	const recLen = view.getUint16(105, true);
	let n = view.getUint32(107, true);
	if (n === 0 && versionMinor >= 4 && headerSize >= 375) n = view.getUint32(247, true) + view.getUint32(251, true) * 4294967296;
	const xScale = view.getFloat64(131, true);
	const yScale = view.getFloat64(139, true);
	const zScale = view.getFloat64(147, true);
	const xOff = view.getFloat64(155, true);
	const yOff = view.getFloat64(163, true);
	const zOff = view.getFloat64(171, true);
	if (recLen < 20 || offset + recLen > buffer.byteLength) throw new Error("LAS point records unreadable");
	const available = Math.floor((buffer.byteLength - offset) / recLen);
	const total = Math.min(n || available, available);
	const cap = Math.min(budget(), BUDGET);
	const stride = Math.max(1, Math.ceil(total / cap));
	const sampleX = [];
	const sampleY = [];
	const sampleZ = [];
	for (let i = 0; i < total; i += Math.max(stride * 8, 1)) {
		const o = offset + i * recLen;
		sampleX.push(view.getInt32(o, true) * xScale + xOff);
		sampleY.push(view.getInt32(o + 4, true) * yScale + yOff);
		sampleZ.push(view.getInt32(o + 8, true) * zScale + zOff);
	}
	const ox = sampleX.reduce((a, b) => a + b, 0) / Math.max(1, sampleX.length);
	const oy = sampleY.reduce((a, b) => a + b, 0) / Math.max(1, sampleY.length);
	const oz = sampleZ.reduce((a, b) => Math.min(a, b), Infinity);
	const hasRgb = fmt === 2 || fmt === 3 || fmt === 5 || fmt === 7 || fmt >= 8;
	const rgbOff = fmt === 2 ? 20 : fmt === 3 ? 28 : fmt >= 7 ? 30 : -1;
	const classOff = 15;
	const written = Math.ceil(total / stride);
	const packed = /* @__PURE__ */ new ArrayBuffer(written * 12);
	const out = new DataView(packed);
	const classes = {};
	let w = 0;
	let zMax = -Infinity;
	for (let i = 0; i < total && w < written; i += stride) {
		const o = offset + i * recLen;
		const x = view.getInt32(o, true) * xScale + xOff - ox;
		const y = view.getInt32(o + 4, true) * yScale + yOff - oy;
		const z = view.getInt32(o + 8, true) * zScale + zOff - oz;
		const intensity = view.getUint16(o + 12, true);
		const klass = view.getUint8(o + classOff) & 31;
		let r = 180;
		let g = 180;
		let b = 190;
		if (hasRgb && rgbOff > 0 && o + rgbOff + 6 <= buffer.byteLength) {
			r = Math.min(255, view.getUint16(o + rgbOff, true) >> 8);
			g = Math.min(255, view.getUint16(o + rgbOff + 2, true) >> 8);
			b = Math.min(255, view.getUint16(o + rgbOff + 4, true) >> 8);
		}
		if (z > zMax) zMax = z;
		packPoint(out, w * 12, x, y, z, intensity, klass, r, g, b, .01);
		classes[String(klass)] = (classes[String(klass)] ?? 0) + 1;
		w += 1;
	}
	const sysId = new TextDecoder().decode(new Uint8Array(buffer, 26, 32)).replace(/\0/g, "").trim();
	return tileToCloud({
		spec: N3DC_LIDAR_SPEC,
		jobId: `local-las-${Date.now()}`,
		status: "ready",
		ulpin: "",
		crs: "file-crs",
		verticalDatum: "file",
		origin: emptyOrigin(0, 0),
		scale: .01,
		count: w,
		densityPtsM2: 0,
		bounds: {
			min: [
				-80,
				-80,
				0
			],
			max: [
				80,
				80,
				zMax
			]
		},
		classes,
		sensor: sysId || fileName,
		capturedAt: (/* @__PURE__ */ new Date()).toISOString(),
		city: "",
		state: "",
		encoding: "i16-xyz-u16i-u8c-u8rgb",
		points: packed.slice(0, w * 12)
	});
}
async function parseLidarFile(file) {
	const bytes = await file.arrayBuffer();
	const kind = detectKind(file, bytes);
	if (kind === "laz") throw new Error("LAZ is compressed. POST it to /v1/lidar/ingest (see the Python contract) — the browser cannot inflate LAZ without the backend.");
	if (kind === "json") return parseJsonTile(new TextDecoder().decode(bytes));
	if (kind === "xyz") return parseXyz(new TextDecoder().decode(bytes), file.name);
	if (kind === "las") return parseLas(bytes, file.name);
	throw new Error(`Unsupported file (${file.name}). Accept LAS, XYZ/CSV, or n3dc-lidar-tile JSON. LAZ/E57 go through the ingest API.`);
}
function median(values) {
	if (values.length === 0) return 0;
	const s = values.slice().sort((a, b) => a - b);
	const mid = Math.floor(s.length / 2);
	return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}
/**
* Building height = class-6 Z-max inside the subject footprint minus the
* class-2 ground plane. Neighbour towers (also class 6) are ignored so a
* 32 m Baner walk-up is not reported as 40 m because Kalyani Nagar next door
* is taller.
*/
function measureLidar(cloud, caze) {
	const hx = 12.5;
	const hz = 11.5;
	const grounds = [];
	let buildingZMax = -Infinity;
	let zMin = Infinity;
	let zMax = -Infinity;
	for (let i = 0; i < cloud.count; i++) {
		const h = cloud.height[i] ?? 0;
		if (h < zMin) zMin = h;
		if (h > zMax) zMax = h;
		const klass = cloud.classification[i] ?? 1;
		if (klass === 2) grounds.push(h);
		if (klass === 6) {
			const x = cloud.positions[i * 3] ?? 0;
			const z = cloud.positions[i * 3 + 2] ?? 0;
			if (Math.abs(x) <= hx && Math.abs(z) <= hz && h > buildingZMax) buildingZMax = h;
		}
	}
	if (!Number.isFinite(buildingZMax)) buildingZMax = zMax;
	const groundZ = grounds.length >= 8 ? median(grounds) : zMin;
	const measuredHeightM = Math.max(0, buildingZMax - groundZ);
	const declaredHeightM = caze?.heightM ?? measuredHeightM;
	const deltaM = measuredHeightM - declaredHeightM;
	const deltaPct = declaredHeightM === 0 ? 0 : deltaM / declaredHeightM * 100;
	const origin = cloud.header.origin;
	const classes = Object.entries(cloud.header.classes).map(([k, n]) => ({
		klass: Number(k),
		label: ASPRS_LABEL[Number(k)] ?? `Class ${k}`,
		n
	})).sort((a, b) => b.n - a.n);
	const spanX = Math.max(1, (cloud.header.bounds.max[0] ?? 1) - (cloud.header.bounds.min[0] ?? 0));
	const spanY = Math.max(1, (cloud.header.bounds.max[1] ?? 1) - (cloud.header.bounds.min[1] ?? 0));
	const density = cloud.header.densityPtsM2 || Number((cloud.count / (spanX * spanY)).toFixed(2));
	return {
		pointCount: cloud.count,
		densityPtsM2: density,
		groundZ,
		buildingZMax,
		measuredHeightM,
		declaredHeightM,
		deltaM,
		deltaPct,
		zMin,
		zMax,
		bbox: {
			lat: origin.lat || caze?.lat || 0,
			lng: origin.lng || caze?.lng || 0,
			min: cloud.header.bounds.min,
			max: cloud.header.bounds.max
		},
		classes,
		pass: Math.abs(deltaPct) <= 2
	};
}
function cloudToXyz(cloud, comment) {
	const lines = [
		`# N3DC synthetic / parsed tile`,
		`# ${comment}`,
		`# ULPIN ${cloud.header.ulpin}`,
		`# linked-case ${cloud.header.caseId ?? ""}`,
		`# CRS ${cloud.header.crs}  datum ${cloud.header.verticalDatum}`,
		`# columns: x_m y_m z_m intensity class`
	];
	const stride = Math.max(1, Math.ceil(cloud.count / 4e3));
	for (let i = 0; i < cloud.count; i += stride) {
		const x = (cloud.positions[i * 3] ?? 0).toFixed(3);
		const y = (cloud.positions[i * 3 + 2] ?? 0).toFixed(3);
		const z = (cloud.height[i] ?? 0).toFixed(3);
		const inten = Math.round((cloud.intensity[i] ?? .5) * 65535);
		const klass = cloud.classification[i] ?? 1;
		lines.push(`${x} ${y} ${z} ${inten} ${klass}`);
	}
	return `${lines.join("\n")}\n`;
}
function heightDeltaTone(deltaPct) {
	const a = Math.abs(deltaPct);
	if (a <= 2) return "ok";
	if (a <= 5) return "warn";
	return "alert";
}
function encodeUlpin(lat, lng) {
	const latN = Math.round((lat + 90) * 1e6);
	const lngN = Math.round((lng + 180) * 1e6);
	return ((BigInt(latN) * 1000003n + BigInt(lngN)) % 10n ** 14n).toString().padStart(14, "0");
}
/** Group a 14-digit ULPIN as 4-4-4-2 for registrar reading. */
function formatUlpinGroups(ulpin) {
	const d = ulpin.replace(/\D/g, "").padStart(14, "0").slice(0, 14);
	return `${d.slice(0, 4)} ${d.slice(4, 8)} ${d.slice(8, 12)} ${d.slice(12)}`;
}
function roofFloor(storeys) {
	return storeys + 1;
}
function isRoofFloor(floor, storeys) {
	return floor > storeys;
}
/** Roof first, then habitable floors descending, then basements. */
function floorListFor(storeys, basements) {
	const list = [roofFloor(storeys)];
	for (let f = storeys; f >= 1; f--) list.push(f);
	for (let b = 1; b <= basements; b++) list.push(-b);
	return list;
}
function floorListForCase(caze) {
	return floorListFor(caze.floors, caze.basements);
}
function formatVUlpin(ulpin, floor, unit, elevation, storeys = 10) {
	const band = floor < 0 ? `B${Math.abs(floor).toString().padStart(2, "0")}` : isRoofFloor(floor, storeys) ? "RF" : `F${floor.toString().padStart(2, "0")}`;
	const zSign = elevation >= 0 ? "+" : "";
	return `${ulpin}-${band}-${unit.replace(/[^A-Z0-9]/gi, "").padStart(4, "0").slice(0, 6)}-Z${zSign}${elevation.toFixed(1)}`;
}
function floorElevation(floor, storeys = 10) {
	if (floor < 0) return (floor + .5) * 3;
	if (isRoofFloor(floor, storeys)) return storeys * FLOOR_H;
	return (floor - .5) * FLOOR_H;
}
function floorLabel(floor, storeys = 10) {
	if (isRoofFloor(floor, storeys)) return "Roof";
	if (floor < 0) return `Basement ${Math.abs(floor)}`;
	return `Floor ${floor}`;
}
function carpetDeltaPct(declared, measured) {
	if (!declared) return 0;
	return (measured - declared) / declared * 100;
}
function parseVUlpin(value) {
	const parts = value.trim().split("-");
	if (parts.length < 4) return null;
	const z = parts[parts.length - 1] ?? "";
	const elev = Number(z.replace(/^Z/, ""));
	return {
		ulpin: parts[0] ?? "",
		band: parts[1] ?? "",
		unit: parts[2] ?? "",
		elevation: Number.isFinite(elev) ? elev : 0
	};
}
var defaultLayers = {
	building: true,
	floors: true,
	parcels: true,
	encroachments: true,
	setbacks: true,
	utilities: true,
	lidar: true
};
var FEATURED_ULPIN = CASES.find((c) => c.id === "SR-2026-11345")?.ulpin ?? CASES[0].ulpin;
function cloneCases() {
	return CASES.map((c) => ({
		...c,
		setbackRequired: { ...c.setbackRequired },
		setbackActual: { ...c.setbackActual },
		violations: c.violations.map((v) => ({ ...v }))
	}));
}
/** Stamp LiDAR height onto the Building / v-ULPIN record keyed by 14-digit ULPIN. */
function stampByUlpin(cases, ulpin, cloud) {
	const digits = ulpin.replace(/\D/g, "");
	if (digits.length !== 14) return cases;
	const current = cases.find((c) => c.ulpin === digits);
	if (!current) return cases;
	const m = measureLidar(cloud, current);
	return cases.map((c) => c.ulpin === digits ? {
		...c,
		lidarMeasuredHeightM: Number(m.measuredHeightM.toFixed(2)),
		lidarPtsM2: Number(m.densityPtsM2.toFixed(2))
	} : c);
}
async function appendAudit(prev, partial) {
	const prevHash = prev[prev.length - 1]?.hash ?? genesisHash();
	const index = prev.length;
	const hash = await sha256Hex(JSON.stringify({
		...partial,
		index,
		prevHash
	}));
	return [...prev, {
		...partial,
		index,
		hash,
		prevHash
	}];
}
var DEFAULT_CLASSES = [
	2,
	3,
	4,
	5,
	6,
	9,
	11,
	13,
	14,
	17
];
function selectPayload(hit) {
	return {
		selectedUlpin: hit.ulpin,
		selectedCaseId: hit.id,
		selectedFloor: Math.min(6, hit.floors),
		measurePoints: []
	};
}
var useCadastre = create((set, get) => ({
	cases: cloneCases(),
	audit: SEED_AUDIT,
	backupAudit: null,
	selectedCaseId: FEATURED_CASE_ID,
	selectedUlpin: FEATURED_ULPIN,
	selectedFloor: 6,
	layers: defaultLayers,
	xray: false,
	ortho: false,
	tool: "orbit",
	measurePoints: [],
	chainVerified: null,
	lidarSource: "synthetic",
	lidarFileName: null,
	lidarRevision: 0,
	lidarBusy: false,
	lidarError: null,
	enabledClasses: DEFAULT_CLASSES,
	setCase: (id) => {
		const hit = get().cases.find((c) => c.id === id);
		if (hit) set(selectPayload(hit));
	},
	setCaseByUlpin: (ulpin) => {
		const digits = ulpin.replace(/\D/g, "");
		const hit = get().cases.find((c) => c.ulpin === digits);
		if (hit) set(selectPayload(hit));
	},
	setFloor: (floor) => set({ selectedFloor: floor }),
	toggleLayer: (key) => set((s) => ({ layers: {
		...s.layers,
		[key]: !s.layers[key]
	} })),
	setLayer: (key, value) => set((s) => ({ layers: {
		...s.layers,
		[key]: value
	} })),
	setTool: (tool) => {
		if (tool === "xray") {
			set((s) => ({
				xray: !s.xray,
				tool: s.tool
			}));
			return;
		}
		if (tool === "ortho") {
			set((s) => ({
				ortho: !s.ortho,
				tool: s.tool
			}));
			return;
		}
		if (tool === "reset") {
			set({
				tool: "orbit",
				measurePoints: [],
				xray: false,
				ortho: false
			});
			return;
		}
		set({
			tool,
			measurePoints: tool === "measure" ? get().measurePoints : []
		});
	},
	toggleXray: () => set((s) => ({ xray: !s.xray })),
	toggleOrtho: () => set((s) => ({ ortho: !s.ortho })),
	pushMeasure: (p) => set((s) => ({ measurePoints: s.measurePoints.length >= 2 ? [p] : [...s.measurePoints, p] })),
	clearMeasure: () => set({ measurePoints: [] }),
	approve: async (actor = "Registrar Officer · Pune") => {
		const current = selectCase(get());
		const { cases, audit, selectedFloor } = get();
		const vUlpin = formatVUlpin(current.ulpin, selectedFloor, "BLDG", floorElevation(selectedFloor, current.floors), current.floors);
		const nextCases = cases.map((c) => c.ulpin === current.ulpin ? {
			...c,
			status: "approved",
			vUlpin
		} : c);
		const nextAudit = await appendAudit(audit, {
			kind: "approve",
			title: `${current.project} — 3D ULPIN approved`,
			detail: current.intersects3d ? `Approved with exception: ST_3DIntersects still true. v-ULPIN ${vUlpin}` : `v-ULPIN ${vUlpin} sealed. Topology valid.`,
			actor,
			caseId: current.id,
			vUlpin,
			at: (/* @__PURE__ */ new Date()).toISOString()
		});
		set({
			cases: nextCases,
			audit: nextAudit,
			chainVerified: null
		});
		return nextAudit[nextAudit.length - 1];
	},
	flag: async (reason, actor = "Registrar Officer · Pune") => {
		const current = selectCase(get());
		const { cases, audit } = get();
		const nextCases = cases.map((c) => c.ulpin === current.ulpin ? {
			...c,
			status: "flagged"
		} : c);
		const nextAudit = await appendAudit(audit, {
			kind: "flag",
			title: `${current.project} — dispute flagged`,
			detail: `${reason} ULPIN ${current.ulpin}.`,
			actor,
			caseId: current.id,
			vUlpin: current.vUlpin,
			at: (/* @__PURE__ */ new Date()).toISOString()
		});
		set({
			cases: nextCases,
			audit: nextAudit,
			chainVerified: null
		});
		return nextAudit[nextAudit.length - 1];
	},
	transfer: async ({ unit, buyer, actor = "Sub-Registrar · Pune" }) => {
		const current = selectCase(get());
		const { audit } = get();
		const vUlpin = formatVUlpin(current.ulpin, get().selectedFloor, unit, floorElevation(get().selectedFloor, current.floors), current.floors);
		const nextAudit = await appendAudit(audit, {
			kind: "transfer",
			title: `${current.project} unit ${unit} conveyed`,
			detail: `Title transferred to ${buyer}. ULPIN ${current.ulpin}. v-ULPIN ${vUlpin}.`,
			actor,
			caseId: current.id,
			vUlpin,
			at: (/* @__PURE__ */ new Date()).toISOString()
		});
		set({
			audit: nextAudit,
			chainVerified: null
		});
		return nextAudit[nextAudit.length - 1];
	},
	tamper: () => {
		const { audit, backupAudit } = get();
		if (audit.length < 4) return;
		set({
			backupAudit: backupAudit ?? audit.map((e) => ({ ...e })),
			chainVerified: null,
			audit: audit.map((e, i) => i === 2 ? {
				...e,
				title: `${e.title} [altered]`,
				hash: `deadbeef${e.hash.slice(8)}`
			} : e)
		});
	},
	restoreChain: () => {
		const { backupAudit, audit } = get();
		set({
			audit: backupAudit ?? audit,
			backupAudit: null,
			chainVerified: null
		});
	},
	verifyChain: async () => {
		const { audit } = get();
		if (audit.length === 0) {
			set({ chainVerified: true });
			return true;
		}
		if (audit[0]?.prevHash !== genesisHash()) {
			set({ chainVerified: false });
			return false;
		}
		for (let i = 1; i < audit.length; i++) {
			const prev = audit[i - 1];
			const cur = audit[i];
			if (!prev || !cur) continue;
			if (cur.prevHash !== prev.hash) {
				set({ chainVerified: false });
				return false;
			}
		}
		set({ chainVerified: true });
		return true;
	},
	ingestLidar: async (file) => {
		const current = selectCase(get());
		const parcelUlpin = current.ulpin ?? "";
		set({
			lidarBusy: true,
			lidarError: null
		});
		try {
			const base = lidarApiBase();
			let cloud;
			if (base) {
				if (parcelUlpin.length !== 14) throw new Error("A 14-digit ULPIN is required to ingest a tile.");
				const tile = await ingestLidarRemote(file, {
					ulpin: parcelUlpin,
					caseId: current.id,
					filename: file.name,
					targetEpsg: 32643,
					verticalDatum: "EGM2008"
				});
				const unpacked = unpackTilePoints(tile);
				cloud = {
					header: tile,
					positions: unpacked.positions,
					rgb: unpacked.colors,
					intensity: unpacked.intensity,
					classification: unpacked.classification,
					height: unpacked.height,
					count: unpacked.positions.length / 3
				};
				const joinUlpin = (tile.ulpin || parcelUlpin).replace(/\D/g, "");
				setUploadedCloud(cloud, file.name);
				set((s) => ({
					cases: stampByUlpin(s.cases, joinUlpin, cloud),
					lidarSource: "api",
					lidarFileName: file.name,
					lidarRevision: s.lidarRevision + 1,
					lidarBusy: false,
					layers: {
						...s.layers,
						lidar: true
					}
				}));
				return;
			}
			cloud = await parseLidarFile(file);
			const joinUlpin = (cloud.header.ulpin || parcelUlpin).replace(/\D/g, "") || parcelUlpin;
			cloud.header = {
				...cloud.header,
				ulpin: joinUlpin || current.ulpin,
				caseId: cloud.header.caseId || current.id,
				city: cloud.header.city || current.city,
				state: cloud.header.state || current.state,
				origin: cloud.header.origin.lat && cloud.header.origin.lng ? cloud.header.origin : {
					...cloud.header.origin,
					lat: current.lat,
					lng: current.lng
				}
			};
			setUploadedCloud(cloud, file.name);
			set((s) => ({
				cases: stampByUlpin(s.cases, cloud.header.ulpin, cloud),
				lidarSource: "upload",
				lidarFileName: file.name,
				lidarRevision: s.lidarRevision + 1,
				lidarBusy: false,
				layers: {
					...s.layers,
					lidar: true
				}
			}));
		} catch (e) {
			set({
				lidarBusy: false,
				lidarError: e instanceof Error ? e.message : "LIDAR ingest failed"
			});
			throw e;
		}
	},
	clearLidarUpload: () => {
		setUploadedCloud(null, null);
		set((s) => ({
			lidarSource: "synthetic",
			lidarFileName: null,
			lidarRevision: s.lidarRevision + 1,
			lidarError: null
		}));
	},
	toggleClass: (klass) => set((s) => ({ enabledClasses: s.enabledClasses.includes(klass) ? s.enabledClasses.filter((c) => c !== klass) : [...s.enabledClasses, klass] })),
	setEnabledClasses: (enabledClasses) => set({ enabledClasses })
}));
/** Active parcel — always resolved by 14-digit ULPIN, never by first-array fallback as the primary key. */
function selectCase(state) {
	return state.cases.find((c) => c.ulpin === state.selectedUlpin) ?? state.cases.find((c) => c.id === state.selectedCaseId) ?? state.cases[0];
}
var NAV = [
	{
		to: "/",
		label: "Dashboard",
		icon: LayoutDashboard,
		hint: "Region overview"
	},
	{
		to: "/review",
		label: "Case Review",
		icon: Cuboid,
		hint: "3D compliance workspace"
	},
	{
		to: "/lidar",
		label: "LIDAR",
		icon: Radar,
		hint: "Point cloud ingest"
	},
	{
		to: "/buildings",
		label: "Buildings",
		icon: Building2,
		hint: "Towers and parcels"
	},
	{
		to: "/ulpin",
		label: "v-ULPIN",
		icon: Fingerprint,
		hint: "Vertical identifiers"
	},
	{
		to: "/solar",
		label: "Solar Envelope",
		icon: Sun,
		hint: "Shadow & light easement"
	},
	{
		to: "/emergency",
		label: "Fire Access",
		icon: Flame,
		hint: "UDCPR clearance routes"
	},
	{
		to: "/audit",
		label: "Audit Ledger",
		icon: ShieldCheck,
		hint: "Immutable title trail"
	},
	{
		to: "/applications",
		label: "Applications",
		icon: Files,
		hint: "Registrar queue"
	}
];
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-navy-mid",
			ok: "bg-ok text-white hover:bg-ok/90",
			danger: "bg-danger text-white hover:bg-danger/90",
			outline: "border border-border bg-card text-ink hover:bg-secondary",
			ghost: "text-ink hover:bg-secondary",
			navy: "bg-navy text-white hover:bg-navy-mid",
			warn: "bg-warn text-white hover:bg-warn/90"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 px-3 text-xs",
			lg: "h-11 px-5",
			icon: "size-10",
			"icon-sm": "size-8"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function ThemeToggle({ className }) {
	const mode = useTheme((s) => s.mode);
	const toggle = useTheme((s) => s.toggleMode);
	const dark = mode === "dark";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "ghost",
			size: "icon-sm",
			className: cn("text-white hover:bg-white/10", className),
			onClick: toggle,
			"aria-label": dark ? "Switch to light mode" : "Switch to dark mode",
			children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: dark ? "Light mode" : "Night ops" })] });
}
function InvertToggle({ className }) {
	const invert = useLutInvert();
	const toggle = useTheme((s) => s.toggleLidarInvert);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "ghost",
			size: "icon-sm",
			className: cn("text-white hover:bg-white/10", invert && "bg-white/15", className),
			onClick: toggle,
			"aria-pressed": invert,
			"aria-label": "Invert LIDAR colour lookup",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contrast, { className: "size-4" })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, { children: invert ? "LUT inverted for night canvas" : "Standard elevation LUT" })] });
}
var Sheet = Dialog;
var SheetContent = import_react.forwardRef(({ className, children, side = "left", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-navy-deep/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn("fixed z-50 bg-card p-5 shadow-[var(--shadow-panel)]", side === "left" && "inset-y-0 left-0 w-72", side === "right" && "inset-y-0 right-0 w-80", side === "bottom" && "inset-x-0 bottom-0 max-h-[80vh] rounded-t-2xl", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
SheetContent.displayName = "SheetContent";
function Rail({ onNavigate }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-1",
		children: NAV.map((item) => {
			const active = item.to === "/" ? pathname === "/" : pathname === item.to || pathname.startsWith(`${item.to}/`);
			const Icon = item.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					onClick: onNavigate,
					"aria-current": active ? "page" : void 0,
					className: cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150", "lg:justify-center lg:px-0 lg:size-11", active ? "bg-navy-mid text-white" : "text-white/70 hover:bg-white/10 hover:text-white"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-5 shrink-0",
						strokeWidth: 1.75
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "lg:sr-only",
						children: item.label
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
				side: "right",
				className: "hidden lg:block",
				children: item.label
			})] }, item.to);
		})
	});
}
function AppShell({ title, subtitle, actions, children, flush = false }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh min-h-0 bg-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden w-16 shrink-0 flex-col items-center bg-navy-deep py-4 lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "mb-6 flex size-10 items-center justify-center rounded-lg bg-navy-mid text-white",
						"aria-label": "N3DC home",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs font-semibold tracking-tight",
							children: "3D"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-auto text-[9px] font-medium uppercase tracking-widest text-white/40",
						children: "N3DC"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex h-14 shrink-0 items-center justify-between gap-3 bg-navy px-3 text-white sm:px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							className: "text-white hover:bg-white/10 lg:hidden",
							onClick: () => setOpen(true),
							"aria-label": "Open navigation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-semibold tracking-wide sm:text-base",
								children: title
							}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hidden truncate text-xs text-white/70 sm:block",
								children: subtitle
							}) : null]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 sm:gap-2",
						children: [
							actions,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvertToggle, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3.5" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "Registrar Officer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sm:hidden",
										children: "RO"
									})
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: cn("min-h-0 min-w-0 flex-1", flush ? "overflow-hidden" : "overflow-y-auto"),
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "left",
					className: "bg-navy-deep p-4 text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "mb-6 flex items-center gap-2",
						onClick: () => setOpen(false),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-9 items-center justify-center rounded-lg bg-navy-mid font-mono text-xs font-semibold",
							children: "3D"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold",
							children: "N3DC"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-white/60",
							children: "National 3D Cadastre"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, { onNavigate: () => setOpen(false) })]
				})
			})
		]
	});
}
//#endregion
export { measureLidar as C, useCadastre as D, shortHash as E, lidarApiBase as S, selectCase as T, floorListForCase as _, LIDAR_ACCEPT as a, heightDeltaTone as b, REGION_STATS as c, carpetDeltaPct as d, cloudForCase as f, floorLabel as g, floorElevation as h, Button as i, Sheet as l, encodeUlpin as m, AppShell as n, LIDAR_DEMOS as o, cloudToXyz as p, BACKEND_CURL as r, PMC_TAX_PILOT as s, ASPRS_LABEL as t, SheetContent as u, formatUlpinGroups as v, parseVUlpin as w, isRoofFloor as x, formatVUlpin as y };
