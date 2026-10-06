import Image from "next/image";
import type { ProjectImage } from "@/data/projects";

type SingleImageProps = {
  image: ProjectImage;
  frame: { width: number; height: number };
  crop?: { left: number; top: number; width: number; height: number };
};

// Figma Personal Accountant "image 2" (112:93): one full-width frame with a
// 1004:821 ratio. `crop` reproduces Figma's slight trim of the screenshot's edges.
export function SingleImage({ image, frame, crop }: SingleImageProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: `${frame.width} / ${frame.height}`,
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(min-width: 1280px) 980px, 100vw"
        className="absolute max-w-none"
        style={
          crop
            ? {
                left: `${crop.left}%`,
                top: `${crop.top}%`,
                width: `${crop.width}%`,
                height: `${crop.height}%`,
              }
            : { inset: 0, width: "100%", height: "100%" }
        }
      />
    </div>
  );
}
