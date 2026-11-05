"use client";

import { useRef } from "react";
import type { CaseMedia } from "@/data/case-studies";
import { useSequence } from "@/lib/useSequence";
import { BoldOnActive } from "./BoldOnActive";
import { CaseIcon } from "./CaseIcon";

type Items = Extract<CaseMedia, { type: "highlights" }>["items"];

// Matches the homepage key terms' cycle (KeyTerms).
const CYCLE_MS = 2000;

// Figma "Frame 1321314393" (449:220): three columns 10px apart, each a 24px
// icon above an IBM Plex Mono 18 label, 10px between. Stacked on phones,
// 35px apart, where the icons are 20px tall and the labels 16px. Columns
// are 20px apart on tablets (sm to lg).
//
// Once the whole row is first on screen, the items take turns growing to
// 110%, 2s each (the homepage key terms' interval), each settling back as
// the next grows, and keep cycling (see useSequence). The growing item's
// label also turns bold (see BoldOnActive).
export function Highlights({ items }: { items: Items }) {
  const listRef = useRef<HTMLUListElement>(null);
  const active = useSequence(listRef, items.length, {
    stepMs: CYCLE_MS,
    loop: true,
  });

  return (
    <ul
      ref={listRef}
      className="grid gap-8.75 sm:grid-cols-3 sm:gap-5 lg:gap-2.5"
    >
      {items.map((item, index) => (
        <li
          key={item.label}
          data-active={active === index || undefined}
          className="group flex flex-col items-center gap-2.5 text-center transition-[scale] duration-500 ease-in-out data-active:scale-110"
        >
          <CaseIcon name={item.icon} className="max-sm:h-5 max-sm:w-auto" />
          <span className="font-code text-[1.125rem] leading-[1.5] tracking-design max-sm:text-base">
            <BoldOnActive text={item.label} bold="font-bold" />
          </span>
        </li>
      ))}
    </ul>
  );
}
