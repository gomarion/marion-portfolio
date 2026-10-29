import Link from "next/link";
import { RichTextContent } from "@/components/ui/RichTextContent";
import { TechStack } from "@/components/ui/TechStack";
import type { Project } from "@/data/projects";
import { ProjectMedia } from "./ProjectMedia";

type ProjectEntryProps = {
  project: Project;
  number: number;
};

// Figma project block: label, title + description, stack (30px apart), then
// the gallery 50px below. Fills the 980px Work panel. Projects with a case
// study get a link to it 50px under the gallery (35px below `sm`).
export function ProjectEntry({ project, number }: ProjectEntryProps) {
  const index = String(number).padStart(2, "0");

  return (
    <article>
      <div className="flex flex-col gap-7.5">
        <p className="text-lead font-semibold uppercase">
          {index} / {project.label}
        </p>
        <div className="flex flex-col gap-3.75">
          <h3 className="text-body font-semibold uppercase">{project.title}</h3>
          <p className="text-body-sm">
            <RichTextContent content={project.description} />
          </p>
        </div>
        <TechStack items={project.stack} />
      </div>
      <div className="mt-12.5">
        <ProjectMedia gallery={project.gallery} label={project.title} />
      </div>
      {project.caseStudy && (
        <p className="mt-8.75 sm:mt-12.5">
          <Link
            href={`/work/${project.caseStudy}`}
            className="text-body-sm underline underline-offset-4 transition-opacity hover:opacity-60"
          >
            View case study
          </Link>
        </p>
      )}
    </article>
  );
}
