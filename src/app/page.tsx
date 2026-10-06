import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Contact } from "@/components/sections/Contact";
import { CurrentlyExploring } from "@/components/sections/CurrentlyExploring";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        {/* Figma "body" (3:110): 1280px column, 100px top / 200px bottom
            padding, 180px between sections. */}
        <div className="mx-auto box-content flex max-w-content flex-col gap-30 px-4 pt-16 pb-30 sm:px-6 lg:gap-45 lg:px-10 lg:pt-25 lg:pb-50">
          <WhatIDo />
          <Experience />
          <CurrentlyExploring />
          <Contact />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
