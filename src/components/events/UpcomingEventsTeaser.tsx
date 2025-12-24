"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { staggerChildren, childFade } from "@/lib/motion";

export interface UpcomingEventCardData {
  _id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  poster: string;
}

export const UpcomingEventsTeaser = ({
  events,
}: {
  events: UpcomingEventCardData[];
}) => {
  const [activePoster, setActivePoster] = useState<{
    url: string;
    name: string;
  } | null>(null);

  if (!events || events.length === 0) return null;

  return (
    <section className="container-grid space-y-12">
      <SectionTitle
        eyebrow="Upcoming"
        title="What's Happening Next"
        description="Mark your calendar for these upcoming workshops, showcases, and impact sprints."
      />
      <motion.div
        variants={staggerChildren(0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-6 md:grid-cols-2"
      >
        {events.map((event) => (
          <motion.div
            key={event._id}
            variants={childFade}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="group relative h-full bg-background/80 border-border/60 hover:border-primary/60 transition-all duration-300 hover:shadow-soft overflow-hidden">
              {event.poster && (
                <button
                  type="button"
                  onClick={() =>
                    setActivePoster({ url: event.poster, name: event.name })
                  }
                  className="relative h-40 w-full overflow-hidden rounded-t-2xl -mt-2 mb-3 group cursor-pointer"
                >
                  <img
                    src={event.poster}
                    alt={event.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                    View poster
                  </span>
                </button>
              )}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Coming Soon
                </span>
              </div>
              <div className="space-y-4 pt-2">
                <p className="text-xs uppercase tracking-[0.3em] text-primary/80">
                  {new Date(event.date).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  {/* —{" "}
                  {new Date(event.endDate).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                  })} */}
                </p>
                <h3 className="text-xl font-heading text-foreground transition-colors group-hover:text-primary md:text-2xl">
                  {event.name}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {event.description}
                </p>
                <p className="text-xs text-foreground/50">{event.location}</p>
                <a
                  // href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-primary transition-all hover:translate-x-1 hover:text-primary/80"
                >
                  Learn more →
                </a>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      {activePoster && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActivePoster(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-black/90 border border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePoster(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white hover:bg-black"
            >
              Close
            </button>
            <img
              src={activePoster.url}
              alt={activePoster.name}
              className="h-full w-full object-contain bg-black"
            />
          </div>
        </div>
      )}
    </section>
  );
};
