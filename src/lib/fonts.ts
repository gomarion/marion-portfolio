import {
  IBM_Plex_Mono,
  Inter,
  JetBrains_Mono,
  Open_Sans,
} from "next/font/google";

// Body copy, navigation, labels and buttons.
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Section titles and "What I do" item titles.
export const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// Hero headline (bold), tech-stack lines (light), and on case studies the
// watermark (extra light), highlight labels (regular) and project detail
// values (semibold). Not a
// variable font, so each weight is listed.
export const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
});

// Only for the WordPress case study's Spheres demo, matching the live site.
// Not preloaded, so other pages don't download it.
export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: "400",
  preload: false,
});

export const fontVariables = [
  inter.variable,
  jetBrainsMono.variable,
  ibmPlexMono.variable,
].join(" ");
