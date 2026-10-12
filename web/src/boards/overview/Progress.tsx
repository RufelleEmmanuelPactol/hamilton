"use client";
import type { CSSProperties, ReactNode } from "react";
import { useScenarioFacts } from "@/lib/scenario";
import { pct, Tag } from "./ui";

const HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
const GREY = "#D0D5DD";

const P = (n: number) => `${n.toFixed(1)}%`;

/* ---------- lane primitives (same markup as the canvas) ---------- */

function Line({ from, to, border }: { from: number; to: number; border: string }) {
  if (to <= from) return null;
  return (
    <span
      style={{
        position: "absolute",
        top: "50%",
        left: P(from),
        width: P(to - from),
        height: "0",
        borderTop: border,
        transform: "translateY(-50%)",
      }}
    />
  );
}

type DotKind = "delivered" | "next" | "planned" | "proposed" | "stalled";
function Dot({ at, kind, color = GREY, title }: { at: number; kind: DotKind; color?: string; title: string }) {
  const base: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: P(at),
    transform: "translate(-50%, -50%)",
    borderRadius: "99px",
    boxSizing: "border-box",
  };
  const k: Record<DotKind, CSSProperties> = {
    delivered: { width: "12px", height: "12px", background: color, border: "2px solid #fff", boxShadow: `0 0 0 1px ${color}` },
    next: { width: "12px", height: "12px", background: "#fff", border: `2px solid ${color}` },
    planned: { width: "10px", height: "10px", background: "#fff", border: `2px solid ${GREY}` },
    proposed: { width: "10px", height: "10px", background: "var(--brandTint)", border: "2px dashed var(--brand)" },
    stalled: { width: "10px", height: "10px", background: "#fff", border: "2px dashed #98A2B3" },
  };
  return <span title={title} style={{ ...base, ...k[kind] }} />;
}

/** Where the driver is now: pulsing when moving, a ring when idle. */
function Here({ at, color, ring, idle, title }: { at: number; color: string; ring: string; idle?: boolean; title: string }) {
  const style: CSSProperties = idle
    ? { width: "14px", height: "14px", background: "#fff", border: `3px solid ${color}` }
    : {
        width: "16px",
        height: "16px",
        background: color,
        border: "3px solid #fff",
        boxShadow: `0 0 0 1px ${color}`,
        animation: "hamPulse 1.6s ease-out infinite",
        ["--ring" as string]: ring,
      };
  return (
    <span
      title={title}
      style={{ position: "absolute", top: "50%", left: P(at), transform: "translate(-50%, -50%)", borderRadius: "99px", ...style }}
    />
  );
}

function IncidentMark({ at }: { at: number }) {
  return (
    <span
      title="Flat tire 10:31"
      style={{
        position: "absolute",
        top: "50%",
        left: P(at),
        transform: "translate(-50%, -50%)",
        width: "18px",
        height: "18px",
        borderRadius: "99px",
        background: "var(--err)",
        color: "#fff",
        fontSize: "12px",
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #fff",
        boxShadow: "0 0 0 1px var(--err)",
      }}
    >
      !
    </span>
  );
}

/** Text above a lane. `start` anchors the text just right of `at` so it stays clear of the Now line. */
function Label({ at, color, children, href, start }: { at: number; color: string; children: ReactNode; href?: string; start?: boolean }) {
  const style: CSSProperties = {
    position: "absolute",
    top: "2px",
    left: start ? `calc(${P(at)} - 4px)` : P(at),
    transform: start ? undefined : "translateX(-50%)",
    fontSize: "11px",
    fontWeight: 500,
    color,
    whiteSpace: "nowrap",
    textDecoration: "none",
  };
  return href ? (
    <a href={href} style={style}>
      {children}
    </a>
  ) : (
    <span style={style}>{children}</span>
  );
}

function Row({
  initials,
  color,
  name,
  tag,
  sub,
  last,
  children,
}: {
  initials: string;
  color: string;
  name: string;
  tag: ReactNode;
  sub: string;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "stretch", borderBottom: last ? undefined : "1px solid var(--line)" }}>
      <div style={{ flex: "0 0 250px", display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", boxSizing: "border-box" }}>
        <span
          style={{
            width: "26px",
            height: "26px",
            flex: "none",
            borderRadius: "99px",
            background: color,
            color: "#fff",
            fontSize: "10px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {initials}
        </span>
        <div style={{ minWidth: "0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{name}</span>
            {tag}
          </div>
          <div style={{ fontSize: "12px", color: "var(--mute)", whiteSpace: "nowrap" }}>{sub}</div>
        </div>
      </div>
      <div style={{ flex: "1", position: "relative", minHeight: "52px", marginRight: "18px" }}>{children}</div>
    </div>
  );
}

function LegendItem({ dot, children }: { dot: CSSProperties; children: ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
      <span style={{ width: "9px", height: "9px", borderRadius: "99px", boxSizing: "border-box", ...dot }} />
      {children}
    </span>
  );
}

/* ---------- the tracker ---------- */

const JUN = "#2E90FA";
const CARLO = "#7A5AF8";
const ANA = "#E91E63";
const RICO = "#F79009";

// Jun's remaining stops in route order (stop 3, 4, 5), at their original plan times.
const J1042 = pct("10:40");
const J1050 = pct("11:20");
const J1049 = pct("12:05");
const FLAT = pct("10:31");
// Where the reassigned stops land if approved (the ETAs in HAM-417).
const A1042 = pct("12:15");
const A1050 = pct("12:40");
const R1049 = pct("11:05");

export function LiveProgress() {
  const f = useScenarioFacts();
  const now = pct(f.clock);
  const proposed = f.ticketOpen; // dashed "if approved" stops, only while HAM-417 waits for Maria
  const moved = f.moved;
  const jun = f.phase;

  return (
    <section
      aria-label="Live progress"
      style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "8px", overflow: "hidden" }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "12px",
          padding: "10px 14px",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <h2 style={{ margin: "0", fontSize: "14px", fontWeight: 600 }}>Live progress</h2>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--ok)", fontWeight: 500 }}>
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "99px",
              background: "#12B76A",
              animation: "hamPulse 1.6s ease-out infinite",
              ["--ring" as string]: "rgba(18,183,106,.4)",
            }}
          />
          Live
        </span>
        <span style={{ flex: "1" }} />
        <span style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontSize: "12px", color: "var(--mute)" }}>
          <LegendItem dot={{ background: "var(--ink2)" }}>Delivered</LegendItem>
          <LegendItem dot={{ border: "2px solid var(--ink2)" }}>Next</LegendItem>
          <LegendItem dot={{ border: `2px solid ${GREY}` }}>Planned</LegendItem>
          {proposed && <LegendItem dot={{ border: "2px dashed var(--brand)" }}>Proposed</LegendItem>}
          {f.junIncident && <LegendItem dot={{ background: "var(--err)" }}>Incident</LegendItem>}
        </span>
        <a href="/app/dispatch" style={{ fontWeight: 500, textDecoration: "none" }}>
          Open dispatch
        </a>
      </div>
      <div style={{ overflowX: "auto" }}>
        <div style={{ minWidth: "760px" }}>
          <div style={{ display: "flex", background: "var(--sub)", borderBottom: "1px solid var(--line)" }}>
            <div style={{ flex: "0 0 250px", padding: "7px 14px", boxSizing: "border-box", fontSize: "12px", color: "var(--mute)" }}>
              Driver
            </div>
            <div style={{ flex: "1", position: "relative", height: "30px", marginRight: "18px" }}>
              <div style={{ position: "absolute", inset: "8px 0 0 0" }}>
                {HOURS.map((h) => (
                  <span
                    key={h}
                    style={{
                      position: "absolute",
                      left: P(pct(h)),
                      transform: "translateX(-50%)",
                      fontSize: "11px",
                      color: "var(--mute)",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    {h}
                  </span>
                ))}
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: P(now),
                    transform: "translateX(-50%)",
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "#fff",
                    background: "var(--brand)",
                    borderRadius: "3px",
                    padding: "0 4px",
                  }}
                >
                  {f.clock}
                </span>
              </div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div
              aria-hidden="true"
              style={{ position: "absolute", top: "0", bottom: "0", left: "250px", right: "18px", pointerEvents: "none" }}
            >
              {HOURS.map((h) => (
                <span key={h} style={{ position: "absolute", top: "0", bottom: "0", left: P(pct(h)), borderLeft: "1px solid #F2F4F7" }} />
              ))}
              <span style={{ position: "absolute", top: "0", bottom: "0", left: P(now), borderLeft: "1.5px solid var(--brand)" }} />
            </div>

            {/* Jun */}
            <Row
              initials="JR"
              color={JUN}
              name="Jun Reyes"
              tag={f.junIncident ? <Tag tone="err">Incident</Tag> : <Tag tone="info">En route</Tag>}
              sub={jun === "before" ? "Van · 2/5 · on time" : moved ? "Van · 2/2 · flat tire" : "Van · 2/5 · flat tire"}
            >
              {jun === "before" ? (
                <>
                  <Line from={pct("08:30")} to={now} border={`3px solid ${JUN}`} />
                  <Line from={now} to={J1049} border={`3px solid ${GREY}`} />
                  <Dot at={pct("09:24")} kind="delivered" color={JUN} title="#1041 delivered 09:24" />
                  <Dot at={pct("10:08")} kind="delivered" color={JUN} title="#1047 delivered 10:08" />
                  <Dot at={J1042} kind="next" color={JUN} title="#1042 Mark Tan · ETA 10:40" />
                  <Dot at={J1050} kind="planned" title="#1050 Nicole Ramos · ETA 11:20" />
                  <Dot at={J1049} kind="planned" title="#1049 Sam Ocampo · ETA 12:05" />
                  <Here at={now} color={JUN} ring="rgba(46,144,250,.35)" title="Jun · on time" />
                  <Label at={J1042} start color="var(--ink2)">
                    #1042 · 10:40
                  </Label>
                </>
              ) : (
                <>
                  <Line from={pct("08:30")} to={FLAT} border={`3px solid ${JUN}`} />
                  {!moved && (
                    <>
                      <Line from={FLAT} to={J1049} border={`3px dashed ${GREY}`} />
                      <Dot
                        at={J1042}
                        kind="stalled"
                        title={jun === "rejected" ? "#1042 Mark Tan · late, ETA 13:40" : "#1042 being reassigned"}
                      />
                      <Dot
                        at={J1050}
                        kind="stalled"
                        title={jun === "rejected" ? "#1050 Nicole Ramos · still on time" : "#1050 being reassigned"}
                      />
                      <Dot
                        at={J1049}
                        kind="stalled"
                        title={jun === "rejected" ? "#1049 Sam Ocampo · late, ETA 13:55" : "#1049 being reassigned"}
                      />
                    </>
                  )}
                  <Dot at={pct("09:24")} kind="delivered" color={JUN} title="#1041 delivered 09:24" />
                  <Dot at={pct("10:08")} kind="delivered" color={JUN} title="#1047 delivered 10:08" />
                  <IncidentMark at={FLAT} />
                  {jun === "incident" &&
                    (f.thinking ? (
                      <Label at={60} color="var(--brandInk)">
                        Re-planning 3 stops…
                      </Label>
                    ) : (
                      <Label at={60} color="var(--err)" href="/app/approvals">
                        3 stops → Approvals
                      </Label>
                    ))}
                  {jun === "rejected" && (
                    <Label at={60} color="var(--err)">
                      Keeps 3 stops · 2 late
                    </Label>
                  )}
                  {moved && (
                    <Label at={now + 1.5} start color="var(--mute)">
                      Stops moved to Ana and Rico
                    </Label>
                  )}
                </>
              )}
            </Row>

            {/* Carlo: unaffected by the incident */}
            <Row initials="CM" color={CARLO} name="Carlo Mendoza" tag={<Tag tone="info">En route</Tag>} sub="Motorcycle · 2/4 · on time">
              <Line from={pct("08:40")} to={now} border={`3px solid ${CARLO}`} />
              <Line from={now} to={pct("11:50")} border={`3px solid ${GREY}`} />
              <Dot at={pct("09:40")} kind="delivered" color={CARLO} title="#1039 delivered 09:40" />
              <Dot at={pct("10:25")} kind="delivered" color={CARLO} title="#1040 delivered 10:25" />
              <Dot at={pct("11:05")} kind="next" color={CARLO} title="#1051 Prof. Diaz · ETA 11:05" />
              <Dot at={pct("11:50")} kind="planned" title="#1052 · ETA 11:50" />
              <Here at={now} color={CARLO} ring="rgba(122,90,248,.35)" title="Carlo · on time" />
              <Label at={pct("11:05")} start color="var(--ink2)">
                #1051 · 11:05
              </Label>
            </Row>

            {/* Ana: takes #1042 and #1050 if HAM-417 is approved */}
            <Row
              initials="AV"
              color={ANA}
              name="Ana Villanueva"
              tag={<Tag tone="info">En route</Tag>}
              sub={moved ? "Sedan · 0/4 · on time" : "Sedan · 0/2 · on time"}
            >
              <Line from={pct("09:50")} to={now} border={`3px solid ${ANA}`} />
              <Line from={now} to={pct("13:40")} border={`3px solid ${GREY}`} />
              {proposed && (
                <>
                  <Dot at={A1042} kind="proposed" title="Proposed: #1042 Mark Tan from Jun · ETA 12:15" />
                  <Dot at={A1050} kind="proposed" title="Proposed: #1050 Nicole Ramos from Jun · ETA 12:40" />
                  <Label at={(A1042 + A1050) / 2} color="var(--brandInk)">
                    +2 if approved
                  </Label>
                </>
              )}
              {moved && (
                <>
                  <Dot at={A1042} kind="next" color={ANA} title="#1042 Mark Tan (from Jun) · ETA 12:15" />
                  <Dot at={A1050} kind="planned" title="#1050 Nicole Ramos (from Jun) · ETA 12:40" />
                  <Label at={(A1042 + A1050) / 2} color="var(--ink2)">
                    +2 from Jun
                  </Label>
                </>
              )}
              <Dot at={pct("13:10")} kind={moved ? "planned" : "next"} color={ANA} title="#1043 Raffles · ETA 13:10" />
              <Dot at={pct("13:40")} kind="planned" title="#1048 · ETA 13:40" />
              <Here at={now} color={ANA} ring="rgba(233,30,99,.35)" title="Ana · on time" />
            </Row>

            {/* Rico: takes #1049 if HAM-417 is approved */}
            <Row
              initials="RS"
              color={RICO}
              name="Rico Santos"
              tag={moved ? <Tag tone="info">En route</Tag> : <Tag tone="neutral">Available</Tag>}
              sub={moved ? "Motorcycle · 1/2 · on time" : "Motorcycle · 1/1 · at hub"}
              last
            >
              <Line from={pct("09:30")} to={pct("10:15")} border={`3px solid ${RICO}`} />
              <Dot at={pct("10:15")} kind="delivered" color={RICO} title="#1044 delivered 10:15" />
              {proposed && (
                <>
                  <Line from={now} to={R1049} border="3px dashed var(--brand)" />
                  <Dot at={R1049} kind="proposed" title="Proposed: #1049 Sam Ocampo from Jun · ETA 11:05" />
                  <Label at={R1049} start color="var(--brandInk)">
                    +1 if approved
                  </Label>
                </>
              )}
              {moved && (
                <>
                  <Line from={now} to={R1049} border={`3px solid ${GREY}`} />
                  <Dot at={R1049} kind="next" color={RICO} title="#1049 Sam Ocampo (from Jun) · ETA 11:05" />
                  <Label at={R1049} start color="var(--ink2)">
                    +1 from Jun
                  </Label>
                </>
              )}
              {moved ? (
                <Here at={now} color={RICO} ring="rgba(247,144,9,.35)" title="Rico · on the way to #1049" />
              ) : (
                <Here at={now} color={RICO} ring="" idle title="Rico · idle at hub" />
              )}
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
}
