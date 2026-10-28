import Image from "next/image";
import type { CaseMedia as CaseMediaData } from "@/data/case-studies";
import type { ProjectImage } from "@/data/projects";
import { SliderGallery } from "@/components/work/galleries/SliderGallery";
import { CardGallery } from "./CardGallery";
import { CropGallery } from "./CropGallery";
import { FanGallery } from "./FanGallery";
import { Highlights } from "./Highlights";
import { LensImage } from "./LensImage";
import { MediaGrid, gridSizes } from "./MediaGrid";
import { PreviewGallery } from "./PreviewGallery";
import { SpheresDemo } from "./SpheresDemo";
import { YouTubeEmbed } from "./YouTubeEmbed";

// Full width of the case file content column (1080px on desktop).
const FULL_WIDTH = "(min-width: 1280px) 1080px, 100vw";

export function CaseMedia({ media }: { media: CaseMediaData }) {
  switch (media.type) {
    case "image": {
      const image = media.zoom ? (
        <LensImage image={media.image} />
      ) : (
        <FullImage image={media.image} />
      );
      if (!media.caption) return image;
      return (
        <figure>
          {image}
          <Caption text={media.caption} />
        </figure>
      );
    }
    case "images":
      return (
        <MediaGrid layout={media.layout}>
          {media.items.map((item, index) =>
            item.zoom ? (
              <LensImage key={item.image.src} image={item.image} />
            ) : (
              <FullImage
                key={item.image.src}
                image={item.image}
                sizes={gridSizes(media.layout, index)}
              />
            ),
          )}
        </MediaGrid>
      );
    case "spheres":
      return (
        <figure>
          <SpheresDemo
            label={media.label}
            spheres={media.spheres}
            bubbles={media.bubbles}
          />
          {media.caption && <Caption text={media.caption} />}
        </figure>
      );
    case "highlights":
      return <Highlights items={media.items} />;
    case "video":
      // No video yet: show the poster as a still image.
      if (!media.src && !media.youtube)
        return <FullImage image={media.poster} />;
      return (
        <figure>
          {media.youtube ? (
            <YouTubeEmbed id={media.youtube} poster={media.poster} />
          ) : (
            <video
              controls
              playsInline
              preload="none"
              poster={media.poster.src}
              aria-label={media.poster.alt}
              className="h-auto w-full"
              style={{
                aspectRatio: `${media.poster.width} / ${media.poster.height}`,
              }}
            >
              <source src={media.src} />
            </video>
          )}
          {media.caption && <Caption text={media.caption} />}
        </figure>
      );
    case "cards":
      return <CardGallery cards={media.cards} />;
    case "gallery":
      return <CropGallery items={media.items} layout={media.layout} />;
    case "fan":
      return <FanGallery items={media.items} />;
    case "slider":
      return (
        <SliderGallery
          images={media.images}
          label={media.label}
          aspectRatio="1080 / 522"
          sizes={FULL_WIDTH}
        />
      );
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

// Figma (336:1223): Inter Light Italic 14, 10px below the media.
function Caption({ text }: { text: string }) {
  return (
    <figcaption className="mt-2.5 text-[0.875rem] leading-[1.5] font-light tracking-design text-caption italic">
      {text}
    </figcaption>
  );
}

function FullImage({
  image,
  sizes = FULL_WIDTH,
}: {
  image: ProjectImage;
  sizes?: string;
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      className="h-auto w-full"
    />
  );
}
