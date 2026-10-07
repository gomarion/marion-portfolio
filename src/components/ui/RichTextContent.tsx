import type { RichText } from "@/data/projects";

// Renders text with inline links. Links keep the surrounding text color with
// a permanent underline, fade on hover, and open in a new tab.
export function RichTextContent({ content }: { content: RichText }) {
  return content.map((part, index) =>
    typeof part === "string" ? (
      part
    ) : (
      <a
        key={index}
        href={part.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 transition-opacity hover:opacity-60"
      >
        {part.text}
      </a>
    ),
  );
}
