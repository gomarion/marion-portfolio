"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { ProjectImage } from "@/data/projects";
import { LIGHTBOX_TRIGGER_CLASSES, Lightbox } from "./Lightbox";

type PreviewGalleryProps = {
  title: string;
  images: ProjectImage[];
  full: ProjectImage;
};

// Figma "Frame 38" (330:603): two 527×815 crops of a page, 30px apart. The
// whole grid is one button: it zooms slightly on hover, and clicking it opens
// the full-page screenshot in the lightbox.
export function PreviewGallery({ title, images, full }: PreviewGalleryProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View the full ${title} homepage`}
        aria-haspopup="dialog"
        className={`grid w-full gap-7.5 sm:grid-cols-2 ${LIGHTBOX_TRIGGER_CLASSES}`}
      >
        {images.map((image) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1280px) 527px, (min-width: 640px) 50vw, 100vw"
            className="h-auto w-full"
          />
        ))}
      </button>

      <Lightbox
        items={[{ title, image: full }]}
        index={open ? 0 : null}
        onIndexChange={() => {}}
        onClose={() => {
          triggerRef.current?.focus();
          setOpen(false);
        }}
      />
    </>
  );
}
