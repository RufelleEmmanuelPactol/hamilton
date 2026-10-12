"use client";
// Today tab (/app): the map, the next stop and the rest of the route. Every stop opens its own screen.
import { useScenario } from "@/lib/store";
import { useDriverStops, type Stop } from "./data";
import { Chevron, StopBadge, deliverHref, mono, primaryBtn, secondaryBtn, stopHref } from "./ui";

const tag: React.CSSProperties = {
  fontSize: "12px",
  color: "var(--ink2)",
  background: "var(--sub)",
  border: "1px solid var(--line)",
  borderRadius: "6px",
  padding: "2px 8px",
  whiteSpace: "nowrap",
};

export default function Today() {
  const { driver, stops, todo, done, owned, next, facts: f } = useDriverStops();
  const backOnRoad = useScenario((s) => s.backOnRoad);
  const isJun = driver.id === "jun";
  const stopped = isJun && f.junIncident && !f.junBackOnRoad;
  const moved = stops.filter((s) => s.status === "moved");

  let banner: { title: string; body?: string; tone: "ok" | "warn" | "info"; href: string } | null = null;
  if (isJun && f.phase !== "before") {
    if (f.phase === "rejected")
      banner = {
        title: "Maria kept your stops",
        body: f.junBackOnRoad ? "Customers were told you're running late." : "Deliver them when you're back on the road.",
        tone: "warn",
        href: "/app/report/",
      };
    else if (!f.junBackOnRoad)
      banner = {
        title: "Flat tire reported 10:31 · dispatch is handling it",
        body:
          f.phase === "approved"
            ? "Maria approved the new plan at 10:44."
            : f.thinking
              ? "Dispatch is re-planning your stops…"
              : "Your stops are waiting for Maria's OK.",
        tone: "ok",
        href: "/app/report/",
      };
    else if (f.phase === "incident")
      banner = { title: "You're back on the road", body: "Your stops are still waiting for Maria's OK.", tone: "ok", href: "/app/report/" };
  }
  if (!isJun && f.moved) banner = { title: "2 stops added from Jun", body: "Dispatch re-planned your route at 10:44.", tone: "info", href: "/app/inbox/" };

  const color = stopped ? "#F79009" : driver.color;
  const showRoute = !!next;

  return (
    <div style={{ flex: "1", minHeight: "0", display: "flex", flexDirection: "column", background: "var(--panel)" }}>
      <div style={{ position: "relative", height: "260px", flex: "none", background: "#F2F4F6" }}>
        <svg
          viewBox="0 0 390 260"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: "0", width: "100%", height: "100%", display: "block" }}
          role="img"
          aria-label={next ? `Map showing your route to ${next.name}, ${next.area}` : "Map"}
        >
          <defs>
            <pattern id="drv-g" width="26" height="26" patternUnits="userSpaceOnUse">
              <path d="M26 0H0V26" fill="none" stroke="#E2E6EB" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="390" height="260" fill="#F2F4F6" />
          <rect width="390" height="260" fill="url(#drv-g)" />
          <path d="M240 180 l70 -12 l26 50 l-80 14 z" fill="#E1EBDF" />
          <path d="M-10 170 C 90 150, 190 190, 400 140" fill="none" stroke="#fff" strokeWidth="12" />
          <path d="M150 -10 C 160 80, 140 170, 170 270" fill="none" stroke="#fff" strokeWidth="10" />
          <path d="M150 -10 C 160 80, 140 170, 170 270" fill="none" stroke="#FCD9A3" strokeWidth="3" />
          <path d="M-10 80 L 400 60" fill="none" stroke="#fff" strokeWidth="7" />
          <path d="M290 -10 L 300 270" fill="none" stroke="#fff" strokeWidth="7" />
          {showRoute && (
            <>
              <path
                d="M90 215 C 140 195, 160 175, 165 155 S 230 115, 285 105"
                fill="none"
                stroke={driver.color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={stopped ? "2 10" : undefined}
                opacity={stopped ? 0.6 : 1}
              />
              <path d="M285 77 c -11 0 -18 8 -18 17 c 0 13 18 29 18 29 s 18 -16 18 -29 c 0 -9 -7 -17 -18 -17 z" fill="#101828" />
              <circle cx="285" cy="94" r="6" fill="#fff" />
            </>
          )}
          <circle cx="90" cy="215" r="11" fill={color} opacity="0.18" />
          <circle cx="90" cy="215" r="7" fill={color} stroke="#fff" strokeWidth="3" />
          <g fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="#98A2B3" fontWeight="500">
            <text x="300" y="160">{next?.area ?? ""}</text>
          </g>
        </svg>
        <a
          href="/app/me/"
          style={{
            position: "absolute",
            left: "12px",
            right: "12px",
            top: "12px",
            height: "48px",
            background: "var(--panel)",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(16,24,40,0.12)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0 12px",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              width: "30px",
              height: "30px",
              flex: "none",
              borderRadius: "99px",
              background: driver.color,
              color: "#fff",
              fontSize: "11px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {driver.initials}
          </span>
          <span style={{ flex: "1", minWidth: "0" }}>
            <span style={{ display: "block", fontWeight: 600, fontSize: "13px" }}>
              Good morning, {driver.first}
            </span>
            <span style={{ display: "block", fontSize: "11px", color: "var(--mute)" }}>
              {done.length} of {owned.length} delivered · {stopped ? "stopped · flat tire" : `${driver.vehicle} · on shift`}
            </span>
          </span>
          <span style={{ width: "8px", height: "8px", borderRadius: "99px", background: stopped ? "#F79009" : "#12B76A" }} />
        </a>
        {next && (
          <div
            style={{
              position: "absolute",
              right: "12px",
              bottom: "12px",
              background: "var(--panel)",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(16,24,40,0.12)",
              padding: "6px 10px",
              fontSize: "12px",
            }}
          >
            {stopped ? (
              <>
                <b>Stopped</b> <span style={{ color: "var(--mute)" }}>· EDSA, Guadalupe</span>
              </>
            ) : (
              <>
                <b>{isJun ? "4 min" : "9 min"}</b> <span style={{ color: "var(--mute)" }}>· {isJun ? "1.2 km" : "3.4 km"}</span>
              </>
            )}
          </div>
        )}
      </div>

      <div style={{ flex: "1", minHeight: "0", overflowY: "auto" }}>
        {banner && (
          <a
            href={banner.href}
            className="ham-in"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              margin: "12px 14px 0",
              padding: "10px 12px",
              borderRadius: "10px",
              textDecoration: "none",
              border: `1px solid var(--${banner.tone}Line)`,
              background: `var(--${banner.tone}Bg)`,
            }}
          >
            <span style={{ flex: "1", minWidth: "0" }}>
              <span style={{ display: "block", fontWeight: 600, fontSize: "13px", color: `var(--${banner.tone})` }}>{banner.title}</span>
              {banner.body && <span style={{ display: "block", fontSize: "12px", color: "var(--ink2)", marginTop: "2px" }}>{banner.body}</span>}
            </span>
            <Chevron />
          </a>
        )}

        {next ? (
          <NextStop stop={next} index={stops.indexOf(next) + 1 - moved.length} total={owned.length} held={stopped} />
        ) : (
          <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--line)" }}>
            <h1 style={{ margin: "0", fontSize: "20px", fontWeight: 600 }}>
              {moved.length ? (f.junBackOnRoad ? "You're back on the road" : `Your ${moved.length} stops moved to Ana and Rico`) : "All done for today"}
            </h1>
            <div style={{ color: "var(--ink2)", marginTop: "4px", lineHeight: 1.4 }}>
              {moved.length && !f.junBackOnRoad
                ? "Fix the tire, then tap I'm back on the road."
                : "No stops left on your route. Dispatch will message you if anything new comes up."}
            </div>
          </div>
        )}

        <section aria-label="Today's route" style={{ padding: "12px 0 8px" }}>
          <div style={{ display: "flex", alignItems: "baseline", padding: "0 18px 6px" }}>
            <h2 style={{ margin: "0", fontSize: "13px", fontWeight: 600, color: "var(--mute)" }}>Today&#39;s route</h2>
            <a href="/app/stops/" style={{ marginLeft: "auto", fontSize: "13px", fontWeight: 600, color: "var(--brandInk)", textDecoration: "none" }}>
              See all
            </a>
          </div>
          {stops
            .filter((s) => s !== next)
            .map((s) => (
              <a key={s.order} href={stopHref(s.order)} className="drv-row" style={{ padding: "10px 18px", borderBottom: "0" }}>
                <StopBadge n={owned.indexOf(s) + 1} status={s.status} late={s.late} />
                <span style={{ flex: "1", minWidth: "0" }}>
                  <span
                    style={{
                      display: "block",
                      fontWeight: 500,
                      color: s.status === "todo" ? "var(--ink)" : "var(--mute)",
                      textDecoration: s.status === "moved" ? "line-through" : undefined,
                    }}
                  >
                    {s.name}
                  </span>
                  <span style={{ display: "block", fontSize: "12px", color: "var(--mute)" }}>
                    {s.order} · {s.area}
                    {s.status === "moved" ? ` · moved to ${s.movedTo}` : s.status === "done" ? " · delivered" : ""}
                  </span>
                </span>
                <span style={{ ...mono, fontSize: "12px", color: s.late ? "var(--err)" : "var(--ink2)" }}>
                  {s.status === "done" ? s.doneAt : s.eta}
                </span>
              </a>
            ))}
        </section>
      </div>

      <div style={{ padding: "10px 16px 12px", borderTop: "1px solid var(--line)", flex: "none" }}>
        {stopped ? (
          <button style={primaryBtn} onClick={backOnRoad}>
            I&#39;m back on the road
          </button>
        ) : next ? (
          <a href={deliverHref(next.order)} style={primaryBtn}>
            Arrived · complete delivery
          </a>
        ) : (
          <a href="/app/report/" style={secondaryBtn}>
            Report an issue
          </a>
        )}
      </div>
    </div>
  );
}

function NextStop({ stop, index, total, held }: { stop: Stop; index: number; total: number; held: boolean }) {
  return (
    <a
      href={stopHref(stop.order)}
      style={{ display: "block", padding: "14px 18px", borderBottom: "1px solid var(--line)", color: "inherit", textDecoration: "none" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--mute)" }}>
        <span style={mono}>{stop.order}</span>
        <span style={{ whiteSpace: "nowrap" }}>
          · Next stop · {index} of {total}
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontWeight: 600,
            whiteSpace: "nowrap",
            color: held ? "var(--warn)" : stop.late ? "var(--err)" : "var(--ok)",
          }}
        >
          {held ? "On hold" : `ETA ${stop.eta} · ${stop.late ? "late" : "on time"}`}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}>
        <h1 style={{ margin: "0", fontSize: "20px", fontWeight: 600, flex: "1" }}>{stop.name}</h1>
        <Chevron />
      </div>
      <div style={{ color: "var(--ink2)", marginTop: "2px" }}>{stop.address}</div>
      <div style={{ display: "flex", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
        <span style={tag}>{stop.item}</span>
        <span style={tag}>Window {stop.window}</span>
        {stop.from && <span style={{ ...tag, color: "var(--info)", background: "var(--infoBg)", borderColor: "var(--infoLine)" }}>From {stop.from}</span>}
      </div>
    </a>
  );
}
