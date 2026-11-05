"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// How each effect hides the element before it plays. The sideways slides
// only go sideways from `lg`; below that they rise like "up", so nothing
// pokes past the screen edge on phones.
const HIDDEN = {
  up: "data-[reveal=armed]:translate-y-10 data-[reveal=armed]:opacity-0",
  left: "data-[reveal=armed]:translate-y-10 data-[reveal=armed]:opacity-0 lg:data-[reveal=armed]:translate-y-0 lg:data-[reveal=armed]:-translate-x-12",
  right:
    "data-[reveal=armed]:translate-y-10 data-[reveal=armed]:opacity-0 lg:data-[reveal=armed]:translate-y-0 lg:data-[reveal=armed]:translate-x-12",
  zoom: "data-[reveal=armed]:scale-94 data-[reveal=armed]:opacity-0",
  // Clips the children rather than the element itself: a fully clipped
  // element never counts as on screen, so it would never play. It opens to
  // inset(0), not `none`, since browsers can't animate to `none`. Slower and
  // ease-in-out, so the wipe travels at an even pace instead of snapping
  // open like the fades' ease-out would.
  wipe: "data-[reveal=armed]:*:[clip-path:inset(0_0_100%_0)] data-[reveal=play]:*:[clip-path:inset(0)] data-[reveal=play]:*:transition-[clip-path] data-[reveal=play]:*:duration-1600 data-[reveal=play]:*:ease-[cubic-bezier(0.65,0,0.35,1)]",
} as const;

const PLAY =
  "data-[reveal=play]:transition-[opacity,translate,scale] data-[reveal=play]:duration-1000 data-[reveal=play]:ease-[cubic-bezier(0.22,1,0.36,1)]";

// Share of the element that has to be on screen before it plays, unless it
// already covers half the screen (tall images on phones).
const VISIBLE_SHARE = 0.35;

type RevealProps = {
  effect: keyof typeof HIDDEN;
  children: ReactNode;
  // Layout classes for the wrapper, plus any `delay-*` to stagger it.
  className?: string;
  style?: CSSProperties;
};

// Wraps an element that fades and moves into view the first time enough of
// it scrolls on screen (once per page load). The state lives in a data
// attribute set straight on the element, so it needs no re-render; without
// JavaScript, or with reduced motion, the element simply shows.
export function Reveal({
  effect,
  children,
  className = "",
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    element.dataset.reveal = "armed";
    const observer = new IntersectionObserver(
      ([entry]) => {
        const enough =
          entry.intersectionRatio >= VISIBLE_SHARE ||
          entry.intersectionRect.height >= window.innerHeight * 0.5;
        if (!enough) return;
        observer.disconnect();
        // Apply the hidden styles before starting, so they transition.
        void element.offsetHeight;
        element.dataset.reveal = "play";
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      if (element.dataset.reveal === "armed") delete element.dataset.reveal;
    };
  }, []);

  return (
    <div
      ref={ref}
      style={style}
      className={`${HIDDEN[effect]} ${PLAY} ${className}`}
    >
      {children}
    </div>
  );
}
