"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type KeyboardEvent,
  type TouchEvent,
  type WheelEvent,
} from "react";
import type { ProjectImage } from "@/data/projects";

type SliderGalleryProps = {
  images: ProjectImage[];
  label: string;
};

const AUTOPLAY_MS = 5000;

// Minimum horizontal travel (px) for a swipe on the last slide to rewind.
const SWIPE_PX = 50;

// Trackpad: horizontal wheel travel needed to rewind, and the quiet gap (ms)
// that separates one wheel gesture from the next.
const WHEEL_PX = 60;
const WHEEL_GESTURE_GAP_MS = 200;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

function scrollToSlide(
  track: HTMLElement,
  index: number,
  reducedMotion: boolean,
) {
  track.scrollTo({
    left: index * track.clientWidth,
    behavior: reducedMotion ? "auto" : "smooth",
  });
}

// Figma "Image gallery slider" (122:121): a 980×510 frame with 8px pagination
// dots 32px below. Slides scroll-snap, so swiping and arrow keys work natively.
// Autoplay advances every 5s and rewinds to the first slide after the last;
// it pauses on hover, keyboard focus, touch, off-screen and hidden tab, and is
// off entirely for reduced-motion users. Going forward from the last slide —
// touch swipe, trackpad swipe or the right arrow key — rewinds to the first.
// Each slide is a hard snap stop, so a fast swipe moves one slide at a time.
export function SliderGallery({ images, label }: SliderGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; atEnd: boolean }>(null);
  const wheelRef = useRef({ last: 0, dx: 0, startedAtEnd: false, done: false });
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [inView, setInView] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true,
  );
  const pageVisible = useSyncExternalStore(
    subscribeVisibility,
    () => document.visibilityState === "visible",
    () => false,
  );

  const autoplay =
    !reducedMotion &&
    !hovered &&
    !focused &&
    !touching &&
    inView &&
    pageVisible;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // Restarts whenever the slide changes, so a dot click or swipe also gets a
  // full interval before the next advance.
  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;
      const next = active === images.length - 1 ? 0 : active + 1;
      scrollToSlide(track, next, false);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [autoplay, active, images.length]);

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    scrollToSlide(track, index, reducedMotion);
  };

  const isAtEnd = () => {
    const track = trackRef.current;
    if (!track) return false;
    return track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight" && isAtEnd()) {
      event.preventDefault();
      goTo(0);
    }
  };

  // Trackpad swipes arrive as a burst of wheel events (plus momentum). Only a
  // gesture that *starts* on the last slide rewinds, so momentum carrying the
  // user onto the last slide doesn't immediately send them back.
  const onWheel = (event: WheelEvent<HTMLElement>) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    const wheel = wheelRef.current;
    if (event.timeStamp - wheel.last > WHEEL_GESTURE_GAP_MS) {
      wheel.dx = 0;
      wheel.startedAtEnd = isAtEnd();
      wheel.done = false;
    }
    wheel.last = event.timeStamp;
    wheel.dx += event.deltaX;
    if (wheel.startedAtEnd && !wheel.done && wheel.dx > WHEEL_PX) {
      wheel.done = true;
      goTo(0);
    }
  };

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      atEnd: active === images.length - 1,
    };
    setTouching(true);
  };

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    setTouching(false);
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start?.atEnd) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    // A leftward (next-slide) swipe on the last slide wraps to the first.
    if (dx < -SWIPE_PX && Math.abs(dx) > Math.abs(dy)) goTo(0);
  };

  // Only keyboard focus pauses; a mouse click on a dot shouldn't stop autoplay.
  const onFocus = (event: FocusEvent<HTMLElement>) => {
    if (event.target.matches(":focus-visible")) setFocused(true);
  };
  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
  };

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div onFocus={onFocus} onBlur={onBlur}>
        <div
          ref={trackRef}
          onScroll={onScroll}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchCancel={() => {
            touchStartRef.current = null;
            setTouching(false);
          }}
          onKeyDown={onKeyDown}
          onWheel={onWheel}
          tabIndex={0}
          aria-live={autoplay ? "off" : "polite"}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, index) => (
            <div
              key={image.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${images.length}`}
              className="relative aspect-980/510 w-full shrink-0 snap-start snap-always"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1280px) 980px, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div
        onFocus={onFocus}
        onBlur={onBlur}
        className="mt-8 flex justify-center gap-3.25"
      >
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === active}
            className={`size-2 rounded-full transition-colors ${
              index === active
                ? "bg-ink"
                : "cursor-pointer bg-mute hover:bg-ink/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
