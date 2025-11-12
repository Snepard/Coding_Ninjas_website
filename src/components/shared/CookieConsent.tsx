"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { initGA, GA_ID } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const CONSENT_COOKIE = "digital-Club-consent";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get(CONSENT_COOKIE);
    if (consent === "accepted" && GA_ID) {
      initGA(GA_ID);
    }
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const handleConsent = (value: "accepted" | "declined") => {
    Cookies.set(CONSENT_COOKIE, value, { expires: 180 });
    setIsVisible(false);
    if (value === "accepted" && GA_ID) {
      initGA(GA_ID);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div className="flex max-w-3xl flex-col gap-4 rounded-3xl border border-border/60 bg-surface/95 p-6 text-sm text-foreground/80 shadow-soft backdrop-blur-xl md:flex-row md:items-center md:gap-6">
        <p className="flex-1">
          We use cookies to understand engagement, improve experiences, and
          activate analytics after you give consent. You can change this later
          in settings.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleConsent("declined")}
            className={cn(
              "rounded-full border border-border px-5 py-2 text-sm transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => handleConsent("accepted")}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-black transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
