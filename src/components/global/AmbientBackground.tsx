"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const AmbientBackground = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const grid = gridRef.current;
    const updateGrid = () => {
      const opacity = 0.02 + Math.sin(Date.now() / 5000) * 0.02;
      grid.style.opacity = opacity.toString();
    };

    const interval = setInterval(updateGrid, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Subtle grid pattern */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 109, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 109, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          transform: "translateZ(0)",
          willChange: "opacity",
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/5"
          style={{
            width: `${20 + i * 10}px`,
            height: `${20 + i * 10}px`,
            left: `${10 + i * 15}%`,
            top: `${20 + i * 12}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};
