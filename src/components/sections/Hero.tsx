import Image from "next/image";
import { site } from "@/data/site";

// Figma "header" frame (3:31). The SiteHeader is overlaid on top of this
// section, so the top padding leaves room for it (192px on desktop).
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-paper">
      {/*
        Background photo: 1761×1174 at x −76 in a 1440 frame, mirrored
        horizontally, 37% opacity on white. min-h-full keeps it covering the
        section when the text wraps taller on small screens.
      */}
      <div className="absolute top-0 -left-[5.28%] -z-10 aspect-[1761/1174] min-h-full w-[122.29%] -scale-x-100">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          sizes="123vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover opacity-37"
        />
      </div>

      <div className="mx-auto max-w-360 px-4 pt-36 pb-12 sm:px-6 lg:pt-48 lg:pb-16.25 xl:pr-10 xl:pl-19">
        <p className="text-eyebrow text-accent uppercase">
          Hi, My name is Marion.
        </p>
        <h1 className="mt-2.75 max-w-177 font-code text-[1.625rem] leading-[normal] font-bold sm:text-hero-title">
          I build websites and web experiences for the modern web.
        </h1>
        <p className="mt-5.25 max-w-218.25 text-body font-light lg:text-lead">
          {site.description}
        </p>
      </div>
    </section>
  );
}
