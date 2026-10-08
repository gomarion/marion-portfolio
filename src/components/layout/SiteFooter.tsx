import Image from "next/image";
import { site, socialLinks } from "@/data/site";

// Figma "footer" (3:59): 1px divider on top, 25px vertical padding, content
// inset 23px from each edge of the 1440 frame — icons left, copyright right.
// Below `sm` both are stacked and centered.
export function SiteFooter() {
  // "2026" until the year changes, then a range like "2026–2027". The year is
  // read at build time, so it updates on the next deploy.
  const year = new Date().getFullYear();
  const start = site.copyrightStartYear;
  const years = year > start ? `${start}–${year}` : `${start}`;

  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex max-w-360 flex-col items-center gap-x-6 gap-y-4 px-4 py-6.25 text-center sm:flex-row sm:flex-wrap sm:justify-between sm:px-5.75 sm:text-left">
        <ul className="flex h-5 items-center gap-7.5">
          {socialLinks.map((link) => (
            <li key={link.label} className="flex">
              <a
                href={link.href}
                aria-label={link.label}
                className="transition-opacity hover:opacity-60"
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <Image
                  src={link.icon.src}
                  alt=""
                  width={link.icon.width}
                  height={link.icon.height}
                />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-copyright">
          © {years} {site.name}. Designed &amp; built by me.
        </p>
      </div>
    </footer>
  );
}
