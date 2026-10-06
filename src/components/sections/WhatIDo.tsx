import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

// Figma "What I do" (126:159): heading, then a 2×2 grid with 168px column
// and 75px row gaps. Stacks to one column below `md`.
export function WhatIDo() {
  return (
    <section id="what-i-do">
      <SectionHeading>What I do</SectionHeading>
      <ul className="mt-9.75 grid gap-y-12 md:grid-cols-2 md:gap-x-42 md:gap-y-18.75">
        {services.map((service, index) => (
          <li key={service.title} className="flex flex-col gap-2.75">
            <h3 className="font-mono text-item-title">
              <span className="block">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="block">{service.title}</span>
            </h3>
            <p className="text-body">{service.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
