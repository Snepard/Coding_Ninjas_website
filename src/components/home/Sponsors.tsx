"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { staggerChildren, childFade } from "@/lib/motion";

const sponsors = [
  { name: "Burger King", url: "https://www.burgerking.in" },
  { name: "Devfolio", url: "https://devfolio.co" },
  { name: "JetBrains", url: "https://www.jetbrains.com" },
];

export const Sponsors = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sponsors.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sponsors.length) % sponsors.length);
  };

  return (
    <section className="container-grid space-y-12 py-16">
      <motion.div
        variants={childFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="text-center"
      >
        <SectionTitle
          eyebrow="Partnerships"
          title="OUR PAST SPONSORS"
          description="We're grateful to our partners who have supported our events and community initiatives."
          align="center"
        />
      </motion.div>

      <div className="relative">
        {/* Slider Container */}
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {sponsors.map((sponsor, index) => (
              <div
                key={sponsor.name}
                className="min-w-full flex items-center justify-center px-8"
              >
                <motion.a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={childFade}
                  whileHover={{ scale: 1.05 }}
                  className="relative w-full max-w-[200px] h-24 flex items-center justify-center rounded-2xl border border-border/60 bg-background/80 p-6 hover:border-primary/40 transition-all duration-300"
                >
                  <div className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                    {sponsor.name}
                  </div>
                </motion.a>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full border border-border/60 bg-background/80 p-3 hover:border-primary/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Previous sponsor"
        >
          <svg
            className="w-5 h-5 text-foreground/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full border border-border/60 bg-background/80 p-3 hover:border-primary/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Next sponsor"
        >
          <svg
            className="w-5 h-5 text-foreground/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2">
        {sponsors.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "w-8 bg-primary"
                : "w-2 bg-foreground/20 hover:bg-foreground/40"
            }`}
            aria-label={`Go to sponsor ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
