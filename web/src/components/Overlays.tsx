"use client";
// App-wide overlays that make the console feel like a product rather than a mockup:
//   - Profile cards: click any driver, Maria or customer (avatar or name) to see who they are and act.
//   - ⌘K search palette over pages, people, orders and tickets.
//   - "Coming soon" dialog: any button or link with nothing wired to it says so instead of doing nothing.
//   - Toasts for small confirmations.
// Detection is done on the DOM so every board gets this without per-screen wiring.
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { create } from "zustand";
import { PEOPLE, findPerson, driverToday, type Person } from "@/lib/people";
import { useScenario } from "@/lib/store";

type Rect = { left: number; top: number; bottom: number; right: number } | null;
interface OverlayState {
  soon: string | null;
  person: { p: Person; rect: Rect } | null;
  palette: boolean;
  toast: string | null;
}
export const useOverlays = create<OverlayState>(() => ({ soon: null, person: null, palette: false, toast: null }));

export const openSoon = (label: string) => useOverlays.setState({ soon: label, person: null });
export const openPalette = () => useOverlays.setState({ palette: true, person: null });
export const showToast = (text: string) => useOverlays.setState({ toast: text });
export const openPerson = (p: Person, el?: Element | null) => {
  const r = el?.getBoundingClientRect();
  useOverlays.setState({ person: { p, rect: r ? { left: r.left, top: r.top, bottom: r.bottom, right: r.right } : null }, palette: false });
};

/* ------------------------------------------------------------------ DOM detection */

const HANDLERS = ["onClick", "onPointerDown", "onPointerUp", "onMouseDown", "onMouseUp", "onChange"];
function reactProps(el: Element): Record<string, unknown> | null {
  const k = Object.keys(el).find((x) => x.startsWith("__reactProps$"));
  return k ? ((el as unknown as Record<string, Record<string, unknown>>)[k] ?? null) : null;
}
/** True if React has a click-ish handler on the element or any ancestor. */
function handled(from: Element | null): boolean {
  for (let el = from; el && el !== document.body; el = el.parentElement) {
    const p = reactProps(el);
    if (p && HANDLERS.some((h) => typeof p[h] === "function")) return true;
  }
  return false;
}
/** The person an element (or one of its close ancestors) stands for: avatar initials, aria-label/title, or a name in text. */
function personAt(target: Element): { p: Person; el: Element } | null {
  let el: Element | null = target;
  for (let i = 0; el && i < 3; i++, el = el.parentElement) {
    if (el.closest("[data-overlay],input,textarea,select,option")) return null;
    const label = el.getAttribute("aria-label") || el.getAttribute("title");
    const byLabel = findPerson(label);
    if (byLabel) return { p: byLabel, el };
    if (el.childElementCount === 0) {
      const text = el.textContent?.trim() ?? "";
      const p = findPerson(text);
      // Initials only count on small round avatars, not on any two-letter word.
      if (p && (text.length > 2 || (el as HTMLElement).offsetWidth <= 44)) return { p, el };
    }
  }
  return null;
}
function controlLabel(el: Element): string {
  const raw = el.getAttribute("aria-label") || (el as HTMLElement).innerText || el.getAttribute("title") || "This control";
  return raw.replace(/\s+/g, " ").trim().slice(0, 60) || "This control";
}

/* ------------------------------------------------------------------ pieces */

const panel: CSSProperties = {
  background: "var(--panel)",
  border: "1px solid var(--line)",
  borderRadius: "10px",
  boxShadow: "0 24px 48px -12px rgba(16,24,40,0.28)",
  color: "var(--ink)",
  fontSize: "13px",
};
const btn: CSSProperties = {
  font: "inherit",
  fontSize: "13px",
  height: "32px",
  padding: "0 12px",
  border: "1px solid var(--line2)",
  borderRadius: "6px",
  background: "var(--panel)",
  color: "var(--ink2)",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  textDecoration: "none",
  whiteSpace: "nowrap",
};
const primary: CSSProperties = { ...btn, border: 0, background: "var(--brandInk)", color: "#fff", fontWeight: 600 };

function Avatar({ p, size = 40 }: { p: Person; size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 99,
        background: p.color,
        color: "#fff",
        fontWeight: 600,
        fontSize: size * 0.36,
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

function Backdrop({ onClose, dim, children }: { onClose: () => void; dim?: boolean; children: ReactNode }) {
  return (
    <div
      data-overlay
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: dim ? "rgba(16,24,40,0.36)" : "transparent",
        animation: dim ? "hamFade .15s ease-out" : undefined,
      }}
    >
      {children}
    </div>
  );
}

function PersonCard({ p, rect, onClose }: { p: Person; rect: Rect; onClose: () => void }) {
  const router = useRouter();
  const phase = useScenario((s) => s.phase);
  const back = useScenario((s) => s.junBackOnRoad);
  const [compose, setCompose] = useState(false);
  const [msg, setMsg] = useState("");
  const W = 320;
  const pos: CSSProperties = rect
    ? {
        left: Math.max(12, Math.min(rect.left, window.innerWidth - W - 12)),
        ...(rect.bottom + 340 < window.innerHeight ? { top: rect.bottom + 8 } : { bottom: Math.max(12, window.innerHeight - rect.top + 8) }),
      }
    : { left: 0, right: 0, margin: "0 auto", top: "18vh" };
  const today = p.kind === "driver" ? driverToday(p.key, phase, back) : null;
  const first = p.name.split(" ")[0];
  return (
    <Backdrop onClose={onClose} dim={!rect}>
      <div role="dialog" aria-label={`${p.name} profile`} className="ham-in" style={{ ...panel, position: "fixed", width: W, maxWidth: "calc(100vw - 24px)", ...pos }}>
        <div style={{ padding: "16px", display: "flex", gap: "12px", alignItems: "center" }}>
          <Avatar p={p} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: "15px" }}>{p.name}</div>
            <div style={{ color: "var(--mute)", fontSize: "12px" }}>{p.role}</div>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} style={{ ...btn, border: 0, marginLeft: "auto", width: 28, height: 28, padding: 0, fontSize: 16 }}>
            ×
          </button>
        </div>
        {today && (
          <div
            style={{
              margin: "0 16px 12px",
              padding: "8px 10px",
              borderRadius: "6px",
              background: `var(--${today.tone}Bg)`,
              border: `1px solid var(--${today.tone}Line)`,
              color: `var(--${today.tone})`,
              fontWeight: 500,
            }}
          >
            {today.text}
          </div>
        )}
        <dl style={{ margin: 0, padding: "0 16px 12px", display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 12px" }}>
          {p.phone && (
            <>
              <dt style={{ color: "var(--mute)" }}>Phone</dt>
              <dd style={{ margin: 0, fontFamily: "var(--mono)", fontSize: "12px" }}>{p.phone}</dd>
            </>
          )}
          {p.facts.map(([k, v]) => (
            <FragmentRow key={k} k={k} v={v} />
          ))}
        </dl>
        {compose ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!msg.trim()) return;
              showToast(`Sent to ${first} on WhatsApp`);
              onClose();
            }}
            style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <textarea
              autoFocus
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder={`Message ${first} on WhatsApp`}
              rows={3}
              style={{ font: "inherit", border: "1px solid var(--line2)", borderRadius: "6px", padding: "8px", resize: "vertical" }}
            />
            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
              <button type="button" style={btn} onClick={() => setCompose(false)}>
                Cancel
              </button>
              <button type="submit" style={primary}>
                Send
              </button>
            </div>
          </form>
        ) : (
          <div style={{ padding: "12px 16px 16px", borderTop: "1px solid var(--line)", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button type="button" style={primary} onClick={() => setCompose(true)}>
              Message
            </button>
            {p.phone && (
              <a href={`tel:${p.phone.replace(/\s/g, "")}`} style={btn}>
                Call
              </a>
            )}
            {p.links.map((l) => (
              <button
                key={l.href}
                type="button"
                style={btn}
                onClick={() => {
                  onClose();
                  router.push(l.href);
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </Backdrop>
  );
}
function FragmentRow({ k, v }: { k: string; v: string }) {
  return (
    <>
      <dt style={{ color: "var(--mute)", whiteSpace: "nowrap" }}>{k}</dt>
      <dd style={{ margin: 0 }}>{v}</dd>
    </>
  );
}

function SoonModal({ label, onClose }: { label: string; onClose: () => void }) {
  const router = useRouter();
  return (
    <Backdrop onClose={onClose} dim>
      <div
        role="alertdialog"
        aria-label="Coming soon"
        className="ham-in"
        style={{ ...panel, position: "fixed", left: 0, right: 0, margin: "0 auto", top: "22vh", width: 420, maxWidth: "calc(100vw - 24px)", padding: "20px" }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: "var(--brandTint)",
            color: "var(--brandInk)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: 6 }}>“{label}” is coming soon</div>
        <p style={{ margin: "0 0 18px", color: "var(--ink2)", lineHeight: 1.55 }}>
          Not built in this prototype. Working end to end: Overview, Driver app, Approvals and Audit log.
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            type="button"
            style={btn}
            onClick={() => {
              onClose();
              router.push("/app/approvals");
            }}
          >
            Go to Approvals
          </button>
          <button type="button" autoFocus style={primary} onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </Backdrop>
  );
}

type Item = { id: string; group: string; label: string; hint?: string; run: () => void; icon?: ReactNode };

function Palette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const go = (href: string) => () => {
    onClose();
    router.push(href);
  };
  const all: Item[] = useMemo(
    () => [
      ...[
        ["Overview", "/app"],
        ["Dispatch", "/app/dispatch"],
        ["Orders", "/app/orders"],
        ["Approvals", "/app/approvals"],
        ["Customer messages", "/app/messages"],
        ["Drivers", "/app/drivers"],
        ["Address book", "/app/addresses"],
        ["Autonomy policies", "/app/autonomy"],
        ["Audit log", "/app/audit"],
        ["Driver app", "/driver"],
        ["Customer view", "/customer"],
      ].map(([label, href]) => ({ id: href, group: "Pages", label, hint: href, run: go(href) })),
      ...PEOPLE.map((p) => ({
        id: p.key,
        group: p.kind === "customer" ? "Customers" : "People",
        label: p.name,
        hint: p.role,
        icon: <Avatar p={p} size={20} />,
        run: () => openPerson(p),
      })),
      ...[
        ["HAM-417", "Reassign 3 stops from Jun Reyes"],
        ["HAM-414", "Create order WA-0912 from WhatsApp"],
        ["HAM-416", "Café Morato refund request"],
      ].map(([id, t]) => ({ id, group: "Tickets", label: `${id} · ${t}`, run: go("/app/approvals") })),
      ...["#1039", "#1041", "#1042", "#1043", "#1044", "#1045", "#1046", "#1047", "#1048", "#1049", "#1050", "#1051"].map((id) => ({
        id,
        group: "Orders",
        label: id,
        hint: PEOPLE.find((p) => p.facts.some(([, v]) => v === id))?.name,
        run: go("/app/orders"),
      })),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const items = useMemo(() => {
    const t = q.trim().toLowerCase();
    const r = t ? all.filter((i) => `${i.label} ${i.hint ?? ""}`.toLowerCase().includes(t)) : all.filter((i) => i.group !== "Orders");
    return r.slice(0, 40);
  }, [q, all]);
  useEffect(() => setSel(0), [q]);
  useEffect(() => {
    listRef.current?.querySelector(`[data-i="${sel}"]`)?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  let lastGroup = "";
  return (
    <Backdrop onClose={onClose} dim>
      <div
        role="dialog"
        aria-label="Search"
        className="ham-in"
        style={{ ...panel, position: "fixed", left: 0, right: 0, margin: "0 auto", top: "12vh", width: 560, maxWidth: "calc(100vw - 24px)", overflow: "hidden" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 14px", borderBottom: "1px solid var(--line)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--mute)" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") (e.preventDefault(), setSel((s) => Math.min(s + 1, items.length - 1)));
              else if (e.key === "ArrowUp") (e.preventDefault(), setSel((s) => Math.max(s - 1, 0)));
              else if (e.key === "Enter" && items[sel]) items[sel].run();
            }}
            placeholder="Search pages, people, orders, tickets…"
            aria-label="Search"
            style={{ font: "inherit", fontSize: 15, border: 0, outline: 0, flex: 1, height: 50, color: "var(--ink)", background: "transparent" }}
          />
          <kbd style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--mute)", border: "1px solid var(--line)", borderRadius: 4, padding: "1px 5px" }}>Esc</kbd>
        </div>
        <div ref={listRef} role="listbox" style={{ maxHeight: "52vh", overflowY: "auto", padding: 6 }}>
          {items.length === 0 && <div style={{ padding: 20, color: "var(--mute)", textAlign: "center" }}>Nothing matches “{q}”.</div>}
          {items.map((it, i) => {
            const head = it.group !== lastGroup ? (lastGroup = it.group) : null;
            return (
              <div key={it.group + it.id}>
                {head && (
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--mute)", padding: "10px 10px 4px" }}>
                    {head}
                  </div>
                )}
                <button
                  type="button"
                  role="option"
                  aria-selected={i === sel}
                  data-i={i}
                  onMouseMove={() => setSel(i)}
                  onClick={it.run}
                  style={{
                    font: "inherit",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 10px",
                    border: 0,
                    borderRadius: 6,
                    background: i === sel ? "var(--brandTint)" : "transparent",
                    color: i === sel ? "var(--brandInk)" : "var(--ink)",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {it.icon}
                  <span style={{ fontWeight: 500, whiteSpace: "nowrap" }}>{it.label}</span>
                  {it.hint && <span style={{ color: "var(--mute)", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.hint}</span>}
                  {i === sel && <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--mute)" }}>↵</span>}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Backdrop>
  );
}

function Toast({ text, onDone }: { text: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, [text, onDone]);
  return (
    <div
      data-overlay
      role="status"
      style={{
        position: "fixed",
        left: "50%",
        bottom: 20,
        transform: "translateX(-50%)",
        zIndex: 110,
        background: "#101828",
        color: "#fff",
        borderRadius: 8,
        padding: "10px 14px",
        boxShadow: "0 12px 24px -6px rgba(16,24,40,0.3)",
        fontSize: 13,
        maxWidth: "calc(100vw - 32px)",
      }}
    >
      {text}
    </div>
  );
}

/* ------------------------------------------------------------------ root */

export function Overlays() {
  const s = useOverlays();
  const path = usePathname();
  const close = () => useOverlays.setState({ soon: null, person: null, palette: false });

  useEffect(() => {
    // Profile cards only in the admin console; the driver app and customer view are end-user screens.
    const inConsole = () => location.pathname.startsWith("/app");
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      const t = e.target as Element | null;
      // A handler that re-rendered may have removed the clicked element; that click did something.
      if (!t || !t.isConnected || t.closest("[data-overlay]")) return;
      if (inConsole() && !handled(t)) {
        const hit = personAt(t);
        if (hit) {
          e.preventDefault();
          openPerson(hit.p, hit.el);
          return;
        }
      }
      const ctrl = t.closest("button,[role=button],[role=tab],[role=menuitem],a");
      if (!ctrl || handled(t)) return;
      if (ctrl.tagName === "A") {
        const href = ctrl.getAttribute("href");
        if (href && href !== "#") return;
      }
      if (ctrl instanceof HTMLButtonElement && (ctrl.disabled || (ctrl.type === "submit" && ctrl.form))) return;
      if (t.closest("label,summary")) return;
      e.preventDefault();
      openSoon(controlLabel(ctrl));
    };
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest?.("input,textarea,select,[contenteditable=true]");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (location.pathname.startsWith("/app")) openPalette();
      } else if (e.key === "/" && !typing && location.pathname.startsWith("/app")) {
        e.preventDefault();
        openPalette();
      } else if (e.key === "Escape") close();
    };
    // Hovering a person shows it is clickable.
    const onOver = (e: MouseEvent) => {
      if (!inConsole()) return;
      const t = e.target as Element | null;
      if (!t || handled(t)) return;
      const hit = personAt(t);
      if (hit && !hit.el.classList.contains("ham-person")) hit.el.classList.add("ham-person");
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mouseover", onOver);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  // Close floating cards on navigation.
  useEffect(() => {
    useOverlays.setState({ person: null, palette: false });
  }, [path]);

  return (
    <>
      <style>{`.ham-person{cursor:pointer}.ham-person:hover{text-decoration:underline;text-decoration-style:dotted;text-underline-offset:3px}span.ham-person:hover,div.ham-person:hover{filter:brightness(1.05)}`}</style>
      {s.person && <PersonCard key={s.person.p.key} p={s.person.p} rect={s.person.rect} onClose={close} />}
      {s.palette && <Palette onClose={close} />}
      {s.soon && <SoonModal label={s.soon} onClose={close} />}
      {s.toast && <Toast text={s.toast} onDone={() => useOverlays.setState({ toast: null })} />}
    </>
  );
}
