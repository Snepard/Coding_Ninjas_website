"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { staggerChildren, childFade } from "@/lib/motion";

const statistics = [
  { label: "Total Events", value: 26 },
  { label: "Tech Events", value: 18 },
  { label: "Workshops", value: 32 },
  { label: "Guest Speakers", value: 45 },
];

export const EventStatistics = () => (
  <section className="container-grid space-y-12">
    <SectionTitle
      eyebrow="Statistics"
      title="Event Impact by Numbers"
      description="Our events have brought together thousands of participants, industry leaders, and innovators."
    />
    <motion.div
      variants={staggerChildren(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {statistics.map((stat) => (
        <motion.div key={stat.label} variants={childFade}>
          <Card className="group bg-surface/40 border-border/60 hover:border-primary/40 transition-all duration-300 hover:shadow-soft text-center">
            <p className="text-4xl font-heading font-semibold text-primary mb-3">
              <CountUp end={stat.value} duration={2.4} enableScrollSpy>
                {({ countUpRef }) => (
                  <>
                    <span ref={countUpRef} />+
                  </>
                )}
              </CountUp>
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">
              {stat.label}
            </p>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  </section>
);
