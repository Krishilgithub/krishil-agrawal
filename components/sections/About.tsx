"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap, ArrowUpRight, User } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function About() {
  return (
    <section id="about" className="py-12 md:py-24 px-4 sm:px-8 md:px-12 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest mb-3 md:mb-5"
            >
              <User size={12} /> About Me
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-outfit text-[1.75rem] sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter text-black leading-[1.05]"
            >
              About Me<span className="text-red-500">.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 md:mt-5 text-gray-500 text-[15px] md:text-lg max-w-xl leading-relaxed"
            >
              A glimpse into my background, core expertise, and current availability.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 md:auto-rows-[minmax(200px,auto)]">
          
          {/* Box 1: Core Identity (Takes up 2 columns on Desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 bg-[#111] text-white p-5 sm:p-8 md:p-12 rounded-3xl md:rounded-[2rem] flex flex-col justify-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
            <h3 className="font-outfit text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3 md:mb-6 z-10 w-full sm:w-[85%]">
              I engineer <span className="text-red-500">intelligence.</span>
            </h3>
            <p className="text-gray-400 text-sm sm:text-lg md:text-xl font-medium max-w-xl z-10 leading-relaxed">
              I specialize at the intersection of Machine Learning and autonomous Agentic workflows. From building robust LangChain orchestration engines to deploying low-latency PyTorch models, I bridge the gap between AI research and highly scalable, production-ready applications.
            </p>
          </motion.div>

          {/* Box 2: Academics / Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-1 bg-red-600 text-white p-4 sm:p-8 md:p-10 rounded-3xl md:rounded-[2rem] flex flex-col justify-center items-start shadow-lg md:shadow-xl shadow-red-600/20"
          >
            <div className="p-2 md:p-3 bg-white/20 rounded-full mb-3 md:mb-6">
              <GraduationCap className="w-5 h-5 md:w-7 md:h-7" />
            </div>
            <h4 className="font-outfit text-3xl md:text-5xl font-black mb-1 md:mb-2">9.27</h4>
            <span className="text-red-100 font-bold uppercase tracking-wider text-[10px] md:text-sm md:mb-4">Current CGPA</span>
            <p className="hidden sm:block text-white/90 font-medium">3rd-year B.Tech CS Student consistently ranking among the top peers in quantitative engineering.</p>
          </motion.div>

          {/* Box 3: Location */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1 bg-gray-50 border border-gray-100 p-4 sm:p-8 md:p-10 rounded-3xl md:rounded-[2rem] flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="p-2 md:p-3 bg-white shadow-sm rounded-full text-black">
                <MapPin className="w-5 h-5 md:w-7 md:h-7" />
              </div>
              <div className="flex gap-1 h-1.5 md:h-2 w-9 md:w-12">
                 <div className="h-full w-1/3 bg-orange-400 rounded-full" />
                 <div className="h-full w-1/3 bg-white rounded-full border border-gray-200" />
                 <div className="h-full w-1/3 bg-green-500 rounded-full" />
              </div>
            </div>
            <div className="mt-6 md:mt-12">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">Based In</span>
              <h4 className="font-outfit text-lg sm:text-2xl md:text-3xl leading-tight font-bold mt-1 text-black">Vadodara, India</h4>
            </div>
          </motion.div>

          {/* Box 4: Status banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-2 bg-gray-50 border border-gray-200 p-4 sm:p-7 md:p-10 rounded-3xl md:rounded-[2rem] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6"
          >
            <div className="flex items-center gap-4 md:gap-6">
              <div className="relative flex items-center justify-center h-10 w-10 md:h-12 md:w-12 bg-green-100 rounded-full shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 md:h-5 md:w-5 bg-green-500"></span>
              </div>
              <div>
                <h4 className="font-outfit text-base sm:text-2xl font-bold text-black mb-0.5 md:mb-1">Available for Hire</h4>
                <p className="text-gray-500 font-medium text-xs sm:text-sm md:text-base">Ready for full-time engineering roles & freelance AI architecture.</p>
              </div>
            </div>
            
            <MagneticButton className="w-full sm:w-auto">
              <a href="/krishil-resume.pdf" target="_blank" className="px-6 md:px-8 py-3 md:py-4 bg-white border border-gray-200 text-black rounded-full font-bold text-sm md:text-base hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm whitespace-nowrap w-full sm:w-auto">
                Download Resume <ArrowUpRight size={16} />
              </a>
            </MagneticButton>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
