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

// Hero headline (bold) and tech-stack lines (light). Not a variable font.
export const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["300", "700"],
});

export const fontVariables = [
  inter.variable,
  jetBrainsMono.variable,
  ibmPlexMono.variable,
].join(" ");
