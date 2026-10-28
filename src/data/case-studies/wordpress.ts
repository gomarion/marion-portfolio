import type { ProjectImage } from "@/data/projects";
import type { CaseStudy } from "./types";

const image = (
  file: string,
  alt: string,
  width: number,
  height: number,
): ProjectImage => ({
  src: `/images/case-studies/wordpress/${file}`,
  alt,
  width,
  height,
});

const home = image(
  "wp-home.webp",
  "Portfolio homepage: a hiker on a hilltop beside the MARION GO title, an elevation-style line of interests, and an orange This site is created with love section with keyword spheres and photo bubbles",
  1920,
  1587,
);

const archive = image(
  "wp-archive.webp",
  "Journal archive page: a large featured photo above a two-column grid of journal entries on an orange background",
  1920,
  3194,
);

const singlePost = image(
  "wp-single-post.webp",
  "Single journal entry, Weekend Wanderings: a photo of a sofa by a window above the post text and a comment form",
  1920,
  2995,
);

// Figma "Case Study - WordPress" (356:310).
export const wordpress: CaseStudy = {
  slug: "wordpress",
  title: "WordPress Development & Operations",
  subtitle:
    "A broader perspective on building and maintaining WordPress websites.",
  intro: [
    "WordPress was one of the first technologies I worked with in my career. After years of focusing on other platforms, I returned to explore its evolving block-based theme architecture, eventually designing and developing my own portfolio site. Later, as a Senior Web Developer at REFUGE Marketing & Consulting, my work expanded into overseeing client websites, coordinating development, troubleshooting technical issues, and maintaining quality across projects.",
  ],
  files: [
    {
      name: "WordPress",
      title: "WordPress Development & Operations",
      watermarkRepeats: 66,
      number: "3001",
      details: [
        { label: "Role", value: "Developer; Senior Web Developer" },
        { label: "Platform", value: "WordPress" },
        { label: "Focus", value: "Theme Development & Web Operations" },
        {
          label: "Technologies",
          // Non-breaking spaces keep each "·" on the line before a wrap.
          value:
            "WordPress\u00a0· Block Themes\u00a0· PHP\u00a0· JavaScript\u00a0· CSS/Sass\u00a0· Custom Post Types",
        },
      ],
      detailColumns: { left: 413, right: 636, gap: 31 },
      fold: "top",
      sections: [
        {
          title: "A Custom Portfolio Built on a Block Theme",
          body: [
            [
              "I used WordPress's Twenty Twenty-Five theme as the foundation for my personal portfolio, creating a child theme to implement my custom visual design while retaining the underlying block theme architecture.",
            ],
            [
              "Beyond styling and templates, I developed custom plugins to support specific homepage elements and introduced a custom post type for the Journal Entry section. This allowed me to extend the site's content structure and functionality beyond the theme's default capabilities.",
            ],
          ],
          // Figma "Frame 9" (412:171).
          media: {
            type: "gallery",
            layout: { featured: true, columns: [518, 531] },
            items: [
              {
                title: "Homepage",
                label: "portfolio homepage",
                image: home,
                full: home,
              },
              {
                title: "Journal archive",
                label: "journal archive page",
                image: archive,
                full: archive,
              },
              {
                title: "Single post",
                label: "single journal entry page",
                image: singlePost,
                full: singlePost,
              },
            ],
          },
        },
        {
          title: "Custom Interactive Components",
          body: [
            [
              "To give my portfolio a more distinctive identity, I developed two custom homepage components: Spheres and Bubbles.",
            ],
            [
              "Spheres are linked, keyword-based elements that reveal an image on hover, turning tags into interactive visual navigation. Bubbles use assigned images arranged in an overlapping composition, with hover-driven movement that adds depth and motion to the layout.",
            ],
            [
              "I implemented both features through custom WordPress plugins, extending the site's functionality beyond its child theme's templates and styling.",
            ],
          ],
          // Figma "Group 49" (412:180).
          media: {
            type: "image",
            image: image(
              "wp-components.webp",
              "Spheres and Bubbles on the portfolio homepage: a row of round keyword links (Running, Coding, Portfolio, Résumé, Journal) beside three overlapping round photos",
              1920,
              542,
            ),
            caption:
              "Hover over a sphere to reveal its image, and explore the overlapping bubbles to see their movement.",
          },
        },
        {
          title: "From Development to Website Operations",
          body: [
            [
              "At REFUGE Marketing & Consulting, my Senior Web Developer role extended beyond hands-on implementation. I managed a portfolio of client websites, coordinated development work, performed QA, investigated technical issues with the team, and responded to client technical support requests.",
            ],
            [
              "The role required balancing technical problem-solving with project coordination and quality control, helping ensure website changes were reviewed and issues were followed through to resolution.",
            ],
          ],
          media: {
            type: "highlights",
            items: [
              { icon: "checklist", label: "Project Coordination" },
              { icon: "check-circle", label: "Quality Assurance" },
              { icon: "wrench", label: "Technical Support" },
            ],
          },
        },
        {
          title: "Quality Assurance & Technical Direction",
          body: [
            [
              "During the development of REFUGE Marketing's company website, I reviewed implementations against the intended design and provided targeted revisions to the development team. My QA reviews covered typography, alignment, spacing, responsive composition, and overlapping interface elements.",
            ],
            [
              "Using browser DevTools alongside visual inspection, I identified discrepancies and translated them into actionable CSS adjustments for the developers to implement. This helped turn design feedback into specific, verifiable changes.",
            ],
          ],
          // Figma "Frame 50" (439:201).
          media: {
            type: "images",
            layout: { featured: true, columns: [475, 575], align: "center" },
            items: [
              {
                image: image(
                  "wp-qa-desktop.webp",
                  "Desktop QA review of the REFUGE testimonial section, with notes on line height, font size, width and overlapping elements, and DevTools open on the styles",
                  3047,
                  2503,
                ),
                zoom: true,
              },
              {
                image: image(
                  "wp-qa-mobile.webp",
                  "Mobile QA review of the REFUGE Results hero, with notes on text alignment and overlapping icons",
                  1390,
                  1055,
                ),
                zoom: true,
              },
              {
                image: image(
                  "wp-qa-ipad.webp",
                  "Tablet QA review of the REFUGE testimonial section, with notes on line height and overlapping elements",
                  1829,
                  1545,
                ),
                zoom: true,
              },
            ],
          },
        },
        {
          title: "Project Status",
          body: [
            [
              "The personal portfolio reached its initial implementation stage, with core templates and content structures developed. The homepage's tablet and mobile layouts were completed, while responsive implementation for other templates remains unfinished.",
            ],
            [
              "At REFUGE, my work focused on the ongoing management, technical support, QA, and delivery of client WordPress websites.",
            ],
          ],
        },
      ],
    },
  ],
};
