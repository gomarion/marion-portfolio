import { twMerge } from "tailwind-merge";

type ButtonLinkProps = React.ComponentProps<"a">;

// Figma "Get in touch" button: solid black, 49px tall, 31px side padding,
// Inter Medium 16 uppercase.
export function ButtonLink({ className, children, ...props }: ButtonLinkProps) {
  return (
    <a
      {...props}
      className={twMerge(
        "inline-flex h-12.25 items-center bg-ink px-7.75 text-nav font-medium text-paper uppercase transition-opacity hover:opacity-80",
        className
      )}
    >
      {children}
    </a>
  );
}
