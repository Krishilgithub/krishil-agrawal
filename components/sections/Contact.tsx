"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Phone, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-white relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        
        <h2 className="font-outfit text-[clamp(2.5rem,7vw,7rem)] font-extrabold tracking-tighter leading-none mb-10">
          Let&apos;s build <br className="hidden md:block"/>
          <span className="text-outline">together.</span>
        </h2>
        
        <p className="text-xl text-gray-600 mb-12 max-w-xl">
          Interested in AI solutions, ML pipelines, or agentic automation? Let&apos;s connect and discuss how we can work together.
        </p>

        <div className="flex flex-col md:flex-row gap-6 mb-16 items-center">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:krishilagrawal026@gmail.com" 
            className="group relative px-10 py-5 bg-black text-white rounded-full font-bold text-lg md:text-xl overflow-hidden shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 w-fit"
          >
            <span className="relative z-10 flex items-center gap-3"><Mail size={22} /> Email Me</span>
            <ArrowUpRight size={24} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            <div className="absolute inset-0 bg-red-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
          </motion.a>

          <a href="tel:8320902499" className="flex items-center gap-2 text-xl font-bold text-gray-700 hover:text-black transition-colors">
            <Phone size={24} className="text-red-500" /> +91 8320902499
          </a>
        </div>

        <div className="mt-20 w-full flex flex-col md:flex-row justify-between items-center text-sm font-medium text-gray-400 border-t border-gray-100 pt-8 gap-4">
          <p>© {new Date().getFullYear()} Krishil Agrawal. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="https://www.linkedin.com/in/krishil-agrawal-49aaa9283" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-black transition-colors font-bold">
              LinkedIn
            </a>
            <a href="https://github.com/Krishilgithub" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-black transition-colors font-bold">
              GitHub
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
