import type { ProjectImage } from "@/data/projects";
import type { CaseStudy } from "./types";

const image = (
  file: string,
  alt: string,
  width = 1920,
  height = 928,
): ProjectImage => ({
  src: `/images/case-studies/shopify/${file}`,
  alt,
  width,
  height,
});

const details = (status: string) => [
  { label: "Role", value: "Sole Developer" },
  { label: "Platform", value: "Shopify" },
  { label: "Technologies", value: "Liquid, JavaScript, HTML, CSS/SASS" },
  { label: "Status", value: status },
];

// Figma "Case Study - Shopify" (259:30).
export const shopify: CaseStudy = {
  slug: "shopify",
  title: "Shopify Themes",
  subtitle: "En Vogue & Savoir Faire",
  intro: [
    "Two custom Shopify themes built from ",
    { text: "Dawn", href: "https://github.com/shopify/dawn" },
    ", designed around reusable storefront sections and flexible merchant customization.",
  ],
  files: [
    {
      name: "En Vogue",
      watermarkRepeats: 63,
      number: "001",
      details: details("Development Project"),
      fold: "top",
      sections: [
        {
          title: "Built for flexibility",
          mediaGap: 30,
          body: [
            "En Vogue combined reusable storefront sections with granular theme settings, giving merchants control over their storefront's visual identity and layout without custom development for every change.",
          ],
          media: {
            type: "video",
            poster: image(
              "envogue-banner.webp",
              "Avant Garde homepage hero with a “Rebel Fashion” headline over a photo of a model on a vintage car",
              1920,
              937,
            ),
          },
        },
        {
          title: "One theme. Three distinct styles.",
          body: [
            "En Vogue explored three visual directions built on a shared Shopify theme foundation. Each preset combined its own visual identity with reusable storefront sections and merchant customization options.",
          ],
          media: {
            type: "cards",
            cards: [
              {
                title: "Avant Garde",
                image: image(
                  "envogue-avant-garde.webp",
                  "Avant Garde preset homepage with summer dresses, latest drops and an on-sale banner",
                  1920,
                  3107,
                ),
                caption:
                  "A bold fashion storefront built around oversized typography and editorial imagery.",
                full: image(
                  "envogue-avant-garde-full.webp",
                  "Full Avant Garde homepage, from the hero to the footer",
                  1920,
                  12094,
                ),
              },
              {
                title: "Ice Creams",
                image: image(
                  "envogue-ice-creams.webp",
                  "Ice Creams preset homepage with flamingo imagery, a greyscale series and new arrivals",
                  1920,
                  3107,
                ),
                caption:
                  "An eclectic, image-driven storefront with colorful collections and expressive layouts.",
                full: image(
                  "envogue-ice-creams-full.webp",
                  "Full Ice Creams homepage, from the hero to the footer",
                  1920,
                  8629,
                ),
              },
              {
                title: "Tailored",
                image: image(
                  "envogue-tailored.webp",
                  "Tailored preset homepage with menswear photography, new arrivals and a featured suits collection",
                  1920,
                  3107,
                ),
                caption:
                  "A refined menswear storefront combining classic typography with luxury-inspired photography.",
                full: image(
                  "envogue-tailored-full.webp",
                  "Full Tailored homepage, from the hero to the footer",
                  1920,
                  9006,
                ),
              },
            ],
          },
        },
        {
          title: "A consistent visual system, fully configurable",
          body: [
            "Global settings gave merchants control over the storefront's visual foundation, including typography, colors, buttons, and badges. Separate controls for text, backgrounds, and text overlays helped maintain readable, cohesive designs across different sections.",
          ],
          media: {
            type: "image",
            image: image(
              "envogue-theme-settings.webp",
              "Shopify theme editor with badge and button color settings beside a retro featured products grid",
            ),
            zoom: true,
          },
        },
        {
          title: "One section. Multiple layouts.",
          body: [
            "Each reusable section came with its own set of configuration options. A featured collections grid, for example, could be adjusted through heading styles, text positioning, alignment, grid columns, and independent padding controls. These settings made it possible to create different compositions from the same section.",
          ],
          media: {
            type: "image",
            image: image(
              "envogue-section-settings.webp",
              "Shopify theme editor with featured collections grid settings beside an “On Sale” collections layout",
            ),
            zoom: true,
          },
        },
        {
          title: "Designed to be configured, not rebuilt",
          body: [
            "I developed the theme's sections, settings, and storefront implementation using Shopify Liquid, JavaScript, HTML, and CSS/SASS. The focus was on creating reusable components with enough configuration options to support varied layouts and storefront styles without duplicating entire implementations.",
          ],
          media: {
            type: "image",
            image: image(
              "envogue-liquid-code.webp",
              "Code editor showing the Liquid template for the featured collections section",
            ),
            zoom: true,
          },
        },
        {
          title: "Project status",
          body: [
            "En Vogue's development was completed, but the theme was not submitted to the Shopify Theme Store for review. Development efforts subsequently shifted to Savoir Faire as the next theme project.",
          ],
        },
      ],
    },
    {
      name: "Savoir Faire",
      watermarkRepeats: 46,
      number: "002",
      details: details("Development Paused"),
      fold: "bottom",
      sections: [
        {
          title: "A bold, immersive storefront experience.",
          mediaGap: 30,
          body: [
            "Savoir Faire explored a more experimental visual direction, pairing neon-lit imagery and dark, high-contrast layouts with flexible product grids, featured collections, and editorial content.",
          ],
          media: {
            type: "preview",
            title: "Savoir Faire",
            images: [
              image(
                "savoir-faire-crop-1.webp",
                "Top of the Savoir Faire homepage with neon city panels and a Cyberpunk Aesthetics banner",
                527,
                815,
              ),
              image(
                "savoir-faire-crop-2.webp",
                "Savoir Faire featured collection grid of neon-lit street photos",
                527,
                815,
              ),
            ],
            full: image(
              "savoir-faire-full.webp",
              "Full Savoir Faire homepage, from the hero to the footer",
              1600,
              16152,
            ),
          },
        },
        {
          title: "Technical approach",
          body: [
            "Like En Vogue, Savoir Faire was built around reusable Shopify sections and flexible merchant customization, with its own distinct visual direction.",
          ],
          media: {
            type: "video",
            poster: image(
              "savoir-faire-poster.webp",
              "Savoir Faire hero with Cyber Places, Cyber Punks and Cyber Structures neon panels",
              1920,
              924,
            ),
          },
        },
        {
          title: "Project status",
          body: [
            "Development was paused as the team shifted its focus back to Tumblr theme development. Although the project was intended to resume later, development did not continue, and the theme was never submitted to the Shopify Theme Store for review.",
          ],
        },
      ],
    },
  ],
};
