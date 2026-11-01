"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Hero() {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-fade-up",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      0.1
    ).fromTo(
      ".hero-image-reveal",
      { scale: 0.85, opacity: 0, filter: "blur(8px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power2.out" },
      0.1
    );
  }, []);

  const techLogos = [
    { name: "LangChain", url: "https://cdn.simpleicons.org/langchain" },
    { name: "Anthropic", url: "https://cdn.simpleicons.org/anthropic" },
    { name: "HuggingFace", url: "https://cdn.simpleicons.org/huggingface" },
    { name: "n8n", url: "https://cdn.simpleicons.org/n8n" },
    { name: "Docker", url: "https://cdn.simpleicons.org/docker" },
  ];

  return (
    <section 
      id="hero" 
      className="relative min-h-[100svh] md:min-h-screen flex items-center pt-10 pb-24 sm:pt-20 sm:pb-10 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto bg-white"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-16 items-center z-10 md:pt-0">
        
        {/* LEFT COLUMN: Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
          
          <h1 className="hero-fade-up font-outfit text-[1.85rem] sm:text-5xl xl:text-7xl leading-[1.1] tracking-tight font-black text-[#111] mb-3 md:mb-6 flex flex-col">
            <span className="text-[15px] sm:text-2xl md:text-3xl font-medium text-gray-700 tracking-normal mb-2 flex items-center justify-center md:justify-start gap-1.5 sm:gap-3">
              👋 Hi, I&apos;m <span className="font-bold text-black border-b-[3px] md:border-b-4 border-red-500">Krishil Agrawal</span>
            </span>
            <span>AI ML Engineer &</span>
            <span>Agentic Developer<span className="text-red-500">.</span></span>
          </h1>

          <p className="hero-fade-up text-[14px] sm:text-lg md:text-xl xl:text-2xl font-light text-gray-600 mb-1.5 sm:mb-3 max-w-xl leading-relaxed px-2 sm:px-0">
            Building multi-agent architectures, RAG pipelines, and end-to-end ML systems using LangChain, LangGraph, and PyTorch.
          </p>
          
          <p className="hero-fade-up text-xs sm:text-base text-gray-400 font-medium mb-5 sm:mb-10">
            Based in Vadodara, India.
          </p>

          <div className="hero-fade-up grid grid-cols-2 sm:flex sm:flex-row gap-2.5 sm:gap-4 mb-6 sm:mb-14 w-full sm:w-auto">
            <MagneticButton className="w-full sm:w-auto">
              <a href="#contact" className="px-4 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-full font-semibold hover:scale-105 transition-transform flex justify-center items-center gap-1.5 sm:gap-2 shadow-lg hover:shadow-xl w-full sm:w-auto text-[13px] sm:text-base">
                <span className="sm:hidden">Hire Me</span><span className="hidden sm:inline">Hire Me as AI Engineer</span> <ArrowUpRight size={15} />
              </a>
            </MagneticButton>
            <MagneticButton className="w-full sm:w-auto">
              <a href="#projects" className="px-4 sm:px-8 py-3 sm:py-4 border border-gray-200 text-black shadow-sm rounded-full font-semibold hover:bg-gray-50 transition-all flex justify-center items-center gap-2 w-full sm:w-auto text-[13px] sm:text-base">
                <span className="sm:hidden">My Projects</span><span className="hidden sm:inline">View My Projects</span>
              </a>
            </MagneticButton>
          </div>

          {/* Tech Stack Logos */}
          <div className="hero-fade-up flex items-center justify-center md:justify-start gap-6 sm:gap-8 flex-wrap">
            {techLogos.map((tech) => (
              <div key={tech.name} className="group relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 cursor-pointer" title={tech.name}>
                <img 
                  src={tech.url} 
                  alt={`${tech.name} logo`} 
                  className="w-full h-full object-contain saturate-0 opacity-40 group-hover:saturate-100 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1"
                />
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: Profile Image */}
        <div className="hero-image-reveal flex justify-center items-center order-1 md:order-2 mb-1 md:mb-0 mt-0 md:mt-0 relative">
          <div className="relative w-36 h-36 sm:w-[55vw] sm:h-[55vw] sm:max-w-[360px] sm:max-h-[360px] md:max-w-[420px] md:max-h-[420px] rounded-full overflow-hidden shadow-xl md:shadow-2xl bg-white border-4 border-gray-50 ring-1 ring-gray-100">
            <Image 
              src="/avatar.jpeg" 
              alt="Krishil Agrawal ML Engineer" 
              fill
              sizes="(max-width: 640px) 144px, (max-width: 768px) 55vw, 420px"
              className="object-cover object-top"
              priority
            />
          </div>
          
          {/* Subtle accent glow behind the circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-[70vw] sm:h-[70vw] max-w-[500px] max-h-[500px] bg-gray-200 rounded-full mix-blend-multiply opacity-40 blur-3xl -z-10 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
