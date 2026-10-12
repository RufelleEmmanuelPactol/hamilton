"use client";
// Converted from design/project/Plan.dc.html, then wired to the scenario store.
import { Fragment, useState, type CSSProperties, type ReactNode } from "react";
import { useScenarioFacts } from "@/lib/scenario";
import { check, HAM_417 } from "@/lib/policy";

type Tone = "ok" | "warn" | "err" | "info" | "neutral";
type DriverKey = "j" | "c" | "a" | "r";
type Phase = ReturnType<typeof useScenarioFacts>["phase"];

const MONO = "'IBM Plex Mono', monospace";
const HUB: [number, number] = [260, 368];
const DRIVERS: Record<DriverKey, { name: string; full: string; initials: string; color: string; vehicle: string }> = {
  j: { name: "Jun", full: "Jun Reyes", initials: "JR", color: "#2E90FA", vehicle: "L300 van" },
  c: { name: "Carlo", full: "Carlo Mendoza", initials: "CM", color: "#7A5AF8", vehicle: "Motorcycle" },
  a: { name: "Ana", full: "Ana Villanueva", initials: "AV", color: "#E91E63", vehicle: "Sedan" },
  r: { name: "Rico", full: "Rico Santos", initials: "RS", color: "#F79009", vehicle: "Motorcycle · new" },
};
const ORDER: DriverKey[] = ["j", "c", "a", "r"];

/* ---------- small building blocks (same inline styles as the canvas) ---------- */

function Tag({ tone, children, href }: { tone: Tone; children: ReactNode; href?: string }) {
  const c =
    tone === "neutral"
      ? { color: "var(--ink2)", background: "#F2F4F7", border: "1px solid var(--line2)" }
      : { color: `var(--${tone})`, background: `var(--${tone}Bg)`, border: `1px solid var(--${tone}Line)` };
  const tag = (
    <span style={{ fontSize: "11px", fontWeight: "500", borderRadius: "4px", padding: "0 6px", whiteSpace: "nowrap", ...c }}>
      {children}
    </span>
  );
  return href ? (
    <a href={href} style={{ textDecoration: "none" }}>
      {tag}
    </a>
  ) : (
    tag
  );
}

function Sparkle({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#E91E63" strokeWidth="2" aria-hidden="true">
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
    </svg>
  );
}

function Dots() {
  return (
    <span aria-hidden="true" style={{ display: "inline-flex", gap: "3px", marginLeft: "4px" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: "4px",
            height: "4px",
            borderRadius: "99px",
            background: "var(--brandInk)",
            animation: `hamDots 1.2s ${i * 0.2}s infinite ease-in-out`,
          }}
        />
      ))}
    </span>
  );
}

function Avatar({ d }: { d: DriverKey }) {
  return (
    <span
      style={{
        width: "22px",
        height: "22px",
        borderRadius: "99px",
        background: DRIVERS[d].color,
        color: "#fff",
        fontSize: "9px",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "none",
      }}
    >
      {DRIVERS[d].initials}
    </span>
  );
}

const btnSecondary: CSSProperties = {
  font: "inherit",
  height: "34px",
  padding: "0 12px",
  border: "1px solid var(--line2)",
  borderRadius: "6px",
  background: "var(--panel)",
  color: "var(--ink2)",
  cursor: "pointer",
};
const btnPrimary: CSSProperties = {
  font: "inherit",
  height: "34px",
  padding: "0 14px",
  border: "0",
  borderRadius: "6px",
  background: "var(--brandInk)",
  color: "#fff",
  fontWeight: "600",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
};
const td: CSSProperties = { padding: "9px 10px", borderBottom: "1px solid var(--line)" };
const th: CSSProperties = { padding: "8px 10px", fontWeight: "500", borderBottom: "1px solid var(--line)" };

function Metric({ label, value, sub, color, last }: { label: string; value: ReactNode; sub?: ReactNode; color?: string; last?: boolean }) {
  return (
    <div style={{ padding: "12px 16px", borderRight: last ? undefined : "1px solid var(--line)" }}>
      <div style={{ color: "var(--mute)", fontWeight: "500" }}>{label}</div>
      <div style={{ fontSize: "22px", fontWeight: "600", marginTop: "4px", color, whiteSpace: "nowrap" }}>
        {value} {sub !== undefined && <span style={{ fontSize: "13px", color: "var(--mute)", fontWeight: "400" }}>{sub}</span>}
      </div>
    </div>
  );
}

/* ---------- today's data, per phase ---------- */

interface Stop {
  order: string;
  recipient: string;
  area: string;
  window: string;
  status: { label: string; tone: Tone; href?: string };
  /** "09:24" for delivered, "ETA 11:05" for upcoming, null for "—". */
  time: string | null;
  done?: boolean;
  next?: boolean;
  note?: string;
  driver: DriverKey;
  /** Map position of the stop. */
  at: [number, number];
}

interface Group {
  d: DriverKey;
  tag: { label: string; tone: Tone };
  delivered: number;
  total: number;
  km: number;
  stops: Stop[];
  /** A dashed info row at the end of the group (open slot, moved stops). */
  footer?: { title: string; text: string; right: string };
}

const P = {
  "#1041": [215, 388],
  "#1047": [455, 282],
  "#1042": [482, 398],
  "#1050": [528, 410],
  "#1049": [305, 398],
  "#1045": [290, 96],
  "#1046": [352, 58],
  "#1051": [384, 112],
  "#1048": [408, 196],
  "#1043": [592, 302],
  "#1044": [636, 334],
  "#1039": [232, 346],
} as Record<string, [number, number]>;
/** Where Jun's van stopped: EDSA near Guadalupe. */
const FLAT: [number, number] = [438, 318];

function todayPlan(phase: Phase, ticketOpen: boolean, backOnRoad: boolean): Group[] {
  const delivered = (order: string, recipient: string, area: string, window: string, time: string, d: DriverKey, note?: string): Stop => ({
    order,
    recipient,
    area,
    window,
    time,
    done: true,
    status: { label: "Delivered", tone: "ok" },
    driver: d,
    note,
    at: P[order],
  });
  const upcoming = (
    order: string,
    recipient: string,
    area: string,
    window: string,
    eta: string | null,
    d: DriverKey,
    next: boolean,
    note?: string,
  ): Stop => ({
    order,
    recipient,
    area,
    window,
    time: eta ? `ETA ${eta}` : null,
    next,
    status: next ? { label: "Next stop", tone: "info" } : { label: "Upcoming", tone: "neutral" },
    driver: d,
    note,
    at: P[order],
  });

  const moved = phase === "approved";
  const incidentTag = { label: "Incident · flat tire 10:31", tone: "err" as Tone };
  const junTag =
    phase === "before"
      ? { label: "En route", tone: "info" as Tone }
      : backOnRoad
        ? { label: "Back on the road", tone: "ok" as Tone }
        : incidentTag;

  // Jun's 3 remaining stops.
  const m1042 = "Can leave with the lobby concierge";
  let junRest: Stop[];
  if (phase === "before") {
    junRest = [
      upcoming("#1042", "Mark Tan", "BGC", "10:00–13:00", "10:50", "j", true, m1042),
      upcoming("#1050", "Nicole Ramos", "BGC", "11:00–15:00", "11:25", "j", false),
      upcoming("#1049", "Sam Ocampo", "Makati", "09:00–13:00", "12:10", "j", false),
    ];
  } else if (phase === "rejected") {
    const late = { label: "Late · 40–70 min", tone: "err" as Tone };
    junRest = [
      { ...upcoming("#1042", "Mark Tan", "BGC", "10:00–13:00", "13:40", "j", false, m1042), status: late },
      { ...upcoming("#1049", "Sam Ocampo", "Makati", "09:00–13:00", "13:55", "j", false), status: late },
      upcoming("#1050", "Nicole Ramos", "BGC", "11:00–15:00", "14:30", "j", false),
    ];
  } else if (phase === "incident") {
    const st = (to: string): Stop["status"] =>
      ticketOpen ? { label: `Moving to ${to} · HAM-417`, tone: "warn", href: "/app/approvals" } : { label: "Re-planning", tone: "neutral" };
    junRest = [
      { ...upcoming("#1042", "Mark Tan", "BGC", "10:00–13:00", null, "j", false, m1042), status: st("Ana") },
      { ...upcoming("#1050", "Nicole Ramos", "BGC", "11:00–15:00", null, "j", false), status: st("Ana") },
      { ...upcoming("#1049", "Sam Ocampo", "Makati", "09:00–13:00", null, "j", false), status: st("Rico") },
    ];
  } else {
    junRest = [];
  }

  const jun: Group = {
    d: "j",
    tag: junTag,
    delivered: 2,
    total: moved ? 2 : 5,
    km: moved ? 9 : 19,
    stops: [
      delivered("#1041", "Liza Santos", "Makati", "09:00–12:00", "09:24", "j"),
      delivered("#1047", "Shangri-La events", "Mandaluyong", "10:00–12:00", "10:08", "j", "Oversized, needs the van · loading bay B"),
      ...junRest,
    ],
    footer: moved
      ? { title: "3 stops moved to Ana and Rico", text: "#1042 and #1050 to Ana · #1049 to Rico", right: "HAM-417 approved at 10:44" }
      : undefined,
  };

  const carlo: Group = {
    d: "c",
    tag: { label: "En route", tone: "info" },
    delivered: 2,
    total: 4,
    km: 22,
    stops: [
      delivered("#1045", "Café Morato", "Quezon City", "08:30–11:00", "08:52", "c"),
      delivered("#1046", "Anna Garcia", "Quezon City", "10:00–16:00", "10:36", "c"),
      upcoming("#1051", "Prof. Diaz", "Quezon City", "11:00–15:00", "11:05", "c", true, "Call the recipient when you arrive"),
      upcoming("#1048", "Grace Lee", "San Juan", "13:00–18:00", "13:45", "c", false, "Same building as #1052, deliver both together"),
    ],
    footer: {
      title: "Open slot",
      text: "Held for same-day orders · Quezon City / San Juan · 14:00–16:00",
      right: "Released at 14:00 if unused",
    },
  };

  const anaOwn = [
    upcoming("#1043", "Raffles Corporate Ctr", "Pasig", "13:00–17:00", "13:10", "a", !moved, "Office closes 17:00, use lobby reception"),
    upcoming(
      "#1044",
      "Ben Cruz",
      "Pasig",
      "15:00–17:00",
      "15:10",
      "a",
      false,
      "2 failed attempts before · customer confirmed 15:00–17:00 today",
    ),
  ];
  const ana: Group = {
    d: "a",
    tag: { label: "En route", tone: "info" },
    delivered: 0,
    total: moved ? 4 : 2,
    km: moved ? 27 : 14,
    stops: moved
      ? [
          upcoming("#1042", "Mark Tan", "BGC", "10:00–13:00", "12:15", "a", true, "From Jun · can leave with the lobby concierge"),
          upcoming("#1050", "Nicole Ramos", "BGC", "11:00–15:00", "12:40", "a", false, "From Jun"),
          ...anaOwn,
        ]
      : anaOwn,
  };

  const rico: Group = {
    d: "r",
    tag: moved ? { label: "En route", tone: "info" } : { label: "Available", tone: "neutral" },
    delivered: 1,
    total: moved ? 2 : 1,
    km: moved ? 12 : 3,
    stops: [
      delivered("#1039", "Dela Cruz Bakery", "Makati", "08:00–11:00", "08:31", "r", "Access notes attached for new driver"),
      ...(moved
        ? [upcoming("#1049", "Sam Ocampo", "Makati", "09:00–13:00", "11:05", "r", true, "From Jun · access notes attached for new driver")]
        : []),
    ],
  };
  return [jun, carlo, ana, rico];
}

/* ---------- tomorrow's draft ---------- */

const DRAFT: { d: DriverKey; km: number; stops: [string, string, string, string, string, string?][] }[] = [
  {
    d: "j",
    km: 17,
    stops: [
      ["#1053", "Hotel Celeste events", "Makati", "09:00–11:00", "09:00", "Oversized, needs the van · service entrance"],
      ["#1054", "Tess Aquino", "Makati", "09:00–12:00", "09:35"],
      ["#1055", "Joy Villar", "BGC", "10:00–13:00", "10:20", "Can leave with the lobby concierge"],
      ["#1056", "Martin Go", "BGC", "12:00–15:00", "12:10"],
    ],
  },
  {
    d: "c",
    km: 20,
    stops: [
      ["#1057", "Café Morato", "Quezon City", "08:30–10:30", "08:45"],
      ["#1058", "Lea Domingo", "Quezon City", "09:00–12:00", "09:30"],
      ["#1059", "Rina Castro", "San Juan", "11:00–14:00", "11:15", "Gate code is in the order notes"],
      ["#1060", "Dino Bautista", "Quezon City", "13:00–17:00", "13:20"],
    ],
  },
  {
    d: "a",
    km: 15,
    stops: [
      ["#1061", "Raffles Corporate Ctr", "Pasig", "10:00–12:00", "10:30", "Use lobby reception"],
      ["#1062", "Clara Uy", "Mandaluyong", "11:00–14:00", "11:40"],
      ["#1063", "Mia Torres", "Pasig", "13:00–16:00", "13:30"],
      ["#1064", "Ben Cruz", "Pasig", "15:00–17:00", "15:20", "Message on WhatsApp before you leave"],
    ],
  },
  {
    d: "r",
    km: 6,
    stops: [
      ["#1065", "Dela Cruz Bakery", "Makati", "08:00–11:00", "08:30"],
      ["#1066", "Gino Ferrer", "Makati", "10:00–13:00", "10:15", "Access notes attached for new driver"],
    ],
  },
];

function TomorrowDraft({ approved }: { approved: boolean }) {
  return (
    <>
      <section
        aria-label="Draft summary"
        style={{
          background: "var(--panel)",
          border: "1px solid var(--line)",
          borderRadius: "8px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        }}
      >
        <Metric label="Orders" value="14" sub="all placed" />
        <Metric label="Drivers" value="4" sub="Jun, Carlo, Ana, Rico" />
        <Metric label="Distance" value="58 km" sub="estimated" />
        <Metric label="Window conflicts" value="0" color="var(--ok)" last />
      </section>
      <section aria-label="Why this plan" style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "8px" }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: "8px" }}>
          <Sparkle />
          <h2 style={{ margin: "0", fontSize: "14px", fontWeight: "600" }}>Why this plan</h2>
          <span style={{ fontSize: "12px", color: "var(--mute)", flex: "1" }}>draft for Tue 13 Oct</span>
          <button
            style={{
              font: "inherit",
              fontSize: "12px",
              height: "26px",
              padding: "0 8px",
              border: "1px solid var(--line2)",
              borderRadius: "6px",
              background: "var(--panel)",
              color: "var(--ink2)",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
        </div>
        <div
          style={{
            margin: "10px 14px 12px",
            border: "1px solid var(--aiLine)",
            background: "var(--aiBg)",
            borderRadius: "6px",
            padding: "10px 12px",
          }}
        >
          <ul style={{ margin: "0", paddingLeft: "18px", color: "var(--ink2)", lineHeight: "1.7" }}>
            <li>
              <b>#1064 Ben Cruz</b> now prefers deliveries after 15:00 (from the address book), so he is Ana&#39;s last stop at 15:20.
            </li>
            <li>
              <b>Jun&#39;s van</b> is booked for a tire check 08:00–08:30, so his first stop is at 09:00.
            </li>
            <li>
              <b>Rico</b> is in his 4th week. He gets 2 Makati stops close to the hub, both with access notes.
            </li>
            <li>
              <b>1 same-day slot</b> is held on Carlo&#39;s Quezon City afternoon (14:00–16:00). If nothing comes in by 14:00, it is
              released.
            </li>
          </ul>
          <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #FBD5E3" }}>
            <span style={{ color: "var(--brandInk)", fontWeight: "500" }}>Auto-generated</span> from{" "}
            <a href="/app/orders" style={{ textDecoration: "none" }}>
              14 orders
            </a>
            ,{" "}
            <a href="/app/addresses" style={{ textDecoration: "none" }}>
              the address book
            </a>{" "}
            and{" "}
            <a href="/app/drivers" style={{ textDecoration: "none" }}>
              driver notes
            </a>{" "}
            · drafted today 06:00
          </div>
        </div>
      </section>
      <section
        aria-label="Draft routes"
        style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "8px", overflow: "hidden" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", borderBottom: "1px solid var(--line)" }}>
          <h2 style={{ margin: "0", fontSize: "14px", fontWeight: "600", flex: "1" }}>Stops by driver</h2>
          <span style={{ fontSize: "12px", color: "var(--mute)" }}>
            {approved ? "Planned times · drivers get them at 06:30" : "Planned times · drivers see them after you approve"}
          </span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", minWidth: "860px", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--sub)", textAlign: "left", color: "var(--mute)", fontSize: "12px" }}>
                <th style={{ ...th, paddingLeft: "14px", width: "30px" }}>#</th>
                <th style={th}>Order</th>
                <th style={th}>Recipient</th>
                <th style={th}>Area</th>
                <th style={th}>Window</th>
                <th style={th}>Planned</th>
                <th style={{ ...th, paddingRight: "14px" }}>Instructions for driver</th>
              </tr>
            </thead>
            <tbody>
              {DRAFT.map((g) => (
                <Fragment key={g.d}>
                  <tr style={{ background: "#FCFCFD" }}>
                    <td colSpan={7} style={{ padding: "7px 14px", borderBottom: "1px solid var(--line)" }}>
                      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
                        <Avatar d={g.d} />
                        <b>{DRIVERS[g.d].full}</b>
                        <span style={{ color: "var(--mute)" }}>{DRIVERS[g.d].vehicle}</span>
                        <span style={{ flex: "1" }}></span>
                        <span style={{ color: "var(--ink2)", fontWeight: "500" }}>
                          {g.stops.length} stops{g.d === "c" ? " + 1 slot" : ""}
                        </span>
                        <span style={{ color: "var(--mute)" }}>
                          · {g.km} km · first stop {g.stops[0][4]}
                        </span>
                      </div>
                    </td>
                  </tr>
                  {g.stops.map(([order, who, area, win, at, note], i) => (
                    <tr key={order}>
                      <td style={{ ...td, padding: "7px 14px", color: "var(--mute)" }}>{i + 1}</td>
                      <td style={{ ...td, padding: "7px 10px", whiteSpace: "nowrap", fontFamily: MONO }}>{order}</td>
                      <td style={{ ...td, padding: "7px 10px" }}>{who}</td>
                      <td style={{ ...td, padding: "7px 10px" }}>{area}</td>
                      <td style={{ ...td, padding: "7px 10px", whiteSpace: "nowrap", fontFamily: MONO }}>{win}</td>
                      <td style={{ ...td, padding: "7px 10px", whiteSpace: "nowrap", fontFamily: MONO }}>{at}</td>
                      <td style={{ ...td, padding: "7px 14px 7px 10px", color: "var(--ink2)", fontSize: "12px" }}>
                        {note ?? <span style={{ color: "var(--line2)" }}>—</span>}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

/* ---------- map ---------- */

function RouteLayer({
  color,
  points,
  stops,
  dashedFrom,
}: {
  color: string;
  points: [number, number][];
  stops: { at: [number, number]; n: number; title: string }[];
  dashedFrom?: number;
}) {
  const pts = (p: [number, number][]) => p.map(([x, y]) => `${x},${y}`).join(" ");
  const solid = dashedFrom === undefined ? points : points.slice(0, dashedFrom + 1);
  const dashed = dashedFrom === undefined ? [] : points.slice(dashedFrom);
  return (
    <svg
      viewBox="0 0 800 440"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none" }}
      aria-hidden="true"
    >
      <g style={{ pointerEvents: "auto" }}>
        <polyline points={pts(solid)} fill="none" stroke="#fff" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
        <polyline points={pts(solid)} fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        {dashed.length > 1 && (
          <polyline
            points={pts(dashed)}
            fill="none"
            stroke={color}
            strokeOpacity=".55"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}
        {stops.map((s) => (
          <g key={s.title}>
            <title>{s.title}</title>
            <circle cx={s.at[0]} cy={s.at[1]} r="9" fill={color} stroke="#fff" strokeWidth="2" />
            <text
              x={s.at[0]}
              y={s.at[1] + 3.5}
              textAnchor="middle"
              fontFamily="IBM Plex Sans, sans-serif"
              fontSize="10"
              fontWeight="600"
              fill="#fff"
            >
              {s.n}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function Chip({ d, on, detail, onClick }: { d: DriverKey; on: boolean; detail: string; onClick: () => void }) {
  const base: CSSProperties = {
    font: "inherit",
    fontSize: "12px",
    height: "28px",
    padding: "0 10px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  };
  return on ? (
    <button
      onClick={onClick}
      aria-pressed="true"
      style={{
        ...base,
        border: "1px solid var(--line2)",
        background: "var(--panel)",
        color: "var(--ink)",
        boxShadow: "0 1px 2px rgba(16,24,40,.06)",
      }}
    >
      <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: DRIVERS[d].color }}></span>
      <b style={{ fontWeight: "600" }}>{DRIVERS[d].name}</b>
      <span style={{ color: "var(--mute)" }}>{detail}</span>
    </button>
  ) : (
    <button
      onClick={onClick}
      aria-pressed="false"
      style={{ ...base, border: "1px dashed var(--line2)", background: "rgba(255,255,255,.75)", color: "var(--mute)" }}
    >
      <span
        style={{ width: "10px", height: "10px", borderRadius: "3px", border: `1.5px solid ${DRIVERS[d].color}`, boxSizing: "border-box" }}
      ></span>
      {DRIVERS[d].name} · hidden
    </button>
  );
}

function RouteMap({ groups, flat }: { groups: Group[]; flat: "show" | "none" }) {
  const [shown, setShown] = useState<Record<DriverKey, boolean>>({ j: true, c: true, a: true, r: true });
  const toggle = (d: DriverKey) => setShown((s) => ({ ...s, [d]: !s[d] }));
  const layer = (g: Group) => {
    const pts: [number, number][] = [HUB, ...g.stops.map((s) => s.at)];
    let dashedFrom: number | undefined;
    if (g.d === "j" && flat === "show") {
      // Jun is stuck between stop 2 and 3: insert his position, the rest of the route is dashed.
      pts.splice(3, 0, FLAT);
      dashedFrom = g.stops.length > 2 ? 3 : undefined;
    }
    const stops = g.stops.map((s, i) => ({ at: s.at, n: i + 1, title: `${DRIVERS[g.d].name} · stop ${i + 1} · ${s.order}` }));
    return <RouteLayer key={g.d} color={DRIVERS[g.d].color} points={pts} stops={stops} dashedFrom={dashedFrom} />;
  };
  // Draw in the canvas order so overlaps look the same: Rico, Ana, Carlo, Jun.
  const drawOrder: DriverKey[] = ["r", "a", "c", "j"];
  const byKey = Object.fromEntries(groups.map((g) => [g.d, g])) as Record<DriverKey, Group>;
  return (
    <div style={{ position: "relative", height: "600px", borderBottom: "1px solid var(--line)", overflow: "hidden" }}>
      <svg
        viewBox="0 0 800 440"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }}
        role="img"
        aria-label="Planned routes for each driver from the Makati hub"
      >
        <defs>
          <pattern id="grid" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M22 0H0V22" fill="none" stroke="#E6E9EE" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="800" height="440" fill="#F2F4F6" />
        <rect width="800" height="440" fill="url(#grid)" />
        <path d="M0 0 H70 C 90 120, 60 260, 95 440 H0 Z" fill="#DCE6EE" />
        <path d="M95 330 C 220 300, 320 380, 430 330 S 650 300, 800 360" fill="none" stroke="#DCE6EE" strokeWidth="16" />
        <path d="M600 210 l60 -20 l40 30 l-30 40 l-60 -5 z" fill="#E4EDE2" />
        <path d="M300 40 l70 -10 l20 50 l-80 20 z" fill="#E4EDE2" />
        <path d="M440 405 l60 -10 l15 35 h-80 z" fill="#E4EDE2" />
        <path d="M120 440 C 260 400, 380 380, 430 300 S 470 120, 505 0" fill="none" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M120 440 C 260 400, 380 380, 430 300 S 470 120, 505 0" fill="none" stroke="#FCD9A3" strokeWidth="3" />
        <path d="M730 0 C 690 150, 610 300, 565 440" fill="none" stroke="#FFFFFF" strokeWidth="8" />
        <path d="M280 252 C 420 240, 600 262, 800 272" fill="none" stroke="#FFFFFF" strokeWidth="7" />
        <path d="M95 120 C 260 110, 450 95, 800 70" fill="none" stroke="#FFFFFF" strokeWidth="7" />
        <path d="M210 440 L 300 300 L 330 140 L 345 0" fill="none" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M370 440 L 360 300 L 520 160 L 640 0" fill="none" stroke="#FFFFFF" strokeWidth="5" />
        <g fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fontWeight="500" fill="#98A2B3">
          <text x="200" y="412">
            Makati
          </text>
          <text x="482" y="432">
            BGC
          </text>
          <text x="590" y="320">
            Pasig
          </text>
          <text x="430" y="272">
            Mandaluyong
          </text>
          <text x="392" y="206">
            San Juan
          </text>
          <text x="300" y="72">
            Quezon City
          </text>
          <text x="14" y="240" fill="#8AA4B8">
            Manila Bay
          </text>
          <text x="440" y="292" fontSize="10" fill="#B88A3E">
            EDSA
          </text>
        </g>
      </svg>
      {drawOrder.filter((d) => shown[d]).map((d) => layer(byKey[d]))}
      {shown.c && (
        <svg
          viewBox="0 0 800 440"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none" }}
          aria-hidden="true"
        >
          <g style={{ pointerEvents: "auto" }}>
            <title>Open slot held for same-day orders</title>
            <circle cx="372" cy="172" r="9" fill="#fff" stroke="#7A5AF8" strokeWidth="2" strokeDasharray="3 2" />
            <text
              x="372"
              y="175.5"
              textAnchor="middle"
              fontFamily="IBM Plex Sans, sans-serif"
              fontSize="11"
              fontWeight="600"
              fill="#7A5AF8"
            >
              +
            </text>
          </g>
        </svg>
      )}
      <svg
        viewBox="0 0 800 440"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none" }}
        aria-hidden="true"
      >
        <rect x="251" y="359" width="18" height="18" rx="4" fill="#101828" stroke="#fff" strokeWidth="2" />
        <path d="M255 369l5 -4 5 4v5h-10z" fill="#fff" />
        <text x="274" y="360" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fontWeight="600" fill="#101828">
          Hub
        </text>
        {flat === "show" && shown.j && (
          <g style={{ pointerEvents: "auto" }}>
            <title>Jun · flat tire 10:31 · EDSA near Guadalupe</title>
            <circle cx={FLAT[0]} cy={FLAT[1]} r="10" fill="#D92D20" stroke="#fff" strokeWidth="2" />
            <text
              x={FLAT[0]}
              y={FLAT[1] + 4}
              textAnchor="middle"
              fontFamily="IBM Plex Sans, sans-serif"
              fontSize="12"
              fontWeight="700"
              fill="#fff"
            >
              !
            </text>
            <text
              x={FLAT[0] + 15}
              y={FLAT[1] + 4}
              fontFamily="IBM Plex Sans, sans-serif"
              fontSize="11"
              fontWeight="600"
              fill="#B42318"
              stroke="#fff"
              strokeWidth="3"
              paintOrder="stroke"
            >
              Jun · flat tire
            </text>
          </g>
        )}
      </svg>
      <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", flexWrap: "wrap", gap: "6px", maxWidth: "75%" }}>
        {ORDER.map((d) => {
          const g = byKey[d];
          const n = g.stops.length;
          const detail = d === "c" ? `${n} + slot · ${g.km} km` : `${n} stop${n === 1 ? "" : "s"} · ${g.km} km`;
          return <Chip key={d} d={d} on={shown[d]} detail={detail} onClick={() => toggle(d)} />;
        })}
      </div>
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          alignItems: "center",
          background: "rgba(255,255,255,.92)",
          border: "1px solid var(--line)",
          borderRadius: "6px",
          padding: "5px 10px",
          fontSize: "12px",
          color: "var(--ink2)",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
          <span
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "99px",
              background: "var(--ink2)",
              color: "#fff",
              fontSize: "9px",
              fontWeight: "600",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            1
          </span>
          Stop order
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
          <span
            style={{ width: "12px", height: "12px", borderRadius: "99px", border: "1.5px dashed var(--ink2)", boxSizing: "border-box" }}
          ></span>
          Same-day slot
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "12px", height: "12px", borderRadius: "3px", background: "#101828" }}></span>Hub
        </span>
      </div>
    </div>
  );
}

/* ---------- route table ---------- */

function RouteTable({ groups, phase }: { groups: Group[]; phase: Phase }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", minWidth: "1000px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--sub)", textAlign: "left", color: "var(--mute)", fontSize: "12px" }}>
            <th style={{ ...th, paddingLeft: "14px", width: "30px" }}>#</th>
            <th style={th}>Status</th>
            <th style={th}>Order</th>
            <th style={th}>Recipient</th>
            <th style={th}>Area</th>
            <th style={th}>Window</th>
            <th style={th}>Time</th>
            <th style={th}>Instructions for driver</th>
            <th style={{ ...th, paddingRight: "14px" }}>Driver</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((g) => {
            const pct = g.total ? Math.round((g.delivered / g.total) * 100) : 0;
            return (
              <Fragment key={g.d}>
                <tr style={{ background: "#FCFCFD" }}>
                  <td colSpan={9} style={{ padding: "8px 14px", borderBottom: "1px solid var(--line)" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
                      <Avatar d={g.d} />
                      <b>{DRIVERS[g.d].full}</b>
                      <span style={{ color: "var(--mute)" }}>{DRIVERS[g.d].vehicle}</span>
                      <Tag tone={g.tag.tone}>{g.tag.label}</Tag>
                      <span style={{ flex: "1" }}></span>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "120px", height: "6px", background: "#F2F4F7", borderRadius: "3px" }}>
                          <div style={{ width: `${pct}%`, height: "6px", background: DRIVERS[g.d].color, borderRadius: "3px" }}></div>
                        </div>
                        <span style={{ color: "var(--ink2)", fontWeight: "500" }}>
                          {g.delivered} of {g.total} delivered
                        </span>
                        <span style={{ color: "var(--mute)" }}>· {g.km} km planned</span>
                      </div>
                    </div>
                  </td>
                </tr>
                {g.stops.map((s, i) => {
                  const muted = s.done ? { color: "var(--mute)" } : {};
                  return (
                    <tr key={s.order} style={s.next ? { background: "#F5F8FF" } : undefined}>
                      <td style={{ ...td, padding: "9px 14px", color: "var(--mute)" }}>{i + 1}</td>
                      <td style={td}>
                        <Tag tone={s.status.tone} href={s.status.href}>
                          {s.status.label}
                        </Tag>
                      </td>
                      <td style={{ ...td, whiteSpace: "nowrap", fontFamily: MONO, ...muted }}>{s.order}</td>
                      <td style={{ ...td, ...muted }}>{s.recipient}</td>
                      <td style={{ ...td, ...muted }}>{s.area}</td>
                      <td style={{ ...td, whiteSpace: "nowrap", fontFamily: MONO, ...muted }}>{s.window}</td>
                      <td style={td}>
                        {s.time === null ? (
                          <span style={{ color: "var(--mute)" }}>—</span>
                        ) : (
                          <span
                            style={{
                              fontFamily: MONO,
                              whiteSpace: "nowrap",
                              color: s.done ? "var(--mute)" : s.status.tone === "err" ? "var(--err)" : undefined,
                            }}
                          >
                            {s.time}
                          </span>
                        )}
                      </td>
                      <td style={{ ...td, color: "var(--ink2)", fontSize: "12px" }}>
                        {s.note ?? <span style={{ color: "var(--line2)" }}>—</span>}
                      </td>
                      <td style={{ ...td, padding: "9px 14px" }}>
                        {s.done ? (
                          <span style={{ color: "var(--mute)" }}>{DRIVERS[s.driver].name}</span>
                        ) : (
                          <select
                            key={`${phase}-${s.driver}`}
                            aria-label={`Driver for ${s.order}`}
                            defaultValue={DRIVERS[s.driver].name}
                            style={{
                              font: "inherit",
                              height: "28px",
                              border: "1px solid var(--line2)",
                              borderRadius: "6px",
                              padding: "0 6px",
                              background: "var(--panel)",
                            }}
                          >
                            {ORDER.map((d) => (
                              <option key={d}>{DRIVERS[d].name}</option>
                            ))}
                          </select>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {g.footer && (
                  <tr>
                    <td style={{ ...td, padding: "9px 14px", color: "var(--mute)" }}>{g.stops.length + 1}</td>
                    <td colSpan={8} style={{ padding: "7px 10px", borderBottom: "1px solid var(--line)" }}>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          gap: "10px",
                          border: "1px dashed var(--line2)",
                          borderRadius: "6px",
                          padding: "6px 10px",
                          color: "var(--mute)",
                        }}
                      >
                        <span style={{ fontWeight: "500", color: "var(--ink2)" }}>{g.footer.title}</span>
                        <span>{g.footer.text}</span>
                        <span style={{ marginLeft: "auto", fontSize: "12px" }}>{g.footer.right}</span>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- board ---------- */

export default function PlanBoard() {
  const f = useScenarioFacts();
  const [tab, setTab] = useState<"today" | "tomorrow">("today");
  const [view, setView] = useState<"map" | "table">("map");
  const [draftApproved, setDraftApproved] = useState(false);

  const groups = todayPlan(f.phase, f.ticketOpen, f.junBackOnRoad);
  const flat = f.junIncident && !f.junBackOnRoad ? "show" : "none";

  const third =
    f.phase === "before" ? (
      <Metric label="Incidents" value="0" />
    ) : f.phase === "approved" ? (
      <Metric label="Reassigned" value="3" sub="to Ana and Rico" color="var(--ok)" />
    ) : f.phase === "rejected" ? (
      <Metric label="At risk" value={String(f.atRisk)} sub="Jun · flat tire" color="var(--err)" />
    ) : f.ticketOpen ? (
      <Metric label="Being reassigned" value="3" sub="Jun · flat tire" color="var(--warn)" />
    ) : (
      <Metric label="Incidents" value="1" sub="Jun · flat tire" color="var(--err)" />
    );
  const conflicts = f.atRisk;

  const viewBtn = (id: "map" | "table" | "timeline", label: string, first?: boolean) => {
    const active = id === view;
    return (
      <button
        onClick={() => (id === "timeline" ? undefined : setView(id))}
        aria-pressed={active}
        title={id === "timeline" ? "Timeline view is coming soon" : undefined}
        style={{
          font: "inherit",
          fontSize: "12px",
          height: "28px",
          padding: "0 10px",
          border: "0",
          borderLeft: first ? "0" : "1px solid var(--line2)",
          background: active ? "var(--sub)" : "var(--panel)",
          color: active ? undefined : "var(--ink2)",
          fontWeight: active ? "600" : undefined,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </button>
    );
  };

  const tabStyle = (active: boolean): CSSProperties => ({
    font: "inherit",
    height: "32px",
    padding: "0 12px",
    border: "0",
    borderBottom: active ? "2px solid var(--brandInk)" : "2px solid transparent",
    background: "none",
    color: active ? "var(--ink)" : "var(--ink2)",
    fontWeight: active ? "600" : undefined,
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  });

  return (
    <main style={{ flex: "999 1 640px", minWidth: "0", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
        <div style={{ flex: "1 1 320px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <h1 style={{ margin: "0", fontSize: "20px", fontWeight: "600", letterSpacing: "-0.01em" }}>Dispatch</h1>
          </div>
          <div style={{ color: "var(--mute)", marginTop: "2px" }}>
            {tab === "today"
              ? "Today's plan was published at 07:52 after you approved it. Stops update live as drivers deliver."
              : draftApproved
                ? "You approved the plan for Tue 13 Oct. Drivers get their routes at 06:30."
                : "Draft for Tue 13 Oct. Nothing goes to drivers until you approve it."}
          </div>
        </div>
        {tab === "today" ? (
          <>
            <button style={btnSecondary} disabled={f.thinking}>
              Re-plan remaining stops
            </button>
            {f.ticketOpen && (
              <a href="/app/approvals" style={btnPrimary}>
                Review HAM-417
              </a>
            )}
          </>
        ) : draftApproved ? (
          <span
            style={{
              height: "34px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "0 12px",
              borderRadius: "6px",
              color: "var(--ok)",
              background: "var(--okBg)",
              border: "1px solid var(--okLine)",
              fontWeight: "500",
              whiteSpace: "nowrap",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path d="M5 12l5 5L20 7" />
            </svg>
            Approved · sends to drivers at 06:30
          </span>
        ) : (
          <button style={btnPrimary} onClick={() => setDraftApproved(true)}>
            Approve plan for tomorrow
          </button>
        )}
      </div>
      <div
        role="tablist"
        aria-label="Plan day"
        style={{ display: "flex", gap: "4px", borderBottom: "1px solid var(--line)", marginTop: "-6px" }}
      >
        <button role="tab" aria-selected={tab === "today"} onClick={() => setTab("today")} style={tabStyle(tab === "today")}>
          <span style={{ width: "7px", height: "7px", borderRadius: "99px", background: "#12B76A" }}></span>Today · Mon 12 Oct
          <span style={{ fontSize: "11px", color: "var(--ok)", fontWeight: "500" }}>Live</span>
        </button>
        <button role="tab" aria-selected={tab === "tomorrow"} onClick={() => setTab("tomorrow")} style={tabStyle(tab === "tomorrow")}>
          Tomorrow · Tue 13 Oct {draftApproved ? <Tag tone="ok">Approved</Tag> : <Tag tone="warn">Draft · awaiting approval</Tag>}
        </button>
      </div>

      {tab === "tomorrow" ? (
        <TomorrowDraft approved={draftApproved} />
      ) : (
        <>
          {f.thinking && (
            <div
              role="status"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid var(--aiLine)",
                background: "var(--aiBg)",
                borderRadius: "8px",
                padding: "10px 14px",
                animation: "hamFade .25s ease-out",
              }}
            >
              <Sparkle />
              <span style={{ fontWeight: "500" }}>Dispatch agent is re-planning Jun&#39;s 3 stops</span>
              <Dots />
              <span style={{ marginLeft: "auto", fontSize: "12px", color: "var(--mute)" }}>
                <span style={{ color: "var(--brandInk)", fontWeight: "500" }}>Auto-generated</span> from Jun&#39;s report at 10:31
              </span>
            </div>
          )}
          {f.ticketOpen && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "8px",
                border: "1px solid var(--warnLine)",
                background: "var(--warnBg)",
                borderRadius: "8px",
                padding: "10px 14px",
                color: "var(--ink2)",
                animation: "hamFade .25s ease-out",
              }}
            >
              <b style={{ color: "var(--warn)" }}>HAM-417 is waiting for you.</b>
              <span>The Dispatch agent wants to move 3 of Jun&#39;s stops to Ana and Rico. {check(HAM_417).reason}</span>
            </div>
          )}
          <section
            aria-label="Progress summary"
            style={{
              background: "var(--panel)",
              border: "1px solid var(--line)",
              borderRadius: "8px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            }}
          >
            <Metric label="Delivered" value={String(f.delivered)} sub={`of ${f.totalOrders}`} />
            <Metric label="On time" value="100%" sub={`${f.delivered} of ${f.delivered}`} />
            {third}
            <Metric label="Distance" value="24 km" sub={f.moved ? "of 70 planned (+9 km)" : "of 61 planned"} />
            <Metric label="Window conflicts" value={String(conflicts)} color={conflicts ? "var(--err)" : "var(--ok)"} last />
          </section>
          <section aria-label="Agent notes" style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "8px" }}>
            <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkle />
              <h2 style={{ margin: "0", fontSize: "14px", fontWeight: "600" }}>Why this plan</h2>
              <span style={{ fontSize: "12px", color: "var(--mute)" }}>from the 07:48 draft</span>
            </div>
            <ul style={{ margin: "0", padding: "10px 14px 12px 32px", color: "var(--ink2)", lineHeight: "1.7" }}>
              <li>
                <b>#1047 event arch</b> is oversized, so it stays on the only van (Jun).
              </li>
              <li>
                <b>#1044 Ben Cruz</b> has 2 failed attempts on record. A confirmation message goes out before Ana is dispatched.
              </li>
              <li>
                <b>Rico</b> is new (3 weeks). He gets one compact Makati stop with clear access notes.
              </li>
              <li>
                <b>1 open slot</b> is left on Carlo&#39;s Quezon City afternoon for same-day orders (you average 1.4 a day). If nothing
                comes in by 14:00, the slot is released.
              </li>
              <li>
                <b>WA-0912</b> (WhatsApp) is in review. Approving it adds it to Rico&#39;s afternoon.
              </li>
            </ul>
          </section>
          <section
            aria-label="Routes"
            style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "8px", overflow: "hidden" }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "10px",
                padding: "10px 14px",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <h2 style={{ margin: "0", fontSize: "14px", fontWeight: "600", flex: "1" }}>Routes</h2>
              <div
                role="group"
                aria-label="View"
                style={{ display: "flex", border: "1px solid var(--line2)", borderRadius: "6px", overflow: "hidden" }}
              >
                {viewBtn("map", "Map + table", true)}
                {viewBtn("table", "Table only")}
                {viewBtn("timeline", "Timeline")}
              </div>
            </div>
            {view === "map" && <RouteMap groups={groups} flat={flat} />}
            <RouteTable groups={groups} phase={f.phase} />
          </section>
        </>
      )}
    </main>
  );
}
