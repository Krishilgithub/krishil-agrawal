import type { Metadata } from "next";
import { BlogsPageContent } from "@/components/sections/BlogsPageContent";

export const metadata: Metadata = {
  title: "AI & ML Engineering Insights | Krishil Agrawal",
  description:
    "Deep dives into real-world machine learning systems, RAG architectures, agentic AI, LLM memory, and production engineering challenges — by Krishil Agrawal, ML Engineer.",
  keywords: [
    "ML Engineer blog",
    "AI engineering articles",
    "RAG system design",
    "agentic AI development",
    "LLM memory architecture",
    "production machine learning",
    "Krishil Agrawal",
    "GraphRAG",
    "vector databases",
    "chunking strategies",
  ],
  openGraph: {
    title: "AI & ML Insights by Krishil Agrawal",
    description:
      "Technical deep-dives on ML systems, RAG architectures, agentic AI, and production engineering.",
    url: "https://krishil-agrawal.vercel.app/blogs",
    siteName: "Krishil Agrawal",
    type: "website",
  },
  alternates: {
    canonical: "https://krishil-agrawal.vercel.app/blogs",
  },
};

export default function BlogsPage() {
  return <BlogsPageContent />;
}
