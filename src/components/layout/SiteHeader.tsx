import Image from "next/image";
import { navHref, navItems, site } from "@/data/site";
import { MobileNav } from "./MobileNav";

type SiteHeaderProps = {
  // "overlay" sits on top of the homepage Hero, which supplies the background.
  // "bar" is the standalone header used on subpages like case studies.
  variant?: "overlay" | "bar";
};

// Figma "Frame 18" (148:100): sits at x 76 / y 56 inside the 1440px hero and
// spans to x 1400. Desktop nav items grow a 5px bar under the label on hover;
// the bar's negative bottom margin keeps it from adding height, so the nav
// doesn't shift.
//
// The "bar" variant is Figma "header" (259:31) on the case study pages: an
// 82px white bar with 14px vertical padding, showing the top of the
// mirrored hero photo at 37% opacity behind it, as on the homepage.
export function SiteHeader({ variant = "overlay" }: SiteHeaderProps) {
  const onHome = variant === "overlay";

  return (
    <header
      id="top"
      className={
        onHome
          ? "absolute inset-x-0 top-0 z-10"
          : "relative isolate z-10 bg-paper"
      }
    >
      {!onHome && (
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 -left-[5.28%] aspect-[1761/1174] w-[122.29%] -scale-x-100">
            <Image
              src="/images/hero-bg.jpg"
              alt=""
              fill
              sizes="123vw"
              loading="eager"
              className="object-cover opacity-37"
            />
          </div>
        </div>
      )}

      <div
        className={`mx-auto flex max-w-360 items-center justify-between gap-6 px-4 sm:px-6 xl:pr-10 xl:pl-19 ${
          onHome ? "pt-6 lg:pt-14" : "py-3.5"
        }`}
      >
        <a
          href={navHref("#top", onHome)}
          className="flex min-w-0 items-center gap-2.5"
        >
          <Image
            src="/images/avatar.jpg"
            alt=""
            width={54}
            height={54}
            loading="eager"
            className="size-13.5 shrink-0 rounded-full object-cover"
          />
          <span className="flex flex-col">
            <span className="text-brand">{site.name}</span>
            <span className="text-tagline sm:whitespace-nowrap">
              {site.tagline}
            </span>
          </span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-11.25 py-4">
            {navItems.map((item) => (
              <li
                key={item.href}
                className="after:mt-0.75 after:-mb-2 after:block after:h-1.25 after:origin-[0_50%] after:scale-x-0 after:bg-graphite after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.86,0,0.07,1)] hover:after:scale-x-100 motion-reduce:after:transition-none"
              >
                <a
                  href={navHref(item.href, onHome)}
                  className="text-nav leading-normal uppercase"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav onHome={onHome} />
      </div>
    </header>
  );
}
