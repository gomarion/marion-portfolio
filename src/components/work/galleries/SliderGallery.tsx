"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ProjectImage } from "@/data/projects";

type SliderGalleryProps = {
  images: ProjectImage[];
  label: string;
};

// Figma "Image gallery slider" (122:121): a 1280×666 frame with pagination
// dots 29px below. Slides scroll-snap, so swiping and arrow keys work natively.
export function SliderGallery({ images, label }: SliderGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollTo({
      left: index * track.clientWidth,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        onScroll={onScroll}
        tabIndex={0}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <div
            key={image.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${images.length}`}
            className="relative aspect-1280/666 w-full shrink-0 snap-start"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1360px) 1280px, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-7.25 flex justify-center gap-1.5">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === active}
            className={`size-2.5 rounded-full transition-colors ${
              index === active ? "bg-ink" : "bg-mute hover:bg-ink/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
