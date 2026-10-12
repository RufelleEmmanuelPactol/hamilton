"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useScenario, useHydrated, type Phase } from "@/lib/store";

const PHASES: Phase[] = ["before", "incident", "approved", "rejected"];

/**
 * Loads the saved demo state, keeps tabs in sync, and handles the hidden presenter controls:
 *   ?reset=1            back to 10:30, before the flat tire (the param is then removed)
 *   ?step=<phase>       jump to before | incident | approved | rejected (for recording)
 *   Shift+Alt+R         reset from the keyboard
 * None of these are shown in the UI.
 */
export function ScenarioRuntime() {
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const reset = url.searchParams.has("reset");
    const step = url.searchParams.get("step") as Phase | null;
    Promise.resolve(useScenario.persist.rehydrate()).then(() => {
      if (reset) useScenario.getState().reset();
      if (step && PHASES.includes(step)) useScenario.getState().jumpTo(step);
      if (reset || step) {
        url.searchParams.delete("reset");
        url.searchParams.delete("step");
        window.history.replaceState(null, "", url.pathname + url.search + url.hash);
      }
      useHydrated.setState({ hydrated: true });
    });

    // Another tab (e.g. the driver app) changed the scenario.
    const onStorage = (e: StorageEvent) => {
      if (e.key === useScenario.persist.getOptions().name) useScenario.persist.rehydrate();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.altKey && e.code === "KeyR") {
        e.preventDefault();
        useScenario.getState().reset();
      }
    };
    // Board markup uses plain <a href="/app/...">. Route those client-side so state and scroll feel instant.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      const href = a?.getAttribute("href");
      if (!a || !href || a.target || !href.startsWith("/") || href.startsWith("//")) return;
      // Presenter params are handled on page load, so let those links load normally.
      if (/[?&](reset|step)=/.test(href)) return;
      e.preventDefault();
      router.push(href);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [router]);

  return null;
}

/** Renders children only after the saved demo state has loaded. */
export function Hydrated({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated((s) => s.hydrated);
  return hydrated ? <>{children}</> : null;
}
