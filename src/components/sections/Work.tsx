import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectEntry } from "@/components/work/ProjectEntry";
import { projects } from "@/data/projects";

// Figma "Work" (126:158): heading, then projects 100px apart.
export function Work() {
  return (
    <section id="work">
      <SectionHeading>Work</SectionHeading>
      <div className="mt-12.5 flex flex-col gap-20 lg:gap-25">
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
