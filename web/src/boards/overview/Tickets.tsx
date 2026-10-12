"use client";
import { useRef, type ReactNode } from "react";
import { useFlip } from "@/lib/flip";
import { useScenarioFacts } from "@/lib/scenario";
import { AgentWorking, minutesBetween } from "./ui";
import { ticketHref } from "@/lib/links";

function Ticket({ id, icon, title, meta, age, last }: { id: string; icon: ReactNode; title: string; meta: ReactNode; age: number; last?: boolean }) {
  return (
    <a
      href={ticketHref(id)}
      data-flip={id}
      className="ham-in ham-ticket"
      style={{
        display: "grid",
        gridTemplateColumns: "16px 1fr auto",
        gap: "4px 10px",
        alignItems: "center",
        padding: "11px 14px",
        borderBottom: last ? undefined : "1px solid var(--line)",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {icon}
      <span style={{ fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</span>
      <span
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "99px",
          background: "#344054",
          color: "#fff",
          fontSize: "9px",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        title="Assigned to Maria"
      >
        MS
      </span>
      <span />
      <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--mute)", whiteSpace: "nowrap" }}>
        {meta}
      </span>
      <span style={{ fontSize: "12px", color: "var(--mute)", whiteSpace: "nowrap" }}>{age}m</span>
    </a>
  );
}

const mono = { fontFamily: "'IBM Plex Mono', monospace" };

export function OpenTickets() {
  const f = useScenarioFacts();
  const age = (created: string) => minutesBetween(created, f.clock);
  const SLA = 15; // minutes Maria has to answer an urgent dispatch ticket

  const ref = useRef<HTMLElement>(null);
  useFlip(ref);
  return (
    <section
      ref={ref}
      aria-label="Open tickets"
      style={{
        flex: "1 1 300px",
        minWidth: "0",
        background: "var(--panel)",
        border: "1px solid var(--line)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", borderBottom: "1px solid var(--line)" }}>
        <h2 style={{ margin: "0", fontSize: "14px", fontWeight: 600 }}>Open tickets</h2>
        <span style={{ color: "var(--mute)" }}>{f.approvalsCount}</span>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: "var(--err)",
            background: "var(--errBg)",
            border: "1px solid var(--errLine)",
            borderRadius: "4px",
            padding: "0 5px",
            whiteSpace: "nowrap",
          }}
        >
          1 escalated
        </span>
        <span style={{ flex: "1" }} />
        <a href="/app/approvals" style={{ fontWeight: 500, textDecoration: "none" }}>
          View queue
        </a>
      </div>
      {f.thinking && (
        <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)" }}>
          <AgentWorking />
        </div>
      )}
      {f.ticketOpen && (
        <Ticket
          id="HAM-417"
          icon={
            <svg width="14" height="14" viewBox="0 0 16 16" aria-label="Urgent priority" role="img">
              <rect width="16" height="16" rx="3" fill="#F04438" />
              <path d="M8 4v5M8 11.5v.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          }
          title="Reassign 3 stops from Jun"
          meta={
            <>
              <span style={mono}>HAM-417</span>
              <span>Dispatch</span>
              <span style={{ color: "var(--warn)" }}>SLA {Math.max(0, SLA - age("10:33"))}m</span>
            </>
          }
          age={age("10:33")}
        />
      )}
      <Ticket
          id="HAM-414"
        icon={
          <svg width="14" height="14" viewBox="0 0 16 16" aria-label="Medium priority" role="img">
            <rect x="1" y="9" width="3" height="5" rx="1" fill="#344054" />
            <rect x="6.5" y="5" width="3" height="9" rx="1" fill="#344054" />
            <rect x="12" y="1" width="3" height="13" rx="1" fill="#D0D5DD" />
          </svg>
        }
        title="Create order from WhatsApp · Rina Bautista"
        meta={
          <>
            <span style={mono}>HAM-414</span>
            <span>Intake</span>
            <span>Address unclear</span>
          </>
        }
        age={age("10:15")}
      />
      <Ticket
          id="HAM-416"
        icon={
          <svg width="14" height="14" viewBox="0 0 16 16" aria-label="High priority" role="img">
            <rect x="1" y="9" width="3" height="5" rx="1" fill="#344054" />
            <rect x="6.5" y="5" width="3" height="9" rx="1" fill="#344054" />
            <rect x="12" y="1" width="3" height="13" rx="1" fill="#344054" />
          </svg>
        }
        title="Refund request · Paolo Lim #1045"
        meta={
          <>
            <span style={mono}>HAM-416</span>
            <span>Escalated</span>
            <span>Refunds never auto</span>
          </>
        }
        age={age("10:27")}
        last
      />
    </section>
  );
}
