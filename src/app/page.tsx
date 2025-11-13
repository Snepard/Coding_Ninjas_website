import { Hero } from "@/components/home/Hero";
import { AchievementsStrip } from "@/components/home/AchievementsStrip";
import { MissionSection } from "@/components/home/MissionSection";
import { Sponsors } from "@/components/home/Sponsors";
import { JoinSection } from "@/components/home/JoinSection";
import { FAQ } from "@/components/home/FAQ";

export const revalidate = 3600;

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-24">
      <Hero />
      <AchievementsStrip />
      <MissionSection />
      <Sponsors />
      <JoinSection />
      <FAQ />
    </div>
  );
}
