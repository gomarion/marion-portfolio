"use client";

import { OPEN_CONSENT_EVENT } from "./AnalyticsConsent";

// "Cookie settings" in the footer: reopens the consent banner, so visitors
// can change their answer at any time.
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className="cursor-pointer underline underline-offset-4 transition-opacity hover:opacity-60"
    >
      Cookie settings
    </button>
  );
}
