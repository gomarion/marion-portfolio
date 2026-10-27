import type { ProjectImage } from "@/data/projects";
import type { CaseStudy } from "./types";

const image = (
  file: string,
  alt: string,
  width = 1920,
  height = 928,
): ProjectImage => ({
  src: `/images/case-studies/ghost/${file}`,
  alt,
  width,
  height,
});

// Figma "Case Study - Ghost" (335:740).
export const ghost: CaseStudy = {
  slug: "ghost",
  title: "Ghost Theme",
  subtitle: "Incredible",
  intro: [
    "A custom Ghost theme designed for content-rich publications, combining an image-led editorial layout with a flexible, reader-friendly experience.",
  ],
  files: [
    {
      name: "Incredible",
      watermarkRepeats: 51,
      watermarkWidth: 1300,
      number: "1001",
      details: [
        { label: "Role", value: "Theme Developer" },
        { label: "Platform", value: "Ghost" },
        { label: "Technologies", value: "Handlebars, JavaScript, HTML, CSS/SASS" },
        { label: "Base Theme", value: "Casper 5.8.1" },
      ],
      fold: "top",
      sections: [
        {
          title: "A theme for stories and ideas.",
          body: [
            "Incredible began with Ghost's ",
            { text: "Casper theme", href: "https://github.com/TryGhost/Casper" },
            " as its starting point and evolved into a custom publishing experience with a redesigned frontend, tailored layouts, and additional interactive features.",
          ],
          media: {
            type: "gallery",
            items: [
              {
                title: "Homepage",
                label: "Incredible homepage",
                image: image(
                  "incredible-home-crop.webp",
                  "Incredible homepage with a hero photo of hands typing on a laptop above a grid of post cards",
                  1050,
                  1514,
                ),
                full: image(
                  "incredible-home-full.webp",
                  "Full Incredible homepage, from the hero to the footer",
                  1382,
                  4096,
                ),
              },
              {
                title: "Single post",
                label: "Incredible single post page",
                image: image(
                  "incredible-post-crop.webp",
                  "End of an Incredible article with a member sign-up prompt and related post cards",
                  1050,
                  1514,
                ),
                full: image(
                  "incredible-post-full.webp",
                  "Full Incredible single post page, from the header image to the footer",
                  1828,
                  4096,
                ),
              },
            ],
          },
        },
        {
          title: "A rebuilt frontend foundation",
          body: [
            "Starting with Ghost's Casper theme, I replaced its original styling and build workflow with a new frontend structure built around Foundation for Sites, Sass, and Vite. This provided the foundation for Incredible's redesigned layouts, styling, and interactive features.",
          ],
        },
        {
          title: "Publishing experience",
          body: [
            "Incredible extends beyond the homepage with dedicated layouts for articles, pages, tags, and author archives. Interactive navigation, infinite scrolling, and pagination make it easier for readers to explore the publication, while subtle animations and an About Me modal add another layer to the experience.",
          ],
          media: {
            type: "video",
            poster: image(
              "incredible-hero.webp",
              "Incredible homepage hero with the theme title, an About Me button and a photo of hands typing on a laptop",
            ),
            caption:
              "A walkthrough of Incredible's layouts, navigation, and publishing features",
          },
        },
        {
          title: "Customization and design decisions",
          subsections: [
            {
              title: "Typography beyond the defaults",
              body: [
                "I added custom Google Fonts support, allowing publishers to use their preferred typography instead of being restricted to Ghost's built-in font options.",
              ],
              media: {
                type: "image",
                image: image(
                  "incredible-google-fonts.webp",
                  "Ghost design settings with Josefin Sans and Titillium Web chosen as the title and body Google Fonts",
                ),
                zoom: true,
              },
            },
            {
              title: "A visual identity of their own",
              body: [
                "Customizable text, background, and accent colors gave publishers control over the theme's visual identity while keeping the underlying layout intact.",
              ],
              media: {
                type: "image",
                image: image(
                  "incredible-colors.webp",
                  "Ghost design settings with color pickers for the header, body, posts, footer and widgets beside a red footer preview",
                ),
                zoom: true,
              },
            },
            {
              title: "Customization within constraints",
              body: [
                "Ghost's theme validation process flagged themes that exceeded the 15-setting limit at the time. I prioritized options with the greatest impact on the publishing experience, keeping the remaining design decisions within the theme's implementation.",
              ],
            },
          ],
        },
        {
          title: "Project status",
          body: [
            "Incredible was submitted to the Ghost Theme Store for review, but no feedback was received. Development continued on other projects while awaiting a response. The theme's review status remained unresolved when my tenure at the company ended.",
          ],
        },
      ],
    },
  ],
};
