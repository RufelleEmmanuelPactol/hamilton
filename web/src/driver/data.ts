"use client";
// Stops on the driver's phone. One list per driver, shaped by the scenario phase (see lib/store.ts),
// with deliveries completed in the app layered on top. Times and order numbers match the Dispatch board.
import { useScenario, type Phase, type Proof } from "@/lib/store";
import { useScenarioFacts } from "@/lib/scenario";

export type Account = "jun" | "ana";

export interface DriverProfile {
  id: Account;
  name: string;
  first: string;
  initials: string;
  color: string;
  vehicle: string;
  plate: string;
  phone: string;
}

export const DRIVERS: Record<Account, DriverProfile> = {
  jun: {
    id: "jun",
    name: "Jun Reyes",
    first: "Jun",
    initials: "JR",
    color: "#2E90FA",
    vehicle: "L300 van",
    plate: "NBC 4412",
    phone: "+63 917 555 0141",
  },
  ana: {
    id: "ana",
    name: "Ana Villanueva",
    first: "Ana",
    initials: "AV",
    color: "#E91E63",
    vehicle: "Sedan",
    plate: "ABK 2207",
    phone: "+63 917 555 0188",
  },
};

export type StopStatus = "done" | "todo" | "moved";

export interface Stop {
  order: string;
  name: string;
  address: string;
  area: string;
  item: string;
  window: string;
  eta: string;
  late?: boolean;
  status: StopStatus;
  /** Delivered time, or who it moved to. */
  doneAt?: string;
  movedTo?: string;
  from?: string;
  phone: string;
  /** Instructions the Messages agent pulled from the customer chat. The first can be a confirmed one. */
  confirmed?: string;
  instructions: string[];
  /** Who can sign for it, most likely first. */
  recipients: string[];
  recipientHint?: string;
  proof?: Proof;
}

type Base = Omit<Stop, "eta" | "status" | "late">;

const S: Record<string, Base> = {
  "#1041": {
    order: "#1041",
    name: "Liza Santos",
    address: "Unit 1203, The Salcedo Park, H.V. dela Costa St, Makati",
    area: "Makati",
    item: "Pink roses",
    window: "09:00–12:00",
    phone: "+63 917 222 1041",
    instructions: ["Leave with the front desk if she's out."],
    recipients: ["Liza Santos", "Front desk"],
  },
  "#1047": {
    order: "#1047",
    name: "Shangri-La events",
    address: "Loading bay B, Shangri-La Plaza, EDSA, Mandaluyong",
    area: "Mandaluyong",
    item: "Event arch",
    window: "10:00–12:00",
    phone: "+63 2 8633 0000",
    instructions: ["Oversized, needs the van.", "Use loading bay B and ask for the events team."],
    recipients: ["Events team", "Loading bay staff"],
  },
  "#1042": {
    order: "#1042",
    name: "Mark Tan",
    address: "Tower 2, Uptown Parksuites, 36th St, BGC",
    area: "BGC",
    item: "Anniversary box",
    window: "10:00–13:00",
    phone: "+63 917 222 1042",
    confirmed: "Leave with lobby concierge, confirmed 10:12",
    instructions: ["Register at lobby desk. Riders not allowed upstairs.", "Get logbook signature. Keep card upright."],
    recipients: ["Lobby concierge", "Mark Tan", "Building guard"],
    recipientHint: "Mark asked to leave it with the lobby concierge.",
  },
  "#1050": {
    order: "#1050",
    name: "Nicole Ramos",
    address: "Unit 7B, Serendra Two, 11th Ave, BGC",
    area: "BGC",
    item: "Orchid pot",
    window: "11:00–15:00",
    phone: "+63 917 222 1050",
    instructions: ["Call when you're at the gate. Guard will buzz you in.", "Keep the pot upright."],
    recipients: ["Nicole Ramos", "Family member", "Building reception"],
  },
  "#1049": {
    order: "#1049",
    name: "Sam Ocampo",
    address: "142 Legazpi St, Legazpi Village, Makati",
    area: "Makati",
    item: "Balloons + roses",
    window: "09:00–13:00",
    phone: "+63 917 222 1049",
    instructions: ["Ground-floor office. Ring the bell twice.", "Balloons are a surprise, don't call ahead."],
    recipients: ["Sam Ocampo", "Office staff"],
  },
  "#1043": {
    order: "#1043",
    name: "Raffles Corporate Ctr",
    address: "Reception, 12th floor, Ortigas Center, Pasig",
    area: "Pasig",
    item: "Office desk arrangement",
    window: "13:00–17:00",
    phone: "+63 2 8631 1043",
    instructions: ["Sign in at the lobby, then take the B elevators.", "Ask for Joy at reception. Keep the vase upright."],
    recipients: ["Reception", "Joy (office manager)", "Lobby guard"],
    recipientHint: "Office closes 17:00. Use lobby reception.",
  },
  "#1044": {
    order: "#1044",
    name: "Ben Cruz",
    address: "8 East Capitol Dr, Kapitolyo, Pasig",
    area: "Pasig",
    item: "Sunflower bundle",
    window: "15:00–17:00",
    phone: "+63 917 222 1044",
    confirmed: "Home 15:00–17:00, confirmed on WhatsApp",
    instructions: ["2 failed attempts before. Message on WhatsApp before you leave."],
    recipients: ["Ben Cruz", "Family member", "Neighbour"],
  },
};

const at = (order: string, eta: string, status: StopStatus = "todo", extra: Partial<Stop> = {}): Stop => ({
  ...S[order],
  eta,
  status,
  ...extra,
});

function baseStops(account: Account, phase: Phase): Stop[] {
  if (account === "jun") {
    const done = [
      at("#1041", "09:24", "done", { doneAt: "09:24" }),
      at("#1047", "10:08", "done", { doneAt: "10:08" }),
    ];
    if (phase === "before") return [...done, at("#1042", "10:50"), at("#1050", "11:25"), at("#1049", "12:10")];
    if (phase === "approved")
      return [
        ...done,
        at("#1042", "12:15", "moved", { movedTo: "Ana" }),
        at("#1050", "12:40", "moved", { movedTo: "Ana" }),
        at("#1049", "11:05", "moved", { movedTo: "Rico" }),
      ];
    return [
      ...done,
      at("#1042", "13:40", "todo", { late: true }),
      at("#1049", "13:55", "todo", { late: true }),
      at("#1050", "14:30"),
    ];
  }
  if (phase === "approved")
    return [
      at("#1042", "12:15", "todo", { from: "Jun" }),
      at("#1050", "12:40", "todo", { from: "Jun" }),
      at("#1043", "13:25"),
      at("#1044", "15:20"),
    ];
  return [at("#1043", "13:10"), at("#1044", "15:10")];
}

/** The signed-in driver's stops for today, in route order, with completed deliveries applied. */
export function useDriverStops() {
  const f = useScenarioFacts();
  const account = useScenario((s) => s.driverAccount);
  const proofs = useScenario((s) => s.proofs);
  const stops = baseStops(account, f.phase).map((s) =>
    s.status === "todo" && proofs[s.order] ? { ...s, status: "done" as const, doneAt: proofs[s.order].at, proof: proofs[s.order] } : s,
  );
  const todo = stops.filter((s) => s.status === "todo");
  const done = stops.filter((s) => s.status === "done");
  const owned = stops.filter((s) => s.status !== "moved");
  return { account, driver: DRIVERS[account], stops, todo, done, owned, next: todo[0] ?? null, facts: f };
}

export function findStop(order: string | null) {
  if (!order) return null;
  return S[order.startsWith("#") ? order : `#${order}`] ?? null;
}
