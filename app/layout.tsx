import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroller } from "@/components/layout/SmoothScroller";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { VerticalNav } from "@/components/navigation/VerticalNav";
import { MobileNav } from "@/components/navigation/MobileNav";
import { Analytics } from "@vercel/analytics/react";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["700", "800", "900"], // Bold to Black
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://krishil-agrawal.vercel.app"),
  title: "Krishil Agrawal | AI ML Engineer | Agentic AI Developer",
  description: "Portfolio of Krishil Agrawal. Specialized AI ML Engineer building Agentic AI systems, scalable ML pipelines, and AI projects.",
  applicationName: "Krishil Agrawal",
  authors: [{ name: "Krishil Agrawal", url: "https://krishil-agrawal.vercel.app" }],
  keywords: ["Krishil Agrawal", "Machine Learning", "AI Engineer", "Agentic AI", "Portfolio"],
  creator: "Krishil Agrawal",
  publisher: "Krishil Agrawal",
  openGraph: {
    title: "Krishil Agrawal | AI ML Engineer",
    description: "Portfolio of Krishil Agrawal, an ML Engineer building Agentic workflows and scalable AI systems.",
    url: "https://krishil-agrawal.vercel.app",
    siteName: "Krishil Agrawal",
    type: "website",
  },
  verification: {
    google: "google4e9fce0ec60b4302.html",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Krishil Agrawal",
    "jobTitle": "ML Engineer",
    "url": "https://krishil-agrawal.vercel.app",
    "image": "https://krishil-agrawal.vercel.app/jpeg.png",
    "sameAs": [
      "https://www.linkedin.com/in/krishil-agrawal-49aaa9283",
      "https://github.com/Krishilgithub",
      "https://x.com/KrishilAgrawal1"
    ],
    "description": "AI ML Engineer focused on scaling intelligent Agentic Systems and deep learning computer vision."
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${dmSans.variable} h-full antialiased selection:bg-black selection:text-white`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans overflow-x-hidden relative bg-[#fafafa]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <CustomCursor />
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
