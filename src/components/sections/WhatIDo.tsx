import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceList } from "./ServiceList";

// Figma "What I do" (126:159): a 1150px centered block; heading, then a 2×2
// grid with 168px column and 75px row gaps (120px column gap below `xl`).
// Stacks to one column below `md`. On hover an item becomes a black card
// (Figma 165:49); its 15px padding is offset by a negative margin so the text
// doesn't move. ServiceList also lights the cards up on scroll.
export function WhatIDo() {
  return (
    <section id="what-i-do" className="mx-auto w-full max-w-287.5">
      <SectionHeading>What I do</SectionHeading>
      <ServiceList />
    </section>
  );
}
