"use client";
import { useLayoutEffect, useRef, type RefObject } from "react";

/**
 * FLIP animation for lists and boards: when an element marked `data-flip="<key>"` inside `root` changes position between renders,
 * it slides from where it was to where it is now; a key that wasn't there before fades and scales in.
 * Pass `paused` while a drag is in progress. Runs after every render (cheap: one getBoundingClientRect per marked element). Off when the viewer prefers reduced motion.
 */
export function useFlip(root: RefObject<HTMLElement | null>, opts: { enter?: boolean; paused?: boolean } = {}) {
  const prev = useRef<Map<string, { left: number; top: number }> | null>(null);
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const nodes = Array.from(el.querySelectorAll<HTMLElement>("[data-flip]"));
    // Positions relative to the root, so scrolling the page between renders doesn't count as movement.
    const o = el.getBoundingClientRect();
    const next = new Map<string, { left: number; top: number }>();
    for (const n of nodes) {
      const r = n.getBoundingClientRect();
      if (!r.width && !r.height) continue; // hidden (e.g. the card being dragged)
      next.set(n.dataset.flip!, { left: r.left - o.left, top: r.top - o.top });
    }
    const before = prev.current;
    prev.current = next;
    // While paused (e.g. mid-drag, where hit-testing needs rows where they really are) positions are tracked but not animated.
    if (!before || opts.paused || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    for (const n of nodes) {
      const key = n.dataset.flip!;
      const now = next.get(key);
      if (!now) continue;
      const was = before.get(key);
      if (!was) {
        if (opts.enter !== false)
          n.animate(
            [
              { opacity: 0, transform: "scale(.96) translateY(-4px)" },
              { opacity: 1, transform: "none" },
            ],
            { duration: 260, easing: "cubic-bezier(.2,.8,.2,1)" },
          );
        continue;
      }
      const dx = was.left - now.left;
      const dy = was.top - now.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) continue;
      n.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], {
        duration: 380,
        easing: "cubic-bezier(.2,.8,.2,1)",
      });
    }
  });
}
