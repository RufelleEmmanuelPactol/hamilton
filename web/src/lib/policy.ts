/**
 * Autonomy policy check. This part is real code, not scripted: agents propose actions,
 * and this function decides whether they run on their own, need a person, or are never allowed.
 * Swapping the scripted agents for real models would not change this file.
 */
export type Mode = "auto" | "auto_if" | "ask" | "never";

export interface Policy {
  id: string;
  label: string;
  mode: Mode;
  /** For auto_if: the largest number of affected items that may run automatically. */
  autoLimit?: number;
}

export type Proposal =
  | { kind: "reassign_stops"; stops: string[]; from: string; to: Record<string, string> }
  | { kind: "refund"; order: string; amount: number }
  | { kind: "notify_customers"; orders: string[] };

export const POLICIES: Record<Proposal["kind"], Policy> = {
  reassign_stops: { id: "reassign", label: "Reassign stops", mode: "auto_if", autoLimit: 1 },
  refund: { id: "money", label: "Refunds, credits or discounts", mode: "never" },
  notify_customers: { id: "eta", label: "Customer ETA updates", mode: "auto" },
};

export type Verdict =
  | { outcome: "run"; policy: Policy; reason: string }
  | { outcome: "ask"; policy: Policy; reason: string }
  | { outcome: "block"; policy: Policy; reason: string };

export function check(p: Proposal): Verdict {
  const policy = POLICIES[p.kind];
  switch (policy.mode) {
    case "auto":
      return { outcome: "run", policy, reason: `${policy.label} run on their own.` };
    case "never":
      return { outcome: "block", policy, reason: `${policy.label} are never automated. A person decides.` };
    case "ask":
      return { outcome: "ask", policy, reason: `${policy.label} always ask you.` };
    case "auto_if": {
      const n = p.kind === "reassign_stops" ? p.stops.length : 0;
      const limit = policy.autoLimit ?? 0;
      return n <= limit
        ? { outcome: "run", policy, reason: `Moving ${n} stop${n === 1 ? "" : "s"} is within the ${limit}-stop auto limit.` }
        : { outcome: "ask", policy, reason: `${n} stops is above the ${limit}-stop auto limit.` };
    }
  }
}

/** The Dispatch agent's scripted proposal after Jun's flat tire. */
export const HAM_417: Proposal = {
  kind: "reassign_stops",
  from: "Jun",
  stops: ["#1042", "#1050", "#1049"],
  to: { "#1042": "Ana", "#1050": "Ana", "#1049": "Rico" },
};
