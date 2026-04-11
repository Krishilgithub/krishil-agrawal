import type { Metadata } from "next";
import { blogsData } from "@/data/blogs";
import { notFound } from "next/navigation";
import { BlogPageContent } from "@/components/sections/BlogPageContent";

const BASE_URL = "https://krishil-agrawal.vercel.app";

export async function generateStaticParams() {
  return blogsData.map((blog) => ({ slug: blog.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogsData.find((b) => b.id === slug);
  if (!blog) return {};

  const blogUrl = `${BASE_URL}/blogs/${blog.id}`;

  return {
    title: blog.title,
    description: blog.description,
    keywords: [
      ...blog.tags,
      "Krishil Agrawal",
      "ML Engineer",
      "AI engineering",
      "technical blog",
      "machine learning deep dive",
    ],
    authors: [{ name: "Krishil Agrawal", url: BASE_URL }],
    alternates: {
      canonical: blogUrl,
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      url: blogUrl,
      siteName: "Krishil Agrawal",
      authors: ["Krishil Agrawal"],
      tags: blog.tags,
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      creator: "@KrishilAgrawal1",
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogsData.find((b) => b.id === slug);
  if (!blog) notFound();

  const blogUrl = `${BASE_URL}/blogs/${blog.id}`;

  // Full BlogPosting JSON-LD for Google rich results
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    url: blogUrl,
    keywords: blog.tags.join(", "),
    author: {
      "@type": "Person",
      name: "Krishil Agrawal",
      url: BASE_URL,
      sameAs: [
        "https://www.linkedin.com/in/krishil-agrawal-49aaa9283",
        "https://github.com/Krishilgithub",
        "https://x.com/KrishilAgrawal1",
      ],
    },
    publisher: {
      "@type": "Person",
      name: "Krishil Agrawal",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blogUrl,
    },
    image: `${BASE_URL}/og-image.png`,
    datePublished: blog.publishedAt,
    articleSection: blog.tags[0] ?? "AI & Machine Learning",
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blogs", item: `${BASE_URL}/blogs` },
      { "@type": "ListItem", position: 3, name: blog.title, item: blogUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPageContent blog={blog} />
    </>
  );
}
