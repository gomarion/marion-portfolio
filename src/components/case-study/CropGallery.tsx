"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { CaseMedia } from "@/data/case-studies";
import { LIGHTBOX_TRIGGER_CLASSES, Lightbox } from "./Lightbox";

type Items = Extract<CaseMedia, { type: "gallery" }>["items"];

// Figma "Frame 32" (335:820): crops of different pages in 2 columns, 30px
// apart. Each crop is a button that opens its full page in the lightbox,
// which can step between them. Closing returns focus to the last one shown.
export function CropGallery({ items }: { items: Items }) {
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [current, setCurrent] = useState<number | null>(null);

  const onClose = () => {
    if (current !== null) triggerRefs.current[current]?.focus();
    setCurrent(null);
  };

  return (
    <>
      <div className="grid gap-7.5 sm:grid-cols-2">
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
            className={`block ${LIGHTBOX_TRIGGER_CLASSES}`}
          >
            <Image
              src={item.image.src}
              alt={item.image.alt}
              width={item.image.width}
              height={item.image.height}
              sizes="(min-width: 1280px) 525px, (min-width: 640px) 50vw, 100vw"
              className="h-auto w-full"
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
