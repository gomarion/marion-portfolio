type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
};

// Figma "Section title": JetBrains Mono Bold 40 / 1.5, 0.11em tracking.
// Scaled to 30px below `sm`.
export function SectionHeading({
  children,
  className = "",
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <Tag
      className={`font-code text-[2.109375rem] leading-normal font-bold tracking-design sm:text-section-title ${className}`}
    >
      {children}
    </Tag>
  );
}
