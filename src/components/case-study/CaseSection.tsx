import { RichTextContent } from "@/components/ui/RichTextContent";
import type { CaseSection as CaseSectionData } from "@/data/case-studies";
import { CaseMedia } from "./CaseMedia";

type CaseSectionProps = {
  section: CaseSectionData;
  // In Figma the first section's media sits 30px under the text; the rest
  // use 50px.
  first: boolean;
};

// Figma section block: uppercase heading, body 30px below, then media.
export function CaseSection({ section, first }: CaseSectionProps) {
  return (
    <section>
      <h3 className="text-lead font-semibold uppercase">{section.title}</h3>
      <p className="mt-7.5 text-body-sm">
        <RichTextContent content={section.body} />
      </p>
      {section.media && (
        <div className={first ? "mt-7.5" : "mt-12.5"}>
          <CaseMedia media={section.media} />
        </div>
      )}
    </section>
  );
}
