import Link from "next/link";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";

export const revalidate = 3600;

const roles = [
  {
    title: "Product Engineering Coach",
    type: "Volunteer · Part-time",
    description:
      "Guide squads building Next.js and React Native products. Plan sprints, review architecture decisions, and help teams ship with confidence.",
  },
  {
    title: "Design Systems Lead",
    type: "Student role",
    description:
      "Define the club’s design language, run weekly crits, and co-own accessibility audits for flagship projects.",
  },
  {
    title: "Community Producer",
    type: "Student role",
    description:
      "Plan Club sessions, document playbooks, and coordinate showcases with external partners and alumni.",
  },
];

const perks = [
  "Dedicated mentorship from alumni and industry partners",
  "Budget for courses, tooling, and community events",
  "Priority access to hackathons, fellowships, and internships",
  "Opportunities to present at campus-wide and national showcases",
];

const CareersPage = () => (
  <div className="container-grid space-y-16 pt-10">
    <SectionTitle
      eyebrow="Careers"
      title="Lead the next wave of innovation"
      description="We recruit student leads, mentors, and partners who believe in building with purpose. Roles rotate every 6–8 months to keep the Club evolving."
    />
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <div className="space-y-6">
        {roles.map((role) => (
          <Card key={role.title} className="bg-background/80">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-heading text-foreground">
                  {role.title}
                </h3>
                <p className="text-xs uppercase tracking-[0.3em] text-primary/70">
                  {role.type}
                </p>
              </div>
              <Link
                href="/contact"
                className="text-sm font-semibold text-primary transition hover:text-primary/80"
              >
                Express interest →
              </Link>
            </div>
            <p className="mt-3 text-sm text-foreground/70">
              {role.description}
            </p>
          </Card>
        ))}
      </div>
      <Card className="space-y-5 bg-surface/70">
        <h3 className="text-lg font-heading text-foreground">
          What you&apos;ll experience
        </h3>
        <ul className="space-y-3 text-sm text-foreground/70">
          {perks.map((perk) => (
            <li key={perk}>• {perk}</li>
          ))}
        </ul>
        <p className="text-sm text-foreground/60">
          We welcome interest from alumni and industry mentors. If you have a
          unique idea for collaboration,{" "}
          <Link href="/contact" className="text-primary">
            let&apos;s talk
          </Link>
          .
        </p>
      </Card>
    </div>
  </div>
);

export default CareersPage;
