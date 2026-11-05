"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState, useSyncExternalStore } from "react";

// Google Analytics 4 property for the site. It's public by nature (it ends
// up in every page that loads GA), so it lives here rather than in a secret.
const GA_ID = "G-NKM3TTELHT";

// Only real visits to the live site count: not `next dev`, and not Vercel's
// preview deployments.
const TRACK = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

// The visitor's answer, kept in this browser. Storing the answer itself is
// allowed without consent; it's needed to remember the choice.
const STORAGE_KEY = "analytics-consent";
type Choice = "granted" | "denied";

// The footer's "Cookie settings" link opens the banner again with this.
export const OPEN_CONSENT_EVENT = "open-analytics-consent";

const listeners = new Set<() => void>();

function readChoice(): Choice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    // Storage blocked (some private modes): ask again on each visit.
    return null;
  }
}

function saveChoice(choice: Choice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Storage blocked: the choice only lasts for this page.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

// Stops GA in this page (Google's official opt-out switch) and deletes the
// cookies it set, for a visitor who withdraws consent.
function stopGoogleAnalytics() {
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
  const hosts = [location.hostname, `.${location.hostname}`];
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (!name.startsWith("_ga")) return;
    hosts.forEach((host) => {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${host}`;
    });
    document.cookie = `${name}=; Max-Age=0; path=/`;
  });
}

// Google Analytics only loads after the visitor accepts it in this banner.
// (Vercel Web Analytics and Speed Insights are cookie-free and always on.)
// The banner floats at the bottom of the screen, over the page rather than
// pushing it, so nothing shifts when it appears. It shows until the visitor
// answers, and again from the footer's "Cookie settings" link.
export function AnalyticsConsent() {
  // undefined on the server and while hydrating, so the banner never
  // flashes for visitors who already answered.
  const choice = useSyncExternalStore(subscribe, readChoice, () => undefined);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  const answer = (next: Choice) => {
    if (next === "denied" && choice === "granted") stopGoogleAnalytics();
    if (next === "granted") {
      delete (window as unknown as Record<string, boolean>)[
        `ga-disable-${GA_ID}`
      ];
    }
    saveChoice(next);
    setReopened(false);
  };

  const showBanner = choice === null || (choice !== undefined && reopened);

  return (
    <>
      {TRACK && choice === "granted" && <GoogleAnalytics gaId={GA_ID} />}
      {showBanner && (
        <section
          aria-label="Cookie consent"
          className="fixed inset-x-4 bottom-4 z-40 flex flex-col gap-4 rounded-[10px] border border-ink bg-paper p-5 shadow-[0_6px_24px_rgb(0_0_0/0.18)] sm:right-auto sm:left-6 sm:max-w-100 lg:bottom-10 lg:left-10"
        >
          <p className="text-[0.9375rem] leading-[1.6] tracking-[0.01em]">
            May I use Google Analytics cookies to learn how visitors use this
            site? Anonymous, cookie-free visit counts are always on.{" "}
            <a
              href="/privacy"
              className="underline underline-offset-4 transition-opacity hover:opacity-60"
            >
              Privacy
            </a>
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => answer("granted")}
              className="inline-flex h-10 cursor-pointer items-center bg-ink px-5 text-[0.875rem] font-medium tracking-[0.05em] text-paper uppercase transition-opacity outline-offset-2 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-ink"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => answer("denied")}
              className="inline-flex h-10 cursor-pointer items-center border border-ink px-5 text-[0.875rem] font-medium tracking-[0.05em] uppercase transition-colors outline-offset-2 hover:bg-panel focus-visible:outline-2 focus-visible:outline-ink"
            >
              Decline
            </button>
          </div>
        </section>
      )}
    </>
  );
}
