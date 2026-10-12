"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Hydrated } from "./ScenarioRuntime";
import { useState } from "react";
import { useScenarioFacts, scenarioEvents } from "@/lib/scenario";
import { openPalette, openPerson, openSoon, showToast } from "./Overlays";
import { PEOPLE } from "@/lib/people";

const groupLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "var(--mute)",
  padding: "16px 10px 6px",
};
const I = (p: { children: React.ReactNode }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    {p.children}
  </svg>
);

type Item = { href: string; label: string; icon: React.ReactNode; count?: number; badge?: number; exact?: boolean };

function NavItem({ item, active }: { item: Item; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        height: "32px",
        padding: "0 10px",
        borderRadius: "6px",
        textDecoration: "none",
        background: active ? "var(--brandTint)" : undefined,
        color: active ? "var(--brandInk)" : "var(--ink2)",
        fontWeight: active ? 600 : undefined,
      }}
    >
      {item.icon}
      <span style={{ flex: 1, whiteSpace: "nowrap" }}>{item.label}</span>
      {item.count !== undefined && <span style={{ fontSize: "11px", color: "var(--mute)" }}>{item.count}</span>}
      {item.badge ? (
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "#fff",
            background: "var(--brandInk)",
            borderRadius: "99px",
            padding: "0 6px",
          }}
        >
          {item.badge}
        </span>
      ) : null}
    </Link>
  );
}

export function Logo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#E91E63" />
      <path d="M8 23 L11 9 L21 8 L24 18 L14 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="8" cy="23" r="2.4" fill="#fff" />
      <circle cx="14" cy="24" r="2.4" fill="#fff" />
    </svg>
  );
}

function Nav() {
  const path = usePathname().replace(/\/$/, "") || "/";
  const f = useScenarioFacts();
  const groups: { label: string; items: Item[] }[] = [
    {
      label: "Operations",
      items: [
        {
          href: "/app",
          label: "Overview",
          exact: true,
          icon: (
            <I>
              <rect x="3" y="3" width="7" height="9" rx="1" />
              <rect x="14" y="3" width="7" height="5" rx="1" />
              <rect x="14" y="12" width="7" height="9" rx="1" />
              <rect x="3" y="16" width="7" height="5" rx="1" />
            </I>
          ),
        },
        {
          href: "/app/dispatch",
          label: "Dispatch",
          icon: (
            <I>
              <circle cx="6" cy="19" r="2.5" />
              <circle cx="18" cy="5" r="2.5" />
              <path d="M8.5 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5" />
            </I>
          ),
        },
        {
          href: "/app/orders",
          label: "Orders",
          count: f.totalOrders,
          icon: (
            <I>
              <path d="M3 13h5l2 3h4l2-3h5" />
              <path d="M5 5h14l2 8v6H3v-6z" />
            </I>
          ),
        },
        {
          href: "/app/approvals",
          label: "Approvals",
          badge: f.approvalsCount,
          icon: (
            <I>
              <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" />
              <path d="M9 12l2 2 4-4" />
            </I>
          ),
        },
        {
          href: "/app/messages",
          label: "Customer messages",
          icon: (
            <I>
              <path d="M4 5h16v11H9l-5 4z" />
            </I>
          ),
        },
      ],
    },
    {
      label: "Memory",
      items: [
        {
          href: "/app/drivers",
          label: "Drivers",
          icon: (
            <I>
              <circle cx="9" cy="8" r="3.5" />
              <path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5" />
              <path d="M16 4.5a3.5 3.5 0 0 1 0 7" />
              <path d="M18 14.5c2 .6 3.2 2.6 3.5 5.5" />
            </I>
          ),
        },
        {
          href: "/app/addresses",
          label: "Address book",
          icon: (
            <I>
              <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" />
              <path d="M5 17a3 3 0 0 1 3-3h11" />
            </I>
          ),
        },
      ],
    },
    {
      label: "Governance",
      items: [
        {
          href: "/app/autonomy",
          label: "Autonomy policies",
          icon: (
            <I>
              <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
              <circle cx="16" cy="7" r="2" />
              <circle cx="10" cy="17" r="2" />
            </I>
          ),
        },
        {
          href: "/app/audit",
          label: "Audit log",
          icon: (
            <I>
              <path d="M3 12a9 9 0 1 0 3-6.7" />
              <path d="M3 4v4h4" />
              <path d="M12 8v4l3 2" />
            </I>
          ),
        },
      ],
    },
    {
      label: "Field apps",
      items: [
        {
          href: "/driver",
          label: "Driver app",
          icon: (
            <I>
              <rect x="7" y="2.5" width="10" height="19" rx="2" />
              <path d="M11 18.5h2" />
            </I>
          ),
        },
        {
          href: "/customer",
          label: "Customer view",
          icon: (
            <I>
              <path d="M20 12a8 8 0 0 1-11.8 7L4 20l1-4.1A8 8 0 1 1 20 12z" />
            </I>
          ),
        },
      ],
    },
  ];
  return (
    <nav
      aria-label="Main"
      style={{
        flex: "1 1 220px",
        maxWidth: "236px",
        boxSizing: "border-box",
        background: "var(--panel)",
        borderRight: "1px solid var(--line)",
        padding: "12px 10px",
        display: "flex",
        flexDirection: "column",
        gap: "1px",
      }}
    >
      {groups.map((g, gi) => (
        <div key={g.label} style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          <div style={{ ...groupLabel, padding: gi === 0 ? "6px 10px" : groupLabel.padding }}>{g.label}</div>
          {g.items.map((it) => (
            <NavItem key={it.href} item={it} active={it.exact ? path === it.href : path === it.href || path.startsWith(it.href + "/")} />
          ))}
        </div>
      ))}
      <div
        style={{ marginTop: "auto", borderTop: "1px solid var(--line)", padding: "12px 10px 4px", fontSize: "12px", color: "var(--mute)" }}
      >
        <div>4 drivers · 13 orders today</div>
        <div>Plan published 7:52</div>
      </div>
    </nav>
  );
}

const menuBox: React.CSSProperties = {
  position: "absolute",
  top: "38px",
  right: 0,
  zIndex: 40,
  width: "300px",
  background: "var(--panel)",
  border: "1px solid var(--line)",
  borderRadius: "10px",
  padding: "6px",
};
const menuItem: React.CSSProperties = {
  font: "inherit",
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  height: "34px",
  padding: "0 10px",
  border: 0,
  borderRadius: "6px",
  background: "transparent",
  color: "var(--ink)",
  cursor: "pointer",
  textAlign: "left",
  textDecoration: "none",
};
function Away({ onClose }: { onClose: () => void }) {
  return <div aria-hidden="true" onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 39 }} />;
}

/** Notifications: open tickets and the latest agent events from the scenario. */
function Bell() {
  const f = useScenarioFacts();
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(0);
  const events = scenarioEvents(f.phase, f.notifyCustomers).slice(0, 4);
  const items: { title: string; sub: string; href: string; tone: string }[] = [
    ...(f.ticketOpen ? [{ title: "HAM-417 needs you", sub: "Reassign 3 stops from Jun · 2 deliveries at risk", href: "/app/approvals?t=HAM-417", tone: "var(--warn)" }] : []),
    ...events.map((e) => ({ title: e.event, sub: `${e.time} · ${e.agent}`, href: "/app/audit", tone: "var(--brand)" })),
    { title: "HAM-416 waiting on you", sub: "Café Morato refund request · #1045", href: "/app/approvals?t=HAM-416", tone: "var(--err)" },
    { title: "HAM-414 waiting on you", sub: "WhatsApp order from Rina Bautista · building unclear", href: "/app/approvals?t=HAM-414", tone: "var(--warn)" },
  ];
  const unread = Math.max(items.length - seen, 0);
  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        aria-label={`Notifications${unread ? ` (${unread} new)` : ""}`}
        aria-expanded={open}
        onClick={() => {
          setOpen((o) => !o);
          setSeen(items.length);
        }}
        style={{
          font: "inherit",
          width: "32px",
          height: "32px",
          border: 0,
          borderRadius: "6px",
          background: open ? "var(--sub)" : "transparent",
          color: "var(--ink2)",
          cursor: "pointer",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0" />
        </svg>
        {unread > 0 && (
          <span
            style={{
              position: "absolute",
              top: "3px",
              right: "3px",
              minWidth: "15px",
              height: "15px",
              padding: "0 4px",
              borderRadius: "99px",
              background: "var(--brand)",
              color: "#fff",
              fontSize: "10px",
              fontWeight: 700,
              lineHeight: "15px",
            }}
          >
            {unread}
          </span>
        )}
      </button>
      {open && (
        <>
          <Away onClose={() => setOpen(false)} />
          <div role="menu" className="ham-in" style={{ ...menuBox, width: "340px" }}>
            <div style={{ display: "flex", alignItems: "center", padding: "6px 10px 8px" }}>
              <b style={{ flex: 1 }}>Notifications</b>
              <button
                type="button"
                onClick={() => (setOpen(false), showToast("All notifications marked as read"))}
                style={{ font: "inherit", fontSize: "12px", border: 0, background: "none", color: "var(--brandInk)", cursor: "pointer" }}
              >
                Mark all read
              </button>
            </div>
            {items.map((n, i) => (
              <Link key={i} href={n.href} role="menuitem" onClick={() => setOpen(false)} style={{ ...menuItem, height: "auto", padding: "8px 10px", alignItems: "flex-start" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "99px", background: n.tone, marginTop: "5px", flex: "none" }} />
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontWeight: 500 }}>{n.title}</span>
                  <span style={{ display: "block", fontSize: "12px", color: "var(--mute)" }}>{n.sub}</span>
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/** Maria's avatar: account menu. */
function AccountMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const maria = PEOPLE.find((p) => p.key === "maria")!;
  const item = (label: string, run: () => void, hint?: string) => (
    <button type="button" role="menuitem" style={menuItem} className="ham-menuitem" onClick={() => (setOpen(false), run())}>
      <span style={{ flex: 1 }}>{label}</span>
      {hint && <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--mute)" }}>{hint}</span>}
    </button>
  );
  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        aria-label="Account: Maria Santos"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          font: "inherit",
          width: "30px",
          height: "30px",
          flex: "none",
          border: 0,
          borderRadius: "99px",
          background: "#344054",
          color: "#fff",
          fontSize: "11px",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: open ? "0 0 0 2px var(--panel), 0 0 0 4px var(--brand)" : undefined,
        }}
      >
        MS
      </button>
      {open && (
        <>
          <Away onClose={() => setOpen(false)} />
          <div role="menu" className="ham-in" style={menuBox}>
            <div style={{ padding: "8px 10px 10px", borderBottom: "1px solid var(--line)", marginBottom: "4px" }}>
              <div style={{ fontWeight: 600 }}>Maria Santos</div>
              <div style={{ fontSize: "12px", color: "var(--mute)" }}>Owner · Maria’s Flowers &amp; Gifts</div>
            </div>
            {item("Your profile", () => openPerson(maria))}
            {item("Search", openPalette, "⌘K")}
            {item("Autonomy policies", () => router.push("/app/autonomy"))}
            {item("Team and drivers", () => router.push("/app/drivers"))}
            {item("Billing", () => openSoon("Billing"))}
            {item("Settings", () => openSoon("Settings"))}
            <div style={{ borderTop: "1px solid var(--line)", margin: "4px 0" }} />
            {item("Sign out", () => openSoon("Sign out"))}
          </div>
        </>
      )}
    </div>
  );
}

export function Header({ crumbs }: { crumbs: string[] }) {
  return (
    <header
      style={{
        height: "52px",
        flex: "none",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "0 16px",
        background: "var(--panel)",
        borderBottom: "1px solid var(--line)",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <Link
        href="/app"
        style={{ display: "flex", alignItems: "center", gap: "9px", width: "204px", color: "var(--ink)", textDecoration: "none" }}
      >
        <Logo />
        <span style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.01em" }}>Hamilton</span>
      </Link>
      <nav
        aria-label="Breadcrumb"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "var(--mute)",
          minWidth: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        <span>Maria&#39;s Flowers &amp; Gifts</span>
        {crumbs.map((c, i) => (
          <span key={i} style={{ display: "contents" }}>
            <span>/</span>
            <span style={i === crumbs.length - 1 ? { color: "var(--ink)", fontWeight: 500 } : undefined}>{c}</span>
          </span>
        ))}
      </nav>
      <div style={{ flex: 1 }} />
      <button
        type="button"
        className="ham-search"
        onClick={openPalette}
        aria-label="Search orders, drivers, addresses"
        style={{
          font: "inherit",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "280px",
          height: "32px",
          border: "1px solid var(--line2)",
          borderRadius: "6px",
          padding: "0 10px",
          color: "var(--mute)",
          background: "var(--panel)",
          cursor: "text",
          textAlign: "left",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" />
        </svg>
        <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Search orders, drivers, addresses</span>
        <span
          style={{ fontFamily: "var(--mono)", fontSize: "11px", border: "1px solid var(--line)", borderRadius: "4px", padding: "0 5px" }}
        >
          ⌘K
        </span>
      </button>
      <Hydrated>
        <Bell />
      </Hydrated>
      <AccountMenu />
    </header>
  );
}

/** Admin console frame: header + sidebar, with the page's own columns (main, optional aside) as children. */
export function Shell({ crumbs, children }: { crumbs: string[]; children: React.ReactNode }) {
  return (
    <div
      className="ham-app"
      style={{
        fontFamily: "var(--font)",
        background: "var(--bg)",
        color: "var(--ink)",
        minHeight: "100vh",
        fontSize: "13px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header crumbs={crumbs} />
      <div style={{ flex: 1, display: "flex", flexWrap: "wrap", minHeight: 0 }}>
        <Hydrated>
          <Nav />
          {children}
        </Hydrated>
      </div>
    </div>
  );
}
