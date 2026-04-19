import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroller } from "@/components/layout/SmoothScroller";
import { VerticalNav } from "@/components/navigation/VerticalNav";
import { MobileNav } from "@/components/navigation/MobileNav";
import { Analytics } from "@vercel/analytics/react";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const BASE_URL = "https://krishil-agrawal.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Krishil Agrawal | ML Engineer · Agentic AI · LLMs",
    template: "%s | Krishil Agrawal",
  },

  description:
    "Krishil Agrawal is an ML Engineer specializing in Agentic AI systems, RAG pipelines, LLMs, and production-grade deep learning. Building AI that ships and scales.",

  applicationName: "Krishil Agrawal Portfolio",
  authors: [{ name: "Krishil Agrawal", url: BASE_URL }],
  creator: "Krishil Agrawal",
  publisher: "Krishil Agrawal",

  keywords: [
    // Identity
    "Krishil Agrawal",
    "Krishil Agrawal ML Engineer",
    "Krishil Agrawal AI Engineer",
    "Krishil Agrawal portfolio",
    // Core skills
    "Machine Learning Engineer",
    "AI Engineer",
    "Agentic AI developer",
    "LLM engineer",
    "GenAI developer",
    // Technologies
    "LangChain developer",
    "LangGraph",
    "LangSmith",
    "RAG pipeline",
    "Retrieval Augmented Generation",
    "Vector database",
    "Pinecone",
    "OpenAI API",
    "Next.js AI developer",
    "PyTorch engineer",
    "MobileNet transfer learning",
    // Projects
    "Agentic AI SaaS",
    "AI interview platform",
    "University chatbot RAG",
    "Retinal disease classification",
    "T20 cricket predictor MLOps",
    "MLflow Docker ML pipeline",
    // Content
    "MCP A2A protocols",
    "GraphRAG vs Vector RAG",
    "RAG chunking strategies",
    "LLM memory architecture",
    "vectorization vs embeddings",
    "AI security red teaming",
    // General
    "AI portfolio India",
    "ML portfolio 2025",
    "production machine learning",
    "full stack AI engineer",
  ],

  openGraph: {
    title: "Krishil Agrawal | ML Engineer · Agentic AI · LLMs",
    description:
      "ML Engineer building Agentic AI systems, RAG pipelines, and production LLM applications. Explore live projects, deep-dive technical blogs, and a full architectural case study for each build.",
    url: BASE_URL,
    siteName: "Krishil Agrawal",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Krishil Agrawal — ML Engineer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Krishil Agrawal | ML Engineer · Agentic AI · LLMs",
    description:
      "ML Engineer building Agentic AI systems, RAG pipelines, and production LLM applications.",
    creator: "@KrishilAgrawal1",
    images: [`${BASE_URL}/og-image.png`],
  },

  alternates: {
    canonical: BASE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "google4e9fce0ec60b4302",
  },

  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Krishil Agrawal",
    jobTitle: "ML Engineer",
    url: BASE_URL,
    image: `${BASE_URL}/avatar.jpeg`,
    email: "krishilagrawal026@gmail.com",
    telephone: "+91-8320902499",
    sameAs: [
      "https://www.linkedin.com/in/krishil-agrawal-49aaa9283",
      "https://github.com/Krishilgithub",
      "https://x.com/KrishilAgrawal1",
    ],
    description:
      "ML Engineer focused on Agentic AI systems, RAG pipelines, LLMs, and production deep learning.",
    knowsAbout: [
      "Machine Learning",
      "Agentic AI",
      "Retrieval Augmented Generation",
      "LangChain",
      "LangGraph",
      "LangSmith",
      "OpenAI API",
      "PyTorch",
      "Next.js",
      "Vector Databases",
      "MLOps",
      "Computer Vision",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Krishil Agrawal",
    url: BASE_URL,
    description:
      "Portfolio of Krishil Agrawal — ML Engineer specializing in Agentic AI, RAG pipelines, and production LLM systems.",
    author: {
      "@type": "Person",
      name: "Krishil Agrawal",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/blogs?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${dmSans.variable} antialiased selection:bg-black selection:text-white scroll-smooth`}
    >
      <head>
        <link rel="canonical" href={BASE_URL} />
        <meta name="theme-color" content="#fafafa" />
        <meta name="color-scheme" content="light" />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col font-sans overflow-x-hidden relative bg-[#fafafa]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <VerticalNav />
        <MobileNav />
        <SmoothScroller>
          {children}
        </SmoothScroller>
        <Analytics />
      </body>
    </html>
  );
}
