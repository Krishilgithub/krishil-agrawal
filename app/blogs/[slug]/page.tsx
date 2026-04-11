import { blogsData } from "@/data/blogs";
import { notFound } from "next/navigation";
import { BlogPageContent } from "@/components/sections/BlogPageContent";

export async function generateStaticParams() {
  return blogsData.map((blog) => ({ slug: blog.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogsData.find((b) => b.id === slug);
  if (!blog) return {};
  return {
    title: `${blog.title} | Krishil Agrawal`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      url: `https://krishil-agrawal.vercel.app/blogs/${blog.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogsData.find((b) => b.id === slug);
  if (!blog) notFound();
  return <BlogPageContent blog={blog} />;
}
