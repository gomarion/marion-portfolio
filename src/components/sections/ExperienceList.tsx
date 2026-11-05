"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { experience } from "@/data/experience";
import { useCenterSpotlight } from "@/lib/useCenterSpotlight";
import { REDUCED_MOTION, useMedia } from "@/lib/useMedia";

// Below `sm`, where the entries stack and centre.
const PHONE = "(width < 40rem)";

// Each line's weight eases with the zoom (Inter and JetBrains Mono are
// variable fonts, so the change is smooth).
const WEIGHT = "transition-[font-weight] duration-300 ease-out";

// Two-column reveal: how far apart (ms) the entries start.
const STAGGER_MS = 150;

// While the list is armed the role and company are hidden and offset (role
// to the left, company to the right); once it plays they fade and slide in
// over 700ms, each entry after its --delay. The weight transition is kept
// alongside, since a `transition` shorthand replaces it.
const REVEAL_TRANSITION =
  "group-data-[reveal=play]/list:[transition:font-weight_300ms_ease-out,opacity_700ms_cubic-bezier(0.22,1,0.36,1)_var(--delay),translate_700ms_cubic-bezier(0.22,1,0.36,1)_var(--delay)]";
const REVEAL_ROLE = `group-data-[reveal=armed]/list:-translate-x-6 group-data-[reveal=armed]/list:opacity-0 ${REVEAL_TRANSITION}`;
const REVEAL_COMPANY = `group-data-[reveal=armed]/list:translate-x-6 group-data-[reveal=armed]/list:opacity-0 ${REVEAL_TRANSITION}`;

// The Experience entries.
// - Phones: the entry closest to the middle of the screen grows to 106% and
//   its text gets one step bolder (year and company to semibold, role to
//   bold), easing in and out, and hands over to the next as the page scrolls
//   down or up. Scaling doesn't change the layout, so nothing around it
//   moves. Each entry is only as wide as its text, so the grown box stays on
//   screen. Below 360px the text doesn't bolden, since the longest company
//   name would wrap and push the page down.
// - Two columns: the first time the whole section is on screen in a page load,
//   the entries reveal top to bottom, 150ms apart: the role slides in from
//   the left and the company from the right, both fading in. The year stays
//   put.
// Both are off for reduced motion. The reveal state lives in a data
// attribute set straight on the list, so it needs no re-render, and without
// JavaScript everything simply shows.
export function ExperienceList() {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  // Set once the reveal has played, so resizing doesn't replay it.
  const revealed = useRef(false);
  const phone = useMedia(PHONE);
  const reducedMotion = useMedia(REDUCED_MOTION);
  const grown = useCenterSpotlight(itemRefs, phone && !reducedMotion);

  useEffect(() => {
    const list = listRef.current;
    // Checks the media queries directly too: on the first render after
    // hydration `phone` and `reducedMotion` still read false.
    if (!list || phone || reducedMotion || revealed.current) return;
    if (
      window.matchMedia(PHONE).matches ||
      window.matchMedia(REDUCED_MOTION).matches
    ) {
      return;
    }
    list.dataset.reveal = "armed";
    // Wait for the whole section (heading included) to be on screen, or, on
    // a screen too short to fit it, for the section to fill the screen.
    const section = list.closest("section") ?? list;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const fullyVisible = entry.intersectionRatio >= 0.99;
        const fillsScreen =
          entry.intersectionRect.height >= window.innerHeight * 0.95;
        if (!fullyVisible && !fillsScreen) return;
        observer.disconnect();
        revealed.current = true;
        // Apply the hidden styles before starting, so they transition.
        void list.offsetHeight;
        list.dataset.reveal = "play";
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      if (!revealed.current) delete list.dataset.reveal;
    };
  }, [phone, reducedMotion]);

  return (
    <ul
      ref={listRef}
      className="group/list mt-12.75 flex flex-col gap-14 sm:gap-11"
    >
      {experience.map((job, index) => (
        <li
          key={`${job.years}-${job.company}`}
          ref={(node) => {
            itemRefs.current[index] = node;
          }}
          data-grown={grown === index || undefined}
          style={{ "--delay": `${index * STAGGER_MS}ms` } as CSSProperties}
          className="group self-center text-center text-body-sm transition-transform duration-300 ease-out data-grown:scale-106 sm:grid sm:grid-cols-[14.5rem_1fr] sm:self-stretch sm:text-left"
        >
          <p
            className={`font-mono ${WEIGHT} min-[22.5rem]:group-data-grown:font-semibold`}
          >
            {job.years}
          </p>
          <div>
            <p
              className={`text-body font-semibold ${WEIGHT} min-[22.5rem]:group-data-grown:font-bold ${REVEAL_ROLE}`}
            >
              {job.role}
            </p>
            <p
              className={`${WEIGHT} min-[22.5rem]:group-data-grown:font-semibold ${REVEAL_COMPANY}`}
            >
              {"url" in job ? (
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link underline-offset-4 hover:underline"
                >
                  {job.company}
                </a>
              ) : (
                job.company
              )}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
