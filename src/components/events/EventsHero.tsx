"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { sectionReveal } from "@/lib/motion";

export const EventsHero = () => (
  <>
    {/* Grid: left = Events+Timeline, right = Ninja */}
    <div className="events-grid container-grid pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start mb-12 lg:mb-20">
        {/* LEFT: Events + Timeline */}
        <div className="left-col space-y-16 lg:space-y-24">
          {/* Hero Section */}
          <section className="space-y-8 lg:space-y-12">
            <motion.div
              variants={sectionReveal}
              initial="hidden"
              animate="show"
            >
              <SectionTitle
                eyebrow="Events"
                title="Our journey and upcoming experiences"
                description="From our founding milestones to the events shaping tomorrow — explore the moments that define Coding Ninjas Chitkara."
              />
            </motion.div>
          </section>

          {/* Timeline Section */}
          <section className="space-y-8 lg:space-y-12">
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
          </section>
        </div>

        {/* RIGHT: Ninja mascot - responsive, visible on mobile center-aligned */}
        <aside className="ninja-column flex justify-center lg:min-w-[350px] lg:sticky lg:top-24 self-start order-first lg:order-last mb-8 lg:mb-0">
          <div className="inline-block p-2 rounded-md lg:mt-12" aria-hidden>
            <Image
              src="/images/Ninja.png"
              alt="Ninja Mascot"
              width={480}
              height={390}
              priority
              className="ninja-img block w-[240px] sm:w-[300px] md:w-[360px] lg:w-[420px] max-w-full h-auto"
              style={{
                animation: "float 3s ease-in-out infinite",
                filter: "drop-shadow(0 0 22px rgba(255,128,0,0.45))",
              }}
            />
          </div>
        </aside>
      </div>
    </div>

    {/* Animation keyframes */}
    <style jsx global>{`
      @keyframes float {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-12px);
        }
      }
    `}</style>
  </>
);
