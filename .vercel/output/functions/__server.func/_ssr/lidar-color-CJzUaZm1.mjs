//#region node_modules/.nitro/vite/services/ssr/assets/lidar-color-CJzUaZm1.js
/** Turbo-like sequential LUT — reads well on both paper and night ops. */
function lutColor(t, invert) {
	const u = invert ? 1 - t : t;
	const x = Math.min(1, Math.max(0, u));
	return [
		Math.min(1, Math.max(0, .135 + 2.2 * x - 1.65 * x * x)),
		Math.min(1, Math.max(0, .05 + 3.4 * x - 3.6 * x * x + .9 * x * x * x)),
		Math.min(1, Math.max(0, .55 + .4 * Math.sin((x - .15) * Math.PI) - 1.1 * x * x))
	];
}
function lutCss(t, invert) {
	const [r, g, b] = lutColor(t, invert);
	return `rgb(${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)})`;
}
function classRgb(klass) {
	switch (klass) {
		case 2: return [
			.55,
			.42,
			.28
		];
		case 3: return [
			.42,
			.62,
			.28
		];
		case 4: return [
			.28,
			.55,
			.22
		];
		case 5: return [
			.14,
			.42,
			.18
		];
		case 6: return [
			.82,
			.88,
			.94
		];
		case 7:
		case 18: return [
			.85,
			.2,
			.18
		];
		case 9: return [
			.18,
			.42,
			.78
		];
		case 11: return [
			.28,
			.3,
			.32
		];
		case 13: return [
			.95,
			.78,
			.2
		];
		case 14: return [
			.9,
			.55,
			.12
		];
		case 17: return [
			.55,
			.55,
			.6
		];
		default: return [
			.62,
			.66,
			.7
		];
	}
}
function paintCloud(cloud, lut, invert, target) {
	const out = target && target.length === cloud.count * 3 ? target : new Float32Array(cloud.count * 3);
	let zMin = Infinity;
	let zMax = -Infinity;
	for (let i = 0; i < cloud.count; i++) {
		const z = cloud.height[i] ?? 0;
		if (z < zMin) zMin = z;
		if (z > zMax) zMax = z;
	}
	const span = Math.max(.001, zMax - zMin);
	for (let i = 0; i < cloud.count; i++) {
		let r = 0;
		let g = 0;
		let b = 0;
		if (lut === "class") {
			[r, g, b] = classRgb(cloud.classification[i] ?? 1);
			if (invert) {
				r = 1 - r * .55;
				g = 1 - g * .55;
				b = 1 - b * .45;
			}
		} else if (lut === "rgb") {
			r = cloud.rgb[i * 3] ?? .7;
			g = cloud.rgb[i * 3 + 1] ?? .7;
			b = cloud.rgb[i * 3 + 2] ?? .7;
			if (invert) {
				r = Math.min(1, r * 1.35 + .08);
				g = Math.min(1, g * 1.35 + .08);
				b = Math.min(1, b * 1.45 + .12);
			}
		} else if (lut === "intensity") {
			const t = cloud.intensity[i] ?? .5;
			[r, g, b] = lutColor(t, invert);
		} else {
			const t = ((cloud.height[i] ?? 0) - zMin) / span;
			[r, g, b] = lutColor(t, invert);
		}
		out[i * 3] = r;
		out[i * 3 + 1] = g;
		out[i * 3 + 2] = b;
	}
	return out;
}
function sceneSky(dark) {
	return dark ? "#071018" : "#c5d8ea";
}
//#endregion
export { paintCloud as n, sceneSky as r, lutCss as t };
