"use client";

import { motion } from "framer-motion";
import { childFade, staggeredList } from "@/lib/motion";

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

type TimelineProps = {
  items: TimelineItem[];
};

export const Timeline = ({ items }: TimelineProps) => (
  <motion.ol
    variants={staggeredList()}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-120px" }}
    className="relative space-y-10 border-l border-border/60 pl-8"
  >
    {items.map((item) => (
      <motion.li
        key={`${item.year}-${item.title}`}
        variants={childFade}
        className="relative space-y-3"
      >
        <span className="absolute -left-4 top-1 flex h-2 w-2 rounded-full bg-primary" />
        <p className="text-xs uppercase tracking-[0.4em] text-primary/80">
          {item.year}
        </p>
        <h3 className="text-xl font-heading text-foreground">{item.title}</h3>
        <p className="text-sm text-foreground/70">{item.description}</p>
      </motion.li>
    ))}
  </motion.ol>
);
