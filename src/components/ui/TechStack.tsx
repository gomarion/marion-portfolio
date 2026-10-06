type TechStackProps = {
  items: readonly string[];
  className?: string;
};

// Figma "Code": IBM Plex Mono Light 16 / 1.5, items separated by " · ".
export function TechStack({ items, className = "" }: TechStackProps) {
  return (
    <p className={`font-code text-code ${className}`}>{items.join(" · ")}</p>
  );
}
