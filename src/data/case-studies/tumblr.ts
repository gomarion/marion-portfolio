import type { ProjectImage } from "@/data/projects";
import type { CaseStudy } from "./types";

const image = (
  file: string,
  alt: string,
  width = 1920,
  height = 928,
): ProjectImage => ({
  src: `/images/case-studies/tumblr/${file}`,
  alt,
  width,
  height,
});

// A sheet in the theme fan: the top and footer of a theme's page joined
// into one 347×840 strip, opening the full page in the lightbox.
const sheet = (
  name: string,
  title: string,
  description: string,
  full: { width: number; height: number },
  place: { left: number; top: number; rotate: number },
) => ({
  title,
  label: `${title} Tumblr theme page`,
  image: image(
    `tumblr-fan-${name}.webp`,
    `${title} Tumblr theme: ${description}`,
    700,
    1697,
  ),
  full: image(
    `tumblr-${name}-full.webp`,
    `Full ${title} Tumblr theme page, from the header to the footer`,
    full.width,
    full.height,
  ),
  ...place,
});

// Figma "Case Study - Tumblr" (344:30).
export const tumblr: CaseStudy = {
  slug: "tumblr",
  title: "Tumblr Themes",
  subtitle: "A decade of building for the Tumblr ecosystem.",
  intro: [
    "Over nine years at ",
    { text: "Artistic Influence", href: "https://artistic-influence.com/" },
    ", I contributed to the development and maintenance of a commercial Tumblr theme catalog spanning approximately 51 released themes. My work grew from platform updates and customer support to developing new themes, designing selected products, and improving the frontend development workflow.",
  ],
  files: [
    {
      name: "Tumblr",
      watermarkRepeats: 80,
      watermarkWidth: 1410,
      number: "2001",
      details: [
        { label: "Role", value: "Theme Developer & Designer" },
        { label: "Platform", value: "Tumblr" },
        { label: "Catalog", value: "51 themes" },
        {
          label: "Technologies",
          value: "HTML, CSS/SASS, JavaScript, Git, Webpack, Vite",
        },
      ],
      detailColumns: { left: 400, right: 610, gap: 70 },
      fold: "top",
      sections: [
        {
          title: "Maintaining and Growing the Collection",
          body: [
            [
              "My work spanned the maintenance of existing themes, compatibility updates as Tumblr evolved, customer support, and the development of new products. Over time, I also took on design responsibilities for selected themes and helped modernize the development workflow.",
            ],
            [
              "The collection brought together themes developed across different stages of Artistic Influence's history, eventually reaching 51 releases.",
            ],
          ],
          // Figma "Frame 49" (356:293); back to front.
          media: {
            type: "fan",
            items: [
              sheet(
                "pop-rocks",
                "Pop Rocks",
                "a white page with a bold POP logo and photo posts",
                { width: 1920, height: 11860 },
                { left: 15.645, top: 6.641, rotate: -16.39 },
              ),
              sheet(
                "astoria",
                "Astoria",
                "a light page with an ASTORIA title, sidebar and photo grid",
                { width: 1920, height: 4653 },
                { left: 20.013, top: 2.972, rotate: -7.69 },
              ),
              sheet(
                "nirvana",
                "Nirvana",
                "a dark page with a header photo and a column of photo posts",
                { width: 1920, height: 6524 },
                { left: 52.312, top: 7.803, rotate: 16.39 },
              ),
              sheet(
                "icecream",
                "Ice Cream",
                "a dark page with an ICE CREAM header and photo and text posts",
                { width: 1920, height: 4834 },
                { left: 45.302, top: 3.637, rotate: 7.69 },
              ),
              sheet(
                "alicia-keys",
                "Alicia Keys",
                "a navy header with her portrait above a three-column grid of video and photo posts",
                { width: 1920, height: 6061 },
                { left: 32.454, top: 0.106, rotate: 0 },
              ),
            ],
          },
        },
        {
          title: "Recognition & Reach",
          body: [
            [
              "Artistic Influence's Tumblr themes gained visibility through featured placements in Tumblr's Theme Garden, with some receiving additional recognition on the platform. The collection reached a broad audience, including customers such as Alicia Keys, Fender, and Madison Square Garden.",
            ],
            [
              "My contributions included theme development, platform compatibility, and selected original designs across the collection.",
            ],
          ],
          media: {
            type: "video",
            poster: image(
              "tumblr-recognition.webp",
              "The Tumblr themes everyone is using: a video featuring the Alicia Keys theme",
              1920,
              1080,
            ),
            youtube: "pvrQT8pYgBU",
          },
        },
        {
          title: "Project status",
          body: [
            "The Tumblr theme collection remained a commercial product line during my tenure at Artistic Influence. My work contributed to its ongoing maintenance and development, and the catalog comprised 51 themes by the end of my tenure.",
          ],
        },
      ],
    },
    {
      name: "Pamphlet",
      watermarkRepeats: 63,
      watermarkWidth: 1352,
      number: "2002",
      details: [
        { label: "Role", value: "Designer & Developer" },
        { label: "Platform", value: "Tumblr" },
        { label: "Focus", value: "Editorial & Photography" },
        { label: "Technologies", value: "HTML, CSS/SASS, JavaScript" },
      ],
      detailColumns: { left: 400, right: 610, gap: 70 },
      fold: "top",
      sections: [
        {
          title: "A digital brochure for visual storytellers",
          body: [
            [
              "Pamphlet was designed and developed as a digital brochure for photographers and designers looking to showcase their work. Its two-image hero pairs a prominent photograph with a smaller supporting image, with the site title positioned alongside them to create a distinctive opening composition.",
            ],
            [
              "Below the hero, the post feed occupies a deliberately narrower area of the page. Asymmetrical image arrangements, generous white space, and contrasting content blocks give the theme the feel of a curated publication rather than a conventional blog.",
            ],
          ],
          media: {
            type: "preview",
            title: "Pamphlet",
            images: [
              image(
                "pamphlet-home-crop-1.webp",
                "Top of the Pamphlet homepage: a typewriter photo and a smaller portrait beside the PAMPHLET title, above a grid of photo posts",
                1050,
                1496,
              ),
              image(
                "pamphlet-home-crop-2.webp",
                "Bottom of the Pamphlet homepage: an Ask post, photo posts, a Load more posts button and the black footer",
                1050,
                1496,
              ),
            ],
            full: image(
              "pamphlet-home-full.webp",
              "Full Pamphlet homepage, from the hero to the footer",
              1920,
              4743,
            ),
          },
        },
        {
          title: "A New Direction, Built on Proven Patterns.",
          body: [
            [
              "Developing commercial Tumblr themes meant balancing distinctive designs with a practical production timeline of two to four weeks. Rather than reinventing every post layout, I built on established patterns from earlier themes, refining their presentation to fit Pamphlet's visual direction.",
            ],
            [
              "The result combined familiar, proven implementations with a new overall composition—one defined by its image-led hero, unconventional title placement, and brochure-like post feed.",
            ],
          ],
          media: {
            type: "slider",
            label: "Pamphlet screenshots",
            images: [
              image(
                "pamphlet-homepage-hero.webp",
                "Pamphlet hero: a typewriter on a wooden desk beside a portrait and the PAMPHLET title",
              ),
              image(
                "pamphlet-homepage-post-feed-1.webp",
                "Pamphlet post feed: photo posts of a tablet chart, a photographer, mugs on the grass and a forest road",
              ),
              image(
                "pamphlet-homepage-post-feed-2.webp",
                "Pamphlet post feed: a blue Ask post beside a black Get this theme! block, above an aerial photo of rooftops",
              ),
              image(
                "pamphlet-homepage-post-feed-3.webp",
                "Pamphlet post feed: a wristwatch photo, a Leo Burnett quote post and black text and link posts",
              ),
            ],
          },
        },
        {
          title: "Project status",
          body: [
            "Pamphlet was designed and developed by me and released through Artistic Influence's commercial Tumblr theme collection, where it joined the company's catalog of customizable themes.",
          ],
        },
      ],
    },
  ],
};
