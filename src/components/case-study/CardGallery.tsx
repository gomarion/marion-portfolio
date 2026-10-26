"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { CaseMedia } from "@/data/case-studies";
import { LIGHTBOX_TRIGGER_CLASSES, Lightbox } from "./Lightbox";

type Cards = Extract<CaseMedia, { type: "cards" }>["cards"];

// Figma "Frame 32" (325:368): 3 columns, 30px apart; title, 340×550
// screenshot and caption 15px apart.
//
// Screenshots of cards with a `full` image are buttons that open the full
// page in the lightbox, which can step between those cards. Closing returns
// focus to the last card shown.
export function CardGallery({ cards }: { cards: Cards }) {
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Index into `cards` of the card shown in the lightbox.
  const [current, setCurrent] = useState<number | null>(null);

  // Cards that can open in the lightbox, in order.
  const gallery = cards.flatMap((card, index) =>
    card.full ? [{ index, title: card.title, image: card.full }] : [],
  );
  const position = gallery.findIndex((entry) => entry.index === current);

  const onClose = () => {
    if (current !== null) triggerRefs.current[current]?.focus();
    setCurrent(null);
  };

  return (
    <>
      <div className="grid gap-10 md:grid-cols-3 md:gap-7.5">
        {cards.map((item, index) => {
          const preview = (
            <Image
              src={item.image.src}
              alt={item.image.alt}
              width={item.image.width}
              height={item.image.height}
              sizes="(min-width: 1280px) 340px, (min-width: 768px) 30vw, 100vw"
              className="aspect-340/550 h-auto w-full object-cover object-top"
            />
          );

          return (
            <figure key={item.title} className="flex flex-col gap-3.75">
              <h4 className="text-body-sm font-semibold">{item.title}</h4>
              {item.full ? (
                <button
                  ref={(node) => {
                    triggerRefs.current[index] = node;
                  }}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-label={`View the full ${item.title} homepage`}
                  aria-haspopup="dialog"
                  className={`block ${LIGHTBOX_TRIGGER_CLASSES}`}
                >
                  {preview}
                </button>
              ) : (
                preview
              )}
              <figcaption className="text-body-sm tracking-normal">
                {item.caption}
              </figcaption>
            </figure>
          );
        })}
      </div>

      <Lightbox
        items={gallery}
        index={position === -1 ? null : position}
        onIndexChange={(next) => setCurrent(gallery[next].index)}
        onClose={onClose}
      />
    </>
  );
}
