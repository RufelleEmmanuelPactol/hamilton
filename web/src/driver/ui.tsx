"use client";
// Shared chrome for the driver app (/app): the device frame, the tab bar, screen headers and a few styles.
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Hydrated } from "@/components/ScenarioRuntime";
import { useScenario } from "@/lib/store";

/** Phone-sized on desktop, full-bleed on a phone. `tabs` adds the bottom tab bar. */
export function AppFrame({ children, tabs = false }: { children: React.ReactNode; tabs?: boolean }) {
  return (
    <div className="drv-page">
      <style>{`
        .drv-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px 16px;background:#E4E7EC}
        .drv-device{font-size:14px;color:var(--ink);width:390px;height:844px;border-radius:32px;overflow:hidden;background:var(--panel);box-shadow:0 0 0 1px var(--line2),0 24px 48px rgba(16,24,40,.18);display:flex;flex-direction:column;position:relative}
        .drv-screen{flex:1;min-height:0;position:relative;display:flex;flex-direction:column}
        .drv-row{display:flex;align-items:center;gap:12px;padding:12px 16px;text-decoration:none;color:inherit;border-bottom:1px solid var(--line)}
        .drv-row:hover{background:var(--sub)}
        @media (max-width:480px){.drv-page{padding:0;background:var(--panel)}.drv-device{width:100%;height:100dvh;min-height:600px;border-radius:0;box-shadow:none}}
      `}</style>
      <div className="drv-device ham-app">
        <Hydrated>
          <AccountParam />
          <div className="drv-screen">{children}</div>
          {tabs && <TabBar />}
        </Hydrated>
      </div>
    </div>
  );
}

/** ?d=ana or ?d=jun signs the app in as that driver (old links and the landing page use it). */
function AccountParam() {
  const set = useScenario((s) => s.setDriverAccount);
  useEffect(() => {
    const d = new URLSearchParams(location.search).get("d");
    if (d === "ana" || d === "jun") set(d);
  }, [set]);
  return null;
}

const TABS = [
  { href: "/app/", label: "Today", match: (p: string) => p === "/app" || p === "/app/", icon: <path d="M3 11l18-8-8 18-2-8z" /> },
  {
    href: "/app/stops/",
    label: "Stops",
    match: (p: string) => p.startsWith("/app/stops"),
    icon: (
      <>
        <path d="M9 6h11M9 12h11M9 18h11" />
        <circle cx="4.5" cy="6" r="1.2" />
        <circle cx="4.5" cy="12" r="1.2" />
        <circle cx="4.5" cy="18" r="1.2" />
      </>
    ),
  },
  { href: "/app/inbox/", label: "Inbox", match: (p: string) => p.startsWith("/app/inbox"), icon: <path d="M4 5h16v11H9l-5 4z" /> },
  {
    href: "/app/me/",
    label: "Me",
    match: (p: string) => p.startsWith("/app/me"),
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1.2-4 4.3-6 8-6s6.8 2 8 6" />
      </>
    ),
  },
];

function TabBar() {
  const path = usePathname() ?? "";
  const unread = useScenario((s) => s.phase !== "before" && s.driverAccount === "jun") ? 1 : 0;
  return (
    <nav
      aria-label="Driver app"
      style={{
        flex: "none",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        borderTop: "1px solid var(--line)",
        background: "var(--panel)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {TABS.map((t) => {
        const on = t.match(path);
        return (
          <a
            key={t.href}
            href={t.href}
            aria-current={on ? "page" : undefined}
            style={{
              height: "60px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              fontSize: "11px",
              fontWeight: on ? 600 : 500,
              color: on ? "var(--brandInk)" : "var(--mute)",
              textDecoration: "none",
              position: "relative",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={on ? 2.2 : 1.8} aria-hidden="true">
              {t.icon}
            </svg>
            {t.label}
            {t.label === "Inbox" && unread > 0 && (
              <span
                aria-label={`${unread} unread`}
                style={{
                  position: "absolute",
                  top: "8px",
                  left: "calc(50% + 6px)",
                  minWidth: "16px",
                  height: "16px",
                  borderRadius: "99px",
                  background: "var(--brand)",
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {unread}
              </span>
            )}
          </a>
        );
      })}
    </nav>
  );
}

/** Title bar for a screen. Pass `back` for pushed screens; tab roots have none. */
export function ScreenHeader({
  title,
  sub,
  back,
  onBack,
  right,
}: {
  title: React.ReactNode;
  sub?: React.ReactNode;
  back?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}) {
  const chevron = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
  const btn: React.CSSProperties = {
    width: "44px",
    height: "44px",
    flex: "none",
    border: "0",
    background: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--ink2)",
    cursor: "pointer",
  };
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        minHeight: "56px",
        flex: "none",
        padding: back || onBack ? "0 12px 0 4px" : "0 12px 0 18px",
        borderBottom: "1px solid var(--line)",
        background: "var(--panel)",
      }}
    >
      {onBack ? (
        <button aria-label="Back" onClick={onBack} style={btn}>
          {chevron}
        </button>
      ) : back ? (
        <a href={back} aria-label="Back" style={btn}>
          {chevron}
        </a>
      ) : null}
      <div style={{ flex: "1", minWidth: "0" }}>
        <div style={{ fontWeight: 600, fontSize: back || onBack ? "16px" : "20px" }}>{title}</div>
        {sub && <div style={{ fontSize: "12px", color: "var(--mute)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sub}</div>}
      </div>
      {right}
    </header>
  );
}

export const primaryBtn: React.CSSProperties = {
  font: "inherit",
  width: "100%",
  height: "52px",
  border: "0",
  borderRadius: "10px",
  background: "var(--brandInk)",
  color: "#fff",
  fontSize: "16px",
  fontWeight: 600,
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  cursor: "pointer",
};
export const secondaryBtn: React.CSSProperties = {
  font: "inherit",
  width: "100%",
  height: "44px",
  border: "1px solid var(--line2)",
  borderRadius: "10px",
  background: "var(--panel)",
  color: "var(--ink2)",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  cursor: "pointer",
};
export const mono: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace", whiteSpace: "nowrap" };
export const footer: React.CSSProperties = {
  padding: "10px 16px 14px",
  borderTop: "1px solid var(--line)",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  flex: "none",
  background: "var(--panel)",
};
export const scroll: React.CSSProperties = { flex: "1", minHeight: "0", overflowY: "auto" };

/** "#1042" → "/app/stop/?o=1042" */
export const stopHref = (order: string) => `/app/stop/?o=${order.replace("#", "")}`;
export const deliverHref = (order: string) => `/app/deliver/?o=${order.replace("#", "")}`;

export function Sparkle({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#E91E63" strokeWidth="2.2" aria-hidden="true">
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
    </svg>
  );
}

export function Chevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--mute)" strokeWidth="2" aria-hidden="true" style={{ flex: "none" }}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

/** A small round marker: the stop number, a check when delivered, an arrow when moved. */
export function StopBadge({ n, status, late }: { n: number; status: "done" | "todo" | "moved"; late?: boolean }) {
  const base: React.CSSProperties = {
    width: "28px",
    height: "28px",
    flex: "none",
    borderRadius: "99px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: 600,
  };
  if (status === "done")
    return (
      <span style={{ ...base, background: "var(--okBg)", color: "var(--ok)", border: "1px solid var(--okLine)" }} aria-label="Delivered">
        ✓
      </span>
    );
  if (status === "moved")
    return (
      <span style={{ ...base, background: "var(--sub)", color: "var(--mute)", border: "1px solid var(--line2)" }} aria-label="Moved">
        →
      </span>
    );
  return (
    <span
      style={{
        ...base,
        background: late ? "var(--errBg)" : "var(--brandTint)",
        color: late ? "var(--err)" : "var(--brandInk)",
        border: `1px solid ${late ? "var(--errLine)" : "#F8BBD0"}`,
      }}
    >
      {n}
    </span>
  );
}
