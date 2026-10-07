import Image from "next/image";
import { navItems, site } from "@/data/site";
import { MobileNav } from "./MobileNav";

// Figma "Frame 18" (148:100): sits at x 76 / y 56 inside the 1440px hero and
// spans to x 1400. It overlays the Hero section, which supplies the background.
// Desktop nav items grow a 5px bar under the label on hover; the bar's negative
// bottom margin keeps it from adding height, so the nav doesn't shift.
export function SiteHeader() {
  return (
    <header id="top" className="absolute inset-x-0 top-0 z-10">
      <div className="mx-auto flex max-w-360 items-center justify-between gap-6 px-4 pt-6 sm:px-6 lg:pt-14 xl:pr-10 xl:pl-19">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
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
                <a href={item.href} className="text-nav leading-normal uppercase">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
