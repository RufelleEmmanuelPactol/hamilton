"use client";
// Converted from design/project/Orders.dc.html, wired to the scenario store.
// Cards follow the design-system kanban card: ID (plus the HAM ticket when there is one), title, one tag, assignee.
import type { CSSProperties, ReactNode } from "react";
import { useScenarioFacts } from "@/lib/scenario";

const MONO = "'IBM Plex Mono', monospace";

type Tone = "err" | "warn" | "ok" | "info";
type Driver = "JR" | "CM" | "AV" | "RS";
const DRIVERS: Record<Driver, { color: string; name: string }> = {
  JR: { color: "#2E90FA", name: "Jun Reyes" },
  CM: { color: "#7A5AF8", name: "Carlo Mendoza" },
  AV: { color: "#E91E63", name: "Ana Villanueva" },
  RS: { color: "#F79009", name: "Rico Santos" },
};

interface Card {
  id: string;
  ticket?: string;
  tag?: [Tone, string];
  driver?: Driver;
  title: string;
  meta: ReactNode;
  border?: string;
  done?: boolean;
  quote?: string;
  link?: [string, string];
}

function Tag({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      style={{
        fontSize: "11px",
        fontWeight: tone === "err" || tone === "warn" ? "600" : undefined,
        color: `var(--${tone})`,
        background: `var(--${tone}Bg)`,
        border: `1px solid var(--${tone}Line)`,
        borderRadius: "4px",
        padding: "0 6px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function Avatar({ d }: { d?: Driver }) {
  const base: CSSProperties = {
    marginLeft: "auto",
    width: "20px",
    height: "20px",
    flex: "none",
    borderRadius: "99px",
    fontSize: "9px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  if (!d) return <span title="Not assigned yet" aria-label="Not assigned yet" style={{ ...base, border: "1px dashed var(--line2)" }} />;
  return (
    <span title={DRIVERS[d].name} aria-label={DRIVERS[d].name} style={{ ...base, background: DRIVERS[d].color, color: "#fff" }}>
      {d}
    </span>
  );
}

function OrderCard({ c }: { c: Card }) {
  return (
    <article
      style={{
        background: "var(--panel)",
        border: `1px solid ${c.border ?? "var(--line)"}`,
        borderRadius: "8px",
        padding: "10px 12px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        boxShadow: c.quote ? "0 1px 2px rgba(16,24,40,0.04)" : undefined,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--mute)", whiteSpace: "nowrap" }}>
        <span style={{ fontFamily: MONO }}>{c.id}</span>
        {c.ticket && (
          <a href="/app/approvals" style={{ fontFamily: MONO, color: "var(--brandInk)", textDecoration: "none" }}>
            {c.ticket}
          </a>
        )}
        {c.tag && <Tag tone={c.tag[0]}>{c.tag[1]}</Tag>}
        <Avatar d={c.driver} />
      </div>
      <div style={{ fontWeight: "500", lineHeight: "1.4", color: c.done ? "var(--ink2)" : undefined }}>{c.title}</div>
      {c.quote && (
        <div
          style={{
            fontSize: "12px",
            color: "var(--ink2)",
            background: "var(--sub)",
            border: "1px solid var(--line)",
            borderRadius: "6px",
            padding: "6px 8px",
            lineHeight: "1.45",
          }}
        >
          &#34;{c.quote}&#34;
        </div>
      )}
      <div style={{ fontSize: "12px", color: "var(--mute)" }}>{c.meta}</div>
      {c.link && (
        <a href={c.link[1]} style={{ fontSize: "12px", fontWeight: "600", textDecoration: "none" }}>
          {c.link[0]}
        </a>
      )}
    </article>
  );
}

function Column({
  label,
  icon,
  cards,
  count,
  children,
}: {
  label: string;
  icon: ReactNode;
  cards: Card[];
  count?: number;
  children?: ReactNode;
}) {
  return (
    <section aria-label={label}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 4px 10px" }}>
        {icon}
        <span style={{ fontWeight: "600", whiteSpace: "nowrap" }}>{label}</span>
        <span style={{ color: "var(--mute)" }}>{count ?? cards.length}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {cards.map((c) => (
          <OrderCard key={c.id} c={c} />
        ))}
        {children}
      </div>
    </section>
  );
}

/** Jun's 3 remaining stops. Their driver, ETA and tag follow the scenario phase. */
function junCards(f: ReturnType<typeof useScenarioFacts>): Card[] {
  // HAM-417 exists once the agent has finished re-planning (open, then approved or rejected).
  const ticket = f.phase !== "before" && !f.thinking ? "HAM-417" : undefined;
  if (f.phase === "approved")
    return [
      {
        id: "#1049",
        driver: "RS",
        ticket,
        tag: ["ok", "On time"],
        title: "Balloons + roses · Sam Ocampo",
        meta: "Makati · 09:00–13:00 · ETA 11:05",
      },
      {
        id: "#1042",
        driver: "AV",
        ticket,
        tag: ["ok", "On time"],
        title: "Anniversary box · Mark Tan",
        meta: "BGC · 10:00–13:00 · ETA 12:15",
      },
      {
        id: "#1050",
        driver: "AV",
        ticket,
        tag: ["ok", "On time"],
        title: "Orchid pot · Nicole Ramos",
        meta: "BGC · 11:00–15:00 · ETA 12:40",
      },
    ];
  if (f.phase === "before")
    return [
      { id: "#1042", driver: "JR", tag: ["info", "Next stop"], title: "Anniversary box · Mark Tan", meta: "BGC · 10:00–13:00" },
      { id: "#1050", driver: "JR", title: "Orchid pot · Nicole Ramos", meta: "BGC · 11:00–15:00" },
      { id: "#1049", driver: "JR", title: "Balloons + roses · Sam Ocampo", meta: "Makati · 09:00–13:00" },
    ];
  // incident (agent still working, or HAM-417 open) and rejected: Jun keeps the stops, 2 are late
  const late: [Tone, string] = ["err", f.phase === "rejected" ? "Late" : "Late risk"];
  return [
    {
      id: "#1042",
      ticket,
      driver: "JR",
      tag: late,
      border: "var(--errLine)",
      title: "Anniversary box · Mark Tan",
      meta: "BGC · 10:00–13:00 · ETA 13:40",
    },
    {
      id: "#1049",
      ticket,
      driver: "JR",
      tag: late,
      border: "var(--errLine)",
      title: "Balloons + roses · Sam Ocampo",
      meta: "Makati · 09:00–13:00 · ETA 13:55",
    },
    { id: "#1050", ticket, driver: "JR", title: "Orchid pot · Nicole Ramos", meta: "BGC · 11:00–15:00 · ETA 14:05" },
  ];
}

export default function OrdersBoard() {
  const f = useScenarioFacts();

  const review: Card[] = [
    {
      id: "WA-0912",
      ticket: "HAM-414",
      tag: ["warn", "82% parsed"],
      title: "Red roses (12) + chocolates for Rina Bautista",
      quote: "hi po! can i order the red roses 12pcs w/ chocolates… before 4pm pls",
      meta: "Makati · 13:00–16:00 · not paid yet",
      link: ["Review in Approvals", "/app/approvals"],
    },
  ];
  const scheduled: Card[] = [
    {
      id: "#1044",
      driver: "AV",
      tag: ["info", "Rescheduled"],
      title: "Sunflower bundle · Ben Cruz",
      meta: "Pasig · 15:00–17:00 · confirmed",
    },
    { id: "#1048", driver: "CM", tag: ["ok", "+ #1052"], title: "White lilies + bouquet · Grace Lee", meta: "San Juan · 13:00–18:00" },
  ];
  const out: Card[] = [
    ...junCards(f),
    { id: "#1051", driver: "CM", title: "Retirement arrangement · Prof. Diaz", meta: "UP Diliman · ETA 11:05 · on time" },
    { id: "#1043", driver: "AV", title: "Office desk arrangement · Raffles", meta: "Ortigas · ETA 13:10 · closes 17:00" },
  ];
  const delivered: Card[] = [
    { id: "#1046", driver: "CM", tag: ["ok", "Proof verified"], title: "Get-well basket · Anna Garcia", meta: "10:36", done: true },
    { id: "#1047", driver: "JR", tag: ["ok", "Proof verified"], title: "Event arch · Shangri-La", meta: "10:08", done: true },
    { id: "#1041", driver: "JR", tag: ["ok", "Retake passed"], title: "Pink roses · Liza Santos", meta: "09:24", done: true },
  ];
  const exceptions: Card[] = [
    {
      id: "#1045",
      ticket: "HAM-416",
      driver: "CM",
      tag: ["err", "Refund request"],
      border: "var(--errLine)",
      title: "Table posies · Café Morato",
      meta: "Delivered 08:58 · 2 arrived wilted",
      link: ["Handle in Approvals", "/app/approvals"],
    },
  ];

  const total = scheduled.length + out.length + f.delivered + exceptions.length;

  return (
    <main style={{ flex: "999 1 640px", minWidth: "0", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "10px",
          padding: "12px 20px",
          background: "var(--panel)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <h1 style={{ margin: "0", fontSize: "15px", fontWeight: "600" }}>Orders</h1>
        <span style={{ color: "var(--mute)" }}>Today · {total}</span>
        <div
          role="group"
          aria-label="View"
          style={{ display: "flex", border: "1px solid var(--line2)", borderRadius: "6px", overflow: "hidden", marginLeft: "8px" }}
        >
          <button
            type="button"
            aria-pressed="true"
            style={{
              font: "inherit",
              fontSize: "12px",
              height: "28px",
              padding: "0 10px",
              border: "0",
              background: "var(--sub)",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Board
          </button>
          <button
            type="button"
            aria-pressed="false"
            style={{
              font: "inherit",
              fontSize: "12px",
              height: "28px",
              padding: "0 10px",
              border: "0",
              borderLeft: "1px solid var(--line2)",
              background: "var(--panel)",
              color: "var(--ink2)",
              cursor: "pointer",
            }}
          >
            List
          </button>
        </div>
        <div style={{ flex: "1" }}></div>
        <button
          type="button"
          style={{
            font: "inherit",
            fontSize: "12px",
            height: "28px",
            padding: "0 10px",
            border: "1px dashed var(--line2)",
            borderRadius: "6px",
            background: "var(--panel)",
            color: "var(--ink2)",
            cursor: "pointer",
          }}
        >
          + Filter
        </button>
        <button
          type="button"
          style={{
            font: "inherit",
            fontSize: "12px",
            height: "28px",
            padding: "0 10px",
            border: "1px solid var(--line2)",
            borderRadius: "6px",
            background: "var(--panel)",
            color: "var(--ink2)",
            cursor: "pointer",
          }}
        >
          Group: Status
        </button>
        <button
          type="button"
          style={{
            font: "inherit",
            fontSize: "12px",
            fontWeight: "600",
            height: "28px",
            padding: "0 12px",
            border: "0",
            borderRadius: "6px",
            background: "var(--brandInk)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          New order
        </button>
      </div>
      <div style={{ flex: "1", overflowX: "auto", padding: "14px 16px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(212px, 1fr))",
            gap: "12px",
            minWidth: "1108px",
            alignItems: "start",
          }}
        >
          <Column
            label="Needs review"
            cards={review}
            icon={
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#B54708"
                strokeWidth="2.4"
                strokeDasharray="3 3"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
              </svg>
            }
          />
          <Column
            label="Scheduled"
            cards={scheduled}
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#667085" strokeWidth="2.4" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
              </svg>
            }
          />
          <Column
            label="Out for delivery"
            cards={out}
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9" fill="none" stroke="#2E90FA" strokeWidth="2.4" />
                <path d="M12 3a9 9 0 0 1 0 18z" fill="#2E90FA" />
              </svg>
            }
          />
          <Column
            label="Delivered"
            cards={delivered}
            count={f.delivered}
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" fill="#12B76A" />
                <path d="M7.5 12.5l3 3 6-7" fill="none" stroke="#fff" strokeWidth="2.2" />
              </svg>
            }
          >
            <button
              type="button"
              style={{
                font: "inherit",
                fontSize: "12px",
                height: "30px",
                border: "0",
                background: "none",
                color: "var(--mute)",
                cursor: "pointer",
                textAlign: "left",
                padding: "0 4px",
              }}
            >
              Show {f.delivered - delivered.length} more
            </button>
          </Column>
          <Column
            label="Exceptions"
            cards={exceptions}
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" fill="#F04438" />
                <path d="M12 7v6M12 16v.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            }
          >
            <div
              style={{
                marginTop: "2px",
                border: "1px dashed var(--line2)",
                borderRadius: "8px",
                padding: "12px",
                color: "var(--mute)",
                fontSize: "12px",
                lineHeight: "1.5",
              }}
            >
              Failed and disputed orders land here. Drag a card to another column to move it.
            </div>
          </Column>
        </div>
      </div>
    </main>
  );
}
