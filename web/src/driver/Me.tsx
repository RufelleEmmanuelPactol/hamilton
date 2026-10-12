"use client";
// Me tab (/app/me): the driver's profile, today's numbers, settings and account switching.
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useScenario } from "@/lib/store";
import { showToast } from "@/components/Overlays";
import { DRIVERS, useDriverStops, type Account } from "./data";
import { Chevron, ScreenHeader, scroll } from "./ui";

export default function Me() {
  const { driver, done, owned, todo } = useDriverStops();
  const setAccount = useScenario((s) => s.setDriverAccount);
  const router = useRouter();
  const [onShift, setOnShift] = useState(true);
  const [switching, setSwitching] = useState(false);
  const other: Account = driver.id === "jun" ? "ana" : "jun";

  const stat = (label: string, value: string) => (
    <div style={{ flex: "1", padding: "12px", border: "1px solid var(--line)", borderRadius: "10px" }}>
      <div style={{ fontSize: "20px", fontWeight: 600 }}>{value}</div>
      <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "2px" }}>{label}</div>
    </div>
  );
  const row = (label: string, value: string, onClick?: () => void) => (
    <button
      key={label}
      onClick={onClick ?? (() => showToast(`${label} can't be changed in the prototype yet`))}
      className="drv-row"
      style={{ font: "inherit", width: "100%", border: "0", borderBottom: "1px solid var(--line)", background: "none", textAlign: "left", cursor: "pointer" }}
    >
      <span style={{ flex: "1" }}>{label}</span>
      <span style={{ color: "var(--mute)", fontSize: "13px" }}>{value}</span>
      <Chevron />
    </button>
  );

  return (
    <>
      <ScreenHeader title="Me" />
      <div style={scroll}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "18px" }}>
          <span style={{ width: "56px", height: "56px", borderRadius: "99px", background: driver.color, color: "#fff", fontWeight: 600, fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
            {driver.initials}
          </span>
          <div style={{ flex: "1", minWidth: "0" }}>
            <div style={{ fontSize: "18px", fontWeight: 600 }}>{driver.name}</div>
            <div style={{ fontSize: "13px", color: "var(--mute)" }}>
              {driver.vehicle} · {driver.plate}
            </div>
            <div style={{ fontSize: "13px", color: "var(--mute)" }}>Maria&#39;s Flowers &amp; Gifts</div>
          </div>
        </div>

        <div style={{ margin: "0 16px 14px", padding: "12px 14px", borderRadius: "10px", border: `1px solid var(--${onShift ? "okLine" : "line2"})`, background: `var(--${onShift ? "okBg" : "sub"})`, display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "99px", background: onShift ? "#12B76A" : "var(--mute)" }} />
          <span style={{ flex: "1" }}>
            <span style={{ display: "block", fontWeight: 600 }}>{onShift ? "On shift since 08:00" : "Off shift"}</span>
            <span style={{ display: "block", fontSize: "12px", color: "var(--ink2)" }}>
              {onShift ? "Dispatch can send you stops and messages." : "You won't get new stops until you start again."}
            </span>
          </span>
          <button
            onClick={() => setOnShift((v) => !v)}
            disabled={onShift && todo.length > 0}
            title={onShift && todo.length > 0 ? "Finish or hand over your stops first" : undefined}
            style={{ font: "inherit", fontSize: "13px", fontWeight: 600, height: "34px", padding: "0 12px", borderRadius: "8px", border: "1px solid var(--line2)", background: "var(--panel)", color: "var(--ink2)", cursor: onShift && todo.length > 0 ? "not-allowed" : "pointer", opacity: onShift && todo.length > 0 ? 0.5 : 1 }}
          >
            {onShift ? "End shift" : "Start shift"}
          </button>
        </div>

        <div style={{ display: "flex", gap: "8px", padding: "0 16px 16px" }}>
          {stat("Delivered today", `${done.length}/${owned.length}`)}
          {stat("Success (30d)", driver.id === "jun" ? "97%" : "95%")}
          {stat("Proof retakes", driver.id === "jun" ? "1" : "0")}
        </div>

        <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--mute)", padding: "8px 18px" }}>Settings</div>
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {row("Navigation app", "Google Maps")}
          {row("Language", "English")}
          {row("Notifications", "On")}
          {row("Phone", driver.phone)}
        </div>

        <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--mute)", padding: "18px 18px 8px" }}>Account</div>
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {row("Switch account", DRIVERS[other].name, () => setSwitching((v) => !v))}
          {switching && (
            <div className="ham-in" style={{ padding: "8px 16px 12px", borderBottom: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: "8px" }}>
              {(Object.keys(DRIVERS) as Account[]).map((id) => {
                const d = DRIVERS[id];
                const current = id === driver.id;
                return (
                  <button
                    key={id}
                    disabled={current}
                    onClick={() => {
                      setAccount(id);
                      router.push("/app/");
                    }}
                    style={{ font: "inherit", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "10px", border: current ? "2px solid var(--brandInk)" : "1px solid var(--line2)", background: current ? "var(--brandTint)" : "var(--panel)", cursor: current ? "default" : "pointer", textAlign: "left" }}
                  >
                    <span style={{ width: "28px", height: "28px", borderRadius: "99px", background: d.color, color: "#fff", fontSize: "11px", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>{d.initials}</span>
                    <span style={{ flex: "1" }}>
                      <span style={{ display: "block", fontWeight: 600 }}>{d.name}</span>
                      <span style={{ display: "block", fontSize: "12px", color: "var(--mute)" }}>{d.vehicle}</span>
                    </span>
                    {current && <span style={{ fontSize: "12px", color: "var(--brandInk)", fontWeight: 600 }}>Signed in</span>}
                  </button>
                );
              })}
            </div>
          )}
          {row("Help and support", "Call Maria", () => (window.location.href = "tel:+639175550100"))}
          <a href="/" className="drv-row" style={{ color: "var(--err)" }}>
            Sign out
          </a>
        </div>
        <div style={{ textAlign: "center", fontSize: "11px", color: "var(--mute)", padding: "18px" }}>Hamilton Driver · v0.4</div>
      </div>
    </>
  );
}
