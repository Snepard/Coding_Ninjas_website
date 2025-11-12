import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/content/blog");

export type PostFrontMatter = {
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  coverImage?: string;
};

export type Post = PostFrontMatter & {
  slug: string;
  content: string;
  html: string;
};

const toSlug = (fileName: string) => fileName.replace(/\.mdx?$/, "");

export const getPostSlugs = async () => {
  const files = await fs.readdir(postsDirectory);
  return files.filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
};

export const getAllPosts = async (): Promise<Post[]> => {
  const files = await getPostSlugs();
  const posts = await Promise.all(
    files.map((file) => getPostBySlug(toSlug(file))),
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileExists = await fs
    .access(fullPath)
    .then(() => true)
    .catch(() => false);

  if (!fileExists) {
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
    const mdxExists = await fs
      .access(mdxPath)
      .then(() => true)
      .catch(() => false);
    if (!mdxExists) {
      throw new Error(`Post not found: ${slug}`);
    }
    return readPostFile(mdxPath, slug);
  }

  return readPostFile(fullPath, slug);
};

const readPostFile = async (filePath: string, slug: string): Promise<Post> => {
  const file = await fs.readFile(filePath, "utf-8");
  const { content, data } = matter(file);
  const processedContent = await remark().use(html).process(content);

  return {
    ...(data as PostFrontMatter),
    slug,
    content,
    html: processedContent.toString(),
  };
};

export const getFeaturedPost = async () => {
  const posts = await getAllPosts();
  return posts[0];
};
