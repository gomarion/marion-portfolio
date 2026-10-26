"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import type { ProjectImage } from "@/data/projects";

export type LightboxItem = { title: string; image: ProjectImage };

type LightboxProps = {
  items: LightboxItem[];
  // Item shown, or null when closed.
  index: number | null;
  onIndexChange: (index: number) => void;
  // Called after the lightbox closes (Esc, × button or a click outside the
  // screenshot). The owner should move focus back to what opened it.
  onClose: () => void;
};

// Scroll distance (px) that counts as a change of direction.
const SCROLL_THRESHOLD_PX = 4;

// Height of the title bar; it never hides above this scroll position.
const BAR_HEIGHT_PX = 72;

// Full-page screenshot viewer. It's a native <dialog>, so Esc, the dimmed
// backdrop and keeping focus inside come from the browser. The screenshot
// scrolls inside the lightbox (up to 1080px wide). With more than one item,
// arrows and ←/→ keys move between them. The title bar slides up out of view
// while scrolling down and back in when scrolling up.
export function Lightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef(0);
  const [barHidden, setBarHidden] = useState(false);

  const isOpen = index !== null;
  const item = index === null ? null : items[index];

  // Open and close the native dialog to match `index`.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      scrollRef.current?.scrollTo({ top: 0 });
      // Focus the scroll area so Space, Page Down and the arrow keys scroll it.
      scrollRef.current?.focus({ preventScroll: true });
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const resetScroll = () => {
    setBarHidden(false);
    lastScrollTopRef.current = 0;
    scrollRef.current?.scrollTo({ top: 0 });
  };

  const step = (direction: 1 | -1) => {
    if (index === null || items.length < 2) return;
    onIndexChange((index + direction + items.length) % items.length);
    resetScroll();
  };

  // Hide the title bar while scrolling down, show it while scrolling up.
  // Movements under 4px are ignored so it doesn't flicker, and it stays
  // visible near the top of the page.
  const onScroll = () => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const top = scroller.scrollTop;
    const delta = top - lastScrollTopRef.current;
    if (Math.abs(delta) < SCROLL_THRESHOLD_PX) return;
    setBarHidden(delta > 0 && top > BAR_HEIGHT_PX);
    lastScrollTopRef.current = top;
  };

  const close = () => dialogRef.current?.close();

  const onDialogClose = () => {
    resetScroll();
    onClose();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") step(1);
    else if (event.key === "ArrowLeft") step(-1);
    else return;
    event.preventDefault();
  };

  // Clicks on the dimmed area around the screenshot close the lightbox.
  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (
      event.target === event.currentTarget ||
      event.target === scrollRef.current
    ) {
      close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={item ? `${item.title} full page` : undefined}
      onClose={onDialogClose}
      onKeyDown={onKeyDown}
      onClick={onClick}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-paper backdrop:bg-ink/90 backdrop:backdrop-blur-sm"
    >
      {/* Always rendered, so it can take focus as soon as the dialog opens. */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        tabIndex={-1}
        className="h-full overflow-y-auto overscroll-contain px-0 pt-18 pb-6 outline-none sm:px-20 sm:pb-10"
      >
        {item && (
          <Image
            key={item.image.src}
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            sizes="(min-width: 1240px) 1080px, (min-width: 640px) calc(100vw - 160px), 100vw"
            className="mx-auto h-auto w-full max-w-270 bg-paper"
          />
        )}
      </div>

      {item && index !== null && (
        <>
          <div
            className={`pointer-events-none fixed inset-x-0 top-0 flex items-center justify-between gap-4 bg-ink/80 px-4 py-3.5 backdrop-blur-sm transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-within:transform-[translateY(0)] motion-reduce:transition-none sm:px-6 ${
              barHidden
                ? "transform-[translateY(-100%)]"
                : "transform-[translateY(0)]"
            }`}
          >
            <p aria-live="polite" className="text-body-sm font-semibold">
              {item.title}
              {items.length > 1 && (
                <span className="font-normal opacity-70">
                  {" "}
                  · {index + 1} of {items.length}
                </span>
              )}
            </p>
            <LightboxButton label="Close" onClick={close}>
              <path d="M6 6l12 12M18 6L6 18" />
            </LightboxButton>
          </div>

          {items.length > 1 && (
            <>
              <LightboxButton
                label="Previous screenshot"
                onClick={() => step(-1)}
                className="fixed top-1/2 left-2 -translate-y-1/2 sm:left-5"
              >
                <path d="M15 5l-7 7 7 7" />
              </LightboxButton>
              <LightboxButton
                label="Next screenshot"
                onClick={() => step(1)}
                className="fixed top-1/2 right-2 -translate-y-1/2 sm:right-5"
              >
                <path d="M9 5l7 7-7 7" />
              </LightboxButton>
            </>
          )}
        </>
      )}
    </dialog>
  );
}

// Classes for anything that opens the lightbox: a zoom cursor, and on hover
// and keyboard focus a slight fade and zoom (scale 1.03) with easing.
export const LIGHTBOX_TRIGGER_CLASSES =
  "cursor-zoom-in transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] outline-offset-4 hover:opacity-85 focus-visible:outline-2 focus-visible:outline-ink motion-safe:hover:transform-[scale(1.03)] motion-safe:focus-visible:transform-[scale(1.03)]";

type LightboxButtonProps = {
  label: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
};

// Round light button with a 24px stroked icon.
function LightboxButton({
  label,
  onClick,
  className = "",
  children,
}: LightboxButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`pointer-events-auto flex size-11 cursor-pointer items-center justify-center rounded-full bg-paper/90 text-ink shadow-md transition-colors hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper ${className}`}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="size-6 fill-none stroke-current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </button>
  );
}
