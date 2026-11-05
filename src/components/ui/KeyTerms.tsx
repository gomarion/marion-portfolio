"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const CYCLE_MS = 2000;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// Figma "Key terms - styled" (553:32): a #e3e3e3 pill, 43px tall with 12px
// side padding, behind an IBM Plex Mono Light 16 term. The pill moves on to
// the next term every 2s and wraps around. Only the highlighted term gets the
// pill's padding, so the terms around it shift aside as the pill moves; the
// padding and colour ease in and out together. Terms and " · " separators
// sit 15px apart, as do wrapped rows. With reduced motion the first term
// stays highlighted. Phones drop the separators, so a wrapped line never ends
// in one.
export function KeyTerms({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true,
  );

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % items.length),
      CYCLE_MS,
    );
    return () => window.clearInterval(timer);
  }, [reducedMotion, items.length]);

  const highlighted = reducedMotion ? 0 : active;

  return (
    <ul
      className={`flex flex-wrap items-center gap-3.75 font-code text-code ${className}`}
    >
      {items.map((item, index) => (
        <li key={item} className="flex items-center gap-3.75">
          {index > 0 && (
            <span aria-hidden className="hidden sm:inline">
              ·
            </span>
          )}
          <span
            className={`rounded-full transition-[padding,background-color] duration-500 ease-out ${
              index === highlighted
                ? "bg-pill px-3 py-2.5"
                : "bg-transparent"
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
