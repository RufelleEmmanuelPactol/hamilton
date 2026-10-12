"use client";
// Stops tab (/app/stops): every stop on today's route, filterable. Tap one to open it.
import { useState } from "react";
import { useDriverStops } from "./data";
import { Chevron, ScreenHeader, StopBadge, mono, scroll, stopHref } from "./ui";

type Filter = "todo" | "done" | "all";

export default function Stops() {
  const { stops, todo, done, owned } = useDriverStops();
  const [filter, setFilter] = useState<Filter>(todo.length ? "todo" : "all");
  const shown = filter === "all" ? stops : filter === "todo" ? todo : done;
  const chips: [Filter, string][] = [
    ["todo", `To do · ${todo.length}`],
    ["done", `Delivered · ${done.length}`],
    ["all", `All · ${stops.length}`],
  ];

  return (
    <>
      <ScreenHeader title="Stops" sub={`Mon 12 Oct · ${done.length} of ${owned.length} delivered`} />
      <div role="tablist" aria-label="Filter stops" style={{ display: "flex", gap: "8px", padding: "10px 16px", borderBottom: "1px solid var(--line)", flex: "none" }}>
        {chips.map(([id, label]) => {
          const on = filter === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={on}
              onClick={() => setFilter(id)}
              style={{
                font: "inherit",
                fontSize: "13px",
                height: "32px",
                padding: "0 12px",
                borderRadius: "99px",
                cursor: "pointer",
                border: on ? "1px solid var(--brandInk)" : "1px solid var(--line2)",
                background: on ? "var(--brandTint)" : "var(--panel)",
                color: on ? "var(--brandInk)" : "var(--ink2)",
                fontWeight: on ? 600 : 500,
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div style={scroll}>
        {shown.length === 0 && (
          <div style={{ padding: "40px 24px", textAlign: "center", color: "var(--mute)" }}>
            {filter === "todo" ? "Nothing left to deliver." : "No deliveries yet today."}
          </div>
        )}
        {shown.map((s) => (
          <a key={s.order} href={stopHref(s.order)} className="drv-row">
            <StopBadge n={owned.indexOf(s) + 1} status={s.status} late={s.late} />
            <span style={{ flex: "1", minWidth: "0" }}>
              <span style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                <span style={{ fontWeight: 600, color: s.status === "todo" ? "var(--ink)" : "var(--ink2)", flex: "1", minWidth: "0" }}>{s.name}</span>
                <span style={{ ...mono, fontSize: "12px", color: s.late && s.status === "todo" ? "var(--err)" : "var(--ink2)" }}>
                  {s.status === "done" ? s.doneAt : s.eta}
                </span>
              </span>
              <span style={{ display: "block", fontSize: "12px", color: "var(--mute)", marginTop: "2px" }}>
                {s.address}
              </span>
              <span style={{ display: "block", fontSize: "12px", marginTop: "2px", color: s.status === "done" ? "var(--ok)" : s.status === "moved" ? "var(--mute)" : s.late ? "var(--err)" : "var(--ink2)" }}>
                {s.order} ·{" "}
                {s.status === "done"
                  ? `Delivered${s.proof ? ` · ${s.proof.recipient}` : ""}`
                  : s.status === "moved"
                    ? `Moved to ${s.movedTo} by dispatch`
                    : `${s.item} · window ${s.window}${s.late ? " · late" : ""}`}
              </span>
            </span>
            <Chevron />
          </a>
        ))}
      </div>
    </>
  );
}
