import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/sections/ProjectsPageContent";

export const metadata: Metadata = {
  title: "AI & ML Projects | Krishil Agrawal",
  description:
    "Production AI systems, ML pipelines, agentic workflows, and full-stack builds by Krishil Agrawal — each with a full architectural case study and system design breakdown.",
  keywords: [
    "ML Engineer projects",
    "AI portfolio",
    "RAG pipeline",
    "agentic AI",
    "LangGraph projects",
    "LangChain",
    "computer vision",
    "machine learning portfolio",
    "Krishil Agrawal",
    "AI case studies",
  ],
  openGraph: {
    title: "AI & ML Projects by Krishil Agrawal",
    description:
      "Production AI systems, ML pipelines, agentic workflows, and architectural case studies.",
    url: "https://krishil-agrawal.vercel.app/projects",
    siteName: "Krishil Agrawal",
    type: "website",
  },
  alternates: {
    canonical: "https://krishil-agrawal.vercel.app/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
