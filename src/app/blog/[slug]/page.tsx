import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/seo";

export const revalidate = 3600;
export const runtime = "nodejs";

type PageProps = {
  params: { slug: string };
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      images: [
        {
          url: post.coverImage ?? siteConfig.ogImage,
        },
      ],
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage ?? siteConfig.ogImage],
    },
  };
}

const BlogPostPage = async ({ params }: PageProps) => {
  const { slug } = params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post) return notFound();

  return (
    <article className="container-grid space-y-10 pt-10">
      <header className="space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-foreground/60">
          {new Date(post.date).toLocaleDateString("en-IN", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <h1 className="text-4xl font-heading font-semibold text-foreground">
          {post.title}
        </h1>
        <p className="max-w-3xl text-base text-foreground/70">{post.excerpt}</p>
        {post.coverImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-4xl border border-border/60">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </header>
      <div
        className="prose prose-invert prose-lg prose-headings:font-heading prose-headings:text-foreground prose-p:text-foreground/80"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      <footer className="rounded-3xl border border-border/60 bg-background/80 p-6 text-sm text-foreground/70">
        Enjoyed this read? Join the Club or{" "}
        <a href="/contact" className="text-primary">
          reach out
        </a>{" "}
        for collaborations.
      </footer>
    </article>
  );
};

export default BlogPostPage;
