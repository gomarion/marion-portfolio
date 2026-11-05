"use client";

import { useEffect, useState, type RefObject } from "react";
import { REDUCED_MOTION } from "./useMedia";

// Steps through `count` items one after another, `stepMs` apart, the first
// time the element is wholly on screen (or, if it's taller than the screen,
// fills it), once per page load. Returns the current item's index, or null
// before and after the run. With `loop`, it never stops: after the last item
// it goes back to the first. Skipped for reduced motion.
export function useSequence(
  ref: RefObject<HTMLElement | null>,
  count: number,
  { stepMs = 700, loop = false }: { stepMs?: number; loop?: boolean } = {},
) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia(REDUCED_MOTION).matches) return;
    const timers: number[] = [];
    let interval = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const fullyVisible = entry.intersectionRatio >= 0.99;
        const fillsScreen =
          entry.intersectionRect.height >= window.innerHeight * 0.95;
        if (!fullyVisible && !fillsScreen) return;
        observer.disconnect();
        if (loop) {
          let index = 0;
          setActive(index);
          interval = window.setInterval(() => {
            index = (index + 1) % count;
            setActive(index);
          }, stepMs);
          return;
        }
        for (let index = 0; index < count; index++) {
          timers.push(
            window.setTimeout(() => setActive(index), index * stepMs),
          );
        }
        timers.push(window.setTimeout(() => setActive(null), count * stepMs));
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearInterval(interval);
    };
  }, [ref, count, stepMs, loop]);

  return active;
}
