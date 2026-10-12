import type { Phase } from "./store";

/** Everyone the console can show a profile card for. Numbers match the Drivers and Messages screens. */
export interface Person {
  key: string;
  name: string;
  initials: string;
  color: string;
  kind: "driver" | "owner" | "customer";
  /** One line under the name. */
  role: string;
  phone?: string;
  /** Plain label/value facts for the card. */
  facts: [string, string][];
  links: { label: string; href: string }[];
}

const driver = (
  key: string,
  name: string,
  initials: string,
  color: string,
  role: string,
  phone: string,
  facts: [string, string][],
): Person => ({
  key,
  name,
  initials,
  color,
  kind: "driver",
  role,
  phone,
  facts,
  links: [
    { label: "See route", href: "/console/dispatch" },
    { label: "Driver profile", href: "/console/drivers" },
  ],
});

const customer = (name: string, initials: string, order: string, area: string, note: string): Person => ({
  key: name.toLowerCase().replace(/[^a-z]+/g, "-"),
  name,
  initials,
  color: "#667085",
  kind: "customer",
  role: `Customer · ${area}`,
  phone: `+63 917 222 ${order.replace(/\D/g, "").slice(-4)}`,
  facts: [
    ["Today’s order", order],
    ["Notes", note],
  ],
  links: [
    { label: "Open conversation", href: "/console/messages" },
    { label: "Address book", href: "/console/addresses" },
  ],
});

export const PEOPLE: Person[] = [
  driver("jun", "Jun Reyes", "JR", "#2E90FA", "Driver · L300 van · NBC 4412", "+63 917 555 0141", [
    ["Success (30d)", "97%"],
    ["Joined", "Sep 2024"],
    ["Knows best", "BGC, Makati"],
  ]),
  driver("carlo", "Carlo Mendoza", "CM", "#7A5AF8", "Driver · Motorcycle", "+63 917 555 0172", [
    ["Success (30d)", "94%"],
    ["Joined", "Mar 2025"],
    ["Knows best", "Quezon City, San Juan"],
  ]),
  driver("ana", "Ana Villanueva", "AV", "#E91E63", "Driver · Sedan", "+63 917 555 0188", [
    ["Success (30d)", "95%"],
    ["Joined", "Jan 2025"],
    ["Knows best", "Pasig, Ortigas, BGC"],
  ]),
  driver("rico", "Rico Santos", "RS", "#F79009", "Driver · Motorcycle · new", "+63 917 555 0193", [
    ["Success (30d)", "Too new to say (3 weeks)"],
    ["Joined", "Sep 2026"],
    ["Knows best", "Makati"],
  ]),
  {
    key: "maria",
    name: "Maria Santos",
    initials: "MS",
    color: "#344054",
    kind: "owner",
    role: "Owner · Maria’s Flowers & Gifts",
    phone: "+63 917 555 0100",
    facts: [
      ["Approves", "Tickets that touch money, customers or drivers’ work"],
      ["Plan", "Pilot · 4 drivers"],
    ],
    links: [
      { label: "Autonomy policies", href: "/console/autonomy" },
      { label: "Audit log", href: "/console/audit" },
    ],
  },
  customer("Mark Tan", "MT", "#1042", "BGC", "Can leave with the lobby concierge"),
  customer("Nicole Ramos", "NR", "#1050", "BGC", "Orchid pot · 11:00–15:00"),
  customer("Sam Ocampo", "SO", "#1049", "Makati", "Balloons + roses · 09:00–13:00"),
  customer("Rina Bautista", "RB", "WA-0912", "Makati", "Ordered on WhatsApp · building unclear"),
  customer("Ben Cruz", "BC", "#1044", "Pasig", "2 failed attempts before · confirmed 15:00–17:00"),
  customer("Grace Lee", "GL", "#1048", "San Juan", "Same building as #1052, deliver both together"),
  customer("Anna Garcia", "AG", "#1046", "Quezon City", "Delivered 10:36 · proof verified"),
  customer("Liza Santos", "LS", "#1041", "Makati", "Delivered 09:24 · retake passed"),
  customer("Paolo Lim", "PL", "#1045", "Alabang", "Damage claim · 2 centerpieces wilted (HAM-416)"),
  customer("Joy Villar", "JV", "#1038", "BGC", "Damage claim · box arrived crushed"),
];

const BY_NAME = new Map<string, Person>();
for (const p of PEOPLE) {
  BY_NAME.set(p.name.toLowerCase(), p);
  if (p.kind !== "customer") BY_NAME.set(p.initials.toLowerCase(), p);
}

/** Finds a person from a name ("Jun Reyes"), initials of staff ("JR") or a label that starts with a full name ("Jun Reyes · flat tire"). */
export function findPerson(text: string | null | undefined): Person | null {
  if (!text) return null;
  const t = text.trim().toLowerCase();
  if (!t || t.length > 40) return null;
  const exact = BY_NAME.get(t);
  if (exact) return exact;
  for (const p of PEOPLE) if (t.startsWith(p.name.toLowerCase() + " ·")) return p;
  return null;
}

/** What a driver is doing right now in the scenario. */
export function driverToday(key: string, phase: Phase, junBackOnRoad: boolean): { text: string; tone: "ok" | "info" | "err" | "neutral" } {
  const moved = phase === "approved";
  switch (key) {
    case "jun":
      if (phase === "before") return { text: "En route · next stop #1042", tone: "info" };
      if (junBackOnRoad) return { text: moved ? "Back on the road · 2 delivered, rest handed over" : "Back on the road", tone: "ok" };
      return { text: "Flat tire on EDSA since 10:31", tone: "err" };
    case "carlo":
      return { text: "En route · next stop #1051", tone: "info" };
    case "ana":
      return { text: moved ? "En route · next stop #1042 (from Jun)" : "En route · next stop #1043", tone: "info" };
    case "rico":
      return moved ? { text: "En route · next stop #1049 (from Jun)", tone: "info" } : { text: "Available · 1 delivered", tone: "neutral" };
    default:
      return { text: "", tone: "neutral" };
  }
}
