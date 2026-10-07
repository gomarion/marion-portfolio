import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience, experienceSummary } from "@/data/experience";

// Figma "Experience" (126:173): a 541px centered column with centered text.
// Entries are 16px with the role at 18px semibold; company names link to
// their sites (blue, underlined on hover).
export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-135.25 text-center"
    >
      <SectionHeading>Experience</SectionHeading>
      <p className="mt-3.75 text-body-sm">{experienceSummary}</p>
      <ul className="mt-12.75 flex flex-col gap-14">
        {experience.map((job) => (
          <li key={`${job.years}-${job.company}`} className="text-body-sm">
            <p>{job.years}</p>
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
          </li>
        ))}
      </ul>
    </section>
  );
}
