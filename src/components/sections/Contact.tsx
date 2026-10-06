import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

// Figma "Contact" (134:30): an 816px centered block, text left.
export function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-204">
      <SectionHeading>Have a project in mind?</SectionHeading>
      <p className="mt-1.25 text-body">
        I&apos;m always interested in interesting web projects, development
        opportunities, and conversations about the web.
      </p>
      <div className="mt-7.5">
        <ButtonLink href={`mailto:${site.email}`}>Get in touch</ButtonLink>
      </div>
    </section>
  );
}
