import type { ProjectImage, RichText } from "@/data/projects";

// Media shown under a case-file section's text. New layouts for the other
// case studies get added here as extra `type`s.
export type CaseMedia =
  // A full-width screenshot. With `zoom`, hovering shows a round magnifying
  // lens that follows the cursor.
  | { type: "image"; image: ProjectImage; zoom?: boolean }
  // A video slot. Until `src` is set it shows the poster as a still image.
  | { type: "video"; poster: ProjectImage; src?: string }
  // Equal columns, each with a title, a tall screenshot and a caption. A card
  // with a `full` image opens it in a lightbox when the screenshot is clicked.
  | {
      type: "cards";
      cards: {
        title: string;
        image: ProjectImage;
        caption: string;
        full?: ProjectImage;
      }[];
    }
  // Crops of a page side by side, together one button that opens the
  // `full` page screenshot in a lightbox. `title` names it in the lightbox.
  | {
      type: "preview";
      title: string;
      images: ProjectImage[];
      full: ProjectImage;
    };

export type CaseSection = {
  title: string;
  body: RichText;
  media?: CaseMedia;
};

export type CaseFile = {
  name: string;
  details: { label: string; value: string }[];
  // Corner of the panel that has the folded page.
  fold: "top" | "bottom";
  sections: CaseSection[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  intro: RichText;
  files: CaseFile[];
};
