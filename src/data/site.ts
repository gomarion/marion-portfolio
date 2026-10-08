export const site = {
  name: "Marion Go",
  tagline: "Web Developer. Builder. Problem Solver.",
  description:
    "For 15+ years, I’ve been turning ideas into websites—from custom themes and integrations to full web applications, across WordPress, Shopify, Ghost, and JavaScript.",
  email: "gomarionarciaga@gmail.com",
  copyrightStartYear: 2012,
} as const;

export const navItems = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#work" },
  { label: "What I Do", href: "#what-i-do" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

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
