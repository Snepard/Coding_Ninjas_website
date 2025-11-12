import { CTAButton } from "../ui/CTAButton";
import { SectionTitle } from "../ui/SectionTitle";
import { siteConfig } from "@/lib/seo";

const pods = [
  {
    name: "AI Studio",
    description:
      "Research and deploy ML systems with a focus on responsible AI and human-centered outcomes.",
  },
  {
    name: "Product Engineering",
    description:
      "Ship full-stack apps using Next.js, edge functions, and polished motion design.",
  },
  {
    name: "Immersive Media",
    description:
      "Experiment with WebXR, creative coding, and interactive storytelling.",
  },
  {
    name: "Robotics & IoT",
    description:
      "Prototype hardware, automation, and intelligent systems with real-world partners.",
  },
];

export const JoinSection = () => (
  <section id="join" className="mt-24 bg-surface/40 py-20">
    <div className="container-grid space-y-12">
      <SectionTitle
        eyebrow="Join"
        title="Grow with the Coding Ninjas"
        description="We welcome builders across all disciplines. Tap into mentorship, labs, and squads aligned to missions that matter."
        align="center"
      />
      <div className="grid gap-6 md:grid-cols-2">
        {pods.map((pod) => (
          <div
            key={pod.name}
            className="rounded-3xl border border-border/60 bg-background/80 p-6 text-sm text-foreground/70"
          >
            <h3 className="text-xl font-heading text-foreground">{pod.name}</h3>
            <p className="mt-3">{pod.description}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-4 text-center">
        <CTAButton href="/contact" trackingId="join-contact">
          Apply or Partner
        </CTAButton>
        <p className="text-sm text-foreground/50">
          Prefer email? Reach out at{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-primary"
          >
            {siteConfig.contactEmail}
          </a>
        </p>
      </div>
    </div>
  </section>
);
