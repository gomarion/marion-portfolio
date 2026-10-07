import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectEntry } from "@/components/work/ProjectEntry";
import { projects } from "@/data/projects";

// Figma "Work" (126:158): heading, then 35px below it a grey panel
// (100px / 150px padding, 980px content) with projects 100px apart.
export function Work() {
  return (
    <section id="work">
      <SectionHeading>Work</SectionHeading>
      <div className="mt-8.75 flex flex-col gap-20 rounded-[15px] bg-panel px-4 py-10 sm:px-8 sm:py-16 lg:gap-25 lg:px-16 lg:py-20 xl:px-37.5 xl:py-25">
        {projects.map((project, index) => (
          <ProjectEntry
            key={project.label}
            project={project}
            number={index + 1}
          />
        ))}
      </div>
    </section>
  );
}
