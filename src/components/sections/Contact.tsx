import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

// Figma "Contact" (134:30): an 816px centered block, text left.
export function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-204">
      <SectionHeading>Have a project in mind?</SectionHeading>
      <p className="mt-5 text-body">
        Interested in working together? I&apos;m open to new opportunities and would love to discuss how my experience in web development, CMS platforms, and technical leadership can contribute to your team.
      </p>
      <div className="mt-7.5">
        <ButtonLink href={`mailto:${site.email}`}>Get in touch</ButtonLink>
      </div>
    </section>
  );
}
