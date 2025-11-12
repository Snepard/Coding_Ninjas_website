"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import { useMediaQuery } from "@/lib/hooks";

type LenisProviderProps = {
  children: ReactNode;
};

export const LenisProvider = ({ children }: LenisProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const frame = useRef<number | undefined>(undefined);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (frame.current) cancelAnimationFrame(frame.current);
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      gestureOrientation: "vertical",
      wheelMultiplier: 0.9,
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      frame.current = requestAnimationFrame(raf);
    };

    frame.current = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
};
