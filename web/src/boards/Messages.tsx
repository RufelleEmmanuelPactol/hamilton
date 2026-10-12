"use client";
// Converted from design/project/Messages.dc.html, then wired to the scenario store.
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useScenarioFacts } from "@/lib/scenario";
import { check } from "@/lib/policy";
import type { Phase } from "@/lib/store";

type Handling = "needs" | "assistant" | "auto";
type Tone = "info" | "ok" | "err" | "mute";

type Msg =
  | { k: "bot"; time: string; text: string }
  | { k: "cust"; time: string; text: string; detected?: string }
  | { k: "maria"; time: string; text: string }
  | { k: "sys"; text: ReactNode; clock?: boolean }
  | { k: "blocked"; ticket: string; order: string; amount: number }
  | { k: "triage" };

interface Convo {
  id: string;
  name: string;
  initials: string;
  order: string;
  phone: string;
  time: string;
  preview: string;
  topic: string;
  handling: Handling | null; // null while triage is still reading the message
  label?: string;
  item: string;
  window: ReactNode;
  driver: ReactNode;
  status: { text: string; tone: Tone };
  address: string;
  tags: { text: string; warn?: boolean }[];
  memory?: ReactNode;
  why: ReactNode;
  messages: Msg[];
}

const mono: CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };
const mute: CSSProperties = { color: "var(--mute)" };

function minutesSince(from: string, to: string) {
  const m = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
  return Math.max(0, m(to) - m(from));
}

const Sparkle = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
  </svg>
);

const Dots = () => (
  <span aria-hidden="true" style={{ display: "inline-flex", gap: "2px", marginLeft: "2px" }}>
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        style={{
          width: "3px",
          height: "3px",
          borderRadius: "99px",
          background: "currentColor",
          animation: `hamDots 1s ${i * 0.15}s infinite`,
        }}
      />
    ))}
  </span>
);

/* ---------- Scripted conversations ---------- */

function baseConvos(phase: Phase, notify: boolean, clock: string): Convo[] {
  const before = phase === "before";
  const late = phase === "incident" || phase === "rejected";
  const moved = phase === "approved";

  const paolo: Convo = {
    id: "paolo",
    name: "Paolo Lim",
    initials: "PL",
    order: "#1045",
    phone: "+63 917 222 1045",
    time: "10:27",
    preview: "2 of the centerpieces look wilted, can I get a refund?",
    topic: "Damage claim",
    handling: "needs",
    label: `Waiting on you · ${minutesSince("10:27", clock)} min`,
    item: "Table centerpieces (6)",
    window: "08:30–11:00",
    driver: "Carlo Mendoza",
    status: { text: "Delivered 09:02", tone: "ok" },
    address: "Bellevue Hotel, Alabang",
    tags: [{ text: "Event order" }],
    memory: "Deliver to the banquet office, 2nd floor",
    why: (
      <>
        Refunds are never automated. Holding reply and photo request sent, no refund promised.{" "}
        <a href="/console/approvals?t=HAM-416" style={{ textDecoration: "none", fontWeight: 500 }}>
          HAM-416
        </a>{" "}
        is in Approvals.
      </>
    ),
    messages: [
      {
        k: "cust",
        time: "10:27",
        text: "2 of the centerpieces look wilted, can I get a refund?",
        detected: "English · intent: refund for damaged items",
      },
      {
        k: "bot",
        time: "10:27",
        text: "Sorry to hear that, Paolo. Could you send a photo of the 2 centerpieces? Maria will look at it personally and get back to you today.",
      },
      { k: "blocked", ticket: "HAM-416", order: "#1045", amount: 1800 },
    ],
  };

  const benReplied = !before;
  const ben: Convo = {
    id: "ben",
    name: "Ben Cruz",
    initials: "BC",
    order: "#1044",
    phone: "+63 917 222 1004",
    time: benReplied ? "10:41" : "09:12",
    preview: benReplied ? "Got it Ben, 3–5pm it is." : "Hi Ben! Your delivery arrives around 11:00am…",
    topic: benReplied ? "Reschedule" : "Pre-confirmation",
    handling: "assistant",
    label: benReplied ? "Assistant replied" : "Waiting for reply",
    item: "Sunflower bundle",
    window: benReplied ? (
      <>
        15:00–17:00 <span style={mute}>(was 11–15)</span>
      </>
    ) : (
      "11:00–15:00"
    ),
    driver: "Ana Villanueva",
    status: { text: "Scheduled", tone: "info" },
    address: "8 East Capitol Dr, Kapitolyo",
    tags: [{ text: "2 failed attempts", warn: true }, { text: "Rarely answers calls" }],
    memory: benReplied ? (
      <>
        Best time: after 3pm on weekdays <span style={{ color: "var(--ok)" }}>(new)</span>
      </>
    ) : (
      "Best time: not known yet"
    ),
    why: "Policy: pre-confirm addresses with 2+ failed attempts.",
    messages: [
      {
        k: "bot",
        time: "09:12",
        text: "Hi Ben! Your Maria's Flowers delivery arrives around 11:00am. Will someone be home to receive it? Reply YES, a better time, or who can receive it for you.",
      },
      ...(benReplied
        ? ([
            { k: "cust", time: "10:40", text: "wala pa ako sa bahay, after 3pm pa po", detected: "Tagalog · intent: not home until 15:00" },
            {
              k: "sys",
              clock: true,
              text: (
                <>
                  #1044 rescheduled to 15:00–17:00 · Ana&#39;s route re-sequenced · <b style={{ color: "var(--ink2)" }}>Auto</b>
                </>
              ),
            },
            {
              k: "bot",
              time: "10:41",
              text: "Got it Ben, we'll deliver between 3:00 and 5:00pm. You'll get a message when the driver is on the way.",
            },
            {
              k: "sys",
              text: (
                <>
                  Saved to address book: &#34;Home after 3pm on weekdays&#34; · <b style={{ color: "var(--ink2)" }}>Auto</b>
                </>
              ),
            },
          ] as Msg[])
        : []),
    ],
  };

  // #1042 Mark Tan: Jun's next stop. Late during the incident, moved to Ana after approval.
  const markMsgs: Msg[] = [
    {
      k: "cust",
      time: "10:11",
      text: "Hi, I'm at work until 6. Can you leave it with the concierge?",
      detected: "English · intent: leave with concierge",
    },
    {
      k: "sys",
      text: (
        <>
          Drop-off saved: lobby concierge (customer said yes in writing) · <b style={{ color: "var(--ink2)" }}>Auto</b>
        </>
      ),
    },
    { k: "bot", time: "10:12", text: "No problem, Mark. We'll leave it with the concierge and send you a photo when it's delivered." },
  ];
  let mark: Convo = {
    id: "mark",
    name: "Mark Tan",
    initials: "MT",
    order: "#1042",
    phone: "+63 917 222 1042",
    time: "10:12",
    preview: "We'll leave it with the concierge.",
    topic: "Drop-off instructions",
    handling: "assistant",
    label: "Assistant replied",
    item: "Anniversary box",
    window: "10:00–13:00",
    driver: moved ? (
      <>
        Ana Villanueva <span style={mute}>(was Jun)</span>
      </>
    ) : (
      "Jun Reyes"
    ),
    status: late
      ? { text: "Late · ETA 13:40", tone: "err" }
      : moved
        ? { text: "On time · ETA 12:15", tone: "ok" }
        : { text: "Next stop", tone: "info" },
    address: "Uptown Parksuites, BGC",
    tags: [{ text: "Concierge drop-off OK" }],
    memory: "Leave with the lobby concierge",
    why: "Policy: concierge drop-off runs alone with the customer's written yes. Mark gave it.",
    messages: markMsgs,
  };

  const extra: Convo[] = [];
  if (moved && notify) {
    mark = {
      ...mark,
      time: "10:44",
      preview: "Your delivery now arrives around 12:15pm with Ana.",
      topic: "New arrival time sent",
      handling: "auto",
      label: "Automatic",
      why: "Policy: customer arrival-time updates run on their own (Auto). Sent after you approved HAM-417.",
      messages: [
        ...markMsgs,
        {
          k: "sys",
          clock: true,
          text: (
            <>
              #1042 moved from Jun to Ana · HAM-417 approved by Maria · <b style={{ color: "var(--ink2)" }}>10:44</b>
            </>
          ),
        },
        {
          k: "bot",
          time: "10:44",
          text: "Hi Mark, a quick update: your delivery now arrives around 12:15pm with Ana, still within your window. It will still go to the concierge.",
        },
      ],
    };
    extra.push(
      {
        id: "nicole",
        name: "Nicole Ramos",
        initials: "NR",
        order: "#1050",
        phone: "+63 917 222 1050",
        time: "10:44",
        preview: "Your orchid now arrives around 12:40pm with Ana.",
        topic: "New arrival time sent",
        handling: "auto",
        label: "Automatic",
        item: "Orchid pot",
        window: "11:00–15:00",
        driver: (
          <>
            Ana Villanueva <span style={mute}>(was Jun)</span>
          </>
        ),
        status: { text: "On time · ETA 12:40", tone: "ok" },
        address: "One Serendra, BGC",
        tags: [],
        memory: "No notes yet",
        why: "Policy: customer arrival-time updates run on their own (Auto). Sent after you approved HAM-417.",
        messages: [
          {
            k: "sys",
            clock: true,
            text: (
              <>
                #1050 moved from Jun to Ana · HAM-417 approved by Maria · <b style={{ color: "var(--ink2)" }}>10:44</b>
              </>
            ),
          },
          {
            k: "bot",
            time: "10:44",
            text: "Hi Nicole! A quick update from Maria's Flowers: your orchid now arrives around 12:40pm with Ana, within your 11:00am–3:00pm window.",
          },
        ],
      },
      {
        id: "sam",
        name: "Sam Ocampo",
        initials: "SO",
        order: "#1049",
        phone: "+63 917 222 1049",
        time: "10:44",
        preview: "Your balloons and roses now arrive around 11:05am with Rico.",
        topic: "New arrival time sent",
        handling: "auto",
        label: "Automatic",
        item: "Balloons + roses",
        window: "09:00–13:00",
        driver: (
          <>
            Rico Santos <span style={mute}>(was Jun)</span>
          </>
        ),
        status: { text: "On time · ETA 11:05", tone: "ok" },
        address: "Salcedo Village, Makati",
        tags: [],
        memory: "No notes yet",
        why: "Policy: customer arrival-time updates run on their own (Auto). Sent after you approved HAM-417.",
        messages: [
          {
            k: "sys",
            clock: true,
            text: (
              <>
                #1049 moved from Jun to Rico · HAM-417 approved by Maria · <b style={{ color: "var(--ink2)" }}>10:44</b>
              </>
            ),
          },
          {
            k: "bot",
            time: "10:44",
            text: "Hi Sam! A quick update from Maria's Flowers: your balloons and roses now arrive around 11:05am with Rico.",
          },
        ],
      },
    );
  }
  if (phase === "rejected") {
    mark = {
      ...mark,
      time: "10:44",
      preview: "Sorry, your delivery is running late. New time: about 1:40pm.",
      topic: "Late delivery apology",
      handling: "auto",
      label: "Automatic",
      why: "Policy: customer arrival-time updates run on their own (Auto). Sent after you kept #1042 on Jun's route.",
      messages: [
        ...markMsgs,
        {
          k: "bot",
          time: "10:44",
          text: "Hi Mark, we're sorry: your delivery is running late because of a flat tire on our van. It now arrives around 1:40pm and will still go to the concierge.",
        },
      ],
    };
    extra.push({
      id: "sam",
      name: "Sam Ocampo",
      initials: "SO",
      order: "#1049",
      phone: "+63 917 222 1049",
      time: "10:44",
      preview: "Sorry, your delivery is running late. New time: about 1:55pm.",
      topic: "Late delivery apology",
      handling: "auto",
      label: "Automatic",
      item: "Balloons + roses",
      window: "09:00–13:00",
      driver: "Jun Reyes",
      status: { text: "Late · ETA 13:55", tone: "err" },
      address: "Salcedo Village, Makati",
      tags: [],
      memory: "No notes yet",
      why: "Policy: customer arrival-time updates run on their own (Auto). Sent after you kept #1049 on Jun's route.",
      messages: [
        {
          k: "bot",
          time: "10:44",
          text: "Hi Sam, we're sorry: your delivery is running late because of a flat tire on our van. It now arrives around 1:55pm.",
        },
      ],
    });
  }

  const anna: Convo = {
    id: "anna",
    name: "Anna Garcia",
    initials: "AG",
    order: "#1046",
    phone: "+63 917 222 1046",
    time: before ? "10:12" : "10:36",
    preview: before ? "Carlo is on the way" : "Delivered · photo sent",
    topic: "Delivery update",
    handling: "auto",
    label: "Automatic",
    item: "Get-well basket",
    window: "10:00–16:00",
    driver: "Carlo Mendoza",
    status: before ? { text: "Out for delivery", tone: "info" } : { text: "Delivered 10:36", tone: "ok" },
    address: "St. Luke's Medical Center, BGC",
    tags: [{ text: "Hospital" }],
    memory: "Leave at the info desk, ward 4B",
    why: "Policy: delivery updates run on their own (Auto).",
    messages: [
      { k: "bot", time: "10:12", text: "Hi Anna! Carlo is on the way with your get-well basket. He should arrive around 10:35am." },
      ...(before
        ? []
        : ([
            { k: "bot", time: "10:36", text: "Delivered at 10:36 and left at the ward 4B info desk. Here's the photo: [proof photo]" },
          ] as Msg[])),
    ],
  };
  const shangri: Convo = {
    id: "shangri",
    name: "Shangri-La events",
    initials: "SL",
    order: "#1047",
    phone: "+63 2 8820 0888",
    time: "10:08",
    preview: "Delivered · loading bay B",
    topic: "Delivery update",
    handling: "auto",
    label: "Automatic",
    item: "Event arch",
    window: "10:00–12:00",
    driver: "Jun Reyes",
    status: { text: "Delivered 10:08", tone: "ok" },
    address: "Shangri-La The Fort, BGC",
    tags: [{ text: "Corporate" }],
    memory: "Oversized: loading bay B, ask for events team",
    why: "Policy: delivery updates run on their own (Auto).",
    messages: [
      { k: "bot", time: "09:40", text: "Hi! Jun is on the way with the event arch. He'll use loading bay B and arrive around 10:05am." },
      { k: "bot", time: "10:08", text: "Delivered at 10:08 at loading bay B. Received by the events team. Proof photo attached." },
    ],
  };
  const liza: Convo = {
    id: "liza",
    name: "Liza Santos",
    initials: "LS",
    order: "#1041",
    phone: "+63 917 222 1041",
    time: "09:24",
    preview: "Delivered · received by Ate Nena",
    topic: "Delivery update",
    handling: "auto",
    label: "Automatic",
    item: "Pink roses",
    window: "09:00–12:00",
    driver: "Jun Reyes",
    status: { text: "Delivered 09:24", tone: "ok" },
    address: "Valle Verde 2, Pasig",
    tags: [],
    memory: "Housekeeper (Ate Nena) can receive",
    why: "Policy: delivery updates run on their own (Auto).",
    messages: [
      { k: "bot", time: "09:02", text: "Hi Liza! Jun is on the way with your pink roses. He should arrive around 9:20am." },
      { k: "bot", time: "09:24", text: "Delivered at 09:24 and received by Ate Nena. Proof photo attached." },
    ],
  };

  return [...extra, paolo, ben, mark, anna, shangri, liza];
}

/* ---------- Simulated incoming messages (scripted triage, no model calls) ---------- */

type PresetId = "eta" | "resched" | "damage";
interface Sim {
  id: PresetId;
  time: string;
  done: boolean;
}

const PRESETS: { id: PresetId; text: string; who: string }[] = [
  { id: "eta", text: "where na po yung order ko? #1051", who: "Prof. Diaz · #1051" },
  { id: "resched", text: "can you deliver tomorrow instead, 2pm?", who: "Grace Lee · #1048" },
  { id: "damage", text: "the box arrived crushed and the cake is ruined", who: "Joy Villar · #1038" },
];

function simConvo(sim: Sim): Convo {
  const t = sim.time;
  const p = PRESETS.find((x) => x.id === sim.id)!;
  const triaging: Msg[] = [{ k: "triage" }];
  if (sim.id === "eta") {
    return {
      id: "sim-eta",
      name: "Prof. Diaz",
      initials: "PD",
      order: "#1051",
      phone: "+63 917 222 1051",
      time: t,
      preview: sim.done ? "Your order is with Carlo and arrives around 11:05am." : p.text,
      topic: "Where's my order",
      handling: sim.done ? "auto" : null,
      label: "Automatic",
      item: "Retirement arrangement",
      window: "11:00–15:00",
      driver: "Carlo Mendoza",
      status: { text: "On time · ETA 11:05", tone: "ok" },
      address: "UP Diliman, Quezon City",
      tags: [],
      memory: "Call the recipient when you arrive",
      why: "Policy: \"where's my order?\" replies (Auto) · uses Carlo's live ETA",
      messages: [
        { k: "cust", time: t, text: p.text, detected: sim.done ? "Taglish · intent: asking where #1051 is" : undefined },
        ...(sim.done
          ? ([
              {
                k: "bot",
                time: t,
                text: "Hi! Your order #1051 is with Carlo and arrives around 11:05am, on time. We'll message you when he's 10 minutes away.",
              },
            ] as Msg[])
          : triaging),
      ],
    };
  }
  if (sim.id === "resched") {
    return {
      id: "sim-resched",
      name: "Grace Lee",
      initials: "GL",
      order: "#1048",
      phone: "+63 917 222 1048",
      time: t,
      preview: sim.done ? "We can deliver tomorrow between 1:00 and 3:00pm." : p.text,
      topic: "Reschedule",
      handling: sim.done ? "assistant" : null,
      label: "Assistant replied",
      item: "White lilies + bouquet",
      window: "13:00–18:00",
      driver: "Carlo Mendoza",
      status: { text: "Scheduled", tone: "info" },
      address: "Greenhills, San Juan",
      tags: [],
      memory: "Same building as #1052, deliver both together",
      why: "Policy: offering open slots (Auto) · moving to another date asks you",
      messages: [
        { k: "cust", time: t, text: p.text, detected: sim.done ? "English · intent: move to tomorrow, around 14:00" : undefined },
        ...(sim.done
          ? ([
              {
                k: "bot",
                time: t,
                text: "Sure, Grace. We can deliver tomorrow (Tue 13 Oct) between 1:00 and 3:00pm. Reply YES to confirm.",
              },
              { k: "sys", text: "Waiting for Grace · date change needs your approval" },
            ] as Msg[])
          : triaging),
      ],
    };
  }
  return {
    id: "sim-damage",
    name: "Joy Villar",
    initials: "JV",
    order: "#1038",
    phone: "+63 917 222 1038",
    time: t,
    preview: p.text,
    topic: "Damage claim",
    handling: sim.done ? "needs" : null,
    label: "Waiting on you · just now",
    item: "Chocolate cake + roses",
    window: "Yesterday 14:00–18:00",
    driver: "Rico Santos",
    status: { text: "Delivered yesterday", tone: "ok" },
    address: "Kapitolyo, Pasig",
    tags: [],
    memory: "No notes yet",
    why: (
      <>
        Refunds are never automated. Holding reply and photo request sent, no refund promised.{" "}
        <a href="/console/approvals" style={{ textDecoration: "none", fontWeight: 500 }}>
          HAM-418
        </a>{" "}
        is in Approvals.
      </>
    ),
    messages: [
      { k: "cust", time: t, text: p.text, detected: sim.done ? "English · intent: damaged on arrival, wants it made right" : undefined },
      ...(sim.done
        ? ([
            {
              k: "bot",
              time: t,
              text: "We're so sorry, Joy. Could you send a photo of the box and the cake? Maria will look at it personally and get back to you today.",
            },
            { k: "blocked", ticket: "HAM-418", order: "#1038", amount: 2400 },
          ] as Msg[])
        : triaging),
    ],
  };
}

/* ---------- Small pieces ---------- */

const tabBase: CSSProperties = {
  font: "inherit",
  fontSize: "12px",
  height: "26px",
  padding: "0 7px",
  borderRadius: "6px",
  cursor: "pointer",
  whiteSpace: "nowrap",
};
const tabOn: CSSProperties = {
  ...tabBase,
  fontWeight: 600,
  border: "1px solid var(--line2)",
  background: "var(--sub)",
  color: "var(--ink)",
};
const tabOff: CSSProperties = { ...tabBase, border: "1px solid transparent", background: "none", color: "var(--ink2)" };
const chip: CSSProperties = {
  font: "inherit",
  fontSize: "12px",
  height: "26px",
  padding: "0 7px",
  border: "1px solid var(--line2)",
  borderRadius: "6px",
  background: "var(--panel)",
  color: "var(--ink2)",
  cursor: "pointer",
  whiteSpace: "nowrap",
};
const bubble: CSSProperties = {
  marginTop: "3px",
  background: "var(--panel)",
  border: "1px solid var(--line)",
  borderRadius: "8px",
  padding: "8px 11px",
  lineHeight: "1.5",
};
const sectionLabel: CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "var(--mute)",
};

function StatusTag({ s }: { s: Convo["status"] }) {
  const c: Record<Tone, [string, string, string]> = {
    info: ["var(--info)", "var(--infoBg)", "var(--infoLine)"],
    ok: ["var(--ok)", "var(--okBg)", "var(--okLine)"],
    err: ["var(--err)", "var(--errBg)", "var(--errLine)"],
    mute: ["var(--ink2)", "var(--panel)", "var(--line2)"],
  };
  const [color, bg, line] = c[s.tone];
  return (
    <span
      style={{
        fontSize: "11px",
        color,
        background: bg,
        border: `1px solid ${line}`,
        borderRadius: "4px",
        padding: "0 6px",
        whiteSpace: "nowrap",
      }}
    >
      {s.text}
    </span>
  );
}

function BotAvatar() {
  return (
    <div
      style={{
        width: "26px",
        height: "26px",
        flex: "none",
        borderRadius: "6px",
        background: "var(--brand)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Sparkle />
    </div>
  );
}

function PersonAvatar({ initials, maria }: { initials: string; maria?: boolean }) {
  return (
    <div
      style={{
        width: "26px",
        height: "26px",
        flex: "none",
        borderRadius: "99px",
        background: maria ? "#344054" : "#D0D5DD",
        color: maria ? "#fff" : "var(--ink2)",
        fontSize: "10px",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {initials}
    </div>
  );
}

function Message({ m, convo }: { m: Msg; convo: Convo }) {
  if (m.k === "bot") {
    return (
      <div className="ham-in" style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
        <BotAvatar />
        <div style={{ flex: "1", minWidth: "0" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
            <b>Delivery Assistant</b>
            <span style={{ fontSize: "11px", color: "var(--mute)", whiteSpace: "nowrap" }}>{m.time} · Assurance agent</span>
          </div>
          <div style={{ ...bubble, color: "var(--ink2)" }}>{m.text}</div>
        </div>
      </div>
    );
  }
  if (m.k === "cust" || m.k === "maria") {
    const maria = m.k === "maria";
    return (
      <div className="ham-in" style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
        <PersonAvatar initials={maria ? "MS" : convo.initials} maria={maria} />
        <div style={{ flex: "1", minWidth: "0" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
            <b>{maria ? "Maria Santos" : convo.name}</b>
            <span style={{ fontSize: "11px", color: "var(--mute)", whiteSpace: "nowrap" }}>
              {m.time}
              {maria ? " · you" : ""}
            </span>
          </div>
          <div style={{ ...bubble, fontFamily: maria ? undefined : "system-ui, sans-serif" }}>{m.text}</div>
          {m.k === "cust" && m.detected && (
            <div className="ham-in" style={{ marginTop: "4px", fontSize: "11px", color: "var(--mute)" }}>
              Detected: {m.detected}
            </div>
          )}
        </div>
      </div>
    );
  }
  if (m.k === "triage") {
    return (
      <div
        role="status"
        style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--brandInk)", paddingLeft: "36px" }}
      >
        <Sparkle size={12} />
        <span>Triage: reading message</span>
        <Dots />
      </div>
    );
  }
  if (m.k === "blocked") {
    const v = check({ kind: "refund", order: m.order, amount: m.amount });
    return (
      <div
        className="ham-in"
        style={{
          marginLeft: "36px",
          background: "var(--brandTint)",
          border: "1px solid #F8BBD0",
          borderRadius: "8px",
          padding: "9px 12px",
          display: "flex",
          gap: "8px",
          alignItems: "flex-start",
        }}
      >
        <span style={{ color: "var(--brandInk)", marginTop: "2px" }}>
          <Sparkle size={12} />
        </span>
        <div style={{ flex: "1", minWidth: "0" }}>
          <div style={{ fontWeight: 500 }}>
            Refund requested → blocked by policy ({v.outcome === "block" ? "Never" : v.outcome}). Opened{" "}
            <a href={m.ticket === "HAM-416" ? "/console/approvals?t=HAM-416" : "/console/approvals"} style={{ textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}>
              {m.ticket}
            </a>
            .
          </div>
          <div style={{ fontSize: "12px", color: "var(--ink2)", marginTop: "2px" }}>{v.reason}</div>
          <div style={{ fontSize: "11px", color: "var(--mute)", marginTop: "4px" }}>
            <span style={{ color: "var(--brandInk)", fontWeight: 500 }}>Auto-generated</span> from the customer&#39;s message and the
            refunds policy
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="ham-in" style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--mute)", fontSize: "12px" }}>
      <span style={{ flex: "1", height: "1px", background: "var(--line)" }}></span>
      <span style={{ display: "flex", alignItems: "center", gap: "6px", textAlign: "center" }}>
        {m.clock && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        )}
        <span>{m.text}</span>
      </span>
      <span style={{ flex: "1", height: "1px", background: "var(--line)" }}></span>
    </div>
  );
}

/* ---------- Board ---------- */

type Filter = "all" | Handling;

export default function MessagesBoard() {
  const facts = useScenarioFacts();
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState("ben");
  const [sims, setSims] = useState<Sim[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paused, setPaused] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState<Record<string, Msg[]>>({});
  const [draft, setDraft] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);

  const clock = facts.clock;
  const simConvos = [...sims].reverse().map(simConvo);
  let convos = [...simConvos, ...baseConvos(facts.phase, facts.notifyCustomers, clock)].map((c) => {
    const mine = sent[c.id];
    if (!mine?.length) return c;
    const last = mine[mine.length - 1];
    return { ...c, messages: [...c.messages, ...mine], preview: last.k === "maria" ? last.text : c.preview, label: "You replied" };
  });
  // Needs-you first, then newest first. Stable for equal keys.
  convos = convos
    .map((c, i) => ({ c, i }))
    .sort((a, b) => {
      const na = a.c.handling === "needs" ? 0 : 1;
      const nb = b.c.handling === "needs" ? 0 : 1;
      if (na !== nb) return na - nb;
      if (a.c.time !== b.c.time) return a.c.time < b.c.time ? 1 : -1;
      return a.i - b.i;
    })
    .map((x) => x.c);

  const needsCount = convos.filter((c) => c.handling === "needs").length;
  const visible = filter === "all" ? convos : convos.filter((c) => c.handling === filter);
  const selected = convos.find((c) => c.id === selectedId) ?? convos[0];
  const assistantOn = !paused[selected.id];

  const simsDone = sims.filter((s) => s.done).length;
  const sentCount = 41 + (facts.phase === "approved" && facts.notifyCustomers ? 3 : 0) + (facts.phase === "rejected" ? 2 : 0) + simsDone;
  const replyCount = 6 + sims.length;

  function simulate(id: PresetId) {
    setMenuOpen(false);
    if (sims.some((s) => s.id === id)) {
      setSelectedId(`sim-${id}`);
      return;
    }
    setSims((s) => [...s, { id, time: clock, done: false }]);
    setSelectedId(`sim-${id}`);
    setFilter("all");
    timers.current.push(setTimeout(() => setSims((s) => s.map((x) => (x.id === id ? { ...x, done: true } : x))), 1200));
  }

  function suggestion(kind: "eta" | "time" | "drop") {
    const first = selected.name.split(" ")[0];
    const text =
      kind === "eta"
        ? `Hi ${first}, your order ${selected.order} is on the way. ${selected.status.text.includes("ETA") ? `It arrives around ${selected.status.text.split("ETA ")[1]}.` : "We'll send the arrival time shortly."}`
        : kind === "time"
          ? `Hi ${first}, would 3:00–5:00pm today work better for you?`
          : `Hi ${first}, if no one is home, can we leave it with a guard, concierge or neighbour?`;
    setDraft(text);
  }

  function send() {
    const text = draft.trim();
    if (!text) return;
    setSent((s) => ({ ...s, [selected.id]: [...(s[selected.id] ?? []), { k: "maria", time: clock, text }] }));
    setPaused((p) => ({ ...p, [selected.id]: true }));
    setDraft("");
  }

  const tabs: { id: Filter; label: ReactNode }[] = [
    { id: "all", label: "All" },
    {
      id: "needs",
      label: (
        <>
          Needs you <span style={{ color: "var(--err)", fontWeight: 600 }}>({needsCount})</span>
        </>
      ),
    },
    { id: "assistant", label: "Assistant" },
    { id: "auto", label: "Automatic" },
  ];

  return (
    <>
      <main style={{ flex: "999 1 640px", minWidth: "0", display: "flex", flexWrap: "wrap" }}>
        <section
          aria-label="Conversations"
          style={{
            flex: "1 1 320px",
            maxWidth: "320px",
            background: "var(--panel)",
            borderRight: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{ padding: "12px 14px", borderBottom: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h1 style={{ margin: "0", fontSize: "15px", fontWeight: "600", flex: "1" }}>Conversations</h1>
              <span style={{ fontSize: "12px", color: "var(--mute)", whiteSpace: "nowrap" }}>
                {sentCount} sent · {replyCount} replies
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div
                role="tablist"
                aria-label="Filter"
                style={{ display: "flex", gap: "2px", flexWrap: "nowrap", whiteSpace: "nowrap", flex: "1" }}
              >
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={filter === t.id}
                    onClick={() => setFilter(t.id)}
                    style={filter === t.id ? tabOn : tabOff}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div ref={menuRef} style={{ position: "relative" }}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                title="Demo: play an incoming customer message"
                style={{
                  ...chip,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  borderStyle: "dashed",
                  color: "var(--mute)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Simulate message
              </button>
              {menuOpen && (
                <div
                  role="menu"
                  aria-label="Simulate an incoming message"
                  className="ham-in"
                  style={{
                    position: "absolute",
                    top: "32px",
                    left: "0",
                    zIndex: 10,
                    width: "290px",
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    padding: "6px",
                  }}
                >
                  <div style={{ fontSize: "11px", color: "var(--mute)", padding: "4px 8px 6px" }}>Play an incoming WhatsApp message</div>
                  {PRESETS.map((p) => {
                    const done = sims.some((s) => s.id === p.id);
                    return (
                      <button
                        key={p.id}
                        role="menuitem"
                        onClick={() => simulate(p.id)}
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "left",
                          font: "inherit",
                          border: "0",
                          background: "none",
                          borderRadius: "6px",
                          padding: "7px 8px",
                          cursor: "pointer",
                          color: "var(--ink)",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--sub)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                      >
                        <div style={{ fontFamily: "system-ui, sans-serif" }}>&ldquo;{p.text}&rdquo;</div>
                        <div style={{ fontSize: "11px", color: "var(--mute)", marginTop: "1px" }}>
                          {p.who}
                          {done ? " · sent, open it" : ""}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          {visible.length === 0 && (
            <div style={{ padding: "18px 14px", color: "var(--mute)", fontSize: "13px" }}>No conversations</div>
          )}
          {visible.map((c, i) => {
            const active = c.id === selected.id;
            const last = i === visible.length - 1;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                aria-current={active ? "true" : undefined}
                className={c.id.startsWith("sim-") || c.time === "10:44" ? "ham-in" : undefined}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  font: "inherit",
                  border: "0",
                  cursor: "pointer",
                  color: "inherit",
                  padding: "10px 14px",
                  borderBottom: last ? "0" : "1px solid var(--line)",
                  background: active ? "var(--brandTint)" : "var(--panel)",
                  boxShadow: active ? "inset 3px 0 0 var(--brandInk)" : undefined,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {c.handling === "needs" && (
                    <span
                      style={{ width: "7px", height: "7px", borderRadius: "99px", background: "var(--err)", flex: "none" }}
                      title="Needs you"
                    ></span>
                  )}
                  <span style={{ fontWeight: c.handling === "needs" || active ? 600 : 500, whiteSpace: "nowrap" }}>{c.name}</span>
                  <span style={{ ...mono, fontSize: "11px", color: "var(--mute)" }}>{c.order}</span>
                  <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--mute)" }}>{c.time}</span>
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: c.handling === "needs" ? "var(--ink)" : "var(--ink2)",
                    marginTop: "2px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {c.preview}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "3px",
                    fontSize: "12px",
                    color: "var(--mute)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.handling === null ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "var(--brandInk)" }}>
                      <Sparkle size={11} /> Triage: reading message
                      <Dots />
                    </span>
                  ) : (
                    <>
                      <span>{c.topic}</span>
                      <span>·</span>
                      <span style={c.handling === "needs" ? { color: "var(--err)", fontWeight: 500 } : undefined}>{c.label}</span>
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </section>
        <section
          aria-label={`Conversation with ${selected.name}`}
          style={{ flex: "999 1 420px", minWidth: "0", background: "var(--panel)", display: "flex", flexDirection: "column" }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              padding: "10px 16px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div style={{ flex: "1 1 200px" }}>
              <div style={{ fontWeight: "600", fontSize: "14px" }}>{selected.name}</div>
              <div style={{ fontSize: "12px", color: "var(--mute)" }}>
                {selected.phone} · WhatsApp · {selected.order} {selected.item}
              </div>
            </div>
            <button
              role="switch"
              aria-checked={assistantOn}
              onClick={() => setPaused((p) => ({ ...p, [selected.id]: assistantOn }))}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                color: "var(--ink2)",
                font: "inherit",
                background: "none",
                border: "0",
                padding: "0",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: "12px" }}>Assistant</span>
              <span
                style={{
                  width: "32px",
                  height: "18px",
                  borderRadius: "99px",
                  background: assistantOn ? "var(--brandInk)" : "#D0D5DD",
                  position: "relative",
                  display: "inline-block",
                  transition: "background .15s",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: assistantOn ? "16px" : "2px",
                    top: "2px",
                    width: "14px",
                    height: "14px",
                    borderRadius: "99px",
                    background: "#fff",
                    transition: "left .15s",
                  }}
                ></span>
              </span>
              <span style={{ fontWeight: "600", fontSize: "12px", width: "20px", textAlign: "left" }}>{assistantOn ? "On" : "Off"}</span>
            </button>
            <button
              onClick={() => setPaused((p) => ({ ...p, [selected.id]: assistantOn }))}
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
                whiteSpace: "nowrap",
              }}
            >
              {assistantOn ? "Take over" : "Hand back"}
            </button>
          </div>
          <div style={{ flex: "1", padding: "16px 20px", display: "flex", flexDirection: "column", gap: "14px", background: "var(--sub)" }}>
            <div style={{ alignSelf: "center", fontSize: "11px", color: "var(--mute)" }}>
              {selected.id === "sim-damage" ? "Today · about yesterday's delivery" : "Today"}
            </div>
            {selected.messages.map((m, i) => (
              <Message key={i} m={m} convo={selected} />
            ))}
            {!assistantOn && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--mute)", fontSize: "12px" }}>
                <span style={{ flex: "1", height: "1px", background: "var(--line)" }}></span>
                <span>Assistant paused · you&#39;re replying</span>
                <span style={{ flex: "1", height: "1px", background: "var(--line)" }}></span>
              </div>
            )}
          </div>
          <div style={{ borderTop: "1px solid var(--line)", padding: "10px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", gap: "6px" }}>
              <button style={chip} onClick={() => suggestion("eta")}>
                Send ETA
              </button>
              <button style={chip} onClick={() => suggestion("time")}>
                Offer new time
              </button>
              <button style={chip} onClick={() => suggestion("drop")}>
                Ask for safe-drop
              </button>
            </div>
            <form
              style={{ display: "flex", gap: "8px" }}
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <input
                aria-label="Reply as Maria"
                placeholder="Reply as Maria · pauses the assistant"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                style={{
                  font: "inherit",
                  flex: "1",
                  minWidth: "0",
                  height: "36px",
                  border: "1px solid var(--line2)",
                  borderRadius: "6px",
                  padding: "0 10px",
                }}
              />
              <button
                type="submit"
                style={{
                  font: "inherit",
                  fontWeight: "600",
                  height: "36px",
                  padding: "0 14px",
                  border: "0",
                  borderRadius: "6px",
                  background: "var(--brandInk)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </form>
          </div>
        </section>
        <aside
          aria-label="Details"
          style={{
            flex: "1 1 260px",
            maxWidth: "300px",
            background: "var(--panel)",
            borderLeft: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--line)" }}>
            <div style={sectionLabel}>Order</div>
            <dl style={{ margin: "8px 0 0", display: "grid", gridTemplateColumns: "76px 1fr", gap: "6px 8px" }}>
              <dt style={mute}>Order</dt>
              <dd style={{ margin: "0", ...mono }}>{selected.order}</dd>
              <dt style={mute}>Item</dt>
              <dd style={{ margin: "0" }}>{selected.item}</dd>
              <dt style={mute}>Window</dt>
              <dd style={{ margin: "0" }}>{selected.window}</dd>
              <dt style={mute}>Driver</dt>
              <dd style={{ margin: "0" }}>{selected.driver}</dd>
              <dt style={mute}>Status</dt>
              <dd style={{ margin: "0" }}>
                <StatusTag s={selected.status} />
              </dd>
            </dl>
          </div>
          <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--line)" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ ...sectionLabel, flex: "1" }}>Address memory</div>
              <a href="/console/addresses" style={{ fontSize: "12px", textDecoration: "none", fontWeight: "500" }}>
                Open
              </a>
            </div>
            <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px", color: "var(--ink2)" }}>
              <div>{selected.address}</div>
              {selected.tags.length > 0 && (
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {selected.tags.map((t) => (
                    <span
                      key={t.text}
                      style={{
                        fontSize: "11px",
                        color: t.warn ? "var(--warn)" : "var(--ink2)",
                        background: t.warn ? "var(--warnBg)" : undefined,
                        border: `1px solid ${t.warn ? "var(--warnLine)" : "var(--line2)"}`,
                        borderRadius: "4px",
                        padding: "0 6px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t.text}
                    </span>
                  ))}
                </div>
              )}
              {selected.memory && <div style={{ fontSize: "12px" }}>{selected.memory}</div>}
            </div>
          </div>
          <div style={{ padding: "12px 14px" }}>
            <div style={sectionLabel}>Why the assistant {selected.handling === "needs" ? "stopped" : "messaged"}</div>
            <p style={{ margin: "8px 0 0", color: "var(--ink2)", lineHeight: "1.5" }}>
              {selected.handling === null ? "Triage is reading the message…" : selected.why}
            </p>
            <p style={{ margin: "8px 0 0", fontSize: "12px", color: "var(--mute)" }}>
              Answers only from this order&#39;s data · never poses as a person
            </p>
          </div>
        </aside>
      </main>
    </>
  );
}
