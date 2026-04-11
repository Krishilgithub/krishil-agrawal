import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Blogs } from "@/components/sections/Blogs";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

const BASE_URL = "https://krishil-agrawal.vercel.app";

export const metadata: Metadata = {
  title: "Krishil Agrawal | ML Engineer · Agentic AI · LLMs",
  description:
    "Krishil Agrawal — ML Engineer building Agentic AI systems, RAG pipelines, and LLM-powered applications. View live projects, deep-dive technical blogs, and full architectural case studies.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Krishil Agrawal | ML Engineer · Agentic AI · LLMs",
    description:
      "ML Engineer building Agentic AI systems, RAG pipelines, LLMs, and production deep learning. Explore live AI projects and technical blogs.",
    url: BASE_URL,
    type: "profile",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Krishil Agrawal — ML Engineer Portfolio",
      },
    ],
  },
};

export default function Home() {
  // JSON-LD: ItemList of all sections on the home page for rich indexing
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Krishil Agrawal — ML Engineer Portfolio",
    url: BASE_URL,
    description:
      "Personal portfolio of Krishil Agrawal, an ML Engineer specializing in Agentic AI, RAG pipelines, LLMs, and production ML systems.",
    mainEntity: {
      "@type": "Person",
      name: "Krishil Agrawal",
      jobTitle: "ML Engineer",
      url: BASE_URL,
    },
    hasPart: [
      { "@type": "WebPageElement", name: "Hero — Introduction", url: `${BASE_URL}/#hero` },
      { "@type": "WebPageElement", name: "About — Background & Mission", url: `${BASE_URL}/#about` },
      { "@type": "WebPageElement", name: "Experience — Work History", url: `${BASE_URL}/#experience` },
      { "@type": "WebPageElement", name: "Projects — AI/ML Case Studies", url: `${BASE_URL}/#projects` },
      { "@type": "WebPageElement", name: "Blogs — Technical Deep Dives", url: `${BASE_URL}/#blogs` },
      { "@type": "WebPageElement", name: "Skills — Tech Stack", url: `${BASE_URL}/#skills` },
      { "@type": "WebPageElement", name: "Contact — Hire / Collaborate", url: `${BASE_URL}/#contact` },
    ],
  };

  const projectListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ML & AI Projects by Krishil Agrawal",
    url: `${BASE_URL}/projects`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "AI-Canvas — Agentic Social Media SaaS",
        description: "Production-grade AI SaaS automating LinkedIn workflows using LangChain, LangGraph, and Socket.IO real-time streaming.",
        url: `${BASE_URL}/projects`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "TalentoAI — AI Interview Platform",
        description: "End-to-end AI-driven platform for interview preparation using deterministic LLM evaluation matrices.",
        url: `${BASE_URL}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "DEPSTAR Admission Chatbot — RAG System",
        description: "University admission RAG chatbot combining hybrid BM25 + dense vector retrieval with LangChain.",
        url: `${BASE_URL}/projects`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Retinal Screening DL — Medical Computer Vision",
        description: "MobileNetV3 deep learning model classifying 4 retinal diseases from OCT scans with 96.4% accuracy.",
        url: `${BASE_URL}/projects`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectListSchema) }}
      />
      <main className="flex flex-col w-full h-full">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Blogs />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
