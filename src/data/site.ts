export const site = {
  name: "Marion Go",
  tagline: "Web Developer. Builder. Problem Solver.",
  description:
    "For 15+ years, I’ve been turning ideas into websites—from custom themes and integrations to full web applications, across WordPress, Shopify, Ghost, and JavaScript.",
  email: "gomarionarciaga@gmail.com",
  copyrightStartYear: 2026,
} as const;

export const navItems = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#work" },
  { label: "What I Do", href: "#what-i-do" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
] as const;

// Nav items point at homepage sections (or, like the blog, at a page). On
// subpages section links need a "/" in front, and "Home" goes to the
// homepage itself.
export function navHref(href: string, onHome: boolean) {
  if (onHome || href.startsWith("/")) return href;
  return href === "#top" ? "/" : `/${href}`;
}

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gomarion/",
    icon: { src: "/images/icons/linkedin.svg", width: 20, height: 20 },
  },
  {
    label: "GitHub",
    href: "https://github.com/gomarion",
    icon: { src: "/images/icons/github.svg", width: 22, height: 22 },
  },
  {
    label: "Email",
    href: `mailto:${site.email}`,
    icon: { src: "/images/icons/email.svg", width: 24, height: 18 },
  },
] as const;
