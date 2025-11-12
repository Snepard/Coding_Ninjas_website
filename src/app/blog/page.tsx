import Link from "next/link";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getAllPosts } from "@/lib/posts";

export const revalidate = 3600;
export const runtime = "nodejs";

const BlogIndex = async () => {
  const posts = await getAllPosts();

  return (
    <div className="container-grid space-y-12 pt-10">
      <SectionTitle
        eyebrow="Blog"
        title="Stories, playbooks, and retrospectives"
        description="We document how the Club learns, experiments, and ships. Expect deep dives, frameworks, and honest lessons."
      />
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group overflow-hidden rounded-[2.5rem] border border-border/60 bg-background/80 transition hover:border-primary/70"
          >
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={
                  post.coverImage ?? "/images/blog/digital-Club-blueprint.svg"
                }
                alt={post.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="space-y-3 p-6 text-sm text-foreground/70">
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">
                {new Date(post.date).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <h3 className="text-xl font-heading text-foreground group-hover:text-primary">
                {post.title}
              </h3>
              <p>{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogIndex;
