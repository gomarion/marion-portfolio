import Image from "next/image";
import type { ProjectImage } from "@/data/projects";

type MasonryGalleryProps = {
  columns: [ProjectImage[], ProjectImage[]];
};

// Figma WordPress "Group 9" (122:150): two columns in a 592:614 ratio with a
// 56px gap, images 53px apart vertically. Stacks into one column below `md`.
export function MasonryGallery({ columns }: MasonryGalleryProps) {
  return (
    <div className="grid gap-6 md:grid-cols-[592fr_614fr] md:items-start md:gap-x-14">
      {columns.map((column, index) => (
        <div key={index} className="flex flex-col gap-6 md:gap-13.25">
          {column.map((image) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1280px) 500px, (min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
