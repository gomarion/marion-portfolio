import { RichTextContent } from "@/components/ui/RichTextContent";
import type {
  CaseSection as CaseSectionData,
  CaseSubsection,
} from "@/data/case-studies";
import { CaseMedia } from "./CaseMedia";

// Figma section block: uppercase heading, body 30px below, then media 50px
// below the text (30px when the section sets `mediaGap: 30`). Subsections
// follow 30px below the heading, 30px apart.
export function CaseSection({ section }: { section: CaseSectionData }) {
  return (
    <section>
      <h3 className="text-lead font-semibold uppercase">{section.title}</h3>
      {section.body && (
        <p className="mt-7.5 text-body-sm">
          <RichTextContent content={section.body} />
        </p>
      )}
      {section.media && (
        <div className={section.mediaGap === 30 ? "mt-7.5" : "mt-12.5"}>
          <CaseMedia media={section.media} />
        </div>
      )}
      {section.subsections && (
        <div className="mt-7.5 flex flex-col gap-7.5">
          {section.subsections.map((subsection) => (
            <Subsection key={subsection.title} subsection={subsection} />
          ))}
        </div>
      )}
    </section>
  );
}

// Figma "Frame 17" (336:1205): Inter SemiBold 16 uppercase heading, then the
// body and media, 15px apart.
function Subsection({ subsection }: { subsection: CaseSubsection }) {
  return (
    <div>
      <h4 className="text-body-sm font-semibold uppercase">
        {subsection.title}
      </h4>
      <p className="mt-3.75 text-body-sm">
        <RichTextContent content={subsection.body} />
      </p>
      {subsection.media && (
        <div className="mt-3.75">
          <CaseMedia media={subsection.media} />
        </div>
      )}
    </div>
  );
}
