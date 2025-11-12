import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { AchievementsStrip } from "@/components/home/AchievementsStrip";
import { MissionSection } from "@/components/home/MissionSection";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { JoinSection } from "@/components/home/JoinSection";
import { BlogTeaser } from "@/components/home/BlogTeaser";

export const revalidate = 3600;

const LoadingPosts = () => (
  <section className="container-grid mt-24">
    <div className="h-40 animate-pulse rounded-3xl border border-border/60 bg-surface/60" />
  </section>
);

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-24">
      <Hero />
      <AchievementsStrip />
      <MissionSection />
      <ProjectsShowcase />
      <JoinSection />
      <Suspense fallback={<LoadingPosts />}>
        <BlogTeaser />
      </Suspense>
    </div>
  );
}
