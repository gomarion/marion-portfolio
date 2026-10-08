type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
};

// Figma "Section title": JetBrains Mono Bold 40 / 1.5, 0.11em tracking.
// Scaled to 30px below `sm`.
export function SectionHeading({
  children,
  className = "",
}: SectionHeadingProps) {
  return (
    <h2
      className={`font-code text-[2.109375rem] leading-normal font-bold tracking-design sm:text-section-title ${className}`}
    >
      {children}
    </h2>
  );
}
