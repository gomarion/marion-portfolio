import Image from "next/image";
import type { ProjectImage } from "@/data/projects";

type CollageGalleryProps = {
  images: {
    home: ProjectImage;
    singlePost: ProjectImage;
    customOptions: ProjectImage;
  };
};

// Figma Ghost "Group 8" (122:135): three overlapping screenshots in a box with
// a 1280:1076 ratio (980px wide in the Work panel). Positions are % of that box so the collage scales from `lg`
// up; below `lg` the images stack in a simple grid.
export function CollageGallery({ images }: CollageGalleryProps) {
  const { home, singlePost, customOptions } = images;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:relative lg:block lg:aspect-1280/1076">
      <Image
        src={home.src}
        alt={home.alt}
        width={home.width}
        height={home.height}
        sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
        className="h-auto w-full lg:absolute lg:top-0 lg:left-[33.52%] lg:w-[28.36%]"
      />
      <Image
        src={singlePost.src}
        alt={singlePost.alt}
        width={singlePost.width}
        height={singlePost.height}
        sizes="(min-width: 1024px) 305px, (min-width: 640px) 50vw, 100vw"
        className="h-auto w-full lg:absolute lg:top-[18.03%] lg:left-0 lg:w-[30.78%]"
      />
      <Image
        src={customOptions.src}
        alt={customOptions.alt}
        width={customOptions.width}
        height={customOptions.height}
        sizes="(min-width: 1024px) 500px, 100vw"
        className="h-auto w-full sm:col-span-2 lg:absolute lg:top-[38.29%] lg:left-[49.22%] lg:w-[50.78%] lg:shadow-float"
      />
    </div>
  );
}
