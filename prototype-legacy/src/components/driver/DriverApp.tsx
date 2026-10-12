"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  ChevronDown,
  Clock,
  Coffee,
  Hand,
  KeyRound,
  MapPin,
  MapPinOff,
  Navigation,
  Package,
  Phone,
  RefreshCw,
  Send,
  Sparkles,
  Timer,
  Truck,
  UserX,
  Wrench,
  XCircle,
  CircleDot,
} from "lucide-react";
import { startCrossTabSync, useStore } from "@/lib/store";
import { computeEtas, placeOf, routeOf } from "@/lib/agents";
import { fmtTime, fmtWindow } from "@/lib/util";
import { SAMPLE_PHOTOS, SampleKind } from "@/lib/samples";
import { Avatar, Logo } from "@/components/ui";
import type { ReportType } from "@/lib/types";

const REPORTS: { type: ReportType; label: string; icon: typeof Coffee; cls: string }[] = [
  { type: "flat_tire", label: "Flat tire", icon: CircleDot, cls: "text-rose-600" },
  { type: "lunch", label: "Lunch break", icon: Coffee, cls: "text-amber-600" },
  { type: "running_late", label: "Running late", icon: Timer, cls: "text-amber-600" },
  { type: "not_home", label: "Not home", icon: UserX, cls: "text-slate-700" },
  { type: "wrong_address", label: "Wrong address", icon: MapPinOff, cls: "text-slate-700" },
  { type: "vehicle_issue", label: "Vehicle issue", icon: Wrench, cls: "text-rose-600" },
];

async function compress(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  await img.decode();
  const scale = Math.min(1, 480 / Math.max(img.width, img.height));
  const c = document.createElement("canvas");
  c.width = img.width * scale;
  c.height = img.height * scale;
  c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
  URL.revokeObjectURL(url);
  return c.toDataURL("image/jpeg", 0.7);
}

export default function DriverApp() {
  const s = useStore();
  const [picker, setPicker] = useState(false);
  const driverId = s.manualDriverId;
  const d = s.drivers.find((x) => x.id === driverId);

  useEffect(() => startCrossTabSync(), []);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("d");
    if (q && s.drivers.some((x) => x.id === q)) s.setManualDriver(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!d || picker)
    return (
      <Shell>
        <div className="flex flex-1 flex-col px-5 pt-10">
          <Logo size={34} />
          <h1 className="mt-4 text-2xl font-semibold">Hamilton Driver</h1>
          <p className="mt-1 text-sm text-slate-500">Maria&apos;s Flowers & Gifts · choose your profile</p>
          <div className="mt-6 space-y-2">
            {s.drivers.map((x) => (
              <button
                key={x.id}
                onClick={() => {
                  s.setManualDriver(x.id);
                  setPicker(false);
                }}
                className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 text-left active:bg-slate-50"
              >
                <Avatar initials={x.initials} color={x.color} size={40} />
                <div className="flex-1">
                  <div className="font-medium">{x.name}</div>
                  <div className="text-xs text-slate-500">{x.vehicle}</div>
                </div>
              </button>
            ))}
          </div>
          <p className="mt-6 text-center text-[11px] text-slate-400">Demo: the driver you pick is controlled here; the others drive themselves.</p>
        </div>
      </Shell>
    );

  return <DriverHome driverId={d.id} onSwitch={() => setPicker(true)} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen justify-center bg-slate-200/60">
      <div className="relative flex min-h-screen w-full max-w-[430px] flex-col bg-[#f6f7f9] shadow-xl">{children}</div>
    </div>
  );
}

function DriverHome({ driverId, onSwitch }: { driverId: string; onSwitch: () => void }) {
  const s = useStore();
  const d = s.drivers.find((x) => x.id === driverId)!;
  const world = useMemo(() => ({ now: s.now, drivers: s.drivers, orders: s.orders, places: s.places }), [s.now, s.drivers, s.orders, s.places]);
  const route = routeOf(world, d.id);
  const etas = computeEtas(world, d.id);
  const mine = s.orders.filter((o) => o.driverId === d.id);
  const done = mine.filter((o) => o.status === "delivered").length;
  const holds = mine.filter((o) => o.status === "on_hold");
  const cur = route[0];
  const place = cur ? placeOf(world, cur) : undefined;
  const [sheet, setSheet] = useState<null | "pod" | "fail">(null);
  const [toast, setToast] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const first = d.name.split(" ")[0];
  const openReport = d.reports.filter((r) => !r.resolved).slice(-1)[0];
  const feed = s.activity.filter((a) => a.text.includes(first) || (cur && a.text.includes(cur.code))).slice(0, 3);

  const flash = (t: string) => {
    setToast(t);
    setTimeout(() => setToast(null), 2600);
  };
  const report = (type: ReportType, text = "") => {
    void s.report(d.id, type, text);
    flash("Sent to dispatch ✓ Hamilton is re-planning");
  };

  return (
    <Shell>
      {/* header */}
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
        <Avatar initials={d.initials} color={d.color} size={36} />
        <button onClick={onSwitch} className="flex min-w-0 flex-1 flex-col items-start">
          <span className="flex items-center gap-1 text-[15px] font-semibold">
            {d.name} <ChevronDown size={14} className="text-slate-400" />
          </span>
          <span className="text-xs text-slate-500">
            {done}/{mine.length} delivered · {fmtTime(s.now)}
          </span>
        </button>
        <span
          className={clsx(
            "rounded-full px-2.5 py-1 text-[11px] font-semibold",
            d.status === "on_route" && "bg-indigo-50 text-indigo-700",
            d.status === "break" && "bg-amber-50 text-amber-700",
            d.status === "incident" && "bg-rose-50 text-rose-700",
            (d.status === "idle" || d.status === "done") && "bg-slate-100 text-slate-600"
          )}
        >
          {d.status === "on_route" ? "On route" : d.status === "break" ? "On break" : d.status === "incident" ? "Incident" : d.status === "done" ? "Done" : "Idle"}
        </span>
      </header>

      <div className="flex-1 space-y-3 px-4 pb-40 pt-3">
        {d.status === "break" && (
          <Banner tone="amber" icon={Coffee} title={`On break until ${fmtTime(d.breakUntil ?? s.now)}`} body="Customers' ETAs were updated automatically." action={openReport && { label: "End break", run: () => s.resolveReport(d.id, openReport.id) }} />
        )}
        {d.status === "incident" && (
          <Banner tone="rose" icon={AlertTriangle} title="Incident reported" body="Dispatch is re-planning your remaining stops. Stay safe — tap below when you're moving again." action={openReport && { label: "I'm back on the road", run: () => s.resolveReport(d.id, openReport.id) }} />
        )}

        {!mine.length && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
            <Truck className="mx-auto text-slate-300" size={32} />
            <div className="mt-2 font-medium">No route yet</div>
            <div className="text-sm text-slate-500">Maria hasn&apos;t published today&apos;s plan. You&apos;ll be notified.</div>
          </div>
        )}

        {cur && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between bg-slate-900 px-4 py-2.5 text-white">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-300">
                {cur.status === "arrived" ? "At stop" : cur.status === "heading" ? "Heading to" : "Next stop"} · {cur.code}
              </span>
              <span className="text-xs">
                ETA <b>{fmtTime(etas[cur.id])}</b>
              </span>
            </div>
            <div className="space-y-3 p-4">
              <div>
                <div className="text-lg font-semibold leading-tight">{cur.customerName}</div>
                <div className="mt-0.5 flex items-start gap-1.5 text-sm text-slate-600">
                  <MapPin size={15} className="mt-0.5 shrink-0" /> {cur.address}
                </div>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {fmtWindow(cur.window)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Package size={12} /> {cur.items}
                  </span>
                  <a href={`tel:${cur.phone}`} className="flex items-center gap-1 text-indigo-600">
                    <Phone size={12} /> Call
                  </a>
                </div>
              </div>

              {(cur.leaveWith || place?.prefs.gateCode || place?.prefs.instructions || place?.prefs.leaveWith || cur.notes) && (
                <div className="space-y-1.5 rounded-xl bg-indigo-50/70 p-3">
                  <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-indigo-700">
                    <Sparkles size={11} /> Hamilton remembers
                  </div>
                  {cur.leaveWith && <Mem icon={CheckCircle2} text={`Approved: leave with ${cur.leaveWith}`} strong />}
                  {!cur.leaveWith && place?.prefs.leaveWith && <Mem icon={Hand} text={`Usually received by ${place.prefs.leaveWith}`} />}
                  {place?.prefs.gateCode && <Mem icon={KeyRound} text={place.prefs.gateCode} />}
                  {place?.prefs.instructions && <Mem icon={MapPin} text={place.prefs.instructions} />}
                  {cur.notes && <Mem icon={Package} text={cur.notes} />}
                </div>
              )}

              {cur.status === "assigned" && (
                <BigBtn onClick={() => s.headTo(cur.id)} icon={Navigation} disabled={d.status !== "on_route"}>
                  Start — head to stop
                </BigBtn>
              )}
              {cur.status === "heading" && (
                <BigBtn onClick={() => s.arrive(cur.id)} icon={MapPin}>
                  I&apos;ve arrived
                </BigBtn>
              )}
              {cur.status === "arrived" && (
                <div className="grid grid-cols-[1fr_auto] gap-2">
                  <BigBtn onClick={() => setSheet("pod")} icon={Camera} tone="green">
                    Complete delivery
                  </BigBtn>
                  <button onClick={() => setSheet("fail")} className="rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 active:bg-slate-50">
                    Can&apos;t deliver
                  </button>
                </div>
              )}
              {cur.pod?.check.status === "retake" && cur.status === "arrived" && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <RefreshCw size={14} /> Please retake the photo
                  </div>
                  <ul className="mt-1 text-[13px]">
                    {cur.pod.check.reasons.map((r) => (
                      <li key={r}>• {r}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {feed.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-3">
            <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">From dispatch</div>
            {feed.map((a) => (
              <div key={a.id} className="py-1 text-[13px] leading-snug text-slate-700">
                <span className="mr-1.5 font-mono text-[11px] text-slate-400">{fmtTime(a.at)}</span>
                {a.text}
              </div>
            ))}
          </div>
        )}

        {route.length > 1 && (
          <div className="rounded-2xl border border-slate-200 bg-white">
            <div className="px-4 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Up next</div>
            {route.slice(1).map((o, i) => (
              <div key={o.id} className="flex items-center gap-3 border-t border-slate-50 px-4 py-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg border text-[11px] font-semibold" style={{ borderColor: d.color, color: d.color }}>
                  {i + 2}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{o.customerName}</div>
                  <div className="truncate text-xs text-slate-500">
                    {o.area} · {fmtWindow(o.window)}
                  </div>
                </div>
                <span className={clsx("text-xs tabular-nums", etas[o.id] > o.window.end ? "text-amber-600" : "text-slate-500")}>{fmtTime(etas[o.id])}</span>
              </div>
            ))}
          </div>
        )}
        {holds.length > 0 && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            On hold (waiting for customer): {holds.map((o) => o.code).join(", ")}
          </div>
        )}
        {mine.length > 0 && !route.length && !holds.length && (
          <div className="rounded-2xl bg-emerald-50 p-5 text-center text-emerald-800">
            <CheckCircle2 className="mx-auto" />
            <div className="mt-1 font-semibold">All done for today</div>
            <div className="text-sm">Head back to the shop. Salamat, {first}!</div>
          </div>
        )}
      </div>

      {/* quick report dock */}
      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 border-t border-slate-200 bg-white/95 px-3 pb-4 pt-2.5 backdrop-blur">
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Quick report</div>
        <div className="grid grid-cols-3 gap-1.5">
          {REPORTS.map((r) => {
            const I = r.icon;
            const needsStop = r.type === "not_home" || r.type === "wrong_address";
            return (
              <button
                key={r.type}
                disabled={!mine.length || (needsStop && !cur)}
                onClick={() => report(r.type)}
                className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 py-2 text-[11.5px] font-medium text-slate-700 active:bg-slate-50 disabled:opacity-40"
              >
                <I size={17} className={r.cls} />
                {r.label}
              </button>
            );
          })}
        </div>
        <form
          className="mt-2 flex gap-1.5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!note.trim()) return;
            report("other", note.trim());
            setNote("");
          }}
        >
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Other note for dispatch…" className="h-9 flex-1 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-indigo-400" />
          <button type="submit" className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
            <Send size={14} />
          </button>
        </form>
      </div>

      {toast && <div className="fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-sm text-white shadow-lg">{toast}</div>}

      {sheet === "pod" && cur && <PodSheet orderId={cur.id} defaultName={cur.leaveWith ?? cur.customerName} onClose={() => setSheet(null)} onDone={(ok) => flash(ok ? "Delivered ✓ customer notified with photo" : "Photo needs a retake")} />}
      {sheet === "fail" && cur && (
        <Sheet title="Can't deliver" onClose={() => setSheet(null)}>
          <div className="space-y-2">
            <SheetBtn icon={UserX} label="Customer not home" sub="Hamilton checks the address book & contacts the customer" onClick={() => { report("not_home"); setSheet(null); }} />
            <SheetBtn icon={MapPinOff} label="Can't find address" sub="Stop goes on hold, customer asked to confirm" onClick={() => { report("wrong_address"); setSheet(null); }} />
            <SheetBtn icon={XCircle} label="Refused / damaged" sub="Mark failed and notify Maria" onClick={() => { s.failStop(cur.id, "Refused or damaged"); setSheet(null); }} />
          </div>
        </Sheet>
      )}
    </Shell>
  );
}

function PodSheet({ orderId, defaultName, onClose, onDone }: { orderId: string; defaultName: string; onClose: () => void; onDone: (ok: boolean) => void }) {
  const s = useStore();
  const [photo, setPhoto] = useState<string | null>(null);
  const [sample, setSample] = useState<SampleKind | undefined>();
  const [name, setName] = useState(defaultName);
  const busy = s.thinking[`pod-${orderId}`];
  const file = useRef<HTMLInputElement>(null);
  const o = s.orders.find((x) => x.id === orderId);

  useEffect(() => {
    if (o?.status === "delivered") {
      onDone(true);
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [o?.status]);
  const retake = o?.pod?.check.status === "retake" && !busy;

  return (
    <Sheet title="Proof of delivery" onClose={onClose}>
      <input
        ref={file}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (f) {
            setPhoto(await compress(f));
            setSample(undefined);
          }
        }}
      />
      <button onClick={() => file.current?.click()} className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">
        {photo ? <img src={photo} alt="proof" className="h-full w-full object-cover" /> : <span className="flex flex-col items-center gap-1 text-sm text-slate-500"><Camera /> Take photo</span>}
      </button>
      <div className="mt-2">
        <div className="mb-1 text-[11px] text-slate-400">Demo photos</div>
        <div className="grid grid-cols-3 gap-1.5">
          {(["good", "blurry", "nopackage"] as SampleKind[]).map((k) => (
            <button
              key={k}
              onClick={() => {
                setPhoto(SAMPLE_PHOTOS[k]);
                setSample(k);
              }}
              className={clsx("overflow-hidden rounded-lg border-2", sample === k ? "border-indigo-500" : "border-transparent")}
            >
              <img src={SAMPLE_PHOTOS[k]} alt={k} className="aspect-[4/3] w-full object-cover" />
              <div className="bg-white py-0.5 text-[10px] text-slate-500">{k === "good" ? "Clear" : k === "blurry" ? "Blurry" : "No package"}</div>
            </button>
          ))}
        </div>
      </div>
      <label className="mt-3 block text-xs text-slate-500">Received by</label>
      <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm" />
      {retake && (
        <div className="mt-3 rounded-lg bg-rose-50 p-2.5 text-[13px] text-rose-700">
          {o?.pod?.check.reasons.map((r) => (
            <div key={r}>• {r}</div>
          ))}
        </div>
      )}
      <div className="mt-3">
        {busy ? (
          <div className="flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-50 text-sm font-medium text-indigo-700">
            <Sparkles size={15} className="animate-pulse" /> Checking photo…
          </div>
        ) : (
          <BigBtn
            tone="green"
            icon={CheckCircle2}
            disabled={!photo}
            onClick={() => {
              void s.submitPod(orderId, { photo: photo ?? undefined, receivedBy: name, sample }).then(() => {
                const after = useStore.getState().orders.find((x) => x.id === orderId);
                if (after?.pod?.check.status === "retake") onDone(false);
              });
            }}
          >
            {retake ? "Submit new photo" : "Submit proof"}
          </BigBtn>
        )}
      </div>
    </Sheet>
  );
}

function Sheet({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div className="max-h-[92vh] w-full max-w-[430px] overflow-y-auto rounded-t-3xl bg-white p-4 pb-6" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-200" />
        <div className="mb-3 text-base font-semibold">{title}</div>
        {children}
      </div>
    </div>
  );
}

function SheetBtn({ icon: I, label, sub, onClick }: { icon: typeof UserX; label: string; sub: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-start gap-3 rounded-xl border border-slate-200 p-3 text-left active:bg-slate-50">
      <I size={18} className="mt-0.5 text-slate-600" />
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-slate-500">{sub}</div>
      </div>
    </button>
  );
}

function BigBtn({ children, onClick, icon: I, tone = "dark", disabled }: { children: React.ReactNode; onClick: () => void; icon: typeof Camera; tone?: "dark" | "green"; disabled?: boolean }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-semibold text-white disabled:opacity-40",
        tone === "dark" ? "bg-slate-900 active:bg-slate-800" : "bg-emerald-600 active:bg-emerald-700"
      )}
    >
      <I size={17} /> {children}
    </button>
  );
}

function Mem({ icon: I, text, strong }: { icon: typeof Hand; text: string; strong?: boolean }) {
  return (
    <div className={clsx("flex items-start gap-2 text-[13px]", strong ? "font-semibold text-emerald-700" : "text-slate-700")}>
      <I size={14} className="mt-0.5 shrink-0" /> {text}
    </div>
  );
}

function Banner({ tone, icon: I, title, body, action }: { tone: "amber" | "rose"; icon: typeof Coffee; title: string; body: string; action?: false | { label: string; run: () => void } }) {
  return (
    <div className={clsx("rounded-2xl border p-3.5", tone === "amber" ? "border-amber-200 bg-amber-50 text-amber-900" : "border-rose-200 bg-rose-50 text-rose-900")}>
      <div className="flex items-center gap-2 font-semibold">
        <I size={16} /> {title}
      </div>
      <div className="mt-0.5 text-[13px] opacity-80">{body}</div>
      {action && (
        <button onClick={action.run} className="mt-2.5 h-9 rounded-lg bg-white px-3 text-sm font-medium shadow-sm">
          {action.label}
        </button>
      )}
    </div>
  );
}
