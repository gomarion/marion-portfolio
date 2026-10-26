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
export function LensImage({ image }: { image: ProjectImage }) {
  // Write the cursor position straight to CSS variables, so mouse movement
  // doesn't re-render React.
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const frame = event.currentTarget;
    const box = frame.getBoundingClientRect();
    frame.style.setProperty("--lens-x", `${event.clientX - box.left}px`);
    frame.style.setProperty("--lens-y", `${event.clientY - box.top}px`);
  };

  return (
    <div
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerMove}
      className="group relative @container [@media(hover:hover)]:cursor-none"
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
        className="pointer-events-none absolute top-(--lens-y) left-(--lens-x) z-10 -translate-1/2 scale-85 overflow-hidden rounded-full bg-paper outline-3 outline-paper opacity-0 shadow-[0_8px_28px_rgb(0_0_0/0.35)] transition-[opacity,scale] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none"
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
