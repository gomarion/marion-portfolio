import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { SITE_URL } from "@/lib/site-url";

// Link preview images (Open Graph) for social sites and chat apps, drawn at
// build time. White, like the site: the avatar, name and tagline at the
// top, a small red label and a large IBM Plex Mono title, the site's
// address, and a black strip along the bottom edge.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const fontFile = (pkg: string, file: string) =>
  readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

// Read once per build. ImageResponse can't read woff2, so these are woff.
const [plexMonoBold, interRegular, interSemiBold, avatar] = await Promise.all([
  fontFile("ibm-plex-mono", "ibm-plex-mono-latin-700-normal.woff"),
  fontFile("inter", "inter-latin-400-normal.woff"),
  fontFile("inter", "inter-latin-600-normal.woff"),
  readFile(join(process.cwd(), "public/images/avatar.jpg"), "base64"),
]);

const ACCENT = "#f23737";
const MUTED = "#656565";

type OgImageProps = {
  // Small red label above the title, e.g. "Blog" or "Case study".
  label: string;
  title: string;
  // Optional line under the title, e.g. a post's date.
  detail?: string;
};

export function ogImage({ label, title, detail }: OgImageProps) {
  // Long titles step down a size so they fit in three lines.
  const titleSize = title.length > 60 ? 52 : title.length > 36 ? 60 : 72;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        color: "#000",
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px 56px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img. */}
          <img
            src={`data:image/jpeg;base64,${avatar}`}
            width={72}
            height={72}
            alt=""
            style={{ borderRadius: 36 }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: 3 }}>
              {site.name}
            </div>
            <div style={{ fontSize: 20, color: MUTED }}>{site.tagline}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 2.6,
              textTransform: "uppercase",
              color: ACCENT,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: titleSize * 0.06,
            }}
          >
            {title}
          </div>
          {detail && <div style={{ fontSize: 24, color: MUTED }}>{detail}</div>}
        </div>

        <div style={{ fontSize: 22, color: MUTED }}>
          {new URL(SITE_URL).host}
        </div>
      </div>
      <div style={{ height: 16, background: "#000" }} />
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "IBM Plex Mono", data: plexMonoBold, weight: 700 },
        { name: "Inter", data: interRegular, weight: 400 },
        { name: "Inter", data: interSemiBold, weight: 600 },
      ],
    },
  );
}
