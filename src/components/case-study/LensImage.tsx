"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import type { ProjectImage } from "@/data/projects";

// Lens magnification and diameter (px).
const SCALE = 2;
const LENS_SIZE = 300;

// Both images request the full-size file, so the lens reuses the download
// and stays sharp when magnified.
const SIZES = "(min-width: 1280px) 2160px, 200vw";

// Hovering shows a round lens that follows the cursor and magnifies the part
// of the screenshot under it 2×. The lens is a second copy of the image,
// scaled up and shifted so the point under the cursor sits in its centre.
// It fades and grows in (from 85%) with easing. Mouse only: touch users see the plain
// screenshot.
//
// The hover area reaches 15px past the screenshot on every side (an
// invisible ::before behind it), so the lens doesn't vanish the moment the
// cursor slips over an edge. Out there the lens stays pinned to the edge
// instead of magnifying empty space. 15px keeps neighbouring screenshots'
// areas from overlapping in a 30px-gap grid. A slider crops anything outside
// the slide, so it adds its own margin around the frame and drives the
// current slide's lens with moveLens and `data-lens="on"`.
export function LensImage({ image }: { image: ProjectImage }) {
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    moveLens(event.currentTarget, event.clientX, event.clientY);
  };

  return (
    <div
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerMove}
      data-lens-frame
      className="group relative isolate @container before:absolute before:-inset-[15px] before:-z-10 [@media(hover:hover)]:cursor-none"
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={SIZES}
        className="h-auto w-full"
      />

      <div
        aria-hidden
        style={{ width: LENS_SIZE, height: LENS_SIZE }}
        className="pointer-events-none absolute top-(--lens-y) left-(--lens-x) z-10 -translate-1/2 scale-85 overflow-hidden rounded-full bg-paper outline-3 outline-paper opacity-0 shadow-[0_8px_28px_rgb(0_0_0/0.35)] transition-[opacity,scale] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100 group-data-[lens=on]:scale-100 group-data-[lens=on]:opacity-100 motion-reduce:transition-none"
      >
        <Image
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
          sizes={SIZES}
          style={{
            width: `${SCALE * 100}cqw`,
            left: `calc(${LENS_SIZE / 2}px - var(--lens-x) * ${SCALE})`,
            top: `calc(${LENS_SIZE / 2}px - var(--lens-y) * ${SCALE})`,
          }}
          className="absolute h-auto max-w-none"
        />
      </div>
    </div>
  );
}

// Centres the lens of a LensImage `frame` on a cursor position, pinned to
// the screenshot's edges. Writes CSS variables straight on the frame, so
// mouse movement doesn't re-render React.
export function moveLens(frame: HTMLElement, clientX: number, clientY: number) {
  const box = frame.getBoundingClientRect();
  const x = Math.min(Math.max(clientX - box.left, 0), box.width);
  const y = Math.min(Math.max(clientY - box.top, 0), box.height);
  frame.style.setProperty("--lens-x", `${x}px`);
  frame.style.setProperty("--lens-y", `${y}px`);
}
