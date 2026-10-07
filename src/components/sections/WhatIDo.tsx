import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

// Figma "What I do" (126:159): a 1150px centered block; heading, then a 2×2
// grid with 168px column and 75px row gaps (120px column gap below `xl`).
// Stacks to one column below `md`. On hover an item becomes a black card
// (Figma 165:49); its 15px padding is offset by a negative margin so the text
// doesn't move.
export function WhatIDo() {
  return (
    <section id="what-i-do" className="mx-auto w-full max-w-287.5">
      <SectionHeading>What I do</SectionHeading>
      <ul className="mt-9.75 grid gap-y-12 md:grid-cols-2 md:gap-x-30 md:gap-y-18.75 xl:gap-x-42">
        {services.map((service, index) => (
          <li
            key={service.title}
            className="-m-3.75 flex flex-col gap-2.75 rounded-[5px] p-3.75 transition-[background-color,color,box-shadow] duration-200 hover:bg-ink hover:text-paper hover:shadow-card"
          >
            <h3 className="font-mono text-item-title">
              <span className="block">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="block">{service.title}</span>
            </h3>
            <p className="text-body-sm">{service.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
