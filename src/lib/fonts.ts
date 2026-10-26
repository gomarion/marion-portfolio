import { IBM_Plex_Mono, Inter, JetBrains_Mono } from "next/font/google";

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
// watermark (extra light) and project detail values (semibold). Not a
// variable font, so each weight is listed.
export const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["200", "300", "600", "700"],
});

export const fontVariables = [
  inter.variable,
  jetBrainsMono.variable,
  ibmPlexMono.variable,
].join(" ");
