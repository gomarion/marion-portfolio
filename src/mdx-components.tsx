import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { LensImage } from "@/components/case-study/LensImage";
import { Reveal } from "@/components/ui/Reveal";

// How blog posts (src/content/blog/*.mdx) are styled. Required by @next/mdx.
//
// Text sits in a 680px column (about 65 characters a line, the comfortable
// range for long reading), with a 1.7 line height and near-normal letter
// spacing instead of the site's 0.11em, which tires the eye over long
// paragraphs. Headings keep the site's tracked style. Images can break out
// to the full 1080px post width with `wide`.
const COLUMN = "mx-auto w-full max-w-170";
const TEXT = "text-[1.125rem] leading-[1.7] tracking-[0.01em]";

type PostImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  // Full 1080px post width instead of the 680px text column.
  wide?: boolean;
  // The hover magnifying lens, as on the case studies.
  zoom?: boolean;
};

// <PostImage src="/images/blog/…" alt="…" width={…} height={…} wide />
// in a post. Fades into view like the case study screenshots: a wipe, or a
// rise with the lens (a wipe's clip would cut the lens off).
function PostImage({
  src,
  alt,
  width,
  height,
  caption,
  wide,
  zoom,
}: PostImageProps) {
  const image = { src, alt, width, height };
  return (
    <figure
      className={`mx-auto mt-10 w-full ${wide ? "max-w-270" : "max-w-170"}`}
    >
      {zoom ? (
        <Reveal effect="up">
          <LensImage image={image} />
        </Reveal>
      ) : (
        <Reveal effect="wipe">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={
              wide
                ? "(min-width: 1280px) 1080px, 100vw"
                : "(min-width: 768px) 680px, 100vw"
            }
            className="block h-auto w-full"
          />
        </Reveal>
      )}
      {caption && (
        <figcaption className="mt-2.5 text-[0.875rem] leading-[1.5] font-light tracking-design text-caption italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Links to other sites open in a new tab.
function PostLink({ href = "", children, ...props }: ComponentProps<"a">) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
      className="text-link underline underline-offset-4 transition-opacity hover:opacity-70"
    >
      {children}
    </a>
  );
}

const components = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h2
      className={`${COLUMN} mt-14 font-mono text-item-title leading-[1.3] max-sm:text-[1.375rem]`}
    >
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3
      className={`${COLUMN} mt-10 text-[1.25rem] leading-[1.4] font-semibold tracking-[0.02em]`}
    >
      {children}
    </h3>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className={`${COLUMN} mt-6 ${TEXT}`}>{children}</p>
  ),
  a: PostLink,
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className={`${COLUMN} mt-6 list-disc space-y-2 pl-6 ${TEXT}`}>
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className={`${COLUMN} mt-6 list-decimal space-y-2 pl-6 ${TEXT}`}>
      {children}
    </ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="pl-1 marker:text-subtle">{children}</li>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote
      className={`${COLUMN} mt-8 border-l-4 border-ink pl-5 italic [&>p]:mt-3 [&>p:first-child]:mt-0`}
    >
      {children}
    </blockquote>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  // Inline `code`; inside a code block the block's own styles take over.
  code: ({ children }: { children?: ReactNode }) => (
    <code className="rounded bg-panel px-1.5 py-0.5 font-code text-[0.9em] tracking-normal">
      {children}
    </code>
  ),
  pre: ({ children }: { children?: ReactNode }) => (
    <pre
      className={`${COLUMN} mt-8 overflow-x-auto rounded-[10px] bg-ink p-5 font-code text-[0.9375rem] leading-[1.6] tracking-normal text-paper [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[1em]`}
    >
      {children}
    </pre>
  ),
  hr: () => <hr className={`${COLUMN} my-12 border-line`} />,
  PostImage,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
