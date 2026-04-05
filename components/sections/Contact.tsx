"use client";

import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-white relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        
        <h2 className="font-outfit text-[clamp(3rem,8vw,8rem)] font-extrabold tracking-tighter leading-none mb-10">
          Let&apos;s build <br className="hidden md:block"/>
          <span className="text-outline">together.</span>
        </h2>
        
        <p className="text-xl text-gray-600 mb-12 max-w-xl">
          Interested in AI solutions, ML pipelines, or agentic automation? Let&apos;s connect and discuss how we can work together.
        </p>

        <MagneticButton>
          <a 
            href="mailto:contact@krishil.dev" 
            className="group relative px-10 py-5 bg-black text-white rounded-full font-bold text-lg md:text-xl overflow-hidden hover:scale-105 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 w-fit mx-auto"
          >
            <span className="relative z-10">Say Hello!</span>
            <ArrowUpRight size={24} className="relative z-10 group-hover:rotate-45 transition-transform" />
            <div className="absolute inset-0 bg-red-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
          </a>
        </MagneticButton>

        <div className="mt-32 w-full flex flex-col md:flex-row justify-between items-center text-sm font-medium text-gray-400 border-t border-gray-100 pt-8 gap-4">
          <p>© {new Date().getFullYear()} Krishil Agrawal. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-black transition-colors">GitHub</a>
            <a href="#" className="hover:text-black transition-colors">Twitter</a>
          </div>
        </div>

      </div>
    </section>
  );
}
