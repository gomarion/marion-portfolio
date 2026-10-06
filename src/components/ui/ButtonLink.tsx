type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
};

// Figma "Get in touch" button: solid black, 49px tall, 31px side padding,
// Inter Medium 16 uppercase.
export function ButtonLink({ href, children }: ButtonLinkProps) {
  return (
    <a
      href={href}
      className="inline-flex h-12.25 items-center bg-ink px-7.75 text-nav font-medium text-paper uppercase transition-opacity hover:opacity-80"
    >
      {children}
    </a>
  );
}
