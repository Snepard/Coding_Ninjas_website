"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
  image?: string;
};

type StackedTimelineProps = {
  items: TimelineItem[];
};

const TimelineCard = ({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 65%", "end 35%"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [0.9, 1, 0.96]);
  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0.4],
  );

  const yearOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.35, 0.5],
    [0, 1, 1, 0],
  );
  const yearY = useTransform(scrollYProgress, [0, 0.12], [30, 0]);
  const yearScale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.35, 0.5],
    [0.9, 1, 1, 0.95],
  );

  return (
    <motion.div
      ref={cardRef}
      style={{
        position: "sticky",
        top: `${80 + index * 30}px`,
      }}
      className="mb-8 sm:mb-12"
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        {/* Mobile: stacked layout, Desktop: year on left + card on right */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 lg:gap-16">
          {/* Year label */}
          <motion.div
            className="flex-shrink-0 sm:w-32 lg:w-40 sm:text-right pointer-events-none"
            style={{
              opacity: yearOpacity,
              y: yearY,
              scale: yearScale,
              position: "relative",
              zIndex: 10 - index,
            }}
          >
            <p className="text-5xl sm:text-6xl lg:text-7xl font-bold text-orange-500 tracking-tight">
              {item.year}
            </p>
          </motion.div>

          {/* Card content */}
          <motion.article
            style={{
              scale,
              opacity: cardOpacity,
            }}
            className="flex-1 rounded-xl sm:rounded-2xl border border-white/10 bg-[#0f0f0f] p-5 sm:p-6 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-sm"
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-4 sm:space-y-5">
              <div className="flex flex-col gap-2 sm:gap-3">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading text-foreground font-bold">
                  {item.title}
                </h3>
              </div>

              <div className="overflow-hidden rounded-lg border border-white/5 bg-surface/40 relative">
                <Image
                  src={item.image || "/images/sponsors/CNweb.jpg"}
                  alt={item.title}
                  width={800}
                  height={450}
                  className="h-36 sm:h-44 lg:h-48 w-full object-cover"
                />
                {!item.image && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/60"></p>
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-foreground/70">
                {item.description}
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </motion.div>
  );
};

export const StackedTimeline = ({ items }: StackedTimelineProps) => {
  return (
    <div className="relative container-grid">
      <div className="space-y-6 sm:space-y-8 lg:space-y-12">
        {items.map((item, index) => (
          <TimelineCard
            key={`${item.year}-${item.title}`}
            item={item}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
