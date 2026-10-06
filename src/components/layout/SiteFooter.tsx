import Image from "next/image";
import { site, socialLinks } from "@/data/site";

// Figma "footer" (3:59): 1px divider on top, 25px vertical padding, content
// inset 23px from each edge of the 1440 frame — icons left, copyright right.
export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex max-w-360 flex-wrap items-center justify-between gap-x-6 gap-y-4 px-4 py-6.25 sm:px-5.75">
        <ul className="flex items-end gap-7.5">
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
          © {site.copyrightStartYear} - {new Date().getFullYear()}. {site.name}.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
