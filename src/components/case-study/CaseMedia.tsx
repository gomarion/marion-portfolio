import Image from "next/image";
import type { CaseMedia as CaseMediaData } from "@/data/case-studies";
import type { ProjectImage } from "@/data/projects";
import { CardGallery } from "./CardGallery";
import { PreviewGallery } from "./PreviewGallery";

// Full width of the case file content column (1080px on desktop).
const FULL_WIDTH = "(min-width: 1280px) 1080px, 100vw";

export function CaseMedia({ media }: { media: CaseMediaData }) {
  switch (media.type) {
    case "image":
      return <FullImage image={media.image} />;
    case "video":
      // No video file yet: show the poster as a still image.
      if (!media.src) return <FullImage image={media.poster} />;
      return (
        <video
          controls
          playsInline
          preload="none"
          poster={media.poster.src}
          aria-label={media.poster.alt}
          className="h-auto w-full"
          style={{ aspectRatio: `${media.poster.width} / ${media.poster.height}` }}
        >
          <source src={media.src} />
        </video>
      );
    case "cards":
      return <CardGallery cards={media.cards} />;
    case "preview":
      return (
        <PreviewGallery
          title={media.title}
          images={media.images}
          full={media.full}
        />
      );
  }
}

function FullImage({ image }: { image: ProjectImage }) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={FULL_WIDTH}
      className="h-auto w-full"
    />
  );
}
