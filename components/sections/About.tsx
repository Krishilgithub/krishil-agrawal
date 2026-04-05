"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="font-outfit text-5xl font-extrabold tracking-tighter">
            About Me<span className="text-red-500">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          
          {/* Box 1: Core Identity (Takes up 2 columns on Desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-[#111] text-white p-10 md:p-12 rounded-[2rem] flex flex-col justify-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
            <h3 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 z-10 w-full sm:w-[85%]">
              I engineer <span className="text-red-500">intelligence.</span>
            </h3>
            <p className="text-gray-400 text-lg md:text-xl font-medium max-w-xl z-10 leading-relaxed">
              I specialize at the intersection of Machine Learning and autonomous Agentic workflows. From building robust LangChain orchestration engines to deploying low-latency PyTorch models, I bridge the gap between AI research and highly scalable, production-ready applications.
            </p>
          </motion.div>

          {/* Box 2: Academics / Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-1 bg-red-600 text-white p-10 rounded-[2rem] flex flex-col justify-center items-start shadow-xl shadow-red-600/20"
          >
            <div className="p-3 bg-white/20 rounded-full mb-6">
              <GraduationCap size={28} />
            </div>
            <h4 className="font-outfit text-5xl font-black mb-2">9.27</h4>
            <span className="text-red-100 font-bold uppercase tracking-wider text-sm mb-4">Current CGPA</span>
            <p className="text-white/90 font-medium">3rd-year B.Tech CS Student consistently ranking among the top peers in quantitative engineering.</p>
          </motion.div>

          {/* Box 3: Location */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1 bg-gray-50 border border-gray-100 p-10 rounded-[2rem] flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-white shadow-sm rounded-full text-black">
                <MapPin size={28} />
              </div>
              <div className="flex gap-1 h-2 w-12">
                 <div className="h-full w-1/3 bg-orange-400 rounded-full" />
                 <div className="h-full w-1/3 bg-white rounded-full border border-gray-200" />
                 <div className="h-full w-1/3 bg-green-500 rounded-full" />
              </div>
            </div>
            <div className="mt-12">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Based In</span>
              <h4 className="font-outfit text-3xl font-bold mt-1 text-black">Vadodara, India</h4>
            </div>
          </motion.div>

          {/* Box 4: Status banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-gray-50 border border-gray-200 p-8 md:p-10 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-6">
              <div className="relative flex items-center justify-center h-12 w-12 bg-green-100 rounded-full shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500"></span>
              </div>
              <div>
                <h4 className="font-outfit text-2xl font-bold text-black mb-1">Available for Hire</h4>
                <p className="text-gray-500 font-medium text-sm md:text-base">Ready for full-time engineering roles & freelance AI architecture.</p>
              </div>
            </div>
            
            <MagneticButton>
              <a href="/krishil-resume.pdf" target="_blank" className="px-8 py-4 bg-white border border-gray-200 text-black rounded-full font-bold hover:bg-black hover:text-white transition-all flex items-center gap-2 shadow-sm whitespace-nowrap">
                Download Resume <ArrowUpRight size={18} />
              </a>
            </MagneticButton>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
