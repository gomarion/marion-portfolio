import { RichTextContent } from "@/components/ui/RichTextContent";
import type {
  CaseSection as CaseSectionData,
  CaseSubsection,
  CaseText,
} from "@/data/case-studies";
import type { RichText } from "@/data/projects";
import { CaseMedia } from "./CaseMedia";

// Figma section block: uppercase heading, body 30px below, then media 50px
// below the text (30px when the section sets `mediaGap: 30`; 35px for a
// highlights row on phones). Subsections follow 30px below the heading,
// 30px apart.
export function CaseSection({ section }: { section: CaseSectionData }) {
  const mediaMargin =
    section.mediaGap === 30
      ? "mt-7.5"
      : section.media?.type === "highlights"
        ? "mt-8.75 sm:mt-12.5"
        : "mt-12.5";

  return (
    <section>
      <h3 className="text-lead font-semibold uppercase">{section.title}</h3>
      {section.body && <Paragraphs text={section.body} className="mt-7.5" />}
      {section.media && (
        <div className={mediaMargin}>
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
      <Paragraphs text={subsection.body} className="mt-3.75" />
      {subsection.media && (
        <div className="mt-3.75">
          <CaseMedia media={subsection.media} />
        </div>
      )}
    </div>
  );
}

// One paragraph, or several with a blank line (24px) between them.
function Paragraphs({
  text,
  className,
}: {
  text: CaseText;
  className: string;
}) {
  const paragraphs = Array.isArray(text[0])
    ? (text as RichText[])
    : [text as RichText];

  return (
    <div className={`flex flex-col gap-6 text-body-sm ${className}`}>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>
          <RichTextContent content={paragraph} />
        </p>
      ))}
    </div>
  );
}
