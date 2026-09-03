import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as BufferGeometry, h as LineBasicMaterial, m as Float32BufferAttribute } from "../_libs/@react-three/drei+[...].mjs";
import { c as useLutInvert, l as useTheme } from "./router-C-fsLIL7.mjs";
import { D as useCadastre, T as selectCase, f as cloudForCase } from "./app-shell-BSG3YbSA.mjs";
import { n as paintCloud } from "./lidar-color-CJzUaZm1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lidar-points-jr9Ec6a-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function filterCloud(positions, colors, classification, enabled) {
	const allow = new Set(enabled);
	let n = 0;
	for (let i = 0; i < classification.length; i++) if (allow.has(classification[i])) n += 1;
	const pos = new Float32Array(n * 3);
	const col = new Float32Array(n * 3);
	let w = 0;
	for (let i = 0; i < classification.length; i++) {
		if (!allow.has(classification[i])) continue;
		pos[w * 3] = positions[i * 3];
		pos[w * 3 + 1] = positions[i * 3 + 1];
		pos[w * 3 + 2] = positions[i * 3 + 2];
		col[w * 3] = colors[i * 3];
		col[w * 3 + 1] = colors[i * 3 + 1];
		col[w * 3 + 2] = colors[i * 3 + 2];
		w += 1;
	}
	return {
		pos,
		col,
		n
	};
}
function LidarPoints({ force = false }) {
	const caze = useCadastre(selectCase);
	const layers = useCadastre((s) => s.layers);
	const source = useCadastre((s) => s.lidarSource);
	const revision = useCadastre((s) => s.lidarRevision);
	const enabled = useCadastre((s) => s.enabledClasses);
	const lut = useTheme((s) => s.lidarLut);
	const invert = useLutInvert();
	const size = useTheme((s) => s.lidarPointSize);
	const dark = useTheme((s) => s.mode) === "dark";
	const cloud = (0, import_react.useMemo)(() => cloudForCase(caze, source !== "synthetic"), [
		caze,
		source,
		revision
	]);
	const painted = (0, import_react.useMemo)(() => paintCloud(cloud, lut, invert), [
		cloud,
		lut,
		invert
	]);
	const filtered = (0, import_react.useMemo)(() => filterCloud(cloud.positions, painted, cloud.classification, enabled), [
		cloud,
		painted,
		enabled
	]);
	if (!force && !layers.lidar) return null;
	if (filtered.n === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("points", {
		frustumCulled: false,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("bufferGeometry", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferAttribute", {
			attach: "attributes-position",
			args: [filtered.pos, 3]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferAttribute", {
			attach: "attributes-color",
			args: [filtered.col, 3]
		})] }, `${caze.ulpin}-${revision}-${lut}-${invert}-${enabled.join(",")}-${filtered.n}`), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
			size,
			vertexColors: true,
			sizeAttenuation: true,
			depthWrite: false,
			transparent: true,
			opacity: dark ? .94 : .86,
			toneMapped: false
		})]
	});
}
function LidarGroundGrid() {
	const dark = useTheme((s) => s.mode) === "dark";
	const mat = (0, import_react.useMemo)(() => new LineBasicMaterial({
		color: dark ? "#1b3a58" : "#9ab0c4",
		transparent: true,
		opacity: .45
	}), [dark]);
	const geo = (0, import_react.useMemo)(() => {
		const g = new BufferGeometry();
		const pts = [];
		for (let i = -80; i <= 80; i += 10) pts.push(i, .02, -80, i, .02, 80, -80, .02, i, 80, .02, i);
		g.setAttribute("position", new Float32BufferAttribute(pts, 3));
		return g;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineSegments", {
		geometry: geo,
		material: mat
	});
}
//#endregion
export { LidarPoints as n, LidarGroundGrid as t };
