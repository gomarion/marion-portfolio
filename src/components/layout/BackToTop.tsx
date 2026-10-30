"use client";

import { useEffect, useState } from "react";

// Floating link back to the header (`#top`, on every page). It fades in once
// the visitor has scrolled a full screen down. While hidden it is `inert`, so
// it can't be clicked or tabbed to. Smooth scrolling comes from globals.css.
//
// It sits at the end of a click-through layer that covers the page down to
// 100px above its bottom, or 120px below 640px, where the stacked footer is
// taller (the body is `relative`). Being `sticky`, it stays
// pinned to the corner of the screen while scrolling, then stops there and
// scrolls up with the page, so it never covers the footer.
export function BackToTop() {
  const [visible, setVisible] = useState(false);

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
    <div className="pointer-events-none absolute inset-x-0 top-0 bottom-30 z-30 sm:bottom-25 flex flex-col items-end justify-end">
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
