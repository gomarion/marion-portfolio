import type { CaseMedia } from "@/data/case-studies";
import { CaseIcon } from "./CaseIcon";

type Items = Extract<CaseMedia, { type: "highlights" }>["items"];

// Figma "Frame 1321314393" (449:220): three columns 10px apart, each a 24px
// icon above an IBM Plex Mono 18 label, 10px between. Stacked on phones,
// 35px apart, where the icons are 20px tall and the labels 16px.
export function Highlights({ items }: { items: Items }) {
  return (
    <ul className="grid gap-8.75 sm:grid-cols-3 sm:gap-2.5">
      {items.map((item) => (
        <li
          key={item.label}
          className="flex flex-col items-center gap-2.5 text-center"
        >
          <CaseIcon name={item.icon} className="max-sm:h-5 max-sm:w-auto" />
          <span className="font-code text-[1.125rem] leading-[1.5] tracking-design max-sm:text-base">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
