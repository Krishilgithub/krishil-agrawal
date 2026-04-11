import type { Metadata } from "next";
import { BlogsPageContent } from "@/components/sections/BlogsPageContent";
import { blogsData } from "@/data/blogs";

const BASE_URL = "https://krishil-agrawal.vercel.app";

export const metadata: Metadata = {
  title: "AI & ML Engineering Blogs",
  description:
    "Technical deep-dives on real-world ML systems, RAG architectures, Agentic AI, LLM memory, chunking strategies, and production engineering — by Krishil Agrawal, ML Engineer.",
  keywords: [
    "ML Engineer blog",
    "AI engineering articles",
    "RAG system design",
    "Agentic AI development",
    "LLM memory architecture",
    "production machine learning",
    "Krishil Agrawal blog",
    "GraphRAG vs Vector RAG",
    "chunking strategies RAG",
    "MCP vs A2A protocols",
    "vectorization vs embeddings",
    "AI red teaming security",
    "LangChain tutorials",
    "LangGraph multi-agent",
    "AI system design 2025",
  ],
  alternates: {
    canonical: `${BASE_URL}/blogs`,
  },
  openGraph: {
    title: "AI & ML Engineering Blogs | Krishil Agrawal",
    description:
      "Technical deep-dives on ML systems, RAG architectures, Agentic AI, LLM memory, and production engineering. Written by ML Engineer Krishil Agrawal.",
    url: `${BASE_URL}/blogs`,
    siteName: "Krishil Agrawal",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Krishil Agrawal — AI & ML Engineering Blogs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & ML Engineering Blogs | Krishil Agrawal",
    description:
      "Technical deep-dives on ML systems, RAG architectures, Agentic AI, and LLM engineering.",
    creator: "@KrishilAgrawal1",
  },
};

export default function BlogsPage() {
  // JSON-LD: Blog collection as ItemList for rich search snippets
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI & ML Engineering Blogs by Krishil Agrawal",
    description:
      "Technical deep-dives into Agentic AI, RAG systems, LLMs, and production ML engineering.",
    url: `${BASE_URL}/blogs`,
    numberOfItems: blogsData.length,
    itemListElement: blogsData.map((blog, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.description,
        url: `${BASE_URL}/blogs/${blog.id}`,
        keywords: blog.tags.join(", "),
        author: {
          "@type": "Person",
          name: "Krishil Agrawal",
          url: BASE_URL,
        },
        publisher: {
          "@type": "Person",
          name: "Krishil Agrawal",
        },
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blogs", item: `${BASE_URL}/blogs` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogsPageContent />
    </>
  );
}
