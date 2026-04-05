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
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.2 }
    ).fromTo(
      ".hero-image-reveal",
      { scale: 0.8, opacity: 0, filter: "blur(10px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power2.out" },
      "-=0.6"
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
      className="relative min-h-screen flex items-center pt-20 pb-10 px-6 sm:px-12 max-w-7xl mx-auto bg-white"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center z-10 pt-10 md:pt-0">
        
        {/* LEFT COLUMN: Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-1">
          
          <h1 className="hero-fade-up font-outfit text-5xl sm:text-6xl xl:text-7xl leading-[1.1] tracking-tight font-black text-[#111] mb-6 flex flex-col">
            <span className="text-2xl md:text-3xl font-medium text-gray-700 tracking-normal mb-2 flex items-center gap-3">
              👋 Hi, I&apos;m <span className="font-bold text-black border-b-4 border-red-500">Krishil Agrawal</span>
            </span>
            <span>AI ML Engineer &</span>
            <span>Agentic Developer<span className="text-red-500">.</span></span>
          </h1>

          <p className="hero-fade-up text-lg md:text-xl xl:text-2xl font-light text-gray-600 mb-3 max-w-xl leading-relaxed">
            Building multi-agent architectures, RAG pipelines, and end-to-end ML systems using LangChain, LangGraph, and PyTorch.
          </p>
          
          <p className="hero-fade-up text-base text-gray-400 font-medium mb-10">
            Based in Vadodara, India.
          </p>

          <div className="hero-fade-up flex flex-col sm:flex-row gap-4 mb-14 w-full sm:w-auto">
            <MagneticButton>
              <a href="#contact" className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:scale-105 transition-transform flex justify-center items-center gap-2 shadow-lg hover:shadow-xl w-full sm:w-auto">
                Hire Me as AI Engineer <ArrowUpRight size={18} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="#projects" className="px-8 py-4 border border-gray-200 text-black shadow-sm rounded-full font-semibold hover:bg-gray-50 transition-all flex justify-center items-center gap-2 w-full sm:w-auto">
                View My Projects
              </a>
            </MagneticButton>
          </div>

          {/* Tech Stack Logos */}
          <div className="hero-fade-up flex items-center justify-center md:justify-start gap-8 flex-wrap">
            {techLogos.map((tech) => (
              <div key={tech.name} className="group relative w-8 h-8 md:w-10 md:h-10 cursor-pointer" title={tech.name}>
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
        <div className="hero-image-reveal flex justify-center items-center order-2 md:order-2 mb-8 md:mb-0 mt-8 md:mt-0 relative">
          <div className="relative w-[65vw] h-[65vw] max-w-[420px] max-h-[420px] rounded-full overflow-hidden shadow-2xl bg-white border-4 border-gray-50 ring-1 ring-gray-100">
            <Image 
              src="/avatar.png" 
              alt="Krishil Agrawal ML Engineer" 
              fill
              sizes="(max-width: 768px) 65vw, 420px"
              className="object-cover object-top"
              priority
            />
          </div>
          
          {/* Subtle accent glow behind the circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] bg-gray-200 rounded-full mix-blend-multiply opacity-40 blur-3xl -z-10 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
