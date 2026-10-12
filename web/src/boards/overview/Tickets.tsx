"use client";
import { useRef, type ReactNode } from "react";
import { useFlip } from "@/lib/flip";
import { useScenarioFacts } from "@/lib/scenario";
import { AgentWorking, minutesBetween } from "./ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ticketHref } from "@/lib/links";
import { AgentLink, Chip, OrderLink, PersonLink, PolicyLink, TicketLink } from "@/components/Entity";

function Ticket({
  id,
  icon,
  title,
  meta,
  age,
  last,
}: {
  id: string;
  icon: ReactNode;
  title: ReactNode;
  meta: ReactNode;
  age: number;
  last?: boolean;
}) {
  const router = useRouter();
  // The whole row opens the ticket; names, IDs and policies inside it open their own thing.
  return (
    <div
      data-flip={id}
      className="ham-in ham-ticket"
      onClick={() => router.push(ticketHref(id))}
      style={{
        display: "grid",
        gridTemplateColumns: "16px 1fr auto",
        gap: "6px 10px",
        alignItems: "center",
        padding: "11px 14px",
        borderBottom: last ? undefined : "1px solid var(--line)",
        cursor: "pointer",
      }}
    >
      {icon}
      <span style={{ fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }}>{title}</span>
      <PersonLink name="Maria Santos">
        <span
          title="Assigned to Maria"
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "99px",
            background: "#344054",
            color: "#fff",
            fontSize: "9px",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            verticalAlign: "middle",
          }}
        >
          MS
        </span>
      </PersonLink>
      <span />
      <span className="ham-chips" style={{ fontSize: "12px", color: "var(--mute)" }}>
        <TicketLink id={id} look="chip" />
        {meta}
      </span>
      <span style={{ fontSize: "12px", color: "var(--mute)", whiteSpace: "nowrap" }}>{age}m</span>
    </div>
  );
}

/** Ticket title: the action opens the ticket, so it stays a real link for keyboard users. */
const Title = ({ id, children }: { id: string; children: ReactNode }) => (
  <Link href={ticketHref(id)} onClick={(e) => e.stopPropagation()} style={{ color: "inherit", textDecoration: "none" }}>
    {children}
  </Link>
);

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
        <a href="/console/approvals" style={{ fontWeight: 500, textDecoration: "none" }}>
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
          title={
            <>
              <Title id="HAM-417">Reassign 3 stops from</Title> <PersonLink name="Jun Reyes">Jun</PersonLink>
            </>
          }
          meta={
            <>
              <AgentLink name="Dispatch agent" look="chip" />
              <span style={{ color: "var(--warn)", whiteSpace: "nowrap" }}>Due in {Math.max(0, SLA - age("10:33"))}m</span>
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
        title={
          <>
            <Title id="HAM-414">Create order from WhatsApp</Title> · <PersonLink name="Rina Bautista" />
          </>
        }
        meta={
          <>
            <AgentLink name="Intake agent" look="chip" />
            <Chip>Building unclear</Chip>
          </>
        }
        age={age("09:58")}
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
        title={
          <>
            <Title id="HAM-416">Refund request</Title> · <PersonLink name="Paolo Lim" /> <OrderLink id="#1045" />
          </>
        }
        meta={
          <>
            <Chip>Escalated</Chip>
            <PolicyLink label="Refunds never auto" look="chip" />
          </>
        }
        age={age("10:27")}
        last
      />
    </section>
  );
}
