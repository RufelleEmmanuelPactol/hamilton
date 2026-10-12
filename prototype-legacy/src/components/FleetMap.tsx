"use client";
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from "react-leaflet";
import L from "leaflet";
import { useMemo } from "react";
import { useStore } from "@/lib/store";
import { BUSINESS } from "@/lib/seed";
import { routeOf } from "@/lib/agents";
import type { LatLng } from "@/lib/types";

const driverIcon = (initials: string, color: string, status: string) =>
  L.divIcon({
    className: "",
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    html: `<div style="position:relative;width:34px;height:34px">
      ${status === "on_route" ? `<span class="pulse-ring" style="position:absolute;inset:0;border-radius:999px;background:${color};opacity:.35"></span>` : ""}
      <div style="position:absolute;inset:3px;border-radius:999px;background:${color};border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;color:#fff;font:600 11px system-ui">${initials}</div>
      ${status === "incident" ? `<div style="position:absolute;right:-4px;top:-4px;width:14px;height:14px;border-radius:999px;background:#e11d48;border:2px solid #fff;color:#fff;font:700 9px system-ui;display:flex;align-items:center;justify-content:center">!</div>` : ""}
      ${status === "break" ? `<div style="position:absolute;right:-4px;top:-4px;width:14px;height:14px;border-radius:999px;background:#f59e0b;border:2px solid #fff"></div>` : ""}
    </div>`,
  });

const stopIcon = (label: string, color: string, state: "todo" | "done" | "failed" | "hold" | "pending") =>
  L.divIcon({
    className: "",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    html: `<div style="width:22px;height:22px;border-radius:7px;display:flex;align-items:center;justify-content:center;font:600 10px system-ui;
      ${
        state === "done"
          ? `background:#ecfdf5;color:#047857;border:1.5px solid #10b981`
          : state === "failed"
          ? `background:#fff1f2;color:#be123c;border:1.5px solid #f43f5e`
          : state === "hold"
          ? `background:#fffbeb;color:#b45309;border:1.5px dashed #f59e0b`
          : state === "pending"
          ? `background:#fff;color:#64748b;border:1.5px dashed #94a3b8`
          : `background:#fff;color:${color};border:1.5px solid ${color}`
      };box-shadow:0 1px 3px rgba(0,0,0,.15)">${label}</div>`,
  });

const depotIcon = L.divIcon({
  className: "",
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  html: `<div style="width:28px;height:28px;border-radius:8px;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:center;font:700 13px system-ui;box-shadow:0 2px 6px rgba(0,0,0,.3)">✿</div>`,
});

export default function FleetMap({ height = 420, focusDriverId }: { height?: number | string; focusDriverId?: string }) {
  const drivers = useStore((s) => s.drivers);
  const orders = useStore((s) => s.orders);
  const now = useStore((s) => s.now);
  const world = useMemo(() => ({ now, drivers, orders, places: [] }), [now, drivers, orders]);

  const visibleDrivers = focusDriverId ? drivers.filter((d) => d.id === focusDriverId) : drivers;

  return (
    <div style={{ height }} className="overflow-hidden rounded-xl">
      <MapContainer center={[14.592, 121.047]} zoom={12.5} zoomSnap={0.25} scrollWheelZoom style={{ height: "100%", width: "100%" }} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={BUSINESS.depot} icon={depotIcon}>
          <Tooltip direction="top" offset={[0, -12]}>{BUSINESS.depotLabel}</Tooltip>
        </Marker>

        {visibleDrivers.map((d) => {
          const route = routeOf(world, d.id);
          const line: LatLng[] = [d.position, ...route.filter((o) => o.position).map((o) => o.position!)];
          return line.length > 1 ? (
            <Polyline key={`l-${d.id}`} positions={line} pathOptions={{ color: d.color, weight: 3, opacity: 0.55, dashArray: d.status === "incident" ? "4 6" : undefined }} />
          ) : null;
        })}

        {orders
          .filter((o) => o.position && (!focusDriverId || o.driverId === focusDriverId))
          .filter((o) => !["inbox", "review", "tomorrow"].includes(o.status))
          .map((o) => {
            const d = drivers.find((x) => x.id === o.driverId);
            const route = d ? routeOf(world, d.id) : [];
            const idx = route.findIndex((r) => r.id === o.id);
            const state =
              o.status === "delivered" ? "done" : o.status === "failed" ? "failed" : o.status === "on_hold" ? "hold" : o.status === "unassigned" ? "pending" : "todo";
            const label = state === "done" ? "✓" : state === "failed" ? "✕" : idx >= 0 ? String(idx + 1) : "•";
            return (
              <Marker key={o.id} position={o.position!} icon={stopIcon(label, d?.color ?? "#64748b", state)}>
                <Tooltip direction="top" offset={[0, -10]}>
                  <div className="text-xs">
                    <b>{o.code}</b> {o.customerName}
                    <br />
                    {o.items}
                  </div>
                </Tooltip>
              </Marker>
            );
          })}

        {visibleDrivers.map((d) => (
          <Marker key={d.id} position={d.position} icon={driverIcon(d.initials, d.color, d.status)} zIndexOffset={1000}>
            <Tooltip direction="top" offset={[0, -16]}>
              {d.name} · {d.status.replace("_", " ")}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
