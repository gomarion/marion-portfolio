type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
};

// Figma "Section title": JetBrains Mono Bold 40 / 1.5, 0.11em tracking.
// Below `sm` it shrinks to 33.75px with a 1.3 line height.
export function SectionHeading({
  children,
  className = "",
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <Tag
      className={`font-code text-[2.109375rem] leading-[1.3] font-bold tracking-design sm:text-section-title sm:leading-normal ${className}`}
    >
      {children}
    </Tag>
  );
}
