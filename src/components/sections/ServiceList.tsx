"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/data/services";
import { useCenterSpotlight } from "@/lib/useCenterSpotlight";
import { REDUCED_MOTION, useMedia } from "@/lib/useMedia";

// Two columns from `md`: the desktop sequence. Below it: the scroll spotlight.
const TWO_COLUMNS = "(min-width: 48rem)";
// Where hover takes over from the tap toggles (see the toggle button).
const MOUSE_WIDE = "(hover: hover) and (min-width: 64rem)";

// Desktop: the order the cards light up in, how long each stays lit, and how
// long each fades in and out (the `duration-700` below). The fades overlap,
// so one card dims as the next lights up. After the last one, every card is
// unlit for PAUSE_MS (its fade-out plus a short beat), then all four light
// together for ALL_MS before fading back to normal.
const SEQUENCE = [0, 1, 2, 3];
const STEP_MS = 900;
const PAUSE_MS = 650;
const ALL_MS = 1200;
const FADE_MS = 700;

// The "What I do" grid. An item turns into the black hover card (Figma
// 165:49) on hover, and also while it is "lit":
// - Two columns: the first time the grid scrolls into view on a page load,
//   the cards light one after another, 01 → 02 → 03 → 04, then after a
//   short pause all four together, then go back to normal. The fades are
//   slower and softer than a hover's. Hover is off until the last card has
//   faded out, and the sequence is skipped for reduced motion.
// - One column: the item closest to the middle of the screen is lit, and
//   stays lit until the next one is closer, scrolling down or up.
// - Tablets and other two-column screens without hover: tapping an item
//   lights it and turns any other back to default; tapping the lit item
//   turns it off. One item at a time, and a tap during the sequence ends
//   it. The tap target is a full-size invisible toggle button. Once the
//   sequence ends, 01 stays lit until something is tapped (from the start,
//   with reduced motion). Phones keep only the scroll spotlight.
export function ServiceList() {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const timers = useRef<number[]>([]);
  // Set once the sequence has started, so resizing across `md` doesn't
  // replay it.
  const played = useRef(false);
  // Desktop sequence: the lit item's index, "all" for every item, or null.
  const [lit, setLit] = useState<number | "all" | null>(null);
  // True while the desktop sequence runs, including the final fade-out.
  const [sequencing, setSequencing] = useState(false);
  const twoColumns = useMedia(TWO_COLUMNS);
  const reducedMotion = useMedia(REDUCED_MOTION);

  const stopSequence = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  };

  // Two columns: the tapped item (null once it's tapped off); undefined
  // until the first tap, so the items follow the sequence.
  const [picked, setPicked] = useState<number | null>();
  const mouseWide = useMedia(MOUSE_WIDE);
  const tablet = twoColumns && !mouseWide;

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
          window.setTimeout(() => {
            setLit(null);
            // Tablets: 01 stays lit, unless something was tapped.
            if (!window.matchMedia(MOUSE_WIDE).matches) {
              setPicked((current) => (current === undefined ? 0 : current));
            }
          }, allAt + ALL_MS),
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

  // Mobile spotlight.
  const spotlight = useCenterSpotlight(itemRefs, !twoColumns);
  const isLit = (index: number) => {
    if (!twoColumns) return spotlight === index;
    if (picked !== undefined) return picked === index;
    if (tablet && reducedMotion) return index === 0;
    return lit === "all" || lit === index;
  };
  const toggle = (index: number) => {
    stopSequence();
    setLit(null);
    setSequencing(false);
    setPicked(picked === index ? null : index);
  };

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
          data-lit={isLit(index) || undefined}
          className={`relative -m-3.75 flex flex-col gap-2.75 rounded-[5px] p-3.75 transition-[background-color,color,box-shadow] data-lit:bg-ink data-lit:text-paper data-lit:shadow-card ${
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
          {/* Two columns only (phones have the spotlight), and hidden where
              there's a mouse on a wide screen, since hover does it. */}
          <button
            type="button"
            aria-pressed={isLit(index)}
            aria-label={`Highlight ${service.title}`}
            onClick={() => toggle(index)}
            className="absolute inset-0 cursor-pointer rounded-[5px] outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink max-md:hidden [@media(hover:hover)_and_(min-width:64rem)]:hidden"
          />
        </li>
      ))}
    </ul>
  );
}
