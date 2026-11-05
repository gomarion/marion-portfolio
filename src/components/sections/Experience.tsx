import { SectionHeading } from "@/components/ui/SectionHeading";
import { experienceSummary } from "@/data/experience";
import { ExperienceList } from "./ExperienceList";

// Figma "Experience" (249:39): a 550px centered column; heading and intro
// centered. From `sm` up each entry is two columns — year left, role +
// company right — left-aligned; below `sm` the year stacks above them,
// centered. Entries are 16px (years in JetBrains Mono) with the role at 18px
// semibold; company names link to their sites (blue, underlined on hover).
// On phones the entry nearest the middle of the screen grows slightly.
export function Experience() {
  return (
    <section id="experience" className="mx-auto w-full max-w-137.5">
      <SectionHeading className="text-center">Experience</SectionHeading>
      <p className="mt-3.75 text-center text-body-sm">{experienceSummary}</p>
      <ExperienceList />
    </section>
  );
}
