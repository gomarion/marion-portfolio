import { site, socialLinks } from "@/data/site";
import { absoluteUrl } from "@/lib/site-url";

// Structured data (JSON-LD) that tells search engines what a page is about.
// `<` is escaped so text in the data can't close the script tag early.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

// Who the site is about: used on its own on the homepage, and as the author
// of every blog post, so search engines tie everything to the same person.
export function personSchema() {
  return {
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: site.name,
    url: absoluteUrl("/"),
    jobTitle: "Web Developer",
    description: site.description,
    image: absoluteUrl("/images/avatar.jpg"),
    sameAs: socialLinks
      .map((link) => link.href)
      .filter((href) => href.startsWith("https://")),
  };
}
