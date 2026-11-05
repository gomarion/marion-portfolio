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

// Longest wait (ms) for the images to load before playing anyway.
const MAX_IMAGE_WAIT_MS = 2500;

// Resolves once every image inside `element` has loaded and decoded (or
// failed), or after MAX_IMAGE_WAIT_MS, so an animation never plays over an
// image that's still downloading and then pops in.
function imagesReady(element: HTMLElement) {
  const images = [...element.querySelectorAll("img")];
  const ready = Promise.all(
    images.map((image) => image.decode().catch(() => undefined)),
  );
  const timeout = new Promise((resolve) =>
    window.setTimeout(resolve, MAX_IMAGE_WAIT_MS),
  );
  return Promise.race([ready, timeout]);
}

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
// JavaScript, or with reduced motion, the element simply shows. It waits
// for its images to be ready before playing (see imagesReady).
//
// A wipe hides its images with a full clip, and browsers don't start
// lazy-loading an image they consider invisible, so it would only start
// downloading once the wipe had begun. A wipe's images are therefore told to
// load once the element is within a screen's height of view.
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
    let cancelled = false;

    const preload = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        preload.disconnect();
        element.querySelectorAll("img").forEach((image) => {
          image.loading = "eager";
        });
      },
      { rootMargin: "100% 0px" },
    );
    if (effect === "wipe") preload.observe(element);

    const observer = new IntersectionObserver(
      ([entry]) => {
        const enough =
          entry.intersectionRatio >= VISIBLE_SHARE ||
          entry.intersectionRect.height >= window.innerHeight * 0.5;
        if (!enough) return;
        observer.disconnect();
        preload.disconnect();
        element.querySelectorAll("img").forEach((image) => {
          image.loading = "eager";
        });
        imagesReady(element).then(() => {
          if (cancelled) return;
          // Apply the hidden styles before starting, so they transition.
          void element.offsetHeight;
          element.dataset.reveal = "play";
        });
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );
    observer.observe(element);
    return () => {
      cancelled = true;
      observer.disconnect();
      preload.disconnect();
      if (element.dataset.reveal === "armed") delete element.dataset.reveal;
    };
  }, [effect]);

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
