"use client";

import { useEffect } from "react";

export const SkipToContent = () => {
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#main") {
        const element = document.getElementById("main");
        element?.focus();
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-background focus:px-5 focus:py-3 focus:text-sm focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
    >
      Skip to content
    </a>
  );
};
