"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest mb-5"
            >
              <Briefcase size={12} /> Experience
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-outfit text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-black leading-[1.05]"
            >
              Experience &amp; Timeline<span className="text-red-500">.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-gray-500 text-lg max-w-xl leading-relaxed"
            >
              My professional journey, academic background, and notable achievements.
            </motion.p>
          </div>
        </div>
        <div className="relative border-l border-gray-200 ml-4 md:ml-8 pl-8 md:pl-12 space-y-16">
          
          {/* Timeline Item 1: Internship */}
          <div className="relative">
            <div className="absolute -left-[53px] md:-left-[69px] bg-red-600 border-[6px] border-[#fafafa] w-10 h-10 rounded-full flex justify-center items-center">
              <Briefcase size={14} className="text-white" />
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-100 p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h3 className="font-outfit text-2xl md:text-3xl font-bold">AI Research Intern</h3>
                <span className="px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-bold tracking-wider uppercase w-fit">
                  05/2025 – 06/2025
                </span>
              </div>
              <p className="text-gray-500 font-medium mb-6">CHARUSAT University, Gujarat — Deep Learning & Medical Imaging</p>
              
              <ul className="space-y-3 text-gray-600 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✦</span>
                  <p>Building an AI-based system for affordable eye disease screening in rural India via retinal fundus image analysis.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✦</span>
                  <p>Designing a deep learning classification model using MobileNetV3Large with two-stage transfer learning to identify 4 conditions (CNV, DME, Drusen, Normal) using mixed precision.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✦</span>
                  <p>Engineering a comprehensive multi-metric evaluation framework producing confusion matrices, ROC/AUC curves, and per-class F1 scores.</p>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Timeline Item 2: Education */}
          <div className="relative">
            <div className="absolute -left-[53px] md:-left-[69px] bg-black border-[6px] border-[#fafafa] w-10 h-10 rounded-full flex justify-center items-center">
              <GraduationCap size={14} className="text-white" />
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-100 p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h3 className="font-outfit text-2xl md:text-3xl font-bold">B.Tech Computer Science</h3>
                <span className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-bold tracking-wider uppercase w-fit">
                  2023 – 2026
                </span>
              </div>
              <p className="text-gray-500 font-medium mb-6">CHARUSAT University, Gujarat</p>
              
              <div className="flex items-center gap-4 text-xl">
                <span className="font-black text-black text-4xl">9.27</span>
                <span className="text-gray-400 font-bold uppercase tracking-wider text-sm mt-1">Current CGPA</span>
              </div>
            </motion.div>
          </div>

          {/* Timeline Item 3: Achievements */}
          <div className="relative">
            <div className="absolute -left-[53px] md:-left-[69px] bg-black border-[6px] border-[#fafafa] w-10 h-10 rounded-full flex justify-center items-center">
              <Award size={14} className="text-white" />
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-black text-white p-8 md:p-10 rounded-[2rem] shadow-xl relative overflow-hidden"
            >
               {/* Shine effect */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-5 pointer-events-none" />

              <h3 className="font-outfit text-2xl md:text-3xl font-bold mb-8">Certifications & Accolades</h3>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✓</span>
                  <div>
                    <strong className="text-white block">Semi-finalist in 4 Hackathons</strong>
                    <span className="text-sm">Demonstrating rapid prototyping & execution.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✓</span>
                  <div>
                    <strong className="text-white block">Agent Skills with Anthropic</strong>
                    <span className="text-sm">Prompt engineering, tool use, Claude agents.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✓</span>
                  <div>
                    <strong className="text-white block">Multi-Agent Systems with CrewAI</strong>
                    <span className="text-sm">End-to-end architecture and deployment.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✓</span>
                  <div>
                    <strong className="text-white block">Gemini CLI Open-Source Agents</strong>
                    <span className="text-sm">Building extensible AI pipelines.</span>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
