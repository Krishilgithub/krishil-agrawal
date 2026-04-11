import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/sections/ProjectsPageContent";
import { projectsData } from "@/data/projects";

const BASE_URL = "https://krishil-agrawal.vercel.app";

export const metadata: Metadata = {
  title: "AI & ML Projects",
  description:
    "Production AI systems, ML pipelines, agentic workflows, and full-stack builds by Krishil Agrawal. Each project includes a full architectural case study, system design breakdown, and tech stack analysis.",
  keywords: [
    "ML Engineer projects",
    "AI portfolio",
    "RAG pipeline project",
    "Agentic AI project",
    "LangGraph LangChain project",
    "LangSmith observability",
    "computer vision PyTorch",
    "machine learning portfolio 2025",
    "Krishil Agrawal projects",
    "AI case studies",
    "AI-Canvas SaaS",
    "TalentoAI interview platform",
    "DEPSTAR chatbot RAG",
    "retinal disease classification",
    "MobileNetV3 transfer learning",
    "MLflow Docker MLOps pipeline",
    "T20 cricket predictor",
    "Brand-Scan web app",
    "school management system",
    "internship portal Next.js",
  ],
  alternates: {
    canonical: `${BASE_URL}/projects`,
  },
  openGraph: {
    title: "AI & ML Projects | Krishil Agrawal",
    description:
      "Production AI systems, ML pipelines, agentic workflows, and full-stack builds with complete architectural case studies.",
    url: `${BASE_URL}/projects`,
    siteName: "Krishil Agrawal",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Krishil Agrawal — AI & ML Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & ML Projects | Krishil Agrawal",
    description:
      "Production AI systems, ML pipelines, and agentic workflows with full architectural case studies.",
    creator: "@KrishilAgrawal1",
  },
};

export default function ProjectsPage() {
  const projectListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI & ML Projects by Krishil Agrawal",
    description: "Production AI systems, agentic workflows, ML pipelines, and full-stack applications.",
    url: `${BASE_URL}/projects`,
    numberOfItems: projectsData.length,
    itemListElement: projectsData.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.shortDescription,
        url: project.links.demo ?? `${BASE_URL}/projects`,
        applicationCategory: project.category === "AI" ? "AIApplication" : "WebApplication",
        author: {
          "@type": "Person",
          name: "Krishil Agrawal",
        },
        keywords: project.shortTech,
        ...(project.links.github && { codeRepository: project.links.github }),
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${BASE_URL}/projects` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProjectsPageContent />
    </>
  );
}
