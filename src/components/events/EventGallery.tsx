"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { staggerChildren, childFade } from "@/lib/motion";

const galleryImages = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  alt: `Event gallery image ${i + 1}`,
}));

export const EventGallery = () => (
  <section className="container-grid space-y-12">
    <SectionTitle
      eyebrow="Gallery"
      title="Moments from Our Events"
      description="Capturing the energy, innovation, and community spirit at our gatherings."
    />
    <motion.div
      variants={staggerChildren(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {galleryImages.map((image) => (
        <motion.div
          key={image.id}
          variants={childFade}
          whileHover={{ scale: 1.05, rotate: 1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="group relative aspect-video overflow-hidden rounded-2xl border border-border/60 bg-surface/40"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-sm text-foreground/30">Image {image.id}</div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </motion.div>
  </section>
);
