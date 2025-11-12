import { missionStatement, coreValues } from "@/data/club";
import { SectionTitle } from "../ui/SectionTitle";
import { Card } from "../ui/Card";

export const MissionSection = () => (
  <section className="container-grid mt-24 space-y-12">
    <SectionTitle
      eyebrow="Mission"
      title={missionStatement.title}
      description={missionStatement.description}
    />
    <div className="grid gap-6 md:grid-cols-3">
      {missionStatement.pillars.map((pillar) => (
        <Card key={pillar.title} className="bg-surface/70">
          <h3 className="text-xl font-heading text-foreground">
            {pillar.title}
          </h3>
          <p className="mt-3 text-sm text-foreground/70">
            {pillar.description}
          </p>
        </Card>
      ))}
    </div>
    <div className="grid gap-6 rounded-3xl border border-border/60 bg-surface/60 p-8 md:grid-cols-3">
      {coreValues.map((value) => (
        <div key={value.title} className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-primary/70">
            Value
          </p>
          <h3 className="text-lg font-heading text-foreground">
            {value.title}
          </h3>
          <p className="text-sm text-foreground/70">{value.description}</p>
        </div>
      ))}
    </div>
  </section>
);
