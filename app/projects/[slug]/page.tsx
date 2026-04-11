import type { Metadata } from "next";
import { projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import { ProjectPageContent } from "@/components/sections/ProjectPageContent";

const BASE_URL = "https://krishil-agrawal.vercel.app";

export async function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.id === slug);
  if (!project) return {};

  const projectUrl = `${BASE_URL}/projects/${project.id}`;

  return {
    title: `${project.title} — ${project.tagline}`,
    description: project.shortDescription,
    keywords: [
      project.title,
      project.shortTech,
      "Krishil Agrawal",
      "ML Engineer",
      "AI project",
      "case study",
      project.type,
      ...project.techStack.flatMap((g) => g.items),
    ],
    alternates: { canonical: projectUrl },
    openGraph: {
      title: `${project.title} | Krishil Agrawal`,
      description: project.shortDescription,
      type: "article",
      url: projectUrl,
      siteName: "Krishil Agrawal",
      images: [
        {
          url: project.heroImage ?? `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Krishil Agrawal`,
      description: project.shortDescription,
      creator: "@KrishilAgrawal1",
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.id === slug);
  if (!project) notFound();

  const projectUrl = `${BASE_URL}/projects/${project.id}`;

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.shortDescription,
    url: projectUrl,
    author: { "@type": "Person", name: "Krishil Agrawal", url: BASE_URL },
    applicationCategory: project.category === "AI" ? "AIApplication" : "WebApplication",
    keywords: project.shortTech,
    ...(project.links.github && { codeRepository: project.links.github }),
    ...(project.links.demo && { installUrl: project.links.demo }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${BASE_URL}/projects` },
      { "@type": "ListItem", position: 3, name: project.title, item: projectUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ProjectPageContent project={project} />
    </>
  );
}
