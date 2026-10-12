import type { LatLng } from "./types";

export const uid = (p = "id") => `${p}-${Math.random().toString(36).slice(2, 9)}`;

export function km(a: LatLng, b: LatLng) {
  const R = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLng = ((b[1] - a[1]) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a[0] * Math.PI) / 180) * Math.cos((b[0] * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

/** Metro Manila city traffic: ~18 km/h effective, road factor 1.35 */
export const travelMins = (a: LatLng, b: LatLng) => Math.max(3, Math.round(((km(a, b) * 1.35) / 18) * 60));

export const fmtTime = (min: number) => {
  if (!min && min !== 0) return "—";
  const hh = Math.floor(min / 60) % 24;
  const mm = Math.round(min % 60);
  const ampm = hh >= 12 ? "pm" : "am";
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}:${mm.toString().padStart(2, "0")}${ampm}`;
};

export const fmtWindow = (w: { start: number; end: number }) => `${fmtTime(w.start)}–${fmtTime(w.end)}`;

export const peso = (v: number) => `₱${v.toLocaleString("en-PH")}`;

export function moveToward(from: LatLng, to: LatLng, kmStep: number): LatLng {
  const d = km(from, to);
  if (d <= kmStep || d === 0) return to;
  const f = kmStep / d;
  return [from[0] + (to[0] - from[0]) * f, from[1] + (to[1] - from[1]) * f];
}

export const pct = (x: number) => `${Math.round(x * 100)}%`;
