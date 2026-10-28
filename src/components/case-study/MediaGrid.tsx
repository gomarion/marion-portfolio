import type { CSSProperties, ReactNode } from "react";
import type { GridLayout } from "@/data/case-studies";

// Image `sizes` for a grid cell: the full 1080px column for a featured
// first image, otherwise about half of it.
export function gridSizes(layout: GridLayout | undefined, index: number) {
  return layout?.featured && index === 0
    ? "(min-width: 1280px) 1080px, 100vw"
    : "(min-width: 1280px) 575px, (min-width: 640px) 50vw, 100vw";
}

// Grid for case study screenshots, 30px apart. One column on phones; from
// 640px up, two columns (relative widths from `layout.columns`, even by
// default), with an optional full-width first item.
export function MediaGrid({
  layout,
  children,
}: {
  layout?: GridLayout;
  children: ReactNode;
}) {
  const style = layout?.columns
    ? ({
        "--grid-cols": `${layout.columns[0]}fr ${layout.columns[1]}fr`,
      } as CSSProperties)
    : undefined;

  return (
    <div
      style={style}
      className={`grid gap-7.5 sm:grid-cols-[var(--grid-cols,1fr_1fr)] ${
        layout?.align === "center" ? "items-center" : "items-start"
      } ${layout?.featured ? "sm:[&>:first-child]:col-span-2" : ""}`}
    >
      {children}
    </div>
  );
}
