import type { ProjectImage, RichText } from "@/data/projects";

// Media shown under a case-file section's text. New layouts for the other
// case studies get added here as extra `type`s.
export type CaseMedia =
  // A full-width screenshot. With `zoom`, hovering shows a round magnifying
  // lens that follows the cursor.
  | { type: "image"; image: ProjectImage; zoom?: boolean }
  // A video slot. Until `src` is set it shows the poster as a still image;
  // the caption only appears once there's a video.
  | { type: "video"; poster: ProjectImage; src?: string; caption?: string }
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
    }
  // Crops of different pages side by side. Each opens its own `full` page in
  // a lightbox, with arrows between them. `title` names it in the lightbox
  // and `label` describes it for screen readers ("View the full …").
  | {
      type: "gallery";
      items: {
        title: string;
        label: string;
        image: ProjectImage;
        full: ProjectImage;
      }[];
    };

// A smaller heading inside a section, with its own text and media.
export type CaseSubsection = {
  title: string;
  body: RichText;
  media?: CaseMedia;
};

export type CaseSection = {
  title: string;
  body?: RichText;
  media?: CaseMedia;
  // Space between the text and the media, in px (default 50).
  mediaGap?: 30 | 50;
  subsections?: CaseSubsection[];
};

export type CaseFile = {
  name: string;
  // How many times `name` repeats in the watermark (default 60).
  watermarkRepeats?: number;
  // Watermark width in px. Without it, the watermark spans the panel plus
  // 60px, so it runs off both sides.
  watermarkWidth?: number;
  // Shown as "Case file #<number>"; each case study has its own range
  // (Shopify 001, Ghost 1001, …).
  number: string;
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
