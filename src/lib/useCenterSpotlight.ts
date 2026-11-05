"use client";

import { useEffect, useState, type RefObject } from "react";

// Share of the screen height, either side of the middle, that the closest
// item has to reach before it counts.
const BAND = 0.1;

// Returns the index of the item whose centre is closest to the middle of the
// screen, updated as the page scrolls, or null when `enabled` is false. The
// choice hands over exactly halfway between two items, so a fast flick can't
// skip one. Nothing is picked until that item reaches the middle 20% of the
// screen, so it starts and ends with the list.
export function useCenterSpotlight(
  itemRefs: RefObject<(HTMLElement | null)[]>,
  enabled: boolean,
) {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const middle = window.innerHeight / 2;
      let closest: number | null = null;
      let closestBox: DOMRect | null = null;
      let closestDistance = Infinity;
      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        const box = item.getBoundingClientRect();
        const distance = Math.abs((box.top + box.bottom) / 2 - middle);
        if (distance < closestDistance) {
          closest = i;
          closestBox = box;
          closestDistance = distance;
        }
      });
      const band = window.innerHeight * BAND;
      const box = closestBox as DOMRect | null;
      if (box && (box.bottom < middle - band || box.top > middle + band)) {
        closest = null;
      }
      setIndex(closest);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [itemRefs, enabled]);

  return enabled ? index : null;
}
