"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { CaseMedia } from "@/data/case-studies";
import { Lightbox } from "./Lightbox";

type Items = Extract<CaseMedia, { type: "fan" }>["items"];

// Figma "Frame 49" (356:309): 347×840 page screenshots fanned out across a
// 1080×946 frame. Everything is in % of the frame, so it scales down as one
// picture on smaller screens.
//
// Each sheet is a button that opens its full page in the lightbox, which can
// step between all of them. Each sheet casts a soft shadow, like paper in a
// stack (not in Figma). On hover or keyboard focus a sheet comes to the
// front, grows slightly and its shadow deepens. Closing returns focus to the
// last sheet shown.
export function FanGallery({ items }: { items: Items }) {
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [current, setCurrent] = useState<number | null>(null);

  const onClose = () => {
    if (current !== null) triggerRefs.current[current]?.focus();
    setCurrent(null);
  };

  return (
    <>
      <div className="relative aspect-1080/946 w-full">
        {items.map((item, index) => (
          <button
            key={item.image.src}
            ref={(node) => {
              triggerRefs.current[index] = node;
            }}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`View the full ${item.label}`}
            aria-haspopup="dialog"
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
              rotate: `${item.rotate}deg`,
            }}
            className="absolute block h-[88.8%] w-[32.08%] cursor-zoom-in shadow-[0_1px_3px_rgb(0_0_0/0.12),0_8px_24px_rgb(0_0_0/0.16)] transition-[scale,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] outline-offset-4 hover:z-10 hover:shadow-[0_4px_10px_rgb(0_0_0/0.14),0_22px_48px_rgb(0_0_0/0.3)] focus-visible:z-10 focus-visible:shadow-[0_4px_10px_rgb(0_0_0/0.14),0_22px_48px_rgb(0_0_0/0.3)] focus-visible:outline-2 focus-visible:outline-ink motion-safe:hover:scale-103 motion-safe:focus-visible:scale-103"
          >
            <Image
              src={item.image.src}
              alt={item.image.alt}
              width={item.image.width}
              height={item.image.height}
              sizes="(min-width: 1280px) 347px, 33vw"
              className="size-full object-fill"
            />
          </button>
        ))}
      </div>

      <Lightbox
        items={items.map((item) => ({ title: item.title, image: item.full }))}
        index={current}
        onIndexChange={setCurrent}
        onClose={onClose}
      />
    </>
  );
}
