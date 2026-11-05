"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { services } from "@/data/services";

// Two columns from `md`: the desktop sequence. Below it: the scroll spotlight.
const TWO_COLUMNS = "(min-width: 48rem)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Desktop: the order the cards light up in, how long each stays lit, and how
// long each fades in and out (the `duration-700` below). The fades overlap,
// so one card dims as the next lights up. After the last one, every card is
// unlit for PAUSE_MS (its fade-out plus a short beat), then all four light
// together for ALL_MS before fading back to normal.
const SEQUENCE = [0, 3, 2, 1];
const STEP_MS = 900;
const PAUSE_MS = 650;
const ALL_MS = 1200;
const FADE_MS = 700;

function subscribeMedia(query: string) {
  return (onChange: () => void) => {
    const list = window.matchMedia(query);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  };
}

function useMedia(query: string) {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

// The "What I do" grid. An item turns into the black hover card (Figma
// 165:49) on hover, and also while it is "lit":
// - Two columns: the first time the grid scrolls into view on a page load,
//   the cards light one after another, 01 → 04 → 03 → 02, then after a
//   short pause all four together, then go back to normal. The fades are slower and softer than a hover's. Hover is off
//   until the last card has faded out, and the sequence is skipped for
//   reduced motion.
// - One column: the item closest to the middle of the screen is lit, and
//   stays lit until the next one is closer, scrolling down or up.
export function ServiceList() {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const timers = useRef<number[]>([]);
  // Set once the sequence has started, so resizing across `md` doesn't
  // replay it.
  const played = useRef(false);
  // The lit item's index, "all" for every item, or null.
  const [lit, setLit] = useState<number | "all" | null>(null);
  // True while the desktop sequence runs, including the final fade-out.
  const [sequencing, setSequencing] = useState(false);
  const twoColumns = useMedia(TWO_COLUMNS);
  const reducedMotion = useMedia(REDUCED_MOTION);

  const stopSequence = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  };

  // Desktop sequence.
  useEffect(() => {
    const list = listRef.current;
    if (!twoColumns || reducedMotion || !list || played.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        played.current = true;
        setSequencing(true);
        SEQUENCE.forEach((index, step) => {
          timers.current.push(
            window.setTimeout(() => setLit(index), step * STEP_MS),
          );
        });
        const pauseAt = SEQUENCE.length * STEP_MS;
        const allAt = pauseAt + PAUSE_MS;
        timers.current.push(
          window.setTimeout(() => setLit(null), pauseAt),
          window.setTimeout(() => setLit("all"), allAt),
          window.setTimeout(() => setLit(null), allAt + ALL_MS),
          window.setTimeout(
            () => {
              timers.current = [];
              setSequencing(false);
            },
            allAt + ALL_MS + FADE_MS,
          ),
        );
      },
      { threshold: 0.6 },
    );
    observer.observe(list);
    return () => {
      observer.disconnect();
      stopSequence();
      setLit(null);
      setSequencing(false);
    };
  }, [twoColumns, reducedMotion]);

  // Mobile spotlight: on scroll, the item whose centre is closest to the
  // middle of the screen is lit, so the light hands over exactly halfway
  // between two items and a fast flick can't skip one. Nothing is lit until
  // that item reaches the middle 20% of the screen, so the light starts and
  // ends with the list.
  useEffect(() => {
    if (twoColumns) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const middle = window.innerHeight / 2;
      let closest: number | null = null;
      let closestDistance = Infinity;
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const box = item.getBoundingClientRect();
        const distance = Math.abs((box.top + box.bottom) / 2 - middle);
        if (distance < closestDistance) {
          closest = index;
          closestDistance = distance;
        }
      });
      if (closest !== null) {
        const box = itemRefs.current[closest]!.getBoundingClientRect();
        const band = window.innerHeight * 0.1;
        if (box.bottom < middle - band || box.top > middle + band) {
          closest = null;
        }
      }
      setLit(closest);
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
      setLit(null);
    };
  }, [twoColumns]);

  return (
    <ul
      ref={listRef}
      className="mt-9.75 grid gap-y-12 md:grid-cols-2 md:gap-x-30 md:gap-y-18.75 xl:gap-x-42"
    >
      {services.map((service, index) => (
        <li
          key={service.title}
          ref={(node) => {
            itemRefs.current[index] = node;
          }}
          data-lit={lit === "all" || lit === index || undefined}
          className={`-m-3.75 flex flex-col gap-2.75 rounded-[5px] p-3.75 transition-[background-color,color,box-shadow] data-lit:bg-ink data-lit:text-paper data-lit:shadow-card ${
            sequencing
              ? "duration-700 ease-in-out"
              : "duration-200 hover:bg-ink hover:text-paper hover:shadow-card"
          }`}
        >
          <h3 className="font-mono text-item-title max-sm:text-[1.375rem]">
            <span className="block">{String(index + 1).padStart(2, "0")}</span>
            <span className="block">{service.title}</span>
          </h3>
          <p className="text-body-sm">{service.description}</p>
        </li>
      ))}
    </ul>
  );
}
