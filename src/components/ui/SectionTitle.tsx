"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { motionDefaults } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SectionTitleProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export const SectionTitle = ({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionTitleProps) => (
  <motion.div
    variants={motionDefaults}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, margin: "-80px" }}
    className={cn(
      "flex flex-col gap-4",
      align === "center" && "text-center items-center mx-auto max-w-3xl",
      className,
    )}
  >
    {eyebrow && (
      <span className="text-xs uppercase tracking-[0.4em] text-primary/80">
        {eyebrow}
      </span>
    )}
    <h2 className="text-3xl font-heading font-semibold text-foreground md:text-4xl">
      {title}
    </h2>
    {description && (
      <p className="max-w-2xl text-base text-foreground/70">{description}</p>
    )}
  </motion.div>
);
