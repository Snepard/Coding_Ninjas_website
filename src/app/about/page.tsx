import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Timeline } from "@/components/ui/Timeline";
import { Card } from "@/components/ui/Card";
import { ProjectCard } from "@/components/ui/ProjectCard";
import {
  achievements,
  coreValues,
  leadershipTeam,
  missionStatement,
  spotlightProjects,
  timeline,
  upcomingEvents,
} from "@/data/club";
import { siteConfig } from "@/lib/seo";

export const revalidate = 3600;

const AboutPage = () => (
  <div className="space-y-24">
    <section className="container-grid space-y-12 pt-10">
      <SectionTitle
        eyebrow="About Coding Ninjas Chitkara"
        title="A community of makers expanding what’s possible"
        description="Born from the Vaelkrith About initiative, the Coding Ninjas is where cross-functional squads grow, ship, and celebrate ambitious ideas."
      />
      <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
        <Card className="bg-surface/80">
          <p className="text-lg text-foreground/80">
            We are a multi-disciplinary guild at Chitkara University nurturing
            engineers, designers, researchers, and storytellers. The Vaelkrith
            About legacy taught us to lead with purpose — today we amplify that
            spirit through dedicated pods, immersive labs, and real-world
            impact.
          </p>
          <p className="mt-4 text-sm text-foreground/60">
            From hackathons to global showcases, students learn by building
            alongside mentors, alumni, and industry specialists.
          </p>
        </Card>
        <Card className="bg-background/80">
          <h3 className="text-xl font-heading text-foreground">
            Mission Snapshot
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-foreground/70">
            <li>• Weekly Club sessions across AI, product, and design</li>
            <li>• Dedicated innovation garage with late-night access</li>
            <li>• Alumni mentorship and industry office hours</li>
            <li>• Annual showcases with partners and civic leaders</li>
          </ul>
        </Card>
      </div>
    </section>

    <section id="timeline" className="container-grid space-y-12">
      <SectionTitle
        eyebrow="Timeline"
        title="From campus idea to global-ready guild"
        description="Every milestone layered new capabilities — from our first hackathon win to the Coding Ninjas expansion that powers today’s community."
      />
      <Timeline items={timeline} />
    </section>

    <section className="container-grid space-y-12">
      <SectionTitle
        eyebrow="Achievements"
        title="Momentum fueled by dedication"
        description="We measure growth by community impact, shipped products, and the people we uplift along the way."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {achievements.map((achievement) => (
          <Card key={achievement.metric} className="bg-surface/70">
            <p className="text-4xl font-heading text-primary">
              {achievement.value}
              {achievement.suffix}
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.3em] text-foreground/60">
              {achievement.metric}
            </p>
          </Card>
        ))}
      </div>
    </section>

    <section className="container-grid space-y-12">
      <SectionTitle
        eyebrow="Projects"
        title="Flagship initiatives and showcases"
        description="Spanning civic innovation, campus experience, and real-time collaboration — these projects demonstrate the Club’s range."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {spotlightProjects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>

    <section className="container-grid space-y-12">
      <SectionTitle
        eyebrow="Values"
        title="Culture anchored in curiosity and inclusion"
        description={missionStatement.description}
      />
      <div className="grid gap-6 md:grid-cols-3">
        {coreValues.map((value) => (
          <Card key={value.title} className="bg-background/80">
            <h3 className="text-lg font-heading text-foreground">
              {value.title}
            </h3>
            <p className="mt-3 text-sm text-foreground/70">
              {value.description}
            </p>
          </Card>
        ))}
      </div>
    </section>

    <section className="container-grid space-y-12">
      <SectionTitle
        eyebrow="Team"
        title="Meet the leads guiding each pod"
        description="Experienced builders, researchers, and storytellers orchestrate pods, ensuring every member has support and direction."
      />
      <div className="grid gap-8 md:grid-cols-2">
        {leadershipTeam.map((leader) => (
          <Card
            key={leader.name}
            className="flex flex-col gap-6 bg-surface/70 md:flex-row"
          >
            <div className="h-36 w-36 shrink-0 overflow-hidden rounded-3xl border border-border/60">
              <Image
                src={leader.avatar}
                alt={leader.name}
                width={144}
                height={144}
              />
            </div>
            <div className="space-y-3 text-sm text-foreground/70">
              <div>
                <h3 className="text-xl font-heading text-foreground">
                  {leader.name}
                </h3>
                <p className="text-primary/80">{leader.role}</p>
              </div>
              <p>{leader.bio}</p>
              <div className="flex flex-wrap gap-3 text-xs text-foreground/60">
                {Object.entries(leader.socials).map(([key, value]) => (
                  <a
                    key={key}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-primary"
                  >
                    {key}
                  </a>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>

    <section id="events" className="container-grid space-y-12">
      <SectionTitle
        eyebrow="Events"
        title="What’s happening next"
        description="Workshops, showcases, and impact sprints designed to accelerate learning and community outcomes."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {upcomingEvents.map((event) => (
          <Card key={event.name} className="bg-background/80">
            <p className="text-xs uppercase tracking-[0.3em] text-primary/80">
              {new Date(event.startDate).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
              })}{" "}
              —{" "}
              {new Date(event.endDate).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
              })}
            </p>
            <h3 className="mt-3 text-lg font-heading text-foreground">
              {event.name}
            </h3>
            <p className="mt-2 text-sm text-foreground/70">
              {event.description}
            </p>
            <p className="mt-3 text-xs text-foreground/50">
              {event.location.name} · {event.location.address}
            </p>
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-primary transition hover:text-primary/80"
            >
              Event details →
            </a>
          </Card>
        ))}
      </div>
    </section>

    <section className="container-grid space-y-8">
      <SectionTitle
        eyebrow="Get Involved"
        title="Collaborate with the Club"
        description="We partner with organizations, mentors, and alumni to co-create experiences that move the ecosystem forward."
      />
      <Card className="flex flex-col gap-4 bg-surface/70 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-heading text-foreground">
            Ready to mentor or collaborate?
          </p>
          <p className="mt-2 text-sm text-foreground/70">
            Reach out at{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-primary"
            >
              {siteConfig.contactEmail}
            </a>{" "}
            and we&apos;ll craft a meaningful experience together.
          </p>
        </div>
        <Link
          href="/contact"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
        >
          Contact the team
        </Link>
      </Card>
    </section>
  </div>
);

export default AboutPage;
