"use client";
// Converted from design/project/Orders.dc.html, wired to the scenario store.
// Cards follow the design-system kanban card: ID (plus the HAM ticket when there is one), title, one tag, assignee.
//
// The board is interactive: drag cards between columns (mouse, pen, or long-press on touch), click a card's driver avatar for a menu
// to move or reassign it from the keyboard, group by driver, filter, switch to a list, and add an order.
// Edits live in the scenario store (`board`), so they survive navigation and are cleared by the hidden reset.
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useScenarioFacts } from "@/lib/scenario";
import { useScenario, type BoardEdits, type ColId, type DriverId } from "@/lib/store";
import { Dots, Sparkle } from "@/boards/overview/ui";

const MONO = "'IBM Plex Mono', monospace";
/** How long the Dispatch agent appears to work before it assigns a driver to a new order. */
const ASSIGN_MS = 1600;
/** #1052 rides with #1048 (same building), so it has no card of its own but counts as an order. */
const BUNDLED = 1;

type Tone = "err" | "warn" | "ok" | "info" | "neutral";
const DRIVERS: Record<DriverId, { color: string; name: string }> = {
  JR: { color: "#2E90FA", name: "Jun Reyes" },
  CM: { color: "#7A5AF8", name: "Carlo Mendoza" },
  AV: { color: "#E91E63", name: "Ana Villanueva" },
  RS: { color: "#F79009", name: "Rico Santos" },
};
const DRIVER_IDS = Object.keys(DRIVERS) as DriverId[];

interface Card {
  id: string;
  ticket?: string;
  tag?: [Tone, ReactNode];
  driver?: DriverId;
  title: string;
  meta: ReactNode;
  border?: string;
  done?: boolean;
  quote?: string;
  link?: [string, string];
  /** The Dispatch agent is still choosing a driver. */
  assigning?: boolean;
}

const COLS: { id: ColId; label: string; icon: ReactNode }[] = [
  {
    id: "review",
    label: "Needs review",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B54708" strokeWidth="2.4" strokeDasharray="3 3" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    id: "scheduled",
    label: "Scheduled",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#667085" strokeWidth="2.4" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    id: "out",
    label: "Out for delivery",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="#2E90FA" strokeWidth="2.4" />
        <path d="M12 3a9 9 0 0 1 0 18z" fill="#2E90FA" />
      </svg>
    ),
  },
  {
    id: "delivered",
    label: "Delivered",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#12B76A" />
        <path d="M7.5 12.5l3 3 6-7" fill="none" stroke="#fff" strokeWidth="2.2" />
      </svg>
    ),
  },
  {
    id: "exceptions",
    label: "Exceptions",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#F04438" />
        <path d="M12 7v6M12 16v.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
];
const COL_LABEL = Object.fromEntries(COLS.map((c) => [c.id, c.label])) as Record<ColId, string>;

/** The tag a card gets once a person has moved it out of the column the scenario put it in. */
const MOVED_TAG: Record<ColId, [Tone, string]> = {
  review: ["warn", "Back to review"],
  scheduled: ["neutral", "Moved by you"],
  out: ["info", "Dispatched by you"],
  delivered: ["ok", "Marked delivered"],
  exceptions: ["err", "Flagged by you"],
};

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
        display: "inline-flex",
        alignItems: "center",
        gap: "3px",
      }}
    >
      {children}
    </span>
  );
}

const avatarBase: CSSProperties = {
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

function Avatar({ d, size = 20 }: { d?: DriverId; size?: number }) {
  const s = { ...avatarBase, width: `${size}px`, height: `${size}px` };
  if (!d) return <span title="Not assigned yet" aria-label="Not assigned yet" style={{ ...s, border: "1px dashed var(--line2)" }} />;
  return (
    <span title={DRIVERS[d].name} aria-label={DRIVERS[d].name} style={{ ...s, background: DRIVERS[d].color, color: "#fff" }}>
      {d}
    </span>
  );
}

const btn: CSSProperties = {
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
};
const menuBox: CSSProperties = {
  position: "absolute",
  zIndex: 30,
  minWidth: "190px",
  background: "var(--panel)",
  border: "1px solid var(--line)",
  borderRadius: "8px",
  boxShadow: "0 12px 24px -6px rgba(16,24,40,0.18)",
  padding: "4px",
};
const menuHead: CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "var(--mute)",
  padding: "8px 8px 4px",
};
function MenuItem({ on, onClick, children }: { on?: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={!!on}
      onClick={onClick}
      style={{
        font: "inherit",
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        height: "30px",
        padding: "0 8px",
        border: 0,
        borderRadius: "6px",
        background: on ? "var(--brandTint)" : "transparent",
        color: on ? "var(--brandInk)" : "var(--ink)",
        fontWeight: on ? 600 : undefined,
        cursor: "pointer",
        textAlign: "left",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}
/** Click-away layer behind an open menu. */
function Backdrop({ onClose }: { onClose: () => void }) {
  return <div aria-hidden="true" onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 20 }} />;
}

/* ------------------------------------------------------------------ scripted cards */

/** Jun's 3 remaining stops. Their driver, ETA and tag follow the scenario phase. */
function junCards(f: ReturnType<typeof useScenarioFacts>): Card[] {
  // HAM-417 exists once the agent has finished re-planning (open, then approved or rejected).
  const ticket = f.phase !== "before" && !f.thinking ? "HAM-417" : undefined;
  if (f.phase === "approved")
    return [
      { id: "#1049", driver: "RS", ticket, tag: ["ok", "On time"], title: "Balloons + roses · Sam Ocampo", meta: "Makati · 09:00–13:00 · ETA 11:05" },
      { id: "#1042", driver: "AV", ticket, tag: ["ok", "On time"], title: "Anniversary box · Mark Tan", meta: "BGC · 10:00–13:00 · ETA 12:15" },
      { id: "#1050", driver: "AV", ticket, tag: ["ok", "On time"], title: "Orchid pot · Nicole Ramos", meta: "BGC · 11:00–15:00 · ETA 12:40" },
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
    { id: "#1042", ticket, driver: "JR", tag: late, border: "var(--errLine)", title: "Anniversary box · Mark Tan", meta: "BGC · 10:00–13:00 · ETA 13:40" },
    { id: "#1049", ticket, driver: "JR", tag: late, border: "var(--errLine)", title: "Balloons + roses · Sam Ocampo", meta: "Makati · 09:00–13:00 · ETA 13:55" },
    { id: "#1050", ticket, driver: "JR", title: "Orchid pot · Nicole Ramos", meta: "BGC · 11:00–15:00 · ETA 14:05" },
  ];
}

function scriptedBoard(f: ReturnType<typeof useScenarioFacts>): Record<ColId, Card[]> {
  return {
    review: [
      {
        id: "WA-0912",
        ticket: "HAM-414",
        tag: ["warn", "Address unclear"],
        title: "Red roses (12) + chocolates for Rina Bautista",
        quote: "hi po! can i order the red roses 12pcs w/ chocolates… before 4pm pls",
        meta: "Makati · 13:00–16:00 · not paid yet",
        link: ["Review in Approvals", "/app/approvals"],
      },
    ],
    scheduled: [
      { id: "#1044", driver: "AV", tag: ["info", "Rescheduled"], title: "Sunflower bundle · Ben Cruz", meta: "Pasig · 15:00–17:00 · confirmed" },
      { id: "#1048", driver: "CM", tag: ["ok", "+ #1052"], title: "White lilies + bouquet · Grace Lee", meta: "San Juan · 13:00–18:00" },
    ],
    out: [
      ...junCards(f),
      { id: "#1051", driver: "CM", title: "Retirement arrangement · Prof. Diaz", meta: "UP Diliman · ETA 11:05 · on time" },
      { id: "#1043", driver: "AV", title: "Office desk arrangement · Raffles", meta: "Ortigas · ETA 13:10 · closes 17:00" },
    ],
    delivered: [
      { id: "#1046", driver: "CM", tag: ["ok", "Proof verified"], title: "Get-well basket · Anna Garcia", meta: "10:36", done: true },
      { id: "#1047", driver: "JR", tag: ["ok", "Proof verified"], title: "Event arch · Shangri-La", meta: "10:08", done: true },
      { id: "#1041", driver: "JR", tag: ["ok", "Retake passed"], title: "Pink roses · Liza Santos", meta: "09:24", done: true },
      { id: "#1039", driver: "RS", tag: ["ok", "Proof verified"], title: "Pastry trays · Dela Cruz Bakery", meta: "08:31", done: true },
    ],
    exceptions: [
      {
        id: "#1045",
        ticket: "HAM-416",
        driver: "CM",
        tag: ["err", "Refund request"],
        border: "var(--errLine)",
        title: "Table posies · Café Morato",
        meta: "Delivered 08:52 · 2 arrived wilted",
        link: ["Handle in Approvals", "/app/approvals"],
      },
    ],
  };
}

/* ------------------------------------------------------------------ card */

function OrderCard({
  c,
  dragging,
  menuOpen,
  col,
  onPointerDown,
  onMenu,
  onMove,
  onAssign,
}: {
  c: Card;
  dragging?: boolean;
  menuOpen: boolean;
  col: ColId;
  onPointerDown?: (e: React.PointerEvent<HTMLElement>) => void;
  onMenu: (open: boolean) => void;
  onMove: (to: ColId) => void;
  onAssign: (d: DriverId) => void;
}) {
  return (
    <article
      data-card={c.id}
      onPointerDown={onPointerDown}
      className="ord-card"
      aria-roledescription="Draggable order"
      style={{
        position: "relative",
        background: "var(--panel)",
        border: `1px solid ${c.border ?? "var(--line)"}`,
        borderRadius: "8px",
        padding: "10px 12px",
        display: dragging ? "none" : "flex",
        flexDirection: "column",
        gap: "6px",
        boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
        cursor: "grab",
        touchAction: "manipulation",
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--mute)", whiteSpace: "nowrap" }}>
        <span style={{ fontFamily: MONO }}>{c.id}</span>
        {c.ticket && (
          <a href="/app/approvals" style={{ fontFamily: MONO, color: "var(--brandInk)", textDecoration: "none" }}>
            {c.ticket}
          </a>
        )}
        {c.tag && (
          <span style={{ minWidth: 0, overflow: "hidden", display: "flex" }}>
            <Tag tone={c.tag[0]}>{c.tag[1]}</Tag>
          </span>
        )}
        <span style={{ marginLeft: "auto", display: "flex", flex: "none" }}>
          <button
            type="button"
            className="ord-more"
            aria-label={`Move or reassign ${c.id} (${c.driver ? DRIVERS[c.driver].name : "no driver yet"})`}
            title="Move or reassign"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => onMenu(!menuOpen)}
            style={{ border: 0, padding: 0, background: "none", cursor: "pointer", borderRadius: "99px", display: "flex" }}
          >
            <Avatar d={c.driver} />
          </button>
        </span>
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
      {c.assigning ? (
        <div
          role="status"
          style={{
            fontSize: "12px",
            color: "var(--brandInk)",
            background: "var(--aiBg)",
            border: "1px solid var(--aiLine)",
            borderRadius: "6px",
            padding: "5px 8px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Sparkle size={12} /> Dispatch agent is picking a driver <Dots />
        </div>
      ) : (
        <div style={{ fontSize: "12px", color: "var(--mute)" }}>{c.meta}</div>
      )}
      {c.link && (
        <a href={c.link[1]} style={{ fontSize: "12px", fontWeight: "600", textDecoration: "none" }}>
          {c.link[0]}
        </a>
      )}
      {menuOpen && (
        <>
          <Backdrop onClose={() => onMenu(false)} />
          <div role="menu" aria-label={`Actions for ${c.id}`} style={{ ...menuBox, top: "34px", right: "8px" }}>
            <div style={menuHead}>Move to</div>
            {COLS.map((k) => (
              <MenuItem key={k.id} on={k.id === col} onClick={() => onMove(k.id)}>
                {k.icon}
                {k.label}
              </MenuItem>
            ))}
            <div style={{ ...menuHead, borderTop: "1px solid var(--line)", marginTop: "4px" }}>Driver</div>
            {DRIVER_IDS.map((d) => (
              <MenuItem key={d} on={d === c.driver} onClick={() => onAssign(d)}>
                <Avatar d={d} size={18} />
                {DRIVERS[d].name}
              </MenuItem>
            ))}
          </div>
        </>
      )}
    </article>
  );
}

/* ------------------------------------------------------------------ board */

type Group = "status" | "driver";
type LaneId = ColId | DriverId | "none";
interface Drag {
  id: string;
  x: number;
  y: number;
  offX: number;
  offY: number;
  w: number;
  h: number;
  over: { lane: LaneId; index: number } | null;
}
interface Pending {
  id: string;
  sx: number;
  sy: number;
  rect: DOMRect;
  touch: boolean;
  started: boolean;
  timer?: ReturnType<typeof setTimeout>;
}

const EMPTY_HINT: Partial<Record<ColId, string>> = {
  exceptions: "No failed or disputed orders",
};

export default function OrdersBoard() {
  const f = useScenarioFacts();
  const edits = useScenario((s) => s.board);
  const setBoard = useScenario((s) => s.setBoard);

  const [group, setGroup] = useState<Group>("status");
  const [view, setView] = useState<"board" | "list">("board");
  const [filter, setFilter] = useState<DriverId | "all">("all");
  const [menu, setMenu] = useState<string | null>(null);
  const [showAllDelivered, setShowAllDelivered] = useState(false);
  const [drag, setDrag] = useState<Drag | null>(null);
  const [toast, setToast] = useState<{ text: string; undo: BoardEdits } | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const pending = useRef<Pending | null>(null);
  const dragRef = useRef<Drag | null>(null);
  dragRef.current = drag;

  // Tick while the Dispatch agent is "assigning" a new order.
  useEffect(() => {
    const waiting = edits.added.filter((a) => now - a.createdAt < ASSIGN_MS);
    if (!waiting.length) return;
    const next = Math.min(...waiting.map((a) => a.createdAt + ASSIGN_MS)) - Date.now() + 20;
    const t = setTimeout(() => setNow(Date.now()), Math.max(next, 20));
    return () => clearTimeout(t);
  }, [edits.added, now]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 6000);
    return () => clearTimeout(t);
  }, [toast]);

  // Resolve scripted cards + person's edits into the board that's shown.
  const { lanes, cards, colOf, layout } = useMemo(() => {
    const scripted = scriptedBoard(f);
    const base: Record<string, { card: Card; col: ColId }> = {};
    for (const col of COLS) for (const c of scripted[col.id]) base[c.id] = { card: c, col: col.id };
    for (const a of edits.added) {
      const assigning = now - a.createdAt < ASSIGN_MS;
      base[a.id] = {
        col: "scheduled",
        card: {
          id: a.id,
          title: a.title,
          driver: assigning ? undefined : "CM",
          assigning,
          tag: assigning
            ? ["neutral", "New"]
            : [
                "info",
                <>
                  <Sparkle size={10} color="currentColor" /> Auto-assigned
                </>,
              ],
          meta: assigning ? "" : `${a.area} · ${a.window} · Carlo has room on his route`,
        },
      };
    }

    // Layout: the person's column order if they've moved anything, else the scripted one.
    const layout = {} as Record<ColId, string[]>;
    const placed = new Set<string>();
    for (const col of COLS) {
      layout[col.id] = (edits.cols?.[col.id] ?? scripted[col.id].map((c) => c.id)).filter((id) => base[id] && !placed.has(id));
      layout[col.id].forEach((id) => placed.add(id));
    }
    for (const id of Object.keys(base)) if (!placed.has(id)) layout[base[id].col].push(id);

    const cards: Record<string, Card> = {};
    const colOf: Record<string, ColId> = {};
    for (const col of COLS)
      for (const id of layout[col.id]) {
        const { card, col: home } = base[id];
        const override = edits.drivers[id];
        let c: Card = { ...card, driver: override ?? card.driver, done: col.id === "delivered" };
        if (col.id !== home) c = { ...c, tag: MOVED_TAG[col.id], border: undefined, link: undefined, assigning: false };
        else if (override && override !== card.driver && !card.assigning)
          c = { ...c, tag: ["neutral", `Reassigned by you`], border: undefined };
        cards[id] = c;
        colOf[id] = col.id;
      }

    const keep = (id: string) => filter === "all" || cards[id].driver === filter;
    let lanes: { id: LaneId; label: string; icon: ReactNode; ids: string[] }[];
    if (group === "status") {
      lanes = COLS.map((c) => ({ id: c.id, label: c.label, icon: c.icon, ids: layout[c.id].filter(keep) }));
    } else {
      const all = COLS.flatMap((c) => layout[c.id]).filter((id) => colOf[id] !== "delivered");
      lanes = [
        ...DRIVER_IDS.map((d) => ({ id: d as LaneId, label: DRIVERS[d].name, icon: <Avatar d={d} size={16} />, ids: all.filter((id) => cards[id].driver === d) })),
        { id: "none" as LaneId, label: "No driver yet", icon: <Avatar size={16} />, ids: all.filter((id) => !cards[id].driver) },
      ].filter((l) => filter === "all" || l.id === filter);
    }
    return { lanes, cards, colOf, layout };
  }, [f, edits, now, group, filter]);

  /* ---------------- actions */

  const commit = (next: BoardEdits, text: string) => {
    setToast({ text, undo: edits });
    setBoard(next);
  };
  const move = (id: string, to: ColId, index?: number) => {
    const cols = Object.fromEntries(COLS.map((c) => [c.id, layout[c.id].filter((x) => x !== id)])) as Record<ColId, string[]>;
    const at = index === undefined ? cols[to].length : Math.min(index, cols[to].length);
    cols[to].splice(at, 0, id);
    const same = colOf[id] === to;
    commit({ ...edits, cols }, same ? `Reordered ${id} in ${COL_LABEL[to]}` : `Moved ${id} to ${COL_LABEL[to]}`);
  };
  const assign = (id: string, d: DriverId) => {
    if (cards[id].driver === d) return;
    commit({ ...edits, drivers: { ...edits.drivers, [id]: d } }, `${id} assigned to ${DRIVERS[d].name}`);
  };
  const addOrder = (o: { customer: string; item: string; area: string; window: string }) => {
    const taken = new Set(Object.keys(cards));
    let n = 1060;
    while (taken.has(`#${n}`)) n++;
    const id = `#${n}`;
    const cols = { ...layout, scheduled: [id, ...layout.scheduled] };
    const t = Date.now();
    setNow(t);
    commit(
      {
        ...edits,
        cols,
        added: [...edits.added, { id, title: `${o.item} · ${o.customer}`, area: o.area, window: o.window, createdAt: t }],
      },
      `Added ${id} · assigning a driver`,
    );
  };

  /* ---------------- drag (pointer events, so mouse, pen and touch behave the same) */

  const targetAt = (x: number, y: number): Drag["over"] => {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    const lane = el?.closest<HTMLElement>("[data-lane]");
    if (!lane) return null;
    const ids = Array.from(lane.querySelectorAll<HTMLElement>("[data-card]")).filter((n) => n.dataset.card !== dragRef.current?.id);
    let index = 0;
    for (const n of ids) {
      const r = n.getBoundingClientRect();
      if (y > r.top + r.height / 2) index++;
    }
    return { lane: lane.dataset.lane as LaneId, index };
  };

  useEffect(() => {
    // While dragging on touch, stop the page from scrolling under the finger.
    const block = (e: TouchEvent) => {
      if (pending.current?.started) e.preventDefault();
    };
    document.addEventListener("touchmove", block, { passive: false });
    return () => document.removeEventListener("touchmove", block);
  }, []);

  const onPointerDown = (id: string) => (e: React.PointerEvent<HTMLElement>) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest("a,button,input,select,textarea,[role=menu]")) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const p: Pending = { id, sx: e.clientX, sy: e.clientY, rect, touch: e.pointerType === "touch", started: false };
    pending.current = p;

    const begin = (x: number, y: number) => {
      p.started = true;
      setMenu(null);
      if (p.touch) navigator.vibrate?.(8);
      const d: Drag = { id, x, y, offX: p.sx - rect.left, offY: p.sy - rect.top, w: rect.width, h: rect.height, over: null };
      dragRef.current = d;
      setDrag({ ...d, over: targetAt(x, y) });
    };
    const onMove = (ev: PointerEvent) => {
      const dist = Math.hypot(ev.clientX - p.sx, ev.clientY - p.sy);
      if (!p.started) {
        if (p.touch) {
          if (dist > 8) cleanup(); // a scroll, not a long-press
        } else if (dist > 4) begin(ev.clientX, ev.clientY);
        return;
      }
      setDrag((d) => (d ? { ...d, x: ev.clientX, y: ev.clientY, over: targetAt(ev.clientX, ev.clientY) } : d));
    };
    const onUp = () => {
      const d = dragRef.current;
      if (p.started && d?.over) {
        const { lane, index } = d.over;
        if (group === "status") move(id, lane as ColId, index);
        else if (lane !== "none") assign(id, lane as DriverId);
      }
      cleanup();
    };
    const cleanup = () => {
      clearTimeout(p.timer);
      pending.current = null;
      dragRef.current = null;
      setDrag(null);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", cleanup);
    };
    if (p.touch) p.timer = setTimeout(() => begin(p.sx, p.sy), 220);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", cleanup);
  };

  /* ---------------- render */

  const total = COLS.filter((c) => c.id !== "review").reduce((n, c) => n + layout[c.id].length, 0) + BUNDLED;
  const dragged = drag ? cards[drag.id] : null;

  return (
    <main style={{ flex: "999 1 640px", minWidth: "0", display: "flex", flexDirection: "column" }}>
      <style>{`
        .ord-card:hover{border-color:var(--line2)!important}
        .ord-card .ord-more:hover>span,.ord-card .ord-more[aria-expanded=true]>span{box-shadow:0 0 0 2px var(--panel),0 0 0 4px var(--brand)}
        .ord-lane-over{background:var(--brandTint)!important;outline:1px dashed var(--aiLine)}
        @keyframes ordToast{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}
      `}</style>
      <Toolbar
        total={total}
        view={view}
        setView={setView}
        group={group}
        setGroup={setGroup}
        filter={filter}
        setFilter={setFilter}
        onAdd={addOrder}
      />

      {view === "list" ? (
        <ListView cards={cards} layout={layout} filter={filter} onMove={move} onAssign={assign} />
      ) : (
        <div style={{ flex: "1", overflowX: "auto", padding: "14px 16px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${lanes.length}, minmax(212px, 1fr))`,
              gap: "12px",
              minWidth: `${lanes.length * 222}px`,
              alignItems: "start",
            }}
          >
            {lanes.map((lane) => {
              const over = drag?.over?.lane === lane.id;
              let ids = lane.ids.filter((id) => id !== drag?.id);
              const collapsible = lane.id === "delivered" && !showAllDelivered && !over;
              const hidden = collapsible ? Math.max(ids.length - 3, 0) : 0;
              if (hidden) ids = ids.slice(0, 3);
              const placeholder = drag && over && group === "status" ? Math.min(drag.over!.index, ids.length) : -1;
              const items: ReactNode[] = ids.map((id) => (
                <OrderCard
                  key={id}
                  c={cards[id]}
                  col={colOf[id]}
                  menuOpen={menu === id}
                  onMenu={(o) => setMenu(o ? id : null)}
                  onMove={(to) => {
                    setMenu(null);
                    move(id, to);
                  }}
                  onAssign={(d) => {
                    setMenu(null);
                    assign(id, d);
                  }}
                  onPointerDown={onPointerDown(id)}
                />
              ));
              if (placeholder >= 0)
                items.splice(
                  placeholder,
                  0,
                  <div
                    key="__ph"
                    aria-hidden="true"
                    style={{ height: `${drag!.h}px`, border: "2px dashed var(--brand)", borderRadius: "8px", background: "var(--panel)", opacity: 0.7 }}
                  />,
                );
              return (
                <section
                  key={lane.id}
                  aria-label={lane.label}
                  data-lane={lane.id}
                  className={over && (group === "status" || lane.id !== "none") ? "ord-lane-over" : undefined}
                  style={{ borderRadius: "10px", padding: "2px", minHeight: "160px", transition: "background .12s" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 4px 10px" }}>
                    {lane.icon}
                    <span style={{ fontWeight: "600", whiteSpace: "nowrap" }}>{lane.label}</span>
                    <span style={{ color: "var(--mute)" }}>{lane.ids.length}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {items}
                    {hidden > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowAllDelivered(true)}
                        style={{ ...btn, border: 0, background: "none", color: "var(--mute)", textAlign: "left", padding: "0 4px", height: "30px" }}
                      >
                        Show {hidden} more
                      </button>
                    )}
                    {lane.id === "delivered" && showAllDelivered && lane.ids.length > 3 && (
                      <button
                        type="button"
                        onClick={() => setShowAllDelivered(false)}
                        style={{ ...btn, border: 0, background: "none", color: "var(--mute)", textAlign: "left", padding: "0 4px", height: "30px" }}
                      >
                        Show less
                      </button>
                    )}
                    {!drag && (lane.ids.length === 0 || EMPTY_HINT[lane.id as ColId]) && (
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
                        {EMPTY_HINT[lane.id as ColId] ?? "Empty"}
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      )}

      {drag && dragged && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            left: drag.x - drag.offX,
            top: drag.y - drag.offY,
            width: drag.w,
            zIndex: 50,
            pointerEvents: "none",
            transform: "rotate(2deg)",
            boxShadow: "0 18px 32px -8px rgba(16,24,40,0.28)",
            borderRadius: "8px",
          }}
        >
          <OrderCard c={dragged} col={colOf[drag.id]} menuOpen={false} onMenu={() => {}} onMove={() => {}} onAssign={() => {}} />
        </div>
      )}

      {toast && (
        <div
          role="status"
          style={{
            position: "fixed",
            left: "50%",
            bottom: "20px",
            transform: "translateX(-50%)",
            zIndex: 60,
            background: "#101828",
            color: "#fff",
            borderRadius: "8px",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            boxShadow: "0 12px 24px -6px rgba(16,24,40,0.3)",
            animation: "ordToast .18s ease-out",
            maxWidth: "calc(100vw - 32px)",
          }}
        >
          <span>{toast.text}</span>
          <button
            type="button"
            onClick={() => {
              setBoard(toast.undo);
              setToast(null);
            }}
            style={{ font: "inherit", fontWeight: 600, background: "none", border: 0, color: "#F8BBD0", cursor: "pointer", padding: 0 }}
          >
            Undo
          </button>
        </div>
      )}
    </main>
  );
}

/* ------------------------------------------------------------------ toolbar */

function Toolbar(p: {
  total: number;
  view: "board" | "list";
  setView: (v: "board" | "list") => void;
  group: Group;
  setGroup: (g: Group) => void;
  filter: DriverId | "all";
  setFilter: (d: DriverId | "all") => void;
  onAdd: (o: { customer: string; item: string; area: string; window: string }) => void;
}) {
  const [open, setOpen] = useState<"filter" | "group" | "new" | null>(null);
  const seg = (active: boolean, first?: boolean): CSSProperties => ({
    ...btn,
    border: 0,
    borderRadius: 0,
    borderLeft: first ? 0 : "1px solid var(--line2)",
    background: active ? "var(--sub)" : "var(--panel)",
    color: active ? "var(--ink)" : "var(--ink2)",
    fontWeight: active ? 600 : undefined,
  });
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "10px",
        padding: "12px 20px",
        background: "var(--panel)",
        borderBottom: "1px solid var(--line)",
        position: "relative",
        zIndex: 25,
      }}
    >
      <h1 style={{ margin: "0", fontSize: "15px", fontWeight: "600" }}>Orders</h1>
      <span style={{ color: "var(--mute)" }}>Today · {p.total}</span>
      <div role="group" aria-label="View" style={{ display: "flex", border: "1px solid var(--line2)", borderRadius: "6px", overflow: "hidden", marginLeft: "8px" }}>
        <button type="button" aria-pressed={p.view === "board"} onClick={() => p.setView("board")} style={seg(p.view === "board", true)}>
          Board
        </button>
        <button type="button" aria-pressed={p.view === "list"} onClick={() => p.setView("list")} style={seg(p.view === "list")}>
          List
        </button>
      </div>
      <span style={{ color: "var(--mute)", fontSize: "12px" }}>{p.view === "board" ? "Drag to move or reassign" : ""}</span>
      <div style={{ flex: "1" }}></div>

      <div style={{ position: "relative" }}>
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open === "filter"}
          onClick={() => setOpen(open === "filter" ? null : "filter")}
          style={{ ...btn, borderStyle: p.filter === "all" ? "dashed" : "solid", color: p.filter === "all" ? "var(--ink2)" : "var(--brandInk)" }}
        >
          {p.filter === "all" ? "+ Filter" : `Driver: ${DRIVERS[p.filter].name.split(" ")[0]}`}
        </button>
        {open === "filter" && (
          <>
            <Backdrop onClose={() => setOpen(null)} />
            <div role="menu" style={{ ...menuBox, top: "34px", right: 0 }}>
              <div style={menuHead}>Driver</div>
              <MenuItem on={p.filter === "all"} onClick={() => (p.setFilter("all"), setOpen(null))}>
                All drivers
              </MenuItem>
              {DRIVER_IDS.map((d) => (
                <MenuItem key={d} on={p.filter === d} onClick={() => (p.setFilter(d), setOpen(null))}>
                  <Avatar d={d} size={18} />
                  {DRIVERS[d].name}
                </MenuItem>
              ))}
            </div>
          </>
        )}
      </div>

      <div style={{ position: "relative" }}>
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open === "group"}
          disabled={p.view === "list"}
          onClick={() => setOpen(open === "group" ? null : "group")}
          style={{ ...btn, opacity: p.view === "list" ? 0.5 : 1 }}
        >
          Group: {p.group === "status" ? "Status" : "Driver"}
        </button>
        {open === "group" && (
          <>
            <Backdrop onClose={() => setOpen(null)} />
            <div role="menu" style={{ ...menuBox, top: "34px", right: 0 }}>
              <MenuItem on={p.group === "status"} onClick={() => (p.setGroup("status"), setOpen(null))}>
                Status
              </MenuItem>
              <MenuItem on={p.group === "driver"} onClick={() => (p.setGroup("driver"), setOpen(null))}>
                Driver
              </MenuItem>
            </div>
          </>
        )}
      </div>

      <div style={{ position: "relative" }}>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open === "new"}
          onClick={() => setOpen(open === "new" ? null : "new")}
          style={{ ...btn, fontWeight: 600, border: 0, background: "var(--brandInk)", color: "#fff", padding: "0 12px" }}
        >
          New order
        </button>
        {open === "new" && (
          <>
            <Backdrop onClose={() => setOpen(null)} />
            <NewOrderForm
              onCancel={() => setOpen(null)}
              onSubmit={(o) => {
                p.onAdd(o);
                setOpen(null);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

function NewOrderForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (o: { customer: string; item: string; area: string; window: string }) => void;
  onCancel: () => void;
}) {
  const [customer, setCustomer] = useState("Joanna Lim");
  const [item, setItem] = useState("Tulip bouquet");
  const [area, setArea] = useState("San Juan");
  const [win, setWin] = useState("14:00–17:00");
  const field: CSSProperties = {
    font: "inherit",
    width: "100%",
    height: "32px",
    padding: "0 8px",
    border: "1px solid var(--line2)",
    borderRadius: "6px",
    background: "var(--panel)",
    color: "var(--ink)",
  };
  const label: CSSProperties = { display: "flex", flexDirection: "column", gap: "4px", fontSize: "12px", color: "var(--ink2)" };
  return (
    <form
      role="dialog"
      aria-label="New order"
      onSubmit={(e) => {
        e.preventDefault();
        if (customer.trim() && item.trim()) onSubmit({ customer: customer.trim(), item: item.trim(), area, window: win });
      }}
      style={{ ...menuBox, top: "34px", right: 0, width: "280px", padding: "14px", display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <div style={{ fontWeight: 600 }}>New order</div>
      <label style={label}>
        Customer
        <input autoFocus value={customer} onChange={(e) => setCustomer(e.target.value)} style={field} />
      </label>
      <label style={label}>
        What
        <input value={item} onChange={(e) => setItem(e.target.value)} style={field} />
      </label>
      <div style={{ display: "flex", gap: "8px" }}>
        <label style={{ ...label, flex: 1 }}>
          Area
          <select value={area} onChange={(e) => setArea(e.target.value)} style={field}>
            {["San Juan", "Makati", "BGC", "Pasig", "Ortigas", "Quezon City"].map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
        <label style={{ ...label, flex: 1 }}>
          Window
          <select value={win} onChange={(e) => setWin(e.target.value)} style={field}>
            {["13:00–16:00", "14:00–17:00", "15:00–18:00"].map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ fontSize: "12px", color: "var(--mute)", display: "flex", gap: "6px", alignItems: "flex-start", lineHeight: 1.45 }}>
        <Sparkle size={12} /> Driver picked by the Dispatch agent (Auto)
      </div>
      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
        <button type="button" onClick={onCancel} style={btn}>
          Cancel
        </button>
        <button type="submit" style={{ ...btn, border: 0, fontWeight: 600, background: "var(--brandInk)", color: "#fff" }}>
          Add order
        </button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ list view */

function ListView({
  cards,
  layout,
  filter,
  onMove,
  onAssign,
}: {
  cards: Record<string, Card>;
  layout: Record<ColId, string[]>;
  filter: DriverId | "all";
  onMove: (id: string, to: ColId) => void;
  onAssign: (id: string, d: DriverId) => void;
}) {
  const rows = COLS.flatMap((c) => layout[c.id].map((id) => ({ id, col: c.id }))).filter(
    (r) => filter === "all" || cards[r.id].driver === filter,
  );
  const th: CSSProperties = { padding: "8px 12px", fontWeight: 500, whiteSpace: "nowrap" };
  const td: CSSProperties = { padding: "8px 12px", borderTop: "1px solid var(--line)", verticalAlign: "middle" };
  const sel: CSSProperties = { ...btn, height: "28px", padding: "0 6px", color: "var(--ink)" };
  return (
    <div style={{ flex: 1, overflow: "auto", padding: "14px 16px" }}>
      <div style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "8px", overflowX: "auto" }}>
        <table style={{ width: "100%", minWidth: "820px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--sub)", textAlign: "left", color: "var(--mute)", fontSize: "12px" }}>
              <th style={th}>Order</th>
              <th style={th}>What · who</th>
              <th style={th}>Details</th>
              <th style={th}>Status</th>
              <th style={th}>Driver</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ id, col }) => {
              const c = cards[id];
              return (
                <tr key={id}>
                  <td style={{ ...td, fontFamily: MONO, whiteSpace: "nowrap" }}>
                    {id}
                    {c.ticket && (
                      <a href="/app/approvals" style={{ marginLeft: "8px", color: "var(--brandInk)", textDecoration: "none" }}>
                        {c.ticket}
                      </a>
                    )}
                  </td>
                  <td style={{ ...td, fontWeight: 500 }}>{c.title}</td>
                  <td style={{ ...td, color: "var(--mute)", fontSize: "12px" }}>{c.assigning ? "Assigning a driver…" : c.meta}</td>
                  <td style={td}>
                    <select aria-label={`Status of ${id}`} value={col} onChange={(e) => onMove(id, e.target.value as ColId)} style={sel}>
                      {COLS.map((k) => (
                        <option key={k.id} value={k.id}>
                          {k.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={td}>
                    <select
                      aria-label={`Driver for ${id}`}
                      value={c.driver ?? ""}
                      onChange={(e) => onAssign(id, e.target.value as DriverId)}
                      style={sel}
                    >
                      {!c.driver && <option value="">Not assigned</option>}
                      {DRIVER_IDS.map((d) => (
                        <option key={d} value={d}>
                          {DRIVERS[d].name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
