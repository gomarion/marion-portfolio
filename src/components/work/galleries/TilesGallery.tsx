import Image from "next/image";
import type { GalleryTile } from "@/data/projects";

type TilesGalleryProps = {
  tiles: GalleryTile[];
};

// Figma Tumblr "Group 7" (122:105): a 2×2 grid, columns 600 / 645 with a 35px
// gap and rows 60px apart. Each tile crops its image to the Figma frame.
export function TilesGallery({ tiles }: TilesGalleryProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-[600fr_645fr] sm:gap-x-8.75 sm:gap-y-15">
      {tiles.map((tile, index) => (
        <div
          key={index}
          className="relative overflow-hidden"
          style={{ aspectRatio: `${tile.frame.width} / ${tile.frame.height}` }}
        >
          <Image
            src={tile.image.src}
            alt={tile.image.alt}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className={`object-cover ${
              tile.position === "bottom" ? "object-bottom" : "object-top"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
