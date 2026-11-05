import { SectionHeading } from "@/components/ui/SectionHeading";
import { KeyTerms } from "@/components/ui/KeyTerms";
import { SliderGallery } from "@/components/work/galleries/SliderGallery";
import type { ProjectImage } from "@/data/projects";

const terms = [
  "Claude Code",
  "AI-powered workflows",
  "Next.js",
  "TypeScript",
];

const screenshot = (file: string, alt: string): ProjectImage => ({
  src: `/images/exploring/${file}`,
  alt,
  width: 1918,
  height: 1080,
});

const screenshots = [
  screenshot(
    "claude-code-fonts-setup.webp",
    "Claude Code session setting up the portfolio's fonts and site data in Next.js",
  ),
  screenshot(
    "claude-code-site-header.webp",
    "Claude Code session building the site header component from the Figma design",
  ),
  screenshot(
    "claude-code-commit.webp",
    "Claude Code session committing a spacing change and adjusting a tablet layout",
  ),
];

// Figma "Currently Exploring" (126:198): a 1028px centered block. The intro
// (eyebrow, title, text 15px apart), the "AI-assisted development" row and
// the screenshot slider sit 60px apart.
export function CurrentlyExploring() {
  return (
    <section className="mx-auto flex w-full max-w-257 flex-col gap-10 sm:gap-15">
      <div className="flex flex-col gap-3.75">
        <p className="text-body font-semibold uppercase">
          Currently Exploring / 2026
        </p>
        <SectionHeading className="sm:leading-[1.4]!">
          Building a new way of working with AI.
        </SectionHeading>
        <p className="text-body">
          I&apos;m exploring AI-assisted programming and how tools like Claude Code can support the development process—from planning and problem-solving to implementation and refinement.
        </p>
        <p className="text-body">
          My focus is on learning how to work effectively with AI while keeping the technical decisions, code quality, and overall direction firmly in my hands.
        </p>
      </div>

      {/* Figma "Frame 54" (548:75): icon + label, then the terms, 80px
          apart, wrapping onto 2 rows. Stacked below `xl`. */}
      <div className="flex flex-col items-start gap-3 xl:flex-row xl:items-center xl:gap-20">
        <h3 className="flex shrink-0 items-center gap-5 font-code text-code font-semibold">
          <CodeIcon />
          AI-assisted development
        </h3>
        <KeyTerms items={terms} />
      </div>

      <SliderGallery
        images={screenshots}
        label="Claude Code screenshots"
        aspectRatio="1918 / 1080"
        lens
        autoplay={false}
      />
    </section>
  );
}

// Figma "Code Icon" (548:46): a 38×32 rounded box with a terminal prompt.
function CodeIcon() {
  return (
    <svg
      aria-hidden
      width="38"
      height="32"
      viewBox="0 0 38 32"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M6 1.5H32C34.4853 1.5 36.5 3.51472 36.5 6V26C36.5 28.4853 34.4853 30.5 32 30.5H6C3.51472 30.5 1.5 28.4853 1.5 26V6C1.5 3.51472 3.51472 1.5 6 1.5Z"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M8.96109 10.8795C8.45437 10.3728 8.45437 9.54985 8.96109 9.04313C9.46781 8.53641 10.2907 8.53641 10.7974 9.04313L17.2835 15.5291C17.7902 16.0359 17.7902 16.8588 17.2835 17.3655L10.7974 23.8515C10.2907 24.3582 9.46781 24.3582 8.96109 23.8515C8.45437 23.3448 8.45437 22.5219 8.96109 22.0151L14.5269 16.4493L8.96109 10.8795ZM17.6605 21.6382H28.0381C28.7556 21.6382 29.3353 22.2178 29.3353 22.9354C29.3353 23.6529 28.7556 24.2326 28.0381 24.2326H17.6605C16.9429 24.2326 16.3633 23.6529 16.3633 22.9354C16.3633 22.2178 16.9429 21.6382 17.6605 21.6382Z"
        fill="currentColor"
      />
    </svg>
  );
}
