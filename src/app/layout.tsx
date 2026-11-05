import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { AnalyticsConsent } from "@/components/consent/AnalyticsConsent";
import { BackToTop } from "@/components/layout/BackToTop";
import { site } from "@/data/site";
import { fontVariables } from "@/lib/fonts";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const title = `${site.name} — Web Developer`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name }],
  creator: site.name,
  // Proves ownership of the site to Google Search Console (HTML tag method).
  verification: { google: "XTXu9l87EiyqvsB1wxbwl7wgea7_j3jd_-oj2fb1Nqo" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior: globals.css scrolls smoothly for in-page links;
    // this makes Next.js switch that off while changing pages, so a new page
    // starts at the top instead of gliding up from the old scroll position
    // (which also set off its scroll-in animations on the way).
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
        {children}
        <BackToTop />
        {/* Vercel's visit counts and real-visitor page speed: cookie-free,
            so always on. Google Analytics waits for consent. */}
        <Analytics />
        <SpeedInsights />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
