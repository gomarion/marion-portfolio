// Text that turns bolder while its nearest `group` ancestor has
// `data-active`. IBM Plex Mono isn't a variable font, so a weight change
// would snap; instead a copy in the `bold` weight is stacked on the text and
// fades in over it. The font is monospaced, so both weights are the same
// width and nothing shifts or re-wraps. Screen readers only read the text
// once.
export function BoldOnActive({ text, bold }: { text: string; bold: string }) {
  return (
    <span className="grid">
      <span className="col-start-1 row-start-1 transition-opacity duration-500 ease-in-out group-data-active:opacity-0">
        {text}
      </span>
      <span
        aria-hidden
        className={`col-start-1 row-start-1 opacity-0 transition-opacity duration-500 ease-in-out group-data-active:opacity-100 ${bold}`}
      >
        {text}
      </span>
    </span>
  );
}
