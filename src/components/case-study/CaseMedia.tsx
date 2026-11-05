import Image from "next/image";
import type { CaseMedia as CaseMediaData } from "@/data/case-studies";
import type { ProjectImage } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SliderGallery } from "@/components/work/galleries/SliderGallery";
import { CardGallery } from "./CardGallery";
import { CropGallery } from "./CropGallery";
import { FanGallery } from "./FanGallery";
import { Flow } from "./Flow";
import { Highlights } from "./Highlights";
import { LensImage } from "./LensImage";
import { MediaGrid, gridDelay, gridSizes } from "./MediaGrid";
import { PreviewGallery } from "./PreviewGallery";
import { SpheresDemo } from "./SpheresDemo";
import { YouTubeEmbed } from "./YouTubeEmbed";

// Full width of the case file content column (1080px on desktop).
const FULL_WIDTH = "(min-width: 1280px) 1080px, 100vw";

// Screenshots and galleries animate into view (see Reveal): single
// screenshots wipe open (or rise, with the lens, which a wipe's clip would
// cut off), grid cells rise column by column, cards zoom in one by one and
// the preview and fan galleries zoom in as a whole. Sliders, videos, the
// Spheres demo, highlights and flows don't animate.
export function CaseMedia({ media }: { media: CaseMediaData }) {
  switch (media.type) {
    case "image": {
      const image = media.zoom ? (
        <Reveal effect="up">
          <LensImage image={media.image} />
        </Reveal>
      ) : (
        <Reveal effect="wipe">
          <FullImage
            image={media.image}
            sizes={
              media.maxWidth
                ? `(min-width: 1280px) ${media.maxWidth}px, 100vw`
                : undefined
            }
          />
        </Reveal>
      );
      if (!media.caption && !media.maxWidth) return image;
      return (
        <figure
          style={media.maxWidth ? { maxWidth: media.maxWidth } : undefined}
          className="mx-auto"
        >
          {image}
          {media.caption && <Caption text={media.caption} />}
        </figure>
      );
    }
    case "images":
      return (
        <MediaGrid layout={media.layout}>
          {media.items.map((item, index) => {
            const image = item.zoom ? (
              <LensImage image={item.image} />
            ) : (
              <FullImage
                image={item.image}
                sizes={gridSizes(media.layout, index)}
              />
            );
            return (
              <Reveal
                key={item.image.src}
                effect="up"
                className={gridDelay(media.layout, index)}
              >
                {item.caption ? (
                  <figure>
                    {image}
                    <Caption text={item.caption} />
                  </figure>
                ) : (
                  image
                )}
              </Reveal>
            );
          })}
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
    case "flow":
      return <Flow steps={media.steps} />;
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
      return (
        <Reveal effect="zoom">
          <FanGallery items={media.items} />
        </Reveal>
      );
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
        <Reveal effect="zoom">
          <PreviewGallery
            title={media.title}
            images={media.images}
            full={media.full}
          />
        </Reveal>
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
      className="block h-auto w-full"
    />
  );
}
