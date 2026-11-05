import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import type { GalleryTile } from "@/data/projects";

type TilesGalleryProps = {
  tiles: GalleryTile[];
};

// Figma Tumblr "Group 7" (122:105): a 2×2 grid, columns in a 600:645 ratio
// with a 21px gap and rows 49px apart. Each tile crops its image to the Figma frame.
// Each tile zooms in slightly and fades into view as it scrolls on screen;
// side by side, the right tile follows a beat after the left.
export function TilesGallery({ tiles }: TilesGalleryProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-[600fr_645fr] sm:gap-x-5.25 sm:gap-y-12.25">
      {tiles.map((tile, index) => (
        <Reveal
          key={index}
          effect="zoom"
          className={`relative overflow-hidden ${index % 2 ? "sm:delay-150" : ""}`}
          style={{ aspectRatio: `${tile.frame.width} / ${tile.frame.height}` }}
        >
          <Image
            src={tile.image.src}
            alt={tile.image.alt}
            fill
            sizes="(min-width: 1280px) 500px, (min-width: 640px) 50vw, 100vw"
            className={`object-cover ${
              tile.position === "bottom" ? "object-bottom" : "object-top"
            }`}
          />
        </Reveal>
      ))}
    </div>
  );
}
