import type { ProjectGallery } from "@/data/projects";
import { CollageGallery } from "./galleries/CollageGallery";
import { MasonryGallery } from "./galleries/MasonryGallery";
import { SingleImage } from "./galleries/SingleImage";
import { SliderGallery } from "./galleries/SliderGallery";
import { TilesGallery } from "./galleries/TilesGallery";

type ProjectMediaProps = {
  gallery: ProjectGallery;
  label: string;
};

export function ProjectMedia({ gallery, label }: ProjectMediaProps) {
  switch (gallery.layout) {
    case "slider":
      return (
        <SliderGallery
          images={gallery.images}
          label={`${label} screenshots`}
        />
      );
    case "collage":
      return <CollageGallery images={gallery.images} />;
    case "tiles":
      return <TilesGallery tiles={gallery.tiles} />;
    case "masonry":
      return <MasonryGallery columns={gallery.columns} />;
    case "single":
      return (
        <SingleImage
          image={gallery.image}
          frame={gallery.frame}
          crop={gallery.crop}
        />
      );
  }
}
