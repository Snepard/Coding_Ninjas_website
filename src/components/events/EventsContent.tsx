"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { timeline } from "@/data/club";
import { sectionReveal } from "@/lib/motion";
import { StackedTimeline } from "./StackedTimeline";
import { EventStatistics } from "./EventStatistics";
import { EventGallery } from "./EventGallery";
import { EventTestimonials } from "./EventTestimonials";
import { UpcomingEventsTeaser } from "./UpcomingEventsTeaser";

export const EventsContent = () => (
  <div className="space-y-24 pb-24">
    {/* Hero Section */}
    <section className="container-grid space-y-12 pt-10">
      <motion.div variants={sectionReveal} initial="hidden" animate="show">
        <SectionTitle
          eyebrow="Events"
          title="Our journey and upcoming experiences"
          description="From our founding milestones to the events shaping tomorrow — explore the moments that define Coding Ninjas Chitkara."
        />
      </motion.div>
    </section>

    {/* Stacked Timeline */}
    <section className="container-grid space-y-12">
      <motion.div
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionTitle
          eyebrow="Timeline"
          title="From campus idea to global-ready guild"
          description="Every milestone layered new capabilities — from our first hackathon win to the Coding Ninjas expansion that powers today's community."
        />
      </motion.div>
      <StackedTimeline items={timeline} />
    </section>

    {/* Premium Sections */}
    <EventStatistics />
    <EventGallery />
    <EventTestimonials />
    <UpcomingEventsTeaser />
  </div>
);
