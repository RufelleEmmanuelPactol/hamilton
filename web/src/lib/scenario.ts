"use client";
import { useEffect, useState } from "react";
import { useScenario, type Phase } from "./store";

/** How long the Dispatch agent appears to "work" after Jun's report before HAM-417 shows up. */
export const AGENT_THINK_MS = 2400;

/** True while the scripted agent is "working" (a short window after an event at `since`). */
export function useThinking(since: number | null, ms = AGENT_THINK_MS) {
  const [now, setNow] = useState(() => Date.now());
  const active = since !== null && since > 0 && now - since < ms;
  useEffect(() => {
    if (!active || since === null) return;
    const t = setTimeout(() => setNow(Date.now()), ms - (Date.now() - since) + 20);
    return () => clearTimeout(t);
  }, [active, since, ms]);
  return active;
}

/** The scenario clock shown in "updated 10:42" style labels. */
export function clockFor(phase: Phase) {
  return phase === "before" ? "10:30" : phase === "incident" ? "10:42" : "10:44";
}

/** Numbers that several screens show. Keep them consistent by reading them from here. */
export function useScenarioFacts() {
  const s = useScenario();
  const thinking = useThinking(s.reportedAt);
  const phase = s.phase;
  // While the agent is still working, HAM-417 doesn't exist yet.
  const ticketOpen = phase === "incident" && !thinking;
  const moved = phase === "approved";
  return {
    phase,
    thinking: phase === "incident" && thinking,
    clock: clockFor(phase),
    /** HAM-417 is waiting in Approvals. */
    ticketOpen,
    /** Jun's 3 stops have moved to Ana and Rico. */
    moved,
    junIncident: phase !== "before",
    /** Deliveries whose ETA is past the end of their window (see HANDOFF §9.3). */
    atRisk: phase === "incident" || phase === "rejected" ? 2 : 0,
    /** Pending + escalated tickets in Approvals: HAM-414, HAM-416, and HAM-417 while open. */
    approvalsCount: ticketOpen ? 3 : 2,
    delivered: 5,
    totalOrders: 13,
    notifyCustomers: s.notifyCustomers,
    report: s.report,
    junBackOnRoad: s.junBackOnRoad,
  };
}

export interface AuditEvent {
  time: string;
  event: string;
  agent: string;
  outcome: "Auto" | "Held" | "Approved" | "Rejected" | "Sent" | "Logged";
  policy: string;
  ref: string;
  detail?: { input: string; decision: string; effects: string };
}

/** Scenario events, newest first, to put above the seed rows in the audit log. */
export function scenarioEvents(phase: Phase, notify: boolean): AuditEvent[] {
  if (phase === "before") return [];
  const ev: AuditEvent[] = [
    {
      time: "10:33",
      event: "Proposed moving 3 stops from Jun to Ana and Rico",
      agent: "Dispatch agent",
      outcome: "Held",
      policy: "Reassign stops · Ask me, auto if 1 stop or fewer",
      ref: "HAM-417",
      detail: {
        input: "Jun: flat tire, about 1 hour. 3 stops left: #1042, #1050, #1049. #1042 and #1049 would arrive 40–85 min late.",
        decision: "Move #1042 and #1050 to Ana, #1049 to Rico. All 3 windows hold. +9 km.",
        effects: "Held by policy: 3 stops is above the 1-stop auto limit. Opened HAM-417 for Maria.",
      },
    },
    {
      time: "10:32",
      event: "Found nearest vulcanizing shop for Jun (600 m, Kalayaan Ave)",
      agent: "Dispatch agent",
      outcome: "Auto",
      policy: "Driver help · Auto",
      ref: "Jun Reyes",
    },
    {
      time: "10:31",
      event: "Jun reported a flat tire on EDSA near Guadalupe",
      agent: "Driver app",
      outcome: "Logged",
      policy: "—",
      ref: "Jun Reyes",
    },
  ];
  if (phase === "approved") {
    const after: AuditEvent[] = [
      {
        time: "10:44",
        event: notify ? "Sent new arrival times to 3 customers on WhatsApp" : "Updated arrival times (customers not notified)",
        agent: "Messages agent",
        outcome: notify ? "Sent" : "Auto",
        policy: "Customer ETA updates · Auto",
        ref: "#1042 #1050 #1049",
      },
      {
        time: "10:44",
        event: "Re-sequenced Ana and Rico’s routes",
        agent: "Dispatch agent",
        outcome: "Auto",
        policy: "Follows an approved ticket",
        ref: "HAM-417",
      },
      {
        time: "10:44",
        event: "Maria approved: reassign 3 stops from Jun",
        agent: "Maria Santos",
        outcome: "Approved",
        policy: "Reassign stops · Ask me",
        ref: "HAM-417",
      },
    ];
    return [...after, ...ev];
  }
  if (phase === "rejected") {
    return [
      {
        time: "10:44",
        event: "Maria rejected: Jun keeps his 3 stops",
        agent: "Maria Santos",
        outcome: "Rejected",
        policy: "Reassign stops · Ask me",
        ref: "HAM-417",
      },
      ...ev,
    ];
  }
  return ev;
}
