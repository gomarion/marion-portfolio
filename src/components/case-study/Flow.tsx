"use client";

import { useRef } from "react";
import type { CaseMedia } from "@/data/case-studies";
import { useCenterSpotlight } from "@/lib/useCenterSpotlight";
import { REDUCED_MOTION, useMedia } from "@/lib/useMedia";
import { BoldOnActive } from "./BoldOnActive";
import { CaseIcon } from "./CaseIcon";

type Steps = Extract<CaseMedia, { type: "flow" }>["steps"];

// A step growing while it's the one nearest the middle of the screen.
const STEP =
  "group transition-[scale] duration-500 ease-in-out data-active:scale-106";

// Figma "Frame 1321314393" (478:310): an 800px column, steps 50px apart.
// Boxes have a 1px #686363 outline, 10px corners and 30px top and bottom
// padding, with the icon, an IBM Plex Mono SemiBold 18 title and a Light 16
// detail, 10px apart. Connectors are an icon over a Light 16 note.
//
// On every screen size, the step closest to the middle of the screen grows
// to 106% and hands over to the next as the page scrolls down or up (see
// useCenterSpotlight), and its text gets one step bolder: titles to bold,
// details and notes from light to regular (see BoldOnActive). Off for
// reduced motion.
export function Flow({ steps }: { steps: Steps }) {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const reducedMotion = useMedia(REDUCED_MOTION);
  const active = useCenterSpotlight(itemRefs, !reducedMotion);

  return (
    <ol className="mx-auto flex max-w-200 flex-col gap-12.5 text-center font-code tracking-design">
      {steps.map((step, index) =>
        step.kind === "box" ? (
          <li
            key={step.title}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            data-active={active === index || undefined}
            className={`flex flex-col items-center gap-2.5 rounded-[10px] border border-[#686363] px-4 py-7.5 ${STEP}`}
          >
            <CaseIcon name={step.icon} />
            <span className="text-[1.125rem] leading-[1.5] font-semibold">
              <BoldOnActive text={step.title} bold="font-bold" />
            </span>
            <span className="text-body-sm font-light">
              <BoldOnActive text={step.detail} bold="font-normal" />
            </span>
          </li>
        ) : (
          <li
            key={step.text}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            data-active={active === index || undefined}
            className={`flex flex-col items-center gap-2.5 px-4 ${STEP}`}
          >
            <CaseIcon name={step.icon} flip={step.flip} />
            <span className="text-body-sm font-light">
              <BoldOnActive text={step.text} bold="font-normal" />
            </span>
          </li>
        ),
      )}
    </ol>
  );
}
