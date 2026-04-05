import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroller } from "@/components/layout/SmoothScroller";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { VerticalNav } from "@/components/navigation/VerticalNav";
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
  title: "Krishil Agrawal | ML Engineer & Agentic AI Developer",
  description: "Portfolio of Krishil Agrawal. Specialized in LangChain, PyTorch, n8n, Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${dmSans.variable} h-full antialiased selection:bg-black selection:text-white`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans overflow-x-hidden relative bg-[#fafafa]">
        <CustomCursor />
        <VerticalNav />
        <SmoothScroller>
          {children}
        </SmoothScroller>
        <Analytics />
      </body>
    </html>
  );
}
