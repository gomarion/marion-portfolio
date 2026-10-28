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
  // Slide shape and image `sizes`; the defaults fit the homepage's 980×510.
  aspectRatio?: string;
  sizes?: string;
};

// Font Awesome's solid chevron (public/images/icons), mirrored for the next
// arrow.
const ARROW_ICON = "/images/icons/chevron-left-solid-full.svg";

const AUTOPLAY_MS = 5000;

// Minimum horizontal travel (px) for a swipe at either end to wrap around.
const SWIPE_PX = 50;

// Trackpad: horizontal wheel travel needed to wrap around, and the quiet gap
// (ms) that separates one wheel gesture from the next.
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
// touch swipe, trackpad swipe or the right arrow key — rewinds to the first,
// and going back from the first slide the same ways jumps to the last.
// Each slide is a hard snap stop, so a fast swipe moves one slide at a time.
// 22px chevrons either side of the dots step back and forward, wrapping
// around at either end.
export function SliderGallery({
  images,
  label,
  aspectRatio = "980 / 510",
  sizes = "(min-width: 1280px) 980px, 100vw",
}: SliderGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{
    x: number;
    y: number;
    atStart: boolean;
    atEnd: boolean;
  }>(null);
  const wheelRef = useRef({
    last: 0,
    dx: 0,
    startedAtStart: false,
    startedAtEnd: false,
    done: false,
  });
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [inView, setInView] = useState(false);
  const last = images.length - 1;

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
      const next = active === last ? 0 : active + 1;
      scrollToSlide(track, next, false);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [autoplay, active, last]);

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

  const isAtStart = () => {
    const track = trackRef.current;
    if (!track) return false;
    return track.scrollLeft <= 2;
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
    } else if (event.key === "ArrowLeft" && isAtStart()) {
      event.preventDefault();
      goTo(last);
    }
  };

  // Trackpad swipes arrive as a burst of wheel events (plus momentum). Only a
  // gesture that *starts* on the first or last slide wraps around, so
  // momentum carrying the user onto an end slide doesn't immediately send
  // them to the other end.
  const onWheel = (event: WheelEvent<HTMLElement>) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    const wheel = wheelRef.current;
    if (event.timeStamp - wheel.last > WHEEL_GESTURE_GAP_MS) {
      wheel.dx = 0;
      wheel.startedAtStart = isAtStart();
      wheel.startedAtEnd = isAtEnd();
      wheel.done = false;
    }
    wheel.last = event.timeStamp;
    wheel.dx += event.deltaX;
    if (wheel.done) return;
    if (wheel.startedAtEnd && wheel.dx > WHEEL_PX) {
      wheel.done = true;
      goTo(0);
    } else if (wheel.startedAtStart && wheel.dx < -WHEEL_PX) {
      wheel.done = true;
      goTo(last);
    }
  };

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      atStart: active === 0,
      atEnd: active === last,
    };
    setTouching(true);
  };

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    setTouching(false);
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) <= Math.abs(dy)) return;
    // A leftward (next-slide) swipe on the last slide wraps to the first; a
    // rightward (previous-slide) swipe on the first wraps to the last.
    if (start.atEnd && dx < -SWIPE_PX) goTo(0);
    else if (start.atStart && dx > SWIPE_PX) goTo(last);
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
              className="relative w-full shrink-0 snap-start snap-always"
              style={{ aspectRatio }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={sizes}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div
        onFocus={onFocus}
        onBlur={onBlur}
        className="mt-8 flex items-center justify-center gap-5"
      >
        <ArrowButton
          direction="previous"
          onClick={() => goTo(active === 0 ? last : active - 1)}
        />
        <div className="flex gap-3.25">
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
        <ArrowButton
          direction="next"
          onClick={() => goTo(active === last ? 0 : active + 1)}
        />
      </div>
    </div>
  );
}

// A 22px chevron beside the dots. Its negative vertical margin keeps the row
// as tall as the 8px dots, so the dots stay 32px below the slides.
function ArrowButton({
  direction,
  onClick,
}: {
  direction: "previous" | "next";
  onClick: () => void;
}) {
  const next = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={next ? "Next slide" : "Previous slide"}
      className="-my-1.75 cursor-pointer rounded-sm opacity-80 transition-opacity outline-offset-2 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-ink"
    >
      <Image
        src={ARROW_ICON}
        alt=""
        width={22}
        height={22}
        unoptimized
        className={`size-5.5 ${next ? "-scale-x-100" : ""}`}
      />
    </button>
  );
}
