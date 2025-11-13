"use client";

import { motion } from "framer-motion";
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

export const StackedTimeline = ({ items }: StackedTimelineProps) => (
  <div className="flex flex-col items-center justify-start gap-3">
    {items.map((item) => (
      <motion.article
        key={`${item.year}-${item.title}`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl rounded-xl border border-white/5 bg-[#0f0f0f] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.4em] text-primary/80">
              {item.year}
            </p>
            <h3 className="text-2xl font-heading text-foreground">
              {item.title}
            </h3>
          </div>
          <div className="overflow-hidden rounded-lg border border-white/5 bg-surface/40">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                width={800}
                height={450}
                className="h-auto w-full object-cover"
              />
            ) : (
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-surface/40 to-surface/20 text-sm uppercase tracking-[0.3em] text-foreground/40">
                Placeholder
              </div>
            )}
          </div>
          <p className="text-sm leading-relaxed text-foreground/70">
            {item.description}
          </p>
        </div>
      </motion.article>
    ))}
  </div>
);
