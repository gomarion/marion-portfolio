import { navItems, site } from "@/data/site";

// Structure only — the Figma styling (avatar, hero overlay) comes in the header step.
export function SiteHeader() {
  return (
    <header id="top">
      <div>
        <p className="text-brand">{site.name}</p>
        <p className="text-tagline">{site.tagline}</p>
      </div>
      <nav aria-label="Main">
        <ul className="flex gap-11.25">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-nav uppercase">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
