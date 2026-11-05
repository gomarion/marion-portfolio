import type { CSSProperties, ReactNode } from "react";
import type { GridLayout } from "@/data/case-studies";

// Image `sizes` for a grid cell: the full 1080px column for a featured
// first image, otherwise about half of it.
export function gridSizes(layout: GridLayout | undefined, index: number) {
  return layout?.featured && index === 0
    ? "(min-width: 1280px) 1080px, 100vw"
    : "(min-width: 1280px) 575px, (min-width: 640px) 50vw, 100vw";
}

// Stagger class for a grid cell revealing into view: from 640px up, a cell
// in the right column starts a beat after its left neighbour. A featured
// first item spans both columns, so the count starts after it.
export function gridDelay(layout: GridLayout | undefined, index: number) {
  const column = layout?.featured ? (index - 1) % 2 : index % 2;
  return column === 1 ? "sm:delay-150" : "";
}

// Grid for case study screenshots, 30px apart (or `layout.gap`). One column
// on phones; from 640px up, two columns (relative widths from
// `layout.columns`, even by default), with an optional full-width first
// item. `layout.maxWidth` narrows the grid and centres it.
export function MediaGrid({
  layout,
  children,
}: {
  layout?: GridLayout;
  children: ReactNode;
}) {
  const style = {
    ...(layout?.columns && {
      "--grid-cols": `${layout.columns[0]}fr ${layout.columns[1]}fr`,
    }),
    ...(layout?.gap !== undefined && { "--grid-gap": `${layout.gap}px` }),
    ...(layout?.maxWidth && { maxWidth: layout.maxWidth }),
  } as CSSProperties;

  return (
    <div
      style={style}
      className={`mx-auto grid gap-7.5 sm:grid-cols-[var(--grid-cols,1fr_1fr)] sm:gap-[var(--grid-gap,30px)] ${
        layout?.align === "center" ? "items-center" : "items-start"
      } ${layout?.featured ? "sm:[&>:first-child]:col-span-2" : ""}`}
    >
      {children}
    </div>
  );
}
