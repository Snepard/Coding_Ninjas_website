import { Card } from "./Card";

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  link: string;
};

export const ProjectCard = ({
  title,
  description,
  tags,
  link,
}: ProjectCardProps) => (
  <Card className="flex flex-col gap-4 bg-surface/70">
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.3em] text-primary/70">
        Case Study
      </p>
      <h3 className="text-xl font-heading text-foreground">{title}</h3>
      <p className="text-sm text-foreground/70">{description}</p>
    </div>
    <div className="mt-auto flex flex-wrap gap-2 text-xs text-foreground/60">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-border/60 px-3 py-1"
        >
          {tag}
        </span>
      ))}
    </div>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm font-semibold text-primary transition hover:text-primary/80"
    >
      Read more →
    </a>
  </Card>
);
