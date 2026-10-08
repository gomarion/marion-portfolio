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
      <p className="mt-5 text-body">
        Building on years of experience developing for the web, I'm expanding my toolkit into modern application development and exploring new ways to build with JavaScript.
      </p>
      <TechStack items={exploring} className="mt-7" />
    </section>
  );
}
