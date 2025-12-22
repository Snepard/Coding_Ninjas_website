"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

function TeamCard({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-80px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <div className="relative h-full rounded-xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-white/[0.01] backdrop-blur-lg p-8 overflow-hidden group hover:border-primary/40 transition-all duration-300">
        {/* Dynamic gradient background on hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 0.15 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.4 }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary to-primary/40 rounded-full blur-3xl pointer-events-none"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Title with color animation */}
          <motion.h3
            animate={{ color: isHovered ? "#ff6d00" : "#ffffff" }}
            transition={{ duration: 0.3 }}
            className="text-2xl md:text-3xl font-heading font-bold mb-4 leading-tight"
          >
            {title}
          </motion.h3>

          {/* Description */}
          <motion.p
            animate={{ opacity: isHovered ? 0.85 : 0.7 }}
            transition={{ duration: 0.3 }}
            className="text-sm md:text-base text-foreground/70 leading-relaxed mb-6 flex-grow"
          >
            {description}
          </motion.p>

          {/* Animated bottom line */}
          <motion.div
            initial={{ width: "0%", opacity: 0 }}
            animate={{
              width: isHovered ? "48px" : "0%",
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-primary to-primary/40 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamsPage() {
  const teams = [
    {
      name: "Technical Team",
      desc: "Developers, infrastructure, and innovation.",
    },
    { name: "Design Team", desc: "UI/UX, creativity, and visual design." },
    { name: "Content Team", desc: "Writing and storytelling experts." },
    { name: "Marketing Team", desc: "Outreach, branding, and campaigns." },
    { name: "Operations Team", desc: "Execution and strategic planning." },
    { name: "Event Team", desc: "Organizing and managing experiences." },
  ];

  return (
    <section className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Vibrant background accents */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10 opacity-30 animate-pulse" />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary/15 rounded-full blur-3xl -z-10 opacity-20" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: -32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-4 flex items-center gap-2"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
            Our Teams
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold text-foreground leading-tight mb-6"
          >
            Meet the{" "}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-r from-primary via-orange-400 to-primary bg-[length:200%_auto] text-transparent bg-clip-text"
            >
              Talent
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-foreground/70 max-w-2xl leading-relaxed"
          >
            Exceptional teams driving innovation. From code to creativity,
            we&apos;re building the future together.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {teams.map((team, i) => (
            <TeamCard
              key={i}
              title={team.name}
              description={team.desc}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
