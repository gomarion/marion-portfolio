import { site, socialLinks } from "@/data/site";

// Structure only — the Figma styling and social icons come in the footer step.
export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <ul className="flex gap-7.5">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-copyright">
        © {site.copyrightStartYear} - {new Date().getFullYear()}. {site.name}.
        All rights reserved.
      </p>
    </footer>
  );
}
