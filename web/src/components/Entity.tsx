"use client";
// Clickable references to the things the demo is about: people, orders, tickets, policies and agents.
// Every name or ID a person might want to open should go through one of these so it looks and behaves the same everywhere:
//   - inline (default): text with a dotted underline that turns pink on hover, like a link in a sentence;
//   - chip: a small bordered pill for property rows (side by side, sized to content, never wrapping).
// People open their profile card; orders open the order panel; tickets open in Approvals; policies open Autonomy.
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { findPerson, type Person } from "@/lib/people";
import { orderHref, ticketHref } from "@/lib/links";
import { openPerson } from "@/components/Overlays";

type Look = "inline" | "chip";
const MONO = "'IBM Plex Mono', monospace";

const CSS = `
.ham-ent{font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;text-align:inherit;
  text-decoration:underline;text-decoration-style:dotted;text-decoration-color:#98A2B3;text-decoration-thickness:1.5px;text-underline-offset:3px;border-radius:3px;transition:color .12s,text-decoration-color .12s,background .12s}
.ham-ent:hover,.ham-ent:focus-visible{color:var(--brandInk);text-decoration-color:currentColor;text-decoration-style:solid;background:var(--brandTint)}
.ham-chip{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 8px;border:1px solid var(--line);border-radius:6px;background:var(--panel);
  font:inherit;font-size:12px;color:var(--ink2);white-space:nowrap;flex:none;max-width:100%;cursor:pointer;text-decoration:none;transition:border-color .12s,background .12s,color .12s}
.ham-chip:hover,.ham-chip:focus-visible{border-color:var(--line2);background:var(--sub);color:var(--ink)}
.ham-chip .ham-chip-k{color:var(--mute)}
.ham-chips{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
`;
/** Mount once (Overlays does) so every Entity is styled. */
export function EntityStyles() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}

function Mini({ p, size = 16 }: { p: Person; size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: 99,
        background: p.color,
        color: "#fff",
        fontSize: size <= 16 ? 8 : 9,
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "none",
      }}
    >
      {p.initials}
    </span>
  );
}

/** A person by name. Falls back to plain text when the name isn't someone the demo knows. */
export function PersonLink({ name, look = "inline", label, children }: { name: string; look?: Look; label?: string; children?: ReactNode }) {
  const p = findPerson(name);
  if (!p) return <>{children ?? name}</>;
  return (
    <button
      type="button"
      className={look === "chip" ? "ham-chip" : "ham-ent"}
      onClick={(e) => {
        e.stopPropagation();
        openPerson(p, e.currentTarget);
      }}
      aria-label={`${p.name}: open profile`}
    >
      {look === "chip" && label && <span className="ham-chip-k">{label}</span>}
      {look === "chip" && <Mini p={p} />}
      {children ?? p.name}
    </button>
  );
}

function Nav({ href, look, k, children, mono }: { href: string; look: Look; k?: string; children: ReactNode; mono?: boolean }) {
  const style: CSSProperties | undefined = mono ? { fontFamily: MONO } : undefined;
  return (
    <Link href={href} className={look === "chip" ? "ham-chip" : "ham-ent"} onClick={(e) => e.stopPropagation()}>
      {k && <span className="ham-chip-k">{k}</span>}
      <span style={style}>{children}</span>
    </Link>
  );
}

export const OrderLink = ({ id, look = "inline", k, children }: { id: string; look?: Look; k?: string; children?: ReactNode }) => (
  <Nav href={orderHref(id)} look={look} k={k} mono={!children}>
    {children ?? id}
  </Nav>
);
export const TicketLink = ({ id, look = "inline", k, children }: { id: string; look?: Look; k?: string; children?: ReactNode }) => (
  <Nav href={ticketHref(id)} look={look} k={k} mono={!children}>
    {children ?? id}
  </Nav>
);
export const PolicyLink = ({ label, look = "inline", k }: { label: string; look?: Look; k?: string }) => (
  <Nav href="/console/autonomy" look={look} k={k}>
    {label}
  </Nav>
);
/** An agent opens the audit log, where everything it did is listed. */
export const AgentLink = ({ name, look = "inline", k }: { name: string; look?: Look; k?: string }) => (
  <Nav href="/console/audit" look={look} k={k}>
    {look === "chip" && (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--brand)" aria-hidden="true" style={{ marginRight: 4, verticalAlign: "-1px" }}>
        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
      </svg>
    )}
    {name}
  </Nav>
);
/** A non-link property chip (e.g. "Created 09:58"). */
export const Chip = ({ k, children }: { k?: string; children: ReactNode }) => (
  <span className="ham-chip" style={{ cursor: "default" }}>
    {k && <span className="ham-chip-k">{k}</span>}
    {children}
  </span>
);
