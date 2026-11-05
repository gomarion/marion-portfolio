"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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

// From `xl`, once the reveal has finished (the last entry starts after
// 4 × STAGGER_MS and takes 700ms), each entry's bubble shows in turn, then
// hover takes over. During the tour the bubbles fade in over 300ms and out
// over BUBBLE_FADE_MS, with ease-in-out (a touch softer than a hover's pop).
// Each is shown for
// BUBBLE_SHOW_MS (its fade-in plus a hold), and the next only starts once
// it has fully faded out, plus BUBBLE_GAP_MS, so they never overlap.
const WIDE = "(min-width: 80rem)";
const REVEAL_MS = (experience.length - 1) * STAGGER_MS + 700;
const BUBBLE_FADE_MS = 350;
const BUBBLE_SHOW_MS = 1000;
const BUBBLE_GAP_MS = 50;
const BUBBLE_STEP_MS = BUBBLE_SHOW_MS + BUBBLE_FADE_MS + BUBBLE_GAP_MS;

// While the list is armed the role and company are hidden and offset (role
// to the left, company to the right); once it plays they fade and slide in
// over 700ms, each entry after its --delay. The weight transition is kept
// alongside, since a `transition` shorthand replaces it.
const REVEAL_TRANSITION =
  "group-data-[reveal=play]/list:[transition:font-weight_300ms_ease-out,opacity_700ms_cubic-bezier(0.22,1,0.36,1)_var(--delay),translate_700ms_cubic-bezier(0.22,1,0.36,1)_var(--delay)]";
const REVEAL_ROLE = `group-data-[reveal=armed]/list:-translate-x-6 group-data-[reveal=armed]/list:opacity-0 ${REVEAL_TRANSITION}`;
const REVEAL_COMPANY = `group-data-[reveal=armed]/list:translate-x-6 group-data-[reveal=armed]/list:opacity-0 ${REVEAL_TRANSITION}`;

// Each entry's description. From `xl` it's a speech bubble to the right of
// the column (white, 1px ink outline, tail pointing back at the entry) that
// fades and pops in while the entry is hovered or has focus (a tap focuses
// it on touch screens). Below `xl` there's no room beside the column, so it
// opens inline under the entry instead: tapping the role toggles it (one at
// a time), keyboard focus opens it too, and the height eases open. Hidden
// descriptions are `invisible`, so screen readers skip them until opened.
const DETAILS = [
  // Inline, below `xl`.
  "grid grid-rows-[0fr] opacity-0 invisible sm:col-start-2 max-xl:transition-[grid-template-rows,opacity,visibility] max-xl:duration-300 max-xl:ease-out",
  "max-xl:group-data-open/exp:visible max-xl:group-data-open/exp:grid-rows-[1fr] max-xl:group-data-open/exp:opacity-100",
  "max-xl:group-has-[button:focus-visible]/exp:visible max-xl:group-has-[button:focus-visible]/exp:grid-rows-[1fr] max-xl:group-has-[button:focus-visible]/exp:opacity-100",
  // Bubble, from `xl`. The width fills the space beside the column, up to
  // 22rem.
  "xl:absolute xl:top-1/2 xl:left-full xl:z-10 xl:ml-8 xl:w-[min(22rem,calc((100vw-34.375rem)/2-5.5rem))] xl:-translate-y-1/2 xl:origin-left xl:scale-95 xl:grid-rows-[1fr] xl:rounded-2xl xl:border xl:border-ink xl:bg-paper xl:px-5 xl:py-4 xl:text-left xl:text-[0.9375rem] xl:tracking-normal xl:shadow-[0_6px_20px_rgb(0_0_0/0.12)] xl:transition-[opacity,scale,visibility]",
  "xl:group-focus-within/exp:visible xl:group-focus-within/exp:scale-100 xl:group-focus-within/exp:opacity-100",
  // Shown by the bubble tour (data-bubble on the entry).
  "xl:group-data-bubble/exp:visible xl:group-data-bubble/exp:scale-100 xl:group-data-bubble/exp:opacity-100",
  // The tail: a rotated square on the bubble's left edge, two sides outlined.
  "xl:before:absolute xl:before:top-1/2 xl:before:-left-[9px] xl:before:size-4 xl:before:-translate-y-1/2 xl:before:rotate-45 xl:before:border-b xl:before:border-l xl:before:border-ink xl:before:bg-paper",
].join(" ");

// Hovering shows the bubble too, but only once the reveal and the bubble
// tour are over (before that, a cursor crossing the list while scrolling
// would flash bubbles). The tour fades the bubbles more slowly: a transition takes its timing from the
// state it's heading to, so the shown state's `duration-300` sets the
// fade-in and the base `duration-350` (BUBBLE_FADE_MS) the fade-out.
const DETAILS_HOVER =
  "xl:duration-200 xl:ease-out xl:group-hover/exp:visible xl:group-hover/exp:scale-100 xl:group-hover/exp:opacity-100";
const DETAILS_HOVER_OFF = "xl:duration-200 xl:ease-out";
const DETAILS_TOUR =
  "xl:duration-350 xl:ease-in-out xl:group-data-bubble/exp:duration-300";

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
// - Every size: each entry's description shows on hover, focus or tap (see
//   DETAILS); the role is the button that opens it. From `xl`, after the
//   reveal, the bubbles first show one after another, 01 → 05, and hover
//   only takes over once they're done.
// Both animations are off for reduced motion. The reveal state lives in a data
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
  // The entry whose description is open inline (below `xl`).
  const [open, setOpen] = useState<number | null>(null);
  // Bubble tour (from `xl`): the entry whose bubble is showing, and whether
  // the tour (from the reveal's start to the last bubble's fade-out) runs.
  const [bubble, setBubble] = useState<number | null>(null);
  const [touring, setTouring] = useState(false);
  // Whether hover may show bubbles: once the reveal (and, from `xl`, the
  // tour) is done. With reduced motion there's no reveal, so straight away.
  const [hoverReady, setHoverReady] = useState(false);
  const hoverEnabled = hoverReady || reducedMotion;

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
    const timers: number[] = [];
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
        if (!window.matchMedia(WIDE).matches) {
          setHoverReady(true);
          return;
        }
        setTouring(true);
        experience.forEach((_, index) => {
          const start = REVEAL_MS + index * BUBBLE_STEP_MS;
          timers.push(
            window.setTimeout(() => setBubble(index), start),
            window.setTimeout(() => setBubble(null), start + BUBBLE_SHOW_MS),
          );
        });
        const end =
          REVEAL_MS +
          (experience.length - 1) * BUBBLE_STEP_MS +
          BUBBLE_SHOW_MS +
          BUBBLE_FADE_MS;
        timers.push(
          window.setTimeout(() => {
            setTouring(false);
            setHoverReady(true);
          }, end),
        );
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      setBubble(null);
      setTouring(false);
      // A tour cut short (e.g. by resizing) still hands over to hover.
      if (revealed.current) setHoverReady(true);
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
          data-open={open === index || undefined}
          data-bubble={bubble === index || undefined}
          style={{ "--delay": `${index * STAGGER_MS}ms` } as CSSProperties}
          className="group group/exp relative self-center text-center text-body-sm transition-transform duration-300 ease-out data-grown:scale-106 sm:grid sm:grid-cols-[14.5rem_1fr] sm:self-stretch sm:text-left"
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
              <button
                type="button"
                aria-expanded={open === index}
                aria-controls={`experience-details-${index}`}
                onClick={() =>
                  setOpen((current) => (current === index ? null : index))
                }
                className="cursor-pointer rounded-sm outline-offset-4 focus-visible:outline-2 focus-visible:outline-ink xl:cursor-default"
              >
                {job.role}
                <Chevron />
              </button>
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
          <div
            id={`experience-details-${index}`}
            className={`${DETAILS} ${touring ? DETAILS_TOUR : hoverEnabled ? DETAILS_HOVER : DETAILS_HOVER_OFF}`}
          >
            <div className="overflow-hidden">
              <p className="max-xl:pt-3">{job.description}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

// Font Awesome's solid chevron (public/images/icons), turned to point down,
// and up while the entry is open. Below `xl` only, as a cue that the role
// opens more.
function Chevron() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 640 640"
      className="ml-1.5 inline size-3.5 -rotate-90 fill-current align-[-0.1em] transition-transform duration-300 group-data-open/exp:rotate-90 xl:hidden"
    >
      <path d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z" />
    </svg>
  );
}
