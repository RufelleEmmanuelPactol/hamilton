"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * The whole demo is one scripted scenario: Monday 12 Oct, Maria's Flowers & Gifts.
 *
 *   before    10:30  Plan is running. All 4 drivers on time. No HAM-417.
 *   incident  10:42  Jun reported a flat tire (10:31). The Dispatch agent proposed moving 3 stops,
 *                    the autonomy policy held it (3 > 1-stop auto limit) and opened HAM-417.
 *   approved  10:44  Maria approved HAM-417. #1042 and #1050 moved to Ana, #1049 to Rico. Customers notified.
 *   rejected  10:44  Maria rejected HAM-417. Jun keeps his stops; #1042 and #1049 stay late.
 *
 * There are no model calls. Agent output is scripted; the policy check is real code (see policy.ts).
 */
export type Phase = "before" | "incident" | "approved" | "rejected";
export type Estimate = "under30" | "hour" | "unsure";
export type ColId = "review" | "scheduled" | "out" | "delivered" | "exceptions";
export type DriverId = "JR" | "CM" | "AV" | "RS";

/** An order Maria added by hand on the Orders board. */
export interface AddedOrder {
  id: string;
  title: string;
  area: string;
  window: string;
  /** ms timestamp, used to show the Dispatch agent picking a driver for a moment. */
  createdAt: number;
}

/** What the person changed on the Orders board by dragging, reassigning or adding cards. */
export interface BoardEdits {
  /** Column → order ids, top to bottom. Null until the first move; the scripted layout is used until then. */
  cols: Record<ColId, string[]> | null;
  drivers: Record<string, DriverId>;
  added: AddedOrder[];
}

export interface ScenarioState {
  phase: Phase;
  /** Jun's flat-tire report. Set when he taps "Send report" in the driver app. */
  report: { estimate: Estimate; note: string } | null;
  /** ms timestamp of the report, used to show the agent "working" for a moment after it. */
  reportedAt: number | null;
  /** ms timestamp of Maria's decision on HAM-417. */
  decidedAt: number | null;
  notifyCustomers: boolean;
  /** Jun tapped "I'm back on the road". */
  junBackOnRoad: boolean;
  board: BoardEdits;
  /** Stops the person moved on the Dispatch plan: driver key → upcoming order ids. Only applies in the phase it was made in. */
  dispatch: { phase: Phase; routes: Record<string, string[]> } | null;

  setBoard: (board: BoardEdits) => void;
  setDispatch: (dispatch: ScenarioState["dispatch"]) => void;
  reportFlat: (estimate: Estimate, note: string) => void;
  approve: () => void;
  reject: () => void;
  setNotifyCustomers: (v: boolean) => void;
  backOnRoad: () => void;
  /** Jump straight to a phase (used by ?step= for recording). */
  jumpTo: (phase: Phase) => void;
  reset: () => void;
}

export const INITIAL = {
  phase: "before" as Phase,
  report: null,
  reportedAt: null,
  decidedAt: null,
  notifyCustomers: true,
  junBackOnRoad: false,
  board: { cols: null, drivers: {}, added: [] } as BoardEdits,
  dispatch: null as ScenarioState["dispatch"],
};

export const useScenario = create<ScenarioState>()(
  persist(
    (set, get) => ({
      ...INITIAL,
      setBoard: (board) => set({ board }),
      setDispatch: (dispatch) => set({ dispatch }),
      reportFlat: (estimate, note) => {
        if (get().phase !== "before") return;
        set({ phase: "incident", report: { estimate, note }, reportedAt: Date.now() });
      },
      approve: () => {
        if (get().phase !== "incident") return;
        set({ phase: "approved", decidedAt: Date.now() });
      },
      reject: () => {
        if (get().phase !== "incident") return;
        set({ phase: "rejected", decidedAt: Date.now() });
      },
      setNotifyCustomers: (v) => set({ notifyCustomers: v }),
      backOnRoad: () => set({ junBackOnRoad: true }),
      jumpTo: (phase) =>
        set({
          ...INITIAL,
          phase,
          report: phase === "before" ? null : { estimate: "hour", note: "Flat on EDSA near Guadalupe" },
          reportedAt: phase === "before" ? null : 0,
          decidedAt: phase === "approved" || phase === "rejected" ? 0 : null,
        }),
      reset: () => set({ ...INITIAL }),
    }),
    {
      name: "hamilton-demo-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({
        phase: s.phase,
        report: s.report,
        reportedAt: s.reportedAt,
        decidedAt: s.decidedAt,
        notifyCustomers: s.notifyCustomers,
        junBackOnRoad: s.junBackOnRoad,
        board: s.board,
        dispatch: s.dispatch,
      }),
    },
  ),
);

/** True once the persisted state has loaded in the browser. Pages render after this to avoid a flash of the wrong phase. */
export const useHydrated = create<{ hydrated: boolean }>(() => ({ hydrated: false }));
