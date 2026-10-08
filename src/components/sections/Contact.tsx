import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

// Figma "Contact" (134:30): an 816px centered block, text left.
export function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-204">
      <SectionHeading>Have a project in mind?</SectionHeading>
      <p className="mt-5 text-body">
        Whether you&apos;re looking for help with a web project, exploring a development opportunity, or just want to talk about the web, I&apos;d love to hear from you.
      </p>
      <div className="mt-7.5">
        <ButtonLink href={`mailto:${site.email}`}>Get in touch</ButtonLink>
      </div>
    </section>
  );
}
