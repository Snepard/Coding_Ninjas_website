"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AnimatePresence, motion } from "framer-motion";
import { CTAButton } from "../ui/CTAButton";

const TOUR_COOKIE = "digital-Club-tour";

const highlights = [
  {
    title: "Immersive Hero",
    description:
      "Explore our responsive 3D shuriken and meet the initiatives powering the club.",
  },
  {
    title: "Mission Timeline",
    description:
      "Track milestones from our launch to the Coding Ninjas expansion and beyond.",
  },
  {
    title: "Projects Showcase",
    description:
      "Dive into production-ready builds shipped by multidisciplinary squads.",
  },
  {
    title: "Join & Connect",
    description:
      "Reach out, join the roster, or partner with us on upcoming community pushes.",
  },
];

export const GuidedTourOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = Cookies.get(TOUR_COOKIE);
    if (!isDismissed) {
      const timer = setTimeout(() => setIsVisible(true), 2600);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const close = () => {
    Cookies.set(TOUR_COOKIE, "dismissed", { expires: 120 });
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tour-title"
        >
          <div className="flex h-full items-center justify-center px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm sm:max-w-2xl md:max-w-3xl rounded-2xl sm:rounded-3xl border border-border/60 bg-background/95 p-4 sm:p-6 md:p-8 text-foreground shadow-soft backdrop-blur-2xl"
            >
              <button
                type="button"
                onClick={close}
                className="absolute right-3 top-3 sm:right-4 sm:top-4 md:right-5 md:top-5 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-border/70 text-base sm:text-sm text-foreground/70 transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Close guided tour"
              >
                ×
              </button>
              <div className="space-y-4 sm:space-y-5 md:space-y-6 pr-6 sm:pr-7 md:pr-8">
                <div>
                  <p
                    id="tour-title"
                    className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-primary/80"
                  >
                    Guided Tour
                  </p>
                  <h3 className="mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl font-heading font-semibold text-foreground">
                    Welcome to the Coding Ninjas
                  </h3>
                  <p className="mt-1.5 sm:mt-2 max-w-2xl text-xs sm:text-sm text-foreground/70 leading-relaxed">
                    Here&apos;s a quick primer on what to explore. You can
                    dismiss this anytime — we&apos;ll remember your choice.
                  </p>
                </div>
                <ul className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
                  {highlights.map((highlight) => (
                    <li
                      key={highlight.title}
                      className="rounded-xl sm:rounded-2xl border border-border/60 bg-surface/70 p-3 sm:p-4 md:p-5 text-xs sm:text-sm text-foreground/80"
                    >
                      <h4 className="font-semibold text-foreground text-sm sm:text-base">
                        {highlight.title}
                      </h4>
                      <p className="mt-1.5 sm:mt-2 text-foreground/70 text-xs sm:text-sm leading-relaxed">
                        {highlight.description}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-0">
                  <CTAButton variant="secondary" onClick={close}>
                    Let&apos;s explore
                  </CTAButton>
                  <button
                    type="button"
                    onClick={close}
                    className="text-sm text-foreground/60 underline-offset-4 transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Dismiss tour
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
