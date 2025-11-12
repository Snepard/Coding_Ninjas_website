import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "../ui/SectionTitle";
import { getAllPosts } from "@/lib/posts";

export const BlogTeaser = async () => {
  const posts = await getAllPosts();
  if (!posts.length) return null;

  const [featured, ...rest] = posts;

  return (
    <section className="container-grid mt-24 space-y-12">
      <SectionTitle
        eyebrow="Stories"
        title="Dispatches from the Club"
        description="Deep dives, retrospectives, and playbooks from squads shipping impact across the community."
      />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
        <Link
          href={`/blog/${featured.slug}`}
          className="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-border/60 bg-surface/70"
        >
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={
                featured.coverImage ?? "/images/blog/digital-Club-blueprint.svg"
              }
              alt={featured.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
          <div className="space-y-3 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-primary/70">
              Featured Article
            </p>
            <h3 className="text-2xl font-heading text-foreground">
              {featured.title}
            </h3>
            <p className="text-sm text-foreground/70">{featured.excerpt}</p>
            <p className="text-xs text-foreground/50">
              {new Date(featured.date).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </Link>
        <div className="space-y-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-3xl border border-border/60 bg-background/70 p-6 transition hover:border-primary/70"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">
                {new Date(post.date).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <h4 className="mt-3 text-lg font-heading text-foreground">
                {post.title}
              </h4>
              <p className="mt-2 text-sm text-foreground/70">{post.excerpt}</p>
            </Link>
          ))}
          <div>
            <Link
              href="/blog"
              className="text-sm font-semibold text-primary transition hover:text-primary/80"
            >
              View all posts →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
