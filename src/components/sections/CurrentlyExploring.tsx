import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechStack } from "@/components/ui/TechStack";

const exploring = [
  "React",
  "Next.js",
  "TypeScript",
  "Vercel",
  "AI-assisted development",
];

// Figma "Currently Exploring" (126:198): an 816px centered block, text left.
export function CurrentlyExploring() {
  return (
    <section className="mx-auto w-full max-w-204">
      <SectionHeading>Currently Exploring</SectionHeading>
      <p className="mt-8.25 text-body">
        After years of working primarily with CMS-driven websites, I&apos;m
        expanding my toolkit into modern JavaScript development.
      </p>
      <TechStack items={exploring} className="mt-7" />
    </section>
  );
}
