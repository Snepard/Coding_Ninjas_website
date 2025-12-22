"use client";

import { useEffect, useRef, useState } from "react";
import { memo } from "react";

const InteractiveBackground = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHidden, setIsHidden] = useState(false);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Only update if moved significantly to reduce re-renders
      if (Math.abs(e.clientX - lastX) > 5 || Math.abs(e.clientY - lastY) > 5) {
        lastX = e.clientX;
        lastY = e.clientY;

        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }

        requestRef.current = requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
        });
      }
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] via-[#0a0a0a] to-[#050505]" />

      {/* Circuit board pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="circuit"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            {/* Vertical lines */}
            <line
              x1="50"
              y1="0"
              x2="50"
              y2="100"
              stroke="#ff6d00"
              strokeWidth="0.5"
            />
            {/* Horizontal lines */}
            <line
              x1="0"
              y1="50"
              x2="100"
              y2="50"
              stroke="#ff6d00"
              strokeWidth="0.5"
            />
            {/* Corner dots */}
            <circle cx="20" cy="20" r="1.5" fill="#ff6d00" />
            <circle cx="80" cy="80" r="1.5" fill="#ff6d00" />
            <circle cx="20" cy="80" r="1" fill="#ff6d00" opacity="0.5" />
            <circle cx="80" cy="20" r="1" fill="#ff6d00" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      {/* Cursor-following radial gradient */}
      <div
        className={`absolute pointer-events-none transition-opacity duration-300 ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
        style={{
          width: "500px",
          height: "500px",
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, rgba(255, 109, 0, 0.15) 0%, rgba(255, 109, 0, 0.08) 25%, transparent 65%)`,
          filter: "blur(40px)",
          willChange: "transform",
        }}
      />

      {/* Secondary subtle glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "800px",
          height: "800px",
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, rgba(255, 109, 0, 0.05) 0%, transparent 60%)`,
          filter: "blur(80px)",
          willChange: "transform",
          opacity: isHidden ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Ambient glow elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-3xl opacity-0 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-tl from-orange-500/5 to-transparent rounded-full blur-3xl opacity-0 animate-pulse" />
    </div>
  );
});

InteractiveBackground.displayName = "InteractiveBackground";

export default InteractiveBackground;
