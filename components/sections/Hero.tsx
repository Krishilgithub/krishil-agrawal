"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".reveal-text",
      { y: 150, opacity: 0, skewY: 5 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2,
      },
    )
      .fromTo(
        ".hero-image",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.2)" },
        "-=0.6",
      )
      .fromTo(
        ".hero-fade-in",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
        "-=0.5",
      );
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center pt-20 pb-10 px-6 overflow-hidden bg-white"
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center justify-center relative z-10 pt-16">
        {/* Top small intro */}
        <div className="hero-fade-in flex items-center gap-2 mb-6 sm:mb-8 z-20">
          <span className="text-xl sm:text-2xl">👋</span>
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700">
            Hi, my name is{" "}
            <span className="font-bold text-black border-b-2 border-red-500">
              Krishil Agrawal<span className="text-red-500">.</span>
            </span>{" "}
            and I am an
          </p>
        </div>

        {/* Large Typography Container */}
        <div className="relative w-full flex flex-col items-center justify-center mt-4">
          {/* Line 1: Solid Text */}
          <div className="overflow-hidden z-10 w-full text-center">
            <h1
              ref={text1Ref}
              className="reveal-text font-outfit text-[clamp(2rem,11vw,12rem)] leading-none tracking-tight font-extrabold text-[#171717] w-full whitespace-nowrap"
            >
              ML Engineer
            </h1>
          </div>

          {/* Picture Box */}
          <div className="absolute top-[10%] md:top-[12%] right-[5%] md:right-[15%] z-20 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] pointer-events-none hero-image">
            <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-500 rounded-full overflow-hidden shadow-2xl bg-[#f0f0f0] border-4 border-white">
              <Image
                src="/avatar.png"
                alt="Krishil Agrawal"
                fill
                sizes="(max-width: 768px) 250px, 350px"
                className="object-cover object-top"
                priority
              />
            </div>
            
            {/* Rotating Arrow positioned on the edge of the circle */}
            <motion.div
              className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white border border-black p-3 md:p-4 rounded-full flex items-center justify-center pointer-events-auto cursor-pointer shadow-lg hover:bg-black hover:text-white transition-colors"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <ArrowUpRight size={24} />
            </motion.div>
          </div>

          {/* Line 2: Outline Text */}
          <div className="overflow-hidden z-10 w-full text-center mt-4 sm:mt-8">
            <h1
              ref={text2Ref}
              className="reveal-text font-outfit text-[clamp(2rem,11vw,12rem)] leading-none tracking-tight font-extrabold text-outline uppercase whitespace-nowrap"
            >
              & Agentic AI
            </h1>
          </div>
        </div>

        {/* Bottom Location & Logos */}
        <div className="hero-fade-in mt-16 md:mt-24 w-full flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 absolute bottom-10 px-8">
          <p className="text-gray-600 text-lg md:text-xl font-medium">
            based in Vadodara, India
            <span className="text-red-500 font-bold ">.</span>
          </p>

          <div className="flex items-center gap-6 opacity-60 mix-blend-multiply scale-75 md:scale-100 flex-wrap justify-center">
            {/* Plain text/basic SVG since exact brand icons are varied */}
            <span className="font-bold text-xl uppercase tracking-widest font-outfit">
              LangChain
            </span>
            <span className="font-bold text-xl uppercase tracking-widest font-outfit text-gray-500">
              PyTorch
            </span>
            <span className="font-bold text-xl uppercase tracking-widest font-outfit">
              n8n
            </span>
            <span className="font-bold text-xl uppercase tracking-widest font-outfit text-gray-400">
              Supabase
            </span>
            <span className="font-bold text-xl uppercase tracking-widest font-outfit">
              Docker
            </span>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="hero-fade-in mt-20 flex gap-4 z-30 mb-20 md:mb-0 relative">
          <a
            href="#contact"
            className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2 shadow-xl hover:shadow-2xl"
          >
            Hire me as AI Engineer <ArrowUpRight size={18} />
          </a>
          <a
            href="#projects"
            className="px-8 py-4 border-2 border-black text-black rounded-full font-semibold hover:bg-black hover:text-white transition-all flex items-center gap-2"
          >
            View my Projects
          </a>
        </div>
      </div>
    </section>
  );
}
