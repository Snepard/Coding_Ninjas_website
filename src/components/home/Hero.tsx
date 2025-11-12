"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { CTAButton } from "../ui/CTAButton";
import { motionDefaults } from "@/lib/motion";
import { useMediaQuery } from "@/lib/hooks";

const Shuriken3D = dynamic(() => import("../visuals/Shuriken3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <div className="h-32 w-32 animate-pulse rounded-full border border-border/60" />
    </div>
  ),
});

export const Hero = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [isCTAHovered, setIsCTAHovered] = useState(false);

  return (
    <section className="relative pt-40 md:pt-44">
      <div className="container-grid grid items-center gap-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-20">
        <motion.div
          variants={motionDefaults}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-8"
        >
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-1 text-xs uppercase tracking-[0.4em] text-foreground/60">
              Coding Ninjas
            </span>
            <h1 className="text-4xl font-heading font-semibold md:text-6xl">
              Crafting future-ready experiences, communities, and makers.
            </h1>
            <p className="max-w-xl text-base text-foreground/70 md:text-lg">
              Coding Ninjas Chitkara is a multi-disciplinary guild of builders
              shipping production-grade projects, running impact-first events,
              and mentoring the next wave of innovators across India.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <CTAButton
              href="/#join"
              trackingId="hero-join"
              onMouseEnter={() => setIsCTAHovered(true)}
              onMouseLeave={() => setIsCTAHovered(false)}
            >
              Join the Club
            </CTAButton>
            <CTAButton
              href="/about"
              variant="secondary"
              trackingId="hero-about"
            >
              Explore the story
            </CTAButton>
          </div>
          <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.3em] text-foreground/50">
            <span>Weekly Club sessions</span>
            <span>Production-ready squads</span>
            <span>Global mentorship</span>
          </div>
        </motion.div>
        <motion.div
          className="relative aspect-[4/5] w-full overflow-hidden rounded-[3rem] border border-border/60 bg-gradient-to-br from-background via-surface to-background/70 shadow-soft"
          animate={{
            rotateX: isCTAHovered ? -6 : 0,
            rotateY: isCTAHovered ? 9 : 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <div className="absolute inset-0">
            {isMobile ? (
              <Image
                src="/images/shuriken-fallback.svg"
                alt="Stylized shuriken representing the Coding Ninjas"
                fill
                priority
              />
            ) : (
              <Shuriken3D className="h-full w-full" />
            )}
          </div>
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-border/60 bg-background/80 p-4 text-sm text-foreground/70 backdrop-blur-xl">
            <p className="font-semibold text-foreground">Coding Ninjas Pods</p>
            <p className="mt-1">
              AI, Full Stack, Game Dev, Robotics — collaborate with squads built
              to ship and learn faster together.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
