export const site = {
  name: "Marion Go",
  tagline: "Web Developer. Builder. Problem Solver.",
  description:
    "I have 15+ years of experience building, maintaining, and improving websites across WordPress, Shopify, Ghost, JavaScript, and modern web technologies.",
  email: "gomarionarciaga@gmail.com",
  copyrightStartYear: 2012,
} as const;

export const navItems = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "What I Do", href: "#what-i-do" },
  { label: "Contact", href: "#contact" },
] as const;

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/gomarion/" },
  { label: "GitHub", href: "https://github.com/gomarion" },
  { label: "Email", href: `mailto:${site.email}` },
] as const;
