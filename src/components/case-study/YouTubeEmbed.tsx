"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/data/projects";

type YouTubeEmbedProps = {
  id: string;
  poster: ProjectImage;
};

// Shows the poster until it's clicked, then swaps in YouTube's player and
// starts the video. Nothing loads from YouTube before that click. Uses the
// youtube-nocookie domain, so YouTube doesn't set cookies until playback.
export function YouTubeEmbed({ id, poster }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);

  // The play button is gone once the player loads, so move focus to the
  // player rather than letting it fall back to the page.
  useEffect(() => {
    if (playing) playerRef.current?.focus();
  }, [playing]);

  const aspectRatio = `${poster.width} / ${poster.height}`;

  if (playing) {
    return (
      <iframe
        ref={playerRef}
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={poster.alt}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="block w-full"
        style={{ aspectRatio }}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${poster.alt}`}
      className="group relative block w-full cursor-pointer outline-offset-4 focus-visible:outline-2 focus-visible:outline-ink"
      style={{ aspectRatio }}
    >
      <Image
        src={poster.src}
        alt=""
        fill
        sizes="(min-width: 1280px) 1080px, 100vw"
        className="object-cover"
      />
      {/* Round play button, as on YouTube's own thumbnails. */}
      <span
        aria-hidden
        className="absolute top-1/2 left-1/2 flex size-18 -translate-1/2 items-center justify-center rounded-full bg-ink/70 text-paper transition-[background-color,scale] duration-300 group-hover:scale-110 group-hover:bg-ink/85"
      >
        <svg viewBox="0 0 24 24" className="ml-1 size-8 fill-current">
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
      </span>
    </button>
  );
}
