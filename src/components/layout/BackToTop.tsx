"use client";

import { useEffect, useState } from "react";

// Floating link back to the header (`#top`, on every page). It fades in once
// the visitor has scrolled a full screen down. While hidden it is `inert`, so
// it can't be clicked or tabbed to. Smooth scrolling comes from globals.css.
//
// It sits at the end of a click-through layer that covers the page down to
// a gap above the footer (the body is `relative`). Being `sticky`, it stays
// pinned to the corner of the screen while scrolling, then stops there and
// scrolls up with the page, so it never covers the footer. The footer's
// height changes as its text wraps, so the layer's bottom is measured; the
// classes are the fallback before that runs, or on a page with no footer.
const FOOTER_GAP = 16;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [bottom, setBottom] = useState<number>();

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    // Distance from the footer's top to the body's bottom, which also counts
    // anything rendered after the footer.
    const measure = () =>
      setBottom(
        document.body.getBoundingClientRect().bottom -
          footer.getBoundingClientRect().top +
          FOOTER_GAP,
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(footer);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 bottom-36 z-30 sm:bottom-30 md:bottom-25 flex flex-col items-end justify-end"
      style={bottom === undefined ? undefined : { bottom }}
    >
      <a
        href="#top"
        aria-label="Back to top"
        inert={!visible}
        className={`pointer-events-auto sticky mr-4 bottom-4 flex size-12 items-center justify-center rounded-full bg-ink text-paper shadow-[0_2px_8px_rgb(0_0_0/0.3)] transition-[opacity,transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-offset-4 hover:bg-graphite focus-visible:outline-2 focus-visible:outline-ink motion-reduce:transition-none sm:mr-6 sm:bottom-6 lg:mr-10 lg:bottom-10 ${
          visible ? "opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="size-6 fill-none stroke-current stroke-2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 15l7-7 7 7" />
        </svg>
      </a>
    </div>
  );
}
