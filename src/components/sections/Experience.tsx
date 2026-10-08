import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience, experienceSummary } from "@/data/experience";

// Figma "Experience" (249:39): a 550px centered column; heading and intro
// centered. From `sm` up each entry is two columns — year left, role +
// company right — left-aligned; below `sm` the year stacks above them,
// centered. Entries are 16px (years in JetBrains Mono) with the role at 18px
// semibold; company names link to their sites (blue, underlined on hover).
export function Experience() {
  return (
    <section id="experience" className="mx-auto w-full max-w-137.5">
      <SectionHeading className="text-center">Experience</SectionHeading>
      <p className="mt-3.75 text-center text-body-sm">{experienceSummary}</p>
      <ul className="mt-12.75 flex flex-col gap-14 sm:gap-11">
        {experience.map((job) => (
          <li
            key={`${job.years}-${job.company}`}
            className="text-center text-body-sm sm:grid sm:grid-cols-[14.5rem_1fr] sm:text-left"
          >
            <p className="font-mono">{job.years}</p>
            <div>
              <p className="text-body font-semibold">{job.role}</p>
              <p>
                {"url" in job ? (
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link underline-offset-4 hover:underline"
                  >
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
