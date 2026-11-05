"use client";

import { useRef } from "react";
import { experience } from "@/data/experience";
import { useCenterSpotlight } from "@/lib/useCenterSpotlight";
import { REDUCED_MOTION, useMedia } from "@/lib/useMedia";

// Below `sm`, where the entries stack and centre.
const PHONE = "(width < 40rem)";

// Each line's weight eases with the zoom (Inter and JetBrains Mono are
// variable fonts, so the change is smooth).
const WEIGHT = "transition-[font-weight] duration-300 ease-out";

// The Experience entries. On phones, the entry closest to the middle of the
// screen grows to 106% and its text gets one step bolder (year and company
// to semibold, role to bold), easing in and out, and hands over to the next
// as the page scrolls down or up. Scaling doesn't change the layout, so nothing
// around it moves. On phones each entry is only as wide as its text, so the
// grown box stays on screen. Below 360px the text doesn't bolden, since the
// longest company name would wrap and push the page down. Off for reduced
// motion.
export function ExperienceList() {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const phone = useMedia(PHONE);
  const reducedMotion = useMedia(REDUCED_MOTION);
  const grown = useCenterSpotlight(itemRefs, phone && !reducedMotion);

  return (
    <ul className="mt-12.75 flex flex-col gap-14 sm:gap-11">
      {experience.map((job, index) => (
        <li
          key={`${job.years}-${job.company}`}
          ref={(node) => {
            itemRefs.current[index] = node;
          }}
          data-grown={grown === index || undefined}
          className="group self-center text-center text-body-sm transition-transform duration-300 ease-out data-grown:scale-106 sm:grid sm:grid-cols-[14.5rem_1fr] sm:self-stretch sm:text-left"
        >
          <p className={`font-mono ${WEIGHT} min-[22.5rem]:group-data-grown:font-semibold`}>
            {job.years}
          </p>
          <div>
            <p
              className={`text-body font-semibold ${WEIGHT} min-[22.5rem]:group-data-grown:font-bold`}
            >
              {job.role}
            </p>
            <p className={`${WEIGHT} min-[22.5rem]:group-data-grown:font-semibold`}>
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
