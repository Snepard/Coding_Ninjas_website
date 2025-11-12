"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import { Card } from "../ui/Card";
import { spotlightProjects } from "@/data/club";

export const ProjectsShowcase = () => (
  <section id="projects" className="container-grid mt-24 space-y-12">
    <SectionTitle
      eyebrow="Featured"
      title="Projects engineered for the real world"
      description="Explore production-grade builds shipped by squads across AI, product design, and full-stack experiences."
    />
    <div className="overflow-x-hidden">
      <motion.div
        drag="x"
        dragConstraints={{ left: -480, right: 0 }}
        className="flex gap-6"
      >
        {spotlightProjects.map((project) => (
          <Card
            key={project.title}
            className="flex min-w-[320px] max-w-sm flex-1 flex-col justify-between bg-surface/80"
          >
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-primary/70">
                Spotlight
              </p>
              <h3 className="text-2xl font-heading text-foreground">
                {project.title}
              </h3>
              <p className="text-sm text-foreground/70">
                {project.description}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-foreground/60">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/60 px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center text-sm font-semibold text-primary transition hover:text-primary/80"
            >
              View case study →
            </a>
          </Card>
        ))}
      </motion.div>
      <p className="mt-4 text-xs text-foreground/50">
        Tip: Drag horizontally to explore all featured builds.
      </p>
    </div>
  </section>
);
