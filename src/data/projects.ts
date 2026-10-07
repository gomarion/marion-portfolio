export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// A grid cell that crops its image to a fixed frame (Figma frame size).
export type GalleryTile = {
  image: ProjectImage;
  frame: { width: number; height: number };
  position?: "top" | "bottom";
};

export type ProjectGallery =
  | { layout: "slider"; images: ProjectImage[] }
  | {
      layout: "collage";
      images: {
        home: ProjectImage;
        singlePost: ProjectImage;
        customOptions: ProjectImage;
      };
    }
  | { layout: "tiles"; tiles: GalleryTile[] }
  | { layout: "masonry"; columns: [ProjectImage[], ProjectImage[]] }
  | {
      layout: "single";
      image: ProjectImage;
      frame: { width: number; height: number };
      // Figma trims the screenshot's edges; values are % of the frame.
      crop?: { left: number; top: number; width: number; height: number };
    };

// Plain text, or text with inline links: ["Built on ", { text: "Dawn", href }, "."]
export type RichText = (string | { text: string; href: string })[];

export type Project = {
  label: string;
  title: string;
  description: RichText;
  stack: string[];
  gallery: ProjectGallery;
};

const shopify = (file: string, alt: string, height = 989): ProjectImage => ({
  src: `/images/work/shopify/${file}`,
  alt,
  width: 1902,
  height,
});

export const projects: Project[] = [
  {
    label: "Shopify",
    title: "Custom Shopify Theme",
    description: [
      "A custom Shopify theme based on ",
      { text: "Dawn", href: "https://github.com/shopify/dawn" },
      ", developed with the goal of submitting it to the ",
      { text: "Shopify Theme Store", href: "https://themes.shopify.com/" },
      ".",
    ],
    stack: ["Shopify", "Liquid", "JavaScript", "HTML", "CSS/SASS"],
    gallery: {
      layout: "slider",
      images: [
        shopify(
          "shopify-envogue-avant-garde.jpg",
          "Avant Garde preset homepage with a Spring/Summer 2024 hero banner",
        ),
        shopify(
          "shopify-envogue-tailored.jpg",
          "Tailored preset homepage with a grid of men's suits",
          990,
        ),
        shopify(
          "shopify-section-collection-gallery.jpg",
          "Collection gallery section with neon city photos and a featured collection",
          987,
        ),
        shopify(
          "shopify-section-collection-list.jpg",
          "Collection list section with summer category links beside a fashion photo",
        ),
        shopify(
          "shopify-section-collection-slider.jpg",
          "Collection slider section featuring the En Vogue blog",
          990,
        ),
        shopify(
          "shopify-section-hero-collection.jpg",
          "Hero collection section with Cyber Places, Cyber Punks and Cyber Structures panels",
          990,
        ),
        shopify(
          "shopify-section-product-slider.jpg",
          "Product slider section showing on-sale items",
        ),
        shopify(
          "shopify-tailored-section-hero-collection.jpg",
          "Tailored preset hero collection with a New Arrivals suits banner",
          977,
        ),
      ],
    },
  },
  {
    label: "Ghost",
    title: "Incredible Theme",
    description: [
      "A custom ",
      { text: "Ghost", href: "https://ghost.org/" },
      " theme built with a focus on typography, responsive layouts, and a flexible publishing experience.",
    ],
    stack: ["Ghost", "Handlebars", "HTML", "CSS/SASS", "JavaScript"],
    gallery: {
      layout: "collage",
      images: {
        home: {
          src: "/images/work/ghost/ghost-home.webp",
          alt: "Incredible Theme homepage with a hero and a grid of post cards",
          width: 1382,
          height: 4096,
        },
        singlePost: {
          src: "/images/work/ghost/ghost-single-post.webp",
          alt: "Incredible Theme single post page",
          width: 1828,
          height: 4096,
        },
        customOptions: {
          src: "/images/work/ghost/ghost-custom-options.webp",
          alt: "Ghost admin design settings for Incredible Theme",
          width: 1920,
          height: 928,
        },
      },
    },
  },
  {
    label: "Tumblr",
    title: "Tumblr Themes",
    description: [
      "A collection of commercial ",
      { text: "Tumblr themes", href: "https://www.tumblr.com/themes/" },
      " developed for a diverse audience, combining responsive design, customization, and reusable frontend architecture.",
    ],
    stack: ["Tumblr", "HTML", "CSS/SASS", "JavaScript", "Responsive Design"],
    gallery: {
      layout: "tiles",
      tiles: [
        {
          image: {
            src: "/images/work/tumblr/tumblr-fender.webp",
            alt: "Fender Tumblr theme",
            width: 1902,
            height: 988,
          },
          frame: { width: 600, height: 312 },
        },
        {
          image: {
            src: "/images/work/tumblr/tumblr-radio-city.webp",
            alt: "Radio City Tumblr theme",
            width: 1920,
            height: 928,
          },
          frame: { width: 645, height: 312 },
        },
        {
          image: {
            src: "/images/work/tumblr/tumblr-alicia-keys.webp",
            alt: "Alicia Keys Tumblr theme, top of the page",
            width: 1298,
            height: 4096,
          },
          frame: { width: 600, height: 763 },
          position: "top",
        },
        {
          image: {
            src: "/images/work/tumblr/tumblr-alicia-keys.webp",
            alt: "Alicia Keys Tumblr theme, bottom of the page",
            width: 1298,
            height: 4096,
          },
          frame: { width: 645, height: 763 },
          position: "bottom",
        },
      ],
    },
  },
  {
    label: "WordPress",
    title: "WordPress Development",
    description: [
      "Years of building and maintaining custom ",
      { text: "WordPress", href: "https://wordpress.org/" },
      " websites, from bespoke themes and block-based experiences to WooCommerce and API integrations.",
    ],
    stack: ["WordPress", "PHP", "JavaScript", "CSS/SASS", "WooCommerce"],
    gallery: {
      layout: "masonry",
      columns: [
        [
          {
            src: "/images/work/wordpress/wordpress-home.webp",
            alt: "WordPress theme homepage",
            width: 1920,
            height: 1587,
          },
          {
            src: "/images/work/wordpress/wordpress-single-post.webp",
            alt: "WordPress theme single post with comments",
            width: 1920,
            height: 2995,
          },
        ],
        [
          {
            src: "/images/work/wordpress/wordpress-archive.webp",
            alt: "WordPress theme blog archive",
            width: 1920,
            height: 3194,
          },
        ],
      ],
    },
  },
  {
    label: "Personal Finance Application",
    title: "Personal Accountant",
    description: [
      "A personal finance application built from scratch with Python and SQLite, later expanded into an Android application with cloud-based data synchronization.",
    ],
    stack: ["Python", "PySide6", "SQLite", "Kivy", "Buildozer"],
    gallery: {
      layout: "single",
      image: {
        src: "/images/work/personal-accountant/personal-accountant.webp",
        alt: "Personal Accountant desktop app with the Add Expense dialog open",
        width: 1027,
        height: 837,
      },
      frame: { width: 1004, height: 821 },
      crop: { left: -1.1, top: -1.1, width: 102.29, height: 101.95 },
    },
  },
];
