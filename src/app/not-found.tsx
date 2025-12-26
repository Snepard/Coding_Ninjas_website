"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";

// Dynamically import the game component to avoid SSR issues with canvas
const BrickBreakerGame = dynamic(
  () => import("@/components/games/BrickBreakerGame"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-[1200px] aspect-[1200/550] md:aspect-auto md:h-[550px] bg-[#0d0d1a] rounded-xl border border-orange-500/30 flex items-center justify-center">
        <div className="text-orange-400 animate-pulse">Loading game...</div>
      </div>
    ),
  },
);

export default function NotFound() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return (
    <main className="min-h-screen bg-[#030308] flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Background stars effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0d0d1a_0%,_#030308_100%)]" />
        {/* Decorative gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-[1500px] mx-auto">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,140,0,0.5)]">
            Page Not Found
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Looks like you&apos;ve ventured into the void. Break the bricks to
            escape!
          </p>
        </div>

        {/* Game Area with Info Panel */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          {/* Info Panel - appears below game on mobile, left side on desktop */}
          <div className="order-2 lg:order-1 w-full lg:w-[220px] bg-[#0a0a12]/80 backdrop-blur-sm rounded-xl border border-orange-500/20 p-4 flex flex-col lg:flex-col gap-4 sm:flex-row sm:flex-wrap">
            {/* Controls Section */}
            <div className="sm:flex-1 lg:flex-none">
              <h3 className="text-orange-400 font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="text-orange-500">⌨</span> Controls
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-gray-400">
                  <kbd className="px-2 py-1 bg-gray-800/80 rounded border border-gray-700 text-gray-300 text-[10px]">
                    Mouse/Touch
                  </kbd>
                  <span>Move paddle</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <kbd className="px-2 py-1 bg-gray-800/80 rounded border border-gray-700 text-gray-300 text-[10px]">
                    Click/Tap
                  </kbd>
                  <span>Start game</span>
                </div>
              </div>
            </div>

            {/* Divider - hidden on sm screens when horizontal */}
            <div className="hidden sm:hidden lg:block h-px w-full bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

            {/* Rules Section */}
            <div className="sm:flex-1 lg:flex-none">
              <h3 className="text-orange-400 font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="text-orange-500">📋</span> Rules
              </h3>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Break all bricks to win</li>
                <li>• Don&apos;t let ball fall</li>
                <li>• You have 3 lives</li>
                <li>• 12% chance of power-ups!</li>
                <li>• Power-ups last 3 sec</li>
              </ul>
            </div>

            {/* Divider - hidden on sm screens when horizontal */}
            <div className="hidden sm:hidden lg:block h-px w-full bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

            {/* Power-ups Section */}
            <div className="sm:flex-1 lg:flex-none">
              <h3 className="text-orange-400 font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="text-orange-500">⚡</span> Power-ups
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-4 rounded bg-[#00ff88] flex items-center justify-center text-black text-[8px] font-bold">
                    ↔
                  </span>
                  <span className="text-gray-400">Widen paddle</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-4 rounded bg-[#ff00ff] flex items-center justify-center text-black text-[8px] font-bold">
                    ●●
                  </span>
                  <span className="text-gray-400">Multi-ball</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-4 rounded bg-[#00ffff] flex items-center justify-center text-black text-[8px] font-bold">
                    ▼
                  </span>
                  <span className="text-gray-400">Slow ball</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-4 rounded bg-[#ff3366] flex items-center justify-center text-black text-[8px] font-bold">
                    ▲
                  </span>
                  <span className="text-gray-400">Fast ball</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-4 rounded bg-[#ffff00] flex items-center justify-center text-black text-[8px] font-bold">
                    ⚡
                  </span>
                  <span className="text-gray-400">Super widen</span>
                </div>
              </div>
            </div>
          </div>

          {/* Game Container - appears first on mobile */}
          <div className="order-1 lg:order-2 w-full md:w-auto">
            <Suspense
              fallback={
                <div
                  className={`${isMobile ? "w-[350px] h-[550px]" : "w-[1200px] h-[550px]"} max-w-full bg-[#0d0d1a] rounded-xl border border-orange-500/30 flex items-center justify-center`}
                >
                  <div className="text-orange-400 animate-pulse">
                    Loading game...
                  </div>
                </div>
              }
            >
              <BrickBreakerGame
                width={isMobile ? 350 : 1200}
                height={isMobile ? 550 : 550}
                isMobile={isMobile}
              />
            </Suspense>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-[0_0_20px_rgba(255,140,0,0.3)] hover:shadow-[0_0_30px_rgba(255,140,0,0.5)]"
          >
            Return Home
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-gray-600 text-xs mt-4">
          Error 404 • The page you&apos;re looking for doesn&apos;t exist or has
          been moved.
        </p>
      </div>

      {/* Custom styles for glow effects */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap");
      `}</style>
    </main>
  );
}
