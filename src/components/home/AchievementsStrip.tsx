"use client";

import CountUp from "react-countup";
import { achievements } from "@/data/club";

export const AchievementsStrip = () => (
  <section
    aria-label="Club achievements"
    className="mt-16 md:mt-24 rounded-3xl border border-border/60 bg-surface/60 py-10 backdrop-blur-md"
  >
    <div className="container-grid grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
      {achievements.map((item) => (
        <div key={item.metric} className="space-y-3">
          <p className="text-4xl font-heading font-semibold text-primary">
            <CountUp end={item.value} duration={2.4} enableScrollSpy>
              {({ countUpRef }) => (
                <>
                  <span ref={countUpRef} /> {item.suffix}
                </>
              )}
            </CountUp>
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">
            {item.metric}
          </p>
        </div>
      ))}
    </div>
  </section>
);
