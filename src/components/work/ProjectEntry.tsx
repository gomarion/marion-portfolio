import { TechStack } from "@/components/ui/TechStack";
import type { Project } from "@/data/projects";
import { ProjectMedia } from "./ProjectMedia";

type ProjectEntryProps = {
  project: Project;
  number: number;
};

// Figma project block: label, title + description, stack (30px apart, 1245px
// wide), then the gallery 50px below.
export function ProjectEntry({ project, number }: ProjectEntryProps) {
  const index = String(number).padStart(2, "0");

  return (
    <article>
      <div className="flex max-w-311.25 flex-col gap-7.5">
        <p className="text-lead font-semibold uppercase">
          {index} / {project.label}
        </p>
        <div className="flex flex-col gap-3.75">
          <h3 className="text-body font-semibold uppercase">{project.title}</h3>
          <p className="text-body">{project.description}</p>
        </div>
        <TechStack items={project.stack} />
      </div>
      <div className="mt-12.5">
        <ProjectMedia gallery={project.gallery} label={project.title} />
      </div>
    </article>
  );
}
