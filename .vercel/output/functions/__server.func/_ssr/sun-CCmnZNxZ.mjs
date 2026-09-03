//#region node_modules/.nitro/vite/services/ssr/assets/sun-CCmnZNxZ.js
var DEG = Math.PI / 180;
var PUNE_LAT = 18.5204 * DEG;
function sunDirection(hour, dayOfYear, distance = 90) {
	const decl = 23.44 * DEG * Math.sin(2 * Math.PI * (dayOfYear - 81) / 365);
	const ha = (hour - 12) * 15 * DEG;
	const sinAlt = Math.sin(PUNE_LAT) * Math.sin(decl) + Math.cos(PUNE_LAT) * Math.cos(decl) * Math.cos(ha);
	const alt = Math.asin(Math.max(-1, Math.min(1, sinAlt)));
	const cosAzDenom = Math.cos(alt) || 1e-6;
	const cosAz = (Math.sin(decl) * Math.cos(PUNE_LAT) - Math.cos(decl) * Math.sin(PUNE_LAT) * Math.cos(ha)) / cosAzDenom;
	const az = Math.atan2(-Math.cos(decl) * Math.sin(ha), Math.max(-1, Math.min(1, cosAz)));
	return [
		Math.sin(az) * Math.cos(alt) * distance,
		Math.sin(alt) * distance,
		-Math.cos(az) * Math.cos(alt) * distance
	];
}
function isNeighborLit(opts) {
	const { hour, dayOfYear, buildingH, gapM } = opts;
	const [x, y, z] = sunDirection(hour, dayOfYear, 1);
	const alt = Math.atan2(y, Math.hypot(x, z));
	const altDeg = alt * 180 / Math.PI;
	if (alt < .14) return {
		lit: false,
		altDeg,
		shadowM: 999
	};
	if (!(z > .05)) return {
		lit: true,
		altDeg,
		shadowM: 0
	};
	const shadowM = buildingH / Math.tan(alt);
	return {
		lit: shadowM < gapM + 6,
		altDeg,
		shadowM
	};
}
function sunlightHoursOnNorthNeighbor(opts) {
	let hours = 0;
	for (let h = 6.5; h <= 17.5; h += .25) if (isNeighborLit({
		hour: h,
		dayOfYear: opts.dayOfYear,
		buildingH: opts.buildingH,
		gapM: opts.gapM
	}).lit) hours += .25;
	return Math.round(hours * 10) / 10;
}
function hourlyIllumination(opts) {
	const rows = [];
	for (let h = 6; h <= 18; h += 1) {
		const sample = isNeighborLit({
			hour: h,
			dayOfYear: opts.dayOfYear,
			buildingH: opts.buildingH,
			gapM: opts.gapM
		});
		rows.push({
			hour: h,
			...sample
		});
	}
	return rows;
}
var SOLAR_PRESETS = [
	{
		id: "winter",
		label: "Winter solstice",
		day: 355,
		dateLabel: "21 Dec"
	},
	{
		id: "equinox",
		label: "Equinox",
		day: 80,
		dateLabel: "21 Mar"
	},
	{
		id: "summer",
		label: "Summer solstice",
		day: 172,
		dateLabel: "21 Jun"
	}
];
//#endregion
export { sunlightHoursOnNorthNeighbor as i, hourlyIllumination as n, sunDirection as r, SOLAR_PRESETS as t };
