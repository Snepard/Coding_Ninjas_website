"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { staggerChildren, childFade } from "@/lib/motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Full Stack Developer",
    content:
      "The workshops at Coding Ninjas events transformed my understanding of modern web development. The hands-on approach and expert guidance were invaluable.",
  },
  {
    name: "Raj Patel",
    role: "AI Researcher",
    content:
      "Attending the AI pod sessions opened up new career paths for me. The community support and mentorship here is unmatched.",
  },
  {
    name: "Priya Sharma",
    role: "Product Designer",
    content:
      "The design thinking workshops helped me build a portfolio that landed me my dream job. Grateful for this amazing community!",
  },
];

export const EventTestimonials = () => (
  <section className="container-grid space-y-12">
    <SectionTitle
      eyebrow="Testimonials"
      title="What People Say About Our Events"
      description="Hear from participants who've experienced our workshops, hackathons, and community gatherings."
    />
    <motion.div
      variants={staggerChildren(0.15)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid gap-6 md:grid-cols-3"
    >
      {testimonials.map((testimonial) => (
        <motion.div key={testimonial.name} variants={childFade}>
          <Card className="h-full bg-surface/40 border-border/60 hover:border-primary/40 transition-all duration-300">
            <p className="text-sm text-foreground/80 leading-relaxed mb-6">
              &ldquo;{testimonial.content}&rdquo;
            </p>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">
                {testimonial.name}
              </p>
              <p className="text-xs text-foreground/60">{testimonial.role}</p>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  </section>
);
